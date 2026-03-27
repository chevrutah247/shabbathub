-- Safe merge for duplicate publications + similarity report
-- Run in Supabase SQL Editor

BEGIN;

CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Normalize title helper for duplicate search
CREATE OR REPLACE FUNCTION public.norm_pub_title(v text)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT trim(regexp_replace(
    replace(replace(lower(unaccent(coalesce(v, ''))), 'й', 'и'), 'ё', 'е'),
    '[^a-zа-я0-9א-ת]+',
    ' ',
    'g'
  ));
$$;

DO $$
DECLARE
  keep_id uuid;
  drop_id uuid;
  moved_issues int := 0;
  dropped_subs int := 0;
  dropped_favs int := 0;
  has_sub_user_id boolean := false;
  has_sub_email boolean := false;
BEGIN
  -- Pick records by normalized Russian title variants
  WITH candidates AS (
    SELECT
      p.id,
      p.title_ru,
      p.title_en,
      p.title_he,
      p.total_issues,
      p.created_at,
      public.norm_pub_title(coalesce(p.title_ru, p.title_en, p.title_he)) AS n
    FROM public.publications p
    WHERE p.is_active = true
      AND public.norm_pub_title(coalesce(p.title_ru, p.title_en, p.title_he)) IN (
        public.norm_pub_title('Мааян Хай'),
        public.norm_pub_title('Мааян Хаи')
      )
  ), ranked AS (
    SELECT *, row_number() OVER (ORDER BY coalesce(total_issues, 0) DESC, created_at ASC) AS rn
    FROM candidates
  )
  SELECT
    (array_agg(id ORDER BY rn))[1],
    (array_agg(id ORDER BY rn))[2]
  INTO keep_id, drop_id
  FROM ranked;

  IF keep_id IS NULL OR drop_id IS NULL THEN
    RAISE NOTICE 'Merge skipped: expected 2 publications, found less.';
    RETURN;
  END IF;

  -- 1) Move issues
  UPDATE public.issues
  SET publication_id = keep_id,
      updated_at = now()
  WHERE publication_id = drop_id;
  GET DIAGNOSTICS moved_issues = ROW_COUNT;

  -- 2) favorites: avoid unique conflicts
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'favorite_publications'
  ) THEN
    DELETE FROM public.favorite_publications fp
    USING public.favorite_publications fp_keep
    WHERE fp.publication_id = drop_id
      AND fp_keep.publication_id = keep_id
      AND fp.user_id = fp_keep.user_id;
    GET DIAGNOSTICS dropped_favs = ROW_COUNT;

    UPDATE public.favorite_publications
    SET publication_id = keep_id
    WHERE publication_id = drop_id;
  END IF;

  -- 3) subscriptions: support both schemas
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'subscriptions' AND column_name = 'publication_id'
  ) THEN
    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'subscriptions' AND column_name = 'user_id'
    ) INTO has_sub_user_id;

    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'subscriptions' AND column_name = 'email'
    ) INTO has_sub_email;

    IF has_sub_user_id OR has_sub_email THEN
      EXECUTE format(
        'DELETE FROM public.subscriptions s
         USING public.subscriptions s_keep
         WHERE s.publication_id = %L::uuid
           AND s_keep.publication_id = %L::uuid
           AND (%s)',
        drop_id::text,
        keep_id::text,
        CASE
          WHEN has_sub_user_id AND has_sub_email THEN
            '(s.user_id IS NOT NULL AND s.user_id = s_keep.user_id) OR (s.email IS NOT NULL AND s.email = s_keep.email)'
          WHEN has_sub_user_id THEN
            '(s.user_id IS NOT NULL AND s.user_id = s_keep.user_id)'
          ELSE
            '(s.email IS NOT NULL AND s.email = s_keep.email)'
        END
      );
      GET DIAGNOSTICS dropped_subs = ROW_COUNT;
    END IF;

    UPDATE public.subscriptions
    SET publication_id = keep_id
    WHERE publication_id = drop_id;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'subscriptions' AND column_name = 'publication_ids'
  ) THEN
    UPDATE public.subscriptions
    SET publication_ids = (
      SELECT ARRAY(
        SELECT DISTINCT x
        FROM unnest(array_replace(coalesce(publication_ids, '{}'::uuid[]), drop_id, keep_id)) AS x
      )
    )
    WHERE publication_ids @> ARRAY[drop_id]::uuid[];
  END IF;

  -- 4) wp import link
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'wp_import' AND column_name = 'assigned_publication_id'
  ) THEN
    UPDATE public.wp_import
    SET assigned_publication_id = keep_id
    WHERE assigned_publication_id = drop_id;
  END IF;

  -- 5) enrich keep record from drop where keep has null/empty
  UPDATE public.publications k
  SET
    title_ru = CASE WHEN coalesce(k.title_ru, '') = '' THEN d.title_ru ELSE k.title_ru END,
    title_en = CASE WHEN coalesce(k.title_en, '') = '' THEN d.title_en ELSE k.title_en END,
    title_he = CASE WHEN coalesce(k.title_he, '') = '' THEN d.title_he ELSE k.title_he END,
    description_ru = CASE WHEN coalesce(k.description_ru, '') = '' THEN d.description_ru ELSE k.description_ru END,
    description_en = CASE WHEN coalesce(k.description_en, '') = '' THEN d.description_en ELSE k.description_en END,
    description_he = CASE WHEN coalesce(k.description_he, '') = '' THEN d.description_he ELSE k.description_he END,
    cover_image_url = CASE WHEN coalesce(k.cover_image_url, '') = '' THEN d.cover_image_url ELSE k.cover_image_url END,
    whatsapp_link = CASE WHEN coalesce(k.whatsapp_link, '') = '' THEN d.whatsapp_link ELSE k.whatsapp_link END,
    telegram_link = CASE WHEN coalesce(k.telegram_link, '') = '' THEN d.telegram_link ELSE k.telegram_link END,
    website_url = CASE WHEN coalesce(k.website_url, '') = '' THEN d.website_url ELSE k.website_url END,
    email = CASE WHEN coalesce(k.email, '') = '' THEN d.email ELSE k.email END,
    updated_at = now()
  FROM public.publications d
  WHERE k.id = keep_id AND d.id = drop_id;

  -- 6) recalc counters
  UPDATE public.publications p
  SET total_issues = (
      SELECT count(*) FROM public.issues i WHERE i.publication_id = p.id AND i.is_active = true
    ),
    updated_at = now()
  WHERE p.id = keep_id;

  -- 7) deactivate duplicate instead of hard delete
  UPDATE public.publications
  SET is_active = false,
      updated_at = now(),
      title_ru = CASE WHEN coalesce(title_ru, '') <> '' THEN title_ru || ' [MERGED]' ELSE title_ru END
  WHERE id = drop_id;

  RAISE NOTICE 'Merged publications. keep_id=%, drop_id=%, moved_issues=%, dropped_subscriptions=%, dropped_favorites=%',
    keep_id, drop_id, moved_issues, dropped_subs, dropped_favs;
END $$;

COMMIT;

-- Review 1: what got merged/deactivated
SELECT id, title_ru, title_en, title_he, is_active, total_issues, updated_at
FROM public.publications
WHERE public.norm_pub_title(coalesce(title_ru, title_en, title_he)) IN (
  public.norm_pub_title('Мааян Хай'),
  public.norm_pub_title('Мааян Хаи')
)
ORDER BY is_active DESC, updated_at DESC;

-- Review 2: other likely duplicates (manual review before merge)
WITH pubs AS (
  SELECT
    id,
    coalesce(title_ru, title_en, title_he) AS title,
    public.norm_pub_title(coalesce(title_ru, title_en, title_he)) AS n
  FROM public.publications
  WHERE is_active = true
), pairs AS (
  SELECT
    a.id AS id1,
    b.id AS id2,
    a.title AS title1,
    b.title AS title2,
    similarity(a.n, b.n) AS sim
  FROM pubs a
  JOIN pubs b ON a.id < b.id
  WHERE a.n <> ''
)
SELECT *
FROM pairs
WHERE sim >= 0.82
ORDER BY sim DESC, title1, title2
LIMIT 200;

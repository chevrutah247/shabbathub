-- Fix missing previews for Purim-related issues/publications
-- Run in Supabase SQL Editor

BEGIN;

-- 0) find Purim events (ru/en/he)
WITH purim_events AS (
  SELECT id
  FROM public.events
  WHERE is_active = true
    AND (
      lower(coalesce(name_ru, '')) LIKE '%пурим%'
      OR lower(coalesce(name_en, '')) LIKE '%purim%'
      OR coalesce(name_he, '') LIKE '%פורים%'
    )
)
SELECT count(*) AS purim_event_count FROM purim_events;

-- 1) Backfill issue thumbnail_url for Purim issues from Google Drive pdf_url
WITH purim_events AS (
  SELECT id
  FROM public.events
  WHERE is_active = true
    AND (
      lower(coalesce(name_ru, '')) LIKE '%пурим%'
      OR lower(coalesce(name_en, '')) LIKE '%purim%'
      OR coalesce(name_he, '') LIKE '%פורים%'
    )
), src AS (
  SELECT
    i.id,
    (
      'https://drive.google.com/thumbnail?id=' ||
      COALESCE(
        (regexp_match(i.pdf_url, '/file/d/([A-Za-z0-9_-]+)'))[1],
        (regexp_match(i.pdf_url, '[?&]id=([A-Za-z0-9_-]+)'))[1],
        (regexp_match(i.pdf_url, '/d/([A-Za-z0-9_-]+)'))[1]
      ) || '&sz=w600'
    ) AS drive_thumb
  FROM public.issues i
  WHERE i.is_active = true
    AND i.event_id IN (SELECT id FROM purim_events)
    AND (i.thumbnail_url IS NULL OR i.thumbnail_url = '')
    AND i.pdf_url IS NOT NULL
    AND (i.pdf_url LIKE '%drive.google.com%' OR i.pdf_url LIKE '%docs.google.com%')
)
UPDATE public.issues i
SET thumbnail_url = src.drive_thumb,
    updated_at = now()
FROM src
WHERE i.id = src.id
  AND src.drive_thumb IS NOT NULL
  AND src.drive_thumb <> 'https://drive.google.com/thumbnail?id=&sz=w600';

-- 2) Backfill publication cover_image_url from latest Purim issue preview (thumbnail or drive fallback)
WITH purim_events AS (
  SELECT id
  FROM public.events
  WHERE is_active = true
    AND (
      lower(coalesce(name_ru, '')) LIKE '%пурим%'
      OR lower(coalesce(name_en, '')) LIKE '%purim%'
      OR coalesce(name_he, '') LIKE '%פורים%'
    )
), src AS (
  SELECT DISTINCT ON (i.publication_id)
    i.publication_id,
    COALESCE(
      NULLIF(i.thumbnail_url, ''),
      (
        'https://drive.google.com/thumbnail?id=' ||
        COALESCE(
          (regexp_match(i.pdf_url, '/file/d/([A-Za-z0-9_-]+)'))[1],
          (regexp_match(i.pdf_url, '[?&]id=([A-Za-z0-9_-]+)'))[1],
          (regexp_match(i.pdf_url, '/d/([A-Za-z0-9_-]+)'))[1]
        ) || '&sz=w600'
      )
    ) AS resolved_cover
  FROM public.issues i
  WHERE i.is_active = true
    AND i.event_id IN (SELECT id FROM purim_events)
  ORDER BY i.publication_id, i.created_at DESC
)
UPDATE public.publications p
SET cover_image_url = src.resolved_cover,
    updated_at = now()
FROM src
WHERE p.id = src.publication_id
  AND p.is_active = true
  AND (p.cover_image_url IS NULL OR p.cover_image_url = '')
  AND src.resolved_cover IS NOT NULL
  AND src.resolved_cover <> 'https://drive.google.com/thumbnail?id=&sz=w600';

COMMIT;

-- 3) Verify unresolved Purim issues without thumbnails
WITH purim_events AS (
  SELECT id
  FROM public.events
  WHERE is_active = true
    AND (
      lower(coalesce(name_ru, '')) LIKE '%пурим%'
      OR lower(coalesce(name_en, '')) LIKE '%purim%'
      OR coalesce(name_he, '') LIKE '%פורים%'
    )
)
SELECT i.id, i.title, i.pdf_url
FROM public.issues i
WHERE i.is_active = true
  AND i.event_id IN (SELECT id FROM purim_events)
  AND (i.thumbnail_url IS NULL OR i.thumbnail_url = '')
ORDER BY i.created_at DESC
LIMIT 200;

-- 4) Verify unresolved Purim publications without covers
WITH purim_events AS (
  SELECT id
  FROM public.events
  WHERE is_active = true
    AND (
      lower(coalesce(name_ru, '')) LIKE '%пурим%'
      OR lower(coalesce(name_en, '')) LIKE '%purim%'
      OR coalesce(name_he, '') LIKE '%פורים%'
    )
), purim_pubs AS (
  SELECT DISTINCT publication_id
  FROM public.issues
  WHERE is_active = true
    AND event_id IN (SELECT id FROM purim_events)
    AND publication_id IS NOT NULL
)
SELECT p.id, p.title_ru, p.title_en, p.title_he
FROM public.publications p
WHERE p.is_active = true
  AND p.id IN (SELECT publication_id FROM purim_pubs)
  AND (p.cover_image_url IS NULL OR p.cover_image_url = '')
ORDER BY p.updated_at DESC
LIMIT 200;

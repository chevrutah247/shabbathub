-- Fix missing publication covers from latest issue previews
-- Run in Supabase SQL Editor (service role context)

-- 1) Backfill issues.thumbnail_url from Google Drive pdf_url (if possible)
UPDATE public.issues i
SET thumbnail_url = src.drive_thumb,
    updated_at = NOW()
FROM (
  SELECT
    id,
    (
      'https://drive.google.com/thumbnail?id=' ||
      COALESCE(
        (regexp_match(pdf_url, '/file/d/([A-Za-z0-9_-]+)'))[1],
        (regexp_match(pdf_url, '[?&]id=([A-Za-z0-9_-]+)'))[1],
        (regexp_match(pdf_url, '/d/([A-Za-z0-9_-]+)'))[1]
      ) ||
      '&sz=w600'
    ) AS drive_thumb
  FROM public.issues
  WHERE is_active = true
    AND (thumbnail_url IS NULL OR thumbnail_url = '')
    AND pdf_url IS NOT NULL
    AND (pdf_url LIKE '%drive.google.com%' OR pdf_url LIKE '%docs.google.com%')
) AS src
WHERE i.id = src.id
  AND src.drive_thumb IS NOT NULL
  AND src.drive_thumb <> 'https://drive.google.com/thumbnail?id=&sz=w600';

-- 2) Fill publication covers from newest issue preview (thumbnail or drive fallback)
UPDATE public.publications p
SET cover_image_url = src.resolved_cover,
    updated_at = NOW()
FROM (
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
        ) ||
        '&sz=w600'
      )
    ) AS resolved_cover
  FROM public.issues i
  WHERE i.is_active = true
  ORDER BY i.publication_id, i.created_at DESC
) AS src
WHERE p.id = src.publication_id
  AND p.is_active = true
  AND (p.cover_image_url IS NULL OR p.cover_image_url = '')
  AND src.resolved_cover IS NOT NULL
  AND src.resolved_cover <> 'https://drive.google.com/thumbnail?id=&sz=w600';

-- 3) Check unresolved publications (still without covers)
SELECT id, title_ru, title_en, title_he
FROM public.publications
WHERE is_active = true
  AND (cover_image_url IS NULL OR cover_image_url = '')
ORDER BY created_at DESC;

-- 4) List unresolved issues without thumbnails
SELECT id, title, pdf_url
FROM public.issues
WHERE is_active = true
  AND (thumbnail_url IS NULL OR thumbnail_url = '')
ORDER BY created_at DESC;

-- Safe dedupe + prevention constraints
-- Run in Supabase SQL Editor

-- 1) Deactivate duplicate issues by identical PDF URL (keep newest active row)
WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY pdf_url
      ORDER BY created_at DESC, id DESC
    ) AS rn
  FROM public.issues
  WHERE is_active = true
    AND pdf_url IS NOT NULL
    AND pdf_url <> ''
)
UPDATE public.issues i
SET is_active = false,
    updated_at = NOW()
FROM ranked r
WHERE i.id = r.id
  AND r.rn > 1;

-- 2) Deactivate duplicate issues by (publication_id, issue_number)
WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY publication_id, issue_number
      ORDER BY created_at DESC, id DESC
    ) AS rn
  FROM public.issues
  WHERE is_active = true
    AND publication_id IS NOT NULL
    AND issue_number IS NOT NULL
    AND issue_number <> ''
)
UPDATE public.issues i
SET is_active = false,
    updated_at = NOW()
FROM ranked r
WHERE i.id = r.id
  AND r.rn > 1;

-- 3) Deactivate duplicate publications by normalized main title
WITH source AS (
  SELECT
    id,
    lower(trim(coalesce(title_ru, title_en, title_he, ''))) AS norm_title,
    created_at
  FROM public.publications
  WHERE is_active = true
),
ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY norm_title
      ORDER BY created_at DESC, id DESC
    ) AS rn
  FROM source
  WHERE norm_title <> ''
)
UPDATE public.publications p
SET is_active = false,
    updated_at = NOW()
FROM ranked r
WHERE p.id = r.id
  AND r.rn > 1;

-- 4) Constraints that prevent new duplicates
CREATE UNIQUE INDEX IF NOT EXISTS uq_issues_active_pdf_url
ON public.issues (pdf_url)
WHERE is_active = true
  AND pdf_url IS NOT NULL
  AND pdf_url <> '';

CREATE UNIQUE INDEX IF NOT EXISTS uq_issues_active_pub_issue_number
ON public.issues (publication_id, issue_number)
WHERE is_active = true
  AND publication_id IS NOT NULL
  AND issue_number IS NOT NULL
  AND issue_number <> '';

CREATE UNIQUE INDEX IF NOT EXISTS uq_publications_active_norm_title
ON public.publications ((lower(trim(coalesce(title_ru, title_en, title_he, '')))))
WHERE is_active = true
  AND trim(coalesce(title_ru, title_en, title_he, '')) <> '';

-- 5) Verification queries
SELECT pdf_url, COUNT(*) AS cnt
FROM public.issues
WHERE is_active = true AND pdf_url IS NOT NULL AND pdf_url <> ''
GROUP BY pdf_url
HAVING COUNT(*) > 1;

SELECT publication_id, issue_number, COUNT(*) AS cnt
FROM public.issues
WHERE is_active = true
  AND publication_id IS NOT NULL
  AND issue_number IS NOT NULL
  AND issue_number <> ''
GROUP BY publication_id, issue_number
HAVING COUNT(*) > 1;

SELECT lower(trim(coalesce(title_ru, title_en, title_he, ''))) AS norm_title, COUNT(*) AS cnt
FROM public.publications
WHERE is_active = true
GROUP BY lower(trim(coalesce(title_ru, title_en, title_he, '')))
HAVING COUNT(*) > 1
   AND lower(trim(coalesce(title_ru, title_en, title_he, ''))) <> '';


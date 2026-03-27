-- Content Indexing for ShabbatHub
-- Adds full-text search capability to issues

-- 1. New columns on issues table
ALTER TABLE issues ADD COLUMN IF NOT EXISTS content_text TEXT;
ALTER TABLE issues ADD COLUMN IF NOT EXISTS ai_summary TEXT;
ALTER TABLE issues ADD COLUMN IF NOT EXISTS indexed_at TIMESTAMPTZ;
ALTER TABLE issues ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- 2. Indexes
CREATE INDEX IF NOT EXISTS idx_issues_search ON issues USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_issues_indexed_at ON issues(indexed_at);

-- 3. Trigger function to auto-update search_vector
CREATE OR REPLACE FUNCTION update_issue_search_vector() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.content_text IS NOT NULL THEN
    NEW.search_vector := to_tsvector('simple',
      coalesce(NEW.content_text, '') || ' ' ||
      coalesce(NEW.ai_summary, '') || ' ' ||
      coalesce(NEW.title, ''));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Trigger on insert/update
DROP TRIGGER IF EXISTS issues_search_update ON issues;
CREATE TRIGGER issues_search_update
  BEFORE INSERT OR UPDATE OF content_text, ai_summary, title ON issues
  FOR EACH ROW EXECUTE FUNCTION update_issue_search_vector();

-- 5. Bulk update search_vector for already-indexed issues (run after Phase 2)
-- UPDATE issues
-- SET search_vector = to_tsvector('simple',
--   coalesce(content_text, '') || ' ' ||
--   coalesce(ai_summary, '') || ' ' ||
--   coalesce(title, ''))
-- WHERE content_text IS NOT NULL AND search_vector IS NULL;

-- 6. RPC function for ranked full-text search
CREATE OR REPLACE FUNCTION search_issues(
  query text,
  result_limit int DEFAULT 50,
  result_offset int DEFAULT 0
)
RETURNS TABLE(
  id uuid,
  title text,
  pdf_url text,
  thumbnail_url text,
  gregorian_date date,
  publication_id uuid,
  parsha_id int,
  event_id text,
  issue_number text,
  ai_summary text,
  description text,
  rank real
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    i.id, i.title, i.pdf_url, i.thumbnail_url,
    i.gregorian_date, i.publication_id,
    i.parsha_id, i.event_id, i.issue_number,
    i.ai_summary, i.description,
    ts_rank(i.search_vector, websearch_to_tsquery('simple', query)) AS rank
  FROM issues i
  WHERE i.is_active = true
    AND i.search_vector @@ websearch_to_tsquery('simple', query)
  ORDER BY rank DESC
  LIMIT result_limit
  OFFSET result_offset;
END;
$$ LANGUAGE plpgsql;

-- 7. Count function for search pagination
CREATE OR REPLACE FUNCTION search_issues_count(query text)
RETURNS bigint AS $$
  SELECT count(*)
  FROM issues i
  WHERE i.is_active = true
    AND i.search_vector @@ websearch_to_tsquery('simple', query);
$$ LANGUAGE sql;

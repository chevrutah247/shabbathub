-- Update search_vector trigger to include topic_keys in full-text search
-- Run this in Supabase SQL Editor

CREATE OR REPLACE FUNCTION update_issue_search_vector() RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('simple',
    coalesce(NEW.content_text, '') || ' ' ||
    coalesce(NEW.ai_summary, '') || ' ' ||
    coalesce(NEW.title, '') || ' ' ||
    coalesce(NEW.topic_terms, '') || ' ' ||
    coalesce(array_to_string(NEW.topic_keys, ' '), ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update trigger to also fire on topic_keys changes
DROP TRIGGER IF EXISTS issues_search_update ON issues;
CREATE TRIGGER issues_search_update
  BEFORE INSERT OR UPDATE OF content_text, ai_summary, title, topic_keys, topic_terms ON issues
  FOR EACH ROW EXECUTE FUNCTION update_issue_search_vector();

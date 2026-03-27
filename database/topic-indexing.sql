-- Topic + detailed description indexing for issues
-- Safe to run multiple times

CREATE EXTENSION IF NOT EXISTS pg_trgm;

ALTER TABLE public.issues
  ADD COLUMN IF NOT EXISTS topic_keys TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS topic_terms TEXT;

CREATE INDEX IF NOT EXISTS idx_issues_topic_keys ON public.issues USING GIN (topic_keys);
CREATE INDEX IF NOT EXISTS idx_issues_topic_terms_trgm ON public.issues USING GIN (topic_terms gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_issues_ai_summary_trgm ON public.issues USING GIN (ai_summary gin_trgm_ops);

-- If content indexing trigger was not added before, execute database/content-indexing.sql too.

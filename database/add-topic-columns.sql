-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- Adds topic_keys and topic_terms columns for content-based filtering

-- Add columns
ALTER TABLE public.issues ADD COLUMN IF NOT EXISTS topic_keys TEXT[];
ALTER TABLE public.issues ADD COLUMN IF NOT EXISTS topic_terms TEXT;

-- Add indexes for fast filtering
CREATE INDEX IF NOT EXISTS idx_issues_topic_keys ON public.issues USING GIN (topic_keys);
CREATE INDEX IF NOT EXISTS idx_issues_topic_terms_trgm ON public.issues USING GIN (topic_terms gin_trgm_ops);

-- Create RPC function for running SQL (useful for future migrations)
CREATE OR REPLACE FUNCTION public.run_sql(query TEXT)
RETURNS void AS $$
BEGIN
  EXECUTE query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

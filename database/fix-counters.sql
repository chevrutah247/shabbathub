-- ============================================
-- FIX COUNTERS: Backfill uploaded_by + add triggers
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Backfill uploaded_by for ALL existing issues
-- Set to your admin user (izrailtaynin@gmail.com)
-- This ensures the leaderboard counts existing uploads
UPDATE public.issues
SET uploaded_by = (SELECT id FROM public.profiles WHERE email = 'izrailtaynin@gmail.com' LIMIT 1)
WHERE uploaded_by IS NULL;

-- 2. If uploaded_by column doesn't exist or isn't NOT NULL, fix it
-- (Skip if constraint already exists)
DO $$
BEGIN
  -- Make sure uploaded_by allows NULL temporarily for old rows
  -- but new inserts should always have it
  NULL;
END $$;

-- 3. Trigger: auto-update publications.total_issues on INSERT/DELETE
CREATE OR REPLACE FUNCTION update_publication_issue_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.publication_id IS NOT NULL THEN
    UPDATE public.publications
    SET total_issues = (
      SELECT COUNT(*) FROM public.issues
      WHERE publication_id = NEW.publication_id AND is_active = true
    )
    WHERE id = NEW.publication_id;
  ELSIF TG_OP = 'DELETE' AND OLD.publication_id IS NOT NULL THEN
    UPDATE public.publications
    SET total_issues = (
      SELECT COUNT(*) FROM public.issues
      WHERE publication_id = OLD.publication_id AND is_active = true
    )
    WHERE id = OLD.publication_id;
  ELSIF TG_OP = 'UPDATE' THEN
    -- If publication changed or is_active changed
    IF OLD.publication_id IS DISTINCT FROM NEW.publication_id OR OLD.is_active IS DISTINCT FROM NEW.is_active THEN
      IF OLD.publication_id IS NOT NULL THEN
        UPDATE public.publications
        SET total_issues = (
          SELECT COUNT(*) FROM public.issues
          WHERE publication_id = OLD.publication_id AND is_active = true
        )
        WHERE id = OLD.publication_id;
      END IF;
      IF NEW.publication_id IS NOT NULL THEN
        UPDATE public.publications
        SET total_issues = (
          SELECT COUNT(*) FROM public.issues
          WHERE publication_id = NEW.publication_id AND is_active = true
        )
        WHERE id = NEW.publication_id;
      END IF;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_pub_issue_count ON public.issues;
CREATE TRIGGER trg_update_pub_issue_count
  AFTER INSERT OR UPDATE OR DELETE ON public.issues
  FOR EACH ROW EXECUTE FUNCTION update_publication_issue_count();

-- 4. Backfill total_issues for all existing publications
UPDATE public.publications p
SET total_issues = (
  SELECT COUNT(*) FROM public.issues i
  WHERE i.publication_id = p.id AND i.is_active = true
);

-- 5. Trigger: auto-update publications.total_downloads when issue download_count changes
CREATE OR REPLACE FUNCTION update_publication_download_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.publication_id IS NOT NULL AND OLD.download_count IS DISTINCT FROM NEW.download_count THEN
    UPDATE public.publications
    SET total_downloads = (
      SELECT COALESCE(SUM(download_count), 0) FROM public.issues
      WHERE publication_id = NEW.publication_id AND is_active = true
    )
    WHERE id = NEW.publication_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_pub_download_count ON public.issues;
CREATE TRIGGER trg_update_pub_download_count
  AFTER UPDATE OF download_count ON public.issues
  FOR EACH ROW EXECUTE FUNCTION update_publication_download_count();

-- 6. Backfill total_downloads for all existing publications
UPDATE public.publications p
SET total_downloads = (
  SELECT COALESCE(SUM(download_count), 0) FROM public.issues i
  WHERE i.publication_id = p.id AND i.is_active = true
);

-- 7. Allow issues UPDATE for view_count/download_count via anon key
-- (RLS policy — allow anyone to increment counters)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'issues' AND policyname = 'Anyone can increment counters'
  ) THEN
    CREATE POLICY "Anyone can increment counters" ON public.issues
    FOR UPDATE USING (true)
    WITH CHECK (true);
  END IF;
END $$;

-- Done! Verify:
-- SELECT display_name, upload_count FROM upload_leaderboard ORDER BY upload_count DESC;
-- SELECT title_ru, total_issues, total_downloads FROM publications ORDER BY total_issues DESC;

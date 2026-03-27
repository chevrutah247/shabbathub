-- Atomic Counter Functions
-- Fixes race conditions in view_count and download_count increments
-- Run this in Supabase SQL Editor

-- Drop old versions first (parameter name was "issue_uuid")
DROP FUNCTION IF EXISTS public.increment_view_count(UUID);
DROP FUNCTION IF EXISTS public.increment_download_count(UUID);

-- Atomic increment for view_count
CREATE FUNCTION public.increment_view_count(issue_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.issues
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = issue_id AND is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Atomic increment for download_count
CREATE FUNCTION public.increment_download_count(issue_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.issues
  SET download_count = COALESCE(download_count, 0) + 1
  WHERE id = issue_id AND is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant access to authenticated users
GRANT EXECUTE ON FUNCTION public.increment_view_count(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_download_count(UUID) TO authenticated;
-- Grant to anon for view counting from non-logged-in users
GRANT EXECUTE ON FUNCTION public.increment_view_count(UUID) TO anon;

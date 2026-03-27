-- RLS Role Protection Migration
-- Prevents users from self-escalating their role via profiles table
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. Helper function to check admin status
--    SECURITY DEFINER bypasses RLS — avoids infinite recursion
-- ============================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================
-- 2. Trigger to protect role column from non-admins
-- ============================================

CREATE OR REPLACE FUNCTION public.protect_role_column()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    IF NOT public.is_admin() THEN
      NEW.role := OLD.role;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS protect_role_on_profiles ON public.profiles;
CREATE TRIGGER protect_role_on_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_role_column();

-- ============================================
-- 3. Profile policies
-- ============================================

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
CREATE POLICY "Admins can update any profile" ON public.profiles
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================
-- 4. Publication policies (admin)
-- ============================================

DROP POLICY IF EXISTS "Active publications are viewable by everyone" ON public.publications;
DROP POLICY IF EXISTS "Admins can view all publications" ON public.publications;
CREATE POLICY "Publications viewable" ON public.publications
  FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admins can manage all publications" ON public.publications;
DROP POLICY IF EXISTS "Admins can delete publications" ON public.publications;

CREATE POLICY "Admins can update publications" ON public.publications
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete publications" ON public.publications
  FOR DELETE USING (public.is_admin());

-- ============================================
-- 5. Issue policies (admin)
-- ============================================

DROP POLICY IF EXISTS "Active issues are viewable by everyone" ON public.issues;
DROP POLICY IF EXISTS "Admins can view all issues" ON public.issues;
CREATE POLICY "Issues viewable" ON public.issues
  FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admins can manage all issues" ON public.issues;
DROP POLICY IF EXISTS "Admins can delete issues" ON public.issues;

CREATE POLICY "Admins can update issues" ON public.issues
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete issues" ON public.issues
  FOR DELETE USING (public.is_admin());

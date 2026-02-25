-- Volunteer-first registration + protected shadchanim directory
-- Run in Supabase SQL Editor (production) after backup.

BEGIN;

-- 1) Extend roles to include volunteer + verified.
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('admin', 'editor', 'author', 'subscriber', 'volunteer', 'verified'));

-- New registrations are volunteers by default.
ALTER TABLE public.profiles
  ALTER COLUMN role SET DEFAULT 'volunteer';

-- 2) Ensure trigger assigns volunteer role by default for new auth users.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, role)
    VALUES (NEW.id, NEW.email, 'volunteer')
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3) Referrals table: track registered users (if old schema exists, add missing columns).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'referrals'
  ) THEN
    CREATE TABLE public.referrals (
      id BIGSERIAL PRIMARY KEY,
      referrer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
      referred_user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      registered_at TIMESTAMPTZ NULL
    );
  ELSE
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema='public' AND table_name='referrals' AND column_name='referred_user_id'
    ) THEN
      ALTER TABLE public.referrals
        ADD COLUMN referred_user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE SET NULL;
    END IF;
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema='public' AND table_name='referrals' AND column_name='registered_at'
    ) THEN
      ALTER TABLE public.referrals
        ADD COLUMN registered_at TIMESTAMPTZ NULL;
    END IF;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON public.referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_user_id ON public.referrals(referred_user_id);

-- 4) Protected shadchanim directory.
CREATE TABLE IF NOT EXISTS public.shadchanim (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  city TEXT,
  country TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

ALTER TABLE public.shadchanim ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Verified can read shadchanim" ON public.shadchanim;
CREATE POLICY "Verified can read shadchanim"
  ON public.shadchanim
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('verified', 'admin', 'editor')
    )
  );

DROP POLICY IF EXISTS "Admins can manage shadchanim" ON public.shadchanim;
CREATE POLICY "Admins can manage shadchanim"
  ON public.shadchanim
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('admin', 'editor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('admin', 'editor')
    )
  );

COMMIT;

-- Marketplace core tables and search indexes
-- Run in Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS public.market_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,

  title TEXT NOT NULL,
  description TEXT,

  country TEXT,
  city TEXT,
  district TEXT,
  address_text TEXT,

  dishes TEXT[] DEFAULT '{}',
  products TEXT[] DEFAULT '{}',
  photos TEXT[] DEFAULT '{}',

  price NUMERIC(12,2),
  currency TEXT DEFAULT 'ILS',

  seller_name TEXT,
  seller_contact TEXT,

  rabbi_reference_name TEXT,
  rabbi_reference_contact TEXT,
  rabbi_reference_note TEXT,
  is_kosher_verified BOOLEAN DEFAULT false,

  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'published', 'rejected', 'archived')),
  is_active BOOLEAN NOT NULL DEFAULT true,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_market_listings_created_at ON public.market_listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_market_listings_geo ON public.market_listings(country, city, district);
CREATE INDEX IF NOT EXISTS idx_market_listings_dishes ON public.market_listings USING GIN(dishes);
CREATE INDEX IF NOT EXISTS idx_market_listings_products ON public.market_listings USING GIN(products);
CREATE INDEX IF NOT EXISTS idx_market_title_trgm ON public.market_listings USING GIN(title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_market_desc_trgm ON public.market_listings USING GIN(description gin_trgm_ops);

ALTER TABLE public.market_listings ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'market_listings' AND policyname = 'Published market listings are visible to everyone'
  ) THEN
    CREATE POLICY "Published market listings are visible to everyone"
      ON public.market_listings FOR SELECT
      USING (is_active = true AND status = 'published');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'market_listings' AND policyname = 'Authenticated users can create own listings'
  ) THEN
    CREATE POLICY "Authenticated users can create own listings"
      ON public.market_listings FOR INSERT
      WITH CHECK (auth.role() = 'authenticated' AND created_by = auth.uid());
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'market_listings' AND policyname = 'Users can update own listings'
  ) THEN
    CREATE POLICY "Users can update own listings"
      ON public.market_listings FOR UPDATE
      USING (created_by = auth.uid());
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'market_listings' AND policyname = 'Admins can moderate listings'
  ) THEN
    CREATE POLICY "Admins can moderate listings"
      ON public.market_listings FOR ALL
      USING (
        EXISTS (
          SELECT 1 FROM public.profiles
          WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'editor')
        )
      );
  END IF;
END $$;

DROP TRIGGER IF EXISTS update_market_listings_updated_at ON public.market_listings;
CREATE TRIGGER update_market_listings_updated_at
  BEFORE UPDATE ON public.market_listings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Download protection tables + indexes
-- Run in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.download_events (
  id BIGSERIAL PRIMARY KEY,
  issue_id UUID NULL REFERENCES public.issues(id) ON DELETE SET NULL,
  user_id UUID NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
  ip TEXT,
  user_agent TEXT,
  status TEXT NOT NULL CHECK (status IN ('ok', 'blocked', 'rate_limited', 'denied', 'error')),
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_download_events_created_at ON public.download_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_download_events_user_time ON public.download_events(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_download_events_ip_time ON public.download_events(ip, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_download_events_status_time ON public.download_events(status, created_at DESC);

CREATE TABLE IF NOT EXISTS public.blocked_download_clients (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  ip TEXT NULL,
  reason TEXT,
  blocked_until TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (user_id IS NOT NULL OR ip IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_blocked_download_clients_until ON public.blocked_download_clients(blocked_until DESC);
CREATE INDEX IF NOT EXISTS idx_blocked_download_clients_user ON public.blocked_download_clients(user_id);
CREATE INDEX IF NOT EXISTS idx_blocked_download_clients_ip ON public.blocked_download_clients(ip);

ALTER TABLE public.download_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_download_clients ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='download_events' AND policyname='Admins can read download events'
  ) THEN
    CREATE POLICY "Admins can read download events"
      ON public.download_events FOR SELECT
      USING (
        EXISTS (
          SELECT 1 FROM public.profiles
          WHERE profiles.id = auth.uid() AND profiles.role IN ('admin','editor')
        )
      );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='download_events' AND policyname='Service role can insert download events'
  ) THEN
    CREATE POLICY "Service role can insert download events"
      ON public.download_events FOR INSERT
      WITH CHECK (auth.role() = 'service_role');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='blocked_download_clients' AND policyname='Admins can manage blocked download clients'
  ) THEN
    CREATE POLICY "Admins can manage blocked download clients"
      ON public.blocked_download_clients FOR ALL
      USING (
        EXISTS (
          SELECT 1 FROM public.profiles
          WHERE profiles.id = auth.uid() AND profiles.role IN ('admin','editor')
        )
      )
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.profiles
          WHERE profiles.id = auth.uid() AND profiles.role IN ('admin','editor')
        )
      );
  END IF;
END $$;

-- quick verification queries
-- SELECT status, count(*) FROM public.download_events WHERE created_at > now() - interval '24 hours' GROUP BY status;
-- SELECT * FROM public.blocked_download_clients WHERE blocked_until > now() ORDER BY blocked_until DESC;

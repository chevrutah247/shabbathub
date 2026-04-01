-- HaYom Yom daily entries table
-- Run in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.hayom_yom (
  id SERIAL PRIMARY KEY,
  hebrew_month TEXT NOT NULL,       -- e.g. 'Nisan', 'Kislev' (hebcal format)
  hebrew_day INTEGER NOT NULL,      -- e.g. 14
  header TEXT NOT NULL,             -- e.g. 'Понедельник 14 Нисана 5703'
  lessons TEXT,                     -- Daily study schedule
  main_text TEXT NOT NULL,          -- Main teaching/story
  source TEXT,                      -- Source attribution
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(hebrew_month, hebrew_day)
);

-- RLS
ALTER TABLE public.hayom_yom ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON public.hayom_yom FOR SELECT USING (true);

-- Index
CREATE INDEX IF NOT EXISTS idx_hayom_yom_date ON public.hayom_yom (hebrew_month, hebrew_day);

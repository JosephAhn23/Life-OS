-- Create psychologist_logs table in Supabase
CREATE TABLE IF NOT EXISTS public.psychologist_logs (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  sleep_quality NUMERIC(4,1) DEFAULT 0 CHECK (sleep_quality >= 0 AND sleep_quality <= 10),
  mental_emotional_load NUMERIC(4,1) DEFAULT 0 CHECK (mental_emotional_load >= 0 AND mental_emotional_load <= 10),
  environmental_stress NUMERIC(4,1) DEFAULT 0 CHECK (environmental_stress >= 0 AND environmental_stress <= 10),
  stress_score NUMERIC(4,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add index on date for faster queries
CREATE INDEX IF NOT EXISTS idx_psychologist_logs_date ON public.psychologist_logs(date);
CREATE INDEX IF NOT EXISTS idx_psychologist_logs_created_at ON public.psychologist_logs(created_at DESC);

-- Enable Row Level Security (RLS) - adjust policies as needed
ALTER TABLE public.psychologist_logs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your security needs)
CREATE POLICY "Allow all operations on psychologist_logs" ON public.psychologist_logs
  FOR ALL USING (true) WITH CHECK (true);


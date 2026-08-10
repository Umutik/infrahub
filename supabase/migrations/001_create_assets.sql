CREATE TABLE IF NOT EXISTS public.assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_name TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  environment TEXT NOT NULL,
  owner UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'active'
    CONSTRAINT assets_status_check
    CHECK (status IN ('active', 'inactive', 'retired', 'maintenance')),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS update_assets_updated_at ON public.assets;

CREATE TRIGGER update_assets_updated_at
  BEFORE UPDATE ON public.assets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();


ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;


DROP POLICY IF EXISTS "Authenticated users can view all assets"
  ON public.assets;

DROP POLICY IF EXISTS "Authenticated users can create assets"
  ON public.assets;

DROP POLICY IF EXISTS "Enable users to view their own data only"
  ON public.assets;

DROP POLICY IF EXISTS "Users can update their own assets"
  ON public.assets;

DROP POLICY IF EXISTS "Users can delete their own assets"
  ON public.assets;


CREATE POLICY "Enable users to view their own data only"
  ON public.assets
  FOR SELECT
  USING (owner = auth.uid());


CREATE POLICY "Authenticated users can create assets"
  ON public.assets
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');


CREATE POLICY "Users can update their own assets"
  ON public.assets
  FOR UPDATE
  USING (owner = auth.uid())
  WITH CHECK (owner = auth.uid());


CREATE POLICY "Users can delete their own assets"
  ON public.assets
  FOR DELETE
  USING (owner = auth.uid());
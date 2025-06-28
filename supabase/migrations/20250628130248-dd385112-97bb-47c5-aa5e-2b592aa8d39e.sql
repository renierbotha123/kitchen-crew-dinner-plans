
-- Ensure the households table has RLS enabled
ALTER TABLE public.households ENABLE ROW LEVEL SECURITY;

-- Drop and recreate the INSERT policy to ensure it's working correctly
DROP POLICY IF EXISTS "Authenticated users can create households" ON public.households;

-- Create a clear INSERT policy that allows any authenticated user to create households
CREATE POLICY "Allow authenticated users to insert households"
  ON public.households
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

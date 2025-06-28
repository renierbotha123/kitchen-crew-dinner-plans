
-- First, let's drop any existing conflicting policies to start clean
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can select their own profile" ON public.profiles;

DROP POLICY IF EXISTS "Allow authenticated users to insert households" ON public.households;
DROP POLICY IF EXISTS "Users can view their household" ON public.households;
DROP POLICY IF EXISTS "Household members can update household" ON public.households;

-- Create the get_user_household_id() function for household SELECT policy
CREATE OR REPLACE FUNCTION public.get_user_household_id()
RETURNS UUID
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT household_id FROM public.profiles WHERE id = auth.uid();
$$;

-- PROFILES TABLE POLICIES (exactly matching your old project)
CREATE POLICY "Select own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Insert own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "Update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- HOUSEHOLDS TABLE POLICIES (adapted for your current schema)
CREATE POLICY "Users can create households"
  ON public.households
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own household"
  ON public.households
  FOR SELECT
  TO authenticated
  USING (id = public.get_user_household_id());

-- Simplified UPDATE policy since you don't have roles yet
-- This allows any household member to update their household
CREATE POLICY "Household members can update their household"
  ON public.households
  FOR UPDATE
  TO authenticated
  USING (id = public.get_user_household_id())
  WITH CHECK (id = public.get_user_household_id());

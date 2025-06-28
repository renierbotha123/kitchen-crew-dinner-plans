
-- Drop existing policies that cause infinite recursion
DROP POLICY IF EXISTS "Users can view profiles in their household" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

DROP POLICY IF EXISTS "Users can view their own household" ON public.households;
DROP POLICY IF EXISTS "Users can create households" ON public.households;
DROP POLICY IF EXISTS "Household members can update their household" ON public.households;

-- Create new, non-recursive policies for profiles table
-- Allow users to view only their own profile (no household check needed)
CREATE POLICY "Users can view own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- Allow authenticated users to insert their own profile during signup
CREATE POLICY "Users can insert own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Allow users to update only their own profile
CREATE POLICY "Users can update own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create new policies for households table
-- Allow any authenticated user to create households
CREATE POLICY "Authenticated users can create households" 
  ON public.households 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Allow users to view households they belong to (using direct household_id check)
CREATE POLICY "Users can view their household" 
  ON public.households 
  FOR SELECT 
  USING (
    id = (
      SELECT household_id 
      FROM public.profiles 
      WHERE id = auth.uid() 
      AND household_id IS NOT NULL
    )
  );

-- Allow household members to update their household
CREATE POLICY "Household members can update household" 
  ON public.households 
  FOR UPDATE 
  USING (
    id = (
      SELECT household_id 
      FROM public.profiles 
      WHERE id = auth.uid() 
      AND household_id IS NOT NULL
    )
  )
  WITH CHECK (
    id = (
      SELECT household_id 
      FROM public.profiles 
      WHERE id = auth.uid() 
      AND household_id IS NOT NULL
    )
  );

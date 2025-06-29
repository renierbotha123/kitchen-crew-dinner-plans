
-- First, let's check if there are RLS policies on profiles that might be blocking access
-- We need to allow users to see profiles of other members in their household

-- Create a policy that allows users to see profiles of members in their households
CREATE POLICY "Users can view household member profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (
    id IN (
      SELECT uh.user_id 
      FROM public.user_households uh 
      WHERE uh.household_id IN (
        SELECT household_id 
        FROM public.user_households 
        WHERE user_id = auth.uid()
      )
    )
  );

-- Also ensure the user_households table has proper policies
CREATE POLICY "Users can view household memberships in their households" 
  ON public.user_households 
  FOR SELECT 
  USING (
    household_id IN (
      SELECT household_id 
      FROM public.user_households 
      WHERE user_id = auth.uid()
    )
  );

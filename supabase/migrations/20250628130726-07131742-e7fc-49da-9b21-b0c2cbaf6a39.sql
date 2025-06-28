
-- Add SELECT policy for profiles to allow users to view their own profile
-- This is needed for foreign key validation when creating households
CREATE POLICY "Users can select their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

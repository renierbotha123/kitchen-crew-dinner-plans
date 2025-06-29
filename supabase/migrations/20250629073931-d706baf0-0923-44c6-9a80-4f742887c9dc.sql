
-- Create a junction table for user-household relationships
CREATE TABLE public.user_households (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  household_id UUID REFERENCES public.households(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, household_id)
);

-- Enable RLS
ALTER TABLE public.user_households ENABLE ROW LEVEL SECURITY;

-- Create policies for user_households
CREATE POLICY "Users can view their household memberships" 
  ON public.user_households 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their household memberships" 
  ON public.user_households 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their household memberships" 
  ON public.user_households 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Update the profiles table to remove the direct household_id reference
-- and add a current_household_id instead
ALTER TABLE public.profiles DROP COLUMN IF EXISTS household_id;
ALTER TABLE public.profiles ADD COLUMN current_household_id UUID REFERENCES public.households(id);

-- Create a function to get user households
CREATE OR REPLACE FUNCTION public.get_user_households(user_uuid UUID)
RETURNS TABLE (
  household_id UUID,
  household_name TEXT,
  role TEXT,
  joined_at TIMESTAMPTZ
)
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT 
    h.id as household_id,
    h.name as household_name,
    uh.role,
    uh.joined_at
  FROM public.user_households uh
  JOIN public.households h ON h.id = uh.household_id
  WHERE uh.user_id = user_uuid
  ORDER BY uh.joined_at DESC;
$$;

-- Update the get_user_household_id function
CREATE OR REPLACE FUNCTION public.get_user_household_id()
RETURNS UUID
LANGUAGE SQL
STABLE SECURITY DEFINER
AS $$
  SELECT current_household_id FROM public.profiles WHERE id = auth.uid();
$$;

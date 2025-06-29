
-- Create invitations table to track household invites
CREATE TABLE public.household_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  household_id UUID NOT NULL REFERENCES public.households(id) ON DELETE CASCADE,
  invited_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invited_email TEXT NOT NULL,
  invite_code TEXT NOT NULL UNIQUE DEFAULT (gen_random_uuid())::text,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '7 days'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  accepted_at TIMESTAMP WITH TIME ZONE NULL,
  accepted_by UUID NULL REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Add Row Level Security
ALTER TABLE public.household_invitations ENABLE ROW LEVEL SECURITY;

-- Policy for viewing invitations (household members can see invitations for their household)
CREATE POLICY "Household members can view invitations for their household" 
  ON public.household_invitations 
  FOR SELECT 
  USING (
    household_id IN (
      SELECT household_id FROM public.user_households WHERE user_id = auth.uid()
    )
  );

-- Policy for creating invitations (household members can create invitations)
CREATE POLICY "Household members can create invitations" 
  ON public.household_invitations 
  FOR INSERT 
  WITH CHECK (
    household_id IN (
      SELECT household_id FROM public.user_households WHERE user_id = auth.uid()
    )
    AND invited_by = auth.uid()
  );

-- Policy for updating invitations (only the invited user can accept)
CREATE POLICY "Users can accept their own invitations" 
  ON public.household_invitations 
  FOR UPDATE 
  USING (invited_email = auth.email())
  WITH CHECK (invited_email = auth.email());

-- Create function to accept invitation
CREATE OR REPLACE FUNCTION public.accept_household_invitation(invitation_code TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  invitation_record RECORD;
  result JSON;
BEGIN
  -- Get the invitation
  SELECT * INTO invitation_record 
  FROM public.household_invitations 
  WHERE invite_code = invitation_code 
    AND status = 'pending' 
    AND expires_at > now()
    AND invited_email = auth.email();
  
  IF NOT FOUND THEN
    RETURN JSON_BUILD_OBJECT('success', false, 'error', 'Invalid or expired invitation');
  END IF;
  
  -- Check if user is already in the household
  IF EXISTS (
    SELECT 1 FROM public.user_households 
    WHERE user_id = auth.uid() AND household_id = invitation_record.household_id
  ) THEN
    RETURN JSON_BUILD_OBJECT('success', false, 'error', 'You are already a member of this household');
  END IF;
  
  -- Add user to household
  INSERT INTO public.user_households (user_id, household_id, role)
  VALUES (auth.uid(), invitation_record.household_id, 'member');
  
  -- Mark invitation as accepted
  UPDATE public.household_invitations 
  SET status = 'accepted', accepted_at = now(), accepted_by = auth.uid()
  WHERE id = invitation_record.id;
  
  -- Return success with household info
  SELECT JSON_BUILD_OBJECT(
    'success', true, 
    'household_id', h.id,
    'household_name', h.name
  ) INTO result
  FROM public.households h
  WHERE h.id = invitation_record.household_id;
  
  RETURN result;
END;
$$;

-- Create function to send invitation (will be called from edge function)
CREATE OR REPLACE FUNCTION public.create_household_invitation(
  p_household_id UUID,
  p_invited_email TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  invitation_record RECORD;
  household_name TEXT;
BEGIN
  -- Check if user is a member of the household
  IF NOT EXISTS (
    SELECT 1 FROM public.user_households 
    WHERE user_id = auth.uid() AND household_id = p_household_id
  ) THEN
    RETURN JSON_BUILD_OBJECT('success', false, 'error', 'You are not a member of this household');
  END IF;
  
  -- Get household name
  SELECT name INTO household_name FROM public.households WHERE id = p_household_id;
  
  -- Check if invitation already exists and is still valid
  IF EXISTS (
    SELECT 1 FROM public.household_invitations 
    WHERE household_id = p_household_id 
      AND invited_email = p_invited_email 
      AND status = 'pending' 
      AND expires_at > now()
  ) THEN
    RETURN JSON_BUILD_OBJECT('success', false, 'error', 'An active invitation already exists for this email');
  END IF;
  
  -- Create invitation
  INSERT INTO public.household_invitations (household_id, invited_by, invited_email)
  VALUES (p_household_id, auth.uid(), p_invited_email)
  RETURNING * INTO invitation_record;
  
  RETURN JSON_BUILD_OBJECT(
    'success', true,
    'invitation_id', invitation_record.id,
    'invite_code', invitation_record.invite_code,
    'household_name', household_name,
    'expires_at', invitation_record.expires_at
  );
END;
$$;

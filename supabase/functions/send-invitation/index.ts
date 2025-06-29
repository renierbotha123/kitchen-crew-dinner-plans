
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InvitationRequest {
  email: string;
  householdId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response('Missing authorization header', { 
        status: 401, 
        headers: corsHeaders 
      });
    }

    // Set the auth token
    supabase.auth.setSession({ access_token: authHeader.replace('Bearer ', ''), refresh_token: '' } as any);

    const { email, householdId }: InvitationRequest = await req.json();

    if (!email || !householdId) {
      return new Response('Missing email or household ID', { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    // Create the invitation using the database function
    const { data: invitationData, error: invitationError } = await supabase
      .rpc('create_household_invitation', {
        p_household_id: householdId,
        p_invited_email: email
      });

    if (invitationError) {
      console.error('Error creating invitation:', invitationError);
      return new Response(JSON.stringify({ error: invitationError.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (!invitationData.success) {
      return new Response(JSON.stringify({ error: invitationData.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Create the invitation link
    const inviteLink = `${req.headers.get('origin') || 'https://preview--kitchen-crew-dinner-plans.lovable.app'}/invite/${invitationData.invite_code}`;

    console.log('Invitation created successfully:', {
      email,
      householdName: invitationData.household_name,
      inviteCode: invitationData.invite_code,
      inviteLink
    });

    // For now, just return success (email sending would be added later with Resend)
    return new Response(JSON.stringify({
      success: true,
      message: 'Invitation created successfully',
      inviteLink,
      householdName: invitationData.household_name,
      expiresAt: invitationData.expires_at
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error in send-invitation function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);

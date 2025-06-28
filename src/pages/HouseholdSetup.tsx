import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Users, QrCode } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { AuthButton } from '@/components/Auth/AuthButton';
import { TextInputField } from '@/components/Auth/TextInputField';
import { ErrorMessage } from '@/components/Auth/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function HouseholdSetup() {
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  
  const [mode, setMode] = useState<'choose' | 'create' | 'join'>('choose');
  const [householdName, setHouseholdName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateHousehold = async () => {
    if (!householdName.trim()) {
      setError('Please enter a household name');
      return;
    }

    if (!user?.id) {
      setError('You must be logged in to create a household');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Creating household with user ID:', user.id);
      
      // Create household - the RLS policy allows any authenticated user to insert
      const { data: household, error: householdError } = await supabase
        .from('households')
        .insert([{ name: householdName.trim() }])
        .select()
        .single();

      if (householdError) {
        console.error('Household creation error:', householdError);
        throw householdError;
      }

      console.log('Created household:', household);

      // Update user profile with household_id
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ household_id: household.id })
        .eq('id', user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw profileError;
      }

      console.log('Profile updated with household_id:', household.id);

      // Refresh profile and navigate to dashboard
      await refreshProfile();
      navigate('/');
    } catch (error: any) {
      console.error('Full error details:', error);
      setError(error.message || 'Failed to create household');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinHousehold = async () => {
    if (!inviteCode.trim()) {
      setError('Please enter an invite code');
      return;
    }

    if (!user?.id) {
      setError('You must be logged in to join a household');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Joining household with invite code:', inviteCode.trim());
      
      // Find household by invite code
      const { data: household, error: householdError } = await supabase
        .from('households')
        .select('id')
        .eq('invite_code', inviteCode.trim())
        .single();

      if (householdError || !household) {
        console.error('Household lookup error:', householdError);
        throw new Error('Invalid invite code');
      }

      console.log('Found household:', household);

      // Update user profile with household_id
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ household_id: household.id })
        .eq('id', user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw profileError;
      }

      console.log('Profile updated with household_id:', household.id);

      // Refresh profile and navigate to dashboard
      await refreshProfile();
      navigate('/');
    } catch (error: any) {
      console.error('Full error details:', error);
      setError(error.message || 'Failed to join household');
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'choose') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
            Join a Household
          </h1>
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="px-6 py-8 space-y-8">
          {/* Explanation */}
          <div className="text-center space-y-4">
            <div className="bg-[#019A52] p-4 rounded-3xl w-16 h-16 mx-auto flex items-center justify-center">
              <Home className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-[Jost]">
                Set Up Your Household
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-[Jost]">
                Create a new household or join an existing one to start planning meals together.
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <Card className="p-6 border-2 border-transparent hover:border-[#019A52] transition-colors cursor-pointer"
                  onClick={() => setMode('create')}>
              <div className="flex items-center space-x-4">
                <div className="bg-[#019A52] p-3 rounded-2xl">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
                    Create New Household
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-[Jost]">
                    Start fresh with your own household
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-transparent hover:border-[#019A52] transition-colors cursor-pointer"
                  onClick={() => setMode('join')}>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl">
                  <Users className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
                    Join Existing Household
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-[Jost]">
                    Enter an invite code to join
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'create') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMode('choose')}
            className="rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
            Create Household
          </h1>
          <div className="w-10" />
        </div>

        {/* Form */}
        <div className="px-6 py-6 space-y-6">
          {error && <ErrorMessage message={error} />}

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-[Jost]">
              Name Your Household
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-[Jost]">
              Choose a name that everyone in your household will recognize
            </p>
          </div>

          <TextInputField
            label="Household Name"
            value={householdName}
            onChange={setHouseholdName}
            placeholder="The Johnson Family"
            required
          />

          <AuthButton
            variant="primary"
            onClick={handleCreateHousehold}
            disabled={loading || !householdName.trim()}
          >
            {loading ? 'Creating...' : 'Create Household'}
          </AuthButton>
        </div>
      </div>
    );
  }

  if (mode === 'join') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMode('choose')}
            className="rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
            Join Household
          </h1>
          <div className="w-10" />
        </div>

        {/* Form */}
        <div className="px-6 py-6 space-y-6">
          {error && <ErrorMessage message={error} />}

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-[Jost]">
              Enter Invite Code
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-[Jost]">
              Ask a household member for the invite code
            </p>
          </div>

          <TextInputField
            label="Invite Code"
            value={inviteCode}
            onChange={setInviteCode}
            placeholder="Enter invite code"
            required
          />

          <AuthButton
            variant="primary"
            onClick={handleJoinHousehold}
            disabled={loading || !inviteCode.trim()}
          >
            {loading ? 'Joining...' : 'Join Household'}
          </AuthButton>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => console.log('Scan QR code')}
              className="text-[#019A52] font-[Jost]"
            >
              <QrCode className="w-5 h-5 mr-2" />
              Scan QR Code Instead
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

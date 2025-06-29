
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ErrorMessage } from '@/components/Auth/ErrorMessage';

export function HouseholdSetup() {
  const navigate = useNavigate();
  const { user, refreshProfile, refreshUserHouseholds } = useAuth();
  const [householdName, setHouseholdName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateHousehold = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!householdName.trim()) {
      setError('Please enter a household name');
      return;
    }

    if (!user?.id) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create household
      const { data: household, error: householdError } = await supabase
        .from('households')
        .insert({
          name: householdName.trim(),
          created_by: user.id,
        })
        .select()
        .single();

      if (householdError) {
        console.error('Error creating household:', householdError);
        setError('Failed to create household');
        return;
      }

      // Add user as owner to the household
      const { error: memberError } = await supabase
        .from('user_households')
        .insert({
          user_id: user.id,
          household_id: household.id,
          role: 'owner'
        });

      if (memberError) {
        console.error('Error adding user to household:', memberError);
        setError('Failed to join household');
        return;
      }

      // Set as current household
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ current_household_id: household.id })
        .eq('id', user.id);

      if (profileError) {
        console.error('Error updating profile:', profileError);
        setError('Failed to set current household');
        return;
      }

      // Refresh user data
      await Promise.all([refreshProfile(), refreshUserHouseholds()]);

      // Navigate to main app
      navigate('/');
    } catch (error: any) {
      console.error('Error creating household:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinExisting = () => {
    navigate('/join-household');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="text-center pt-16 pb-8">
        <div className="bg-[#019A52] p-4 rounded-3xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <Home className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-[Jost]">
          Set Up Your Household
        </h1>
        <p className="text-gray-600 dark:text-gray-400 px-6 font-[Jost]">
          Create a new household or join an existing one to start planning meals together.
        </p>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6">
        {error && <ErrorMessage message={error} />}

        {/* Create New Household */}
        <Card className="p-6">
          <form onSubmit={handleCreateHousehold} className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-2xl">
                <Home className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
                Create New Household
              </h2>
            </div>

            <div className="space-y-3">
              <Label htmlFor="householdName" className="font-[Jost]">
                Household Name
              </Label>
              <Input
                id="householdName"
                type="text"
                placeholder="e.g., The Smith Family"
                value={householdName}
                onChange={(e) => setHouseholdName(e.target.value)}
                className="rounded-2xl"
                disabled={loading}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !householdName.trim()}
              className="w-full rounded-2xl bg-[#019A52] hover:bg-[#017A42]"
            >
              {loading ? 'Creating...' : 'Create Household'}
            </Button>
          </form>
        </Card>

        {/* Join Existing Household */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-2xl">
                <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
                  Join Existing Household
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost]">
                  Use an invite code or QR code
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleJoinExisting}
              disabled={loading}
              className="rounded-full"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

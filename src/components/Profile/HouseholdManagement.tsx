
import React, { useState } from 'react';
import { Home, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { ErrorMessage } from '@/components/Auth/ErrorMessage';
import { HouseholdInviteCard } from './HouseholdInviteCard';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function HouseholdManagement() {
  const { userHouseholds, profile, leaveHousehold } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleLeaveHousehold = async (householdId: string, householdName: string) => {
    setLoading(householdId);
    setError('');

    try {
      const { error } = await leaveHousehold(householdId);
      
      if (error) {
        setError(error.message || 'Failed to leave household');
      }
    } catch (error: any) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(null);
    }
  };

  // Find current household
  const currentHousehold = userHouseholds.find(
    household => household.household_id === profile?.current_household_id
  );

  if (userHouseholds.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
          Your Households
        </h3>
        <Card className="p-6 text-center">
          <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-[Jost]">
            You're not part of any households yet.
          </p>
        </Card>
      </div>
    );
  }

  if (!currentHousehold) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
          Your Households
        </h3>
        <Card className="p-6 text-center">
          <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-[Jost]">
            Please select a household to view settings.
          </p>
        </Card>
      </div>
    );
  }

  // Get the household's invite code (using household_id as invite code for now)
  const inviteCode = currentHousehold.household_id;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
        Your Households
      </h3>
      
      {error && <ErrorMessage message={error} />}

      <HouseholdInviteCard
        household={currentHousehold}
        inviteCode={inviteCode}
        onLeaveHousehold={(householdId, householdName) => {
          // This will be handled by the AlertDialog in HouseholdInviteCard
          handleLeaveHousehold(householdId, householdName);
        }}
      />
    </div>
  );
}

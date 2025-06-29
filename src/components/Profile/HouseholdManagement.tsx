
import React, { useState } from 'react';
import { Home, Users, LogOut, AlertTriangle, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ErrorMessage } from '@/components/Auth/ErrorMessage';
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

interface HouseholdManagementProps {
  onInviteMember?: () => void;
}

export function HouseholdManagement({ onInviteMember }: HouseholdManagementProps) {
  const { userHouseholds, profile, leaveHousehold, refreshProfile, refreshUserHouseholds } = useAuth();
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
          Your Households
        </h3>
        {profile?.current_household_id && onInviteMember && (
          <Button
            variant="outline"
            size="sm"
            onClick={onInviteMember}
            className="flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite</span>
          </Button>
        )}
      </div>
      
      {error && <ErrorMessage message={error} />}

      <div className="space-y-3">
        {userHouseholds.map((household) => {
          const isCurrentHousehold = household.household_id === profile?.current_household_id;
          const isLoading = loading === household.household_id;
          
          return (
            <Card key={household.household_id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isCurrentHousehold ? 'bg-[#019A52]' : 'bg-gray-100 dark:bg-gray-800'}`}>
                    <Users className={`w-5 h-5 ${isCurrentHousehold ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 font-[Jost]">
                        {household.household_name}
                      </h4>
                      {isCurrentHousehold && (
                        <span className="text-xs bg-[#019A52] text-white px-2 py-1 rounded-full font-[Jost]">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost]">
                      Role: {household.role} • Joined {new Date(household.joined_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={isLoading}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <span>Leave Household</span>
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to leave "{household.household_name}"? 
                        This action cannot be undone and you'll need a new invite code to rejoin.
                        {isCurrentHousehold && (
                          <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-yellow-800 dark:text-yellow-200 text-sm">
                            This is your current active household. You'll be redirected to select a new one after leaving.
                          </div>
                        )}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleLeaveHousehold(household.household_id, household.household_name)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {isLoading ? 'Leaving...' : 'Leave Household'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

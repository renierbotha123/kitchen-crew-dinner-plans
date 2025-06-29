
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Users, ArrowRight, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ErrorMessage } from '@/components/Auth/ErrorMessage';

export function HouseholdSelection() {
  const navigate = useNavigate();
  const { userHouseholds, selectHousehold, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelectHousehold = async (householdId: string) => {
    setLoading(true);
    setError('');

    try {
      const { error } = await selectHousehold(householdId);
      
      if (error) {
        setError(error.message || 'Failed to select household');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewHousehold = () => {
    navigate('/household-setup');
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <div className="w-10" />
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
          Select Household
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="rounded-full"
        >
          <LogOut className="w-6 h-6" />
        </Button>
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-8">
        {error && <ErrorMessage message={error} />}

        {/* Explanation */}
        <div className="text-center space-y-4">
          <div className="bg-[#019A52] p-4 rounded-3xl w-16 h-16 mx-auto flex items-center justify-center">
            <Home className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-[Jost]">
              Welcome Back!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-[Jost]">
              You're part of {userHouseholds.length} household{userHouseholds.length !== 1 ? 's' : ''}. 
              Choose which one you'd like to work with today.
            </p>
          </div>
        </div>

        {/* Household List */}
        <div className="space-y-4">
          {userHouseholds.map((household) => (
            <Card 
              key={household.household_id}
              className="p-4 border-2 border-transparent hover:border-[#019A52] transition-colors cursor-pointer"
              onClick={() => handleSelectHousehold(household.household_id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl">
                    <Users className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
                      {household.household_name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost]">
                      Role: {household.role} • Joined {new Date(household.joined_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>

        {/* Create New Household Option */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={handleCreateNewHousehold}
            disabled={loading}
            className="w-full"
          >
            <Home className="w-5 h-5 mr-2" />
            Create New Household
          </Button>
        </div>
      </div>
    </div>
  );
}

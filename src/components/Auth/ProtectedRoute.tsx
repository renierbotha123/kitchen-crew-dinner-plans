
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireHousehold?: boolean;
}

export function ProtectedRoute({ children, requireHousehold = false }: ProtectedRouteProps) {
  const { user, profile, userHouseholds, loading } = useAuth();

  console.log('ProtectedRoute check:', { 
    loading, 
    user: user?.id, 
    profile: profile?.id, 
    currentHouseholdId: profile?.current_household_id,
    userHouseholdsCount: userHouseholds.length,
    requireHousehold 
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#019A52] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-[Jost]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No user found, redirecting to welcome');
    return <Navigate to="/welcome" replace />;
  }

  // If household is required
  if (requireHousehold) {
    // If user has no current household selected
    if (!profile?.current_household_id) {
      // If user has existing households, let them select one
      if (userHouseholds.length > 0) {
        console.log('User has households but no current selection, redirecting to household selection');
        return <Navigate to="/household-selection" replace />;
      }
      // If user has no households, send them to setup
      console.log('User has no households, redirecting to household setup');
      return <Navigate to="/household-setup" replace />;
    }
  }

  return <>{children}</>;
}

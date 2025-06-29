
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireHousehold?: boolean;
}

export function ProtectedRoute({ children, requireHousehold = false }: ProtectedRouteProps) {
  const { user, profile, userHouseholds, loading } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute check:', { 
    loading, 
    user: user?.id, 
    profile: profile?.id, 
    currentHouseholdId: profile?.current_household_id,
    userHouseholdsCount: userHouseholds.length,
    requireHousehold,
    currentPath: location.pathname
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

  // If no user, redirect to welcome
  if (!user) {
    console.log('No user found, redirecting to welcome');
    return <Navigate to="/welcome" replace />;
  }

  // Special handling for household-specific routes
  if (location.pathname === '/household-setup') {
    // Only allow if user has NO households
    if (userHouseholds.length > 0) {
      console.log('User has households, redirecting to selection');
      return <Navigate to="/household-selection" replace />;
    }
  }

  if (location.pathname === '/household-selection') {
    // Only allow if user has households but no current selection
    if (userHouseholds.length === 0) {
      console.log('User has no households, redirecting to setup');
      return <Navigate to="/household-setup" replace />;
    }
  }

  if (location.pathname === '/join-household') {
    // Allow access - this is for joining new households
  }

  // For main app routes that require household
  if (requireHousehold) {
    // If user has no households at all
    if (userHouseholds.length === 0) {
      console.log('User has no households, redirecting to household setup');
      return <Navigate to="/household-setup" replace />;
    }
    
    // If user has households but no current selection
    if (userHouseholds.length > 0 && !profile?.current_household_id) {
      console.log('User has households but no current selection, redirecting to selection');
      return <Navigate to="/household-selection" replace />;
    }
  }

  return <>{children}</>;
}

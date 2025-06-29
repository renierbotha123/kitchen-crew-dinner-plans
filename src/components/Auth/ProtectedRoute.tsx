
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireHousehold?: boolean;
}

export function ProtectedRoute({ children, requireHousehold = false }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();

  console.log('ProtectedRoute check:', { 
    loading, 
    user: user?.id, 
    profile: profile?.id, 
    householdId: profile?.household_id,
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

  // If household is required but user doesn't have one, redirect to household setup
  if (requireHousehold && !profile?.household_id) {
    console.log('Household required but not found, redirecting to household setup');
    return <Navigate to="/household-setup" replace />;
  }

  return <>{children}</>;
}


import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  current_household_id: string | null;
}

interface UserHousehold {
  household_id: string;
  household_name: string;
  role: string;
  joined_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  userHouseholds: UserHousehold[];
  loading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  refreshUserHouseholds: () => Promise<void>;
  selectHousehold: (householdId: string) => Promise<{ error: any }>;
  leaveHousehold: (householdId: string) => Promise<{ error: any }>;
  joinHouseholdByCode: (inviteCode: string) => Promise<{ error: any; data?: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Clean up auth state utility function
const cleanupAuthState = () => {
  console.log('Cleaning up auth state...');
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userHouseholds, setUserHouseholds] = useState<UserHousehold[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      console.log('Profile fetched:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchUserHouseholds = async (userId: string) => {
    try {
      console.log('Fetching user households for:', userId);
      const { data, error } = await supabase.rpc('get_user_households', {
        user_uuid: userId
      });

      if (error) {
        console.error('Error fetching user households:', error);
        return;
      }

      console.log('User households fetched:', data);
      setUserHouseholds(data || []);
    } catch (error) {
      console.error('Error fetching user households:', error);
    }
  };

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Only fetch data if this is a new session or initial load
          if (event === 'SIGNED_IN' || initialLoad) {
            // Use setTimeout to prevent potential deadlocks
            setTimeout(() => {
              fetchProfile(session.user.id);
              fetchUserHouseholds(session.user.id);
            }, 0);
          }
        } else {
          setProfile(null);
          setUserHouseholds([]);
        }
        
        if (initialLoad) {
          setInitialLoad(false);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          fetchProfile(session.user.id);
          fetchUserHouseholds(session.user.id);
        }, 0);
      }
      
      setInitialLoad(false);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    console.log('Signing up user:', email);
    
    // Clean up existing state before sign up
    cleanupAuthState();
    
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      // Continue even if this fails
    }
    
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });

    if (error) {
      console.error('Sign up error:', error);
    } else {
      console.log('Sign up successful');
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    console.log('Signing in user:', email);
    
    // Clean up existing state before sign in
    cleanupAuthState();
    
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      // Continue even if this fails
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
    } else {
      console.log('Sign in successful');
    }

    return { error };
  };

  const signOut = async () => {
    console.log('Signing out user');
    
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      // Clear local state immediately
      setProfile(null);
      setUser(null);
      setSession(null);
      setUserHouseholds([]);
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.error('Sign out error:', err);
        // Continue even if this fails
      }
      
      // Force page reload for a clean state
      window.location.href = '/welcome';
    } catch (error) {
      console.error('Unexpected sign out error:', error);
      // Force navigation even if sign out fails
      window.location.href = '/welcome';
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const refreshUserHouseholds = async () => {
    if (user) {
      await fetchUserHouseholds(user.id);
    }
  };

  const selectHousehold = async (householdId: string) => {
    if (!user?.id) {
      return { error: { message: 'User not authenticated' } };
    }

    try {
      console.log('Selecting household:', householdId);
      
      const { error } = await supabase
        .from('profiles')
        .update({ current_household_id: householdId })
        .eq('id', user.id);

      if (error) {
        console.error('Error selecting household:', error);
        return { error };
      }

      // Refresh profile to get updated household
      await refreshProfile();
      return { error: null };
    } catch (error: any) {
      console.error('Error selecting household:', error);
      return { error };
    }
  };

  const leaveHousehold = async (householdId: string) => {
    if (!user?.id) {
      return { error: { message: 'User not authenticated' } };
    }

    try {
      console.log('Leaving household:', householdId);
      
      // Remove from user_households
      const { error: deleteError } = await supabase
        .from('user_households')
        .delete()
        .eq('user_id', user.id)
        .eq('household_id', householdId);

      if (deleteError) {
        console.error('Error leaving household:', deleteError);
        return { error: deleteError };
      }

      // If this was the current household, clear it
      if (profile?.current_household_id === householdId) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ current_household_id: null })
          .eq('id', user.id);

        if (updateError) {
          console.error('Error clearing current household:', updateError);
          return { error: updateError };
        }
      }

      // Refresh both profile and households
      await Promise.all([refreshProfile(), refreshUserHouseholds()]);
      return { error: null };
    } catch (error: any) {
      console.error('Error leaving household:', error);
      return { error };
    }
  };

  const joinHouseholdByCode = async (inviteCode: string) => {
    if (!user?.id) {
      return { error: { message: 'User not authenticated' } };
    }

    try {
      console.log('Joining household by code:', inviteCode);
      
      // First, get the household by invite code
      const { data: household, error: householdError } = await supabase
        .from('households')
        .select('id, name')
        .eq('invite_code', inviteCode)
        .single();

      if (householdError || !household) {
        console.error('Error finding household:', householdError);
        return { error: { message: 'Invalid invite code' } };
      }

      // Check if user is already in the household
      const { data: existingMembership } = await supabase
        .from('user_households')
        .select('id')
        .eq('user_id', user.id)
        .eq('household_id', household.id)
        .single();

      if (existingMembership) {
        return { error: { message: 'You are already a member of this household' } };
      }

      // Add user to household
      const { error: joinError } = await supabase
        .from('user_households')
        .insert({
          user_id: user.id,
          household_id: household.id,
          role: 'member'
        });

      if (joinError) {
        console.error('Error joining household:', joinError);
        return { error: joinError };
      }

      // Set as current household
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ current_household_id: household.id })
        .eq('id', user.id);

      if (profileError) {
        console.error('Error setting current household:', profileError);
        return { error: profileError };
      }

      // Refresh user data after joining
      await Promise.all([refreshProfile(), refreshUserHouseholds()]);
      
      console.log('Successfully joined household:', household.name);
      return { 
        error: null, 
        data: { 
          household_id: household.id,
          household_name: household.name 
        } 
      };
    } catch (error: any) {
      console.error('Error joining household:', error);
      return { error };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      userHouseholds,
      loading,
      signUp,
      signIn,
      signOut,
      refreshProfile,
      refreshUserHouseholds,
      selectHousehold,
      leaveHousehold,
      joinHouseholdByCode,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

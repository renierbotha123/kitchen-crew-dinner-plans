import React, { useState, useEffect } from 'react';
import { Users, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface HouseholdMember {
  user_id: string;
  role: string;
  joined_at: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

interface HouseholdMembersListProps {
  householdId: string;
}

export function HouseholdMembersList({ householdId }: HouseholdMembersListProps) {
  const [members, setMembers] = useState<HouseholdMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMembers = async () => {
      if (!householdId) return;

      try {
        console.log('=== DEBUGGING HOUSEHOLD MEMBERS ===');
        console.log('Fetching members for household:', householdId);
        console.log('Current user ID:', user?.id);
        
        // First, let's check ALL households and their members (admin query)
        console.log('--- Checking ALL user_households entries ---');
        const { data: allHouseholds, error: allHouseholdsError } = await supabase
          .from('user_households')
          .select('user_id, household_id, role, joined_at');
        
        console.log('ALL user_households entries:', allHouseholds);
        if (allHouseholdsError) {
          console.log('Error fetching all households:', allHouseholdsError);
        }
        
        // Check specifically for this household
        console.log('--- Checking specific household members ---');
        const { data: specificHouseholdMembers, error: specificError } = await supabase
          .from('user_households')
          .select('user_id, role, joined_at')
          .eq('household_id', householdId);
        
        console.log('Members in household', householdId, ':', specificHouseholdMembers);
        if (specificError) {
          console.log('Error fetching specific household members:', specificError);
        }
        
        // Check current user's households
        console.log('--- Checking current user households ---');
        const { data: currentUserHouseholds, error: currentUserError } = await supabase
          .from('user_households')
          .select('household_id, role, joined_at')
          .eq('user_id', user?.id);
        
        console.log('Current user households:', currentUserHouseholds);
        if (currentUserError) {
          console.log('Error fetching current user households:', currentUserError);
        }
        
        // Now try to fetch household members with the original query
        console.log('--- Original query execution ---');
        const { data: householdMembersData, error: householdError } = await supabase
          .from('user_households')
          .select('user_id, role, joined_at')
          .eq('household_id', householdId);

        if (householdError) {
          console.error('Error fetching household members:', householdError);
          return;
        }

        console.log('Household members data (original query):', householdMembersData);

        if (!householdMembersData || householdMembersData.length === 0) {
          console.log('No household members found');
          setMembers([]);
          return;
        }

        // Get the user IDs
        const userIds = householdMembersData.map(member => member.user_id);
        console.log('User IDs to fetch profiles for:', userIds);

        // Check ALL profiles first
        console.log('--- Checking ALL profiles ---');
        const { data: allProfiles, error: allProfilesError } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email');
        
        console.log('ALL profiles in database:', allProfiles);
        if (allProfilesError) {
          console.log('Error fetching all profiles:', allProfilesError);
        }

        // Fetch profile data for these users
        console.log('--- Fetching specific profiles ---');
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email')
          .in('id', userIds);

        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
          return;
        }

        console.log('Profiles data for household members:', profilesData);

        // Combine the data
        const transformedMembers = householdMembersData.map(member => {
          const profile = profilesData?.find(p => p.id === member.user_id);
          return {
            user_id: member.user_id,
            role: member.role,
            joined_at: member.joined_at,
            first_name: profile?.first_name,
            last_name: profile?.last_name,
            email: profile?.email,
          };
        });

        console.log('Final transformed members data:', transformedMembers);
        console.log('=== END DEBUGGING ===');
        setMembers(transformedMembers);
      } catch (error) {
        console.error('Error fetching household members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [householdId, user?.id]);

  const getDisplayName = (member: HouseholdMember) => {
    if (member.first_name && member.last_name) {
      return `${member.first_name} ${member.last_name}`;
    }
    if (member.first_name) {
      return member.first_name;
    }
    return member.email || 'Unknown User';
  };

  const getInitials = (member: HouseholdMember) => {
    const name = getDisplayName(member);
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleBadgeVariant = (role: string) => {
    return role === 'admin' ? 'default' : 'secondary';
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 font-[Jost]">
          Household Members
        </h4>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl animate-pulse">
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24" />
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 font-[Jost]">
          Household Members
        </h4>
        <div className="text-center py-4 text-gray-500 dark:text-gray-400 font-[Jost]">
          <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No members found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 font-[Jost]">
        Household Members ({members.length})
      </h4>
      <div className="space-y-2">
        {members.map((member) => (
          <div
            key={member.user_id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl"
          >
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="" alt={getDisplayName(member)} />
                <AvatarFallback className="bg-[#019A52] text-white text-sm font-[Jost]">
                  {getInitials(member)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100 font-[Jost] text-sm">
                  {getDisplayName(member)}
                  {member.user_id === user?.id && (
                    <span className="text-gray-500 dark:text-gray-400 ml-1">(You)</span>
                  )}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-[Jost]">
                  {member.email}
                </p>
              </div>
            </div>
            <Badge 
              variant={getRoleBadgeVariant(member.role || 'member')} 
              className="text-xs font-[Jost] capitalize"
            >
              {member.role || 'member'}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

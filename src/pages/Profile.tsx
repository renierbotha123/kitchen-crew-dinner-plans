
import React, { useState } from 'react';
import { Settings, LogOut, Edit, Share, HelpCircle, ChefHat, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { UserHeader } from '@/components/Profile/UserHeader';
import { HouseholdMemberItem } from '@/components/Profile/HouseholdMemberItem';
import { StatsCard } from '@/components/Profile/StatsCard';
import { SettingsToggle } from '@/components/Profile/SettingsToggle';
import { ShareAppSection } from '@/components/Profile/ShareAppSection';
import { EditProfileModal } from '@/components/Profile/EditProfileModal';
import { InviteMemberModal } from '@/components/Profile/InviteMemberModal';
import { HouseholdManagement } from '@/components/Profile/HouseholdManagement';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function Profile() {
  const { user, profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isInviteMemberOpen, setIsInviteMemberOpen] = useState(false);

  const displayName = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}`
    : profile?.first_name || profile?.email || 'User';

  const userData = {
    name: displayName,
    email: profile?.email || user?.email || '',
  };

  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
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
      {/* User Header */}
      <UserHeader user={userData} onEditProfile={handleEditProfile} />
      
      {/* Content */}
      <div className="px-4 py-6 pb-24 space-y-6">
        
        {/* Household Management Section */}
        <HouseholdManagement onInviteMember={() => setIsInviteMemberOpen(true)} />
        
        <Separator />

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <StatsCard
              label="Recipes Saved"
              value={12}
              icon={ChefHat}
            />
            <StatsCard
              label="Meals Planned"
              value={8}
              icon={Calendar}
            />
          </div>
        </div>

        <Separator />

        {/* Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
            Settings
          </h3>
          <Card className="divide-y divide-gray-200 dark:divide-gray-700">
            <SettingsToggle
              icon={Settings}
              label="Dark Mode"
              description="Switch between light and dark themes"
              checked={theme === 'dark'}
              onToggle={toggleTheme}
            />
            <SettingsToggle
              icon={Settings}
              label="Push Notifications"
              description="Get notified about meal reminders"
              checked={true}
              onToggle={(enabled) => console.log('Notifications:', enabled)}
            />
            <SettingsToggle
              icon={Settings}
              label="Email Updates"
              description="Receive weekly meal planning tips"
              checked={false}
              onToggle={(enabled) => console.log('Email updates:', enabled)}
            />
          </Card>
        </div>

        <Separator />

        {/* Share App */}
        <ShareAppSection />

        <Separator />

        {/* Support & Logout */}
        <div className="space-y-3">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 dark:text-gray-300 font-[Jost]"
          >
            <HelpCircle className="w-5 h-5 mr-3" />
            Help & Support
          </Button>
          
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 font-[Jost]"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        user={{
          name: displayName,
          email: profile?.email || user?.email || '',
          dietaryPreferences: {
            primaryDiet: 'omnivore',
            allergies: [],
            avoidIngredients: [],
            favoriteCuisines: [],
          },
          notifications: {
            mealPlanReminders: true,
            shoppingListAlerts: true,
            aiRecipeSuggestions: false,
          },
        }}
        onSave={(updatedProfile) => {
          console.log('Profile updated:', updatedProfile);
          setIsEditProfileOpen(false);
        }}
      />

      <InviteMemberModal
        isOpen={isInviteMemberOpen}
        onClose={() => setIsInviteMemberOpen(false)}
      />
    </div>
  );
}

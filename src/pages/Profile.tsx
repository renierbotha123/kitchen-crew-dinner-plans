
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Settings, 
  Users, 
  Share2, 
  Moon, 
  Sun, 
  Bell, 
  Star, 
  ChefHat,
  Calendar,
  Lock,
  Shield,
  LogOut,
  HelpCircle,
  FileText
} from 'lucide-react';

// Import components
import { UserHeader } from '@/components/Profile/UserHeader';
import { StatsCard } from '@/components/Profile/StatsCard';
import { HouseholdMemberItem } from '@/components/Profile/HouseholdMemberItem';
import { InviteMemberModal } from '@/components/Profile/InviteMemberModal';
import { ShareAppSection } from '@/components/Profile/ShareAppSection';
import { SettingsToggle } from '@/components/Profile/SettingsToggle';
import { EditProfileModal } from '@/components/Profile/EditProfileModal';

// Mock data for household members and stats
const householdMembers = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@email.com', role: 'Admin', avatar: '' },
  { id: '2', name: 'Mike Johnson', email: 'mike@email.com', role: 'Member', avatar: '' },
  { id: '3', name: 'Emma Johnson', email: 'emma@email.com', role: 'Member', avatar: '' },
];

const stats = {
  recipesAdded: 23,
  mealsPlanned: 156,
};

export function Profile() {
  const { theme, toggleTheme } = useTheme();
  const { signOut, profile, user } = useAuth();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Use actual user data from auth context, with fallback to mock data
  const currentUser = {
    id: user?.id || '1',
    name: profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'User' : 'Sarah Johnson',
    email: profile?.email || user?.email || 'user@email.com',
    avatar: '',
    dietaryPreferences: {
      primaryDiet: 'vegetarian',
      allergies: ['Nuts', 'Dairy'],
      avoidIngredients: ['Mushrooms'],
      favoriteCuisines: ['Italian', 'Mediterranean', 'Asian'],
    },
    notifications: {
      mealPlanReminders: true,
      shoppingListAlerts: true,
      aiRecipeSuggestions: false,
    },
  };

  const handleInviteMember = (email: string) => {
    console.log('Inviting member:', email);
    // TODO: Implement actual invite logic
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    console.log('Logging out...');
    
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigation even if logout fails
      window.location.href = '/welcome';
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleSaveProfile = (updatedUser: any) => {
    console.log('Profile updated:', updatedUser);
    // TODO: Implement actual save logic (API call)
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* User Header */}
      <UserHeader user={currentUser} onEditProfile={handleEditProfile} />

      <div className="px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            icon={ChefHat}
            value={stats.recipesAdded}
            label="Recipes Added"
          />
          <StatsCard
            icon={Calendar}
            value={stats.mealsPlanned}
            label="Meals Planned"
          />
        </div>

        {/* Household Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
              Johnson Household
            </h2>
            <Button size="sm" onClick={() => setShowInviteModal(true)}>
              <Users className="w-4 h-4 mr-2" />
              Invite
            </Button>
          </div>
          
          <Card className="divide-y divide-gray-200 dark:divide-gray-700">
            {householdMembers.map((member) => (
              <HouseholdMemberItem
                key={member.id}
                member={member}
                isCurrentUser={member.id === currentUser.id}
              />
            ))}
          </Card>
        </div>

        {/* Preferences Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 font-[Jost]">
            Preferences
          </h2>
          
          <Card className="divide-y divide-gray-200 dark:divide-gray-700">
            <SettingsToggle
              icon={theme === 'light' ? Sun : Moon}
              label="Dark Mode"
              description="Switch between light and dark themes"
              checked={theme === 'dark'}
              onToggle={toggleTheme}
            />
            
            <SettingsToggle
              icon={Bell}
              label="Notifications"
              description="Receive meal planning reminders"
              checked={notifications}
              onToggle={setNotifications}
            />
          </Card>
        </div>

        {/* Share App Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 font-[Jost]">
            Share & Discover
          </h2>
          <ShareAppSection />
        </div>

        {/* Security Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 font-[Jost]">
            Security & Account
          </h2>
          
          <Card className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="p-4">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {isLoggingOut ? 'Logging Out...' : 'Log Out'}
              </Button>
            </div>
          </Card>
        </div>

        {/* App Info Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 font-[Jost]">
            Support & Info
          </h2>
          
          <Card className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-gray-100 font-[Jost]">Help & Support</span>
              </div>
              <Button size="sm" variant="outline">
                Contact
              </Button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-gray-100 font-[Jost]">Terms & Privacy</span>
              </div>
              <Button size="sm" variant="outline">
                View
              </Button>
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center font-[Jost]">
                PrepChef v1.0.0
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Invite Member Modal */}
      <InviteMemberModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInvite={handleInviteMember}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        user={currentUser}
        onSave={handleSaveProfile}
      />
    </div>
  );
}

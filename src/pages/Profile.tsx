
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { User, Settings, Users, Share2, Moon, Sun, Bell, Heart, Star } from 'lucide-react';

const householdMembers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', role: 'Admin', avatar: '/placeholder.svg' },
  { id: 2, name: 'Mike Johnson', email: 'mike@email.com', role: 'Member', avatar: '/placeholder.svg' },
  { id: 3, name: 'Emma Johnson', email: 'emma@email.com', role: 'Member', avatar: '/placeholder.svg' },
];

const stats = [
  { label: 'Recipes Added', value: 23, icon: Star },
  { label: 'Meals Planned', value: 156, icon: Heart },
  { label: 'Family Members', value: 3, icon: Users },
];

export function Profile() {
  const { theme, toggleTheme } = useTheme();
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-6 pt-12">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Sarah Johnson</h1>
            <p className="text-gray-600 dark:text-gray-400">Family Admin</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 text-center">
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Household Management */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Household</h2>
            <Button size="sm" onClick={() => setShowInviteModal(true)}>
              Invite
            </Button>
          </div>
          
          <Card className="divide-y divide-gray-200 dark:divide-gray-700">
            {householdMembers.map((member) => (
              <div key={member.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{member.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.email}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{member.role}</span>
              </div>
            ))}
          </Card>
        </div>

        {/* Settings */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Settings</h2>
          
          <Card className="divide-y divide-gray-200 dark:divide-gray-700">
            {/* Theme Toggle */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {theme === 'light' ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
                <span className="text-gray-900 dark:text-gray-100">Dark Mode</span>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Notifications */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-gray-100">Notifications</span>
              </div>
              <Button size="sm" variant="outline">
                Configure
              </Button>
            </div>

            {/* Account Settings */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-gray-100">Account Settings</span>
              </div>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </div>

            {/* Share App */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-gray-100">Share PrepChef</span>
              </div>
              <Button size="sm" variant="outline">
                Share
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Invite Family Member
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="member@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
              
              <div className="flex space-x-3">
                <Button className="flex-1">Send Invite</Button>
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => setShowInviteModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}


import React, { useState } from 'react';
import { FullScreenModal } from '@/components/UI/FullScreenModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { ProfileImageUploader } from './ProfileImageUploader';
import { MultiSelectField } from './MultiSelectField';
import { Camera, Lock } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    avatar?: string;
    dietaryPreferences: {
      primaryDiet: string;
      allergies: string[];
      avoidIngredients: string[];
      favoriteCuisines: string[];
    };
    notifications: {
      mealPlanReminders: boolean;
      shoppingListAlerts: boolean;
      aiRecipeSuggestions: boolean;
    };
  };
  onSave: (updatedUser: any) => void;
}

const dietOptions = [
  { value: 'omnivore', label: 'Omnivore' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'pescatarian', label: 'Pescatarian' },
  { value: 'other', label: 'Other' },
];

const commonAllergies = [
  'Nuts', 'Dairy', 'Eggs', 'Shellfish', 'Fish', 'Soy', 'Wheat', 'Sesame'
];

const commonCuisines = [
  'Italian', 'Mexican', 'Asian', 'Mediterranean', 'Indian', 'Thai', 'French', 'American'
];

export function EditProfileModal({ isOpen, onClose, user, onSave }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    primaryDiet: user.dietaryPreferences.primaryDiet,
    allergies: user.dietaryPreferences.allergies,
    avoidIngredients: user.dietaryPreferences.avoidIngredients,
    favoriteCuisines: user.dietaryPreferences.favoriteCuisines,
    mealPlanReminders: user.notifications.mealPlanReminders,
    shoppingListAlerts: user.notifications.shoppingListAlerts,
    aiRecipeSuggestions: user.notifications.aiRecipeSuggestions,
  });

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar,
      dietaryPreferences: {
        primaryDiet: formData.primaryDiet,
        allergies: formData.allergies,
        avoidIngredients: formData.avoidIngredients,
        favoriteCuisines: formData.favoriteCuisines,
      },
      notifications: {
        mealPlanReminders: formData.mealPlanReminders,
        shoppingListAlerts: formData.shoppingListAlerts,
        aiRecipeSuggestions: formData.aiRecipeSuggestions,
      },
    };
    onSave(updatedUser);
    onClose();
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      primaryDiet: user.dietaryPreferences.primaryDiet,
      allergies: user.dietaryPreferences.allergies,
      avoidIngredients: user.dietaryPreferences.avoidIngredients,
      favoriteCuisines: user.dietaryPreferences.favoriteCuisines,
      mealPlanReminders: user.notifications.mealPlanReminders,
      shoppingListAlerts: user.notifications.shoppingListAlerts,
      aiRecipeSuggestions: user.notifications.aiRecipeSuggestions,
    });
    onClose();
  };

  const stickyFooter = (
    <div className="flex space-x-3">
      <Button variant="outline" onClick={handleCancel} className="flex-1">
        Cancel
      </Button>
      <Button onClick={handleSave} className="flex-1">
        Save Changes
      </Button>
    </div>
  );

  return (
    <FullScreenModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
      stickyFooter={stickyFooter}
    >
      <div className="px-4 py-6 space-y-6">
        {/* Profile Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 font-[Jost]">
            Profile Information
          </h3>
          
          <Card className="p-4 space-y-4">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-3">
              <ProfileImageUploader
                currentImage={formData.avatar}
                onImageChange={(newImage) => setFormData({ ...formData, avatar: newImage })}
              />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 font-[Jost]">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="font-[Jost]"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 font-[Jost]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                readOnly
                className="bg-gray-50 dark:bg-gray-800 font-[Jost]"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 font-[Jost]">
                Contact support to change your email address
              </p>
            </div>
          </Card>
        </div>

        {/* Dietary Preferences Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 font-[Jost]">
            Dietary Preferences
          </h3>
          
          <Card className="p-4 space-y-4">
            {/* Primary Diet */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 font-[Jost]">
                Primary Diet
              </Label>
              <Select value={formData.primaryDiet} onValueChange={(value) => setFormData({ ...formData, primaryDiet: value })}>
                <SelectTrigger className="font-[Jost]">
                  <SelectValue placeholder="Select your primary diet" />
                </SelectTrigger>
                <SelectContent>
                  {dietOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="font-[Jost]">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Allergies */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 font-[Jost]">
                Allergies
              </Label>
              <MultiSelectField
                options={commonAllergies}
                selectedValues={formData.allergies}
                onChange={(values) => setFormData({ ...formData, allergies: values })}
                placeholder="Select your allergies"
              />
            </div>

            {/* Favorite Cuisines */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 font-[Jost]">
                Favorite Cuisines
              </Label>
              <MultiSelectField
                options={commonCuisines}
                selectedValues={formData.favoriteCuisines}
                onChange={(values) => setFormData({ ...formData, favoriteCuisines: values })}
                placeholder="Select your favorite cuisines"
              />
            </div>
          </Card>
        </div>

        {/* Notification Preferences Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 font-[Jost]">
            Notification Preferences
          </h3>
          
          <Card className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="p-4 flex items-center justify-between">
              <div>
                <span className="text-gray-900 dark:text-gray-100 font-[Jost]">Meal Plan Reminders</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost]">
                  Get reminded about upcoming meals
                </p>
              </div>
              <Switch
                checked={formData.mealPlanReminders}
                onCheckedChange={(checked) => setFormData({ ...formData, mealPlanReminders: checked })}
              />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <span className="text-gray-900 dark:text-gray-100 font-[Jost]">Shopping List Alerts</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost]">
                  Notifications for shopping reminders
                </p>
              </div>
              <Switch
                checked={formData.shoppingListAlerts}
                onCheckedChange={(checked) => setFormData({ ...formData, shoppingListAlerts: checked })}
              />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <span className="text-gray-900 dark:text-gray-100 font-[Jost]">AI Recipe Suggestions</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost]">
                  Personalized recipe recommendations
                </p>
              </div>
              <Switch
                checked={formData.aiRecipeSuggestions}
                onCheckedChange={(checked) => setFormData({ ...formData, aiRecipeSuggestions: checked })}
              />
            </div>
          </Card>
        </div>

        {/* Security Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 font-[Jost]">
            Security
          </h3>
          
          <Card>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-gray-100 font-[Jost]">Change Password</span>
              </div>
              <Button size="sm" variant="outline">
                Update
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </FullScreenModal>
  );
}

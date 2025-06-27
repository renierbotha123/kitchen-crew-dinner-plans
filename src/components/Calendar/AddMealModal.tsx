
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Users, ChefHat, Search, ArrowLeft } from 'lucide-react';

interface AddMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMeal: (recipeId: number, date: string, mealType: string) => void;
  selectedDate: string | null;
  availableRecipes: any[];
}

export function AddMealModal({ isOpen, onClose, onAddMeal, selectedDate, availableRecipes }: AddMealModalProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null);
  const [selectedMealType, setSelectedMealType] = useState('dinner');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddMeal = () => {
    if (selectedRecipe && selectedDate) {
      onAddMeal(selectedRecipe, selectedDate, selectedMealType);
      setSelectedRecipe(null);
      setSelectedMealType('dinner');
      setSearchTerm('');
      onClose();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('default', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const filteredRecipes = availableRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50">
      {/* Modal Content with rounded top */}
      <div className="fixed inset-x-0 top-0 bottom-0 bg-white dark:bg-gray-900 rounded-t-3xl overflow-hidden mt-8">
        {/* Drag Indicator */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Header with back button and title */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center space-x-3 mb-3">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add Meal</h1>
          </div>

          {/* Selected Date */}
          {selectedDate && (
            <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg mb-3">
              <p className="text-xs text-gray-600 dark:text-gray-400">Adding meal for</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {formatDate(selectedDate)}
              </p>
            </div>
          )}

          {/* Meal Type Selection */}
          <div className="mb-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Meal Type
            </h3>
            <div className="flex space-x-2">
              {['breakfast', 'lunch', 'dinner'].map(type => (
                <Button
                  key={type}
                  size="sm"
                  variant={selectedMealType === type ? 'default' : 'outline'}
                  onClick={() => setSelectedMealType(type)}
                  className="flex-1 capitalize text-xs"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Content - Recipe Selection */}
        <div className="flex-1 px-4 py-2 pb-24 h-full overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
            Choose Recipe ({filteredRecipes.length})
          </h3>
          
          <div className="space-y-3">
            {filteredRecipes.map(recipe => (
              <Card
                key={recipe.id}
                className={`p-4 cursor-pointer transition-all duration-200 rounded-xl ${
                  selectedRecipe === recipe.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedRecipe(recipe.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-base truncate mb-1">
                      {recipe.title}
                    </h4>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <ChefHat className="w-3.5 h-3.5" />
                        <span>{recipe.prepTime}m</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{recipe.cookTime}m</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{recipe.serves}</span>
                      </div>
                    </div>
                  </div>
                  {selectedRecipe === recipe.id && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
            {filteredRecipes.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p className="text-base">No recipes found</p>
                <p className="text-sm mt-1">Try adjusting your search</p>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Add Meal Button covering nav tray space */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 pb-6">
          <Button 
            onClick={handleAddMeal} 
            disabled={!selectedRecipe}
            className="w-full h-12"
          >
            Add Meal
          </Button>
        </div>
      </div>
    </div>
  );
}

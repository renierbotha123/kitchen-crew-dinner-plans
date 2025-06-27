
import React, { useState } from 'react';
import { SlideUpModal } from '@/components/UI/SlideUpModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Users, ChefHat, Search } from 'lucide-react';

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

  return (
    <SlideUpModal isOpen={isOpen} onClose={onClose} title="Add Meal">
      <div className="flex flex-col h-full pb-20">
        {/* Selected Date - More compact */}
        {selectedDate && (
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
            <p className="text-xs text-gray-600 dark:text-gray-400">Adding meal for</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {formatDate(selectedDate)}
            </p>
          </div>
        )}

        {/* Meal Type Selection - More compact */}
        <div className="mb-4">
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
        <div className="mb-4">
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

        {/* Recipe Selection - Flexible height */}
        <div className="flex-1 min-h-0">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Choose Recipe ({filteredRecipes.length})
          </h3>
          <div className="space-y-2 h-full overflow-y-auto pr-1">
            {filteredRecipes.map(recipe => (
              <Card
                key={recipe.id}
                className={`p-3 cursor-pointer transition-all duration-200 rounded-xl ${
                  selectedRecipe === recipe.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedRecipe(recipe.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                      {recipe.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      <div className="flex items-center space-x-1">
                        <ChefHat className="w-3 h-3" />
                        <span>{recipe.prepTime}m</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{recipe.cookTime}m</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{recipe.serves}</span>
                      </div>
                    </div>
                  </div>
                  {selectedRecipe === recipe.id && (
                    <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
            {filteredRecipes.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p className="text-sm">No recipes found</p>
                <p className="text-xs mt-1">Try adjusting your search</p>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Actions at bottom */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-3">
            <Button 
              onClick={handleAddMeal} 
              disabled={!selectedRecipe}
              className="flex-1"
            >
              Add Meal
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </SlideUpModal>
  );
}


import React, { useState } from 'react';
import { SlideUpModal } from '@/components/UI/SlideUpModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Users, ChefHat } from 'lucide-react';

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

  const handleAddMeal = () => {
    if (selectedRecipe && selectedDate) {
      onAddMeal(selectedRecipe, selectedDate, selectedMealType);
      setSelectedRecipe(null);
      setSelectedMealType('dinner');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('default', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <SlideUpModal isOpen={isOpen} onClose={onClose} title="Add Meal">
      <div className="space-y-6">
        {/* Selected Date */}
        {selectedDate && (
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Adding meal for</p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {formatDate(selectedDate)}
            </p>
          </div>
        )}

        {/* Meal Type Selection */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Meal Type
          </h3>
          <div className="flex space-x-2">
            {['breakfast', 'lunch', 'dinner'].map(type => (
              <Button
                key={type}
                size="sm"
                variant={selectedMealType === type ? 'default' : 'outline'}
                onClick={() => setSelectedMealType(type)}
                className="flex-1 capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Recipe Selection */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Choose Recipe
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {availableRecipes.map(recipe => (
              <Card
                key={recipe.id}
                className={`p-3 cursor-pointer transition-colors ${
                  selectedRecipe === recipe.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedRecipe(recipe.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {recipe.title}
                    </h4>
                    <div className="flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-400 mt-1">
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
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-4">
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
    </SlideUpModal>
  );
}

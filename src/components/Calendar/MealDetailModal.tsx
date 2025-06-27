
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SlideUpModal } from '@/components/UI/SlideUpModal';
import { Button } from '@/components/ui/button';
import { Clock, Users, ChefHat } from 'lucide-react';

interface MealDetailModalProps {
  meal: any;
  isOpen: boolean;
  onClose: () => void;
}

export function MealDetailModal({ meal, isOpen, onClose }: MealDetailModalProps) {
  const navigate = useNavigate();

  if (!meal) return null;

  const handleGoToRecipe = () => {
    onClose();
    navigate('/recipes');
  };

  return (
    <SlideUpModal isOpen={isOpen} onClose={onClose} title="Meal Details">
      <div className="space-y-6">
        {/* Recipe Image */}
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
          <img 
            src={meal.image} 
            alt={meal.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Recipe Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {meal.title}
          </h2>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <ChefHat className="w-4 h-4" />
              <span>{meal.prepTime}min prep</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{meal.cookTime}min cook</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Serves {meal.serves}</span>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Ingredients
          </h3>
          <div className="space-y-2">
            {meal.ingredients?.map((ingredient, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  meal.missingIngredients?.includes(ingredient)
                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                    : 'bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <span className="text-sm text-gray-900 dark:text-gray-100">
                  {ingredient}
                </span>
                {meal.missingIngredients?.includes(ingredient) && (
                  <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                    Missing
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Missing Ingredients Warning */}
        {meal.missingIngredients?.length > 0 && (
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <p className="text-sm text-orange-800 dark:text-orange-300">
              <strong>Shopping needed:</strong> You're missing {meal.missingIngredients.length} ingredient{meal.missingIngredients.length !== 1 ? 's' : ''} for this recipe.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3 pt-4">
          <Button onClick={handleGoToRecipe} className="flex-1">
            Go To Recipe
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
        </div>
      </div>
    </SlideUpModal>
  );
}

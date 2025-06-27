
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface MealChipProps {
  meal: any;
  onClick: (e?: React.MouseEvent) => void;
  onRemove: (e: React.MouseEvent) => void;
  compact?: boolean;
}

export function MealChip({ meal, onClick, onRemove, compact = false }: MealChipProps) {
  const getMealTypeColor = (type: string) => {
    switch (type) {
      case 'breakfast':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'lunch':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'dinner':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (compact) {
    return (
      <div 
        className={`relative p-1 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity ${getMealTypeColor(meal.type)}`}
        onClick={onClick}
      >
        <span className="truncate block pr-4">{meal.title}</span>
        <button
          onClick={onRemove}
          className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <X className="w-2 h-2" />
        </button>
      </div>
    );
  }

  return (
    <div 
      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      onClick={onClick}
    >
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
            {meal.title}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getMealTypeColor(meal.type)}`}>
            {meal.type}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-400">
          <span>🍳 {meal.prepTime}min prep</span>
          <span>⏱️ {meal.cookTime}min cook</span>
          <span>👥 Serves {meal.serves}</span>
        </div>
        {meal.missingIngredients && meal.missingIngredients.length > 0 && (
          <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
            Missing: {meal.missingIngredients.join(', ')}
          </p>
        )}
      </div>
      
      <Button
        size="sm"
        variant="ghost"
        onClick={onRemove}
        className="ml-2 h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900"
      >
        <X className="w-4 h-4 text-red-500" />
      </Button>
    </div>
  );
}

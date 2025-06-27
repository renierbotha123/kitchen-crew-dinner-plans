
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Clock, Users, ChefHat } from 'lucide-react';

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
        className={`relative p-2 rounded-lg cursor-pointer hover:opacity-80 transition-opacity ${getMealTypeColor(meal.type)}`}
        onClick={onClick}
      >
        <div className="flex items-start justify-between gap-1">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate pr-1">{meal.title}</p>
            <div className="flex items-center gap-2 text-xs opacity-75 mt-0.5">
              <span className="flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5" />
                {meal.cookTime}m
              </span>
              <span className="flex items-center gap-0.5">
                <Users className="w-2.5 h-2.5" />
                {meal.serves}
              </span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(e);
            }}
            className="flex-shrink-0 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors -mt-0.5"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative p-3 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      onClick={onClick}
    >
      {/* Remove button */}
      <Button
        size="sm"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(e);
        }}
        className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900 z-10 rounded-full"
      >
        <X className="w-3 h-3 text-red-500" />
      </Button>

      <div className="pr-8">
        {/* Title and meal type */}
        <div className="flex items-start gap-2 mb-2">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-base leading-tight flex-1 line-clamp-2">
            {meal.title}
          </h4>
        </div>
        
        {/* Meal type badge */}
        <div className="mb-2">
          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getMealTypeColor(meal.type)}`}>
            {meal.type}
          </span>
        </div>
        
        {/* Stats row */}
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <ChefHat className="w-3.5 h-3.5" />
            <span>{meal.prepTime}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{meal.cookTime}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{meal.serves}</span>
          </div>
        </div>
        
        {/* Missing ingredients */}
        {meal.missingIngredients && meal.missingIngredients.length > 0 && (
          <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="text-xs text-orange-600 dark:text-orange-400">
              Missing: {meal.missingIngredients.slice(0, 2).join(', ')}
              {meal.missingIngredients.length > 2 && ` +${meal.missingIngredients.length - 2} more`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

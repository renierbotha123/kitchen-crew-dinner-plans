
import React from 'react';

interface MealAheadItemProps {
  meal: {
    id: string;
    image: string;
    title: string;
    date: string;
    day: string;
    tags: string[];
    ingredientsCount: number;
    totalIngredients: number;
  };
}

export function MealAheadItem({ meal }: MealAheadItemProps) {
  return (
    <div className="flex gap-3 p-3 bg-white dark:bg-gray-800 rounded-2xl border">
      {/* Recipe Image Thumbnail */}
      <img 
        src={meal.image} 
        alt={meal.title}
        className="w-16 h-16 object-cover rounded-2xl bg-gray-200 dark:bg-gray-700 flex-shrink-0"
      />
      
      {/* Date */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {meal.day} • {meal.date}
        </p>

      <div className="flex-1 space-y-2">
        {/* Recipe Title */}
        <h4 className="font-medium text-gray-900 dark:text-gray-100">
          {meal.title}
        </h4>
        
        
        
        {/* Tags */}
        <div className="flex gap-1 flex-wrap">
          {meal.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-2xl">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Ingredients Count */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {meal.ingredientsCount}/{meal.totalIngredients} ingredients
        </p>
      </div>
    </div>
  );
}

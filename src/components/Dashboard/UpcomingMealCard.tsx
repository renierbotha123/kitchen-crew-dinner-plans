
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Users } from 'lucide-react';

interface UpcomingMealCardProps {
  meal: {
    id: string;
    image: string;
    title: string;
    type: string;
    tags: string[];
    prepTime: string;
    cookTime: string;
    serves: number;
  };
  onGoToRecipe: () => void;
}

export function UpcomingMealCard({ meal, onGoToRecipe }: UpcomingMealCardProps) {
  return (
    <Card className="w-full p-4">
      <div className="space-y-4">
        {/* Meal Image */}
        <img 
          src={meal.image} 
          alt={meal.title}
          className="w-full h-48 object-cover rounded-2xl bg-gray-200 dark:bg-gray-700"
        />
        
        {/* Type Tags */}
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-2xl">
            {meal.type}
          </span>
          {meal.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-2xl">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Recipe Title */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {meal.title}
        </h3>
        
        {/* Time and Serving Info */}
        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Prep: {meal.prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Cook: {meal.cookTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Serves {meal.serves}</span>
          </div>
        </div>
        
        {/* CTA Button */}
        <Button onClick={onGoToRecipe} className="w-full">
          Go To Recipe
        </Button>
      </div>
    </Card>
  );
}

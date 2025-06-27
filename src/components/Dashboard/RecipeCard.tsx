
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Star, Heart } from 'lucide-react';

interface RecipeCardProps {
  recipe: {
    id: string;
    image: string;
    title: string;
    time: string;
    difficulty: string;
    rating: number;
  };
  onView: () => void;
  onFavorite: () => void;
}

export function RecipeCard({ recipe, onView, onFavorite }: RecipeCardProps) {
  return (
    <Card className="w-64 flex-shrink-0 overflow-hidden">
      <img 
        src={recipe.image} 
        alt={recipe.title}
        className="w-full h-40 object-cover bg-gray-200 dark:bg-gray-700"
      />
      
      <div className="p-3 space-y-2">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
          {recipe.title}
        </h4>
        
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <Clock className="w-3 h-3" />
          <span>{recipe.time}</span>
          <span>•</span>
          <span>{recipe.difficulty}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600 dark:text-gray-400">{recipe.rating}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onView}
              className="text-xs bg-primary text-white px-3 py-1 rounded-2xl hover:bg-primary/90"
            >
              View
            </button>
            <Heart 
              className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer"
              onClick={onFavorite}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

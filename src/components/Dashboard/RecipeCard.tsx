
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
    chef?: string;
  };
  onView: () => void;
  onFavorite: () => void;
}

export function RecipeCard({ recipe, onView, onFavorite }: RecipeCardProps) {
  return (
    <Card className="w-64 flex-shrink-0 overflow-hidden">
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-40 object-cover bg-gray-200 dark:bg-gray-700"
        />
        
        {/* Chef badge */}
        {recipe.chef && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-2xl">
              {recipe.chef}
            </span>
          </div>
        )}
        
        {/* Rating badge */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 px-2 py-1 bg-black/70 text-white text-xs rounded-2xl">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>{recipe.rating}</span>
          </div>
        </div>
        
        {/* Favorite heart */}
        <Heart 
          className="absolute bottom-3 right-3 w-6 h-6 text-white cursor-pointer hover:text-red-500"
          onClick={onFavorite}
        />
      </div>
      
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
      </div>
    </Card>
  );
}

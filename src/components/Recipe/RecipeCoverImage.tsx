
import React from 'react';
import { Heart } from 'lucide-react';

interface RecipeCoverImageProps {
  image: string;
  title: string;
  isFromDashboard: boolean;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

export function RecipeCoverImage({ 
  image, 
  title, 
  isFromDashboard, 
  isFavorited, 
  onToggleFavorite 
}: RecipeCoverImageProps) {
  return (
    <div className="relative w-full h-64 sm:h-80 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      
      {/* Favorite Heart - only show if from dashboard */}
      {isFromDashboard && (
        <button
          onClick={onToggleFavorite}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${
              isFavorited 
                ? 'text-red-500 fill-current' 
                : 'text-white'
            }`}
          />
        </button>
      )}
    </div>
  );
}

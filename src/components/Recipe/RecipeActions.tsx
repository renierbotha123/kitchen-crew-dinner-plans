
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Calendar } from 'lucide-react';

interface RecipeActionsProps {
  isFromDashboard: boolean;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onAddToCalendar: () => void;
}

export function RecipeActions({ 
  isFromDashboard, 
  isFavorited, 
  onToggleFavorite, 
  onAddToCalendar 
}: RecipeActionsProps) {
  if (isFromDashboard) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={onToggleFavorite}
          className="flex-1"
        >
          <Heart
            className={`w-4 h-4 mr-2 ${
              isFavorited ? 'fill-current text-red-500' : ''
            }`}
          />
          {isFavorited ? 'Favorited' : 'Favorite'}
        </Button>
        <Button
          size="lg"
          onClick={onAddToCalendar}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Add to Plan
        </Button>
      </div>
    </div>
  );
}

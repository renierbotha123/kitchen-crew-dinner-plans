
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface RecipeHeaderProps {
  onBack: () => void;
}

export function RecipeHeader({ onBack }: RecipeHeaderProps) {
  return (
    <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40">
      <div className="flex items-center px-4 py-4">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="ml-2 text-lg font-semibold text-foreground truncate">
          Recipe
        </h1>
      </div>
    </div>
  );
}

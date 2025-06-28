
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface IngredientItemProps {
  ingredient: string;
  index: number;
  isChecked: boolean;
  onToggle: (index: number) => void;
}

export function IngredientItem({ ingredient, index, isChecked, onToggle }: IngredientItemProps) {
  return (
    <div className="flex items-start space-x-3 py-2">
      <Checkbox
        id={`ingredient-${index}`}
        checked={isChecked}
        onCheckedChange={() => onToggle(index)}
        className="mt-1"
      />
      <label
        htmlFor={`ingredient-${index}`}
        className={`text-sm leading-relaxed cursor-pointer ${
          isChecked ? 'line-through text-muted-foreground' : 'text-foreground'
        }`}
      >
        {ingredient}
      </label>
    </div>
  );
}

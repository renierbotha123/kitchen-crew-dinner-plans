
import React from 'react';
import { Card } from '@/components/ui/card';
import { IngredientItem } from './IngredientItem';

interface RecipeIngredientsProps {
  ingredients: string[];
  checkedIngredients: boolean[];
  onIngredientToggle: (index: number) => void;
}

export function RecipeIngredients({ 
  ingredients, 
  checkedIngredients, 
  onIngredientToggle 
}: RecipeIngredientsProps) {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Ingredients
      </h2>
      <div className="space-y-1">
        {ingredients.map((ingredient, index) => (
          <IngredientItem
            key={index}
            ingredient={ingredient}
            index={index}
            isChecked={checkedIngredients[index]}
            onToggle={onIngredientToggle}
          />
        ))}
      </div>
    </Card>
  );
}

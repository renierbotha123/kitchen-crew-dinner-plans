
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ChefHat } from 'lucide-react';

interface RecipeSummary {
  title: string;
  description: string;
  prep_time?: number;
  cook_time?: number;
  serves?: number;
  food_type?: string;
  meal_type?: string;
}

interface AIRecipeCardProps {
  recipe: RecipeSummary;
  onGetFullRecipe: () => void;
}

export function AIRecipeCard({ recipe, onGetFullRecipe }: AIRecipeCardProps) {
  return (
    <Card className="p-4 space-y-4">
      {/* Title and Description */}
      <div className="space-y-2">
        <h4 className="font-semibold text-lg text-foreground leading-tight">
          {recipe.title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {recipe.description}
        </p>
      </div>

      {/* Recipe Stats and Tags */}
      <div className="space-y-3">
        {/* Stats */}
        {(recipe.prep_time || recipe.cook_time || recipe.serves) && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {recipe.prep_time && (
              <div className="flex items-center gap-1">
                <ChefHat className="w-4 h-4" />
                <span>{recipe.prep_time}m prep</span>
              </div>
            )}
            {recipe.cook_time && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.cook_time}m cook</span>
              </div>
            )}
            {recipe.serves && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Serves {recipe.serves}</span>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {(recipe.food_type || recipe.meal_type) && (
          <div className="flex flex-wrap gap-2">
            {recipe.food_type && (
              <Badge variant="outline" className="text-xs">
                {recipe.food_type}
              </Badge>
            )}
            {recipe.meal_type && (
              <Badge variant="outline" className="text-xs">
                {recipe.meal_type}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Action Button */}
      <Button 
        onClick={onGetFullRecipe}
        className="w-full rounded-full"
      >
        Get Full Recipe
      </Button>
    </Card>
  );
}

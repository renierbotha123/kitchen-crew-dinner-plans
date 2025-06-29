
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Users, ChefHat, Loader2, ExternalLink } from 'lucide-react';

interface FullRecipe {
  title: string;
  description: string;
  cover_image_url?: string;
  prep_time?: number;
  cook_time?: number;
  serves?: number;
  food_type?: string;
  meal_type?: string;
  ingredients?: string[];
  method?: string;
  source?: string;
}

interface AIRecipePreviewProps {
  recipe: FullRecipe;
  isLoading: boolean;
  onAddToMyRecipes: () => void;
  onShowMoreOptions: () => void;
}

export function AIRecipePreview({ 
  recipe, 
  isLoading, 
  onAddToMyRecipes, 
  onShowMoreOptions 
}: AIRecipePreviewProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Getting full recipe...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onShowMoreOptions}
          className="p-2 rounded-full hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-foreground">Recipe Preview</h2>
      </div>

      {/* Cover Image */}
      {recipe.cover_image_url && (
        <div className="relative h-48 overflow-hidden rounded-3xl">
          <img 
            src={recipe.cover_image_url} 
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Recipe Info */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground leading-tight">
            {recipe.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {recipe.description}
          </p>
        </div>

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
              <Badge variant="outline">
                {recipe.food_type}
              </Badge>
            )}
            {recipe.meal_type && (
              <Badge variant="outline">
                {recipe.meal_type}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Ingredients */}
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <div className="space-y-3">
          <h3 ClassName="text-lg font-semibold text-foreground">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-foreground leading-relaxed">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Method */}
      {recipe.method && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Method</h3>
          <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {recipe.method}
          </div>
        </div>
      )}

      {/* Source */}
      {recipe.source && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Source</h4>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-foreground">{recipe.source}</span>
            {recipe.source.startsWith('http') && (
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <Button 
          onClick={onAddToMyRecipes}
          className="w-full h-12 rounded-full"
        >
          Add to My Recipes
        </Button>
        
        <Button 
          onClick={onShowMoreOptions}
          variant="outline"
          className="w-full h-12 rounded-full"
        >
          Show More Options
        </Button>
      </div>
    </div>
  );
}

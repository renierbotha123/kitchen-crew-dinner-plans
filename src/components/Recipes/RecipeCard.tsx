
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Clock, Users, ChefHat, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Recipe {
  id: number;
  title: string;
  image: string;
  cookTime: number;
  prepTime: number;
  serves: number;
  tags: string[];
  source: string;
  isFavorited: boolean;
}

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: () => void;
}

export function RecipeCard({ recipe, onToggleFavorite }: RecipeCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipes/${recipe.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <Card className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]">
      <div className="relative" onClick={handleCardClick}>
        {/* Recipe Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          
          {/* Source Badge */}
          <Badge 
            variant="secondary" 
            className="absolute top-3 left-3 text-xs bg-black/70 text-white hover:bg-black/70"
          >
            {recipe.source}
          </Badge>
          
          {/* Favorite Heart */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          >
            <Heart 
              className={`w-5 h-5 ${
                recipe.isFavorited 
                  ? 'text-red-500 fill-current' 
                  : 'text-white'
              }`}
            />
          </button>
        </div>

        {/* Recipe Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
            {recipe.title}
          </h3>

          {/* Recipe Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <ChefHat className="w-4 h-4" />
              <span>{recipe.prepTime}m prep</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.cookTime}m cook</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{recipe.serves}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {recipe.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {recipe.tags.length > 3 && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                +{recipe.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

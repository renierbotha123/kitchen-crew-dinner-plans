
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ChefHat } from 'lucide-react';

interface RecipeInfoProps {
  title: string;
  tags: string[];
  prepTime: number;
  cookTime: number;
  serves: number;
}

export function RecipeInfo({ title, tags, prepTime, cookTime, serves }: RecipeInfoProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground leading-tight">
        {title}
      </h1>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Recipe Stats */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <ChefHat className="w-4 h-4" />
          <span>{prepTime}m prep</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{cookTime}m cook</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>Serves {serves}</span>
        </div>
      </div>
    </div>
  );
}

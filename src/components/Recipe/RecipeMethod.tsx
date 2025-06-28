
import React from 'react';
import { Card } from '@/components/ui/card';

interface RecipeMethodProps {
  method: string;
}

export function RecipeMethod({ method }: RecipeMethodProps) {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Method
      </h2>
      <div className="prose prose-sm max-w-none">
        <p className="text-foreground leading-relaxed whitespace-pre-line">
          {method}
        </p>
      </div>
    </Card>
  );
}

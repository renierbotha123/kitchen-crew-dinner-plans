
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MissingIngredientsAlertProps {
  ingredients: string[];
  className?: string;
}

export function MissingIngredientsAlert({ ingredients, className }: MissingIngredientsAlertProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (ingredients.length === 0) return null;

  return (
    <Card className={`border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800 ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-orange-900 dark:text-orange-100">
                Missing Ingredients
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                {ingredients.length} items needed for planned meals
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-800">
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="border-orange-300 text-orange-800 dark:border-orange-600 dark:text-orange-200"
                >
                  {ingredient}
                </Badge>
              ))}
            </div>
            <Button 
              size="sm" 
              className="mt-3 bg-orange-600 hover:bg-orange-700 text-white"
            >
              Add to Shopping List
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

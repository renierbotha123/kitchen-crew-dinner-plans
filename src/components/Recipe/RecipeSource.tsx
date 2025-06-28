
import React from 'react';

interface RecipeSourceProps {
  source: string;
  sourceUrl?: string;
}

export function RecipeSource({ source, sourceUrl }: RecipeSourceProps) {
  const SourceLink = () => {
    if (sourceUrl) {
      return (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 underline text-sm"
        >
          {source}
        </a>
      );
    }
    
    return <span className="text-muted-foreground text-sm">{source}</span>;
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">Source:</span>
      <SourceLink />
    </div>
  );
}


import React from 'react';
import { Badge } from '@/components/ui/badge';

interface FilterTagProps {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
}

export function FilterTag({ label, isSelected, onToggle }: FilterTagProps) {
  return (
    <Badge
      variant={isSelected ? "default" : "outline"}
      className={`cursor-pointer whitespace-nowrap select-none transition-colors ${
        isSelected 
          ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
          : 'hover:bg-accent hover:text-accent-foreground'
      }`}
      onClick={onToggle}
    >
      {label}
    </Badge>
  );
}

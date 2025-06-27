
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HighlightCardProps {
  title: string;
  value: string | number;
  cta: string;
  onCtaClick: () => void;
  children?: React.ReactNode;
}

export function HighlightCard({ title, value, cta, onCtaClick, children }: HighlightCardProps) {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        
        {typeof value === 'string' || typeof value === 'number' ? (
          <p className="text-2xl font-bold text-primary">
            {value}
          </p>
        ) : null}
        
        {children}
        
        <Button variant="outline" size="sm" onClick={onCtaClick} className="w-full">
          {cta}
        </Button>
      </div>
    </Card>
  );
}


import React from 'react';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PantryItemData {
  id: number;
  name: string;
  quantity: string;
  notes: string;
}

interface PantryItemProps {
  item: PantryItemData;
  onRemove: () => void;
}

export function PantryItem({ item, onRemove }: PantryItemProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground text-base mb-1">
            {item.name}
          </h4>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {item.quantity && (
              <span className="font-medium">{item.quantity}</span>
            )}
            {item.notes && (
              <>
                {item.quantity && <span>•</span>}
                <span>{item.notes}</span>
              </>
            )}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-3 flex-shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}

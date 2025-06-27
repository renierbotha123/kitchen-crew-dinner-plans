
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface PriorityListItemProps {
  item: {
    id: string;
    type: 'ingredient' | 'note';
    text: string;
    completed: boolean;
    memberName?: string;
  };
  onToggle: (id: string) => void;
}

export function PriorityListItem({ item, onToggle }: PriorityListItemProps) {
  return (
    <div className="flex items-start gap-3 p-3">
      <Checkbox
        checked={item.completed}
        onCheckedChange={() => onToggle(item.id)}
        className="mt-1"
      />
      
      <div className="flex-1">
        <p className={`text-sm ${item.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
          {item.text}
        </p>
        {item.type === 'note' && item.memberName && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Note from {item.memberName}
          </p>
        )}
      </div>
    </div>
  );
}

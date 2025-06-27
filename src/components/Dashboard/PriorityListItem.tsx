
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
  const getItemIcon = () => {
    if (item.type === 'ingredient') {
      return (
        <div className="w-8 h-8 rounded-2xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <span className="text-blue-600 dark:text-blue-300 text-xs font-medium">B</span>
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 rounded-2xl bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
          <span className="text-yellow-600 dark:text-yellow-300 text-xs font-medium">📝</span>
        </div>
      );
    }
  };

  return (
    <div className="flex items-center gap-3 p-3">
      {getItemIcon()}
      
      <div className="flex-1">
        <p className={`text-sm ${item.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
          {item.text}
        </p>
        {item.type === 'note' && item.memberName && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {item.memberName}
          </p>
        )}
      </div>
      
      <Checkbox
        checked={item.completed}
        onCheckedChange={() => onToggle(item.id)}
        className="ml-2"
      />
    </div>
  );
}

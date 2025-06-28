
import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Note } from '@/pages/Notes';

interface NoteItemProps {
  note: Note;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export function NoteItem({ note, onToggleComplete, onDelete, onEdit }: NoteItemProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 transition-all duration-200">
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-1">
          <Checkbox
            checked={note.completed}
            onCheckedChange={() => onToggleComplete(note.id)}
            className="w-5 h-5"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Note Text */}
              <p className={`text-gray-900 dark:text-gray-100 font-[Jost] leading-relaxed ${
                note.completed 
                  ? 'line-through opacity-60' 
                  : ''
              }`}>
                {note.text}
              </p>

              {/* Type Badge and Date */}
              <div className="flex items-center space-x-2 mt-2">
                <Badge
                  variant={note.type === 'ingredient' ? 'default' : 'secondary'}
                  className="text-xs font-[Jost]"
                >
                  {note.type === 'ingredient' ? 'Ingredient' : 'Note'}
                </Badge>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-[Jost]">
                  {note.createdAt.toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-1 ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(note)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Edit2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(note.id)}
                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              >
                <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

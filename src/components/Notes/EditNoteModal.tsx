
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SlideUpModal } from '@/components/UI/SlideUpModal';
import { Note } from '@/pages/Notes';

interface EditNoteModalProps {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Note) => void;
}

export function EditNoteModal({ note, isOpen, onClose, onSave }: EditNoteModalProps) {
  const [editText, setEditText] = useState('');
  const [editType, setEditType] = useState<'note' | 'ingredient'>('note');

  // Update local state when note changes
  useEffect(() => {
    if (note) {
      setEditText(note.text);
      setEditType(note.type);
    }
  }, [note]);

  // Handle save
  const handleSave = () => {
    if (!note || !editText.trim()) return;

    const updatedNote: Note = {
      ...note,
      text: editText.trim(),
      type: editType,
    };

    onSave(updatedNote);
  };

  // Handle cancel
  const handleCancel = () => {
    if (note) {
      setEditText(note.text);
      setEditType(note.type);
    }
    onClose();
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  if (!note) return null;

  return (
    <SlideUpModal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Edit Item"
    >
      <div className="space-y-4">
        {/* Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-[Jost]">
            Type
          </label>
          <Select value={editType} onValueChange={(value: 'note' | 'ingredient') => setEditType(value)}>
            <SelectTrigger className="w-full font-[Jost]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="note">Note</SelectItem>
              <SelectItem value="ingredient">Ingredient</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-[Jost]">
            Text
          </label>
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Enter ${editType} text...`}
            className="font-[Jost]"
            autoFocus
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 font-[Jost]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!editText.trim()}
            className="flex-1 font-[Jost]"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </SlideUpModal>
  );
}

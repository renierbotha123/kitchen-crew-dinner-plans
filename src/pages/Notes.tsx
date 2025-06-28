
import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NoteItem } from '@/components/Notes/NoteItem';
import { EditNoteModal } from '@/components/Notes/EditNoteModal';

export interface Note {
  id: string;
  text: string;
  type: 'note' | 'ingredient';
  completed: boolean;
  createdAt: Date;
}

// Mock data for demonstration
const initialNotes: Note[] = [
  {
    id: '1',
    text: 'Buy organic chicken breast',
    type: 'ingredient',
    completed: false,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    text: 'Remember to marinate the fish overnight',
    type: 'note',
    completed: false,
    createdAt: new Date('2024-01-14'),
  },
  {
    id: '3',
    text: 'Fresh basil leaves',
    type: 'ingredient',
    completed: true,
    createdAt: new Date('2024-01-13'),
  },
  {
    id: '4',
    text: 'Try the new Italian restaurant recipe',
    type: 'note',
    completed: false,
    createdAt: new Date('2024-01-12'),
  },
];

export function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteType, setNewNoteType] = useState<'note' | 'ingredient'>('note');
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // Handle going back to previous screen
  const handleBack = () => {
    navigate(-1);
  };

  // Add new note or ingredient
  const handleAddNote = () => {
    if (!newNoteText.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      text: newNoteText.trim(),
      type: newNoteType,
      completed: false,
      createdAt: new Date(),
    };

    setNotes(prev => [newNote, ...prev]);
    setNewNoteText('');
  };

  // Toggle note completion status
  const handleToggleComplete = (id: string) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  // Delete note
  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  // Edit note
  const handleEditNote = (note: Note) => {
    setEditingNote(note);
  };

  // Save edited note
  const handleSaveEdit = (updatedNote: Note) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );
    setEditingNote(null);
  };

  // Handle Enter key in input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddNote();
    }
  };

  // Filter notes by completion status
  const activeNotes = notes.filter(note => !note.completed);
  const completedNotes = notes.filter(note => note.completed);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
            Notes
          </h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Add New Note Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="space-y-3">
            {/* Type Selection */}
            <Select value={newNoteType} onValueChange={(value: 'note' | 'ingredient') => setNewNoteType(value)}>
              <SelectTrigger className="w-full font-[Jost]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="note">Note</SelectItem>
                <SelectItem value="ingredient">Ingredient</SelectItem>
              </SelectContent>
            </Select>

            {/* Text Input */}
            <div className="flex space-x-2">
              <Input
                placeholder={`Add a new ${newNoteType}...`}
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 font-[Jost]"
              />
              <Button
                onClick={handleAddNote}
                disabled={!newNoteText.trim()}
                className="px-4 py-2 h-10 rounded-lg"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Notes Section */}
        {activeNotes.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 font-[Jost]">
              Active Items
            </h2>
            <div className="space-y-2">
              {activeNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteNote}
                  onEdit={handleEditNote}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Notes Section */}
        {completedNotes.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 font-[Jost]">
              Completed Items
            </h2>
            <div className="space-y-2">
              {completedNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteNote}
                  onEdit={handleEditNote}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {notes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 font-[Jost]">
              <p className="text-lg mb-2">No notes yet</p>
              <p className="text-sm">Add your first note or ingredient above</p>
            </div>
          </div>
        )}
      </div>

      {/* Edit Note Modal */}
      <EditNoteModal
        note={editingNote}
        isOpen={!!editingNote}
        onClose={() => setEditingNote(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

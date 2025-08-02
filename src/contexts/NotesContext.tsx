import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Note {
  id: string;
  text: string;
  type: 'note' | 'ingredient';
  completed: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
  household_id: string;
  creator_profile?: {
    first_name: string | null;
    last_name: string | null;
  };
}

interface NotesContextType {
  notes: Note[];
  loading: boolean;
  addNote: (text: string, type: 'note' | 'ingredient') => Promise<void>;
  updateNote: (note: Note) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  refetchNotes: () => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  const addNote = async (text: string, type: 'note' | 'ingredient') => {
    // TODO: Implement with Supabase after migration
    console.log('Add note:', { text, type });
  };

  const updateNote = async (note: Note) => {
    // TODO: Implement with Supabase after migration
    console.log('Update note:', note);
  };

  const toggleComplete = async (id: string) => {
    // TODO: Implement with Supabase after migration
    console.log('Toggle complete:', id);
  };

  const deleteNote = async (id: string) => {
    // TODO: Implement with Supabase after migration
    console.log('Delete note:', id);
  };

  const refetchNotes = async () => {
    // TODO: Implement with Supabase after migration
    console.log('Refetch notes');
  };

  return (
    <NotesContext.Provider value={{ 
      notes, 
      loading, 
      addNote, 
      updateNote, 
      toggleComplete, 
      deleteNote, 
      refetchNotes 
    }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}
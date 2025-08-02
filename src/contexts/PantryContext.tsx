import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string | null;
  expiry_date: string | null;
  created_at: string;
  updated_at: string;
  household_id: string;
}

interface PantryContextType {
  items: PantryItem[];
  loading: boolean;
  addItem: (name: string, quantity: number, unit: string, category?: string, expiryDate?: string) => Promise<void>;
  updateItem: (item: PantryItem) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  refetchItems: () => Promise<void>;
}

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export function PantryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const addItem = async (
    name: string, 
    quantity: number, 
    unit: string, 
    category?: string, 
    expiryDate?: string
  ) => {
    // TODO: Implement with Supabase after migration
    console.log('Add item:', { name, quantity, unit, category, expiryDate });
  };

  const updateItem = async (item: PantryItem) => {
    // TODO: Implement with Supabase after migration
    console.log('Update item:', item);
  };

  const deleteItem = async (id: string) => {
    // TODO: Implement with Supabase after migration
    console.log('Delete item:', id);
  };

  const refetchItems = async () => {
    // TODO: Implement with Supabase after migration
    console.log('Refetch items');
  };

  return (
    <PantryContext.Provider value={{ 
      items, 
      loading, 
      addItem, 
      updateItem, 
      deleteItem, 
      refetchItems 
    }}>
      {children}
    </PantryContext.Provider>
  );
}

export function usePantry() {
  const context = useContext(PantryContext);
  if (context === undefined) {
    throw new Error('usePantry must be used within a PantryProvider');
  }
  return context;
}
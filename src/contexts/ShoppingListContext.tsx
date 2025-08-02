import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
  household_id: string;
}

interface ShoppingListContextType {
  items: ShoppingListItem[];
  loading: boolean;
  addItem: (name: string, quantity: number, unit: string, category?: string) => Promise<void>;
  updateItem: (item: ShoppingListItem) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  refetchItems: () => Promise<void>;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export function ShoppingListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [loading, setLoading] = useState(false);

  const addItem = async (
    name: string, 
    quantity: number, 
    unit: string, 
    category?: string
  ) => {
    // TODO: Implement with Supabase after migration
    console.log('Add item:', { name, quantity, unit, category });
  };

  const updateItem = async (item: ShoppingListItem) => {
    // TODO: Implement with Supabase after migration
    console.log('Update item:', item);
  };

  const toggleComplete = async (id: string) => {
    // TODO: Implement with Supabase after migration
    console.log('Toggle complete:', id);
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
    <ShoppingListContext.Provider value={{ 
      items, 
      loading, 
      addItem, 
      updateItem, 
      toggleComplete, 
      deleteItem, 
      refetchItems 
    }}>
      {children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (context === undefined) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
}
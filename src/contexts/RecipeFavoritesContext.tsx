import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface RecipeFavorite {
  id: string;
  recipe_id: string;
  user_id: string;
  created_at: string;
}

interface RecipeFavoritesContextType {
  favorites: RecipeFavorite[];
  loading: boolean;
  addFavorite: (recipeId: string) => Promise<void>;
  removeFavorite: (recipeId: string) => Promise<void>;
  isFavorite: (recipeId: string) => boolean;
  refetchFavorites: () => Promise<void>;
}

const RecipeFavoritesContext = createContext<RecipeFavoritesContextType | undefined>(undefined);

export function RecipeFavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<RecipeFavorite[]>([]);
  const [loading, setLoading] = useState(false);

  const addFavorite = async (recipeId: string) => {
    // TODO: Implement with Supabase after migration
    console.log('Add favorite:', recipeId);
  };

  const removeFavorite = async (recipeId: string) => {
    // TODO: Implement with Supabase after migration
    console.log('Remove favorite:', recipeId);
  };

  const isFavorite = (recipeId: string) => {
    return favorites.some(fav => fav.recipe_id === recipeId);
  };

  const refetchFavorites = async () => {
    // TODO: Implement with Supabase after migration
    console.log('Refetch favorites');
  };

  return (
    <RecipeFavoritesContext.Provider value={{ 
      favorites, 
      loading, 
      addFavorite, 
      removeFavorite, 
      isFavorite, 
      refetchFavorites 
    }}>
      {children}
    </RecipeFavoritesContext.Provider>
  );
}

export function useRecipeFavorites() {
  const context = useContext(RecipeFavoritesContext);
  if (context === undefined) {
    throw new Error('useRecipeFavorites must be used within a RecipeFavoritesProvider');
  }
  return context;
}
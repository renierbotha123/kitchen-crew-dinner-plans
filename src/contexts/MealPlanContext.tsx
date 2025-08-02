import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MealPlan {
  id: string;
  recipe_id: string;
  planned_date: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner';
  serves: number;
  created_at: string;
  recipe: {
    id: string;
    title: string;
    prep_time_minutes: number | null;
    cook_time_minutes: number | null;
    serves: number | null;
    cover_image_url: string | null;
    ingredients: any;
  };
}

interface MealPlanContextType {
  meals: Record<string, MealPlan[]>;
  loading: boolean;
  addMeal: (recipeId: string, date: string, mealType: 'breakfast' | 'lunch' | 'dinner', serves?: number) => Promise<void>;
  removeMeal: (mealPlanId: string) => Promise<void>;
  refetchMeals: () => Promise<void>;
}

const MealPlanContext = createContext<MealPlanContextType | undefined>(undefined);

export function MealPlanProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<Record<string, MealPlan[]>>({});
  const [loading, setLoading] = useState(false);

  const addMeal = async (recipeId: string, date: string, mealType: 'breakfast' | 'lunch' | 'dinner', serves = 4) => {
    // TODO: Implement with Supabase after migration
    console.log('Add meal:', { recipeId, date, mealType, serves });
  };

  const removeMeal = async (mealPlanId: string) => {
    // TODO: Implement with Supabase after migration
    console.log('Remove meal:', mealPlanId);
  };

  const refetchMeals = async () => {
    // TODO: Implement with Supabase after migration
    console.log('Refetch meals');
  };

  return (
    <MealPlanContext.Provider value={{ meals, loading, addMeal, removeMeal, refetchMeals }}>
      {children}
    </MealPlanContext.Provider>
  );
}

export function useMealPlan() {
  const context = useContext(MealPlanContext);
  if (context === undefined) {
    throw new Error('useMealPlan must be used within a MealPlanProvider');
  }
  return context;
}
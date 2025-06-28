
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Meal {
  id: number;
  title: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  cookTime: number;
  prepTime: number;
  serves: number;
  image: string;
  ingredients: string[];
  missingIngredients: string[];
}

interface MealPlanContextType {
  meals: Record<string, Meal[]>;
  addMeal: (date: string, meal: Meal) => void;
  removeMeal: (mealId: number, date: string) => void;
  getNextMealId: () => number;
}

const MealPlanContext = createContext<MealPlanContextType | undefined>(undefined);

// Mock data for planned meals - properly typed
const initialMeals: Record<string, Meal[]> = {
  '2024-01-15': [
    { id: 1, title: 'Spaghetti Carbonara', type: 'dinner' as const, cookTime: 25, prepTime: 15, serves: 4, 
      image: '/placeholder.svg', ingredients: ['Pasta', 'Eggs', 'Bacon', 'Parmesan'], missingIngredients: [] },
  ],
  '2024-01-16': [
    { id: 2, title: 'Greek Salad', type: 'lunch' as const, cookTime: 0, prepTime: 10, serves: 2,
      image: '/placeholder.svg', ingredients: ['Tomatoes', 'Cucumber', 'Feta', 'Olives'], missingIngredients: ['Feta'] },
    { id: 3, title: 'Beef Tacos', type: 'dinner' as const, cookTime: 20, prepTime: 10, serves: 4,
      image: '/placeholder.svg', ingredients: ['Ground Beef', 'Tortillas', 'Lettuce', 'Cheese'], missingIngredients: [] }
  ],
  '2024-01-17': [
    { id: 4, title: 'Chicken Curry', type: 'dinner' as const, cookTime: 35, prepTime: 15, serves: 6,
      image: '/placeholder.svg', ingredients: ['Chicken', 'Curry Powder', 'Coconut Milk', 'Rice'], missingIngredients: ['Curry Powder'] }
  ],
};

export function MealPlanProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<Record<string, Meal[]>>(initialMeals);
  const [nextMealId, setNextMealId] = useState(21); // Start from 21 to avoid conflicts

  const addMeal = (date: string, meal: Meal) => {
    const newMeal = { ...meal, id: nextMealId };
    setMeals(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), newMeal]
    }));
    setNextMealId(prev => prev + 1);
  };

  const removeMeal = (mealId: number, date: string) => {
    setMeals(prev => ({
      ...prev,
      [date]: prev[date]?.filter(meal => meal.id !== mealId) || []
    }));
  };

  const getNextMealId = () => nextMealId;

  return (
    <MealPlanContext.Provider value={{ meals, addMeal, removeMeal, getNextMealId }}>
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

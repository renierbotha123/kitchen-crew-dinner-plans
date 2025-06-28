import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMealPlan } from '@/contexts/MealPlanContext';
import { CalendarGrid } from '@/components/Calendar/CalendarGrid';
import { WeekView } from '@/components/Calendar/WeekView';
import { MealDetailModal } from '@/components/Calendar/MealDetailModal';
import { AddMealModal } from '@/components/Calendar/AddMealModal';
import { FloatingActionButton } from '@/components/UI/FloatingActionButton';

// Mock recipes for adding meals - expanded list
const availableRecipes = [
  { id: 5, title: 'Pancakes', cookTime: 15, prepTime: 10, serves: 3, image: '/placeholder.svg' },
  { id: 6, title: 'Caesar Salad', cookTime: 0, prepTime: 15, serves: 2, image: '/placeholder.svg' },
  { id: 7, title: 'Grilled Salmon', cookTime: 20, prepTime: 5, serves: 4, image: '/placeholder.svg' },
  { id: 8, title: 'Vegetable Stir Fry', cookTime: 15, prepTime: 10, serves: 3, image: '/placeholder.svg' },
  { id: 9, title: 'Chicken Parmesan', cookTime: 30, prepTime: 20, serves: 4, image: '/placeholder.svg' },
  { id: 10, title: 'Thai Green Curry', cookTime: 25, prepTime: 15, serves: 6, image: '/placeholder.svg' },
  { id: 11, title: 'Fish and Chips', cookTime: 25, prepTime: 10, serves: 4, image: '/placeholder.svg' },
  { id: 12, title: 'Mushroom Risotto', cookTime: 35, prepTime: 10, serves: 4, image: '/placeholder.svg' },
  { id: 13, title: 'BBQ Pulled Pork Sandwich', cookTime: 180, prepTime: 15, serves: 8, image: '/placeholder.svg' },
  { id: 14, title: 'Mediterranean Quinoa Bowl', cookTime: 0, prepTime: 20, serves: 2, image: '/placeholder.svg' },
  { id: 15, title: 'Beef Wellington', cookTime: 45, prepTime: 60, serves: 6, image: '/placeholder.svg' },
  { id: 16, title: 'Homemade Pizza Margherita', cookTime: 12, prepTime: 120, serves: 4, image: '/placeholder.svg' },
  { id: 17, title: 'Chocolate Lava Cake', cookTime: 12, prepTime: 15, serves: 2, image: '/placeholder.svg' },
  { id: 18, title: 'Korean Fried Chicken', cookTime: 25, prepTime: 30, serves: 4, image: '/placeholder.svg' },
  { id: 19, title: 'Lamb Tagine with Apricots', cookTime: 120, prepTime: 20, serves: 6, image: '/placeholder.svg' },
  { id: 20, title: 'Vietnamese Pho', cookTime: 180, prepTime: 30, serves: 4, image: '/placeholder.svg' },
];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const { meals, addMeal, removeMeal } = useMealPlan();
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showMealDetail, setShowMealDetail] = useState(false);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setCurrentDate(newDate);
  };

  const handleMealClick = (meal: any) => {
    setSelectedMeal(meal);
    setShowMealDetail(true);
  };

  const handleAddMealClick = (date?: string) => {
    setSelectedDate(date || new Date().toISOString().split('T')[0]);
    setShowAddMeal(true);
  };

  const handleAddMeal = (recipeId: number, date: string, mealType: string) => {
    const recipe = availableRecipes.find(r => r.id === recipeId);
    if (recipe) {
      // Properly type the meal type
      const typedMealType = mealType as 'breakfast' | 'lunch' | 'dinner';
      
      const newMeal = {
        ...recipe,
        id: 0, // Will be assigned by context
        type: typedMealType,
        ingredients: ['Sample ingredients'],
        missingIngredients: []
      };
      
      addMeal(date, newMeal);
      console.log('Meal added:', newMeal, 'to date:', date);
    }
  };

  const handleRemoveMeal = (mealId: number, date: string) => {
    removeMeal(mealId, date);
    console.log('Meal removed:', mealId, 'from date:', date);
  };

  const formatDateHeader = () => {
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 font-jost">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-6 pt-12 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Meal Planner</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">The Johnson Household</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
          <Button
            size="sm"
            variant={viewMode === 'week' ? 'default' : 'ghost'}
            onClick={() => setViewMode('week')}
            className="flex-1 rounded-lg"
          >
            Week
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'month' ? 'default' : 'ghost'}
            onClick={() => setViewMode('month')}
            className="flex-1 rounded-lg"
          >
            Month
          </Button>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {formatDateHeader()}
          </h2>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Calendar Views */}
        {viewMode === 'month' ? (
          <CalendarGrid 
            currentDate={currentDate}
            meals={meals}
            onMealClick={handleMealClick}
            onAddMeal={handleAddMealClick}
            onRemoveMeal={handleRemoveMeal}
          />
        ) : (
          <WeekView 
            currentDate={currentDate}
            meals={meals}
            onMealClick={handleMealClick}
            onAddMeal={handleAddMealClick}
            onRemoveMeal={handleRemoveMeal}
          />
        )}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton 
        onClick={() => handleAddMealClick()}
      />

      {/* Modals */}
      <MealDetailModal
        meal={selectedMeal}
        isOpen={showMealDetail}
        onClose={() => setShowMealDetail(false)}
      />

      <AddMealModal
        isOpen={showAddMeal}
        onClose={() => setShowAddMeal(false)}
        onAddMeal={handleAddMeal}
        selectedDate={selectedDate}
        availableRecipes={availableRecipes}
      />
    </div>
  );
}

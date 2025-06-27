
import React from 'react';
import { Card } from '@/components/ui/card';
import { MealChip } from './MealChip';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface WeekViewProps {
  currentDate: Date;
  meals: any;
  onMealClick: (meal: any) => void;
  onAddMeal: (date: string) => void;
  onRemoveMeal: (mealId: number, date: string) => void;
}

export function WeekView({ currentDate, meals, onMealClick, onAddMeal, onRemoveMeal }: WeekViewProps) {
  // Calculate week start (Sunday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getMealsForDate = (date: Date) => {
    return meals[formatDate(date)] || [];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  return (
    <div className="space-y-4">
      {weekDates.map((date, index) => {
        const dayMeals = getMealsForDate(date);
        const isTodayDate = isToday(date);
        
        return (
          <Card 
            key={index} 
            className={`p-4 ${isTodayDate ? 'ring-2 ring-primary' : ''}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isTodayDate ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <span className="font-semibold text-sm">{date.getDate()}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {weekDays[date.getDay()]}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {date.toLocaleDateString('default', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => onAddMeal(formatDate(date))}
                className="px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Add Meal
              </button>
            </div>

            {/* Planned Meals */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {dayMeals.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center py-4">
                  No meals planned
                </p>
              ) : (
                dayMeals.map((meal) => (
                  <MealChip
                    key={meal.id}
                    meal={meal}
                    onClick={() => onMealClick(meal)}
                    onRemove={() => onRemoveMeal(meal.id, formatDate(date))}
                  />
                ))
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

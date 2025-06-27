
import React from 'react';
import { Card } from '@/components/ui/card';
import { MealChip } from './MealChip';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarGridProps {
  currentDate: Date;
  meals: any;
  onMealClick: (meal: any) => void;
  onAddMeal: (date: string) => void;
  onRemoveMeal: (mealId: number, date: string) => void;
}

export function CalendarGrid({ currentDate, meals, onMealClick, onAddMeal, onRemoveMeal }: CalendarGridProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  // Generate calendar days
  const calendarDays = [];
  const currentDateForLoop = new Date(startDate);
  
  for (let i = 0; i < 42; i++) { // 6 weeks max
    calendarDays.push(new Date(currentDateForLoop));
    currentDateForLoop.setDate(currentDateForLoop.getDate() + 1);
  }

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

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month;
  };

  return (
    <div className="space-y-4">
      {/* Week Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center py-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.slice(0, 35).map((date, index) => {
          const dayMeals = getMealsForDate(date);
          const isCurrentMonthDay = isCurrentMonth(date);
          const isTodayDate = isToday(date);
          
          return (
            <Card 
              key={index}
              className={`p-2 min-h-[100px] cursor-pointer transition-colors ${
                !isCurrentMonthDay ? 'opacity-50' : ''
              } ${isTodayDate ? 'ring-2 ring-primary' : ''}`}
              onClick={() => onAddMeal(formatDate(date))}
            >
              <div className="flex flex-col h-full">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 text-xs font-semibold ${
                  isTodayDate 
                    ? 'bg-primary text-white' 
                    : 'text-gray-900 dark:text-gray-100'
                }`}>
                  {date.getDate()}
                </div>
                
                <div className="flex-1 space-y-1 overflow-y-auto">
                  {dayMeals.slice(0, 3).map((meal) => (
                    <MealChip
                      key={meal.id}
                      meal={meal}
                      onClick={(e) => {
                        e.stopPropagation();
                        onMealClick(meal);
                      }}
                      onRemove={(e) => {
                        e.stopPropagation();
                        onRemoveMeal(meal.id, formatDate(date));
                      }}
                      compact
                    />
                  ))}
                  {dayMeals.length > 3 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      +{dayMeals.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

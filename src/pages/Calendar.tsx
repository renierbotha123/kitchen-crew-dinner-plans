
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const plannedMeals = {
  '2024-01-15': [{ id: 1, title: 'Spaghetti Carbonara', type: 'dinner' }],
  '2024-01-16': [
    { id: 2, title: 'Greek Salad', type: 'lunch' },
    { id: 3, title: 'Beef Tacos', type: 'dinner' }
  ],
  '2024-01-17': [{ id: 4, title: 'Chicken Curry', type: 'dinner' }],
};

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getMealsForDate = (date: Date) => {
    return plannedMeals[formatDate(date)] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-6 pt-12">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Meal Calendar</h1>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={viewMode === 'week' ? 'default' : 'secondary'}
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'month' ? 'default' : 'secondary'}
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <button
            onClick={() => navigateWeek('next')}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Week View */}
        <div className="space-y-4">
          {weekDates.map((date, index) => {
            const meals = getMealsForDate(date);
            const isToday = formatDate(date) === formatDate(new Date());
            
            return (
              <Card key={index} className={`p-4 ${isToday ? 'ring-2 ring-primary' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isToday ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <span className="font-semibold text-sm">{date.getDate()}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {weekDays[date.getDay()]}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {months[date.getMonth()]} {date.getDate()}
                      </p>
                    </div>
                  </div>
                  
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Planned Meals */}
                <div className="space-y-2">
                  {meals.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">No meals planned</p>
                  ) : (
                    meals.map((meal) => (
                      <div
                        key={meal.id}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            {meal.title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                            {meal.type}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

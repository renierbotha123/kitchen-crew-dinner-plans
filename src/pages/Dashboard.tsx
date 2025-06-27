
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FloatingActionButton } from '../components/UI/FloatingActionButton';
import { SlideUpModal } from '../components/UI/SlideUpModal';
import { Calendar, Clock, Users, DollarSign, ChefHat, Heart } from 'lucide-react';

const upcomingMeals = [
  { id: 1, title: 'Spaghetti Carbonara', time: 'Today 6:30 PM', image: '/placeholder.svg' },
  { id: 2, title: 'Greek Salad', time: 'Tomorrow 12:00 PM', image: '/placeholder.svg' },
  { id: 3, title: 'Beef Tacos', time: 'Wed 7:00 PM', image: '/placeholder.svg' },
];

const suggestedRecipes = [
  { id: 1, title: 'Chicken Curry', time: '45 min', difficulty: 'Easy', image: '/placeholder.svg' },
  { id: 2, title: 'Caesar Salad', time: '15 min', difficulty: 'Easy', image: '/placeholder.svg' },
  { id: 3, title: 'Beef Stir Fry', time: '30 min', difficulty: 'Medium', image: '/placeholder.svg' },
];

const filterTags = ['All', 'Quick', 'Healthy', 'Vegetarian', 'Low Carb', 'Family'];

export function Dashboard() {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-6 pt-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Good evening, Sarah!</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">What's cooking today?</p>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">12</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Meals Planned</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">$84</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Week's Budget</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </Card>
        </div>

        {/* Upcoming Meals Carousel */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Upcoming Meals</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {upcomingMeals.map((meal) => (
              <Card key={meal.id} className="min-w-[280px] snap-center overflow-hidden">
                <img 
                  src={meal.image} 
                  alt={meal.title}
                  className="w-full h-32 object-cover bg-gray-200 dark:bg-gray-700"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{meal.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {meal.time}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Filter Tags */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Suggested Recipes</h2>
          <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === tag
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Suggested Recipes */}
        <div className="grid grid-cols-2 gap-4">
          {suggestedRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full aspect-square object-cover bg-gray-200 dark:bg-gray-700"
              />
              <div className="p-3">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{recipe.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{recipe.time} • {recipe.difficulty}</p>
                <div className="flex items-center justify-between mt-2">
                  <Button size="sm" variant="outline" className="text-xs">View</Button>
                  <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => setShowQuickActions(true)} />

      {/* Quick Actions Modal */}
      <SlideUpModal
        isOpen={showQuickActions}
        onClose={() => setShowQuickActions(false)}
        title="Quick Actions"
      >
        <div className="space-y-4">
          <Button className="w-full">Add New Recipe</Button>
          <Button className="w-full" variant="secondary">Plan a Meal</Button>
          <Button className="w-full" variant="secondary">Add to Shopping List</Button>
          <Button className="w-full" variant="secondary">Check Pantry</Button>
        </div>
      </SlideUpModal>
    </div>
  );
}


import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FloatingActionButton } from '@/components/UI/FloatingActionButton';
import { SlideUpModal } from '@/components/UI/SlideUpModal';
import { Calendar, Clock, Users, DollarSign, ChefHat, Heart, Star, TrendingUp, ShoppingCart } from 'lucide-react';

const upcomingMeals = [
  { id: 1, title: 'Spaghetti Carbonara', time: 'Today 6:30 PM', image: '/placeholder.svg', priority: 'high' },
  { id: 2, title: 'Greek Salad', time: 'Tomorrow 12:00 PM', image: '/placeholder.svg', priority: 'medium' },
  { id: 3, title: 'Beef Tacos', time: 'Wed 7:00 PM', image: '/placeholder.svg', priority: 'low' },
];

const suggestedRecipes = [
  { id: 1, title: 'Chicken Curry', time: '45 min', difficulty: 'Easy', image: '/placeholder.svg', rating: 4.5 },
  { id: 2, title: 'Caesar Salad', time: '15 min', difficulty: 'Easy', image: '/placeholder.svg', rating: 4.2 },
  { id: 3, title: 'Beef Stir Fry', time: '30 min', difficulty: 'Medium', image: '/placeholder.svg', rating: 4.7 },
];

const memberActivity = [
  { id: 1, member: 'John', action: 'added Chicken Parmesan to favorites', time: '2 hours ago', avatar: '/placeholder.svg' },
  { id: 2, member: 'Sarah', action: 'completed meal prep for Tuesday', time: '4 hours ago', avatar: '/placeholder.svg' },
  { id: 3, member: 'Mike', action: 'shared a new recipe: Fish Tacos', time: '6 hours ago', avatar: '/placeholder.svg' },
];

const priorityMeals = [
  { id: 1, title: 'Tonight\'s Dinner', meal: 'Spaghetti Carbonara', time: '6:30 PM', status: 'ready' },
  { id: 2, title: 'Tomorrow\'s Lunch', meal: 'Greek Salad', time: '12:00 PM', status: 'planned' },
  { id: 3, title: 'Weekend Prep', meal: 'Meal Prep Sunday', time: 'This Sunday', status: 'pending' },
];

const filterTags = ['All', 'Quick', 'Healthy', 'Vegetarian', 'Low Carb', 'Family'];

export function Dashboard() {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'planned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-6 pt-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Good evening, Sarah!</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">What's cooking today?</p>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-3xl border bg-card text-card-foreground p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">12</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Meals Planned</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <div className="rounded-3xl border bg-card text-card-foreground p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">$84</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Week's Budget</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="rounded-3xl border bg-card text-card-foreground p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">4</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Family Members</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="rounded-3xl border bg-card text-card-foreground p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">23</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Shopping Items</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Priority Meal Planning Cards */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Priority Meals</h2>
          <div className="space-y-3">
            {priorityMeals.map((meal) => (
              <div key={meal.id} className="rounded-3xl border bg-card text-card-foreground p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{meal.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{meal.meal}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {meal.time}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-2xl text-xs font-medium ${getStatusColor(meal.status)}`}>
                    {meal.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meals Carousel */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Upcoming Meals</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {upcomingMeals.map((meal) => (
              <div key={meal.id} className={`min-w-[280px] snap-center overflow-hidden rounded-3xl border bg-card text-card-foreground border-l-4 ${getPriorityColor(meal.priority)}`}>
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
              </div>
            ))}
          </div>
        </div>

        {/* Member Activity Feed */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Family Activity</h2>
          <div className="rounded-3xl border bg-card text-card-foreground p-4">
            <div className="space-y-4">
              {memberActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <img 
                    src={activity.avatar} 
                    alt={activity.member}
                    className="w-8 h-8 rounded-2xl bg-gray-200 dark:bg-gray-700"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      <span className="font-medium">{activity.member}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
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
                className={`px-4 py-2 rounded-2xl text-sm font-medium whitespace-nowrap transition-colors ${
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

        {/* Enhanced Suggested Recipes */}
        <div className="grid grid-cols-2 gap-4">
          {suggestedRecipes.map((recipe) => (
            <div key={recipe.id} className="overflow-hidden rounded-3xl border bg-card text-card-foreground">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full aspect-square object-cover bg-gray-200 dark:bg-gray-700"
              />
              <div className="p-3">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{recipe.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{recipe.time} • {recipe.difficulty}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{recipe.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="text-xs rounded-2xl">View</Button>
                    <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
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
          <Button className="w-full flex items-center justify-center rounded-2xl">
            <ChefHat className="w-4 h-4 mr-2" />
            Add New Recipe
          </Button>
          <Button className="w-full flex items-center justify-center rounded-2xl" variant="secondary">
            <Calendar className="w-4 h-4 mr-2" />
            Plan a Meal
          </Button>
          <Button className="w-full flex items-center justify-center rounded-2xl" variant="secondary">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Shopping List
          </Button>
          <Button className="w-full flex items-center justify-center rounded-2xl" variant="secondary">
            <TrendingUp className="w-4 h-4 mr-2" />
            Check Pantry
          </Button>
        </div>
      </SlideUpModal>
    </div>
  );
}

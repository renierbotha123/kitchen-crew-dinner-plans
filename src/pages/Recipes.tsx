
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FloatingActionButton } from '../components/UI/FloatingActionButton';
import { Search, Filter, Clock, Users, Heart } from 'lucide-react';

const recipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    image: '/placeholder.svg',
    cookTime: 25,
    servings: 4,
    difficulty: 'Easy',
    type: 'Italian',
    isFavorite: true
  },
  {
    id: 2,
    title: 'Greek Salad',
    image: '/placeholder.svg',
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    type: 'Mediterranean',
    isFavorite: false
  },
  {
    id: 3,
    title: 'Beef Tacos',
    image: '/placeholder.svg',
    cookTime: 30,
    servings: 6,
    difficulty: 'Medium',
    type: 'Mexican',
    isFavorite: true
  },
  {
    id: 4,
    title: 'Chicken Curry',
    image: '/placeholder.svg',
    cookTime: 45,
    servings: 4,
    difficulty: 'Medium',
    type: 'Indian',
    isFavorite: false
  }
];

const categories = ['All', 'Favorites', 'Italian', 'Mediterranean', 'Mexican', 'Indian', 'Quick'];

export function Recipes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || 
                           (activeCategory === 'Favorites' && recipe.isFavorite) ||
                           recipe.type === activeCategory ||
                           (activeCategory === 'Quick' && recipe.cookTime <= 20);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-6 pt-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Recipes</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
          >
            <Filter className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Category Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden">
              <div className="relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full aspect-square object-cover bg-gray-200 dark:bg-gray-700"
                />
                <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full">
                  <Heart 
                    className={`w-4 h-4 ${
                      recipe.isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
                    }`} 
                  />
                </button>
              </div>
              
              <div className="p-3">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2">
                  {recipe.title}
                </h3>
                
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 space-x-3 mb-3">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {recipe.cookTime}m
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {recipe.servings}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                    {recipe.difficulty}
                  </span>
                  <Button size="sm" variant="outline" className="text-xs">
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No recipes found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => console.log('Add recipe')} />
    </div>
  );
}

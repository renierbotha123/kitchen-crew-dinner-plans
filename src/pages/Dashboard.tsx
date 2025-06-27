
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UpcomingMealCard } from '@/components/Dashboard/UpcomingMealCard';
import { MealAheadItem } from '@/components/Dashboard/MealAheadItem';
import { PriorityListItem } from '@/components/Dashboard/PriorityListItem';
import { HighlightCard } from '@/components/Dashboard/HighlightCard';
import { RecipeCard } from '@/components/Dashboard/RecipeCard';

// Mock data
const upcomingMeal = {
  id: '1',
  image: '/placeholder.svg',
  title: 'Harissa-rubbed chicken with heirloom tomato salad',
  type: 'Dinner',
  tags: ['Chicken'],
  prepTime: '20 min',
  cookTime: '10 min',
  serves: 4
};

const mealsAhead = [
  {
    id: '1',
    image: '/placeholder.svg',
    title: 'Tasty Chicken Ala king with cauliflower rice',
    date: 'Jun 23rd',
    day: 'Today',
    tags: ['Chicken', 'Breakfast'],
    ingredientsCount: 6,
    totalIngredients: 7
  },
  {
    id: '2',
    image: '/placeholder.svg',
    title: 'Venison steak salad',
    date: 'Jun 24th',
    day: 'Tuesday',
    tags: ['Meat'],
    ingredientsCount: 6,
    totalIngredients: 7
  },
  {
    id: '3',
    image: '/placeholder.svg',
    title: 'Quick and easy pan tikka fish rolls',
    date: 'Jun 25th',
    day: 'Wednesday',
    tags: ['Fish'],
    ingredientsCount: 6,
    totalIngredients: 7
  }
];

const priorityItems = [
  {
    id: '1',
    type: 'ingredient' as const,
    text: '6 pack milk',
    completed: true
  },
  {
    id: '2',
    type: 'ingredient' as const,
    text: '150g mushrooms',
    completed: true
  },
  {
    id: '3',
    type: 'ingredient' as const,
    text: '250g carrots',
    completed: false
  },
  {
    id: '4',
    type: 'ingredient' as const,
    text: 'Apples',
    completed: false
  },
  {
    id: '5',
    type: 'note' as const,
    text: 'We need to buy some washing powder',
    completed: false,
    memberName: 'Lex'
  }
];

const activityFeed = [
  { id: '1', member: 'Renier', action: 'Added mushrooms to the household pantry', time: '2 hours ago', avatar: '/placeholder.svg' },
  { id: '2', member: 'Demi', action: 'Invited Jessica to the household', time: '4 hours ago', avatar: '/placeholder.svg' },
  { id: '3', member: 'Lex', action: 'Added Note: We need to buy washing powder', time: '6 hours ago', avatar: '/placeholder.svg' }
];

const suggestedRecipes = [
  { id: '1', image: '/placeholder.svg', title: 'Toast with egg and avocado', time: '15 min', difficulty: 'Easy', rating: 4.9, chef: 'Jack Black' },
  { id: '2', image: '/placeholder.svg', title: 'Pork breakfast burger', time: '18 min', difficulty: 'Medium', rating: 4.5, chef: 'Castle on 25' },
  { id: '3', image: '/placeholder.svg', title: 'Chicken Curry', time: '45 min', difficulty: 'Medium', rating: 4.7, chef: 'Chef Maria' },
  { id: '4', image: '/placeholder.svg', title: 'Fish Tacos', time: '25 min', difficulty: 'Easy', rating: 4.4, chef: 'Coastal Kitchen' }
];

const filterTags = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Baked'];

export function Dashboard() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Breakfast');
  const [priorityList, setPriorityList] = useState(priorityItems);

  const togglePriorityItem = (id: string) => {
    setPriorityList(items => 
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* 1️⃣ Greeting / Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-6 pt-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Hello, Peter 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Here is what you missed
        </p>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* 2️⃣ Up-coming Meal */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Up-coming Meal
          </h2>
          <UpcomingMealCard 
            meal={upcomingMeal}
            onGoToRecipe={() => navigate('/recipes')}
          />
        </div>

        {/* 3️⃣ Your Meals Ahead */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Your Meals Ahead
          </h2>
          
          <div className="space-y-3">
            <ScrollArea className="h-80">
              <div className="space-y-3 pr-4">
                {mealsAhead.map((meal) => (
                  <MealAheadItem key={meal.id} meal={meal} />
                ))}
              </div>
            </ScrollArea>
            
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => navigate('/calendar')}
            >
              Go To Calendar
            </Button>
          </div>
        </div>

        {/* 4️⃣ Priority List */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Priority List:
          </h2>
          
          <div className="space-y-3">
            <Card className="p-0">
              <ScrollArea className="h-64">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {priorityList.map((item) => (
                    <PriorityListItem 
                      key={item.id} 
                      item={item} 
                      onToggle={togglePriorityItem}
                    />
                  ))}
                </div>
              </ScrollArea>
            </Card>
            
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => console.log('Navigate to Priority List')}
            >
              Go To Priority List
            </Button>
          </div>
        </div>

        {/* 5️⃣ Highlights Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Highlights
          </h2>
          
          <div className="space-y-4">
            {/* Meals Planned Card */}
            <HighlightCard
              title="This Week"
              value="3 Meals Planned"
              cta="Add more meals"
              onCtaClick={() => navigate('/calendar')}
            />
            
            {/* Week Total Card */}
            <HighlightCard
              title="Week Total"
              value="R950.00 Estimated Cost"
              cta="Review groceries"
              onCtaClick={() => navigate('/cart')}
            />
            
            {/* Household Activity Card */}
            <HighlightCard
              title="Household Activity"
              value=""
              cta="Mark as read"
              onCtaClick={() => console.log('Mark activity as read')}
            >
              <div className="space-y-3">
                {activityFeed.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <img 
                      src={activity.avatar} 
                      alt={activity.member}
                      className="w-8 h-8 rounded-2xl bg-gray-200 dark:bg-gray-700 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        <span className="font-medium">{activity.member}</span>
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </HighlightCard>
          </div>
        </div>

        {/* 6️⃣ Suggested Recipes */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Suggested Recipes
          </h2>
          
          {/* Filter Tags - Horizontal Scroll */}
          <div className="mb-4">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-2 pb-4">
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
            </ScrollArea>
          </div>
          
          {/* Recipe Cards - Horizontal Scroll */}
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 pb-4">
              {suggestedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onView={() => navigate('/recipes')}
                  onFavorite={() => console.log('Add to favorites')}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

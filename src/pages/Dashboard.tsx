
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { UpcomingMealCard } from '@/components/Dashboard/UpcomingMealCard';
import { MealAheadItem } from '@/components/Dashboard/MealAheadItem';
import { PriorityListItem } from '@/components/Dashboard/PriorityListItem';
import { HighlightCard } from '@/components/Dashboard/HighlightCard';
import { RecipeCard } from '@/components/Dashboard/RecipeCard';
import { ShoppingCart } from 'lucide-react';

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
        {/* 2️⃣ Carousel Section - Top 3 Cards */}
        <div>
          <Carousel className="w-full" opts={{ align: "start", loop: false }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {/* Upcoming Meal Card */}
              <CarouselItem className="pl-2 md:pl-4 basis-[90%]">
                <Card className="p-4 h-[450px] flex flex-col">
                  <div className="flex-1 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Up-coming Meal
                    </h2>
                    
                    {/* Meal Image */}
                    <img 
                      src={upcomingMeal.image} 
                      alt={upcomingMeal.title}
                      className="w-full h-48 object-cover rounded-2xl bg-gray-200 dark:bg-gray-700"
                    />
                    
                    {/* Type Tags */}
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-2xl">
                        {upcomingMeal.type}
                      </span>
                      {upcomingMeal.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-2xl">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Recipe Title */}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {upcomingMeal.title}
                    </h3>
                    
                    {/* Time and Serving Info */}
                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>Prep: {upcomingMeal.prepTime}</span>
                      <span>Cook: {upcomingMeal.cookTime}</span>
                      <span>Serves {upcomingMeal.serves}</span>
                    </div>
                  </div>
                  
                  {/* CTA Button at bottom */}
                  <Button onClick={() => navigate('/recipes')} className="w-full mt-4">
                    Go To Recipe
                  </Button>
                </Card>
              </CarouselItem>

              {/* Your Meals Ahead Card */}
              <CarouselItem className="pl-2 md:pl-4 basis-[90%]">
                <Card className="p-4 h-[450px] flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Your Meals Ahead
                  </h2>
                  
                  {/* Scrollable Meals List */}
                  <ScrollArea className="flex-1 mb-4">
                    <div className="space-y-3 pr-4">
                      {mealsAhead.map((meal) => (
                        <div key={meal.id} className="flex gap-3 p-3 bg-white dark:bg-gray-800 rounded-2xl border">
                          {/* Recipe Image Thumbnail */}
                          <img 
                            src={meal.image} 
                            alt={meal.title}
                            className="w-16 h-16 object-cover rounded-2xl bg-gray-200 dark:bg-gray-700 flex-shrink-0"
                          />
                          
                          <div className="flex-1 space-y-2">
                            {/* Recipe Title */}
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {meal.title}
                            </h4>
                            
                            {/* Date */}
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {meal.day} • {meal.date}
                            </p>
                            
                            {/* Tags and Ingredients Count */}
                            <div className="flex gap-2 flex-wrap items-center">
                              {meal.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-2xl">
                                  {tag}
                                </span>
                              ))}
                              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-2xl flex items-center gap-1">
                                <ShoppingCart className="w-3 h-3" />
                                {meal.ingredientsCount}/{meal.totalIngredients}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {/* CTA Button at bottom */}
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={() => navigate('/calendar')}
                  >
                    Go To Calendar
                  </Button>
                </Card>
              </CarouselItem>

              {/* Priority List Card */}
              <CarouselItem className="pl-2 md:pl-4 basis-[90%]">
                <Card className="p-4 h-[450px] flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Priority List
                  </h2>
                  
                  {/* Scrollable Priority List */}
                  <ScrollArea className="flex-1 mb-4">
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
                  
                  {/* CTA Button at bottom */}
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={() => console.log('Navigate to Priority List')}
                  >
                    Go To Priority List
                  </Button>
                </Card>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>

        {/* 3️⃣ Highlights Section */}
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

        {/* 4️⃣ Suggested Recipes */}
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

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { useMealPlan } from '@/contexts/MealPlanContext';
import { RecipeHeader } from '@/components/Recipe/RecipeHeader';
import { RecipeCoverImage } from '@/components/Recipe/RecipeCoverImage';
import { RecipeInfo } from '@/components/Recipe/RecipeInfo';
import { RecipeIngredients } from '@/components/Recipe/RecipeIngredients';
import { RecipeMethod } from '@/components/Recipe/RecipeMethod';
import { RecipeSource } from '@/components/Recipe/RecipeSource';
import { ScheduleMealModal } from '@/components/Recipe/ScheduleMealModal';
import { RecipeActions } from '@/components/Recipe/RecipeActions';

// Mock recipe data - in a real app, this would come from props, API, or context
const mockRecipe = {
  id: 1,
  title: "Grilled Chicken Caesar Salad",
  image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop",
  cookTime: 25,
  prepTime: 15,
  serves: 4,
  tags: ["Chicken", "Healthy"],
  source: "User Added",
  sourceUrl: "",
  isFavorited: false,
  ingredients: [
    "2 lbs boneless, skinless chicken breasts",
    "1 large head romaine lettuce, chopped",
    "1/2 cup freshly grated Parmesan cheese",
    "1/4 cup Caesar dressing",
    "2 tbsp olive oil",
    "1 tsp garlic powder",
    "1 tsp dried oregano",
    "Salt and pepper to taste",
    "1 cup croutons",
    "2 anchovy fillets (optional)"
  ],
  method: `1. Preheat grill to medium-high heat.

2. Season chicken breasts with olive oil, garlic powder, oregano, salt, and pepper. Let marinate for 10 minutes.

3. Grill chicken for 6-7 minutes per side, or until internal temperature reaches 165°F (74°C).

4. Let chicken rest for 5 minutes, then slice into strips.

5. In a large bowl, combine chopped romaine lettuce with Caesar dressing.

6. Add grilled chicken strips, Parmesan cheese, and croutons.

7. Toss gently to combine. Add anchovy fillets if using.

8. Serve immediately while chicken is still warm.

Pro tip: For extra flavor, brush chicken with additional Caesar dressing while grilling.`
};

export function RecipeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  const { addMeal } = useMealPlan();
  
  // Check if user came from dashboard (upcoming meal card)
  const isFromDashboard = location.state?.fromDashboard || false;
  
  // State management
  const [recipe] = useState(mockRecipe);
  const [isFavorited, setIsFavorited] = useState(recipe.isFavorited);
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(
    new Array(recipe.ingredients.length).fill(false)
  );
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner'>('dinner');

  // Hide bottom navigation when component mounts, show it when unmounting
  useEffect(() => {
    const bottomNav = document.querySelector('nav[class*="fixed bottom-0"]') as HTMLElement;
    if (bottomNav && !isFromDashboard) {
      // Store original visibility state
      const originalDisplay = bottomNav.style.display;
      bottomNav.style.display = 'none';

      // Cleanup: restore navigation when leaving the page
      return () => {
        // Only restore if the element still exists and we're the ones who hid it
        if (bottomNav) {
          bottomNav.style.display = originalDisplay || '';
        }
      };
    }
  }, [isFromDashboard]);

  // Handlers
  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited 
        ? "Recipe removed from your favorites" 
        : "Recipe saved to your favorites",
    });
  };

  const handleAddToCalendar = () => {
    setShowCalendarModal(true);
  };

  const handleConfirmAddToCalendar = () => {
    if (selectedDate) {
      // Create meal object from recipe
      const mealToAdd = {
        id: 0, // Will be assigned by context
        title: recipe.title,
        type: selectedMealType,
        cookTime: recipe.cookTime,
        prepTime: recipe.prepTime,
        serves: recipe.serves,
        image: recipe.image,
        ingredients: recipe.ingredients,
        missingIngredients: []
      };

      // TODO: Fix after updating meal plan context 
      console.log('Would add meal:', { date: selectedDate.toISOString().split('T')[0], mealToAdd });

      toast({
        title: "Added to meal plan",
        description: `Recipe scheduled for ${format(selectedDate, 'PPP')} - ${selectedMealType}`,
      });
      setShowCalendarModal(false);
      setSelectedDate(undefined);
      setSelectedMealType('dinner');
    }
  };

  const handleAddToCart = () => {
    const uncheckedIngredients = recipe.ingredients.filter(
      (_, index) => !checkedIngredients[index]
    );
    
    toast({
      title: "Ingredients added to cart",
      description: `${uncheckedIngredients.length} ingredients added to your shopping list`,
    });
  };

  const handleIngredientToggle = (index: number) => {
    setCheckedIngredients(prev => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <RecipeHeader onBack={handleBack} />

      <div className={isFromDashboard ? "pb-32" : "pb-6"}>
        <RecipeCoverImage
          image={recipe.image}
          title={recipe.title}
          isFromDashboard={isFromDashboard}
          isFavorited={isFavorited}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Content */}
        <div className="px-4 py-6 space-y-6">
          <RecipeInfo
            title={recipe.title}
            tags={recipe.tags}
            prepTime={recipe.prepTime}
            cookTime={recipe.cookTime}
            serves={recipe.serves}
          />

          <RecipeIngredients
            ingredients={recipe.ingredients}
            checkedIngredients={checkedIngredients}
            onIngredientToggle={handleIngredientToggle}
          />

          <RecipeMethod method={recipe.method} />

          <RecipeSource source={recipe.source} sourceUrl={recipe.sourceUrl} />
        </div>
      </div>

      <RecipeActions
        isFromDashboard={isFromDashboard}
        isFavorited={isFavorited}
        onToggleFavorite={handleToggleFavorite}
        onAddToCalendar={handleAddToCalendar}
      />

      <ScheduleMealModal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        selectedMealType={selectedMealType}
        onSelectMealType={setSelectedMealType}
        onAddToCart={handleAddToCart}
        onSchedule={handleConfirmAddToCalendar}
      />
    </div>
  );
}

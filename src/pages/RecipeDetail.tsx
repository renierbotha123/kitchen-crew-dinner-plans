import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Heart, Calendar, ShoppingCart, Clock, Users, ChefHat, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

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

interface IngredientItemProps {
  ingredient: string;
  index: number;
  isChecked: boolean;
  onToggle: (index: number) => void;
}

// Ingredient Item Component
function IngredientItem({ ingredient, index, isChecked, onToggle }: IngredientItemProps) {
  return (
    <div className="flex items-start space-x-3 py-2">
      <Checkbox
        id={`ingredient-${index}`}
        checked={isChecked}
        onCheckedChange={() => onToggle(index)}
        className="mt-1"
      />
      <label
        htmlFor={`ingredient-${index}`}
        className={`text-sm leading-relaxed cursor-pointer ${
          isChecked ? 'line-through text-muted-foreground' : 'text-foreground'
        }`}
      >
        {ingredient}
      </label>
    </div>
  );
}

// Source Link Component
interface SourceLinkProps {
  source: string;
  sourceUrl?: string;
}

function SourceLink({ source, sourceUrl }: SourceLinkProps) {
  if (sourceUrl) {
    return (
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 underline text-sm"
      >
        {source}
      </a>
    );
  }
  
  return <span className="text-muted-foreground text-sm">{source}</span>;
}

export function RecipeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  
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
      bottomNav.style.display = 'none';
    }

    // Cleanup: show navigation when leaving the page
    return () => {
      if (bottomNav && !isFromDashboard) {
        bottomNav.style.display = 'flex';
      }
    };
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

  const mealTypeOptions = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40">
        <div className="flex items-center px-4 py-4">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 rounded-full hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="ml-2 text-lg font-semibold text-foreground truncate">
            Recipe
          </h1>
        </div>
      </div>

      <div className={isFromDashboard ? "pb-32" : "pb-6"}>
        {/* Cover Image */}
        <div className="relative w-full h-64 sm:h-80 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          
          {/* Favorite Heart - only show if from dashboard */}
          {isFromDashboard && (
            <button
              onClick={handleToggleFavorite}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <Heart 
                className={`w-5 h-5 ${
                  isFavorited 
                    ? 'text-red-500 fill-current' 
                    : 'text-white'
                }`}
              />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="px-4 py-6 space-y-6">
          {/* Main Info Section */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-foreground leading-tight">
              {recipe.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Recipe Stats */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <ChefHat className="w-4 h-4" />
                <span>{recipe.prepTime}m prep</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.cookTime}m cook</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Serves {recipe.serves}</span>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Ingredients
            </h2>
            <div className="space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <IngredientItem
                  key={index}
                  ingredient={ingredient}
                  index={index}
                  isChecked={checkedIngredients[index]}
                  onToggle={handleIngredientToggle}
                />
              ))}
            </div>
          </Card>

          {/* Method Section */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Method
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {recipe.method}
              </p>
            </div>
          </Card>

          {/* Source Section */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Source:</span>
            <SourceLink source={recipe.source} sourceUrl={recipe.sourceUrl} />
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions - Different layout based on source */}
      {!isFromDashboard && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 space-y-3">
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleToggleFavorite}
              className="flex-1"
            >
              <Heart
                className={`w-4 h-4 mr-2 ${
                  isFavorited ? 'fill-current text-red-500' : ''
                }`}
              />
              {isFavorited ? 'Favorited' : 'Favorite'}
            </Button>
            <Button
              size="lg"
              onClick={handleAddToCalendar}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Add to Plan
            </Button>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={handleAddToCart}
            className="w-full"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add Ingredients to Cart
          </Button>
        </div>
      )}

      {/* Bottom Navigation Space - only when from dashboard */}
      {isFromDashboard && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-6">
          <Button
            variant="outline"
            size="lg"
            onClick={handleAddToCart}
            className="w-full"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add Ingredients to Cart
          </Button>
        </div>
      )}

      {/* Calendar Modal */}
      <Dialog open={showCalendarModal} onOpenChange={setShowCalendarModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Meal</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Calendar */}
            <div className="flex justify-center">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                initialFocus
                className="rounded-md border"
              />
            </div>

            {/* Meal Type Selector */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Meal Type</h3>
              <div className="flex gap-2">
                {mealTypeOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedMealType === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedMealType(option.value as 'breakfast' | 'lunch' | 'dinner')}
                    className="flex-1"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowCalendarModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleConfirmAddToCalendar}
                disabled={!selectedDate}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

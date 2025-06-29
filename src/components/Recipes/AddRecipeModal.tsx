
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AddRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recipe: any) => void;
  prefilledData?: any;
}

const FOOD_TYPES = ['Chicken', 'Beef', 'Fish', 'Pork', 'Vegetarian', 'Vegan', 'Pasta', 'Rice', 'Soup', 'Salad', 'Other'];
const MEAL_TYPES = ['Healthy', 'Quick', 'Easy', 'Comfort Food', 'Spicy', 'Sweet', 'Low Carb', 'High Protein', "Other"];

export function AddRecipeModal({ isOpen, onClose, onSubmit, prefilledData }: AddRecipeModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    cookTime: '',
    prepTime: '',
    serves: '',
    method: '',
    source: 'User Added',
    visibility: 'public'
  });
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [foodType, setFoodType] = useState<string>('');
  const [mealType, setMealType] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form when prefilledData changes
  useEffect(() => {
    if (prefilledData) {
      setFormData({
        title: prefilledData.title || '',
        description: prefilledData.description || '',
        image: prefilledData.image || '',
        cookTime: prefilledData.cookTime || '',
        prepTime: prefilledData.prepTime || '',
        serves: prefilledData.serves || '',
        method: prefilledData.method || '',
        source: prefilledData.source || 'AI Generated',
        visibility: 'public'
      });
      
      setIngredients(prefilledData.ingredients || []);
      
      // Set tags from prefilled data
      if (prefilledData.tags && prefilledData.tags.length > 0) {
        const [firstTag, secondTag] = prefilledData.tags;
        if (FOOD_TYPES.includes(firstTag)) {
          setFoodType(firstTag);
          setMealType(MEAL_TYPES.includes(secondTag) ? secondTag : '');
        } else if (MEAL_TYPES.includes(firstTag)) {
          setMealType(firstTag);
          setFoodType(FOOD_TYPES.includes(secondTag) ? secondTag : '');
        }
      }
    }
  }, [prefilledData]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: '',
        description: '',
        image: '',
        cookTime: '',
        prepTime: '',
        serves: '',
        method: '',
        source: 'User Added',
        visibility: 'public'
      });
      setIngredients([]);
      setCurrentIngredient('');
      setFoodType('');
      setMealType('');
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addIngredients = () => {
    if (currentIngredient.trim()) {
      // Split by comma and clean up each ingredient
      const newIngredients = currentIngredient
        .split(',')
        .map(ingredient => ingredient.trim())
        .filter(ingredient => ingredient.length > 0);
      
      setIngredients(prev => [...prev, ...newIngredients]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleFoodTypeSelect = (type: string) => {
    setFoodType(foodType === type ? '' : type);
  };

  const handleMealTypeSelect = (type: string) => {
    setMealType(mealType === type ? '' : type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Recipe title is required",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to save recipes",
          variant: "destructive"
        });
        return;
      }

      // Prepare recipe data for database
      const recipeData = {
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        cover_image_url: formData.image.trim() || null,
        prep_time_minutes: formData.prepTime ? parseInt(formData.prepTime) : null,
        cook_time_minutes: formData.cookTime ? parseInt(formData.cookTime) : null,
        serves: formData.serves ? parseInt(formData.serves) : null,
        method: formData.method.trim() || null,
        source: formData.source.trim() || 'User Added',
        visibility: formData.visibility as 'public' | 'private',
        food_type: foodType || null,
        meal_type: mealType || null,
        ingredients: ingredients.length > 0 ? ingredients : null,
        created_by: user.id,
        household_id: null // Will be set by RLS/triggers if needed
      };

      // Insert into Supabase
      const { data, error } = await supabase
        .from('recipes')
        .insert([recipeData])
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        toast({
          title: "Error",
          description: "Failed to save recipe. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Success! Close modal and notify parent
      toast({
        title: "Success",
        description: "Recipe saved successfully!",
      });

      onSubmit(data);
      onClose();

      // Reset form
      setFormData({
        title: '',
        description: '',
        image: '',
        cookTime: '',
        prepTime: '',
        serves: '',
        method: '',
        source: 'User Added',
        visibility: 'public'
      });
      setIngredients([]);
      setCurrentIngredient('');
      setFoodType('');
      setMealType('');

    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50">
      {/* Modal Content with rounded top */}
      <div className="fixed inset-x-0 top-0 bottom-0 bg-white dark:bg-gray-900 rounded-t-3xl overflow-hidden mt-8">
        {/* Drag Indicator */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Header with back button and title */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center space-x-3 mb-3">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {prefilledData ? 'Review & Add Recipe' : 'Add New Recipe'}
            </h1>
          </div>
          {prefilledData && (
            <p className="text-sm text-muted-foreground">
              Review the AI-generated recipe details and make any changes before adding to your collection.
            </p>
          )}
        </div>

        {/* Content - Form */}
        <div className="flex-1 px-4 py-2 pb-24 h-full overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title">Recipe Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter recipe title"
                required
                className="mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the recipe"
                rows={2}
                className="mt-1"
              />
            </div>

            {/* Image URL */}
            <div>
              <Label htmlFor="image">Cover Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="mt-1"
              />
            </div>

            {/* Time and Serves */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="prepTime">Prep Time (min)</Label>
                <Input
                  id="prepTime"
                  type="number"
                  value={formData.prepTime}
                  onChange={(e) => handleInputChange('prepTime', e.target.value)}
                  placeholder="15"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cookTime">Cook Time (min)</Label>
                <Input
                  id="cookTime"
                  type="number"
                  value={formData.cookTime}
                  onChange={(e) => handleInputChange('cookTime', e.target.value)}
                  placeholder="30"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="serves">Serves</Label>
                <Input
                  id="serves"
                  type="number"
                  value={formData.serves}
                  onChange={(e) => handleInputChange('serves', e.target.value)}
                  placeholder="4"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <Label>Ingredients</Label>
              <div className="flex gap-2 mt-1 mb-2">
                <Input
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  placeholder="Add ingredients (separate with commas)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredients())}
                />
                <Button type="button" onClick={addIngredients} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Tip: Separate multiple ingredients with commas (e.g., "2 cups flour, 1 tsp salt, 3 eggs")
              </p>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {ingredient}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeIngredient(index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Food Type */}
            <div>
              <Label>Food Type (select one)</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {FOOD_TYPES.map((type) => (
                  <Badge
                    key={type}
                    variant={foodType === type ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleFoodTypeSelect(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Meal Type */}
            <div>
              <Label>Meal Type (select one)</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {MEAL_TYPES.map((type) => (
                  <Badge
                    key={type}
                    variant={mealType === type ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleMealTypeSelect(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Method */}
            <div>
              <Label htmlFor="method">Cooking Method</Label>
              <Textarea
                id="method"
                value={formData.method}
                onChange={(e) => handleInputChange('method', e.target.value)}
                placeholder="Describe the cooking steps..."
                rows={4}
                className="mt-1"
              />
            </div>

            {/* Source */}
            <div>
              <Label htmlFor="source">Source</Label>
              <select
                id="source"
                value={formData.source}
                onChange={(e) => handleInputChange('source', e.target.value)}
                className="mt-1 w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="User Added">User Added</option>
                <option value="AI Generated">AI Generated</option>
                <option value="URL">From Website</option>
                <option value="Family Recipe">Family Recipe</option>
                <option value="Cookbook">Cookbook</option>
              </select>
            </div>

            {/* Visibility */}
            <div>
              <Label htmlFor="visibility">Visibility</Label>
              <select
                id="visibility"
                value={formData.visibility}
                onChange={(e) => handleInputChange('visibility', e.target.value)}
                className="mt-1 w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </form>
        </div>

        {/* Fixed Add Recipe Button covering nav tray space */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 pb-6">
          <Button 
            onClick={handleSubmit} 
            disabled={!formData.title.trim() || isSubmitting}
            className="w-full h-12 rounded-full"
          >
            {isSubmitting ? 'Saving...' : (prefilledData ? 'Add to My Recipes' : 'Add Recipe')}
          </Button>
        </div>
      </div>
    </div>
  );
}

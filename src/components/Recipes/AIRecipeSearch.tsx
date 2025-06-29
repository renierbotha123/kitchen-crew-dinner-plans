import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { AIRecipeCard } from './AIRecipeCard';
import { AIRecipePreview } from './AIRecipePreview';

interface RecipeSummary {
  title: string;
  description: string;
  prep_time?: number;
  cook_time?: number;
  serves?: number;
  food_type?: string;
  meal_type?: string;
}

interface FullRecipe extends RecipeSummary {
  cover_image_url?: string;
  ingredients?: string[];
  method?: string;
  source?: string;
}

interface AIRecipeSearchProps {
  onAddRecipe: (recipe: any) => void;
}

export function AIRecipeSearch({ onAddRecipe }: AIRecipeSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [recipeSummaries, setRecipeSummaries] = useState<RecipeSummary[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<FullRecipe | null>(null);
  const [isLoadingFullRecipe, setIsLoadingFullRecipe] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    setRecipeSummaries([]);
    
    try {
      // TODO: Replace with actual AI API call
      // Simulating API call with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSummaries: RecipeSummary[] = [
        {
          title: "Classic Chicken Stir Fry",
          description: "Quick and healthy chicken stir fry with fresh vegetables and savory sauce",
          prep_time: 15,
          cook_time: 10,
          serves: 4,
          food_type: "Chicken",
          meal_type: "Quick"
        },
        {
          title: "Mediterranean Quinoa Bowl",
          description: "Nutritious quinoa bowl with fresh herbs, olives, and feta cheese",
          prep_time: 20,
          cook_time: 0,
          serves: 2,
          food_type: "Vegetarian",
          meal_type: "Healthy"
        }
      ];
      
      setRecipeSummaries(mockSummaries);
    } catch (error) {
      console.error('Error searching recipes:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleGetFullRecipe = async (summary: RecipeSummary) => {
    setIsLoadingFullRecipe(true);
    
    try {
      // TODO: Replace with actual AI API call to get full recipe
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const fullRecipe: FullRecipe = {
        ...summary,
        cover_image_url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
        ingredients: [
          "2 lbs boneless chicken breast, sliced",
          "2 cups mixed vegetables (bell peppers, broccoli, carrots)",
          "3 cloves garlic, minced",
          "2 tbsp soy sauce",
          "1 tbsp olive oil",
          "1 tsp ginger, grated",
          "Salt and pepper to taste"
        ],
        method: `1. Heat olive oil in a large pan or wok over medium-high heat.

2. Add chicken strips and cook for 5-6 minutes until golden brown.

3. Add garlic and ginger, cook for 1 minute until fragrant.

4. Add mixed vegetables and stir-fry for 3-4 minutes until crisp-tender.

5. Add soy sauce and season with salt and pepper.

6. Stir everything together and cook for another 2 minutes.

7. Serve immediately over rice or noodles.`,
        source: "AI Generated Recipe"
      };
      
      setSelectedRecipe(fullRecipe);
    } catch (error) {
      console.error('Error fetching full recipe:', error);
    } finally {
      setIsLoadingFullRecipe(false);
    }
  };

  const handleAddToMyRecipes = () => {
    if (selectedRecipe) {
      // Format data for AddRecipeModal
      const recipeForModal = {
        title: selectedRecipe.title,
        image: selectedRecipe.cover_image_url || '',
        prepTime: selectedRecipe.prep_time?.toString() || '',
        cookTime: selectedRecipe.cook_time?.toString() || '',
        serves: selectedRecipe.serves?.toString() || '',
        method: selectedRecipe.method || '',
        source: selectedRecipe.source || 'AI Generated',
        ingredients: selectedRecipe.ingredients || [],
        tags: [selectedRecipe.food_type, selectedRecipe.meal_type].filter(Boolean)
      };
      
      onAddRecipe(recipeForModal);
      setSelectedRecipe(null);
    }
  };

  const handleShowMoreOptions = () => {
    setSelectedRecipe(null);
  };

  if (selectedRecipe) {
    return (
      <AIRecipePreview
        recipe={selectedRecipe}
        isLoading={isLoadingFullRecipe}
        onAddToMyRecipes={handleAddToMyRecipes}
        onShowMoreOptions={handleShowMoreOptions}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Describe the recipe you want..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <Button 
          onClick={handleSearch}
          disabled={!searchQuery.trim() || isSearching}
          className="w-full h-12 rounded-full"
        >
          {isSearching ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Finding Recipes...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Find Recipes
            </>
          )}
        </Button>
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Searching for recipes...</p>
        </div>
      )}

      {/* Recipe Results */}
      {!isSearching && recipeSummaries.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Found {recipeSummaries.length} recipe{recipeSummaries.length !== 1 ? 's' : ''}
          </h3>
          <div className="space-y-3">
            {recipeSummaries.map((recipe, index) => (
              <AIRecipeCard
                key={index}
                recipe={recipe}
                onGetFullRecipe={() => handleGetFullRecipe(recipe)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isSearching && hasSearched && recipeSummaries.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No recipes found for your search.</p>
          <p className="text-sm mt-1">Try describing what you'd like to cook differently</p>
        </div>
      )}

      {/* Initial State */}
      {!hasSearched && !isSearching && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-lg font-medium mb-2">Find Recipes with AI</p>
          <p className="text-sm">Describe what you want to cook and I'll find recipes for you</p>
        </div>
      )}
    </div>
  );
}

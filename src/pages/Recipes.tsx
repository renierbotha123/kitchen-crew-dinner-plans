
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FloatingActionButton } from '@/components/UI/FloatingActionButton';
import { RecipeCard } from '@/components/Recipes/RecipeCard';
import { FilterTag } from '@/components/Recipes/FilterTag';
import { PantryItem } from '@/components/Recipes/PantryItem';
import { AddRecipeModal } from '@/components/Recipes/AddRecipeModal';
import { AddPantryItemModal } from '@/components/Recipes/AddPantryItemModal';
import { MissingIngredientsAlert } from '@/components/Recipes/MissingIngredientsAlert';

// Mock data for recipes
const mockRecipes = [
  {
    id: 1,
    title: "Grilled Chicken Caesar",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    cookTime: 25,
    prepTime: 15,
    serves: 4,
    tags: ["Chicken", "Healthy"],
    source: "User Added",
    isFavorited: false
  },
  {
    id: 2,
    title: "Beef Stir Fry",
    image: "https://images.unsplash.com/photo-1603133872878-684bd47ce73f?w=400&h=300&fit=crop",
    cookTime: 20,
    prepTime: 10,
    serves: 3,
    tags: ["Beef", "Quick"],
    source: "URL",
    isFavorited: true
  },
  {
    id: 3,
    title: "Vegetarian Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
    cookTime: 15,
    prepTime: 5,
    serves: 2,
    tags: ["Vegetarian", "Pasta"],
    source: "User Added",
    isFavorited: false
  },
  {
    id: 4,
    title: "Salmon Teriyaki",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    cookTime: 18,
    prepTime: 12,
    serves: 2,
    tags: ["Fish", "Healthy"],
    source: "URL",
    isFavorited: true
  },
  {
    id: 5,
    title: "Mediterranean Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    cookTime: 0,
    prepTime: 20,
    serves: 2,
    tags: ["Vegetarian", "Healthy", "No Cook"],
    source: "User Added",
    isFavorited: false
  }
];

// Mock data for pantry items
const mockPantryItems = [
  { id: 1, name: "Chicken Breast", quantity: "2 lbs", notes: "Expires 12/30" },
  { id: 2, name: "Brown Rice", quantity: "1 bag", notes: "" },
  { id: 3, name: "Olive Oil", quantity: "500ml", notes: "Extra Virgin" },
  { id: 4, name: "Onions", quantity: "3 medium", notes: "" },
  { id: 5, name: "Garlic", quantity: "1 bulb", notes: "" },
  { id: 6, name: "Canned Tomatoes", quantity: "4 cans", notes: "Diced" }
];

// Mock missing ingredients
const mockMissingIngredients = [
  "Fresh Basil",
  "Parmesan Cheese",
  "Heavy Cream"
];

// Filter options
const filterOptions = [
  "All", "Chicken", "Beef", "Fish", "Vegetarian", "Healthy", "Quick", "Pasta", "No Cook"
];

export function Recipes() {
  const [activeTab, setActiveTab] = useState("recipes");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["All"]);
  const [recipes, setRecipes] = useState(mockRecipes);
  const [pantryItems, setPantryItems] = useState(mockPantryItems);
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [showAddPantryModal, setShowAddPantryModal] = useState(false);

  // Filter recipes based on search and selected filters
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters = selectedFilters.includes("All") || 
      selectedFilters.some(filter => recipe.tags.includes(filter));
    return matchesSearch && matchesFilters;
  });

  // Filter pantry items based on search
  const filteredPantryItems = pantryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterToggle = (filter: string) => {
    if (filter === "All") {
      setSelectedFilters(["All"]);
    } else {
      setSelectedFilters(prev => {
        const newFilters = prev.filter(f => f !== "All");
        if (prev.includes(filter)) {
          const filtered = newFilters.filter(f => f !== filter);
          return filtered.length === 0 ? ["All"] : filtered;
        } else {
          return [...newFilters, filter];
        }
      });
    }
  };

  const handleToggleFavorite = (recipeId: number) => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === recipeId 
        ? { ...recipe, isFavorited: !recipe.isFavorited }
        : recipe
    ));
  };

  const handleRemovePantryItem = (itemId: number) => {
    setPantryItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleAddRecipe = (newRecipe: any) => {
    const recipe = {
      id: Date.now(),
      ...newRecipe,
      isFavorited: false
    };
    setRecipes(prev => [recipe, ...prev]);
    setShowAddRecipeModal(false);
  };

  const handleAddPantryItem = (newItem: any) => {
    const item = {
      id: Date.now(),
      ...newItem
    };
    setPantryItems(prev => [item, ...prev]);
    setShowAddPantryModal(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            Recipes & Pantry
          </h1>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="recipes" className="text-sm font-medium">
                Recipes
              </TabsTrigger>
              <TabsTrigger value="pantry" className="text-sm font-medium">
                Pantry
              </TabsTrigger>
            </TabsList>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={activeTab === "recipes" ? "Search recipes..." : "Search pantry..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <TabsContent value="recipes" className="mt-0">
              {/* Filter Tags */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4">
                {filterOptions.map(filter => (
                  <FilterTag
                    key={filter}
                    label={filter}
                    isSelected={selectedFilters.includes(filter)}
                    onToggle={() => handleFilterToggle(filter)}
                  />
                ))}
              </div>

              {/* Recipe Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                {filteredRecipes.map(recipe => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onToggleFavorite={() => handleToggleFavorite(recipe.id)}
                  />
                ))}
                {filteredRecipes.length === 0 && (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    <p>No recipes found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="pantry" className="mt-0">
              {/* Missing Ingredients Alert */}
              {mockMissingIngredients.length > 0 && (
                <MissingIngredientsAlert 
                  ingredients={mockMissingIngredients}
                  className="mb-4"
                />
              )}

              {/* Pantry Items List */}
              <div className="space-y-3 pb-4">
                {filteredPantryItems.map(item => (
                  <PantryItem
                    key={item.id}
                    item={item}
                    onRemove={() => handleRemovePantryItem(item.id)}
                  />
                ))}
                {filteredPantryItems.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No pantry items found</p>
                    <p className="text-sm mt-1">Add some items to get started</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => {
          if (activeTab === "recipes") {
            setShowAddRecipeModal(true);
          } else {
            setShowAddPantryModal(true);
          }
        }}
      />

      {/* Modals */}
      <AddRecipeModal
        isOpen={showAddRecipeModal}
        onClose={() => setShowAddRecipeModal(false)}
        onSubmit={handleAddRecipe}
      />

      <AddPantryItemModal
        isOpen={showAddPantryModal}
        onClose={() => setShowAddPantryModal(false)}
        onSubmit={handleAddPantryItem}
      />
    </div>
  );
}

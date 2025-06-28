
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus, ArrowLeft } from 'lucide-react';

interface AddRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recipe: any) => void;
}

export function AddRecipeModal({ isOpen, onClose, onSubmit }: AddRecipeModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    cookTime: '',
    prepTime: '',
    serves: '',
    method: '',
    source: 'User Added'
  });
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addIngredient = () => {
    if (currentIngredient.trim()) {
      setIngredients(prev => [...prev, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags(prev => [...prev, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const recipe = {
      ...formData,
      cookTime: parseInt(formData.cookTime) || 0,
      prepTime: parseInt(formData.prepTime) || 0,
      serves: parseInt(formData.serves) || 1,
      ingredients,
      tags,
      image: formData.image || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop"
    };

    onSubmit(recipe);
    
    // Reset form
    setFormData({
      title: '',
      image: '',
      cookTime: '',
      prepTime: '',
      serves: '',
      method: '',
      source: 'User Added'
    });
    setIngredients([]);
    setTags([]);
    setCurrentIngredient('');
    setCurrentTag('');
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
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add New Recipe</h1>
          </div>
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
                  placeholder="Add ingredient"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                />
                <Button type="button" onClick={addIngredient} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
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

            {/* Tags */}
            <div>
              <Label>Tags</Label>
              <div className="flex gap-2 mt-1 mb-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add tag (e.g., Chicken, Healthy)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeTag(tag)}
                    />
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
                <option value="URL">From Website</option>
                <option value="Family Recipe">Family Recipe</option>
                <option value="Cookbook">Cookbook</option>
              </select>
            </div>
          </form>
        </div>

        {/* Fixed Add Recipe Button covering nav tray space */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 pb-6">
          <Button 
            onClick={handleSubmit} 
            disabled={!formData.title.trim()}
            className="w-full h-12"
          >
            Add Recipe
          </Button>
        </div>
      </div>
    </div>
  );
}

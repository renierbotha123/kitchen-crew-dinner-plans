
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

interface AddPantryItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: any) => void;
}

export function AddPantryItemModal({ isOpen, onClose, onSubmit }: AddPantryItemModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) return;

    onSubmit(formData);
    
    // Reset form
    setFormData({
      name: '',
      quantity: '',
      notes: ''
    });
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
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add Pantry Item</h1>
          </div>
        </div>

        {/* Content - Form */}
        <div className="flex-1 px-4 py-2 pb-24 h-full overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Item Name */}
            <div>
              <Label htmlFor="itemName">Item Name *</Label>
              <Input
                id="itemName"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Chicken Breast, Rice, Olive Oil"
                required
                className="mt-1"
              />
            </div>

            {/* Quantity */}
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="e.g., 2 lbs, 1 bag, 500ml"
                className="mt-1"
              />
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="e.g., Expires 12/30, Organic, Extra Virgin"
                className="mt-1"
              />
            </div>
          </form>
        </div>

        {/* Fixed Add Item Button covering nav tray space */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 pb-6">
          <Button 
            onClick={handleSubmit} 
            disabled={!formData.name.trim()}
            className="w-full h-12"
          >
            Add to Pantry
          </Button>
        </div>
      </div>
    </div>
  );
}

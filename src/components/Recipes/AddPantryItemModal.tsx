
import React, { useState } from 'react';
import { SlideUpModal } from '@/components/UI/SlideUpModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

  return (
    <SlideUpModal isOpen={isOpen} onClose={onClose} title="Add Pantry Item">
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

        {/* Submit Button */}
        <div className="pt-4">
          <Button type="submit" className="w-full" disabled={!formData.name.trim()}>
            Add to Pantry
          </Button>
        </div>
      </form>
    </SlideUpModal>
  );
}

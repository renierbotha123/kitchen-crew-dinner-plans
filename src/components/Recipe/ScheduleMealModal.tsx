
import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface ScheduleMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  selectedMealType: 'breakfast' | 'lunch' | 'dinner';
  onSelectMealType: (mealType: 'breakfast' | 'lunch' | 'dinner') => void;
  onAddToCart: () => void;
  onSchedule: () => void;
}

export function ScheduleMealModal({
  isOpen,
  onClose,
  selectedDate,
  onSelectDate,
  selectedMealType,
  onSelectMealType,
  onAddToCart,
  onSchedule,
}: ScheduleMealModalProps) {
  const mealTypeOptions = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl p-0">
        {/* Drag Indicator */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>
        
        <SheetHeader className="px-6 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Schedule Meal</SheetTitle>
            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-full hover:bg-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </SheetHeader>
        
        <div className="flex-1 px-6 pb-24 overflow-y-auto">
          <div className="space-y-6">
            {/* Calendar */}
            <div className="flex justify-center">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={onSelectDate}
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
                    onClick={() => onSelectMealType(option.value as 'breakfast' | 'lunch' | 'dinner')}
                    className="flex-1"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Buttons */}
        <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-border p-4 space-y-3">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={onAddToCart}
              variant="outline"
              className="flex-1"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
          <Button
            onClick={onSchedule}
            disabled={!selectedDate}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Schedule
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

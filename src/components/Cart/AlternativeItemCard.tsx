
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Check } from 'lucide-react';

interface AlternativeItemCardProps {
  item: {
    id: number;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    unit: string;
    store: string;
    discountPercent: number;
    rating: number;
  };
  storeLogo: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function AlternativeItemCard({ item, storeLogo, isSelected, onSelect }: AlternativeItemCardProps) {
  const hasDiscount = item.originalPrice && item.originalPrice > item.price;

  return (
    <Card className={`relative w-48 flex-shrink-0 p-4 cursor-pointer transition-all duration-200 ${
      isSelected 
        ? 'ring-2 ring-primary bg-primary/5' 
        : 'hover:shadow-md'
    }`} onClick={onSelect}>
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full h-32 mb-3">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover rounded-xl"
        />
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            -{item.discountPercent}% OFF
          </div>
        )}
        
        {/* Store Logo */}
        <div className="absolute top-2 right-2 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-sm border">
          {storeLogo}
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm leading-tight font-[Jost]">
          {item.name}
        </h4>
        
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {item.unit} • {item.store}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-600 dark:text-gray-400">{item.rating}</span>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900 dark:text-gray-100 font-[Jost]">
              R{item.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-500 line-through">
                R{item.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Select Button */}
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className="w-full rounded-xl text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          {isSelected ? 'Selected' : 'Select Item'}
        </Button>
      </div>
    </Card>
  );
}

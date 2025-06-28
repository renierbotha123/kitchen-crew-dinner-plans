
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';

interface IngredientCardProps {
  item: {
    id: number;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    unit: string;
    inStock: boolean;
  };
  storeLogo: string;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  onSelectAlternative: () => void;
}

export function IngredientCard({ 
  item, 
  storeLogo, 
  onQuantityChange, 
  onRemove, 
  onSelectAlternative 
}: IngredientCardProps) {
  const hasDiscount = item.originalPrice && item.originalPrice > item.price;
  const discountPercent = hasDiscount 
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <Card className={`p-4 ${!item.inStock ? 'opacity-60 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800' : ''}`}>
      {/* Top horizontal container: Image, Title, Amount, Price */}
      <div className="flex space-x-3 mb-3">
        {/* Product Image */}
        <div className="relative w-16 h-16 flex-shrink-0">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover rounded-2xl"
          />
          {hasDiscount && (
            <div className="absolute -top-1 -left-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
              -{discountPercent}%
            </div>
          )}
          {/* Store logo in top-right corner */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-xs border-2 border-gray-200 dark:border-gray-600">
            {storeLogo}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 font-[Jost] leading-tight mb-1">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.unit}</p>
          {!item.inStock && (
            <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-2">Out of stock</p>
          )}
          
          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900 dark:text-gray-100 font-[Jost]">
              R{item.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                R{item.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom container: Quantity Selector and Action Buttons */}
      <div className="flex items-center justify-between">
        {/* Quantity Selector */}
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-2xl p-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-xl"
            onClick={() => onQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-8 text-center font-medium font-[Jost]">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-xl"
            onClick={() => onQuantityChange(item.quantity + 1)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-2xl text-xs"
            onClick={onSelectAlternative}
            disabled={!item.inStock}
          >
            Alternative
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
            onClick={onRemove}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

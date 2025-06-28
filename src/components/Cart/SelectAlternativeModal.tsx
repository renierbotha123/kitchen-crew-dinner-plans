
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search } from 'lucide-react';
import { AlternativeItemCard } from './AlternativeItemCard';

// Mock alternative items data
const mockAlternatives = [
  {
    id: 101,
    name: 'Ground Beef Regular',
    image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=200&h=200&fit=crop',
    price: 79.99,
    originalPrice: 89.99,
    unit: '500g',
    store: 'Pick n Pay',
    discountPercent: 11,
    rating: 4.2
  },
  {
    id: 102,
    name: 'Organic Ground Beef',
    image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=200&h=200&fit=crop',
    price: 124.99,
    originalPrice: null,
    unit: '500g',
    store: 'Woolworths',
    discountPercent: 0,
    rating: 4.8
  },
  {
    id: 103,
    name: 'Lean Ground Beef',
    image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=200&h=200&fit=crop',
    price: 94.99,
    originalPrice: 109.99,
    unit: '500g',
    store: 'Checkers',
    discountPercent: 14,
    rating: 4.5
  },
  {
    id: 104,
    name: 'Premium Ground Beef',
    image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=200&h=200&fit=crop',
    price: 149.99,
    originalPrice: null,
    unit: '500g',
    store: 'Spar',
    discountPercent: 0,
    rating: 4.7
  }
];

const storeLogos = {
  'Pick n Pay': '🛒',
  'Woolworths': '🍃',
  'Checkers': '✓',
  'Spar': '⭐',
  'Shoprite': '🏪'
};

interface SelectAlternativeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: {
    storeKey: string;
    item: any;
  } | null;
  onAlternativeSelected: (alternatives: any[]) => void;
}

export function SelectAlternativeModal({ 
  isOpen, 
  onClose, 
  selectedItem, 
  onAlternativeSelected 
}: SelectAlternativeModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlternatives, setSelectedAlternatives] = useState<any[]>([]);

  // Hide bottom navigation when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const bottomNav = document.querySelector('nav[class*="fixed bottom-0"]');
      if (bottomNav) {
        (bottomNav as HTMLElement).style.display = 'none';
      }
    } else {
      document.body.style.overflow = 'unset';
      const bottomNav = document.querySelector('nav[class*="fixed bottom-0"]');
      if (bottomNav) {
        (bottomNav as HTMLElement).style.display = 'flex';
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      const bottomNav = document.querySelector('nav[class*="fixed bottom-0"]');
      if (bottomNav) {
        (bottomNav as HTMLElement).style.display = 'flex';
      }
    };
  }, [isOpen]);

  const handleSelectAlternative = (alternative: any) => {
    setSelectedAlternatives(prev => {
      const isAlreadySelected = prev.find(item => item.id === alternative.id);
      if (isAlreadySelected) {
        return prev.filter(item => item.id !== alternative.id);
      }
      return [...prev, alternative];
    });
  };

  const handleConfirmSelection = () => {
    onAlternativeSelected(selectedAlternatives);
    setSelectedAlternatives([]);
  };

  const handleChooseForMe = () => {
    // Auto-select the best alternative (first one with discount or highest rating)
    const bestAlternative = mockAlternatives.find(alt => alt.discountPercent > 0) || mockAlternatives[0];
    onAlternativeSelected([bestAlternative]);
    setSelectedAlternatives([]);
  };

  const filteredAlternatives = mockAlternatives.filter(alt =>
    alt.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!selectedItem) return null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900">
      {/* Header with back arrow */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-6 pt-12">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="p-2"
            onClick={onClose}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-[Jost]">
            Alternative Selection
          </h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="px-4 py-6 space-y-6">
          {/* Current Item Being Replaced */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 font-[Jost]">
              Replacing:
            </h3>
            <div className="flex items-center space-x-3">
              <img 
                src={selectedItem.item.image} 
                alt={selectedItem.item.name}
                className="w-12 h-12 object-cover rounded-xl"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100 font-[Jost]">
                  {selectedItem.item.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  R{selectedItem.item.price.toFixed(2)} • {selectedItem.item.unit}
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search alternatives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-2xl border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Alternatives Carousel */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 font-[Jost]">
              Suggested Alternatives
            </h3>
            <div className="horizontal-scroll flex space-x-4 overflow-x-auto pb-4">
              {filteredAlternatives.map((alternative) => (
                <AlternativeItemCard
                  key={alternative.id}
                  item={alternative}
                  storeLogo={storeLogos[alternative.store]}
                  isSelected={selectedAlternatives.some(item => item.id === alternative.id)}
                  onSelect={() => handleSelectAlternative(alternative)}
                />
              ))}
            </div>
          </div>

          {/* Selection Info */}
          {selectedAlternatives.length > 0 && (
            <div className="bg-primary/10 rounded-2xl p-4">
              <p className="text-sm text-primary font-medium">
                {selectedAlternatives.length} alternative{selectedAlternatives.length > 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Multiple selections will be used as backup options
              </p>
            </div>
          )}

          {/* No Alternative Option */}
          <div className="text-center py-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              "I do not want an alternative"
              <br />
              <span className="text-xs">(advice for shoppers)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Sticky CTAs at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-4 pb-safe">
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            className="flex-1 rounded-2xl h-12"
            onClick={handleChooseForMe}
          >
            Choose for me
          </Button>
          <Button
            className="flex-1 rounded-2xl h-12"
            onClick={handleConfirmSelection}
            disabled={selectedAlternatives.length === 0}
          >
            Confirm Selection
          </Button>
        </div>
      </div>
    </div>
  );
}

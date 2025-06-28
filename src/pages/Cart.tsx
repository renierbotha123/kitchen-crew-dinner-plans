
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronDown, ArrowLeft, ShoppingBag } from 'lucide-react';
import { IngredientCard } from '@/components/Cart/IngredientCard';
import { SelectAlternativeModal } from '@/components/Cart/SelectAlternativeModal';
import { CostBreakdownSection } from '@/components/Cart/CostBreakdownSection';

// Mock data for cart items grouped by store
const cartItemsByStore = {
  'Pick n Pay': [
    {
      id: 1,
      name: 'Ground Beef Premium',
      image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=200&h=200&fit=crop',
      price: 89.99,
      originalPrice: 99.99,
      quantity: 1,
      unit: '500g',
      inStock: true
    },
    {
      id: 2,
      name: 'Roma Tomatoes',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=200&fit=crop',
      price: 24.99,
      originalPrice: null,
      quantity: 6,
      unit: 'pieces',
      inStock: true
    }
  ],
  'Woolworths': [
    {
      id: 3,
      name: 'Spaghetti Pasta',
      image: 'https://images.unsplash.com/photo-1551892374-ecf8832cf98b?w=200&h=200&fit=crop',
      price: 18.99,
      originalPrice: 22.99,
      quantity: 1,
      unit: '500g box',
      inStock: true
    },
    {
      id: 4,
      name: 'Parmesan Cheese Block',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&h=200&fit=crop',
      price: 45.99,
      originalPrice: null,
      quantity: 1,
      unit: '200g',
      inStock: false
    }
  ],
  'Checkers': [
    {
      id: 5,
      name: 'Fresh Basil',
      image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=200&h=200&fit=crop',
      price: 12.99,
      originalPrice: 15.99,
      quantity: 1,
      unit: '1 bunch',
      inStock: true
    },
    {
      id: 6,
      name: 'Extra Virgin Olive Oil',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop',
      price: 89.99,
      originalPrice: null,
      quantity: 1,
      unit: '500ml bottle',
      inStock: true
    }
  ]
};

// Store logos mapping (in real app these would be actual store logos)
const storeLogos = {
  'Pick n Pay': '🛒',
  'Woolworths': '🍃',
  'Checkers': '✓',
  'Spar': '⭐',
  'Shoprite': '🏪'
};

export function Cart() {
  const [items, setItems] = useState(cartItemsByStore);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAlternativeModal, setShowAlternativeModal] = useState(false);
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);

  // Calculate totals
  const subtotal = Object.values(items).flat().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 25.00;
  const total = subtotal + deliveryFee;

  const handleQuantityChange = (storeKey, itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(storeKey, itemId);
      return;
    }
    
    setItems(prev => ({
      ...prev,
      [storeKey]: prev[storeKey].map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    }));
  };

  const handleRemoveItem = (storeKey, itemId) => {
    setItems(prev => ({
      ...prev,
      [storeKey]: prev[storeKey].filter(item => item.id !== itemId)
    }));
  };

  const handleSelectAlternative = (storeKey, item) => {
    setSelectedItem({ storeKey, item });
    setShowAlternativeModal(true);
  };

  const handleAlternativeSelected = (alternatives) => {
    // In real app, this would update the cart with selected alternative
    console.log('Selected alternatives:', alternatives);
    setShowAlternativeModal(false);
    setSelectedItem(null);
  };

  // Calculate total items count
  const totalItems = Object.values(items).flat().length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-32">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-6 pt-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-[Jost]">Shopping List</h1>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <ShoppingBag className="w-4 h-4" />
            <span>{totalItems} items</span>
          </div>
        </div>

        {/* Quick Summary */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-[Jost]">R{total.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">{Object.keys(items).length} stores</p>
              <p className="text-sm font-medium text-primary">Ready to checkout</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-4 py-6">
        {/* Store Sections */}
        <Accordion type="multiple" defaultValue={Object.keys(items)} className="space-y-4">
          {Object.entries(items).map(([storeName, storeItems]) => (
            <AccordionItem key={storeName} value={storeName} className="border rounded-2xl bg-white dark:bg-gray-800 overflow-hidden">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full mr-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{storeLogos[storeName] || '🏪'}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">{storeName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{storeItems.length} items</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      R{storeItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3">
                  {storeItems.map((item) => (
                    <IngredientCard
                      key={item.id}
                      item={item}
                      storeLogo={storeLogos[storeName]}
                      onQuantityChange={(newQuantity) => handleQuantityChange(storeName, item.id, newQuantity)}
                      onRemove={() => handleRemoveItem(storeName, item.id)}
                      onSelectAlternative={() => handleSelectAlternative(storeName, item)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {Object.values(items).flat().length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-[Jost]">Your cart is empty</p>
            <Button className="mt-4" onClick={() => window.history.back()}>
              Continue Shopping
            </Button>
          </div>
        )}
      </div>

      {/* Cost Breakdown & Checkout Section */}
      <CostBreakdownSection
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        total={total}
        isExpanded={showCostBreakdown}
        onToggle={() => setShowCostBreakdown(!showCostBreakdown)}
      />

      {/* Select Alternative Modal */}
      <SelectAlternativeModal
        isOpen={showAlternativeModal}
        onClose={() => setShowAlternativeModal(false)}
        selectedItem={selectedItem}
        onAlternativeSelected={handleAlternativeSelected}
      />
    </div>
  );
}

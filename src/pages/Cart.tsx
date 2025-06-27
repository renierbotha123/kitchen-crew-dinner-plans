
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const cartItems = [
  { id: 1, name: 'Ground Beef', amount: '1 lb', price: 8.99, checked: false, category: 'Meat' },
  { id: 2, name: 'Spaghetti Pasta', amount: '1 box', price: 2.49, checked: true, category: 'Pantry' },
  { id: 3, name: 'Roma Tomatoes', amount: '6 pieces', price: 3.99, checked: false, category: 'Produce' },
  { id: 4, name: 'Parmesan Cheese', amount: '1 block', price: 6.99, checked: false, category: 'Dairy' },
  { id: 5, name: 'Fresh Basil', amount: '1 bunch', price: 2.99, checked: true, category: 'Produce' },
  { id: 6, name: 'Olive Oil', amount: '1 bottle', price: 4.99, checked: false, category: 'Pantry' },
];

const categories = ['All', 'Produce', 'Meat', 'Dairy', 'Pantry'];

export function Cart() {
  const [items, setItems] = useState(cartItems);
  const [activeCategory, setActiveCategory] = useState('All');

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  const totalPrice = items.reduce((sum, item) => sum + (item.checked ? 0 : item.price), 0);
  const completedItems = items.filter(item => item.checked).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-6 pt-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Shopping List</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <ShoppingBag className="w-4 h-4" />
            <span>{completedItems}/{items.length} items</span>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Remaining Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(completedItems / items.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {Math.round((completedItems / items.length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-4 py-6">
        {/* Category Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Shopping List Items */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className={`p-4 transition-all duration-200 ${
              item.checked ? 'opacity-60 bg-gray-50 dark:bg-gray-700' : ''
            }`}>
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={item.checked}
                  onCheckedChange={() => toggleItem(item.id)}
                  className="w-5 h-5"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-medium text-gray-900 dark:text-gray-100 ${
                        item.checked ? 'line-through' : ''
                      }`}>
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.amount} • {item.category}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`font-semibold ${
                        item.checked 
                          ? 'text-gray-400 line-through' 
                          : 'text-gray-900 dark:text-gray-100'
                      }`}>
                        ${item.price.toFixed(2)}
                      </span>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No items in this category</p>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-20 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="flex space-x-3">
          <Button className="flex-1">
            Add Item
          </Button>
          <Button variant="secondary" className="flex-1">
            Share List
          </Button>
        </div>
      </div>
    </div>
  );
}

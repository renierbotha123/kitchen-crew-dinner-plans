
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface CostBreakdownSectionProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function CostBreakdownSection({ 
  subtotal, 
  deliveryFee, 
  total, 
  isExpanded, 
  onToggle 
}: CostBreakdownSectionProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      {/* Expandable Cost Breakdown */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isExpanded ? 'max-h-40' : 'max-h-0'
      }`}>
        <div className="px-4 py-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="font-medium font-[Jost]">R{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
            <span className="font-medium font-[Jost]">R{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900 dark:text-gray-100">Total</span>
              <span className="font-bold text-lg text-gray-900 dark:text-gray-100 font-[Jost]">
                R{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Total and Checkout Section */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
                Total: R{total.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Including delivery</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-primary hover:bg-primary/10 rounded-xl"
          >
            {isExpanded ? (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Hide
              </>
            ) : (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Details
              </>
            )}
          </Button>
        </div>

        {/* Checkout Button */}
        <Button className="w-full rounded-2xl h-12 text-base font-semibold font-[Jost]">
          Proceed to Checkout
        </Button>
        
        {/* Safe area padding for mobile devices */}
        <div className="h-safe-area-inset-bottom" />
      </div>
    </div>
  );
}

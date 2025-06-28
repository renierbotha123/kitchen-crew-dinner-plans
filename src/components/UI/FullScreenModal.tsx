
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface FullScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  stickyFooter?: React.ReactNode;
}

export function FullScreenModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  stickyFooter 
}: FullScreenModalProps) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50">
      {/* Modal Content with rounded top */}
      <div className="fixed inset-x-0 top-0 bottom-0 bg-white dark:bg-gray-900 rounded-t-3xl overflow-hidden mt-8 flex flex-col">
        {/* Drag Indicator */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Header with back button and title */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="p-2"
              onClick={onClose}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
              {title}
            </h1>
          </div>
        </div>

        {/* Scrollable Content - This takes all available space */}
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: stickyFooter ? '120px' : '0' }}>
          {children}
        </div>

        {/* Sticky Footer */}
        {stickyFooter && (
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 pb-6">
            {stickyFooter}
          </div>
        )}
      </div>
    </div>
  );
}

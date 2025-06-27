
import React, { useEffect, useState } from 'react';

interface SlideUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function SlideUpModal({ isOpen, onClose, children, title }: SlideUpModalProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsFullScreen(false); // Reset full screen when modal closes
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`fixed bg-white dark:bg-gray-800 rounded-t-3xl overflow-hidden transform transition-all duration-300 ease-out ${
        isFullScreen 
          ? 'top-0 left-0 right-0 bottom-0 rounded-none translate-y-0' 
          : 'bottom-0 left-0 right-0 max-h-[80vh] translate-y-0'
      } ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        {/* Drag Indicator */}
        <div className="flex justify-center pt-3 pb-2">
          <div 
            className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors" 
            onClick={toggleFullScreen}
          />
        </div>
        
        {/* Header */}
        {title && (
          <div className="px-6 py-2 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
          </div>
        )}
        
        {/* Content */}
        <div className={`px-3 py-4 pb-safe overflow-y-auto ${isFullScreen ? 'h-full' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

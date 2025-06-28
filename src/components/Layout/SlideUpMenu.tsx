
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, HelpCircle, Settings } from 'lucide-react';

interface SlideUpMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  { id: 'notes', icon: FileText, label: 'Notes', path: '/notes' },
  { id: 'help', icon: HelpCircle, label: 'Help', path: '/help' },
  { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
];

export function SlideUpMenu({ isOpen, onClose }: SlideUpMenuProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleItemClick = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Menu Content */}
      <div className={`fixed bg-white dark:bg-gray-800 rounded-t-3xl overflow-hidden transform transition-all duration-300 ease-out bottom-0 left-0 right-0 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Drag Indicator */}
        <div className="flex justify-center pt-4 pb-2">
          <div 
            className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors" 
            onClick={onClose}
          />
        </div>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">Menu</h2>
        </div>
        
        {/* Menu Items Grid */}
        <div className="px-6 py-6 pb-safe">
          <div className="grid grid-cols-4 gap-6">
            {menuItems.map(({ id, icon: Icon, label, path }) => (
              <button
                key={id}
                onClick={() => handleItemClick(path)}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 min-h-[88px]"
              >
                <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 font-[Jost] text-center leading-tight">
                  {label}
                </span>
              </button>
            ))}
          </div>
          
          {/* Additional spacing for safe area */}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}

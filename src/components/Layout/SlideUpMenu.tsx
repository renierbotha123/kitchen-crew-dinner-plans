
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
      
      {/* Extended Nav Tray */}
      <div className={`fixed left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ease-out ${
        isOpen ? 'bottom-0 translate-y-0' : 'bottom-0 translate-y-full'
      }`}>
        {/* Menu Items - same styling as nav tray */}
        <div className="px-4 py-4 pb-safe">
          <div className="flex justify-around items-center max-w-md mx-auto">
            {menuItems.map(({ id, icon: Icon, label, path }) => (
              <button
                key={id}
                onClick={() => handleItemClick(path)}
                className="flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-200 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <Icon className="w-5 h-5 transition-transform duration-200" />
                <span className="text-xs font-medium mt-1 transition-colors duration-200 text-gray-500 dark:text-gray-400">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

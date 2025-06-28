
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, BookOpen, ShoppingCart, User } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/calendar', icon: Calendar, label: 'Calendar' },
  { path: '/recipes', icon: BookOpen, label: 'Recipes' },
  { path: '/cart', icon: ShoppingCart, label: 'Cart' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 z-50 safe-area-inset-bottom">
      <div className="flex justify-around items-center h-14 max-w-md mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-primary scale-105 bg-primary/10'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110' : ''
                  }`}
                />
                <span
                  className={`text-xs font-medium mt-1 transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

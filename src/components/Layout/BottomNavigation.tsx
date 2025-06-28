
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, BookOpen, ShoppingCart, Menu } from 'lucide-react';
import { SlideUpMenu } from './SlideUpMenu';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/calendar', icon: Calendar, label: 'Calendar' },
  { path: '/recipes', icon: BookOpen, label: 'Recipes' },
  { path: '/cart', icon: ShoppingCart, label: 'Cart' },
];

export function BottomNavigation() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  // Check if current route is a menu route (profile, notes, help, settings)
  const isMenuRouteActive = ['/profile', '/notes', '/help', '/settings'].includes(location.pathname);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 z-50 safe-area-inset-bottom">
        <div className="flex justify-around items-center h-14 max-w-md mx-auto">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-200 ${
                  isActive && !isMenuRouteActive
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`
              }
            >
              <Icon className="w-5 h-5 transition-transform duration-200" />
              <span className={`text-xs font-medium mt-1 transition-colors duration-200 ${
                location.pathname === path && !isMenuRouteActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {label}
              </span>
            </NavLink>
          ))}
          
          {/* Menu Tab */}
          <button
            onClick={handleMenuToggle}
            className={`flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-200 ${
              isMenuRouteActive || showMenu
                ? 'text-primary bg-primary/10'
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            <Menu className="w-5 h-5 transition-transform duration-200" />
            <span className={`text-xs font-medium mt-1 transition-colors duration-200 ${
              isMenuRouteActive || showMenu ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
            }`}>
              Menu
            </span>
          </button>
        </div>
      </nav>

      {/* Slide-up Menu */}
      <SlideUpMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />
    </>
  );
}

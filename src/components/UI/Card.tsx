
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 ${
        onClick ? 'cursor-pointer transition-transform duration-200 active:scale-95' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

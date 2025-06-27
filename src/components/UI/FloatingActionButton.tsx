
import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
}

export function FloatingActionButton({ onClick, className = '' }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-24 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-200 active:scale-95 z-40 ${className}`}
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}

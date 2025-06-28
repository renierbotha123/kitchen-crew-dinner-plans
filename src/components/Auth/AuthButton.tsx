
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AuthButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'social';
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function AuthButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  icon, 
  disabled = false 
}: AuthButtonProps) {
  const baseClasses = "w-full h-12 font-[Jost] font-medium text-base rounded-2xl transition-colors";
  
  const variants = {
    primary: "bg-[#019A52] text-white hover:bg-[#017a42] disabled:bg-gray-300",
    secondary: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700",
    social: "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variants[variant])}
    >
      <div className="flex items-center justify-center space-x-3">
        {icon && <span className="w-5 h-5">{icon}</span>}
        <span>{children}</span>
      </div>
    </Button>
  );
}


import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
      <AlertCircle className="w-5 h-5 text-red-500" />
      <p className="text-sm text-red-700 dark:text-red-300 font-[Jost]">{message}</p>
    </div>
  );
}

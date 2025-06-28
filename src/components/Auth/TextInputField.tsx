
import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TextInputFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export function TextInputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false
}: TextInputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-[Jost]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-12 rounded-2xl border-gray-300 dark:border-gray-600 font-[Jost]",
          error && "border-red-500 focus:border-red-500"
        )}
      />
      {error && (
        <p className="text-sm text-red-500 font-[Jost]">{error}</p>
      )}
    </div>
  );
}

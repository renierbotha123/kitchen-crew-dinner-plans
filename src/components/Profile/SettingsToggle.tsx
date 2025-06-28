
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface SettingsToggleProps {
  icon: LucideIcon;
  label: string;
  description?: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
}

export function SettingsToggle({ icon: Icon, label, description, checked, onToggle }: SettingsToggleProps) {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <div>
          <span className="text-gray-900 dark:text-gray-100 font-[Jost]">{label}</span>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost]">{description}</p>
          )}
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onToggle} />
    </div>
  );
}

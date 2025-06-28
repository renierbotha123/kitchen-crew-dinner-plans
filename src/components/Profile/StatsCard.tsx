
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatsCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
}

export function StatsCard({ icon: Icon, value, label }: StatsCardProps) {
  return (
    <Card className="p-6 text-center">
      <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 font-[Jost] mb-1">{value}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost]">{label}</p>
    </Card>
  );
}

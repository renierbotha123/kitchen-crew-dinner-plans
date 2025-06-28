
import React from 'react';
import { User, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HouseholdMemberItemProps {
  member: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  isCurrentUser?: boolean;
}

export function HouseholdMemberItem({ member, isCurrentUser }: HouseholdMemberItemProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
          {member.avatar ? (
            <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
          ) : (
            <span className="text-gray-600 dark:text-gray-400 text-sm font-[Jost] font-medium">
              {getInitials(member.name)}
            </span>
          )}
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100 font-[Jost]">
            {member.name} {isCurrentUser && '(You)'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost]">{member.email}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-[Jost]">{member.role}</span>
        {!isCurrentUser && (
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <MoreVertical className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

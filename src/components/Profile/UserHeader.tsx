
import React from 'react';
import { User, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserHeaderProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onEditProfile: () => void;
}

export function UserHeader({ user, onEditProfile }: UserHeaderProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-6 pt-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <span className="text-white text-xl font-[Jost] font-semibold">
                {getInitials(user.name)}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-[Jost]">{user.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 font-[Jost]">{user.email}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onEditProfile}>
          <Edit className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

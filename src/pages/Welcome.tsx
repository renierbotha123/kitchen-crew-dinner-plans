
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat } from 'lucide-react';
import { AuthButton } from '@/components/Auth/AuthButton';

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header with Logo */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <div className="bg-[#019A52] p-4 rounded-3xl">
              <ChefHat className="w-12 h-12 text-white" />
            </div>
          </div>
          
          {/* App Name */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 font-[Jost]">
              PrepChef
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-[Jost]">
              Meal Planning Made Easy
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-500 dark:text-gray-400 font-[Jost] max-w-sm mx-auto">
            Plan your meals, manage your household, and make cooking effortless with your family.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-8 space-y-4">
        <AuthButton
          variant="primary"
          onClick={() => navigate('/signup')}
        >
          Get Started
        </AuthButton>
        
        <AuthButton
          variant="secondary"
          onClick={() => navigate('/login')}
        >
          I Already Have an Account
        </AuthButton>
      </div>
    </div>
  );
}


import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, User } from 'lucide-react';

interface ProfileImageUploaderProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
}

export function ProfileImageUploader({ currentImage, onImageChange }: ProfileImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server/cloud storage
      // For now, we'll create a local URL
      const imageUrl = URL.createObjectURL(file);
      onImageChange(imageUrl);
    }
  };

  const getInitials = (name: string = 'User') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="relative">
      <div 
        className="w-24 h-24 rounded-full bg-primary flex items-center justify-center cursor-pointer relative overflow-hidden group"
        onClick={handleImageClick}
      >
        {currentImage ? (
          <img 
            src={currentImage} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white text-xl font-[Jost] font-semibold">
            {getInitials()}
          </span>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera className="w-6 h-6 text-white" />
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="mt-2 w-full"
        onClick={handleImageClick}
      >
        <Camera className="w-4 h-4 mr-2" />
        Change Photo
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

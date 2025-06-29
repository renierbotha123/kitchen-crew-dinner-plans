
import React from 'react';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  className?: string;
}

export function QRCodeGenerator({ value, size = 150, className = '' }: QRCodeGeneratorProps) {
  // Using QR Server API for QR code generation (free and reliable)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&format=png&margin=10`;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src={qrCodeUrl}
        alt="QR Code"
        className="rounded-lg border border-gray-200 dark:border-gray-700"
        width={size}
        height={size}
      />
    </div>
  );
}

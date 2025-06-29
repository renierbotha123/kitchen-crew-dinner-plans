
import React, { useRef, useEffect, useState } from 'react';
import { X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (result: string) => void;
}

export function QRScanner({ isOpen, onClose, onScan }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use rear camera on mobile
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleManualInput = () => {
    onClose();
    // This will be handled by the parent component
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black text-white">
        <h2 className="text-lg font-semibold font-[Jost]">Scan QR Code</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-gray-800"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative flex items-center justify-center">
        {error ? (
          <div className="text-center text-white p-6">
            <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg mb-4 font-[Jost]">{error}</p>
            <Button onClick={handleManualInput} variant="outline">
              Enter Code Manually
            </Button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            
            {/* Scanning overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-white rounded-lg relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-[#019A52] rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-[#019A52] rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-[#019A52] rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-[#019A52] rounded-br-lg"></div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Instructions */}
      <div className="p-6 bg-black text-white text-center">
        <p className="text-sm text-gray-300 mb-4 font-[Jost]">
          Position the QR code within the frame to scan
        </p>
        <Button
          onClick={handleManualInput}
          variant="outline"
          className="w-full"
        >
          Enter Invite Code Manually
        </Button>
      </div>
    </div>
  );
}

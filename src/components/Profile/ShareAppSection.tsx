
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ShareAppSection() {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title: 'PrepChef',
      text: 'Check out PrepChef - the best meal planning app for families!',
      url: window.location.origin,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Fallback to copying link
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    toast({
      title: "Link copied!",
      description: "Share PrepChef with your friends and family.",
    });
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">Share PrepChef</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost] mt-1">
            Help others discover meal planning made simple
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyLink}>
            <Copy className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </Card>
  );
}

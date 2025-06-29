
import React, { useState } from 'react';
import { Users, Copy, QrCode, LogOut, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QRCodeGenerator } from '@/components/QR/QRCodeGenerator';
import { useToast } from '@/hooks/use-toast';

interface HouseholdInviteCardProps {
  household: {
    household_id: string;
    household_name: string;
    role: string;
    joined_at: string;
  };
  inviteCode: string;
  onLeaveHousehold: (householdId: string, householdName: string) => void;
}

export function HouseholdInviteCard({ household, inviteCode, onLeaveHousehold }: HouseholdInviteCardProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const { toast } = useToast();

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Invite code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy invite code",
        variant: "destructive",
      });
    }
  };

  // Create the invite URL that matches what JoinHousehold expects
  const inviteUrl = `${window.location.origin}/join-household?code=${inviteCode}`;

  return (
    <Card className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-[#019A52]">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
            Household Settings
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost]">
            {household.household_name}
          </p>
        </div>
      </div>

      {/* Invite Code Section */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 font-[Jost]">
            Invite Code
          </label>
          <div className="mt-2 flex items-center space-x-2">
            <div className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
              <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                {inviteCode || 'Loading...'}
              </code>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyCode}
              className="rounded-2xl"
              disabled={!inviteCode}
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* QR Code Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowQR(!showQR)}
          className="w-full rounded-2xl"
          disabled={!inviteCode}
        >
          <QrCode className="w-4 h-4 mr-2" />
          {showQR ? 'Hide QR Code' : 'Show QR Code'}
        </Button>

        {/* QR Code Display */}
        {showQR && inviteCode && (
          <div className="flex flex-col items-center space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <QRCodeGenerator value={inviteUrl} size={200} />
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center font-[Jost]">
              Others can scan this QR code to join your household
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center font-[Jost] break-all">
              {inviteUrl}
            </p>
          </div>
        )}
      </div>

      {/* Leave Household Button */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          onClick={() => onLeaveHousehold(household.household_id, household.household_name)}
          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Leave Household
        </Button>
      </div>
    </Card>
  );
}


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, QrCode, Users, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QRScanner } from '@/components/QR/QRScanner';
import { ErrorMessage } from '@/components/Auth/ErrorMessage';
import { useToast } from '@/hooks/use-toast';

export function JoinHousehold() {
  const navigate = useNavigate();
  const { joinHouseholdByCode } = useAuth();
  const { toast } = useToast();
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [householdName, setHouseholdName] = useState('');

  const handleJoinByCode = async (code: string) => {
    if (!code || !code.trim()) {
      setError('Please enter an invite code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Attempting to join household with code:', code);
      
      const result = await joinHouseholdByCode(code.trim());
      
      console.log('Join result:', result);
      
      if (result.error) {
        console.error('Join error:', result.error);
        setError(result.error.message || 'Failed to join household');
      } else {
        console.log('Successfully joined household:', result.data);
        setSuccess(true);
        setHouseholdName(result.data?.household_name || 'Unknown Household');
        
        toast({
          title: "Success!",
          description: `Joined ${result.data?.household_name || 'household'} successfully`,
        });
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Unexpected error:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleManualJoin = () => {
    handleJoinByCode(inviteCode);
  };

  const handleQRScan = (result: string) => {
    setShowScanner(false);
    
    console.log('QR scan result:', result);
    
    // Extract invite code from URL or use direct code
    let code = result;
    if (result.includes('/invite/')) {
      // Handle invite URLs like https://domain.com/invite/CODE
      const parts = result.split('/invite/');
      code = parts[parts.length - 1];
    } else if (result.includes('code=')) {
      // Handle URLs with query params like https://domain.com/join?code=CODE
      const urlParams = new URLSearchParams(result.split('?')[1]);
      code = urlParams.get('code') || result;
    }
    
    console.log('Extracted code from QR:', code);
    
    setInviteCode(code);
    handleJoinByCode(code);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-[Jost]">
              Welcome to {householdName}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 font-[Jost]">
              You've successfully joined the household.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 font-[Jost]">
              Redirecting you to your dashboard...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
          Join Household
        </h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="px-6 py-8 space-y-8">
        {/* Explanation */}
        <div className="text-center space-y-4">
          <div className="bg-[#019A52] p-4 rounded-3xl w-16 h-16 mx-auto flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-[Jost]">
              Join a Household
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-[Jost]">
              Enter an invite code or scan a QR code to join an existing household.
            </p>
          </div>
        </div>

        {error && <ErrorMessage message={error} />}

        {/* Join Options */}
        <div className="space-y-6">
          {/* Manual Code Entry */}
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
              Enter Invite Code
            </h3>
            
            <div className="space-y-3">
              <Label htmlFor="inviteCode" className="font-[Jost]">
                Invite Code
              </Label>
              <Input
                id="inviteCode"
                type="text"
                placeholder="Enter your invite code"
                value={inviteCode}
                onChange={(e) => {
                  setInviteCode(e.target.value);
                  if (error) setError(''); // Clear error when user starts typing
                }}
                className="rounded-2xl"
                disabled={loading}
              />
            </div>

            <Button
              onClick={handleManualJoin}
              disabled={loading || !inviteCode.trim()}
              className="w-full rounded-2xl bg-[#019A52] hover:bg-[#017A42]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Joining...
                </>
              ) : (
                'Join Household'
              )}
            </Button>
          </Card>

          {/* QR Code Scanner */}
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
              Scan QR Code
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost]">
              Use your camera to scan a QR code from another household member.
            </p>
            
            <Button
              onClick={() => setShowScanner(true)}
              variant="outline"
              className="w-full rounded-2xl"
              disabled={loading}
            >
              <QrCode className="w-4 h-4 mr-2" />
              Scan QR Code
            </Button>
          </Card>
        </div>

        {/* Back to Setup */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            onClick={() => navigate('/household-setup')}
            className="w-full font-[Jost]"
            disabled={loading}
          >
            Create New Household Instead
          </Button>
        </div>
      </div>

      {/* QR Scanner Modal */}
      <QRScanner
        isOpen={showScanner}
        onClose={() => setShowScanner(false)}
        onScan={handleQRScan}
      />
    </div>
  );
}

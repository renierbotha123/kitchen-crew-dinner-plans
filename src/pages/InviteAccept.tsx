
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Home, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function InviteAccept() {
  const { inviteCode } = useParams<{ inviteCode: string }>();
  const navigate = useNavigate();
  const { user, acceptInvitation } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [householdName, setHouseholdName] = useState('');

  useEffect(() => {
    if (!inviteCode) {
      setStatus('error');
      setMessage('Invalid invitation link');
      return;
    }

    if (!user) {
      // Redirect to login with return URL
      navigate(`/login?redirect=/invite/${inviteCode}`);
      return;
    }

    handleAcceptInvitation();
  }, [inviteCode, user]);

  const handleAcceptInvitation = async () => {
    if (!inviteCode) return;

    try {
      const { error, data } = await acceptInvitation(inviteCode);
      
      if (error) {
        setStatus('error');
        setMessage(error.message || 'Failed to accept invitation');
      } else {
        setStatus('success');
        setHouseholdName(data.household_name);
        setMessage(`Successfully joined ${data.household_name}!`);
        
        // Redirect to household selection after a short delay
        setTimeout(() => {
          navigate('/household-selection');
        }, 2000);
      }
    } catch (error: any) {
      setStatus('error');
      setMessage('An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#019A52] flex items-center justify-center">
          <Home className="w-8 h-8 text-white" />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-[Jost]">
            Household Invitation
          </h1>

          {status === 'loading' && (
            <div className="space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-[#019A52] mx-auto" />
              <p className="text-gray-600 dark:text-gray-400 font-[Jost]">
                Processing your invitation...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
                  Welcome to {householdName}!
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-[Jost]">
                  {message}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 font-[Jost]">
                  Redirecting you to select your household...
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <XCircle className="w-12 h-12 text-red-500 mx-auto" />
              <div className="space-y-2">
                <p className="text-lg font-semibold text-red-600 font-[Jost]">
                  Invitation Error
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-[Jost]">
                  {message}
                </p>
              </div>
              <div className="space-y-2">
                <Button onClick={() => navigate('/')} className="w-full">
                  Go to Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/household-setup')} 
                  className="w-full"
                >
                  Create New Household
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

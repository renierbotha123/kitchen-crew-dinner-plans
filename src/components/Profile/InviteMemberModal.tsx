
import React, { useState } from 'react';
import { FullScreenModal } from '@/components/UI/FullScreenModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, QrCode, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteMemberModal({ isOpen, onClose }: InviteMemberModalProps) {
  const [email, setEmail] = useState('');
  const [inviteMethod, setInviteMethod] = useState<'email' | 'qr'>('email');
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { profile } = useAuth();

  const handleSendInvite = async () => {
    if (!email.trim() || !profile?.current_household_id) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // For now, just show success and generate a demo link
      const demoLink = `${window.location.origin}/invite/demo-code-123`;
      setInviteLink(demoLink);
      
      toast({
        title: "Invitation sent!",
        description: `Invitation sent to ${email}`,
      });
      
      setEmail('');
      setInviteMethod('qr'); // Switch to QR view to show the link
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyInviteLink = async () => {
    const linkToCopy = inviteLink || `${window.location.origin}/invite/demo-code-123`;
    
    try {
      await navigator.clipboard.writeText(linkToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Link copied!",
        description: "Share this link with your family member.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setEmail('');
    setInviteLink('');
    setCopied(false);
    setInviteMethod('email');
    onClose();
  };

  const stickyFooter = (
    <div className="space-y-3">
      {inviteMethod === 'email' ? (
        <Button 
          onClick={handleSendInvite} 
          disabled={!email.trim() || loading} 
          className="w-full"
        >
          {loading ? 'Sending...' : 'Send Invite'}
        </Button>
      ) : (
        <Button onClick={handleCopyInviteLink} className="w-full">
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Invite Link
            </>
          )}
        </Button>
      )}
      <Button variant="outline" onClick={handleClose} className="w-full">
        {inviteLink ? 'Done' : 'Cancel'}
      </Button>
    </div>
  );

  return (
    <FullScreenModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Invite Family Member"
      stickyFooter={stickyFooter}
    >
      <div className="px-4 py-2 space-y-6">
        {/* Invite Method Selector */}
        <div className="flex gap-2">
          <Button
            variant={inviteMethod === 'email' ? 'default' : 'outline'}
            onClick={() => setInviteMethod('email')}
            className="flex-1"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
          <Button
            variant={inviteMethod === 'qr' ? 'default' : 'outline'}
            onClick={() => setInviteMethod('qr')}
            className="flex-1"
          >
            <QrCode className="w-4 h-4 mr-2" />
            Share Link
          </Button>
        </div>

        {inviteMethod === 'email' ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="font-[Jost]">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="member@email.com"
                className="mt-2 font-[Jost]"
                disabled={loading}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost]">
              They'll receive an invitation to join your household.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <div className="w-48 h-48 bg-gray-100 dark:bg-gray-800 rounded-2xl mx-auto flex items-center justify-center">
              <QrCode className="w-24 h-24 text-gray-400" />
            </div>
            {(inviteLink || true) && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 font-[Jost]">
                  Invitation Link:
                </p>
                <Textarea
                  value={inviteLink || `${window.location.origin}/invite/demo-code-123`}
                  readOnly
                  className="text-xs font-mono resize-none"
                  rows={3}
                />
              </div>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost]">
              Share this link with your family member to invite them to your household.
            </p>
          </div>
        )}
      </div>
    </FullScreenModal>
  );
}

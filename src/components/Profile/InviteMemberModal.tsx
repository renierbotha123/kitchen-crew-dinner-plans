
import React, { useState } from 'react';
import { FullScreenModal } from '@/components/UI/FullScreenModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, QrCode, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string) => void;
}

export function InviteMemberModal({ isOpen, onClose, onInvite }: InviteMemberModalProps) {
  const [email, setEmail] = useState('');
  const [inviteMethod, setInviteMethod] = useState<'email' | 'qr'>('email');
  const { toast } = useToast();

  const handleInvite = () => {
    if (inviteMethod === 'email' && email.trim()) {
      onInvite(email);
      setEmail('');
      onClose();
    }
  };

  const handleCopyInviteLink = () => {
    const inviteLink = `${window.location.origin}/invite?code=abc123`;
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Invite link copied!",
      description: "Share this link with your family member.",
    });
  };

  const stickyFooter = (
    <div className="space-y-3">
      {inviteMethod === 'email' ? (
        <Button onClick={handleInvite} disabled={!email.trim()} className="w-full">
          Send Invite
        </Button>
      ) : (
        <Button onClick={handleCopyInviteLink} className="w-full">
          <Copy className="w-4 h-4 mr-2" />
          Copy Invite Link
        </Button>
      )}
      <Button variant="outline" onClick={onClose} className="w-full">
        Cancel
      </Button>
    </div>
  );

  return (
    <FullScreenModal
      isOpen={isOpen}
      onClose={onClose}
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
            QR Code
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
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost]">
              They'll receive an email invitation to join your household.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <div className="w-48 h-48 bg-gray-100 dark:bg-gray-800 rounded-2xl mx-auto flex items-center justify-center">
              <QrCode className="w-24 h-24 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-[Jost]">
              Share this QR code or copy the invite link below.
            </p>
          </div>
        )}
      </div>
    </FullScreenModal>
  );
}

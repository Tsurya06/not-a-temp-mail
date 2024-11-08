import { useState } from 'react';
import { Trash2, QrCode } from 'lucide-react';
import { EmailDisplay } from './EmailDisplay';
import { MessageList } from './MessageList';
import { QRModal } from './QRModal';
import type { Account, Message } from '../types';

interface EmailTabProps {
  account: Account;
  onDelete: () => void;
  onMessageSelect: (message: Message) => void;
}

export function EmailTab({ account, onDelete, onMessageSelect }: EmailTabProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(account.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-b border-gray-700">
      <div className="flex items-center justify-between p-2 bg-gray-800">
        <EmailDisplay
          email={account.address}
          onCopy={copyToClipboard}
          copied={copied}
        />
        <div className="flex gap-2">
          <button
            onClick={() => setShowQR(true)}
            className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-gray-200"
            title="Show QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 hover:bg-gray-700 rounded text-red-400 hover:text-red-300"
            title="Delete Email"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <MessageList
        messages={account.messages}
        loading={false}
        onMessageSelect={onMessageSelect}
      />
      {showQR && (
        <QRModal
          email={account.address}
          onClose={() => setShowQR(false)}
        />
      )}
    </div>
  );
}
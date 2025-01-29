import { useState } from "react";
import { Trash2, QrCode } from "lucide-react";
import { EmailDisplay } from "./EmailDisplay";
import { MessageList } from "./MessageList";
import { QRModal } from "./QRModal";
import type { Account, Message } from "../types/types";
import { ConfirmModal } from "./ConfirmModal";

interface EmailTabProps {
  account: Account;
  onDelete: () => void;
  onMessageSelect: (message: Message) => void;
}

export function EmailTab({
  account,
  onDelete,
  onMessageSelect,
}: EmailTabProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal


  const copyToClipboard = () => {
    navigator.clipboard.writeText(account.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsModalOpen(false);
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
            onClick={handleDeleteClick}
            className="p-1.5 hover:bg-gray-700 rounded text-red-400 hover:text-red-300"
            title="Delete Email"
          >
            <Trash2 className="w-4 h-4 hover:bg-gray-700 rounded"/>
          </button>
        </div>
      </div>
      <MessageList
        messages={account.messages}
        loading={false}
        onMessageSelect={onMessageSelect}
      />
      {showQR && (
        <QRModal  email={account.address} onClose={() => setShowQR(false)} />
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this email?"
      />
    </div>
  );
}

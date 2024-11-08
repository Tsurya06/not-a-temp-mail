import { X } from 'lucide-react';

interface QRModalProps {
  email: string;
  onClose: () => void;
}

export function QRModal({ email, onClose }: QRModalProps) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(email)}`;

  return (
    <div className="fixed inset-0 bg-gray-900/95 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">QR Code</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <img src={qrUrl} alt="QR Code" className="w-[200px] h-[200px]" />
        <p className="mt-4 text-sm text-center text-gray-400 break-all">{email}</p>
      </div>
    </div>
  );
}
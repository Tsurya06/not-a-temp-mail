import { Copy, CheckCircle } from 'lucide-react';

type EmailDisplayProps= {
  email: string;
  onCopy: () => void;
  copied: boolean;
}

export function EmailDisplay({ email, onCopy, copied }: EmailDisplayProps) {
  return (
    <div className="flex items-center justify-between bg-gray-700 p-2 rounded flex-1 mr-2">
      <span className="text-sm font-mono select-all truncate">{email}</span>
      <button
        onClick={onCopy}
        className="p-1 hover:bg-gray-600 rounded transition-colors ml-2 flex-shrink-0 text-gray-400"
        title={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? (
          <CheckCircle className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
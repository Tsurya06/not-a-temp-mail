import { X, Download, Loader2 } from "lucide-react";

interface DownloadModalProps {
  onClose: () => void;
  onDownload: () => void;
  downloading: boolean;
}

export function DownloadModal({ onClose, onDownload, downloading }: DownloadModalProps) {
  const instructions = [
    "1. Download and extract the extension.zip file",
    "2. Open your browser's extension page:",
    "   • Chrome: chrome://extensions",
    "   • Edge: edge://extensions",
    "   • Brave: brave://extensions",
    "   • Opera: opera://extensions",
    "3. Enable 'Developer mode' (usually a toggle in the top-right)",
    "4. Click 'Load unpacked' and select the 'dist' folder from extracted files"
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/95 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Install Extension</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        <div className="p-4">
          <button
            onClick={onDownload}
            disabled={downloading}
            className="w-full px-4 py-3 mb-6 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 rounded-md flex items-center justify-center space-x-2 text-sm font-medium transition-colors"
          >
            {downloading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download Extension</span>
              </>
            )}
          </button>

          <div className="bg-gray-700/50 rounded-md p-4">
            <h3 className="text-sm font-medium text-gray-200 mb-3">Installation Steps:</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              {instructions.map((instruction, index) => (
                <li key={index} className="pl-2">
                  {instruction}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 
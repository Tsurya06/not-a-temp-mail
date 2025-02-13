import { Mail, RefreshCw, Download } from "lucide-react";
import { useState } from "react";
import { DownloadModal } from "./DownloadModal";

interface HeaderProps {
  onGenerateEmail: () => void;
  loading: boolean;
}

export function Header({ onGenerateEmail, loading }: HeaderProps) {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const isGitHubPages = window.location.hostname.includes('github.io') || window.location.hostname.includes('localhost');
  
  const handleDownload = async () => {
    try {
      setDownloading(true);
      const downloadUrl = `${window.location.origin}/extension.zip`;
      
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'extension.zip';
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        setDownloading(false);
      }, 1000); // Give enough time for download to start
      
    } catch (error) {
      console.error('Download failed:', error);
      setDownloading(false);
      // You might want to show an error toast here
    }
  };

  return (
    <header className="p-4 bg-gray-800 border-b border-gray-700">
      {isGitHubPages && (
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowDownloadModal(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md flex items-center gap-2 text-sm font-medium shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Install Extension</span>
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3 ml-2">
          <Mail className="w-6 h-6 text-blue-400" />
          <h1 className="text-xl font-bold">Not a Temp Mail</h1>
        </div>
        
        <div className="flex items-center mr-2">
          <button
            onClick={onGenerateEmail}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 rounded-md flex items-center gap-2 text-sm font-medium shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>New Email</span>
          </button>
        </div>
      </div>

      {showDownloadModal && (
        <DownloadModal
          onClose={() => setShowDownloadModal(false)}
          onDownload={handleDownload}
          downloading={downloading}
        />
      )}
    </header>
  );
}

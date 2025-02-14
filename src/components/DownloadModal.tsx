import { X, Download, Loader2, Globe, Terminal } from "lucide-react";

interface DownloadModalProps {
  onClose: () => void;
  onDownload: () => void;
  downloading: boolean;
}

export function DownloadModal({ onClose, onDownload, downloading }: DownloadModalProps) {
  const instructions = [
    {
      title: "Download & Extract",
      steps: [
        "Click the download button above",
        "Extract the downloaded extension.zip file"
      ],
      icon: Download
    },
    {
      title: "Open Extensions Page",
      steps: [
        "Open your browser's extension page:",
        "• Chrome | Edge | Brave | Opera: chrome://extensions",
        "• Firefox: about:addons",
        "• Safari: Safari menu > Extensions"
      ],
      icon: Globe
    },
    {
      title: "Enable Developer Mode",
      steps: [
        "Look for 'Developer mode' toggle (usually top-right)",
        "Enable it to allow loading unpacked extensions"
      ],
      icon: Terminal
    },
    {
      title: "Load Extension",
      steps: [
        "Click 'Load unpacked' button",
        "Select the extracted extension folder",
        "The extension should appear in your toolbar"
      ],
      icon: Globe
    }
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/95 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg w-[360px] max-w-full">
        <div className="flex justify-between items-center p-3 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white ml-2 tracking-wide">Install Extension</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-700 rounded-full transition-colors mr-1"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        <div className="p-4 px-5">
          <button
            onClick={onDownload}
            disabled={downloading}
            className="w-full px-4 py-3 mb-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 
                     rounded-lg flex items-center justify-center space-x-2 text-sm font-medium
                     transition-colors shadow-lg disabled:cursor-not-allowed"
          >
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Extension</span>
              </>
            )}
          </button>

          <div className="space-y-4">
            <h3 className="text-base font-medium text-gray-200 mb-4 mt-2 ml-1">Installation Steps:</h3>
            <div className="grid gap-3">
              {instructions.map((section, index) => (
                <div key={index} className="bg-gray-700/30 rounded-lg p-3 mx-1">
                  <div className="flex items-center gap-2 mb-2">
                    <section.icon className="w-4 h-4 text-blue-400" />
                    <h4 className="text-sm font-medium text-gray-200">{section.title}</h4>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-300 ml-6">
                    {section.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="list-disc list-outside">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
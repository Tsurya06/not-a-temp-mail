import { X, ExternalLink } from "lucide-react";
import { Message } from "../types";

interface MessageViewProps {
  message: Message;
  onClose: () => void;
}

export function MessageView({ message, onClose }: MessageViewProps) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-700 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold mb-2">{message.subject}</h2>
            <p className="text-sm text-gray-400">
              From: {message.from.address}
            </p>
            <p className="text-sm text-gray-400">
              {new Date(message.createdAt).toLocaleString()}
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: message.html || message.text }}
          />
        </div>

        {message.html?.includes('href="') && (
          <div className="p-4 border-t border-gray-700 bg-gray-850">
            <p className="text-sm text-gray-400 mb-2">Verification Links:</p>
            {Array.from(message.html.matchAll(/href="([^"]*verify[^"]*)/g)).map(
              (match, i) => (
                <a
                  key={i}
                  href={match[1]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 mb-1 flex items-center"
                >
                  <span className="truncate">{match[1]}</span>
                  <ExternalLink className="w-4 h-4 ml-2 flex-shrink-0" />
                </a>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

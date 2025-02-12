import { X, ExternalLink, Trash2, Loader2 } from "lucide-react";
import { Message } from "../types/email";
import { emailService } from "../services/emailService";
import { useAppDispatch } from "../store/store";
import { deleteMessage } from "../store/slices/emailSlice";
import { toast } from "react-toastify";
import { useState } from "react";

type MessageViewProps= {
  message: Message;
  onClose: () => void;
  emailId: string;
  token: string;
}

export function MessageView({ message, onClose, emailId, token }: MessageViewProps) {
  const dispatch = useAppDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await emailService.deleteMessage(message.id, token);
      dispatch(deleteMessage({ emailId, messageId: message.id }));
      toast.success("Message deleted successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to delete message");
      console.error("Error deleting message:", error);
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative">
        {/* Fixed Header */}
        <div className="sticky top-0 p-4 border-b border-gray-700 flex justify-between items-start bg-gray-800 z-10">
          <div>
            <h2 className="text-xl font-bold mb-2">{message.subject}</h2>
            <p className="text-sm text-gray-400">
              From: {message.from.address}
            </p>
            <p className="text-sm text-gray-400">
              {new Date(message.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-1 hover:bg-gray-700 rounded flex items-center gap-1 text-red-400 hover:text-red-300"
              title="Delete message"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          <div className="p-4">
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: message.html || message.text }}
            />
            <p className="text-sm text-gray-300 mt-2">{message.intro}</p>
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

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Delete Message</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this message? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 hover:bg-gray-700 rounded flex items-center gap-1 text-red-400 hover:text-red-300"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { AlertTriangle } from "lucide-react";
import type { ConfirmModalProps } from "../store/types";

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this email?",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/95 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-yellow-500" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

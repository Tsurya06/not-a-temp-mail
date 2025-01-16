import { Inbox } from "lucide-react";
import { Message } from "../types";

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  onMessageSelect: (message: Message) => void;
}

export function MessageList({
  messages,
  loading,
  onMessageSelect,
}: MessageListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (messages?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <Inbox className="w-12 h-12 mb-2" />
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <h2>Your inbox is empty</h2>
        <p>Waiting for incoming emails</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-700">
      {messages?.map((message) => (
        <div
          key={message.id}
          className="p-4 hover:bg-gray-800 cursor-pointer transition-colors"
          onClick={() => onMessageSelect(message)}
        >
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium">{message.subject}</h3>
            <span className="text-xs text-gray-400">
              {new Date(message.createdAt).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-sm text-gray-400">{message.from.address}</p>
          <p className="text-sm text-gray-300 mt-1 line-clamp-2">
            {message.intro}
          </p>
        </div>
      ))}
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );
}

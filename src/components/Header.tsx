import { Mail, RefreshCw } from "lucide-react";

interface HeaderProps {
  onGenerateEmail: () => void;
  loading: boolean;
}

export function Header({ onGenerateEmail, loading }: HeaderProps) {
  return (
    <header className="p-4 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mail className="w-6 h-6 text-blue-400" />
          <h1 className="text-xl font-bold">Not a Temp Mail</h1>
        </div>
        <button
          onClick={onGenerateEmail}
          disabled={loading}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 rounded-md flex items-center space-x-1 text-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>New Email</span>
        </button>
      </div>
    </header>
  );
}

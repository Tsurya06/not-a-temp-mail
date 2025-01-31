import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { EmailTab } from "./components/EmailTab";
import { Header } from "./components/Header";
import { MessageView } from "./components/MessageView";
import { toast, ToastContainer } from "react-toastify";
import { useEmail } from "./hooks/useEmail";
import { Message } from "./types/email";

export default function App() {
  const { emails, loading, fetchEmails, createEmail, removeEmail } = useEmail();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const emailIds = useMemo(() => emails.map(email => email.id).join(','), [emails]);

  useEffect(() => {
    if (!Array.isArray(emails) || emails.length === 0) return;

    const fetchAllEmails = () => {
      emails.forEach((email) => {
        if (email.token) {
          fetchEmails(email.id, email.token);
        }
      });
    };

    fetchAllEmails();
    const interval = setInterval(fetchAllEmails, 7000);

    return () => clearInterval(interval);
  }, [fetchEmails, emailIds]);

  const generateEmail = async () => {
    try {
      await createEmail();
      toast.success("New email account created successfully!");
    } catch (error) {
      toast.error("Failed to generate email. Please check your network connection and try again.");
    }
  };
  

  const handleMessageSelect = async (message: Message) => {
    setSelectedMessage(message);
  };

  const deleteAccount = async (addressId: string) => {
    try {
      await removeEmail(addressId, emails.find(email => email.id === addressId)?.token as string);
      toast.success("Email account deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete email account.");
    }
  };

  return (
    <><ToastContainer />
    <div className="w-[400px] h-[500px] bg-gray-900 text-gray-100 flex flex-col border-2 border-gray-800 rounded-m">
      <Header onGenerateEmail={() => generateEmail()} loading={loading} />

      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm text-gray-400">
          Active Emails: {emails.length}
        </span>
        <button
          onClick={generateEmail}
          disabled={loading}
          className="p-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 rounded-md"
          title="Add New Email"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {emails.map((email) => (
          <EmailTab
            key={email.id}
            email={email}
            onDelete={() => deleteAccount(email.id)}
            onMessageSelect={handleMessageSelect}
          />
        ))}
      </div>

      {selectedMessage && (
        <MessageView
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
    </>
  );
}

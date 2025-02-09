import { useEffect, useMemo, useState } from "react";
import {  Trash2 } from "lucide-react";
import { EmailTab } from "./components/EmailTab";
import { Header } from "./components/Header";
import { MessageView } from "./components/MessageView";
import { toast, ToastContainer } from "react-toastify";
import { useEmail } from "./hooks/useEmail";
import { Message } from "./types/email";
import { clearCurrentEmail, deleteEmail } from "./store/slices/emailSlice";
import { useAppDispatch } from "./store/store";

export default function App() {
  const { emails, loading, fetchEmails, createEmail, removeEmail, getMessage, currentEmail, selectEmail } = useEmail();
  const dispatch = useAppDispatch();
  const [selectedMessage, setSelectedMessage] = useState<{ message: Message; emailId: string; token: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const emailIds = useMemo(() => emails.map(email => email.id).join(','), [emails]);

  const generateEmail = async () => {
    try {
      await createEmail();
      toast.success("New email account created successfully!");
    } catch (error) {
      toast.error("Failed to generate email. Please check your network connection and try again.");
    }
  };

  const handleMessageSelect = async (message: Message, token?: string, emailId?: string) => {
    if (message.id && token && emailId) {
      const fullMessage = await getMessage(message.id, token);
      setSelectedMessage({
        message: fullMessage,
        emailId,
        token
      });
    }
  };

  const deleteAccount = async (addressId: string) => {
    try {
      await removeEmail(addressId, emails.find(email => email.id === addressId)?.token as string);
      toast.success("Email account deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete email account.");
    }
  };
  const forceDelete = async () => {
    setIsDeleting(true);
    try {
      // Clear current email selection if any
      dispatch(clearCurrentEmail());
      
      // Clear all emails from Redux store
      emails.forEach(email => {
        dispatch(deleteEmail(email.id));
      });

      toast.success(`Successfully cleared all ${emails.length} email accounts!`);
    } catch (error) {
      console.error('Error in force delete:', error);
      toast.error("An unexpected error occurred while clearing emails.");
    } finally {
      setIsDeleting(false);
    }
  };

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

  return (
    <>
      <ToastContainer />
      <div className="w-[400px] h-[500px] bg-gray-900 text-gray-100 flex flex-col border-2 border-gray-800 rounded-m">
        <Header onGenerateEmail={() => generateEmail()} loading={loading} />

        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-sm text-gray-400">
            Active Emails: {emails.length}
          </span>
          <button
            onClick={forceDelete}
            disabled={isDeleting || emails.length === 0}
            className="p-1.5 hover:bg-gray-700 rounded text-red-400 hover:text-red-300 cursor-pointer"
          >
            {isDeleting ? (
              'Deleting...'
            ) : (
              <div className="flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-white" />Delete All
              </div>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {emails.map((email) => (
            <EmailTab
              key={email.id}
              email={email}
              onDelete={() => deleteAccount(email.id)}
              onMessageSelect={(message) => handleMessageSelect(message, email?.token, email.id)}
              isSelected={currentEmail?.id === email.id}
              onSelect={selectEmail}
            />
          ))}
        </div>

        {selectedMessage && (
          <MessageView
            message={selectedMessage.message}
            emailId={selectedMessage.emailId}
            token={selectedMessage.token}
            onClose={() => setSelectedMessage(null)}
          />
        )}
      </div>
    </>
  );
}

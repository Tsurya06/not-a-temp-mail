import { useEffect, useMemo, useState } from "react";
import {  Trash2 } from "lucide-react";
import { EmailTab } from "./components/EmailTab";
import { Header } from "./components/Header";
import { MessageView } from "./components/MessageView";
import { toast, ToastContainer } from "react-toastify";
import { useEmail } from "./hooks/useEmail";
import { Message } from "./types/email";
import { deleteEmail } from "./store/slices/emailSlice";
import { useAppDispatch } from "./store/store";

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;

export default function App() {
  const { emails, loading, fetchEmails, createEmail, removeEmail, getMessage } = useEmail();
  const dispatch = useAppDispatch();
  const [selectedMessage, setSelectedMessage] = useState<{ message: Message; emailId: string; token: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
      const emailPromises = emails.map(async (email) => {
        try {
          await removeEmail(email.id, email.token as string);
          dispatch(deleteEmail(email.id));
          return true;
        } catch (error) {
          console.error('Error deleting email:', error);
          return false;
        }
      });

      // Wait for all deletion operations to complete
      const results = await Promise.all(emailPromises);

      // Count successful deletions
      const successCount = results.filter(result => result).length;

      // Clear local storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));

      // Update state


      // Show appropriate message
      if (successCount === emails.length) {
        toast.success(`Successfully deleted all ${successCount} email accounts!`);
      } else {
        toast.warning(`Deleted ${successCount} out of ${emails.length} email accounts.`);
      }

    } catch (error) {
      console.error('Error in force delete:', error);
      toast.error("Failed to clear storage and delete emails.");
    } finally {
      setIsDeleting(false);
    }
  };


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

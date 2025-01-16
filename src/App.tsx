import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { getMessages, createAccount, getMessage } from "./api/api";
import { EmailTab } from "./components/EmailTab";
import { Header } from "./components/Header";
import { MessageView } from "./components/MessageView";
import { Account, Message } from "./types";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    const loadAccounts = async () => {
      const savedAccounts = localStorage.getItem("mailAccounts");
      if (savedAccounts) {
        try {
          const accounts: Account[] = JSON.parse(savedAccounts);
          setAccounts(accounts);
        } catch (error) {
          throw error;
        }
      }
    };
    loadAccounts();
  }, []);

  useEffect(() => {
    // Function to fetch new messages for a given account
    const fetchNewMessagesForAccount = async (account: Account) => {
      const now = Date.now();

      // Check if the account needs to be checked for new messages
      if (!account.lastChecked || now - account.lastChecked >= 5000) {
        try {
          const newMessages = await getMessages(account.token);
          return {
            ...account,
            messages: newMessages,
            lastChecked: now,
          };
        } catch (error) {
          throw error;
        }
      }

      // Return the account unchanged if no new messages were fetched
      return account;
    };

    // Main function to check messages for all accounts
    const checkMessages = async () => {
      const updatedAccounts = await Promise.all(
        accounts.map(fetchNewMessagesForAccount)
      );

      // Update state and local storage with the new accounts data
      setAccounts(updatedAccounts);
      localStorage.setItem("mailAccounts", JSON.stringify(updatedAccounts));
    };

    // Set an interval to check messages every 2 second
    const interval = setInterval(checkMessages, 7000);

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(interval);
  }, [accounts]);

  const generateEmail = async () => {
    setLoading(true);
    try {
      const newAccount: { id: string; address: string; token: string } = await createAccount();

      const accountWithMessages: Account = {...newAccount,messages: [],lastChecked: Date.now()};

      setAccounts((prevAccounts) => {
        const updatedAccounts = [...prevAccounts, accountWithMessages];
        localStorage.setItem("mailAccounts", JSON.stringify(updatedAccounts));
        return updatedAccounts;
      });

    } catch (error) {
      const handleError = () => {
        toast.error("Failed to generate email. Please check your network connection and try again.");
      };
      handleError();
    } finally {
      setLoading(false);
    }
  };

  const handleMessageSelect = async (message: Message) => {
    const account = accounts.find((a) =>
      a.messages.some((m) => m.id === message.id)
    );
    if (account) {
      const fullMessage = await getMessage(message.id, account.token);
      setSelectedMessage(fullMessage);
    }
  };


const deleteAccount = async (addressId: string) => {
  try {
    // Make the DELETE request
    const response = await axios.delete(`https://api.mail.tm/accounts/${addressId}`, {
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${accounts.find((a) => a.id === addressId)?.token}`
      }
    });

    // Check if the deletion was successful
    if (response.status === 204) {
      // Update the local state and localStorage
      const updatedAccounts = accounts.filter((a) => a.id !== addressId);
      setAccounts(updatedAccounts);
      localStorage.setItem("mailAccounts", JSON.stringify(updatedAccounts));
    } else {
      console.error('Failed to delete account:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error deleting account:', error);
  }
};

  return (
    <><ToastContainer />
    <div className="w-[400px] h-[500px] bg-gray-900 text-gray-100 flex flex-col border-2 border-gray-800 rounded-m">
      <Header onGenerateEmail={() => generateEmail()} loading={loading} />

      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm text-gray-400">
          Active Emails: {accounts.length}
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
        {accounts.map((account) => (
          <EmailTab
            key={account.address}
            account={account} 
            onDelete={() => deleteAccount(account?.id || '')}
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

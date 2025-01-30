export type Message = {
  id: string;
  subject: string;
  from: {
    address: string;
    name?: string;
  };
  to: {
    address: string;
    name?: string;
  };
  intro: string;
  text: string;
  html?: string;
  createdAt: string;
  hasAttachments: boolean;
  address: string;
  token: string;
}

export type Account = {
  id?: string;
  address: string;
  token: string;
  lastChecked?: number;
  messages: Message[];
}

export type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  createdAt: string;
  address: string;
  token: string;
  messages?: Message[];
}

export interface EmailState {
  emails: Email[];
  loading: boolean;
  error: string | null;
  currentEmail: Email | null;
}

export interface RootState {
  email: EmailState;
  // Add other state slices here
}
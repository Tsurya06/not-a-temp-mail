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
}

export type Account = {
  id: string;
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
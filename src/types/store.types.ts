import { Account, Message } from "./types";

export interface AccountState {
  accounts: Account[];
  loading: boolean;
  error: string | null;
  currentAccount: Account | null;
}

export interface MessageState {
  messages: Message[];
  loading: boolean;
  error: string | null;
  selectedMessage: Message | null;
}

// Helper type to get correct typing from useSelector
export type RootState = {
  accounts: AccountState;
  messages: MessageState;
}
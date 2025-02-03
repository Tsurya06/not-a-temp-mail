import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Email, Message } from '../../types/email';
import { loadState } from '../../utils/localStorage';

interface EmailState {
  emails: Email[];
  loading: boolean;
  error: string | null;
  currentEmail: Email | null;
}

const savedState = loadState();

const initialState: EmailState = {
  emails: savedState?.emails || [],
  loading: false,
  error: null,
  currentEmail: null,
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmails: (state, action: PayloadAction<{ emailId: string; messages: Message[] }>) => {
      const { emailId, messages } = action.payload;
      const emailIndex = state.emails.findIndex(email => email.id === emailId);

      if (emailIndex !== -1) {
        state.emails[emailIndex] = {
          ...state.emails[emailIndex],
          messages: messages
        };
      }

      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setCurrentEmail: (state, action: PayloadAction<Email>) => {
      state.currentEmail = action.payload;
    },
    clearCurrentEmail: (state) => {
      state.currentEmail = null;
    },
    addEmail: (state, action: PayloadAction<Email>) => {
        console.log("action.payload",action.payload);
      state.emails.unshift(action.payload);
    },
    deleteEmail: (state, action: PayloadAction<string>) => {
      state.emails = state.emails.filter(email => email.id !== action.payload);
    },
    deleteMessage: (state, action: PayloadAction<{ emailId: string; messageId: string }>) => {
      const { emailId, messageId } = action.payload;
      const emailIndex = state.emails.findIndex(email => email.id === emailId);

      if (emailIndex !== -1 && state.emails[emailIndex].messages) {
        state.emails[emailIndex].messages = state.emails[emailIndex].messages?.filter(
          message => message.id !== messageId
        );
      }
    },
  },
});

export const {
  setEmails,
  setLoading,
  setError,
  setCurrentEmail,
  clearCurrentEmail,
  addEmail,
  deleteEmail,
  deleteMessage,
} = emailSlice.actions;

export default emailSlice;

import { Email } from '../types/email';

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;

export interface LocalStorageState {
  emails: Email[];
}

const isValidState = (state: any): state is LocalStorageState => {
  return (
    state &&
    Array.isArray(state.emails) &&
    state.emails.every((email: any) =>
      typeof email === 'object' &&
      typeof email.id === 'string'
    )
  );
};

export const loadState = (): LocalStorageState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) {
      return undefined;
    }

    const parsedState = JSON.parse(serializedState);

    // Validate state structure
    if (!isValidState(parsedState)) {
      console.warn('Invalid state structure in localStorage, resetting...');
      localStorage.removeItem(STORAGE_KEY);
      return undefined;
    }

    return parsedState;
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    localStorage.removeItem(STORAGE_KEY);
    return undefined;
  }
};

// Debounce helper
const debounce = (func: Function, wait: number) => {
  let timeout: any
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const saveState = debounce((state: LocalStorageState) => {
  const attemptSave = () => {
    const stateToSave = { ...state };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem(STORAGE_KEY, serializedState);
  };

  try {
    attemptSave();
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
    // Clear localStorage and retry once
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.info('Cleared localStorage due to save error, retrying...');
      attemptSave(); // Retry saving after clearing
    } catch (retryErr) {
      console.error('Failed to save state even after clearing localStorage:', retryErr);
    }
  }
}, 1000); // Debounce saves to once per second
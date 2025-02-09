import { Email } from '../types/email';

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;
const STORAGE_VERSION = '1'; // Add version for future migrations

export interface LocalStorageState {
  emails: Email[];
  version?: string;
}

const isValidState = (state: any): state is LocalStorageState => {
  return (
    state &&
    Array.isArray(state.emails) &&
    state.emails.every((email: any) =>
      typeof email === 'object' &&
      typeof email.id === 'string' &&
      Array.isArray(email.messages)
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

    // Handle version migrations here if needed
    if (parsedState.version !== STORAGE_VERSION) {
      // Implement migration logic if needed
      parsedState.version = STORAGE_VERSION;
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
  try {
    const stateToSave = {
      ...state,
      version: STORAGE_VERSION
    };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
    // Optionally, we could try to clear localStorage and retry
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.info('Cleared localStorage due to save error');
    } catch (clearErr) {
      console.error('Failed to clear localStorage:', clearErr);
    }
  }
}, 1000); // Debounce saves to once per second
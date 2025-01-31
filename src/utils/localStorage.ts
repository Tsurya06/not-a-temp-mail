import { Email } from '../types/email';

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;
export interface LocalStorageState {
  emails: Email[];
}

export const loadState = (): LocalStorageState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: LocalStorageState) => {
  try {
    const serializedState = JSON.stringify(state);
    console.log('Saving state to localStorage', serializedState,STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    // Ignore write errors
    console.error('Failed to save state to localStorage:', err);
  }
};
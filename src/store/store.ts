import { configureStore, Middleware } from '@reduxjs/toolkit';
import {useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import emailReducer from './slices/emailSlice';
import { saveState } from '../utils/localStorage';

const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);
  const state = store.getState();

  if (state.email.emails !== state.email.previousEmails) {
    saveState({
      emails: state.email.emails
    });
  }

  return result;
};

export const store = configureStore({
  reducer: {
    email: emailReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(localStorageMiddleware),
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;


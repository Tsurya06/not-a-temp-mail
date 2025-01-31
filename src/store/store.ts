import { configureStore } from '@reduxjs/toolkit';
import {useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import emailReducer from './slices/emailSlice';

export const store = configureStore({
  reducer: {
    email: emailReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
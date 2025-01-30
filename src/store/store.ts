import { configureStore } from '@reduxjs/toolkit';
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

export type AppDispatch = typeof store.dispatch;

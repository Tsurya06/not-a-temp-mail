import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailService } from '../services/email.service';

import type { RootState, Email } from '../store/types';
import { addEmail, deleteEmail, setEmails, setError, setLoading } from '../store/slices/emailSlice';

export const useEmail = () => {
  const dispatch = useDispatch();
const emails = useSelector((state: RootState) => state.email.emails);
  const loading = useSelector((state: RootState) => state.email.loading);
  const error = useSelector((state: RootState) => state.email.error);
  const currentEmail = useSelector((state: RootState) => state.email.currentEmail);

  const fetchEmails = useCallback(async (emailId: string, token: string) => {
    if (!token) return;

    try {
      const response :any = await emailService.getEmails(token);
      // Update the messages for the specific email account without setting loading state
      dispatch(setEmails({ emailId, messages: response.data['hydra:member'] }));
    } catch (error) {
      console.error('Error fetching emails:', error);
      // Only dispatch error for network or serious issues
      if (error instanceof Error && !error.message.includes('404')) {
        dispatch(setError(error.message));
      }
    }
  }, [dispatch]);

  const createEmail = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      // Get available domains
      const domainsResponse = await emailService.getDomains();
      const activeDomains = domainsResponse.data['hydra:member']
        .filter(domain => domain.isActive)
        .map(domain => domain.domain);

      if (!activeDomains.length) {
        throw new Error('No active domains available');
      }

      // Generate random username and password
      const username = Math.random().toString(36).substring(2, 8);
      const password = Math.random().toString(36).substring(2, 15);
      const selectedDomain = activeDomains[Math.floor(Math.random() * activeDomains.length)];

      // Create email with generated address and password
      const address = `${username}@${selectedDomain}`;
      const response = await emailService.createEmail(address, password);

      // Ensure we have all required fields before dispatching
      const emailData: Email = {
        id: response.id,
        address: address,
        token: response.token,
        from: '',
        to: '',
        subject: '',
        body: '',
        createdAt: new Date().toISOString()
      };

      dispatch(addEmail(emailData));
      return emailData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create email';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const removeEmail = useCallback(async (id: string, token: string) => {
    try {
      if (!token) {
        throw new Error('Authorization token is required');
      }
      await emailService.deleteEmail(id, token);
      dispatch(deleteEmail(id));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete email';
      dispatch(setError(errorMessage));
      throw error;
    }
  }, [dispatch]);

  const getMessage = useCallback(async (messageId: string, token: string) => {
    try {
      if (!token) {
        throw new Error('Authorization token is required');
      }
      const response = await emailService.getEmail(messageId, token);
      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch message';
      dispatch(setError(errorMessage));
      throw error;
    }
  }, [dispatch]);

  return {
    emails,
    loading,
    error,
    currentEmail,
    fetchEmails,
    createEmail,
    removeEmail,
    getMessage,
  };
};

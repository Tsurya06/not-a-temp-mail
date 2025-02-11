import { api } from '../api-config/axios.config';
import { DomainResponse, Email, Message, MessageResponse } from '../types/email';

export const emailService = {
  getEmails: (token: string) => api.get<MessageResponse[]>('/messages',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  getDomains: () => api.get<DomainResponse>('/domains'),
  createEmail: async (address: string, password: string) => {
    try {
      // Create the account first
      const response = await api.post<Email>('/accounts', { address, password });

      // Get the authentication token
      const tokenResponse = await api.post('/token', {
        address,
        password
      });

      if (!tokenResponse.data.token) {
        throw new Error('Failed to get authentication token');
      }

      // Return combined data with proper typing
      return {
        id: response.data.id,
        address: response.data.address,
        token: tokenResponse.data.token,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating email:', error);
      throw error;
    }
  },
  deleteEmail: (id: string, token: string) => api.delete(`/accounts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  getEmail: (id: string, token: string) => api.get<Message>(`/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  deleteMessage: (id: string, token: string) => api.delete(`/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
};

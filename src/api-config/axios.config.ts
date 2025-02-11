import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      toast.error('Unauthorized');
    }
    return Promise.reject(error);
  }
);

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;


function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function createAccount(): Promise<{id: string; address: string; token: string }> {
  try {
    const username = Math.random().toString(36).substring(2, 6);
    const password = Math.random().toString(36).substring(2, 15);
    const domains = await getActiveDomains();
    const index = getRandomNumber(0, domains.length);

    const response = await axios.post(`${API_URL}/accounts`, {
      address: `${username}@${domains[index]}`,
      password: password,
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const account = response.data;
    const token = await getToken(account.address, password);

    return {
      id: account.id,
      address: account.address,
      token: token,
    };
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
}

async function getActiveDomains(): Promise<string[]> {
  try {
    const response = await axios.get(`${API_URL}/domains`);
    const data = response.data;
    const domains = Object.values(data['hydra:member']).map((domain: any) => domain.domain);
    if (domains.includes('undefined') || domains.length === 0) {
      throw new Error('Invalid domain response');
    }
    return domains;
  } catch (error) {
    console.error('Error fetching active domains:', error);
    throw error;
  }
}

async function getToken(address: string, password: string): Promise<string> {
  try {
    const response = await axios.post(`${API_URL}/token`, {
      address,
      password,
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const data = response.data;
    return data.token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
}

export async function getMessages(token: string): Promise<any[]> {
  try {
    const response = await axios.get(`${API_URL}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;
    return data['hydra:member'];
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}

export async function getMessage(id: string, token: string): Promise<any> {
  try {
    const response = await axios.get(`${API_URL}/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
}
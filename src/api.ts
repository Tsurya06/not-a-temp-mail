const API_URL = 'https://api.mail.gw';

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export async function createAccount(): Promise<{ address: string; token: string }> {
  const username = Math.random().toString(36).substring(2, 6);
  const password = Math.random().toString(36).substring(2, 15);
  const domains = await getActiveDomains();
  const index = getRandomNumber(0,domains.length);

  const response = await fetch(`${API_URL}/accounts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      address: `${username}@${domains[index]}`,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create account');
  }

  const account = await response.json();
  const token = await getToken(account.address, password);

  return {
    address: account.address,
    token: token,
  };
}

async function getActiveDomains(): Promise<string[]> {
  const response = await fetch(`${API_URL}/domains`);
  const data = await response.json();
  const domains = Object.values(data['hydra:member']).map((domain: any) => domain.domain);
  if(domains.includes('undefined')) {
    getActiveDomains();
  }
  return domains;
}

async function getToken(address: string, password: string): Promise<string> {
  const response = await fetch(`${API_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to get token');
  }

  const data = await response.json();
  return data.token;
}

export async function getMessages(token: string): Promise<any[]> {
  const response = await fetch(`${API_URL}/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }

  const data = await response.json();
  return data['hydra:member'];
}

export async function getMessage(id: string, token: string): Promise<any> {
  const response = await fetch(`${API_URL}/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch message');
  }

  return response.json();
}
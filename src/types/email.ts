
// Common types for API responses
interface HydraResponse<T> {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:member': T[];
  'hydra:totalItems': number;
}

// Address type used in messages
interface AddressInfo {
  address: string;
  name?: string;
}

// Message related types
export type Message = {
  id: string;
  subject: string;
  from: AddressInfo;
  to: AddressInfo;
  intro: string;
  text: string;
  html?: string;
  createdAt: string;
  hasAttachments: boolean;
  address: string;
  token: string;
}

// Email account type
export interface Email {
  id: string;
  address: string;
  token: string;
  createdAt: string;
  from?: string;
  to?: string;
  subject?: string;
  body?: string;
  messages?: Message[];
}

// Domain related types
export interface Domain {
  '@id': string;
  '@type': string;
  id: string;
  domain: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export type MessageResponse = HydraResponse<Message>;
export type DomainResponse = HydraResponse<Domain>;
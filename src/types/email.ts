
// Common types for API responses
interface HydraResponse<T> {
  'hydra:member': T[];
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
}

// Email account type
export interface Email {
  id: string;
  address: string;
  token: string;
  createdAt: string;
  messages?: Message[];
}

// Domain related types
export interface Domain {
  id: string;
  domain: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export type MessageResponse = HydraResponse<Message>;
export type DomainResponse = HydraResponse<Domain>;
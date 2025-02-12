
// Common types for API responses
type HydraResponse<T> ={
  'hydra:member': T[];
}

// Address type used in messages
type AddressInfo= {
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
export type Email= {
  id: string;
  address: string;
  token: string;
  createdAt: string;
  messages?: Message[];
}

// Domain related types
export type Domain= {
  id: string;
  domain: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export type MessageResponse = HydraResponse<Message>;
export type DomainResponse = HydraResponse<Domain>;
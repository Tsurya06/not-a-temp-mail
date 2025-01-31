
export type Message = {
    id: string;
    subject: string;
    from: {
      address: string;
      name?: string;
    };
    to: {
      address: string;
      name?: string;
    };
    intro: string;
    text: string;
    html?: string;
    createdAt: string;
    hasAttachments: boolean;
    address: string;
    token: string;
  }
export interface Email {
    id: string;
    from?: string;
    to?: string;
    subject?: string;
    body?: string;
    createdAt?: string;
    address?: string;
    token?: string;
    messages?: Message[];
}

export interface DomainResponse {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:member': Domain[];
  'hydra:totalItems': number;
}

export interface Domain {
  '@id': string;
  '@type': string;
  id: string;
  domain: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MessageResponse {
  '@context'?: string;
  '@id'?: string;
  '@type'?: string;
  'hydra:member': Message[];
  'hydra:totalItems'?: number;
}

export interface DomainResponse {
    "@context": string;
    "@id": string;
    "@type": string;
    "hydra:member": Domain[];
    "hydra:totalItems": number;
}
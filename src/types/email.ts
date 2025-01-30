import { Message } from "../store/types";

export interface Email {
  id: string;
  from: {
    address: string;
    name: string;
  };
  to: {
    address: string;
    name: string;
  }[];
  subject: string;
  intro: string;
  text: string;
  html: string[];
  createdAt: string;
  updatedAt: string;
  messages: MessageResponse | null;
  address: string;
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
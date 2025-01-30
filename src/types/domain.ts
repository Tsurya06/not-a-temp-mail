export interface Domain {
    "@id": string;
    "@type": string;
    id: string;
    domain: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface DomainResponse {
    "@context": string;
    "@id": string;
    "@type": string;
    "hydra:member": Domain[];
    "hydra:totalItems": number;
}
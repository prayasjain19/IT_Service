export interface ServiceDTO {
  id: number;
  title: string;
  description: string;
  iconUrl?: string;
}

export interface CreateServiceDTO {
  title: string;
  description: string;
  iconUrl?: string;
}

export interface UpdateServiceDTO {
  id: number;
  title: string;
  description: string;
  iconUrl?: string;
}

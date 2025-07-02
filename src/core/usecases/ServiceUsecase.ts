import { CreateServiceDTO, ServiceDTO, UpdateServiceDTO } from "../dtos/Service.dto";
import { Service } from "../entities/Service.entity";
import { IServiceRepository } from "../repositories/ServiceRepository";

export class ServiceUseCase {
    constructor(private repository: IServiceRepository) { }

    async getAll(): Promise<Service[]> {
        return this.repository.findAll();
    }
    async getById(id: number): Promise<Service | null> {
        return this.repository.findById(id);
    }
    async create(data: CreateServiceDTO): Promise<Service> {
    return await this.repository.create(data);
  }

    async update(id: number, data: UpdateServiceDTO): Promise<Service> {
        const existingService = await this.repository.findById(id);
        if (!existingService) {
            throw new Error(`Service with ID ${id} not found.`);
        }
        if (data.title !== undefined && data.title.trim() === "") {
            throw new Error("Service title cannot be empty.");
        }
        return this.repository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error(`Service with ID ${id} not found.`);
    }
    return await this.repository.delete(id);
    }
}
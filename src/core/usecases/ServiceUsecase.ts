import { ServiceDTO } from "../dtos/Service.dto";
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
    async create(data: Omit<ServiceDTO, "id">): Promise<Service> {
        if (!data.title || data.title.trim() === "") {
            throw new Error("Service title is required.");
        }
        if (data.description && data.description.length < 10) {
            throw new Error("Service description must be at least 10 characters long.");
        }
        // Potentially more complex validation here
        return this.repository.create(data);
    }

    async update(id: number, data: Partial<ServiceDTO>): Promise<Service> {
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
        return this.repository.delete(id);
    }
}
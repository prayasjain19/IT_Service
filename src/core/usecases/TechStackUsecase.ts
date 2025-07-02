import { TechStackDTO } from "../dtos/TechStack.dto";
import { TechStack } from "../entities/TechStack.entity";
import { ITechStackRepository } from "../repositories/TechStackRepository"; // Adjust path if necessary

export class TechStackUsecase {
    constructor(private repository: ITechStackRepository) { }

    async getAll(): Promise<TechStack[]> {
        return this.repository.findAll();
    }

    async getById(id: number): Promise<TechStack | null> {
        // Basic validation for the ID: ensure it's a valid positive number
        if (typeof id !== 'number' || id <= 0 || !Number.isInteger(id)) {
            throw new Error("Invalid TechStack ID provided. ID must be a positive integer.");
        }
        return this.repository.findById(id);
    }

    async create(data: Omit<TechStackDTO, "id">): Promise<TechStack> {
        // --- Business Rule Validation for Creation ---
        if (!data.name || data.name.trim() === "") {
            throw new Error("TechStack name cannot be empty.");
        }
        if (data.name.length < 2 || data.name.length > 50) {
            throw new Error("TechStack name must be between 2 and 50 characters.");
        }

        // Example: Check for unique name (assuming 'name' should be unique for a tech stack)
        // This requires a `findByName` method in your ITechStackRepository
        // const existingTechStack = await this.repository.findByName(data.name);
        // if (existingTechStack) {
        //     throw new Error(`TechStack with name "${data.name}" already exists.`);
        // }

        // Example: Validate icon URL format if provided
        // if (data.iconUrl && !/^https?:\/\/.+\..+/.test(data.iconUrl)) {
        //     throw new Error("Invalid icon URL format.");
        // }

        const newTechStack = await this.repository.create(data);
        return newTechStack;
    }

    async update(id: number, data: Partial<TechStackDTO>): Promise<TechStack> {
        // --- Business Rule Validation and Existence Check for Update ---

        // 1. Validate ID
        if (typeof id !== 'number' || id <= 0 || !Number.isInteger(id)) {
            throw new Error("Invalid TechStack ID provided for update. ID must be a positive integer.");
        }

        // 2. Check if the TechStack exists before attempting to update
        const existingTechStack = await this.repository.findById(id);
        if (!existingTechStack) {
            throw new Error(`TechStack with ID ${id} not found.`);
        }

        // 3. Validate incoming data for update (only if the field is provided in 'data')
        if (data.name !== undefined) {
            if (data.name.trim() === "") {
                throw new Error("TechStack name cannot be empty.");
            }
            if (data.name.length < 2 || data.name.length > 50) {
                throw new Error("TechStack name must be between 2 and 50 characters.");
            }
            // Example: Check for unique name if name is being updated to an existing one (excluding itself)
            // const techStackWithSameName = await this.repository.findByName(data.name);
            // if (techStackWithSameName && techStackWithSameName.id !== id) {
            //     throw new Error(`Another TechStack with name "${data.name}" already exists.`);
            // }
        }

        // if (data.iconUrl !== undefined && data.iconUrl && !/^https?:\/\/.+\..+/.test(data.iconUrl)) {
        //     throw new Error("Invalid icon URL format.");
        // }


        const updatedTechStack = await this.repository.update(id, data);
        return updatedTechStack;
    }

    async delete(id: number): Promise<void> {
        // --- Business Rule Validation and Existence Check for Delete ---

        // 1. Validate ID
        if (typeof id !== 'number' || id <= 0 || !Number.isInteger(id)) {
            throw new Error("Invalid TechStack ID provided for deletion. ID must be a positive integer.");
        }

        // 2. Check if the TechStack exists before attempting to delete
        const existingTechStack = await this.repository.findById(id);
        if (!existingTechStack) {
            throw new Error(`TechStack with ID ${id} not found for deletion.`);
        }

        // Example: Add a business rule like "cannot delete a tech stack that is currently in use by a project"
        // This would likely require checking another repository (e.g., IProjectRepository)
        // const projectsUsingTechStack = await this.projectRepository.findByTechStackId(id);
        // if (projectsUsingTechStack.length > 0) {
        //     throw new Error(`Cannot delete TechStack as it is currently in use by ${projectsUsingTechStack.length} projects.`);
        // }

        await this.repository.delete(id);
    }
}
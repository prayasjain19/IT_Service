import { TechStackDTO } from "../dtos/TechStack.dto";
import { TechStack } from "../entities/TechStack.entity";
import { db } from "@/lib/prisma";

export interface ITechStackRepository {
    findAll(): Promise<TechStack[]>;
    findById(id: number): Promise<TechStack | null>;
    create(data: Omit<TechStackDTO, "id">): Promise<TechStack>;
    update(id: number, data: Partial<TechStackDTO>): Promise<TechStack>;
    delete(id: number): Promise<void>;
}

export class PrismaTechStackRepository implements ITechStackRepository {
    private mapToEntity(data: any): TechStack {
        return new TechStack(data.id, data.name, data.description, data.logoUrl)
    }

    async findAll(): Promise<TechStack[]> {
        const records = await db.techStack.findMany();
        return records.map(this.mapToEntity);
    }

    async findById(id: number): Promise<TechStack | null> {
        const record = await db.techStack.findUnique({ where: { id } });
        return record ? this.mapToEntity(record) : null;
    }

    async create(data: Omit<TechStackDTO, "id">): Promise<TechStack> {
        const record = await db.techStack.create({ data });
        return this.mapToEntity(record);
    }

    async update(id: number, data: Partial<TechStackDTO>): Promise<TechStack> {
        const record = await db.techStack.update({ where: { id }, data });
        return this.mapToEntity(record);
    }

    async delete(id: number): Promise<void> {
        await db.techStack.delete({ where: { id } });
    }
}
import { Service } from "../entities/Service.entity";
import { ServiceDTO } from "../dtos/Service.dto";
import { db } from "@/lib/prisma";

export interface IServiceRepository {
    findAll(): Promise<Service[]>;
    findById(id: number): Promise<Service | null>;
    create(data: Omit<ServiceDTO, "id">): Promise<Service>;
    update(id: number, data: Partial<ServiceDTO>): Promise<Service>;
    delete(id: number): Promise<void>;
}

export class PrismaServiceRepository implements IServiceRepository {
    private mapToEntity(data: any): Service {
        return new Service(
            data.id,
            data.title,
            data.description,
            data.iconurl
        );
    }
    async findAll(): Promise<Service[]> {
        const records = await db.service.findMany();
        return records.map(this.mapToEntity);
    }
    async findById(id: number): Promise<Service | null> {
        const record = await db.service.findUnique({ where: { id } });
        return record ? this.mapToEntity(record) : null;
    }
    async create(data: Omit<ServiceDTO, "id">): Promise<Service> {
        const record = await db.service.create({ data });
        return this.mapToEntity(record);
    }
    async update(id: number, data: Partial<ServiceDTO>): Promise<Service> {
        const record = await db.service.update({ where: { id }, data });
        return this.mapToEntity(record);
    }
    async delete(id: number): Promise<void> {
        await db.service.delete({ where: { id } });
    }
}
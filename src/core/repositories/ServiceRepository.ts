import { Service } from "../entities/Service.entity";
import { CreateServiceDTO, ServiceDTO, UpdateServiceDTO } from "../dtos/Service.dto";
import { db } from "@/lib/prisma";

export interface IServiceRepository {
    findAll(): Promise<Service[]>;
    findById(id: number): Promise<Service | null>;
    create(data: CreateServiceDTO): Promise<Service>;
    update(id: number, data: UpdateServiceDTO): Promise<Service>;
    delete(id: number): Promise<void>;
}

// type PrismaService = Prisma.PromiseReturnType<typeof db.service.findFirst>;
export class PrismaServiceRepository implements IServiceRepository {
    private mapPrismaToEntity(service: any): Service {
        return {
            id: service.id,
            title: service.title,
            description: service.description,
            iconUrl: service.iconUrl ?? undefined,
            createdAt: service.createdAt.toISOString(),
            updatedAt: service.updatedAt.toISOString(),
        }
    }
    async findAll(): Promise<Service[]> {
        const services = await db.service.findMany({ orderBy: { createdAt: "desc" } });
        return services.map(this.mapPrismaToEntity);
    }

    async findById(id: number): Promise<Service | null> {
        const service = await db.service.findUnique({ where: { id } });
        return service ? this.mapPrismaToEntity(service) : null;
    }

    async create(data: CreateServiceDTO): Promise<Service> {
        const created = await db.service.create({
            data: {
                title: data.title,
                description: data.description,
                iconUrl: data.iconUrl ?? null,
            },
        });
        return this.mapPrismaToEntity(created);
    }

    async update(id: number, data: UpdateServiceDTO): Promise<Service> {
        const updated = await db.service.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                iconUrl: data.iconUrl ?? null,
            },
        });
        return this.mapPrismaToEntity(updated);
    }

    async delete(id: number): Promise<void> {
        try {
            await db.service.delete({ where: { id } });
        } catch (error) {
            console.error(`Failed to delete service with ID ${id}:`, error);
        }
    }
}
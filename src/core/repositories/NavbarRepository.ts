// src/core/repositories/PrismaNavbarRepository.ts

import { Navbar } from "../entities/Navbar.entity";
import { NavbarDTO } from "../dtos/Navbar.dto";
import { db } from "@/lib/prisma";

export interface INavbarRepository {
    findAll(): Promise<Navbar[]>;
    create(data: Omit<NavbarDTO, "id">): Promise<Navbar>;
    update(id: number, data: Partial<NavbarDTO>): Promise<Navbar>;
    delete(id: number): Promise<void>;
}

export class PrismaNavbarRepository implements INavbarRepository {
    // This mapping is now consistent with your Prisma schema fields
    private mapToEntity(data: any): Navbar {
        // Assuming your Navbar entity constructor is new Navbar(id, title, href)
        return new Navbar(data.id, data.title, data.href);
    }

    async findAll(): Promise<Navbar[]> {
        const records = await db.navbarLink.findMany();
        return records.map(this.mapToEntity);
    }

    async create(data: Omit<NavbarDTO, "id">): Promise<Navbar> {
        // ✅ CORRECTION: No mapping needed, use 'data' directly
        // The DTO now has the correct 'title' and 'href' fields.
        const record = await db.navbarLink.create({ data });
        return this.mapToEntity(record);
    }

    async update(id: number, data: Partial<NavbarDTO>): Promise<Navbar> {
        // ✅ CORRECTION: No mapping needed, use 'data' directly
        const record = await db.navbarLink.update({ where: { id }, data });
        return this.mapToEntity(record);
    }

    async delete(id: number): Promise<void> {
        await db.navbarLink.delete({ where: { id } });
    }
}
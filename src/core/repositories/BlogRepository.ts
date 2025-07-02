import { db } from "@/lib/prisma";
import { BlogDTO } from "../dtos/Blog.dto";
import { Blog } from "../entities/Blog.entity";

export interface IBlogRepository {
    findAll(): Promise<Blog[]>;
    findById(id: number): Promise<Blog | null>;
    create(data: Omit<BlogDTO, "id">): Promise<Blog>;
    update(id: number, data: Partial<BlogDTO>): Promise<Blog>;
    delete(id: number): Promise<void>;
}

export class PrismaBlogRepository implements IBlogRepository {
    private mapToEntity(data: any): Blog {
        return new Blog(
            data.id,
            data.title,
            data.content,
            data.slug,
            data?.coverImage
        )
    }

    async findAll(): Promise<Blog[]> {
        const records = await db.blog.findMany();
        return records.map(this.mapToEntity);
    }

    async findById(id: number): Promise<Blog | null> {
        const record = await db.blog.findUnique({ where: { id } });
        return record ? this.mapToEntity(record) : null;
    }

    async create(data: Omit<BlogDTO, "id">): Promise<Blog> {
        const record = db.blog.create({ data });
        return this.mapToEntity(record)
    }
    async update(id: number, data: Partial<BlogDTO>): Promise<Blog> {
        const record = await db.blog.update({ where: { id }, data });
        return this.mapToEntity(record);
    }

    async delete(id: number): Promise<void> {
        await db.blog.delete({ where: { id } });
    }
}
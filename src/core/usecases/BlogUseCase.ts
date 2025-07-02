import { BlogDTO } from "../dtos/Blog.dto";
import { Blog } from "../entities/Blog.entity";
import { IBlogRepository } from "../repositories/BlogRepository";

export class BlogUseCase {
    constructor(
        private repository: IBlogRepository
    ) { }

    async getAll(): Promise<Blog[]> {
        // No specific business validation usually needed for fetching all.
        // Could add filtering/sorting logic here if it's a business requirement
        // that isn't handled by the repository directly.
        return this.repository.findAll();
    }
    async getById(id: number): Promise<Blog | null> {
        // Basic validation for the ID format/type
        if (typeof id !== 'number' || id <= 0) {
            throw new Error("Invalid blog ID provided. ID must be a positive number.");
        }
        return this.repository.findById(id);
    }

    async create(data: Omit<BlogDTO, "id">): Promise<Blog> {
        // --- Business Rule Validation for Creation ---
        if (!data.title || data.title.trim() === "") {
            throw new Error("Blog title cannot be empty.");
        }
        if (!data.content || data.content.trim() === "") {
            throw new Error("Blog content cannot be empty.");
        }
        if (data.title.length < 5) {
            throw new Error("Blog title must be at least 5 characters long.");
        }
        const newBlog = await this.repository.create(data);
        return newBlog;
    }

    async update(id: number, data: Partial<BlogDTO>): Promise<Blog> {
        // --- Business Rule Validation and Existence Check for Update ---

        // 1. Validate ID
        if (typeof id !== 'number' || id <= 0) {
            throw new Error("Invalid blog ID provided for update. ID must be a positive number.");
        }
        // 2. Check if the blog exists before attempting to update
        const existingBlog = await this.repository.findById(id);
        if (!existingBlog) {
            throw new Error(`Blog with ID ${id} not found.`);
        }
        // 3. Validate incoming data for update (only if the field is provided)
        if (data.title !== undefined) {
            if (data.title.trim() === "") {
                throw new Error("Blog title cannot be empty.");
            }
            if (data.title.length < 5) {
                throw new Error("Blog title must be at least 5 characters long.");
            }
            // Example: Check for unique title if title is being updated to an existing one (excluding itself)
            // const blogWithSameTitle = await this.repository.findByTitle(data.title);
            // if (blogWithSameTitle && blogWithSameTitle.id !== id) {
            //     throw new Error(`Another blog with title "${data.title}" already exists.`);
            // }
        }
        if (data.content !== undefined && data.content.trim() === "") {
            throw new Error("Blog content cannot be empty.");
        }

        const updatedBlog = await this.repository.update(id, data);
        return updatedBlog;
    }

    async delete(id: number): Promise<void> {
        // 1. Validate ID
        if (typeof id !== 'number' || id <= 0) {
            throw new Error("Invalid blog ID provided for deletion. ID must be a positive number.");
        }

        // 2. Check if the blog exists before attempting to delete
        const existingBlog = await this.repository.findById(id);
        if (!existingBlog) {
            throw new Error(`Blog with ID ${id} not found for deletion.`);
        }
        await this.repository.delete(id);
    }
}
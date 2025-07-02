import { NavbarDTO } from "../dtos/Navbar.dto";
import { Navbar } from "../entities/Navbar.entity";
import { INavbarRepository } from "../repositories/NavbarRepository";

//Use Case Of Navbar
export class NavbarUsecase {
    constructor(private repository: INavbarRepository) { }

    async getAll(): Promise<Navbar[]> {
        return this.repository.findAll();
    }

    async create(data: Omit<NavbarDTO, "id">): Promise<Navbar> {
        return this.repository.create(data);
    }

    async update(id: number, data: Partial<NavbarDTO>): Promise<Navbar> {
        return this.repository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}
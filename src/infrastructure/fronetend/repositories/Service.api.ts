import { CreateServiceDTO, UpdateServiceDTO } from "@/core/dtos/Service.dto";
import { Service } from "@/core/entities/Service.entity";
import { IServiceRepository } from "@/core/repositories/ServiceRepository";

export class ServiceApiRepository implements IServiceRepository {
    async findAll(): Promise<Service[]> {
        try {
            const response = await fetch("/api/services", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: "Unknown error occurred" }));
                console.error("Failed to fetch services:", response.status, errorData);
                throw new Error(errorData.message || `Failed to fetch services. Status: ${response.status}`);
            }

            const data: Service[] = await response.json();
            return data;
        } catch (error) {
            console.error("Network or unexpected error during findAll:", error);
            throw error;
        }
    }

    async findById(id: number): Promise<Service | null> {
        try {
            const response = await fetch(`/api/services/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            });

            if (response.status === 404) return null;

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: "Unknown error occurred" }));
                console.error("Failed to fetch service:", response.status, errorData);
                throw new Error(errorData.message || `Failed to fetch service. Status: ${response.status}`);
            }

            const data: Service = await response.json();
            return data;
        } catch (error) {
            console.error("Network or unexpected error during findById:", error);
            throw error;
        }
    }

    async create(data:CreateServiceDTO): Promise<Service> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/services`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: "Unknown error occurred" }));
                console.error("Failed to fetch service:", response.status, errorData);
                throw new Error(errorData.message || `Failed to fetch service. Status: ${response.status}`);
            }

            const created: Service = await response.json();
            return created;
        } catch (error) {
            console.error("Network or unexpected error during create:", error);
            throw error;
        }
    }

    async update(id: number, data: UpdateServiceDTO): Promise<Service> {
        try {
            const response = await fetch(`/api/services/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: "Unknown error occurred" }));
                console.error("Failed to update service:", response.status, errorData);
                throw new Error(errorData.message || `Failed to update service. Status: ${response.status}`);
            }

            const updated: Service = await response.json();
            return updated;
        } catch (error) {
            console.error("Network or unexpected error during update:", error);
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const response = await fetch(`/api/services/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: "Unknown error occurred" }));
                console.error("Failed to delete service:", response.status, errorData);
                throw new Error(errorData.message || `Failed to delete service. Status: ${response.status}`);
            }

            return;
        } catch (error) {
            console.error("Network or unexpected error during delete:", error);
            throw error;
        }
    }

}
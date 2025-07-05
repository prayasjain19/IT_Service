import { db } from "@/lib/prisma";
import { Admin } from "../entities/Admin.entity";



export interface IAdminRepository {
    findByEmail(email: string): Promise<Admin | null>;
    saveOtp(email: string, otp: string, expiry: Date): Promise<void>;
    verifyOtp(email: string, otp: string): Promise<boolean>;
}

export class PrsimaAdminRepository implements IAdminRepository {
    private mapToEntity(admin: any): Admin {
        return {
            id: admin.id,
            email: admin.email,
            passwordHash: admin.passwordHash,
            otp: admin.otp,
            otpExpiry: admin.otpExpiry,
        }
    }
    async findByEmail(email: string): Promise<Admin | null> {
        const admin = await db.admin.findUnique({ where: { email } });
        return admin ? new Admin(
            admin.id,
            admin.email,
            admin.passwordHash,
            admin.otp,
            admin.otpExpiry
        ) : null;
    }

    async saveOtp(email: string, otp: string, expiry: Date): Promise<void> {
        await db.admin.update({
            where: { email },
            data: { otp, otpExpiry: expiry }
        })
    }

    async verifyOtp(email: string, otp: string): Promise<boolean> {
        const admin = await db.admin.findUnique({ where: { email } });

        if (!admin) return false;
        if (!admin.otpExpiry) return false;
        if (admin.otp !== otp) return false;

        return new Date() < admin.otpExpiry;
    }

}
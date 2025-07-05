import { OtpService } from "@/infrastructure/backend/repositories/OtpService";
import { IAdminRepository } from "../repositories/AdminRepository";
import { LoginDTO } from "../dtos/Admin.dto";
import bcrypt from "bcryptjs"

//Admin Login Use Cse to execute the admin Use Case
export class AdminLoginUseCase {
  constructor(
    private adminRepo: IAdminRepository,
    private otpService: OtpService
  ) {}

  async execute(data: LoginDTO): Promise<{ message: string }> {
    const admin = await this.adminRepo.findByEmail(data.email);
    if (!admin) throw new Error("Admin not found");

    const isPasswordValid = await bcrypt.compare(data.password, admin.passwordHash);
    if (!isPasswordValid) throw new Error("Invalid password");

    const otp = this.otpService.generateOtp();

    await this.adminRepo.saveOtp(admin.email, otp.code, otp.expiry);
    await this.otpService.sendOtpEmail(data.email, otp.code);

    return { message: "OTP sent successfully" }; // ✅ JSON serializable object
  }
}

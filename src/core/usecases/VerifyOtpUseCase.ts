
import { OtpVerifyDTO } from "../dtos/Admin.dto";
import { IAdminRepository } from "../repositories/AdminRepository";

export class VerifyOtpUseCase {
  constructor(private adminRepo: IAdminRepository) {}

  async execute(data: OtpVerifyDTO): Promise<boolean> {
    return this.adminRepo.verifyOtp(data.email, data.otp);
  }
}

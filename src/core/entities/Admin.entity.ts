export class Admin {
  constructor(
    public id: number,
    public email: string,
    public passwordHash: string,
    public otp?: string | null,
    public otpExpiry?: Date | null
  ) {}
}

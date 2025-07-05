import { PrsimaAdminRepository } from "@/core/repositories/AdminRepository";
import { OtpService } from "@/infrastructure/backend/repositories/OtpService";
import { AdminLoginUseCase } from "@/core/usecases/AdminLoginUseCase";
import { LoginDTO } from "@/core/dtos/Admin.dto";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export async function POST(req: Request) {
  const body: LoginDTO = await req.json();

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const repo = new PrsimaAdminRepository();
    const otpService = new OtpService();
    const usecase = new AdminLoginUseCase(repo, otpService);

    const result = await usecase.execute(parsed.data);
    return NextResponse.json(result, { status: 200 }); // ✅ Now returns { message: ... }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Login failed" }, { status: 401 });
  }
}

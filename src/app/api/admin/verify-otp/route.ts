import { PrsimaAdminRepository } from "@/core/repositories/AdminRepository";
import { OtpVerifyDTO } from "@/core/dtos/Admin.dto";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { z } from "zod";

const otpVerifySchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6)
});

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    const body: OtpVerifyDTO = await req.json();

    const parsed = otpVerifySchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: "Invalid OTP format" }, { status: 400 });
    }

    try {
        const repo = new PrsimaAdminRepository();
        const isValid = await repo.verifyOtp(body.email, body.otp);

        if (!isValid) {
            return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 });
        }

        const admin = await repo.findByEmail(body.email);
        if (!admin) {
            return NextResponse.json({ error: "Admin not found" }, { status: 404 });
        }

        // Sign JWT token with user info
        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email,
            },
            JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        const response = NextResponse.json({ message: "OTP Verified", token });

        // Set JWT in HTTP-only cookie
        response.cookies.set("sxs_admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60, // 1 hour
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "OTP verification failed" }, { status: 500 });
    }
}

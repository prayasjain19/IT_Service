import nodemailer from "nodemailer"

//OTP Service to Generate and Send Email
export class OtpService {
    generateOtp() {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 5 * 60 * 1000) // 5 min
        return { code, expiry }
    }
    async sendOtpEmail(email: string, code: string) {
        const transporter = nodemailer.createTransport({
            service: "gmail", // or use SMTP provider
            auth: {
                user: process.env.EMAIL_USER, // e.g., your Gmail
                pass: process.env.EMAIL_PASS, // app password or SMTP password
            },
        });

        await transporter.sendMail({
            from: `"NextGen IT" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP Code",
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Your OTP Code</h2>
            <p>Hello,</p>
            <p>Your One-Time Password (OTP) for your recent request is:</p>
            <h1 style="color: #6a0dad; font-size: 24px; font-weight: bold; margin: 20px 0;">${code}</h1>
            <p>This code is valid for 5 minutes. Please do not share this OTP with anyone.</p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Regards,<br>NextGen IT Solutions Team</p>
            </div>
      `,
        });
    }
}
export interface LoginDTO {
    email: string;
    password: string;
}


export interface OtpVerifyDTO {
    email: string;
    otp: string;
}
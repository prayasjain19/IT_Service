import { IronSessionOptions } from "iron-session";

export type AdminSession = {
  isLoggedIn: boolean;
  email: string;
};

export const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "sxs_admin_auth",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "./auth";

export function withSession(handler: any) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

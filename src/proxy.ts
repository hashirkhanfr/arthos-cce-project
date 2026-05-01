import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

// Support both default and named 'proxy' exports
export const proxy = auth;
export default auth;

export const config = {
  matcher: ["/admin/:path*"],
};

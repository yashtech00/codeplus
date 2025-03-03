import { AdminAuthOptions } from "@/lib/admin-auth-options";
import NextAuth from "next-auth";

const handler = NextAuth(AdminAuthOptions);

export { handler as GET, handler as POST };
import { Role, User } from "@prisma/client";
import { type DefaultSession } from "next-auth";

type UserId = string;
declare module "next-auth" {
  interface Session {
    user: User &{
      id: UserId
      email: string;
      role: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined;
    email: string;
    role: Role;
  }
}

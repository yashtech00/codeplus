import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { JWT } from "next-auth/jwt";
import prisma from "./db";
import { signIn } from "next-auth/react";
import { NextAuthOptions, Session } from "next-auth";

export const AdminAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Auth",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

         // Mock authentication (replace this with your actual logic)  
         if (credentials.email === "admin@gmail.com" && credentials.password === "1234567890") {  
            // If the credentials are valid, return an object representing the user.  
            return { id: 1, name: "Admin", email: "admin@example.com" };  
          } else {  
            // If you return null or false, the sign-in will fail  
            return null;  
          } 
      },
    }),
  ],
 
  session: {
    strategy: "jwt",

    maxAge: 24 * 60 * 60,
    updateAge: 60 * 60,
  },
  callbacks: {
    async jwt({ account, token, profile }) {
      if (account && profile) {
        (token.email = profile.email as string),
          (token.id = account.access_token);
      }
      return token;
    },
    async session({ session }: { session: Session }) {
      try {
        const user = await prisma.admin.findUnique({
          where: {
            email: "admin@gmail.com",
            password: "1234567890",
          },
        });
        if (user) {
          session.user.id = user.id;
        }
      } catch (e) {
        console.error(e);
      }
      return session;
    },
  },
} satisfies NextAuthOptions;

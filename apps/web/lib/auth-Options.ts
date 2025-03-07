import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../db";
import { emailSchema, passwordSchema } from "./schema";
import bcrypt from "bcryptjs";
import { NextAuthOptions, Session } from "next-auth";

import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.Github_Id || "",
      clientSecret: process.env.Github_Secret || "",
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const emailValidation = emailSchema.safeParse(credentials.email);
        if (!emailValidation.success) {
          throw new Error("Please enter valid email");
        }
        const passwordValidation = passwordSchema.safeParse(
          credentials.password
        );
        if (!passwordValidation.success) {
          throw new Error(
            "Please enter valid password or password length more than 6"
          );
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: emailValidation.data,
            },
          });
          if (!user) {
            const hashedPassword = await bcrypt.hash(
              passwordValidation.data,
              10
            );
            const newUser = await prisma.user.create({
              data: {
                email: emailValidation.data,
                password: hashedPassword,
                provider: "Credentials",
                role:"USER",
              },
            });
            return newUser;
          }
          const passwordVerification = await bcrypt.compare(
            passwordValidation.data,
            credentials.password
          );
          if (!passwordVerification) {
            throw new Error("invalid password ");
          }
          return user;
        } catch (e) {
          console.error(e)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/user",
  },
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile,user }) {
      if (account && profile && user) {
        token.email = profile.email as string;
        token.id = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: token.email || "",
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
    async signIn({ account, profile }) {
      try {
        if (account?.provider === "github") {
          const user = await prisma.user.findUnique({
            where: {
              email: profile?.email,
            },
          });

          if (!user) {
            const newUser = await prisma.user.create({
              data: {
                email: profile?.email || "",
                provider: "Github",
                role:"USER"
              },
            });
          }
        }
        return true;
      } catch (e) {
        console.error(e);
        return false 
      }
    },
  },
} satisfies NextAuthOptions;

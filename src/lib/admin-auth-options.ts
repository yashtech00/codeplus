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
                password:{type:"password"}
            },
            async authorize(credentials){
                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }

                try {
                    const admin = await prisma.admin.findUnique({
                        where: {
                            email: "sample@gmail.com",
                            password:"1234567890"
                        }
                    })
                    return NextResponse.json({
                        message: "Login Successfully",
                        admin
                    }, {
                        status:200
                    })
                } catch (e) {
                    console.error(e);
                    return NextResponse.json({
                        message:"Internal server error",
                    }, {
                        status:411
                    })
                }
            }
        }),
       
    ],
    pages: {
        signIn:"/AdminAuth"
    },
    session: {
        strategy: "jwt",

        maxAge: 24 * 60 * 60,
        updateAge:60*60
    },
    callbacks: {
        async jwt({account,token,profile}) {
            if (account && profile) {
                token.email = profile.email as string,
                    token.id = account.access_token
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            try {
                const user = await prisma.admin.findUnique({
                    where: {
                        email: "sample@gmail.com",
                        password:"1234567890"
                    }
                })
                if (user) {
                    session.user.id = user.id
                }
                return user;
            } catch (e) {
                console.error(e);
                return NextResponse.json({
                    message:"Internal server error"
                }, {
                    status: 411
                })
            }
        },
        async signIn({ account, profile }) {
            try {
                const admin = await prisma.admin.findUnique({
                    where: {
                        email: "sample@gmail.com",
                        password:"1234567890"
                    }
                })
                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        }
    }
}satisfies NextAuthOptions
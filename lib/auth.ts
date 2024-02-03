import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";



export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      type: "credentials",
      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };


        try {
          const user = await prisma.user.findFirst({
            where: { email },
          });

          if(!user) throw new Error( JSON.stringify({ error:'Invalid Credentials', status: false }));


          if (user && user.password && credentials) {
            const isAuth = await bcrypt.compare(password, user.password);
            if (isAuth) {
              return user;
            } else {
               throw new Error( JSON.stringify({ error:'Invalid Credentials', status: false }));
            }
          } else {
            throw new Error( JSON.stringify({ error:'Invalid Credentials', status: false }));
          }
        } catch (err: any) {
          throw new Error( JSON.stringify({ error:'Invalid Credentials', status: false }));
        }
      },
    }),
  ],

  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    session: async ({ session, user, token }) => {
      session.user.id = token.id as string;

      return session;
    },
  },
};

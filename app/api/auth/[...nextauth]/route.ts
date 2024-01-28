// import { mergAnonymusCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

 const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient ) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret:'kjfhlskfwe9r9',
  callbacks:{
    session({session, user}) {
      session.user.id=user.id
      // session.user.role=user.role
      return session
    },
  },
  // events:{
  //   async signIn({user}) {
      
  //     await mergAnonymusCart(user.id)
  //   },
  // }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export default authOptions
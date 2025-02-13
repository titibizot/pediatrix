// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,  // Assurez-vous que NEXTAUTH_SECRET est défini en production
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async session({ session, token, user }) {
      // Ajoutez des informations supplémentaires à la session si nécessaire
      return session;
    }
  }
});

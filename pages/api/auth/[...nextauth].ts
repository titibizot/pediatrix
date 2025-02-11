// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Exemple avec Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
    // Vous pouvez ajouter d'autres providers ici si besoin
  ],
  session: {
    strategy: "jwt"  // Utilisation du JSON Web Token pour la session
  },
  callbacks: {
    async session({ session, token, user }) {
      // Ajoutez ici des informations supplémentaires à la session si nécessaire
      return session;
    }
  }
});

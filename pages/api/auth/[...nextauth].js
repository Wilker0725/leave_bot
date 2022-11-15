import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { hashPassword, verifyPassword } from "@/backend/utils/auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

let userAccount = null;

const prisma = new PrismaClient();

const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 1 * 24 * 60 * 60, //1 day
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          const { id, name, email, is_active, authorized, password } =
            await prisma.admins.findFirst({
              where: {
                email: credentials.email,
              },
            });

          if (!id) return null;

          const res = await verifyPassword(credentials.password, password);

          if (!res) throw "Invalid email or password";

          return {
            userId: id,
            name,
            email,
            isActive: is_active,
            authorized,
          };
        } catch (error) {
          console.log("Authorize Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.authorized) return false;
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);

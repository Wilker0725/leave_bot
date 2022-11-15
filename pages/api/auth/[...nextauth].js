import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { hashPassword, verifyPassword } from "@/backend/utils/auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

let userAccount = null;

const prisma = new PrismaClient();

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 1 * 24 * 60 * 60, //1 day
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          const user = await prisma.admins.findFirst({
            where: {
              email: credentials.email,
            },
          });

          // const hashpwd = await hashPassword("123456");
          // console.log("hashpwdsss:", hashpwd);
          if (user !== null) {
            //Compare the hash
            const res = await verifyPassword(
              credentials.password,
              user.password
            );
            if (res === true) {
              userAccount = {
                userId: user.id,
                name: user.name,
                email: user.email,
                isActive: user.is_active,
                authorized: user.authorized,
              };

              return userAccount;
            } else {
              console.log("Hash not matched logging in");
              return null;
            }
          } else {
            return null;
          }
        } catch (error) {
          console.log("Authorize error:", err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
  },
  callbacks: {
    async signIn(user, account, profile) {
      try {
        //the user object is wrapped in another user object so extract it
        user = user.user;

        if (typeof user.userId !== typeof undefined) {
          if (user.isActive === true) {
            console.log("User is active");
            return user;
          } else {
            console.log("User is not active");
            return false;
          }
        } else {
          console.log("User id was undefined");
          return false;
        }
      } catch (err) {
        console.error("Signin callback error:", err);
      }
    },
    async session(session, token) {
      if (userAccount !== null) {
        session.user = userAccount;
        session.user = {
          userId: userAccount.userId,
          name: userAccount.name,
          email: userAccount.email,
          authorized: userAccount.authorized,
        };
      } else if (
        typeof token.user !== typeof undefined &&
        (typeof session.user === typeof undefined ||
          (typeof session.user !== typeof undefined &&
            typeof session.user.userId === typeof undefined))
      ) {
        session.user = token.user;
      } else if (typeof token !== typeof undefined) {
        session.token = token;
      }
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (typeof user !== typeof undefined) {
        token.user = user;
      }

      return token;
    },
  },
});

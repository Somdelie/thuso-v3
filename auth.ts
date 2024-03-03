import NextAuth, { DefaultSession, Session } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation";
import { UserRole } from "@prisma/client";
import { getAccountByUserId } from "./data/accounts";

// Define or import the User type

type User = {
  id: string;
  emailVerified?: Date | null; // Updated to match the type from getUserById
  role?: string;
  phone?: string;
  status?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  } | null;
  isTwoFactorEnabled?: boolean;
  // ... other properties
};

// Destructure the necessary components from the NextAuth object
export const {
  handlers: { GET, POST }, // HTTP method handlers
  auth, // Authentication options
  signIn, // Function for signing in
  signOut, // Function for signing out
} = NextAuth({
  pages: {
    signIn: "/auth/login", // Custom sign-in page
    error: "/auth/error", // Custom error page
  },
  events: {
    async linkAccount({ user }) {
      // Linking accounts event, update emailVerified status
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    authorized({ request, auth }) {
      console.log(auth);
      return true;
    },
    async signIn({ user, account }) {
      // Callback executed after successful sign-in
      // Allow without email verification for non-credentials provider
      if (!user || account?.provider !== "credentials") return true;

      const existingUser = await getUserById((user as User).id);

      // Prevent sign-in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete two-factor confirmation for the next sign-in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      return true;
    },
    async jwt({ token }) {
      // console.log("AM being called");
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;

      token.role = existingUser.role;
      token.name = existingUser?.name;
      token.phone = existingUser?.phone;
      token.status = existingUser.status;
      token.address = existingUser.address;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (token.status && session.user) {
        session.user.status = token.status as string;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.phone = token.phone as any;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.address = token.address as any;
      }

      // console.log(session);
      return session;
    },
  },
  adapter: PrismaAdapter(db), // Prisma adapter for NextAuth
  session: { strategy: "jwt" }, // Session strategy using JWT
  ...authConfig, // Additional authentication configurations
});

export type { Session }; // Exporting the Session type for use in other modules

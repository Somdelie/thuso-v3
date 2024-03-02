import NextAuth, { Session } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation";

// Define or import the User type
type User = {
  id: string;
  emailVerified?: boolean;
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
    async session({ token, session }) {
      // Callback to modify the session data
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token }) {
      // Callback to modify the JSON Web Token (JWT) before encoding
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      // Add additional user properties to the token
      token.role = existingUser.role;
      token.phone = existingUser.phone;
      token.status = existingUser.status;
      token.address = existingUser.address;

      return token;
    },
  },
  adapter: PrismaAdapter(db), // Prisma adapter for NextAuth
  session: { strategy: "jwt" }, // Session strategy using JWT
  ...authConfig, // Additional authentication configurations
});

export type { Session }; // Exporting the Session type for use in other modules

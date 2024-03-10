import credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail, getUserById } from "./data/user";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { UserRole } from "@prisma/client";
import { getAccountByUserId } from "./data/accounts";
import { db } from "./lib/db";
import { getTwoFactorConfirmationByUserId } from "./data/twoFactorConfirmation";

// Define or import the User type
type User = {
  id: string;
  emailVerified?: boolean;
  role?: string;
  phone?: string; // Add the phone property
  status?: string; // Add the status property
  address?: string; // Add the address property
  isTwoFactorEnabled?: boolean; // Add the isTwoFactorEnabled property
  // ... other properties
};

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const user = auth?.user;
      const isOnAdmin = request.nextUrl.pathname.startsWith("/admin");
      const isOnAuthRoute = request.nextUrl.pathname.startsWith("/auth");

      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";

      if (isOnAdmin && !user) {
        return Response.redirect(`${baseUrl}/auth/login`);
      }

      // Redirect to 404 page if not an admin
      if (
        isOnAdmin &&
        user &&
        !(user.role === "ADMIN" || user.role === "EDITOR")
      ) {
        return Response.redirect(`${baseUrl}/not-found`);
      }

      if (isOnAuthRoute && user) {
        return Response.redirect(`${baseUrl}/`);
      }
    },
    async signIn({ user, account }): Promise<boolean> {
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
    async jwt({ token }): Promise<Record<string, unknown>> {
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
      // token.job = existingUser.
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
} satisfies NextAuthConfig;

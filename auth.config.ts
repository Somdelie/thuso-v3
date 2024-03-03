import credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./data/user";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

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

  // callbacks: {
  //   async signIn({ user, account }) {
  //     // Callback executed after successful sign-in
  //     // Allow without email verification for non-credentials provider
  //     if (!user || account?.provider !== "credentials") return true;

  //     const existingUser = await getUserById((user as User).id);

  //     // Prevent sign-in without email verification
  //     if (!existingUser?.emailVerified) return false;

  //     if (existingUser.isTwoFactorEnabled) {
  //       const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
  //         existingUser.id
  //       );

  //       if (!twoFactorConfirmation) return false;

  //       // Delete two-factor confirmation for the next sign-in
  //       await db.twoFactorConfirmation.delete({
  //         where: { id: twoFactorConfirmation.id },
  //       });
  //     }
  //     return true;
  //   },
  //   async jwt({ token }) {
  //     // Callback to modify the JSON Web Token (JWT) before encoding
  //     if (!token.sub) return token;

  //     const existingUser = await getUserById(token.sub);

  //     if (!existingUser) return token;

  //     // Add additional user properties to the token
  //     token.role = existingUser.role;
  //     token.phone = existingUser.phone;
  //     token.status = existingUser.status;
  //     token.address = existingUser.address;
  //     token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

  //     return token;
  //   },

  //   async session({ token, session }) {
  //     if (token.sub && session.user) {
  //       session.user.id = token.sub as string;
  //     }

  //     if (session.user) {
  //       const userId = token.sub as string | undefined;
  //       if (userId) {
  //         const existingUser = await getUserById(userId);
  //       }
  //     }

  //     console.log(session);
  //     return session;
  //   },
  // },
} satisfies NextAuthConfig;

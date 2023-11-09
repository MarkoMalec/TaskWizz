import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/lib/prisma";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "~/env.mjs";
import { db } from "~/server/db";
import crypto from "crypto";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    role: string;
  }
}

const hashPassword = (password: string, salt: string) => {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(password, salt, 10000, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString("hex"));
    });
  });
};

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token }) => {

      // console.log("================ USER: session =======================", session)
      

      // console.log(token, "================= TOKEN: session ===================");

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          randomKey: token.randomKey,
        },
      };

    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        // console.log('=================== u: jwt ========================', u)
        return {
          ...token,
          id: u.id,
          role: u.role,
          randomKey: u.randomKey,
        };
      }
      // console.log("---------------- THE TOKEN: jwt ------------------------", token );
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check for missing credentials
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Fetch user
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // console.log("Fetched user:", user);

        if (!user) {
          return null;
        }

        const hashedPassword = crypto
          .createHash("sha256")
          .update(credentials.password)
          .digest("hex");

        if (hashedPassword === user.password) {
          // console.log(user.password, "THE PASSSSWORORORORORD");

          // Return the user object with additional keys if you like
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
            randomKey: "random Key",
          };
        } else {
          return null;
        }
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

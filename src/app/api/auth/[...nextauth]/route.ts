import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import argon2 from "argon2";

import type {
  User,
  NextAuthOptions,
  RequestInternal,
  Session,
} from "next-auth";

import atlasClientPromise from "@/utilities/db/atlas";
import { JWT } from "next-auth/jwt";
import { ObjectId } from "mongodb";

export interface BusseUser extends User {
  _id: ObjectId | string;
  Username: string;
  Password?: string;
  NewPassword?: string;
  OldPassword?: string;
  Email: string;
  FirstName: string;
  LastName: string;
  UserType: string;
  Image: string;
}

export interface BusseJWT extends JWT {
  user: BusseUser;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@doe.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        _req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ) {
        const client = await atlasClientPromise;
        const db = client.db("busseforce");

        console.log(credentials);

        const user = await db
          .collection<BusseUser>("user")
          .findOne({ Username: credentials?.email });

        if (!user) return null;

        console.log(user);

        const verify = await argon2.verify(
          user?.Password as string,
          credentials?.password as string
        );

        if (!verify) return null;
        if (!user) return null;

        if ("Password" in user) delete user.Password;
        if ("NewPassword" in user) delete user.NewPassword;
        if ("OldPassword" in user) delete user.OldPassword;

        return user;
      },
    }),
  ],

  secret: process.env.SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 7 * 24 * 60 * 60, // 7 days
  },

  callbacks: {
    session<BusseUser>({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: BusseUser;
    }) {
      if (token) {
        const busseToken = token as BusseJWT;

        if ("Password" in busseToken.user) delete busseToken.user.Password;
        if ("NewPassword" in busseToken.user)
          delete busseToken.user.NewPassword;
        if ("OldPassword" in busseToken.user)
          delete busseToken.user.OldPassword;

        session.user = busseToken.user;
      }

      return session;
    },
    jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

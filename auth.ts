import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Discord from "next-auth/providers/discord";
import {prisma} from "./prisma";
import Resend from "next-auth/providers/resend";
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(
    prisma
  ),
  providers: [Discord,
    Resend({
      from: "no-reply@derickhoskinson.com",
    })
  ],
});

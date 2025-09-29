// lib/db.ts
import { PrismaClient } from "./prisma/prisma/generated";

/**
 * In dev, keep one client across HMR; in prod, create exactly one.
 * Do NOT call prisma.$disconnect() inside request handlers in serverless.
 */
declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
}

export const prisma =
  globalThis.__prisma__ ??
  new PrismaClient({
    // log: ["query", "error", "warn"], // optionally enable to debug
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma__ = prisma;
}

export default prisma;

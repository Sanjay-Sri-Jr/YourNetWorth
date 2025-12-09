import { PrismaClient } from "../lib/generated/prisma";
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

//globalThis.prisma: this global variable ensures that the Prisma Client instance is reused in development mode, preventing the exhaustion of database connections during hot reloads.
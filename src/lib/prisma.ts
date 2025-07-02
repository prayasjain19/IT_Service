// lib/prisma.ts

import { PrismaClient } from '../generated/prisma';

let db: PrismaClient;

declare global {
  // Ensures global reuse of the client in development
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  db = global.prisma;
}

export { db };

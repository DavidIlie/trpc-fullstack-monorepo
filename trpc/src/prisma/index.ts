import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
   var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
   prisma = new PrismaClient();
} else {
   if (!global.prisma) {
      global.prisma = new PrismaClient({
         log:
            process.env.ENV === "DEVELOPMENT"
               ? ["query", "info", "warn", "error"]
               : [],
      });
   }
   prisma = global.prisma;
}
export default prisma;

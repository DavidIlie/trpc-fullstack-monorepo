import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

import prisma from "./prisma";

export const appRouter = trpc
   .router()
   .query("test-query", {
      resolve({}) {
         return { message: "TRPC Works!" };
      },
   })
   .query("test-prisma", {
      async resolve({}) {
         return { data: prisma.user.findMany() };
      },
   });

export type AppRouter = typeof appRouter;

export const createNextApiHandler = trpcNext.createNextApiHandler({
   router: appRouter,
   createContext: () => null,
});

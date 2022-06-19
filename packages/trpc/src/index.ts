import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

import prisma from "@trpc-monorepo/prisma";

export const appRouter = trpc
   .router()
   .query("test-query", {
      resolve({}) {
         return { message: "TRPC Works!" };
      },
   })
   .query("test-prisma", {
      async resolve({}) {
         return { data: await prisma.user.findMany() };
      },
   });

export type AppRouter = typeof appRouter;

export const createExpressMiddleware = trpcExpress.createExpressMiddleware({
   router: appRouter,
   createContext: () => null,
});

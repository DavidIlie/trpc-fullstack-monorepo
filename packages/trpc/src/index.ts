import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

import prisma from "./lib/prisma";
import { helloSchema } from "@trpc-monorepo/common";

export const appRouter = trpc
   .router()
   .query("hello", {
      input: helloSchema,
      resolve({ input }) {
         return { message: `Hello ${input.name}` };
      },
   })
   .query("todo", {
      async resolve({}) {
         return { todos: await prisma.todo.findMany() };
      },
   });

export type AppRouter = typeof appRouter;

export const createExpressMiddleware = trpcExpress.createExpressMiddleware({
   router: appRouter,
   createContext: () => null,
});

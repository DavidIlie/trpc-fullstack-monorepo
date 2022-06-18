import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

import prisma from "./lib/prisma";
import {
   createInputSchema,
   idInputSchema,
   stateInputSchema,
} from "@trpc-monorepo/common";

export const appRouter = trpc
   .router()
   .query("todo", {
      async resolve({}) {
         return { todos: await prisma.todo.findMany() };
      },
   })
   .mutation("create-todo", {
      input: createInputSchema,
      async resolve({ input }) {
         await prisma.todo.create({ data: { name: input.name } });
         return;
      },
   })
   .mutation("update-todo", {
      input: stateInputSchema,
      async resolve({ input }) {
         await prisma.todo.update({
            where: { id: input.id },
            data: { completed: input.state },
         });
         return;
      },
   })
   .mutation("delete-todo", {
      input: idInputSchema,
      async resolve({ input }) {
         await prisma.todo.delete({ where: { id: input.id } });
         return;
      },
   });

export type AppRouter = typeof appRouter;

export const createExpressMiddleware = trpcExpress.createExpressMiddleware({
   router: appRouter,
   createContext: () => null,
});

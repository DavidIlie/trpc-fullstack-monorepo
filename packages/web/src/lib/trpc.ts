import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@trpc-monorepo/trpc";

export const trpc = createReactQueryHooks<AppRouter>();

import * as zod from "zod";

import { idInputSchema } from "./shared";

export const createInputSchema = zod.object({
   name: zod.string().min(1, "Name cannot be empty."),
});

export const stateInputSchema = idInputSchema.extend({ state: zod.boolean() });

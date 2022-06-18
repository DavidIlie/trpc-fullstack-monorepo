import * as zod from "zod";

export const idInputSchema = zod.object({
   id: zod.string().uuid(),
});

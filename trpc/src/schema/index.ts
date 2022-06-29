import * as zod from "zod";

export const testSchema = zod.object({
   hello: zod.string(),
});

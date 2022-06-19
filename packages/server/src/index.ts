import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import prisma from "@trpc-monorepo/prisma";
import { createExpressMiddleware } from "@trpc-monorepo/trpc";

const main = async () => {
   const app = express();

   const port = process.env.PORT || 5000;

   app.listen(port, () => {
      console.log(`> Server listening on http://localhost:${port}`);
   });

   app.use(
      cors({
         credentials: true,
         origin: "http://localhost:3000",
      })
   );
   app.use(morgan("dev"));

   app.use("/api/trpc", createExpressMiddleware);

   app.get("/api/test-prisma", async (_req, res) =>
      res.json({ data: await prisma.user.findMany() })
   );
};

main();

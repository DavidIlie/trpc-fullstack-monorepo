# tRPC+Prisma+Next.js+Express Monorepo Setup

This repository contains a Yarn Workspace Monorepo revolving around a:

-  Next.js (`web`) Frontend with TailwindCSS + tRPC react-query
-  Express.js (`server`) Backend with tRPC as the main API Gateway
-  `trpc` package to share routes to Backend and types to Frontend. Prisma is included
-  `common` package to share code such as yup schemas (by default shared to `web` and `tRPC`)

You can find all packages in the `packages/` folder.

## The Idea

I wasn't able to find any sort of template with this goal in mind, to keep everything seperate from each other for a good full stack scalable web development arhitecture (big words I know), so I decided to create this project.

## Getting Started

You first need access to a PostgreSQL database as that is what is configuration by default, but you can easily reconfigure prisma to use PlanetScale or another provider if you so please.

> **Warning**: Due to current Prisma limitations, this project must run using **Node.js version 16**. If you use nvm, you can simple type on your terminal `nvm install v16.13.0`.

Before you can run the project you need to copy `.env.template` to `.env` in each package except `common`. This is to ensure that everything will work correctly.

Once done, you can take a look at the main `package.json` to see all the preconfigured scripts I added to get started, but the most typical one is the final one:

```bash
yarn dev:bundle
```

> This ensures the latest code is pushed from GitHub, all the NPM packages are installed, all the packages are compiled, and then opens the Frontend and Prisma Studio on your browser, and finally launches all the projects. There is probably a more efficient way to do this, but this is how I do things.

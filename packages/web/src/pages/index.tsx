import Head from "next/head";
import React from "react";

import { trpc } from "@/lib/trpc";

const Home: React.FC = () => {
   const { isLoading, data } = trpc.useQuery(["test-query"]);

   if (isLoading || !data) return <div className="p-3">Loading...</div>;

   return (
      <>
         <Head>
            <title>trpc-monorepo</title>
         </Head>
         <div className="p-3">
            <h1 className="font-medium text-3xl mb-2">{data.message}</h1>
            <a
               href="http://localhost:5000/api/trpc/test-prisma"
               className="text-blue-500 hover:text-blue-600 duration-150 hover:underline"
               target="_blank"
            >
               test prisma query (trpc path)
            </a>
            <br />
            <a
               href="http://localhost:5000/api/test-prisma"
               className="text-blue-500 hover:text-blue-600 duration-150 hover:underline"
               target="_blank"
            >
               test prisma query (from express)
            </a>
         </div>
      </>
   );
};

export default Home;

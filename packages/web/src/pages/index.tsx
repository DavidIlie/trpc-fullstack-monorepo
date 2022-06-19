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
            <h1 className="mb-2 text-3xl font-medium">{data.message}</h1>
            <a
               href={`${process.env.NEXT_PUBLIC_API_URL}/api/trpc/test-prisma`}
               className="text-blue-500 duration-150 hover:text-blue-600 hover:underline"
               target="_blank"
            >
               test prisma query (trpc path)
            </a>
            <br />
            <a
               href={`${process.env.NEXT_PUBLIC_API_URL}api/test-prisma`}
               className="text-blue-500 duration-150 hover:text-blue-600 hover:underline"
               target="_blank"
            >
               test prisma query (from express)
            </a>
         </div>
      </>
   );
};

export default Home;

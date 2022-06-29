import React from "react";
import Link from "next/link";
import Head from "next/head";

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
            <Link href="/api/trpc/test-prisma" target="_blank">
               <a className="text-blue-500 duration-150 hover:text-blue-600 hover:underline">
                  test prisma query (trpc path)
               </a>
            </Link>
         </div>
      </>
   );
};

export default Home;

import React from "react";

import { trpc } from "@/lib/trpc";

const Home: React.FC = () => {
   const { isLoading, data } = trpc.useQuery(["hello", { name: "david" }]);

   if (isLoading || !data) return <div>Loading...</div>;

   return <h1 className="p-3 text-2xl font-medium">{data.message}</h1>;
};

export default Home;

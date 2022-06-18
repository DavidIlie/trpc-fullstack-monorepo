import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "@trpc-monorepo/trpc";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
   return <Component {...pageProps} />;
};

export default withTRPC<AppRouter>({
   config({ ctx }) {
      const url =
         `${process.env.NEXT_PUBLIC_API_URL}/api/trpc` ||
         `http://localhost:5000/api/trpc`;
      return {
         url,
      };
   },
   ssr: false,
})(MyApp);

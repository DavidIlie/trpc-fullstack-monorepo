import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "@trpc-monorepo/trpc";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
   return <Component {...pageProps} />;
};

export default withTRPC<AppRouter>({
   config() {
      const url = process.env.VERCEL_URL
         ? `https://${process.env.VERCEL_URL}/api/trpc`
         : "http://localhost:3000/api/trpc";
      return {
         url,
      };
   },
   ssr: false,
})(MyApp);

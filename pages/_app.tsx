import type { AppProps } from "next/app";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import Layout from "@/components/Layout";
import Prefetch from "@/features/auth/Prefetch";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ session: Session }>): JSX.Element {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <Prefetch>
            <Component {...pageProps} />
          </Prefetch>
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;

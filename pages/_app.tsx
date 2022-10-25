import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { store } from "@/app/store"
import { Provider } from "react-redux"
import Layout from "@/components/Layout"
import Prefetch from "@/features/auth/Prefetch"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Prefetch>
          <Component {...pageProps} />
        </Prefetch>
      </Layout>
    </Provider>
  )
}

export default MyApp

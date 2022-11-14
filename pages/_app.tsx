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
import { SessionProvider } from "next-auth/react"
import Wrapper from "@/features/auth/wrapper"
import { useEffect } from "react"
import router from "next/router"


type typeSession = {
  token?: string
}


function MyApp({ Component, pageProps:{ session, ...pageProps }}: any) {

  // useEffect(() => {
  //   if (!pageProps.session) {
  //     if (!router.pathname.includes("/auth/signin")) {
  //       router.push('/signin');
  //     }
  //   }
  // }, []);
  return (
    <SessionProvider session={pageProps.session}>
              {/* <Wrapper> */}


    <Provider store={store}>
      <Layout>
        <Prefetch>
      
          <Component {...pageProps} />
        </Prefetch>
      </Layout>
    </Provider>
    {/* </Wrapper> */}

  
    </SessionProvider>
 
  )
}

export default MyApp


// function signIn(): string | import("url").UrlObject {
//   throw new Error("Function not implemented.")
// }
// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   )
// }

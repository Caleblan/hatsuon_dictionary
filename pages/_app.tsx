import '../styles/globals.css'
// import '../styles/Home.module.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { CookiesProvider } from "react-cookie";
// Custom Components
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer';


export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <CookiesProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </CookiesProvider>
  )
}

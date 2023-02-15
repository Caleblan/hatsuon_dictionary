import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { CookiesProvider } from "react-cookie";

// Custom Components
import Header from '../components/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="calandry" data-description="Support me on Buy me a coffee!" data-message="" data-color="#FF5F5F" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
      </Head>
      <Header/>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}

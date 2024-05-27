import '../styles/globals.css'
import '../styles/markdown-editor.css'
import type { AppProps } from 'next/app'
import Layout from "../components/Layout";
import PlausibleProvider from "next-plausible";

function App({ Component, pageProps }: AppProps) {
  return (
      <PlausibleProvider trackOutboundLinks trackFileDownloads domain="pistonmaster.net">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PlausibleProvider>
  )
}

// noinspection JSUnusedGlobalSymbols
export default App

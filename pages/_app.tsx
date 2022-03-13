import '../styles/globals.css'
import '../styles/fonts.css'
import '../styles/editor/markdown-editor.css'
import type { AppProps } from 'next/app'
import Layout from "../components/Layout";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function App({ Component, pageProps }: AppProps) {
  return <Layout><Component {...pageProps} /></Layout>
}

// noinspection JSUnusedGlobalSymbols
export default App

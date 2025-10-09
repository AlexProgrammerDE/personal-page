import '../styles/globals.css'
import PlausibleProvider from "next-plausible";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {Inter} from "next/font/google";
import {Metadata, Viewport} from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://pistonmaster.net'),
  title: {
    default: 'AlexProgrammerDE',
    template: '%s - AlexProgrammerDE'
  },
  description: 'Coding as a hobby and creating cool stuff!',
  generator: 'Next.js',
  other: {
    'msapplication-TileColor': "#C970D9"
  },
  twitter: {
    images: "https://pistonmaster.net/pfp.png",
    site: 'https://pistonmaster.net',
    card: "summary"
  },
  openGraph: {
    images: "https://pistonmaster.net/pfp.png",
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    url: './',
    locale: 'en_US',
    type: 'website'
  },
  alternates: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    canonical: './'
  }
}

export const viewport: Viewport = {
  themeColor: "#C970D9"
}

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: '--font-inter',
})

// noinspection JSUnusedGlobalSymbols
export default function Layout({children}) {
  return (
      <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <PlausibleProvider trackOutboundLinks trackFileDownloads domain="pistonmaster.net"/>
      </head>
      <body>
      <div
          className={`min-h-screen min-w-screen flex flex-col z-50 bg-background text-text scroller ${inter.variable} font-sans`}>
        <NavBar/>
        {children}
        <Footer/>
      </div>
      </body>
      </html>
  )
}

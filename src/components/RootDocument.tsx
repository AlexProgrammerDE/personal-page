import { HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";

import Footer from "~/components/Footer";
import NavBar from "~/components/NavBar";

export default function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="Li9Zohcg8tS+MWVE76W/4Q"
          async
        />
      </head>
      <body>
        <div className="z-50 flex min-h-screen min-w-screen flex-col bg-background font-sans text-text">
          <NavBar />
          {children}
          <Footer />
        </div>
        <Scripts />
      </body>
    </html>
  );
}

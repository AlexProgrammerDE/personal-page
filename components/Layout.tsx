import NavBar from "./NavBar";
import Footer from "./Footer";
import {ReactNode} from "react";
import {Inter} from "next/font/google";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: '--font-inter',
})

const Layout = ({children}: { children: ReactNode }) => {
  return (
      <div
          className={`min-h-screen min-w-screen flex flex-col z-50 bg-background text-text scroller ${inter.variable} font-sans`}>
        <NavBar/>
        {children}
        <Footer/>
      </div>
  );
};

export default Layout;

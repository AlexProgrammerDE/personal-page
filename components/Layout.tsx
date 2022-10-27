import NavBar from "./NavBar";
import Footer from "./Footer";
import {ReactNode} from "react";
import {Inter} from "@next/font/google";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
})

const Layout = ({children}: { children: ReactNode }) => {
  return (
      <div
          className={"min-h-screen min-w-screen flex flex-col z-50 bg-background text-text scroller " + inter.className}>
        <NavBar/>
        {children}
        <Footer/>
      </div>
  );
};

export default Layout;

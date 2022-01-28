import { NextPage } from "next";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout: NextPage = ({ children }) => {
    return (
        <div className="min-h-screen min-w-screen flex flex-col z-50 bg-background text-text scroller">
            <NavBar />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;

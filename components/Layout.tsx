import NavBar from "./NavBar";
import Footer from "./Footer";
import {ReactNode} from "react";

const Layout = ({ children }: {children: ReactNode}) => {
    return (
        <div className="min-h-screen min-w-screen flex flex-col z-50 bg-background text-text scroller">
                <NavBar />
                {children}
                <Footer />
        </div>
    );
};

export default Layout;

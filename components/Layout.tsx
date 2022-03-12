import { NextPage } from "next";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Twemoji from 'react-twemoji';

const Layout: NextPage = ({ children }) => {
    return (
        <div className="min-h-screen min-w-screen flex flex-col z-50 bg-background text-text scroller">
            <Twemoji>
                <NavBar />
                {children}
                <Footer />
            </Twemoji>
        </div>
    );
};

export default Layout;

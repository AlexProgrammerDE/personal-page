import Link from "next/link";
import {useState} from "react";

export default function NavBar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="text-xl header text-text font-bold h-20">
            <div className="container flex flex-col md:items-center md:justify-between md:flex-row">
                <div className="flex flex-row items-center justify-between w-full">
                    <h2 className="font-bold text-lg md:text-2xl m-4">AlexProgrammerDE</h2>
                    <button aria-label="Expand navigation bar"
                            className="justify-self-end md:hidden rounded-lg focus:outline-none focus:shadow-outline mr-8"
                            onClick={() => setOpen(!open)}>
                        <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                            {
                                open ?
                                    <path fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd" />
                                    :
                                    <path fillRule="evenodd"
                                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                          clipRule="evenodd" />
                            }
                        </svg>
                    </button>
                </div>
                <nav className={`${open ? "flex" : "hidden"} flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}>
                    <div className="text-center p-1 md:p-5">
                        <Link href="/" className="nav">
                            Home
                        </Link>
                    </div>
                    <div className="text-center p-1 md:p-5">
                        <a className="nav" href="/discord">
                            Discord
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
}

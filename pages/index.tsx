import type {NextPage} from 'next'
import GlobalHead from "../components/GlobalHead";

const Home: NextPage = () => {
    return (
        <>
            <GlobalHead/>

            <main className="w-full flex-col">
                <header className="header-size w-full flex flex flex-col justify-center">
                    <div className="flex-grow flex justify-center text-center">
                        <div className="flex flex-col justify-center">
                            <h1 className="text-2xl md:text-5xl font-bold mb-4">AlexProgrammerDE</h1>
                            <p className="text-lg md:text-2xl">Hi! I&apos;m Alex. Welcome to my page!</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center mb-4">
                        <a href="#projects"
                           className="z-20 rounded-full border-2 border-content animate-bounce bg-brighter h-12 w-12 flex flex-col justify-center">
                            <div className="flex flex-row justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                                </svg>
                            </div>
                        </a>
                    </div>
                    <div className="landing-diagonal-shadow absolute justify-self-end z-10">
                        <div
                            className="header-size w-screen landing-diagonal"/>
                    </div>
                </header>

                <section id="projects" className="w-full h-screen bg-section">
                    <div className="container">

                    </div>
                </section>

                <section className="w-full h-40">
                    <div className="container">

                    </div>
                </section>

                <section className="w-full h-40 bg-section">
                    <div className="container">

                    </div>
                </section>

                <section className="w-full h-40">
                    <div className="container">

                    </div>
                </section>
                <h1 className="">
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <p className="">
                    Get started by editing{' '}
                    <code className="">pages/index.tsx</code>
                </p>
            </main>
        </>
    )
}

// noinspection JSUnusedGlobalSymbols
export default Home

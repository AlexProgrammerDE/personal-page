import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import GlobalHead from "../components/GlobalHead";

const Home: NextPage = () => {
  return (
    <>
      <GlobalHead/>

      <main className="w-full flex-col">
        <header className="header-size w-full flex flex flex-col justify-center">
          <div className="flex flex-row justify-center">
            <div className="flex flex-col justify-center text-center">
              <h1 className="text-5xl font-bold mb-4">AlexProgrammerDE</h1>
              <p className="text-2xl">Hi! I&apos;m Alex. Welcome to my page!</p>
            </div>
          </div>

        </header>
        <section className="w-full h-40 bg-section">
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

        <div className="">
          <a href="https://nextjs.org/docs" className="">
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="">
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              className=""
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>
        </div>
      </main>
    </>
  )
}

// noinspection JSUnusedGlobalSymbols
export default Home

import Image from 'next/image';
import Code404 from '../public/404.png'

export default function Custom404() {
  return (
      <header className="header-size w-full flex flex-col justify-center px-2">
        <div className="grow flex justify-center text-center">
          <div className="flex flex-col justify-center z-20">
            <h1 className="text-2xl md:text-5xl font-bold mb-4">404 - Cat Not Found</h1>
            <Image alt="Cat hidden under some paper" src={Code404}/>
          </div>
        </div>
      </header>
  )
}

export default function Custom404() {
  return (
    <header className="header-size flex w-full flex-col justify-center px-2">
      <div className="flex grow justify-center text-center">
        <div className="z-20 flex flex-col justify-center">
          <h1 className="mb-4 text-2xl font-bold md:text-5xl">
            404 - Cat Not Found
          </h1>
          <img alt="Cat hidden under some paper" src="/404.png" />
        </div>
      </div>
    </header>
  );
}

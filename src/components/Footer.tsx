export default function Footer() {
  return (
    <footer className="container mx-auto mb-4 flex h-12 w-full flex-col justify-center md:h-6 md:flex-row">
      <p className="mx-auto flex flex-row justify-center md:mx-0.5">
        Powered by ❤️ and{" "}
        <a
          className="ml-1 text-fuchsia-400"
          href="https://github.com/AlexProgrammerDE/personal-page"
        >
          open source
        </a>
        !
      </p>
      <p className="mx-auto flex flex-row md:mx-0.5">Made in 🇩🇪</p>
    </footer>
  );
}

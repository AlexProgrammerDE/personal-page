export default function Footer() {
  return (
    <footer className="w-full mx-auto mb-4 container flex flex-col md:flex-row justify-center h-12 md:h-6">
      <p className="mx-auto md:mx-0.5 flex flex-row justify-center">
        Powered by ❤️ and{" "}
        <a
          className="ml-1 text-fuchsia-400"
          href="https://github.com/AlexProgrammerDE/personal-page"
        >
          open source
        </a>
        !
      </p>
      <p className="mx-auto md:mx-0.5 flex flex-row">Made in 🇩🇪</p>
    </footer>
  );
}

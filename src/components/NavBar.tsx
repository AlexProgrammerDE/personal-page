import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";

export default function NavBar() {
  return (
    <header className="header h-20 text-xl font-bold text-text">
      <nav className="container flex grow flex-row justify-end pb-0">
        <div className="p-5 text-center">
          <a href="https://github.com/AlexProgrammerDE" className="nav">
            <SiGithub className="h-8 w-fit" />
          </a>
        </div>
        <div className="p-5 text-center">
          <a href="https://discord.gg/F4ZyEtXXge" className="nav">
            <SiDiscord className="h-8 w-fit" />
          </a>
        </div>
      </nav>
    </header>
  );
}

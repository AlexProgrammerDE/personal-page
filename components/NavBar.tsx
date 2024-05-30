import {DiscordIcon, GitHubIcon} from "./icons";

export default function NavBar() {
  return (
      <header className="text-xl header text-text font-bold h-20">
        <nav className="container flex flex-row flex-grow pb-0 justify-end">
          <div className="text-center p-5">
            <a href="https://github.com/AlexProgrammerDE" className="nav">
              <GitHubIcon className="h-8"/>
            </a>
          </div>
          <div className="text-center p-5">
            <a href="https://discord.gg/F4ZyEtXXge" className="nav">
              <DiscordIcon className="h-8"/>
            </a>
          </div>
        </nav>
      </header>
  );
}

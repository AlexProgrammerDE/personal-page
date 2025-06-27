import {SiDiscord, SiGithub} from "@icons-pack/react-simple-icons";

export default function NavBar() {
  return (
      <header className="text-xl header text-text font-bold h-20">
        <nav className="container flex flex-row grow pb-0 justify-end">
          <div className="text-center p-5">
            <a href="https://github.com/AlexProgrammerDE" className="nav">
              <SiGithub className="h-8 w-fit"/>
            </a>
          </div>
          <div className="text-center p-5">
            <a href="https://discord.gg/F4ZyEtXXge" className="nav">
              <SiDiscord className="h-8 w-fit"/>
            </a>
          </div>
        </nav>
      </header>
  );
}

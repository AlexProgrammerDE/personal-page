import {
  SiBluesky,
  SiGithub,
  SiModrinth,
  SiNamemc,
  SiSpotify,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { ArrowDownIcon } from "lucide-react";
import * as motion from "motion/react-client";

import type { Repository, UserData } from "~/lib/github-types";
import { cn } from "~/lib/utils";

import AboutMeBlock from "../components/AboutMeBlock";
import RepositoryCard from "../components/RepositoryCard";

const badges = [
  {
    badge:
      "Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white",
    width: 101.75,
    height: 28,
  },
  {
    badge:
      "dependabot-025E8C?style=for-the-badge&logo=dependabot&logoColor=white",
    width: 132.5,
    height: 28,
  },
  {
    badge: "MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white",
    width: 106.75,
    height: 28,
  },
  {
    badge:
      "webstorm-143?style=for-the-badge&logo=webstorm&logoColor=white&color=black",
    width: 119,
    height: 28,
  },
  {
    badge: "css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white",
    width: 77,
    height: 28,
  },
  {
    badge:
      "javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E",
    width: 126.5,
    height: 28,
  },
  {
    badge:
      "Microsoft_Office-D83B01?style=for-the-badge&logo=microsoft-office&logoColor=white",
    width: 175,
    height: 28,
  },
  {
    badge: "Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black",
    width: 86.25,
    height: 28,
  },
  {
    badge:
      "github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white",
    width: 160.5,
    height: 28,
  },
  {
    badge: "java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white",
    width: 57,
    height: 28,
  },
  {
    badge:
      "MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white",
    width: 110.75,
    height: 28,
  },
  {
    badge: "mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white",
    width: 88.25,
    height: 28,
  },
  {
    badge:
      "typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white",
    width: 126.5,
    height: 28,
  },
  {
    badge: "Debian-D70A53?style=for-the-badge&logo=debian&logoColor=white",
    width: 95.5,
    height: 28,
  },
  {
    badge: "Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white",
    width: 101.75,
    height: 28,
  },
  {
    badge: "html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white",
    width: 88.25,
    height: 28,
  },
  {
    badge: "node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white",
    width: 100.75,
    height: 28,
  },
  {
    badge: "Gimp-657D8B?style=for-the-badge&logo=gimp&logoColor=FFFFFF",
    width: 79,
    height: 28,
  },
  {
    badge: "Next-black?style=for-the-badge&logo=next.js&logoColor=white",
    width: 78,
    height: 28,
  },
  {
    badge:
      "react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
    width: 86.25,
    height: 28,
  },
  {
    badge:
      "IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white",
    width: 138,
    height: 28,
  },
  {
    badge:
      "vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white",
    width: 93.5,
    height: 28,
  },
  {
    badge: "NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white",
    width: 72.75,
    height: 28,
  },
  {
    badge: "google-4285F4?style=for-the-badge&logo=google&logoColor=white",
    width: 97.5,
    height: 28,
  },
  {
    badge:
      "jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white",
    width: 101.75,
    height: 28,
  },
  {
    badge: "Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white",
    width: 96.5,
    height: 28,
  },
  {
    badge: "-RaspberryPi-C51A4A?style=for-the-badge&logo=Raspberry-Pi",
    width: 137.75,
    height: 28,
  },
  {
    badge: "git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white",
    width: 67.75,
    height: 28,
  },
  {
    badge:
      "github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white",
    width: 95.5,
    height: 28,
  },
  {
    badge:
      "docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white",
    width: 97.5,
    height: 28,
  },
  {
    badge:
      "Playstation%204-003791?style=for-the-badge&logo=playstation-4&logoColor=white",
    width: 150.25,
    height: 28,
  },
  {
    badge:
      "lineageos-167C80?style=for-the-badge&logo=lineageos&logoColor=white",
    width: 120.25,
    height: 28,
  },
  {
    badge: "Android-3DDC84?style=for-the-badge&logo=android&logoColor=white",
    width: 106.75,
    height: 28,
  },
  {
    badge: "nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white",
    width: 88.25,
    height: 28,
  },
  {
    badge: "Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white",
    width: 112.75,
    height: 28,
  },
  {
    badge:
      "Microsoft-0078D4?style=for-the-badge&logo=microsoft&logoColor=white",
    width: 122.25,
    height: 28,
  },
  {
    badge: "Pop!_OS-48B9C7?style=for-the-badge&logo=Pop!_OS&logoColor=white",
    width: 98.75,
    height: 28,
  },
  {
    badge:
      "Samsung-%231428A0.svg?style=for-the-badge&logo=samsung&logoColor=white",
    width: 108.75,
    height: 28,
  },
];

export default function Index({
  userData,
  repositories,
}: {
  userData: UserData;
  repositories: Repository[];
}) {
  return (
    <main className="w-full flex-col">
      <header className="header-size flex w-full flex-col justify-center">
        <div className="flex grow justify-center text-center">
          <div className="z-20 flex flex-col justify-center">
            <h1 className="mb-4 text-2xl font-extrabold md:text-5xl">
              Hi 👋, I&apos;m Alex
            </h1>
            <p className="mb-4 text-lg font-extrabold md:text-xl">
              Freelance Student and Open-Source Developer
            </p>
          </div>
        </div>
        <div className="mb-4 flex flex-row justify-center">
          <a
            href="#projects"
            className="z-20 flex h-12 w-12 animate-bounce flex-col justify-center rounded-full bg-brighter"
          >
            <div className="flex flex-row justify-center">
              <ArrowDownIcon className="h-8 w-8" />
            </div>
          </a>
        </div>
        <div className="header-size absolute z-10 w-screen max-w-full bg-section landing-diagonal md:landing-diagonal-md" />
      </header>
      <section id="projects" className="min-h-screen w-full bg-section">
        <div className="z-20 container flex h-full flex-col p-2 pt-4">
          <h2 className="mt-4 text-2xl font-bold md:text-5xl">Projects</h2>
          <div className="mt-6 mb-4 grid grid-cols-1 gap-4 md:mt-20 md:mb-14 md:grid-cols-2 md:gap-8">
            {repositories.map((repo, index) => (
              <div
                key={repo.url}
                className={cn({
                  "hidden md:block": index > 3,
                })}
              >
                <RepositoryCard repo={repo} />
              </div>
            ))}
          </div>
          <div className="mb-2 flex grow flex-row justify-center">
            <motion.a
              whileHover={{
                scale: 1.05,
                transition: {
                  duration: 0.25,
                },
              }}
              whileTap={{
                scale: 0.95,
                transition: {
                  duration: 0.25,
                },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              href="https://github.com/AlexProgrammerDE?tab=repositories"
              className="hover:bg-section-darkest rounded-md bg-section-dark px-4 py-1.5 text-2xl font-bold shadow-md"
            >
              And more!
            </motion.a>
          </div>
        </div>
      </section>
      <section
        id="about-me"
        className="flex min-h-screen w-full flex-col bg-content"
      >
        <div className="section2-diagonal absolute z-10 h-screen w-screen max-w-full bg-section" />
        <div className="z-20 container mt-24 flex min-h-screen flex-col p-2 pb-8">
          <AboutMeBlock />
        </div>
      </section>
      <section id="stats" className="min-h-screen w-full bg-section shadow-2xl">
        <div className="container p-6">
          <div className="mx-auto my-auto flex flex-col gap-4">
            <div className="mx-auto flex flex-col md:flex-row">
              <img
                width={300}
                height={165}
                className="mx-auto md:mr-2"
                alt="AlexProgrammer GitHub language stats"
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=alexprogrammerde&layout=compact&theme=dark"
              />
              <img
                width={450}
                height={165}
                className="mx-auto mt-2 md:mt-0 md:ml-2"
                alt="AlexProgrammer GitHub general stats"
                src="https://github-readme-stats.vercel.app/api?username=alexprogrammerde&hide_title=true&theme=dark"
              />
            </div>
            <div className="mx-auto flex flex-col md:flex-row">
              <a
                className="mr-2"
                href="https://open.spotify.com/user/songraper"
              >
                <img
                  width={400}
                  height={330}
                  alt="Spotify Recently Played Songs"
                  src="https://spotify-recently-played-readme.vercel.app/api?user=songraper"
                />
              </a>
              <div className="mt-4 flex h-full flex-row rounded-md bg-[#24292E] p-2 md:mt-0 md:ml-2">
                <div className="mx-auto inline-flex rounded-md border-8 border-[#24292E]">
                  <img
                    title={userData.bio}
                    src={userData.avatar}
                    width={110}
                    height={110}
                    alt={userData.name}
                    className="rounded-md"
                  />
                </div>
                <div className="my-auto mr-2 flex flex-col md:ml-2">
                  <div className="inline-flex flex-row">
                    <h4 className="text-lg font-bold">
                      {userData.followers} Followers
                    </h4>
                  </div>
                  <div className="inline-flex flex-row">
                    <h4 className="text-lg font-bold">
                      {userData.repoCount} Repositories
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="mx-auto mt-4 text-3xl font-bold">Me in badges</h3>
            <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.badge}
                  className={cn("cursor-pointer", {
                    "hidden md:block": index > 25,
                  })}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    rotateZ: 3,
                    scale: 1.2,
                    transition: {
                      duration: 0.25,
                    },
                  }}
                  whileTap={{
                    scale: 0.9,
                    transition: {
                      duration: 0.25,
                    },
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  variants={{
                    hidden: {
                      scale: 0.95,
                      opacity: 0,
                      transition: {
                        delay: 0.25,
                      },
                    },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        delay: 0.25,
                      },
                    },
                  }}
                >
                  <img
                    alt="AlexProgrammerDE badge"
                    width={badge.width}
                    height={badge.height}
                    src={`https://img.shields.io/badge/${badge.badge}`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="footer-size w-full md:footer-size-md">
        <div className="footer-size container flex flex-col justify-center md:footer-size-md">
          <div className="flex flex-col justify-center md:flex-row">
            <div className="mx-4 mb-3 flex flex-col md:mb-0">
              <p className="mb-2 text-3xl font-bold">Like my work?</p>
              <div className="flex flex-row md:justify-center">
                <a
                  href="https://github.com/AlexProgrammerDE"
                  className="flex flex-row rounded-md bg-[#24292E] px-4 py-2.5 font-bold shadow-lg"
                >
                  <p className="mr-2 flex flex-col justify-center">
                    Follow me on
                  </p>
                  <SiGithub className="h-8 w-fit fill-current" />
                </a>
              </div>
            </div>
            <div className="mx-4 w-[90vw] border md:mx-0 md:w-0.5" />
            <div className="mx-4 mt-3 flex flex-col md:mt-0">
              <div className="mb-2 flex flex-wrap gap-2">
                <a
                  title="Bluesky"
                  href="https://bsky.app/profile/pistondev.bsky.social"
                >
                  <SiBluesky width="24" height="24" className="fill-current" />
                </a>
                <a
                  title="Spotify"
                  href="https://open.spotify.com/user/songraper"
                >
                  <SiSpotify width="24" height="24" className="fill-current" />
                </a>
                <a
                  title="Youtube"
                  href="https://www.youtube.com/channel/UC86szSBHNiuIXC7hIfrMYtg"
                >
                  <SiYoutube width="24" height="24" className="fill-current" />
                </a>
                <a
                  title="Modrinth"
                  href="https://modrinth.com/user/pistonmaster"
                >
                  <SiModrinth width="24" height="24" className="fill-current" />
                </a>
                <a
                  title="NameMC"
                  href="https://namemc.com/profile/Pistonmaster.1"
                >
                  <SiNamemc width="24" height="24" className="fill-current" />
                </a>
              </div>
              <a href="https://discord.gg/B7mW9b3KhS" title="Discord Server">
                <img
                  width={320}
                  height={76}
                  alt="Discord Server Invite Banner"
                  className="shadow-xl"
                  src="https://discord.com/api/guilds/739784741124833301/widget.png?style=banner2"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

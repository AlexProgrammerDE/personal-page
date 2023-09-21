import type {NextPage} from 'next'
import GlobalHead from "../components/GlobalHead";
import {getOrganizations, getRepositories, getUserData} from "../lib/github";
import RepositoryCard from "../components/RepositoryCard";
import Image from 'next/image';
import AboutMeBlock from "../components/AboutMeBlock";
import {Organization, Repository, UserData} from "../lib/github-types";
import {CubeIcon} from "@heroicons/react/20/solid";
import cn from "classnames";
import {motion} from "framer-motion";

const badges = [
  {
    badge: 'Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white',
    width: 101.75,
    height: 28
  },
  {
    badge: 'dependabot-025E8C?style=for-the-badge&logo=dependabot&logoColor=white',
    width: 132.5,
    height: 28
  },
  {
    badge: 'MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white',
    width: 106.75,
    height: 28
  },
  {
    badge: 'webstorm-143?style=for-the-badge&logo=webstorm&logoColor=white&color=black',
    width: 119,
    height: 28
  },
  {
    badge: 'css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white',
    width: 77,
    height: 28
  },
  {
    badge: 'javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E',
    width: 126.5,
    height: 28
  },
  {
    badge: 'sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white',
    width: 92.5,
    height: 28
  },
  {
    badge: 'Microsoft_Office-D83B01?style=for-the-badge&logo=microsoft-office&logoColor=white',
    width: 175,
    height: 28
  },
  {
    badge: 'Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black',
    width: 86.25,
    height: 28
  },
  {
    badge: 'github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white',
    width: 160.5,
    height: 28
  },
  {
    badge: 'java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white',
    width: 57,
    height: 28
  },
  {
    badge: 'MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white',
    width: 110.75,
    height: 28
  },
  {
    badge: 'Google%20Drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white',
    width: 144,
    height: 28
  },
  {
    badge: 'mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white',
    width: 88.25,
    height: 28
  },
  {
    badge: 'MDN_Web_Docs-black?style=for-the-badge&logo=mdnwebdocs&logoColor=white',
    width: 148,
    height: 28
  },
  {
    badge: 'typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white',
    width: 126.5,
    height: 28
  },
  {
    badge: 'Debian-D70A53?style=for-the-badge&logo=debian&logoColor=white',
    width: 95.5,
    height: 28
  },
  {
    badge: 'PSN-%230070D1.svg?style=for-the-badge&logo=Playstation&logoColor=white',
    width: 69.75,
    height: 28
  },
  {
    badge: 'epicgames-%23313131.svg?style=for-the-badge&logo=epicgames&logoColor=white',
    width: 121.25,
    height: 28
  },
  {
    badge: 'Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white',
    width: 101.75,
    height: 28
  },
  {
    badge: 'html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white',
    width: 88.25,
    height: 28
  },
  {
    badge: 'node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white',
    width: 100.75,
    height: 28
  },
  {
    badge: 'StackExchange-%23ffffff.svg?style=for-the-badge&logo=StackExchange&logoColor=white',
    width: 157.25,
    height: 28
  },
  {
    badge: '-Stackoverflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white',
    width: 160.25,
    height: 28
  },
  {
    badge: 'Gimp-657D8B?style=for-the-badge&logo=gimp&logoColor=FFFFFF',
    width: 79,
    height: 28
  },
  {
    badge: 'Next-black?style=for-the-badge&logo=next.js&logoColor=white',
    width: 78,
    height: 28
  },
  {
    badge: 'Krita-203759?style=for-the-badge&logo=krita&logoColor=EEF37B',
    width: 85.25,
    height: 28
  },
  {
    badge: 'Nuxt-black?style=for-the-badge&logo=nuxt.js&logoColor=white',
    width: 80,
    height: 28
  },
  {
    badge: 'react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB',
    width: 86.25,
    height: 28
  },
  {
    badge: 'Wikipedia-%23000000.svg?style=for-the-badge&logo=wikipedia&logoColor=white',
    width: 120.25,
    height: 28
  },
  {
    badge: 'c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white',
    width: 61.5,
    height: 28
  },
  {
    badge: 'markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white',
    width: 123,
    height: 28
  },
  {
    badge: 'yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white',
    width: 80,
    height: 28
  },
  {
    badge: 'vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D',
    width: 85.25,
    height: 28
  },
  {
    badge: 'IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white',
    width: 138,
    height: 28
  },
  {
    badge: 'vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white',
    width: 93.5,
    height: 28
  },
  {
    badge: 'PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white',
    width: 94.5,
    height: 28
  },
  {
    badge: 'NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white',
    width: 72.75,
    height: 28
  },
  {
    badge: 'Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white',
    width: 135.75,
    height: 28
  },
  {
    badge: 'google-4285F4?style=for-the-badge&logo=google&logoColor=white',
    width: 97.5,
    height: 28
  },
  {
    badge: 'jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white',
    width: 101.75,
    height: 28
  },
  {
    badge: 'Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white',
    width: 96.5,
    height: 28
  },
  {
    badge: '-RaspberryPi-C51A4A?style=for-the-badge&logo=Raspberry-Pi',
    width: 137.75,
    height: 28
  },
  {
    badge: 'Amazon%20Prime-0F79AF?style=for-the-badge&logo=amazonprime&logoColor=white',
    width: 148,
    height: 28
  },
  {
    badge: 'DuckDuckGo-DE5833?style=for-the-badge&logo=DuckDuckGo&logoColor=white',
    width: 135.5,
    height: 28
  },
  {
    badge: 'Netflix-E50914?style=for-the-badge&logo=netflix&logoColor=white',
    width: 100.75,
    height: 28
  },
  {
    badge: 'git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white',
    width: 67.75,
    height: 28
  },
  {
    badge: 'github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white',
    width: 95.5,
    height: 28
  },
  {
    badge: 'docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white',
    width: 97.5,
    height: 28
  },
  {
    badge: 'Playstation%204-003791?style=for-the-badge&logo=playstation-4&logoColor=white',
    width: 150.25,
    height: 28
  },
  {
    badge: 'lineageos-167C80?style=for-the-badge&logo=lineageos&logoColor=white',
    width: 120.25,
    height: 28
  },
  {
    badge: 'Android-3DDC84?style=for-the-badge&logo=android&logoColor=white',
    width: 106.75,
    height: 28
  },
  {
    badge: 'shazam-1476FE?style=for-the-badge&logo=shazam&logoColor=white',
    width: 98.5,
    height: 28
  },
  {
    badge: 'nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white',
    width: 88.25,
    height: 28
  },
  {
    badge: 'Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white',
    width: 112.75,
    height: 28
  },
  {
    badge: 'Microsoft-0078D4?style=for-the-badge&logo=microsoft&logoColor=white',
    width: 122.25,
    height: 28
  },
  {
    badge: 'Pop!_OS-48B9C7?style=for-the-badge&logo=Pop!_OS&logoColor=white',
    width: 98.75,
    height: 28
  },
  {
    badge: 'Samsung-%231428A0.svg?style=for-the-badge&logo=samsung&logoColor=white',
    width: 108.75,
    height: 28
  }
]

const user = "AlexProgrammerDE"

type PageProps = {
  userData: UserData
  repositories: Repository[]
  organizations: Organization[]
}

const Home: NextPage<PageProps> = (props: PageProps) => {
  return (
      <>
        <GlobalHead/>
        <main className="w-full flex-col">
          <header className="header-size w-full flex flex-col justify-center">
            <div className="flex-grow flex justify-center text-center">
              <div className="flex flex-col justify-center z-20">
                <h1 className="text-2xl md:text-5xl font-extrabold mb-4">AlexProgrammerDE</h1>
                <p className="text-lg md:text-2xl">Hi! I&apos;m Alex. Welcome to my page!</p>
              </div>
            </div>
            <div className="flex flex-row justify-center mb-4">
              <a href="#projects"
                 className="z-20 rounded-full animate-bounce bg-brighter h-12 w-12 flex flex-col justify-center">
                <div className="flex flex-row justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                  </svg>
                </div>
              </a>
            </div>
            <div
                className="w-screen max-w-full absolute z-10 header-size bg-section landing-diagonal md:landing-diagonal-md"/>
          </header>

          <section id="projects" className="w-full min-h-screen bg-section">
            <div className="container h-full p-2 pt-4 z-20 flex flex-col">
              <h2 className="text-2xl md:text-5xl font-bold mt-4">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-6 md:mt-20 mb-4 md:mb-14">
                {
                  props.repositories.map((repo, index) => (
                      <div key={index} className={index > 3 ? "hidden md:block" : ""}>
                        <RepositoryCard repo={repo}/>
                      </div>
                  ))
                }
              </div>
              <div className="flex-grow flex flex-row justify-center mb-2">
                <motion.a
                    whileHover={{
                      scale: 1.05,
                      transition: {
                        duration: .5,
                      }
                    }}
                    whileTap={{
                      scale: 0.95,
                      transition: {
                        duration: .5,
                      }
                    }}
                    transition={{type: "spring", stiffness: 400, damping: 10}}
                    href="https://github.com/AlexProgrammerDE?tab=repositories"
                    className="px-4 py-1.5 font-bold shadow-md bg-sectionDark hover:bg-sectionDarkest rounded-lg text-2xl">
                  And more!
                </motion.a>
              </div>
            </div>
          </section>

          <section id="about-me" className="w-full min-h-screen bg-content flex flex-col shadow-2xl">
            <div
                className="h-screen w-screen max-w-full absolute z-10 bg-section section2-diagonal"/>
            <div className="container min-h-screen p-2 pb-8 flex flex-col z-20 mt-24">
              <AboutMeBlock/>
            </div>
          </section>

          <section id="stats" className="w-full min-h-screen bg-section shadow-2xl">
            <div className="container p-6">
              <div
                  className="flex flex-col gap-4 my-auto mx-auto">
                <div className="flex flex-col md:flex-row mx-auto">
                  <img className="mx-auto md:mr-2"
                       alt="AlexProgrammer GitHub language stats"
                       src="https://github-readme-stats.vercel.app/api/top-langs/?username=alexprogrammerde&layout=compact&theme=dark"/>
                  <img className="mx-auto mt-2 md:mt-0 md:ml-2"
                       alt="AlexProgrammer GitHub general stats"
                       src="https://github-readme-stats.vercel.app/api?username=alexprogrammerde&hide_title=true&theme=dark"/>
                </div>
                <div className="flex flex-col md:flex-row mx-auto">
                  <a className="mr-2"
                     href="https://open.spotify.com/user/songraper">
                    <img width={400} height={330} alt="Spotify Recently Played Songs"
                         src="https://spotify-recently-played-readme.vercel.app/api?user=songraper"/>
                  </a>
                  <div
                      className="h-full rounded-xl bg-[#24292E] flex flex-row p-2 mt-4 md:mt-0 md:ml-2">
                    <div className="inline-flex mx-auto rounded-lg border-8 border-[#24292E]">
                      <Image title={props.userData.bio} src={props.userData.avatar} width={110}
                             height={110}
                             alt={props.userData.name}
                             className="rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col my-auto md:ml-2 mr-2">
                      <div className="inline-flex flex-row">
                        <h4 className="text-lg font-bold">{props.userData.followers} Followers</h4>
                      </div>
                      <div className="inline-flex flex-row">
                        <h4 className="text-lg font-bold">{props.userData.repoCount} Repositories</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mx-auto mt-4">Me in badges</h3>
                <div className="flex flex-wrap">
                  {
                    badges.map((badge, index) => (
                        <div className={cn("mx-auto mt-4", {"hidden md:block": index > 25})} key={index}>
                          <Image
                              alt="AlexProgrammerDE badge"
                              width={badge.width}
                              height={badge.height}
                              src={`https://img.shields.io/badge/${badge.badge}`}/>
                        </div>)
                    )
                  }
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="w-full footer-size md:footer-size-md">
            <div className="container footer-size md:footer-size-md flex flex-col justify-center">
              <div className="flex flex-col md:flex-row justify-center">
                <div className="flex flex-col mx-4 mb-3 md:mb-0">
                  <p className="font-bold text-3xl mb-2">Like my work?</p>
                  <div className="flex flex-row justify-center">
                    <a href="https://github.com/AlexProgrammerDE"
                       className="bg-[#24292E] font-bold rounded-lg px-4 py-2.5 flex flex-row shadow-lg">
                      <p className="flex flex-col justify-center mr-2">Follow me on</p>
                      <svg xmlns="http://www.w3.org/2000/svg" height={String(98 / 3)} width={String(96 / 3)}
                           viewBox="0 0 98 96"
                           className="fill-current">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                              fill="currentColor"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="mx-4 md:mx-0 w-[90vw] md:w-0.5 border"/>
                <div className="mt-3 md:mt-0 mx-4 flex flex-col">
                  <div className="flex flex-wrap mb-2">
                    <a className="mr-2" title="Twitter"
                       href="https://twitter.com/AlexProgrammer3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                           className="fill-current">
                        <path
                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                      </svg>
                    </a>
                    <a className="mr-2" title="Reddit" href="https://www.reddit.com/user/Sensitive_Host_2515">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="36" viewBox="0 0 165.07 147.08"
                           className="fill-current">
                        <path
                            d="M165.066 74.832c0-9.976-8.087-18.062-18.063-18.062-4.87 0-9.28 1.935-12.527 5.067-12.348-8.91-29.36-14.663-48.305-15.325L94.398 7.8l26.883 5.716c.328 6.834 5.924 12.288 12.84 12.288 7.126 0 12.901-5.775 12.901-12.902 0-7.125-5.775-12.902-12.9-12.902-5.07 0-9.412 2.95-11.52 7.202L92.582.822a3.227 3.227 0 00-3.825 2.483L79.57 46.501c-19.225.534-36.51 6.295-49.016 15.304-3.244-3.113-7.64-5.035-12.49-5.035C8.089 56.77 0 64.856 0 74.832c0 7.34 4.386 13.644 10.673 16.47a35.578 35.578 0 00-.431 5.463c0 27.79 32.347 50.318 72.25 50.318 39.905 0 72.252-22.528 72.252-50.318 0-1.834-.15-3.643-.424-5.427 6.326-2.81 10.746-9.137 10.746-16.506"/>
                      </svg>
                    </a>
                    <a className="mr-2" title="Youtube"
                       href="https://www.youtube.com/@alexprogrammerde">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                           className="fill-current">
                        <path
                            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                      </svg>
                    </a>
                    <a className="mr-2" title="Pinterest" href="https://pin.it/2SeSvyM">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                           className="fill-current">
                        <path
                            d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
                            fillRule="evenodd" clipRule="evenodd"/>
                      </svg>
                    </a>
                    <a className="mr-2" title="Minecraft"
                       href="https://namemc.com/profile/Pistonmaster.1">
                      <CubeIcon title="Minecraft" width="24" height="24" className="fill-current"/>
                    </a>
                  </div>
                  <a href="https://discord.gg/B7mW9b3KhS" title="Discord Server">
                    <Image width={320} height={76} alt="Discord Server Invite Banner"
                           className="shadow-xl"
                           src="https://discord.com/api/guilds/739784741124833301/widget.png?style=banner2"/>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
  )
}

export async function getStaticProps() {
  const userData = await getUserData(user)
  const repositories = await getRepositories(user)
  const organizations = await getOrganizations(user)

  return {
    props: {
      userData,
      repositories,
      organizations
    }
  }
}

// noinspection JSUnusedGlobalSymbols
export default Home

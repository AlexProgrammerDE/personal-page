import type {NextPage} from 'next'
import GlobalHead from "../components/GlobalHead";
import {getOrganizations, getRepositories, getUserData, Organization, Repository, UserData} from "../lib/github";
import {useEffect, useState} from "react";
import RepositoryCard from "../components/RepositoryCard";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub, faPinterest, faRedditAlien, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image';
import {faCube} from "@fortawesome/free-solid-svg-icons";
import AboutMeBlock from "../components/AboutMeBlock";

const badges = [
    "https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white",
    "https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white",
    "https://img.shields.io/badge/Google%20Drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white",
    "https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white",
    "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white",
    "https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white",
    "https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white",
    "https://img.shields.io/badge/Gimp-657D8B?style=for-the-badge&logo=gimp&logoColor=FFFFFF",
    "https://img.shields.io/badge/Krita-203759?style=for-the-badge&logo=krita&logoColor=EEF37B",
    "https://img.shields.io/badge/StackExchange-%23ffffff.svg?style=for-the-badge&logo=StackExchange&logoColor=white",
    "https://img.shields.io/badge/-Stackoverflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white",
    "https://img.shields.io/badge/Wikipedia-%23000000.svg?style=for-the-badge&logo=wikipedia&logoColor=white",
    "https://img.shields.io/badge/MDN_Web_Docs-black?style=for-the-badge&logo=mdnwebdocs&logoColor=white",
    "https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white",
    "https://img.shields.io/badge/dependabot-025E8C?style=for-the-badge&logo=dependabot&logoColor=white",
    "https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white",
    "https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white",
    "https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white",
    "https://img.shields.io/badge/Nuxt-black?style=for-the-badge&logo=nuxt.js&logoColor=white",
    "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
    "https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D",
    "https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white",
    "https://img.shields.io/badge/epicgames-%23313131.svg?style=for-the-badge&logo=epicgames&logoColor=white",
    "https://img.shields.io/badge/PSN-%230070D1.svg?style=for-the-badge&logo=Playstation&logoColor=white",
    "https://img.shields.io/badge/Playstation%204-003791?style=for-the-badge&logo=playstation-4&logoColor=white",
    "https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white",
    "https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white",
    "https://img.shields.io/badge/webstorm-143?style=for-the-badge&logo=webstorm&logoColor=white&color=black",
    "https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white",
    "https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white",
    "https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white",
    "https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white",
    "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E",
    "https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white",
    "https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white",
    "https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white",
    "https://img.shields.io/badge/shazam-1476FE?style=for-the-badge&logo=shazam&logoColor=white",
    "https://img.shields.io/badge/Microsoft-0078D4?style=for-the-badge&logo=microsoft&logoColor=white",
    "https://img.shields.io/badge/Microsoft_Office-D83B01?style=for-the-badge&logo=microsoft-office&logoColor=white",
    "https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white",
    "https://img.shields.io/badge/Debian-D70A53?style=for-the-badge&logo=debian&logoColor=white",
    "https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black",
    "https://img.shields.io/badge/lineageos-167C80?style=for-the-badge&logo=lineageos&logoColor=white",
    "https://img.shields.io/badge/Pop!_OS-48B9C7?style=for-the-badge&logo=Pop!_OS&logoColor=white",
    "https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white",
    "https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white",
    "https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white",
    "https://img.shields.io/badge/-RaspberryPi-C51A4A?style=for-the-badge&logo=Raspberry-Pi",
    "https://img.shields.io/badge/DuckDuckGo-DE5833?style=for-the-badge&logo=DuckDuckGo&logoColor=white",
    "https://img.shields.io/badge/google-4285F4?style=for-the-badge&logo=google&logoColor=white",
    "https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white",
    "https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white",
    "https://img.shields.io/badge/Samsung-%231428A0.svg?style=for-the-badge&logo=samsung&logoColor=white",
    "https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white",
    "https://img.shields.io/badge/Amazon%20Prime-0F79AF?style=for-the-badge&logo=amazonprime&logoColor=white",
    "https://img.shields.io/badge/Netflix-E50914?style=for-the-badge&logo=netflix&logoColor=white",
    "https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white",
    "https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white",
]

const user = "AlexProgrammerDE"

const Home: NextPage = () => {
    const [userData, setUserData] = useState<UserData>();
    const [repositories, setRepositories] = useState<Repository[]>();
    const [organizations, setOrganizations] = useState<Organization[]>();

    useEffect(() => {
        if (userData) {
            return;
        }

        getUserData(user).then(setUserData);
    }, [userData]);

    useEffect(() => {
        if (repositories) {
            return;
        }

        getRepositories(user).then(setRepositories);
    }, [repositories]);

    useEffect(() => {
        if (organizations) {
            return;
        }

        getOrganizations(user).then(setOrganizations);
    }, [organizations]);

    return (
        <>
            <GlobalHead/>

            <main className="w-full flex-col">
                <header className="header-size w-full flex flex-col justify-center">
                    <div className="flex-grow flex justify-center text-center">
                        <div className="flex flex-col justify-center z-20">
                            <h1 className="text-2xl md:text-5xl font-bold mb-4">AlexProgrammerDE</h1>
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
                    <div className="diagonal-shadow absolute justify-self-end z-10">
                        <div
                            className="header-size w-screen bg-section landing-diagonal"/>
                    </div>
                </header>

                <section id="projects" className="w-full min-h-screen bg-section">
                    <div className="container h-full p-2 pt-4 z-20 flex flex-col">
                        <h2 className="text-2xl md:text-5xl font-bold mt-4">Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-6 md:mt-20 mb-4 md:mb-14">
                            {
                                repositories && repositories.map((repo, index) => (
                                    <div key={index} className={index > 3 ? "hidden md:block" : ""}>
                                        <RepositoryCard repo={repo}/>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex-grow flex flex-row justify-center">
                            <a href="https://github.com/AlexProgrammerDE?tab=repositories"
                               className="px-4 py-1.5 font-bold shadow-md bg-sectionDark hover:bg-sectionDarkest rounded-lg text-2xl">And
                                more!</a>
                        </div>
                    </div>
                </section>

                <section id="about-me" className="w-full min-h-screen bg-content flex flex-col">
                    <div className="diagonal-shadow absolute z-10">
                        <div
                            className="h-screen w-screen bg-section section2-diagonal"/>
                    </div>
                    <div className="container min-h-screen p-2 pb-8 flex flex-col z-20 mt-32">
                        <AboutMeBlock/>
                    </div>
                </section>

                <section id="stats" className="w-full min-h-screen bg-section">
                    <div className="container p-6">
                        <div
                            className="flex flex-col gap-4 my-auto mx-auto">
                            <div className="flex flex-col md:flex-row mx-auto">
                                <img className="mx-auto md:mr-2"
                                     alt="AlexProgrammer GitHub language stats"
                                     src="https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact&theme=dark"/>
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
                                {userData &&
                                    <div className="h-full rounded-xl bg-gray-900 flex flex-col p-4 mt-20 md:mt-16 ml-2">
                                        <div className="flex flex-row -mt-20">
                                            <div className="inline-flex rounded-full border-8 border-gray-900">
                                                <Image title={userData.bio} src={userData.avatar} width={110}
                                                       height={110}
                                                       alt={userData.name}
                                                       className="rounded-full"/>
                                            </div>
                                        </div>

                                        <div className="flex flex-col mt-4">
                                            <h4 className="text-lg font-bold underline">Followers</h4>
                                            <p className="text-sm text-gray-300">{userData.followers}</p>
                                        </div>

                                        <div className="flex flex-col mt-4">
                                            <h4 className="text-lg font-bold underline">Repositories</h4>
                                            <p className="text-sm text-gray-300">{userData.repoCount}</p>
                                        </div>
                                    </div>
                                }
                            </div>
                            <h3 className="text-2xl font-bold mx-auto mt-4">Me in badges</h3>
                            <div className="flex flex-wrap">
                                {
                                    badges.map((badge, index) => <img key={index}
                                                                      className={"mx-auto mt-4" + (index > 25 ? " hidden md:block" : "")}
                                                                      src={badge}/>)
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
                                <div className="flex flex-row">
                                    <a href="https://github.com/AlexProgrammerDE"
                                       className="bg-[#24292E] font-bold rounded-lg px-4 py-2.5 flex flex-row shadow-lg">
                                        <p className="flex flex-col justify-center mr-2">Follow me on</p>
                                        <FontAwesomeIcon icon={faGithub} size="2x"/>
                                    </a>
                                </div>
                            </div>
                            <div className="mx-4 md:mx-0 w-[90vw] md:w-0.5 border"/>
                            <div className="mt-3 md:mt-0 mx-4 flex flex-col">
                                <div className="flex flex-wrap mb-2">
                                    <a className="mr-2" title="Twitter"
                                       href="https://twitter.com/AlexProgrammer3"><FontAwesomeIcon icon={faTwitter}
                                                                                                   size="2x"/></a>
                                    <a className="mr-2" title="Reddit"
                                       href="https://www.reddit.com/user/Sensitive_Host_2515"><FontAwesomeIcon
                                        icon={faRedditAlien} size="2x"/></a>
                                    <a className="mr-2" title="Youtube"
                                       href="https://www.youtube.com/channel/UC86szSBHNiuIXC7hIfrMYtg"><FontAwesomeIcon
                                        icon={faYoutube} size="2x"/></a>
                                    <a className="mr-2" title="Pinterest" href="https://pin.it/2SeSvyM"><FontAwesomeIcon
                                        icon={faPinterest} size="2x"/></a>
                                    <a className="mr-2" title="Minecraft"
                                       href="https://namemc.com/profile/Pistonmaster.1"><FontAwesomeIcon icon={faCube}
                                                                                                         size="2x"/></a>
                                </div>
                                <a href="https://discord.gg/CDrcxzH" title="Discord Server">
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

// noinspection JSUnusedGlobalSymbols
export default Home

import * as motion from "motion/react-client"
import {Repository} from "~/lib/github-types";
import {ArchiveIcon, CodeIcon, GitForkIcon, StarIcon} from "lucide-react";

function getColorForLanguage(language: string) {
    switch (language) {
        case "TypeScript":
            return "#1f9edb";
        case "JavaScript":
            return "#f1e05a";
        case "HTML":
            return "#e34c26";
        case "CSS":
            return "#563d7c";
        case "Shell":
            return "#89e051";
        case "Python":
            return "#3572A5";
        case "Java":
            return "#b07219";
        default:
            return "#FFFFFF";
    }
}

export default function RepositoryCard({repo}: { repo: Repository }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            whileHover={{
                rotateZ: 0.5,
                scale: 1.02,
                transition: {
                    duration: .25,
                }
            }}
            whileTap={{
                scale: 0.95,
                transition: {
                    duration: .25,
                }
            }}
            transition={{type: "spring", stiffness: 200, damping: 10}}
            variants={{
                hidden: {
                    scale: 0.95,
                    opacity: 0,
                    transition: {
                        delay: 0.25
                    }
                },
                visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                        delay: 0.25
                    }
                },
            }}
            className="flex flex-col justify-center cursor-pointer">
            <div className="h-40 rounded-xl bg-section-dark shadow-lg flex flex-col">
                <a href={repo.url}>
                    <div className="flex flex-row px-3 py-1 rounded-xl bg-section-darkest">
                        <ArchiveIcon className="h-6 w-6 mr-2 my-auto"/>
                        <h4 className="text-lg md:text-2xl font-bold">{repo.name}</h4>
                    </div>
                </a>
                <div className="grow p-4 text-sm md:text-xl flex flex-col">
                    <p>{repo.description}</p>
                    <div className="grow flex flex-col justify-end">
                        <div className="flex flex-row mt-2">
                            <div className="flex flex-row mr-2">
                                <StarIcon className="h-6 w-6 my-auto mr-1 text-yellow-300"/>
                                <p className="my-auto font-bold">{repo.stars}</p>
                            </div>
                            <div className="flex flex-row mr-2">
                                <GitForkIcon className="h-6 w-7 my-auto"/>
                                <p className="my-auto font-bold">{repo.forks}</p>
                            </div>
                            <div className="flex flex-row mr-2">
                                <CodeIcon className="h-6 w-6 my-auto mr-1"/>
                                <p className="my-auto font-bold"
                                   style={{color: getColorForLanguage(repo.language)}}>{repo.language}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

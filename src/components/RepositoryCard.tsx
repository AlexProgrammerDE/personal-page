import { ArchiveIcon, CodeIcon, GitForkIcon, StarIcon } from "lucide-react";
import * as motion from "motion/react-client";

import type { Repository } from "~/lib/github-types";

function getColorForLanguage(language: string) {
  switch (language) {
    case "TypeScript": {
      return "#1f9edb";
    }
    case "JavaScript": {
      return "#f1e05a";
    }
    case "HTML": {
      return "#e34c26";
    }
    case "CSS": {
      return "#563d7c";
    }
    case "Shell": {
      return "#89e051";
    }
    case "Python": {
      return "#3572A5";
    }
    case "Java": {
      return "#b07219";
    }
    default: {
      return "#FFFFFF";
    }
  }
}

export default function RepositoryCard({ repo }: { repo: Repository }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover={{
        rotateZ: 0.5,
        scale: 1.02,
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
      className="flex cursor-pointer flex-col justify-center"
    >
      <div className="flex h-40 flex-col rounded-xl bg-section-dark shadow-lg">
        <a href={repo.url}>
          <div className="flex flex-row rounded-xl bg-section-darkest px-3 py-1">
            <ArchiveIcon className="my-auto mr-2 size-6" />
            <h4 className="text-lg font-bold md:text-2xl">{repo.name}</h4>
          </div>
        </a>
        <div className="flex grow flex-col p-4 text-sm md:text-xl">
          <p>{repo.description}</p>
          <div className="flex grow flex-col justify-end">
            <div className="mt-2 flex flex-row">
              <div className="mr-2 flex flex-row">
                <StarIcon className="my-auto mr-1 size-6 text-yellow-300" />
                <p className="my-auto font-bold">{repo.stars}</p>
              </div>
              <div className="mr-2 flex flex-row">
                <GitForkIcon className="my-auto h-6 w-7" />
                <p className="my-auto font-bold">{repo.forks}</p>
              </div>
              <div className="mr-2 flex flex-row">
                <CodeIcon className="my-auto mr-1 size-6" />
                <p
                  className="my-auto font-bold"
                  style={{ color: getColorForLanguage(repo.language) }}
                >
                  {repo.language}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

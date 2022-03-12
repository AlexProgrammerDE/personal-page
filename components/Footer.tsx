import {HeartIcon} from "@heroicons/react/solid";

export default function Footer() {
    return (
        <footer className="w-full mx-auto mb-4 container flex flex-row justify-center">
            <p className="flex flex-row">Powered by <HeartIcon color="#c74d5f" className="mx-1 h-6 w-6"/> and <a className="ml-1 text-fuchsia-400" href="https://github.com/AlexProgrammerDE/personal-page">open source</a>!</p>
        </footer>
    )
}

import {useEffect, useState} from "react";

import dynamic from "next/dynamic";

const defaultText = "" +
    "I am a software developer with a passion for creating software that solves problems.\n" +
    "I have a background in mathematics and computer science, and I am currently pursuing a degree in computer science.\n" +
    "I am currently working on a project that aims to create a web application that will help people to find the best place to eat in a given area.\n"

const AboutMeEditor = dynamic(() => import('./AboutMeEditor'),
    {ssr: false})

export default function AboutMeBlock() {
    const [text, setText] = useState<string>(defaultText);

    return (
        <div className="flex-grow rounded-2xl border-gray-700 h-full w-full">
            <AboutMeEditor text={text} setText={setText}/>
        </div>
    )
}

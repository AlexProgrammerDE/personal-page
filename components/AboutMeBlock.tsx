"use client";

import {useState} from "react";

import dynamic from "next/dynamic";

import defaultText from '../data/AboutMe.md'

import markdown_it from "markdown-it";
import {CodeIcon, EyeIcon} from "lucide-react";
import { cn } from "~/lib/utils";

const AboutMeEditor = dynamic(() => import('./AboutMeEditor'),
    {ssr: false})

const md = markdown_it({
  html: false,
  xhtmlOut: false,
  linkify: true,
  typographer: true,
});

export default function AboutMeBlock() {
  const [text, setText] = useState<string>(defaultText);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
      <div className="flex-grow rounded-2xl bg-gray-900 border border-gray-700 h-full w-full flex flex-col">
        <div className="h-20 bg-gray-800 rounded-t-2xl flex flex-row">
          <button
              className={cn("flex flex-row justify-center w-32 md:w-40 text-lg md:text-xl font-bold p-2 rounded-tl-2xl", {"bg-gray-900": !isEditing})}
              onMouseDown={() => setIsEditing(false)}>
            <EyeIcon className="h-4 md:h-6 w-4 md:w-6 my-auto mr-2"/>
            <p className="my-auto">Preview</p>
          </button>
          <button
              className={cn("flex flex-row justify-center w-32 md:w-40 text-lg md:text-xl rounded-tr-none font-bold p-2", {"bg-gray-900": isEditing})}
              onMouseDown={() => setIsEditing(true)}>
            <CodeIcon className="h-4 md:h-6 w-4 md:w-6 my-auto mr-2"/>
            <p className="my-auto">Edit File</p>
          </button>
        </div>
        <div className="flex-grow flex flex-row">
          <div className="flex-grow p-2 pb-0 md:p-6 md:pb-0 flex flex-col">
            <div className={cn("flex flex-col flex-grow", {"hidden": !isEditing})}>
              <AboutMeEditor text={text} setText={setText}/>
            </div>
            <div className={cn("flex-grow overflow-x-auto mb-2 md:mb-6", {"hidden": isEditing})}>
              <div className="prose prose-invert" dangerouslySetInnerHTML={{__html: md.render(text)}}/>
            </div>
          </div>
        </div>
      </div>
  )
}

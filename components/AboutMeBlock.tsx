"use client";

import { CodeIcon, EyeIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import Markdown from "react-markdown";
import { cn } from "~/lib/utils";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const defaultText = `# About Me

[![contains-cat-gif-badge](https://forthebadge.com/images/badges/contains-cat-gifs.svg)](https://forthebadge.com)
[![powered-by-black-magic-badge](https://forthebadge.com/images/badges/powered-by-black-magic.svg)](https://forthebadge.com)

## Who is this guy?

Hi! I'm Alex aka AlexProgrammerDE and aka Pistonmaster. I have quite a passion for Minecraft and have learned lots of
programming languages and frameworks over the years. I am currently a student at a German university.

## What does describe me?

I am an enthusiastic and creative person. I like to create and learn new things. I can also work well in a team and
take responsibility.

I am also a big fan of Open Source and my [GitHub profile](https://github.com/AlexProgrammerDE) is very active. Many of
my projects are Minecraft related.

[secret message]: <> (cats are cute :3)

## What are my skills?

I code in Java and TypeScript mainly. I also have a bit of experience with Python and C#. I am very flexible with what I
do, so I can adapt to most situations. I work well with Minecraft Plugin development and Website Design/Coding, but I'm
also capable of Sys Admin, Linux, and Virtualization with VMs and Docker.

I've collected a lot of experience with running and managing Minecraft servers and did set up dedicated machines in
datacenters and configured DDoS protection. I've also worked on a few projects with Minecraft plugins and websites.

![cat gif](https://media1.tenor.com/m/cbf1-eBnBbkAAAAC/pusheen-pusheen-cat.gif)

[extra gif 1]: <> (https://media.tenor.com/blwK0rdIId8AAAAi/cat-oiiaoiia-cat.gif)
[extra gif 2]: <> (https://media.tenor.com/3VK7UIf_5R8AAAAj/good-morning.gif)
[extra gif 3]: <> (https://media1.tenor.com/m/D79VE1UsarUAAAAd/meaw.gif)
[extra gif 4]: <> (https://media1.tenor.com/m/QkINQgRwWgUAAAAd/cat-rave.gif)
[extra gif 5]: <> (https://media.tenor.com/HGWcMb_HJo8AAAAi/cat-cat-meme.gif)`;

export default function AboutMeBlock() {
  const [text, setText] = useState<string>(defaultText);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="grow rounded-2xl bg-gray-900 border border-gray-700 h-full w-full flex flex-col">
      <div className="h-20 bg-gray-800 rounded-t-2xl flex flex-row">
        <button
          type="button"
          className={cn(
            "flex flex-row justify-center w-32 md:w-40 text-lg md:text-xl font-bold p-2 rounded-tl-2xl",
            { "bg-gray-900": !isEditing },
          )}
          onMouseDown={() => setIsEditing(false)}
        >
          <EyeIcon className="h-4 md:h-6 w-4 md:w-6 my-auto mr-2" />
          <p className="my-auto">Preview</p>
        </button>
        <button
          type="button"
          className={cn(
            "flex flex-row justify-center w-32 md:w-40 text-lg md:text-xl rounded-tr-none font-bold p-2",
            { "bg-gray-900": isEditing },
          )}
          onMouseDown={() => setIsEditing(true)}
        >
          <CodeIcon className="h-4 md:h-6 w-4 md:w-6 my-auto mr-2" />
          <p className="my-auto">Edit File</p>
        </button>
      </div>
      <div className="grow flex flex-row">
        <div className="grow p-2 pb-0 md:p-6 md:pb-0 flex flex-col">
          <div className={cn("flex flex-col grow", { hidden: !isEditing })}>
            <MDEditor
              className="grow w-full h-full mb-2 md:mb-6"
              hideToolbar
              preview="edit"
              value={text}
              onChange={(value) => {
                if (value) setText(value);
              }}
            />
          </div>
          <div
            className={cn(
              "grow overflow-x-auto mb-2 md:mb-6 prose prose-invert",
              {
                hidden: isEditing,
              },
            )}
          >
            <Markdown>{text}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}

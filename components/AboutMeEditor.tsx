import MDEditor from "@uiw/react-md-editor";
import {Dispatch, SetStateAction} from "react";

export default function AboutMeEditor({text, setText}: { text: string, setText: Dispatch<SetStateAction<string>> }) {
    return (
        <MDEditor
            className="grow w-full h-full mb-2 md:mb-6"
            hideToolbar
            preview="edit"
            fullscreen
            value={text}
            onChange={value => {
                if (value) setText(value)
            }}
        />
    )
}

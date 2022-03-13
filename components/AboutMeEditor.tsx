import MDEditor from "@uiw/react-md-editor";
import {Dispatch, SetStateAction} from "react";

export default function AboutMeEditor({text, setText}: { text: string, setText: Dispatch<SetStateAction<string>> }) {
    return (
        <MDEditor
            className="flex-grow w-full h-full mb-4"
            hideToolbar
            preview="edit"
            value={text}
            textareaProps={{
                style: {
                    resize: "none",
                },
            }}
            onChange={value => {
                if (value) setText(value)
            }}
        />
    )
}

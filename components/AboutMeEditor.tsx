import AceEditor from 'react-ace'
import {Dispatch, SetStateAction} from "react";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-twilight";

export default function AboutMeEditor({text, setText}: { text: string, setText: Dispatch<SetStateAction<string>> }) {
    return (
        <AceEditor
            mode="markdown"
            theme="github"
            onChange={(value) => setText(value)}
            name="aboutMeEditorBlock"
            editorProps={{$blockScrolling: true}}
            value={text}
            width={'100%'}
            setOptions={{
                showLineNumbers: true,
                tabSize: 2,
            }}/>
    )
}

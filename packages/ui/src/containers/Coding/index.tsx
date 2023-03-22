import CodeEditor from "@/components/CodeEditor"
import { useAppStore } from "@/hooks"
import { writeIndexJS } from "@/webContainer"
import { reaction } from "mobx"
import { observer } from "mobx-react-lite"
import FilesTree from "@/components/FilesTree";
import './index.less'
import { SpButton } from "@/components/RewriteUI"
import React, { useState } from "react"
import * as monaco from "monaco-editor";


const AnyContainer = () => {
    const app = useAppStore();
    const onMount = (instance:monaco.editor.IStandaloneCodeEditor) => {
        reaction(() => app.Coding.CurPanelCode, e => {
            const model = monaco.editor.createModel(app.Coding.CurPanelCode, app.Coding.CurExtname )
            instance.setModel(model);
        })
    }
    const onChangeValue = (value) => {
        writeIndexJS(app.Coding.CurPath, value)
    }
    return <div> <CodeEditor value={app.Coding.CurPanelCode} language={app.Coding.CurExtname} onMount={onMount} onChangeValue={onChangeValue}/></div>
}

/** write code */
const CodingContainer = () => {
    const [show, setShow] = useState(false);
    return <>
    <SpButton classname='folderButton' onClick={() => setShow(!show)} type={'link'} icon="sp-icon-folder"></SpButton>
    <div className="CodingContainer">
        <div className={['treeContainer', show? 'active': ''].join(' ')}> <FilesTree /></div>
    </div>
    <AnyContainer />
    </>
}

const tmpl_CSS = `
#root {
    background: red
}
`
CodingContainer.CssContainer = () => {
    return <div> <CodeEditor value={tmpl_CSS} language="css" /></div>
}

CodingContainer.JsContainer = () => {
    return <div> <CodeEditor value="console.log(777)" language="javascript" /></div>
    
}

const tmpl_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
`;
CodingContainer.HtmlContainer = observer(() => {
    const app = useAppStore();
    const onMount = (instance) => {
        reaction(() => app.Coding.CurPanelCode, e => {
            instance.setValue(e);
        })
    }
    const onChangeValue = (value) => {
        writeIndexJS(app.Coding.CurPath,value)
    }
    return <div> <CodeEditor value={app.Coding.CurPanelCode} language="html" onMount={onMount} onChangeValue={onChangeValue}/></div>
})

export default CodingContainer;
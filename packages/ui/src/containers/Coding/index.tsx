import CodeEditor from "@/components/CodeEditor"
import { useAppStore } from "@/hooks"
import { reaction } from "mobx"
import { observer } from "mobx-react-lite"


/** write code */
const CodingContainer = () => {

    return <div className="CodingContainer">代码编写</div>
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
    return <div> <CodeEditor value={app.Coding.CurPanelCode} language="html" onMount={onMount}/></div>
})

export default CodingContainer;
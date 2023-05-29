import CodeEditor from "@/components/CodeEditor";
import { useAppStore, useKeydown } from "@/hooks";
import { writeFileContent } from "@/webContainer";
import { reaction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import FilesTree from "@/components/FilesTree";
import "./index.less";
import { SpButton } from "@/components/RewriteUI";
import React, { useState, useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
import Spui from "@sparrowend/ui";
import CodeAttach from "./header";

const AnyContainer = () => {
  const app = useAppStore();
  const localUseInstance: { current?: monaco.editor.IStandaloneCodeEditor } =
    useRef();
  const onMount = (instance: monaco.editor.IStandaloneCodeEditor) => {
    reaction(
      () => [app.Coding.CurPanelCode, app.Coding?.curFileInfo?.path],
      (e) => {
        console.log(app.Coding.curFileInfo.path, 'app.Coding.curFileInfo.pathapp.Coding.curFileInfo.path')
        // console.log(monaco.Uri.parse(app.Coding.curFileInfo.path),'monaco.Uri.parse(app.Coding.curFileInfo.path)')
        localUseInstance.current = instance;
        let model = monaco.editor.getModel(monaco.Uri.parse(app.Coding.curFileInfo.path));
        if(model) {
          return instance.setModel(model);
        }
        // instance.setValue(app.Coding.CurPanelCode)
        // monaco.editor.setModelLanguage(instance.getModel(), app.Coding.CurExtname)
        // instance.setModelLanguage(instance.getModel(), app.Coding.CurExtname)
        // instance.getModel()?.setValue()
        
         model = monaco.editor.createModel(
          app.Coding.CurPanelCode,
          app.Coding.CurExtname,
          monaco.Uri.parse(app.Coding.curFileInfo.path)
        );
        instance.setModel(model)

       
      }
    );
  };
  const writeContent = (value: string) => {
    if (!app.Coding.curFileInfo) return "";
    const pos: string[] = app.Coding.curFileInfo.pos.split("-");
    pos.shift();
    let index = pos.shift();
    let clone_data = toJS(app.TreeStore.value);
    let finData = clone_data[index];
    while (pos.length > 0) {
      index = pos.shift();
      if (finData?.children) {
        finData = finData.children;
      }
      finData = finData[index];
    }
    finData.content = value;
    app.TreeStore.reWriteValue(clone_data);
    writeFileContent(app.Coding.CurPath, value);
  };
  useKeydown({
    CommandSave() {
      if (localUseInstance.current) {
        writeContent(localUseInstance.current.getValue());
        Spui.Message.success("success 🎉");
      }
    },
  });

  const onChangeValue = () => {}; // debounce(writeContent,3000);
  return (
    <div>
      {" "}
      <CodeEditor
        value={app.Coding.CurPanelCode}
        language={app.Coding.CurExtname}
        onMount={onMount}
        onChangeValue={onChangeValue}
      />
    </div>
  );
};

/** write code */
const CodingContainer = () => {
  const containerRef = useRef(null);
  const [visibleMark, setVisibleMark] = useState(false);
  const drawerRef = useRef();
  const app = useAppStore();
  useKeydown({
    CommandDelete() {
      // setVisibleMark(true);
      const modal = Spui.Modal.config({
        visible: true,
        bodyhtml: "是否删除",
        onOk() {
          app.TreeStore.deletePositionData();
          modal.show(false);
        },
        onCancel: () => modal.show(false),
      });
    },
  });

  const isClassRight = () =>
    containerRef.current && containerRef.current.getBoundingClientRect().x < 50;

  useEffect(() => {
    drawerRef.current.onClose = () => setVisibleMark(false);
  }, []);
  return (
    <>
      <CodeAttach visibleMark={() => {
        setVisibleMark(!visibleMark)
      }} />
      <sp-drawer
        placement={isClassRight() ? "right" : "left"}
        visible={visibleMark}
        title="Basic Drawer"
        fullscreen="false"
        ref={drawerRef}
      >
        <div slot="content">
          <FilesTree />
        </div>
      </sp-drawer>
      <AnyContainer />
    </>
  );
};

const tmpl_CSS = `
#root {
    background: red
}
`;
CodingContainer.CssContainer = () => {
  return (
    <div>
      {" "}
      <CodeEditor value={tmpl_CSS} language="css" />
    </div>
  );
};

CodingContainer.JsContainer = () => {
  return (
    <div>
      {" "}
      <CodeEditor value="console.log(777)" language="javascript" />
    </div>
  );
};

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
    reaction(
      () => app.Coding.CurPanelCode,
      (e) => {
        instance.setValue(e);
      }
    );
  };
  const onChangeValue = (value) => {
    writeFileContent(app.Coding.CurPath, value);
  };
  return (
    <div>
      {" "}
      <CodeEditor
        value={app.Coding.CurPanelCode}
        language="html"
        onMount={onMount}
        onChangeValue={onChangeValue}
      />
    </div>
  );
});

export default CodingContainer;

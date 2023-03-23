import React, { useEffect, useLayoutEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import "./index.less";
// https://zhuanlan.zhihu.com/p/47746336
import TypeReact from './types/react.d.ts?raw'
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { reaction } from "mobx";

console.log(TypeReact,'TypeReact')

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
  // noEmit: true,
  allowNonTsExtensions: true,
  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  module: monaco.languages.typescript.ModuleKind.ESNext,
  target: monaco.languages.typescript.ScriptTarget.ESNext,
  // typeRoots: ["node_modules/@types"]
});
monaco.languages.typescript.typescriptDefaults.addExtraLib(TypeReact, 'file:///react.d.ts')

// 1. https://juejin.cn/post/6984683777343619102
interface ICodeEditorType {
  language: "javascript" | "css" | "html";
  value: string;
}
const CodeEditor = (props: ICodeEditorType) => {
  const codeContainer = useRef(null);
  useLayoutEffect(() => {


    const instance = monaco.editor.create(
      codeContainer.current as unknown as HTMLElement,
      {
        value: props.value,
        language:'typescript',
        minimap: {
          // 关闭小地图
          enabled: false,
        },
      }
    );

    props.onMount?.(instance);
    
    instance.onDidChangeModelContent(() => {
      // 获取到当前编辑内容
      props.onChangeValue?.(instance.getValue());
    });
  }, []);
  return <div ref={codeContainer} className="CodeEditor"></div>;
};

export default CodeEditor;

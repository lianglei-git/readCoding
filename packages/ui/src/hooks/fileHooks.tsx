import { toJS } from "mobx";
import { useAppStore } from ".";
import { SpInput } from "@/components/RewriteUI";
import React, { useCallback, useEffect, useRef, useState } from "react";
import App from "App";
import { AppStore } from "@store/index";
import { webcontainerCreate } from "@/webContainer";

function WriteFileNameInput({ pos, isDir = false, onFull= () => void 0 }) {
  const ref = useRef(null);
  const rmFile = useRemoveFile();
  const [value, setValue] = useState("");
  const onBlur = useCallback(
    (e) => {
      if (e.target.value.trim().length == 0) {
        rmFile(pos, isDir);
      }else {
        // const _path = path+'/'+e.target.value
        onFull(e.target.value)
      }
    },
    [ref.current]
  );
  const onChange = (e: InputEvent) => {
    // setValue(e.target?.value);
  };
  useEffect(() => {
    ref.current.select();
  }, []);
  return (
    <SpInput
      style={{ width: 99 }}
      ref={ref}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
}

const common = (pos: string) => {
  const _pos: any[] = pos.split("-");
  // 0-0
  _pos.shift();
  return _pos;
};

const curData = (app: AppStore, pos: any[], isDir = false) => {
  let cloneTreeData = toJS(app.TreeData);
if(!app.Coding.curFileInfo){
    return {
        cloneTreeData,
        lD: cloneTreeData,
        index: 0
      };
  }
  if (app.Coding.curFileInfo?.content || isDir) {
    pos.pop();
  } 
  
  let index = pos.shift();
  let lD: any = cloneTreeData[index];
  while (pos.length > 0) {
    index = pos.shift();
    if (lD.children) {
      if (lD.children[index].children) {
        console.log(lD, index)
        lD = lD.children[index];
      }
    }
  }
  let path = lD.path;
  if (lD.children) {
    lD = lD.children;
  }
  return {
    cloneTreeData,
    lD,
    path,
    index,
  };
};

const useRemoveFile = () => {
  const app = useAppStore();

  return (_pos: string = app.Coding.curFileInfo.pos, isDir:boolean = false) => {
    if (!app.Coding.curFileInfo) return "";
    const pos: any[] = common(_pos);
    const splicIdx = pos[pos.length - 1];
    let { cloneTreeData, lD } = curData(app, pos, isDir);
    lD.splice(splicIdx, 1);
    app.TreeData = cloneTreeData;
  };
};

const useAddFile = () => {
  const app = useAppStore();

  return () => {

    if(!app.Coding.curFileInfo) {
        // app.TreeData.push({
        //     title: <WriteFileNameInput  pos={'0-'+app.TreeData.length} />,
        //     key: Date.now()
        // });
        // app.TreeData = toJS(app.TreeData);
        
        return;
    }

    const pos: any[] = common(app.Coding.curFileInfo.pos);
    let cpPos = [app.Coding.curFileInfo.pos[0], ...pos];

    if (app.Coding.curFileInfo?.content) {
      cpPos.pop();
    }
    let { cloneTreeData, lD, path } = curData(app, pos);

    cpPos.push(lD.length);
    
    const onFull = (value) => {
        lD.pop();
        lD.push({
            title: value,
            path: path + '/' + value,
            extname:  '.js',
            key: value,
        })
        app.TreeData = cloneTreeData;
        webcontainerCreate(path + '/' + value, false)
    }
    lD.push({
      title: <WriteFileNameInput pos={cpPos.join("-")} onFull={onFull}/>,
      key: Date.now(),
    });
    app.TreeData = cloneTreeData;
  };
};

const useAddDir = () => {
    const app = useAppStore();
    return () => {
        console.log('添加文件夹')
    if(!app.Coding.curFileInfo) {
        // app.TreeData.push({
        //     title: <WriteFileNameInput pos={'0-'+app.TreeData.length} isDir={true} />,
        //     key: Date.now(),
        //     children: []
        // });
        // app.TreeData = toJS(app.TreeData);
        return;
    }

    const pos: any[] = common(app.Coding.curFileInfo.pos);
    let cpPos = [app.Coding.curFileInfo.pos[0], ...pos];

    if (app.Coding.curFileInfo?.content) {
      cpPos.pop();
    }
    let { cloneTreeData, lD, path } = curData(app, pos);
    cpPos.push(lD.length);

    const onFull = (value) => {
        lD.pop();
        lD.push({
            title: value,
            path: path + '/' + value,
            extname: path + '/' + value,
            key: value,
            children: []
        })
        app.TreeData = cloneTreeData;
        webcontainerCreate(path + '/' + value, true)
    }

    lD.push({
      title: <WriteFileNameInput pos={cpPos.join("-")} isDir={true} onFull={onFull}/>,
      key: Date.now(),
      children: []
    });
    app.TreeData = cloneTreeData;
    }
}
export { useAddFile,useAddDir };

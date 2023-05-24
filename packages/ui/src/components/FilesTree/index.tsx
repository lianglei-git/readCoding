import React, { useEffect, useState } from "react";
import TreeExample from "./demo2";
import Tree from "rc-tree";
import { useAppStore } from "@/hooks";
import TreeFiles from "./tree";
import "./index.less";
import { observer } from "mobx-react-lite";
import { reaction, toJS } from "mobx";
import { SpButton } from "../RewriteUI";

// {
//     template: {
//         distory: {

//         },
//         'a.js': {
//             file: {
//                 contents: ''
//             }
//         }
//     }
// }

/** Files Select at Coding */
const FilesTree = () => {
  const app = useAppStore();
  const onSelect = (k, info) => {
    app.Coding.setCurFileInfo(info.node);
    // app.Coding.setCurPath(info.node.path)
    // app.Coding.setCurPanelCode(info.node.content)
  };
  return (
    <div>
      <div className="control_top">
        <div className="baseline">{app.TreeStore.projectName}</div>
        <div className="control">
          <SpButton
            type={"link"}
            size="mini"
            onClick={() => app.TreeStore.addPositionData()}
            icon="sp-icon-chakanwenjianmulu"
          >
            <div className="Placeholder sp-icon sp-icon-tianjia"></div>
          </SpButton>
          <SpButton
            type={"link"}
            size="mini"
            onClick={() => app.TreeStore.addPositionData(true)}
            icon="sp-icon-folder"
          >
            <div className="Placeholder sp-icon sp-icon-tianjia"></div>
          </SpButton>
        </div>
      </div>
      <TreeFiles
        expandedKeys={app.TreeStore.expandedKeys}
        treeData={app.TreeStore.value}
        onSelect={onSelect}
      />
    </div>
  );
};

export default observer(FilesTree);

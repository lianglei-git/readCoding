import { useAppStore } from "@/hooks";
import { observer } from "mobx-react-lite";
import React, { useLayoutEffect, useRef } from "react";
import "./index.less";
import { terminal } from "@/webContainer";

const ViewRenderContainerTips = () => {
  return (
    <div style={{ height: "400px", textAlign: "center", paddingTop: 100 }}>
      <p>Install 🎉</p>
      <p>1. cd template/~</p>
      <p>2. pnpm install && pnpm dev</p>
    </div>
  );
};

/** ViewRenderContainer */
const ViewRenderContainer = () => {
  const app = useAppStore();
  const terminalRef = useRef(null);

  useLayoutEffect(() => {
    terminal.open(terminalRef.current);
    terminal.write('waiting...\n')
  }, []);
  return (
    <div className="ViewRenderContainer">
      {/* <sp-collapse-panel index='1' title='标题1'> */}
      {app.BootContainerInfo.isLoadedBootContainer ? (
        <iframe src={app.BootContainerInfo.src}></iframe>
      ) : (
        <ViewRenderContainerTips />
      )}
      {/* </sp-collapse-panel> */}
      <sp-collapse active-index="2" ghost="true">
        <sp-collapse-panel index="2" title="Terminal">
          <div
            className="terminal"
            ref={terminalRef}
            style={{ width: "100%" }}
          ></div>
        </sp-collapse-panel>
      </sp-collapse>
    </div>
  );
};

export default observer(ViewRenderContainer);

import { useAppStore } from "@/hooks";
import { observer } from "mobx-react-lite";
import React, { useLayoutEffect, useRef } from 'react';
import './index.less'
import { terminal } from "@/webContainer";

const ViewRenderContainerTips = () => {
    return <div style={{height: '400px', textAlign: 'center', paddingTop: 100}}>
        <p>Install 🎉</p>
        <p>1. cd template/~</p>
        <p>2. pnpm install && pnpm dev</p>
    </div>
}


/** ViewRenderContainer */
const ViewRenderContainer = () => {
    const app = useAppStore();
    const  terminalRef = useRef(null);
    
    useLayoutEffect(() => {
        terminal.open(terminalRef.current);
    }, [])
    return <div className="ViewRenderContainer">
        {app.BootContainerInfo.isLoadedBootContainer ? <iframe src={app.BootContainerInfo.src} ></iframe>: <ViewRenderContainerTips/>}
        <div className="terminal" ref={terminalRef} style={{width: '100%', height: '300px'}}></div>
    </div>
}

export default observer(ViewRenderContainer);
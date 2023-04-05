import { useAppStore } from "@/hooks";
import { observer } from "mobx-react-lite";
import React from 'react';
import './index.less'

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
    
    return <div className="ViewRenderContainer">
        {app.BootContainerInfo.isLoadedBootContainer ? <iframe src={app.BootContainerInfo.src} ></iframe>: <ViewRenderContainerTips/>}
        <div className="terminal" style={{width: '100%', height: '300px'}}></div>
    </div>
}

export default observer(ViewRenderContainer);
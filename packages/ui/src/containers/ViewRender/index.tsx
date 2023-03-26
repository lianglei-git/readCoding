import { useAppStore } from "@/hooks";
import { observer } from "mobx-react-lite";
import './index.less'

const ViewRenderContainerTips = () => {
    return <div style={{height: '400px'}}>
        等等 webcontainer 在注册呢
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
import { webcontainerFiles_to_treeData } from "@/utils";
import { AppStore } from "../..";
import default_react_template from "./default_tpl/react.tpl";



/** by Key for SPuiTesting */

class SpuiTesting {

    constructor(public app: AppStore) {

        /** 默认使用 react demo */
        this.writeReactDemo();
        app.Setting.PersistableLoadProcess.value = 100;
    }

    writeReactDemo() {
        let uiForCardCode = localStorage.getItem('cardCode');
        if(uiForCardCode) {
            uiForCardCode = JSON.parse(uiForCardCode);
        }
        this.app.TreeStore.startup(uiForCardCode ?? default_react_template);
    }

    writeHtmlDemo() {

    }

}

export default SpuiTesting;
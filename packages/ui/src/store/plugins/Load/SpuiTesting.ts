import { webcontainerFiles_to_treeData } from "@/utils";
import { AppStore } from "../..";
import default_react_template from "./default_tpl/react.tpl";



/** by Key for SPuiTesting */

class SpuiTesting {

    constructor(public app: AppStore) {

        /** 默认使用 react demo */
        // this.writeReactDemo();
        // 废弃⚠️
        // app.Setting.PersistableLoadProcess.value = 100;
        this.startup();
    }

    startup() {
        this.app.Setting.PersistableLoadProcess.value = 91;
        let reactCode = localStorage.getItem('cardCodeReact');
        let htmlCode = localStorage.getItem('cardCodeHtml');
        let c1 = reactCode || reactCode !== 'false' ? reactCode : false
        let c2 = htmlCode || htmlCode !== 'false' ? htmlCode : false
        if (c1 && c2) {
            let modal = Spui.Modal.config({
                visible: true,
                footer: null,
                title: '代码片段可选择执行',
                closable: false,
                onClose() { },
                bodyhtml:
                    `
                    <p style='display:flex;justify-content: center; height: 100px;transform: scale(1.3);align-items: center;'>
                    <sp-button2 type='primary' style='margin-right:30px' onclick="window.uiSelectCardCode('html')">Html</sp-button2>
                    <sp-button2 type='danger' onclick="window.uiSelectCardCode('react')">React</sp-button2>
                    </p>
                `
            });
            window.uiSelectCardCode = (type: 'html' | 'react') => {
                modal.show(false)
                if (type == 'html') return this.writeHtmlDemo(c2);
                if (type == 'react') return this.writeReactDemo(c1);
            }
            return '';
        }

        if (c1) return this.writeReactDemo(c1);
        if (c2) return this.writeHtmlDemo(c2);
        Spui.Message.error('无代码可供执行！使用默认Code')
        this.writeReactDemo(false);
    }

    writeReactDemo(uiForCardCode) {
        if (uiForCardCode) {
            uiForCardCode = JSON.parse(uiForCardCode);
        }
        this.app.TreeStore.startup(uiForCardCode ?? default_react_template);
        this.app.Setting.PersistableLoadProcess.value = 100;
        setTimeout(() => {
            Array.from(document.querySelectorAll('.rc-tree-node-content-wrapper')).forEach((element: any) => {
                if (element.title == 'demo.jsx') {
                    element.click();
                }
            })
        })
    }

    writeHtmlDemo(uiForCardCode) {
        // let uiForCardCode = localStorage.getItem('cardCodeHtml');
        if (uiForCardCode) {
            uiForCardCode = JSON.parse(uiForCardCode);
        }
        this.app.TreeStore.startup(uiForCardCode ?? default_react_template);
        this.app.Setting.PersistableLoadProcess.value = 100;
        setTimeout(() => {
            Array.from(document.querySelectorAll('.rc-tree-node-content-wrapper')).forEach((element: any) => {
                if (element.title == 'index.html') {
                    element.click();
                }
            })
        })
    }

}

export default SpuiTesting;
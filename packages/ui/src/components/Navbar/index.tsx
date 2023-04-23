import React, { createElement, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import ToolLayout from "../tools/layout";
import "./index.less";
import { useSettingStore } from "@/hooks";
import { LayoutEnmu } from "@store/private/layoutConst";
import { SpModal, SpAffix, SpButton } from "../RewriteUI";
import { fullscreen } from "@/utils";
import ReadBookContainer from "@/containers/ReadBook";
import { appStore } from "@store/index";
import SpuiTxt from "@sparrowend/ui/dist/spui.js?raw";

const Navbar = () => {
  const settingStore = useSettingStore();
  let [visibleSetting, setSettingVisible] = useState(false);
  const setOnClick = (e) => {
    setSettingVisible(true);
  };
  const onWebContainer = () => {
    window.open("http://localhost:5269");
  };

  const openBooks = async () => {
    const delayBody = (doc) => {
      const body = doc.body;
      if (body === null) {
        setTimeout(() => {
          delayBody(doc);
        }, 200);
      } else {
        return true;
      }
    };
    const delay = (func, doc, t) => {
      return new Promise((r, j) => {
        setTimeout(() => {
          func && func(doc);
          r();
        }, t);
      });
    };
    const strWindowFeatures = `
    menubar=no,
    location=no,
    resizable=yes,
    scrollbars=yes,
    status=no
`;
    if (window.winBooks) {
      window.winBooks.document.body.innerHTML = "";
    }
    // 打开新的窗口
    const target = (window.winBooks = window.open(
      "",
      "Books",
      strWindowFeatures
    ));
    const doc = target.document;
    const newR = await delay(delayBody, doc, 200);
    const body = target.document.body;
    const rootDom = document.createElement("div");
    rootDom.id = "root";
    rootDom.style.display = "none";
    body.appendChild(rootDom);
    target.app = appStore;
    const head = document.getElementsByTagName("head")[0];
    // 渲染react 组件
    ReactDOM.render(<ReadBookContainer />, rootDom);
    // window.addEventListener("unload", function () {
    //   target.close();
    // });
    const moveScript = document.createElement("script");
    // 将窗口移动到指定位置
    const innerHtmlStr =
      `
    window.onload=(function(){
      const self_ =this;
      setTimeout(() => {
        document.getElementById('root').style.display="block";
      }, 1000);
    })();
` + SpuiTxt;

    moveScript.innerHTML = innerHtmlStr;
    body.appendChild(moveScript);
    const openBodyHead = doc.getElementsByTagName("head")[0]
    openBodyHead.innerHTML = head.innerHTML;
    Array.from(head.getElementsByTagName('link')).map(element => {
      let linkEl = document.createElement('link');
      linkEl.href = element.href;
      linkEl.rel = element.rel;
      linkEl.as = element.as;
      // linkEl.crossorigin = element.crossorigin;
      openBodyHead.append(linkEl);
    });
  };
  return (
    <>
      <div className="navbar_affix" offset-top={window.innerHeight / 2 - 150}>
        <div className="mutant_navbar">
          <ToolLayout />
          <span className="label" onClick={onWebContainer}>
            Web <i className="sp-icon sp-icon-guanlian"></i>
          </span>
          <span className="label" onClick={setOnClick}>
            设置 <i className="sp-icon sp-icon-shezhi1"></i>
          </span>
          <span className="label" onClick={fullscreen}>
            全屏 <i className="sp-icon sp-icon-quanping"></i>
          </span>
          <span className="label" onClick={openBooks}>
            阅读 <i className="sp-icon sp-icon-folder"></i>
          </span>
          <span className="label">
            个人 <i className="sp-icon sp-icon-icon_commonly_user"></i>
          </span>
        </div>
      </div>
      <SpModal
        footer={null}
        onClose={() => setSettingVisible(false)}
        onOk={() => setSettingVisible(false)}
        visible={visibleSetting}
      >
        <div slot="content"></div>
      </SpModal>
    </>
  );
};

export default Navbar;

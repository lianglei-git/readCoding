import React, { useEffect, useRef, useState } from "react";
import ToolLayout from "../tools/layout";
import "./index.less";
import { useSettingStore } from "@/hooks";
import { LayoutEnmu } from "@store/private/layoutConst";
import {SpModal, SpAffix, SpButton} from "../RewriteUI";
import { fullscreen } from "@/utils";


const Navbar = () => {
  const settingStore = useSettingStore();
  let [visibleSetting, setSettingVisible] = useState(false);
  const setOnClick = (e) => {
    setSettingVisible(true);
  };
  return (
    <>
      <div className='navbar_affix' offset-top={window.innerHeight / 2 - 150}>
        <div className="mutant_navbar">
         {/* <ToolLayout /> */}
          <span className="label" onClick={setOnClick}>
            设置 <i className="sp-icon sp-icon-shezhi1"></i>
          </span>
          <span className="label" onClick={fullscreen}>
            全屏 <i className="sp-icon sp-icon-quanping"></i>
          </span>

          <span className="label">
            文件 <i className="sp-icon sp-icon-folder"></i>
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
        <div slot="content">设置内通
        
        <SpButton size={"small"} type="link">点击一下</SpButton>
        <SpButton type={'dashed'}>点击一下</SpButton>
        </div>
      </SpModal>
    </>
  );
};

export default Navbar;

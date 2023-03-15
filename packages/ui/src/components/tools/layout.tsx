/** layout select */

import { useSettingStore } from "@/hooks";
import { LayoutEnmu } from "@store/private/layoutConst";
import { useEffect } from "react";

/**
 * 1:
 *    +=======================+
 *    + |--------| |--------| +
 *    + |  book  | |  view  | +
 *    + |--------| |--------| +
 *    + --------------------- +
 *    +          Code         +
 *    + --------------------- +
 *    +=======================+
 *
 *
 * 2:
 *    +======================+
 *    + |----| |----| |----| +
 *    + |    | |    | |    | +
 *    + |book| |view| |Code| +
 *    + |    | |    | |    | +
 *    + |----| |----| |----| +
 *    +======================+
 */

/** Select Layout  */
const ToolLayout = () => {
  const settingStore = useSettingStore();
  useEffect(() => {
    (window as any).changeLayout = settingStore.changeLayout;
  }, []);

  return (
    <sp-popover
      placement="right"
      title="修改布局"
      content={`
            <sp-button2 type='link' onclick="changeLayout(${LayoutEnmu.Horizontal})">水平布局</sp-button2>
            <sp-button2 type='link' onclick="changeLayout(${LayoutEnmu.Mutant})">其他布局</sp-button2>
            `}
      get-popup-container=".mutant_navbar"
    >
      布局<i className="sp-icon sp-icon-buju"></i>
    </sp-popover>
  );
};

export default ToolLayout;

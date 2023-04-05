import { useSettingStore } from "@/hooks";
import React from "react";
import GridLayout, { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const ReactGridLayout = WidthProvider(GridLayout);
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./index.less";
import { observer } from "mobx-react-lite";
// 1. https://boychina.github.io/posts/2020-09-27-react-grid-layout
// 2. https://blog.csdn.net/wang19970228/article/details/123514152
const Layout = () => {
  const SettingStore = useSettingStore();
  const layout = SettingStore.LayoutPlan;

  const onLayoutChange = (layout: any) => {
    if(layout.length > 0) {
      SettingStore.LayoutPlan = layout.map(item => {
        SettingStore.LayoutPlan.map(i2 => {
          if(i2.i == item.i) {
            item = Object.assign(i2,item );
          }
        });
        return item;
      })
    }
  };
  const onDragStart = (a, b, c, d, e: DragEvent) => {
    e.stopPropagation();
  };

  const onClose = (item: any, idx: number) => {
    item.show = false;
  };
  const content = layout.map((item: any, index: number) => {
    return (
      item.show && (
        <div key={item.i} className="wh100">
          <i
            className="sp-icon sp-icon-close"
            onClick={(e) => onClose(item, index)}
          ></i>
          <div key={item.i}>
            <item.component />
            {item.children && (
              <ReactGridLayout
                onDragStart={onDragStart}
                cols={6}
                rowHeight={window.innerHeight / 6 - 20}
                layout={item.children}
              >
                {item.children.map(
                  (i2: any, i2Index: number) =>
                    i2.show && (
                      <div key={i2.i} className="wh100">
                        <div>
                          <i
                            className="sp-icon sp-icon-close"
                            onClick={(e) => onClose(i2, i2Index)}
                          ></i>{" "}
                          <i2.component />{" "}
                        </div>
                      </div>
                    )
                )}
              </ReactGridLayout>
            )}
          </div>
        </div>
      )
    );
  });
  return (
    <ReactGridLayout
      className="layout"
      compactType={"horizontal"}
      layout={layout}
      cols={6}
      rowHeight={window.innerHeight / 6 - 10}
      autoSize
      onLayoutChange={onLayoutChange}
    >
      {content}
    </ReactGridLayout>
  );
};

export default observer(Layout);

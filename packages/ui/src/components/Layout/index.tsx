import { useSettingStore } from "@/hooks";
import React from "react";
import GridLayout, { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const ReactGridLayout = WidthProvider(GridLayout);
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './index.less'
import { observer } from "mobx-react-lite";
// 1. https://boychina.github.io/posts/2020-09-27-react-grid-layout
// 2. https://blog.csdn.net/wang19970228/article/details/123514152
const Layout = () => {

    const SettingStore = useSettingStore();
    const layout = SettingStore.LayoutPlan;

      const onLayoutChange = (layout) => {
        console.log(layout,'layout')
      }
      const onDragStart = (a,b,c,d,e:DragEvent) => {
        e.stopPropagation();
      }
      const content =  layout.map(item => {
        return <div key={item.i}>{
            item.children? <ReactGridLayout onDragStart={onDragStart} cols={6} layout={item.children}>{item.children.map(i2 => <div key={i2.i}>
                <i2.component />
            </div>)}</ReactGridLayout> :<item.component />
        }</div>
    })
    return <ReactGridLayout
    className="layout"
    compactType={'horizontal'}
    // style={{height: window.innerHeight}}
    layout={layout}
    cols={6}
    // rowHeight={210}
    autoSize
    onLayoutChange={onLayoutChange}
    >{content}</ReactGridLayout>
}

export default observer(Layout);
import CodingContainer from "@/containers/Coding"
import ReadBookContainer from "@/containers/ReadBook"
import ViewRenderContainer from "@/containers/ViewRender"

export enum LayoutEnmu {
    Horizontal,
    Mutant,
    Static
}

const ViewMap = {
    css: CodingContainer.CssContainer,
    js: CodingContainer.JsContainer,
    html:CodingContainer.HtmlContainer,
    view: ViewRenderContainer,
    read: ReadBookContainer,
    code: CodingContainer
}

const codePlan1 = [
    { i: 'css', x: 0, y: 0, w: 2, h: 1, show: true },
    { i: 'js', x: 2, y: 0, w: 2, h: 1, show: true },
    { i: 'html', x: 4, y: 0, w: 2, h: 1, show: true },
]

const planLayoutMain_Mutant: LayoutEnmu.Mutant | any = [
    { i: 'view', x: 3, y: 0, w: 3, h: 3, component: ViewRenderContainer, show: true },
    { i: 'read', x: 0, y: 0, w: 3, h: 3, component: ReadBookContainer, show: true },
    { i: 'code', x: 6, y: 3, w: 6, h: 3, children: codePlan1, show: true }
]



const codePlan2 = [
    { i: 'css', x: 0, y: 0, w: 6, h: 2, show: false },
    { i: 'js', x: 0, y: 2, w: 6, h: 2,  show: false },
    { i: 'html', x: 0, y: 0, w: 6,h: 6,show: true },
]

const planLayoutMain_Horizontal: LayoutEnmu.Horizontal | any = [
    { i: 'read', x: 0, y: 0, w: 2, h: 6, show: false },
    { i: 'view', x: 4, y: 0, w: 2, h: 6,  show: true },
    { i: 'code', x: 2, y: 0, w: 2, h: 6, /** children: codePlan2, */show: true }
]


export {
    planLayoutMain_Mutant,
    planLayoutMain_Horizontal,
    ViewMap
}
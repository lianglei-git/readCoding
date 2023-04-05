import CodingContainer from "@/containers/Coding"
import ReadBookContainer from "@/containers/ReadBook"
import ViewRenderContainer from "@/containers/ViewRender"

export enum LayoutEnmu {
    Horizontal,
    Mutant,
    Static
}

const codePlan1 = [
    { i: 'css', x: 0, y: 0, w: 2, h: 1, component: CodingContainer.CssContainer, show: true },
    { i: 'js', x: 2, y: 0, w: 2, h: 1, component: CodingContainer.JsContainer, show: true },
    { i: 'html', x: 4, y: 0, w: 2, h: 1, component: CodingContainer.HtmlContainer, show: true },
]

const planLayoutMain_Mutant: LayoutEnmu.Mutant | any = [
    { i: 'view', x: 3, y: 0, w: 3, h: 3, component: ViewRenderContainer, show: true },
    { i: 'read', x: 0, y: 0, w: 3, h: 3, component: ReadBookContainer, show: true },
    { i: 'code', x: 6, y: 3, w: 6, h: 3, children: codePlan1, show: true, component: CodingContainer }
]



const codePlan2 = [
    { i: 'css', x: 0, y: 0, w: 6, h: 2, component: CodingContainer.CssContainer, show: false },
    { i: 'js', x: 0, y: 2, w: 6, h: 2, component: CodingContainer.JsContainer, show: false },
    { i: 'html', x: 0, y: 0, w: 6,h: 6, component: CodingContainer.HtmlContainer, show: true },
]

const planLayoutMain_Horizontal: LayoutEnmu.Horizontal | any = [
    { i: 'read', x: 0, y: 0, w: 2, h: 6,  component: ReadBookContainer, show: true },
    { i: 'view', x: 4, y: 0, w: 2, h: 6, component: ViewRenderContainer, show: true },
    { i: 'code', x: 2, y: 0, w: 2, h: 6, /** children: codePlan2, */show: true, component: CodingContainer }
]


export {
    planLayoutMain_Mutant,
    planLayoutMain_Horizontal
}
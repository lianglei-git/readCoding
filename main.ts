import {createEl, listener} from '@sparrowend/ui/es/_utils/dom'
import unit2_1 from './units/2/2_1'
import unit1 from './units/1/index'

type TeeItem = {
    title: string;
    subTitle?: string;
    component?: () => any;
    children?: TeeItem[]
}
type ITee = Array<TeeItem>
const tee: ITee = [
    {
        title: '第一章',
        component: unit1
    },
    {
        title: '第二章',
        children: [
            {
                title: ' 2.1',
                subTitle: '实现常用容器',
                component: unit2_1
            }
        ]
    }
]


const teeClick = (e, item) => {
    console.log(item)
}

function treZimd(data, target, prefix?:any){
    data.map((item) => {
        if(item.children) {
            const parent = createEl('div');
            const b = createEl('b');
            b.innerText = prefix? prefix + item.title : item.title  ;
            target.append(b);
            listener(b,'click', (e) => teeClick(e, item));
            target.append(parent);
            treZimd(item.children, parent, prefix? prefix + '++': '++');
        }else {
            const el = createEl('div');
            el.innerText = prefix? prefix + item.title : item.title  ;
            listener(el,'click', (e) => teeClick(e, item));
            target.append(el);
        }
    })
}
window.onload = () => {
    treZimd(tee, document.body)
}
import { makeAutoObservable } from "mobx";

interface ICurFileInfo {
    key: string,
    content: string,
    extname: string,
    path: string,
    pos: string,
    children?: any[]
    // title: string,
}
class CodingStore {

    constructor() {
        makeAutoObservable(this);
    }

    curFileInfo!:ICurFileInfo;

    get CurExtname () {
        if(this.curFileInfo?.extname.includes('js')) {
            return 'javascript'
        }
        console.log(this.curFileInfo?.extname,'this.curFileInfo?.extname')
        return this.curFileInfo?.extname
    }

    get CurPanelCode ():string {
        return this.curFileInfo?.content || ''
    }
    get CurPath(){
        return this.curFileInfo?.path
    }

    // setCurPanelCode(value: string) {
    //     this.CurPanelCode = value;
    // }
    setCurFileInfo(p: ICurFileInfo) {
        this.curFileInfo = p;
    }
    // setCurPath(path: string) {
    //     this.CurPath = path;
    // }
}

export default CodingStore;
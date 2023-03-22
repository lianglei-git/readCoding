import { makeAutoObservable } from "mobx";

interface ICurFileInfo {
    key: string,
    content: string,
    extname: string,
    path: string,
    // title: string,
}
class CodingStore {

    constructor() {
        makeAutoObservable(this);
    }

    curFileInfo:ICurFileInfo| undefined;

    get CurExtname () {
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
import { makeAutoObservable } from "mobx";

class CodingStore {

    constructor(){
        makeAutoObservable(this);
    }

    CurPanelCode = '';
    CurPath = '';
    
    setCurPanelCode(value:string) {
        this.CurPanelCode = value;
    }
    setCurPath(path: string) {
        this.CurPath = path;
    }
}

export default CodingStore;
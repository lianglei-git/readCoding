import { makeAutoObservable } from "mobx";

class CodingStore {

    constructor(){
        makeAutoObservable(this);
    }

    CurPanelCode = '';
    
    setCurPanelCode(value:string) {
        this.CurPanelCode = value;
    }
}

export default CodingStore;
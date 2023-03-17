import React from "react";
import BookEntry from "./BookEntry";
import SettingAndLoadStore from "./SettingAndLoad";
import { makeObservable, observable } from "mobx";
import { webcontainerFiles_to_treeData } from "@/utils";
import CodingStore from "./Coding";

class AppStore {
    constructor() {
        makeObservable(this, {
            BootContainerInfo: observable
        })
    }
    Coding = new CodingStore();
    Books = new BookEntry();
    Setting = new SettingAndLoadStore(this);
    BootContainerInfo = {
        /** is load webContainer */
        isLoadedBootContainer: false,
        src: ''
    }
    BootContainerFiles= (process as any).env.template
    get TreeData() {
        return webcontainerFiles_to_treeData(this.BootContainerFiles)
    }
}

const appStore = new AppStore();
(globalThis as any).app = appStore
const AppStoreContext = React.createContext(appStore);

export { appStore, AppStoreContext, AppStore }
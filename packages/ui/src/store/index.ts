import React from "react";
import BookEntry from "./BookEntry";
import SettingAndLoadStore from "./SettingAndLoad";
import { computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { webcontainerFiles_to_treeData } from "@/utils";
import CodingStore from "./Coding";
import TreeDataStore from "./private/treeDataState";

class AppStore {
    constructor() {
        // makeObservable(this, {
        //     BootContainerInfo: observable,
        //     _treeData: observable,
        //     TreeData: computed
        // })
        makeAutoObservable(this);
    }

    Coding = new CodingStore();
    Books = new BookEntry();
    Setting = new SettingAndLoadStore(this);
    BootContainerInfo = {
        /** is load webContainer */
        isLoadedBootContainer: false,
        src: ''
    }
    TreeStore = new TreeDataStore(this);

    get TreeData() {
        return this.TreeStore.value;
    }
    set TreeData(value) {
        this.TreeStore.value = value;
    }
}

const appStore = new AppStore();
(globalThis as any).app = appStore
const AppStoreContext = React.createContext(appStore);

export { appStore, AppStoreContext, AppStore }
import React from "react";
import BookEntry from "./BookEntry";
import SettingAndLoadStore from "./SettingAndLoad";
import { computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { webcontainerFiles_to_treeData } from "@/utils";
import CodingStore from "./Coding";
import TreeDataStore from "./private/treeDataState";
import SpuiTesting from './plugins/Load/SpuiTesting'
import Plugins from "./plugins";
import { LoadingENUM } from "./plugins/Symbol";


class AppStore {
    constructor() {
        // makeObservable(this, {
        //     BootContainerInfo: observable,
        //     _treeData: observable,
        //     TreeData: computed
        // })
        makeAutoObservable(this);
    }

    static isCardCode = window.location.search.indexOf('cardCode') > -1;

    static createPluginsParams() {
        return [
            /** card coding */
            AppStore.isCardCode ? LoadingENUM['SpuiTesting'] : null
        ]
    }

    plugins = new Plugins(this, AppStore.createPluginsParams());
    Coding = new CodingStore();
    Books = new BookEntry();
    Setting = new SettingAndLoadStore(this);
    BootContainerInfo = {
        /** is load webContainer */
        isLoadedBootContainer: false,
        src: ''
    }
    TreeStore = new TreeDataStore(this);
}

const appStore = new AppStore();
(globalThis as any).app = appStore
const AppStoreContext = React.createContext(appStore);

export { appStore, AppStoreContext, AppStore }
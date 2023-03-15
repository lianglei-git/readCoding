import React from "react";
import BookEntry from "./BookEntry";
import SettingAndLoadStore from "./SettingAndLoad";
import { makeObservable, observable } from "mobx";
class AppStore {
    constructor(){

    }
    Books = new BookEntry();
    Setting = new SettingAndLoadStore(this);
}

const appStore = new AppStore();
(globalThis as any).app = appStore
const AppStoreContext = React.createContext(appStore);

export {appStore, AppStoreContext, AppStore}
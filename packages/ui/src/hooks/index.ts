import { AppStoreContext } from "@store/index";
import { useContext } from "react";
export * from './fileHooks'
const useAppStore = () => {
    return useContext(AppStoreContext)
}

/** 获取Books Store */
const useBooks = () => {
    return useAppStore().Books
}

/** 获取当前选中 Book */
const useActiveBook = () => {
    return useBooks().activeBook
}


const useSettingStore = ()=>{
    return useAppStore().Setting
}


export {
    useAppStore,
    useActiveBook,
    useBooks,
    useSettingStore
}
import { webcontainerFiles_to_treeData } from "@/utils";
import { AppStore } from "..";
import { toJS } from "mobx";


/** 内部为data 外部为value */
class TreeDataStore {

    constructor(public app: AppStore) { }
    OriginBootContainerFiles = (globalThis as any).process.env.template;
    _data = webcontainerFiles_to_treeData(this.OriginBootContainerFiles);


    static NotSureDisposeForPosition(_pos: string): (string | number)[] {
        const pos = _pos.split('-');
        pos.shift();
        return pos;
    }

    static DisposeForDirPosition(_pos: (string | number)[]) {
        _pos.pop();
    }

    copyTreeData() {
        return toJS(this._data)
    }

    get value() {
        return this._data;
    }

    set value(v) {
        this._data = v;
    }


    findSelectedParent(_pos: string = this.app.Coding.curFileInfo.pos, isDir?: undefined | boolean) {
        const pos = TreeDataStore.NotSureDisposeForPosition(_pos);
        const targetData = this.copyTreeData();
        if(isDir == void 0) {
            isDir = Array.isArray(this.app.Coding.curFileInfo?.children);
        }
        /** dispose directory */
        if (this.app.Coding.curFileInfo.content || isDir) {
            TreeDataStore.DisposeForDirPosition(pos);
        }

        /** top 0 */
        if (pos.length == 0) {
            console.error('待验证逻辑')
            return {
                targetData,
                findLevelData: targetData
            };
        }

        let index = pos.shift() as number;
        let findLevelData = targetData[index];
        while (pos.length > 0) {
            index = pos.shift() as number;
            if (findLevelData.children) {
                if (findLevelData.children[index].children) {
                    findLevelData = findLevelData.children[index];
                }
            }
        }

        // console.log('findLevelData ---> ', findLevelData);

        return {
            findLevelData: findLevelData.children,
            targetData
        }
    }

    reWriteValue(d: any) {
        this._data = d
    }


    deletePositionData(_pos: string = this.app.Coding.curFileInfo.pos) {
       if(_pos.length < 1) return;
       const pos: any[] = _pos.split('-');
       const findData = this.findSelectedParent(_pos);
       const idx =  pos[pos.length - 1];
       findData.findLevelData.splice(idx, 1);
       this.reWriteValue(findData.targetData);
    }

    addPositionData(_pos: string = this.app.Coding.curFileInfo.pos) {
    let copyPos = [app.Coding.curFileInfo.pos[0], ...pos];

    }



}

export default TreeDataStore;
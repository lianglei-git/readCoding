import { webcontainerFiles_to_treeData } from "@/utils";
import { AppStore } from "..";
import { computed, makeObservable, observable, toJS } from "mobx";
import { ChangePositionDataNameInput } from "./treeNameCmp";
import React from "react";

// console.log(process.env,'import.meta.envimport.meta.env')


/** 内部为data 外部为value */
class TreeDataStore {
  constructor(public app: AppStore) {
    makeObservable(this, {
      _data: observable,
      value: computed,
      expandedKeys: observable
    });
  }
  OriginBootContainerFiles = (process as any).env.template;
  _data = webcontainerFiles_to_treeData(this.OriginBootContainerFiles);

  static NotSureDisposeForPosition(_pos: string): (string | number)[] {
    const pos = _pos.split("-");
    pos.shift();
    return pos;
  }

  static DisposeForDirPosition(_pos: (string | number)[]) {
    _pos.pop();
  }

  copyTreeData() {
    return toJS(this._data);
  }

   expandedKeys = new Array();

  get value() {
    return this._data;
  }

  set value(v) {
    this._data = v;
  }

  /**
   * file: current Parent Tree data; dir: current Tree data
   */
  findSelectedParent(
    _pos: string = this.app.Coding.curFileInfo.pos,
    isDir?: undefined | boolean
  ): {
    findLevelData: any[];
    targetData: any[];
    path: string;
  } {
    const pos = TreeDataStore.NotSureDisposeForPosition(_pos);
    const targetData = this.copyTreeData();
    if (isDir == void 0) {
      isDir = Array.isArray(this.app.Coding.curFileInfo?.children);
    }
    /** dispose directory */
    if (!isDir) {
      TreeDataStore.DisposeForDirPosition(pos);
    }  

    /** top 0 */
    if (pos.length == 0) {
      console.error("待验证逻辑");
      return {
        targetData,
        findLevelData: targetData,
        path: "/",
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

    return {
      findLevelData: findLevelData.children,
      targetData,
      path: findLevelData.path,
    };
  }

  /** write tree data */
  reWriteValue(d: any) {
    this._data = d;
  }

  /** delete tree position data */
  deletePositionData(_pos: string = this.app.Coding.curFileInfo?.pos) {
    if (!_pos || _pos.length < 1) return;
    const pos: any[] = _pos.split("-");
    const findData = this.findSelectedParent(_pos, false);
    const idx = pos[pos.length - 1];
    findData.findLevelData.splice(idx, 1);
    this.reWriteValue(findData.targetData);
    return findData.targetData;
  }

  /** delete tree position data */
  addPositionData(
    isDir: boolean = false, // add Dir
    _pos: string = this.app.Coding.curFileInfo?.pos
  ) {
    if (!_pos || _pos.length < 1) return;
    let pos: any[] = _pos.split("-");
    if (this.app.Coding.curFileInfo?.content) {
      pos.pop();
    }
    const findData = this.findSelectedParent(_pos);
    pos.push(findData.findLevelData.length);
    const onFull = (value: string) => {
      findData.findLevelData.pop();
      const pd = {
        title: value,
        path: findData.path + "/" + value,
        extname: ".js",
        key: value,
      }
      if(isDir) {
        pd.children = [];
        pd.expanded = true
        // this.expandedKeys.push(value);
      }
      findData.findLevelData.push(pd);
      this.reWriteValue(findData.targetData);
    };

    const nd = {
      title: (
        <ChangePositionDataNameInput pos={pos.join("-")} onFull={onFull} />
      ),
      key: Date.now(),
    };
    if(isDir) {
      nd.children = [];
    }
    findData.findLevelData.push(nd);
    this.reWriteValue(findData.targetData);
  }
}

export default TreeDataStore;

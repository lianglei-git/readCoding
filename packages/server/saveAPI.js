import fs from "fs";
// const fs = require('fs');

const folderName = "saveDataDir";
const prefix = folderName + "/";
const maxFileCount = 20 * 1024 * 1024; // 20MB
mkdirSyncFolderName(folderName);

const MapKey = prefix + "SaveDataMap.json";
let MapKeyData = readOrCreateMapKeyData(MapKey);

/**
 * 获取当前正在使用的path
 * @returns {{path:string, keys: string[], count: number}}
 */
function getUsefileInfo() {
  const keys = Object.keys(MapKeyData);
  return MapKeyData[keys[keys.length - 1]];
}

let saveData = {};

// if (fs.statSync('data.json').size > maxFileCount)

/** 创建目录 */
function mkdirSyncFolderName(folderName) {
  try {
    fs.mkdirSync(folderName);
  } catch (err) {
    // console.error(err);
  }
}

/** 创建每一项 映射表 */
function createMapKeyDataItem(MapKeyData = null) {
  if (MapKeyData) {
    const info = getUsefileInfo();
    const count = info.count + 1;
    const key = "sd-" + count;
    MapKeyData[key] = {
      path: prefix + key + ".json",
      count,
      keys: [],
    };
    return MapKeyData;
  }
  return {
    "sd-1": {
      path: prefix + "sd-1.json",
      count: 1,
      keys: [] /** 这是这个文件里存储所有的keys */,
    },
  };
}

/** 读取文件路径映射表 */
function readOrCreateMapKeyData(_MapKey) {
  let data = createMapKeyDataItem();
  if (fs.existsSync(_MapKey)) {
    data = readFile(_MapKey);
  } else {
    core_writeFile(_MapKey, data);
  }
  return data;
}

// 读取 JSON 文件中的数据
function readFile(path) {
  try {
    const data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return {};
  }
}

// 将数据写入 JSON 文件
function core_writeFile(key, data) {
  try {
    fs.writeFileSync(key, JSON.stringify(data, null, 2));
    console.log("Data saved successfully!");
  } catch (err) {
    // console.error(err);
  }
}

// 添加新数据到 JSON 文件中
const addData = (path, key, newData) => {
    const data = readFile(path);
    data[key] = newData;
    core_writeFile(path, data);
};

// 获取所有数据
const getAllData = () => {
  return readFile();
};

/**
 * 根据key寻找data
 * @returns {{path:string, keys: string[], count: number}}
 */
const findDataForKey = (key) => {
  let findInfo = null;
  for (let k in MapKeyData) {
    let find = MapKeyData[k].keys.find((_k) => _k === key);
    if (find) {
      findInfo = MapKeyData[k];
      break;
    }
  }
  return findInfo;
};

/** 暴露 */
const getDataForKey = (key) => {
  let findInfo = findDataForKey(key);
  if(!findInfo) return null;
  let data = readFile(findInfo.path);
  return data[key]
};

/** 设置 */
const setDataForKey = (key, data) => {
  let info = getUsefileInfo();
  info.keys.push(key)
  if (fs.existsSync(info.path) && fs.statSync(info.path).size > maxFileCount) {
    MapKeyData = createMapKeyDataItem(MapKeyData);
    info = getUsefileInfo();
  }
  core_writeFile(MapKey, MapKeyData);
  addData(info.path, key, data);
};

export {
    getDataForKey,
    setDataForKey
}


// module.exports = {getDataForKey, setDataForKey}
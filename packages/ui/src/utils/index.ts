export * from './fullScreen'
import * as monaco from "monaco-editor";

const languageMap = {
    'ts': 'typescript',
    'js': 'javascript',
    'jsx': 'javascript',
    'tsx': 'typescript'
}


function webcontainerFiles_to_treeData(files){
    let treeData:any[] = []
    function recursion(target:any,_treeData:any[] = [], _path:any = '') {
        for(let k in target) {
            const path = _path +'/'+ k;
            const exact = path.lastIndexOf('.');
            let extname = 'ts'
            if(exact > -1) {
                extname = path.slice(exact+1)
            }

            let newTree:any = {
                key: path,
                title: k,
                path,
                extname: languageMap[extname] ? languageMap[extname]: extname
            }
            _treeData.push(newTree)
            if(target[k].directory) {
                newTree.children  =[]
                recursion(target[k].directory,newTree.children, path)
            }
            else {
                newTree.content = target[k].file.contents
                // console.log( monaco.Uri.parse(path))
                monaco.editor.createModel(
                    newTree.content,
                    newTree.extname,
                    monaco.Uri.parse(path)
                )
            }
        }
    }
    recursion(files, treeData);
    return treeData;
}


function treeData_to_webcontainerFiles(targetTreeData) {
    let obj = {};
    function recursion(target, treeData: any[]){
        console.log(treeData)
        treeData.map(item=> {
           if(item.children && Array.isArray(item.children)){
            target[item.title] = {
                directory: {}
            }
                recursion( target[item.title].directory, item.children);
           }else {
            target[item.title] = {
                file: {contents: item.content}
            }
           }
        })
    }
    recursion(obj, targetTreeData);
    return obj
}


function debounce (func: Function, time: number, immediate = false){
    let timer: number | null = null;
    return (...args: any) => {
        if (timer) clearInterval(timer)
        if (immediate) {
            if (!timer) func.apply(this, args);
            timer = window.setTimeout(() => {
                timer = null
            }, time)
        } else {
            timer = window.setTimeout(() => {
                func.apply(this, args)
            }, time)
        }
    }
  }
  
  function copyText(text){
    var textareaC = document.createElement('textarea');
    textareaC.setAttribute('readonly', 'readonly'); //设置只读属性防止手机上弹出软键盘
    textareaC.value = text;
    document.body.appendChild(textareaC); //将textarea添加为body子元素
    textareaC.select();
    var res = document.execCommand('copy');
    document.body.removeChild(textareaC);//移除DOM元素
    // console.log("复制成功");
    return res;
}



export {
    webcontainerFiles_to_treeData,
    debounce,
    treeData_to_webcontainerFiles,
    copyText
}
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


export {
    webcontainerFiles_to_treeData
}
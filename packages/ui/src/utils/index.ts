export * from './fullScreen'

function webcontainerFiles_to_treeData(files){
    let treeData:any[] = []
    function recursion(target:any,_treeData:any[] = [], _path:any = '') {
        for(let k in target) {
            const path = _path +'/'+ k
            let newTree:any = {
                key: k,
                title: k,
                path
            }
            _treeData.push(newTree)
            if(target[k].directory) {
                newTree.children  =[]
                recursion(target[k].directory,newTree.children, path)
            }
            else {
                newTree.content = target[k].file.contents
            }
        }
    }
    recursion(files, treeData);
    return treeData;
}


export {
    webcontainerFiles_to_treeData
}
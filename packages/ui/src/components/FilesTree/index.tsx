import React, {useEffect, useState} from 'react';
import TreeExample from './demo2';
import Tree from 'rc-tree';
import { useAppStore } from '@/hooks';
import TreeFiles from './tree';



// {
//     template: {
//         distory: {

//         },
//         'a.js': {
//             file: {
//                 contents: ''
//             }
//         }
//     }
// }

/** Files Select at Coding */
const FilesTree = () => {
    const app =useAppStore();
    const onSelect = (k, info) => {
        // console.log(info.node.path)
        app.Coding.setCurPath(info.node.path)
        app.Coding.setCurPanelCode(info.node.content)
    }
    return <TreeFiles treeData={app.TreeData} onSelect={onSelect} />
}

export default FilesTree;
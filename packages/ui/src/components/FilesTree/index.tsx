import React, {useEffect, useState} from 'react';
import TreeExample from './demo2';
import Tree from 'rc-tree';
import { useAddDir, useAddFile, useAppStore } from '@/hooks';
import TreeFiles from './tree';
import './index.less'
import { observer } from 'mobx-react-lite';
import { reaction, toJS } from 'mobx';
import { SpButton } from '../RewriteUI';


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
    const AddFile = useAddFile();
    const AddDir = useAddDir()
    const onSelect = (k, info) => {
        app.Coding.setCurFileInfo(info.node);
        // app.Coding.setCurPath(info.node.path)
        // app.Coding.setCurPanelCode(info.node.content)
    }
    return  <div>
<div className='constrol'>
    <SpButton type={'link'}  size='mini' onClick={AddFile} icon='sp-icon-chakanwenjianmulu'></SpButton>
    <SpButton type={'link'}  size='mini' onClick={AddDir} icon='sp-icon-folder'></SpButton>
</div>
<TreeFiles treeData={app.TreeData} onSelect={onSelect} />
    </div>
}

export default observer(FilesTree);
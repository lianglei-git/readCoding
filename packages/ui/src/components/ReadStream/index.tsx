/** readFile */

import { useBooks } from "@/hooks";
import {observer} from 'mobx-react-lite'
import React, { memo } from "react";


// TODO: 需要进行iframe优化
const ReadStream = () => {
    const books = useBooks();
    if(!books.activeBook) return <span>请选择图书📖</span>
    return <div style={{width: '100%', height: 'calc(100% - 50px)'}}>
         <iframe src={"/public/pdfjs/web/viewer.html?file="+books.activeBook.key}>加载中...</iframe>
        </div>
}

export default memo(ReadStream);
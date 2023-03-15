/** readFile */

import { useBooks } from "@/hooks";
import {observer} from 'mobx-react-lite'
import React from "react";


const Read = () => {
    const books = useBooks();
    return <div>
        {/* <div>书架</div>
        {books.bookMap.map(item => {
            return <div key={item.key}>{item.bookName}</div>
        })} */}
        </div>
}

export default observer(Read);
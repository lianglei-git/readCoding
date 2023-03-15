/** bookshelf */

import { useBooks } from "@/hooks";
import { observer } from "mobx-react-lite";
import React, { memo } from "react";
import UploadFile from "../UploadFile";
import { SpButton } from "../RewriteUI";
import "./index.less";

/**
 * View
 * |--------- ----------|
 * |  Cover  | BookName |
 * |  Cover  |          |
 * |  Cover  | Author   |
 * |--------- ----------|
 */
const BookShelf = (props:any) => {
  const books = useBooks();
  const onDoubleClick = () => {
    props?.BookShelfDoubleClick();
  }
  return (
    <div className="book_shelf">
      <UploadFile style={{ background: "none" }}>
        <SpButton type="link">导入图书</SpButton>
      </UploadFile>
      <div className="book_shelf-main">
      {books.bookMap.map((item) => {
        return (
          <dl 
          onClick={() => books.activeBook = item}
          onDoubleClick={onDoubleClick}
          className={["book_shelf-main__item", item.key == books.activeBook?.key ? 'active' : ''].join(' ')} 
          key={item.key}>
            <dd>封面</dd>
            <dt>
              <p>{item.bookName}</p>
              <p>{item.author}</p>
            </dt>
          </dl>
        );
      })}
      </div>
    
    </div>
  );
};

export default memo(observer(BookShelf));

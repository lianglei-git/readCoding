import { useBooks } from "@/hooks";
import "./index.less";
import { useEffect, useRef, useState } from "react";
import { SpButton } from "@/components/RewriteUI";
import React from "react";
import ReadStream from "@/components/ReadStream";
import UploadFile from "@/components/UploadFile";
import BookShelf from "@/components/BookShelf";

type ActiveType = "bookShelf" | "readFile" | "upload";

const Map: { [k: ActiveType | string]: any } = {
  bookShelf: BookShelf,
  readFile: ReadStream,
  upload: UploadFile,
};
/** read book view */
const ReadBookContainer = () => {
  const books = useBooks();
  const [active, setActive] = useState("bookShelf" as ActiveType);
  const onClick = (type: ActiveType) => {
    setActive(type);
  };
  const BookShelfDoubleClick = () => {
    console.log(books.activeBook);
    setActive("readFile");
  };

  return (
    <div className="ReadBookContainer">
      <div className="ReadBookContainer__tab">
        <SpButton
          type={active == "bookShelf" ? "primary" : "default"}
          onClick={() => onClick("bookShelf")}
        >
          书架
        </SpButton>
        <SpButton
          type={active == "readFile" ? "primary" : "default"}
          onClick={() => onClick("readFile")}
        >
          读书
        </SpButton>
        <SpButton
          type={active == "upload" ? "primary" : "default"}
          onClick={() => onClick("upload")}
        >
          上传
        </SpButton>
      </div>
      {active == "bookShelf" && (
        <BookShelf BookShelfDoubleClick={BookShelfDoubleClick} />
      )}
      {/* {active == "readFile" && ( */}
        <ReadStream
          style={{ display: active == "readFile" ? "block" : "none" }}
        />
      {/* )}  */}
      {active == "upload" && <UploadFile />}
    </div>
  );
};

export default ReadBookContainer;

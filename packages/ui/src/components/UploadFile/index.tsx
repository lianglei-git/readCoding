import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Spui from "@sparrowend/ui";
import './index.less'
import { useBooks } from "@/hooks";
import IL from "../Internationalization";

const UploadFile = (props:any) => {
  const books = useBooks();
  const onDrop = useCallback((acceptedFiles: File[], fileReject: any) => {
    if(fileReject.length > 0) {
      return Spui.Message({type: 'error', 'message': JSON.stringify(fileReject) + ' 文件不可识别'})
    }
    acceptedFiles.forEach(file =>{
      books.addBook(file as any);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} className="fullWatchUpload" style={{width: '100%', height: '100%', ...props?.style}}>
      <input {...getInputProps()} />
      {props.children ? props.children:
      isDragActive ? (
        <p>{IL('Drop the files here ...')}</p>
      ) : (
        <p>{IL(`Drag 'n' drop some files here, or click to select files`)}</p>
      )}
    </div>
  );
};



export default UploadFile;
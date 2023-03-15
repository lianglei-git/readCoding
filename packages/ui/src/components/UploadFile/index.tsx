import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Spui from "@sparrowend/ui";
import './index.less'
import { useBooks } from "@/hooks";

const UploadFile = () => {
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
    <div {...getRootProps()} className="fullWatchUpload">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};



export default UploadFile;
import React from "react";
import CodeEditor from "./src/components/CodeEditor";
import { AppStoreContext, appStore } from "./src/store/index";
import UploadFile from "@/components/UploadFile";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import './App.less'
import FilesTree from "@/components/FilesTree";
import './src/webContainer'


const App = () => {
  return (
    <AppStoreContext.Provider value={appStore}>
      <div>
        <Navbar />
        {/* <CodeEditor /> */}
        {/* <UploadFile /> */}
        <Layout />
        <FilesTree />
      </div>
    </AppStoreContext.Provider>
  );
};

export default App;

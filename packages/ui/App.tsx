import React from "react";
import CodeEditor from "./src/components/CodeEditor";
import { AppStoreContext, appStore } from "./src/store/index";
import UploadFile from "@/components/UploadFile";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import './App.less'

const App = () => {
  return (
    <AppStoreContext.Provider value={appStore}>
      <div>
        <Navbar />
        {/* <CodeEditor /> */}
        {/* <UploadFile /> */}
        <Layout />
      </div>
    </AppStoreContext.Provider>
  );
};

export default App;

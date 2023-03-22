import React from "react";
import CodeEditor from "./src/components/CodeEditor";
import { AppStoreContext, appStore } from "./src/store/index";
import UploadFile from "@/components/UploadFile";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import './public/reset.css'
import './App.less'
import './src/webContainer'


const App = () => {
  return (
    <AppStoreContext.Provider value={appStore}>
        <Navbar />
        {/* <CodeEditor /> */}
        {/* <UploadFile /> */}
        <Layout />
    </AppStoreContext.Provider>
  );
};

export default App;

import React from "react";
import CodeEditor from "./src/components/CodeEditor";
import { AppStoreContext, appStore } from "./src/store/index";
import UploadFile from "@/components/UploadFile";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import './App.less'
import './src/webContainer'

/**
 * TODO: PersistableLoadProcess with system load end; For transform loading...
 */
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

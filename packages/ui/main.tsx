import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import "@sparrowend/ui/dist/spui.css";
import { appStore } from "@store/index";
import { reaction } from "mobx";
const root = createRoot(document.querySelector("#root") as HTMLElement);

const dispose = reaction(
  () => appStore.Setting.PersistableLoadProcess.value,
  (v) => {
    if (v >= 90) {
      dispose();
      root.render(<App />);
    }
  },
  {
    fireImmediately: true,
  }
);

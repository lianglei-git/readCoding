import React from 'react';
import App from './App';
import { createRoot } from "react-dom/client";
import '@sparrowend/ui/dist/spui.css'
const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<App />)
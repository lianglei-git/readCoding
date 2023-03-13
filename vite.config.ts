import {defineConfig} from 'vite'
import babel from 'vite-plugin-babel';
import react from '@vitejs/plugin-react'
export default defineConfig({
    plugins: [
      react(),
        // babel({
        //     babelConfig: 
        //         {
        //             "presets": [
        //               "@babel/typescript",
        //               ["@babel/preset-react", {
        //                 "pragma": "element", // 默认是 React.createElement（仅在经典的运行时中）
        //                 "pragmaFrag": "DomFrag", // 默认是 React.Fragment（仅在经典的运行时中）
        //                 "throwIfNamespace": false, // 默认是 true
        //                 // "runtime": "automatic", // 默认是 classic
        //                 // "importSource": "@sparrowend/ui"
        //               }]
        //             ],
        //             "plugins": [
        //               "@babel/proposal-class-properties",
        //               "@babel/proposal-object-rest-spread"
        //             ]
                  
        //     }
        // })
    ]
})
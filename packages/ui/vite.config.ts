import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel';
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'
// import monacoEditorPlugin from "vite-plugin-monaco-editor"
import {transform_webcontainerFiles} from './private/transforms.node'
function _resolve(dir: string) {
  return path.resolve(__dirname, dir)
}


// console.log(monacoEditorPlugin.default,'monacoEditorPluginmonacoEditorPluginmonacoEditorPlugin')
const template = transform_webcontainerFiles(_resolve('./template'));
export default defineConfig({
  base: './',
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy' :'same-origin' 
    }
  },
  build: {
    // minify: 'terser',
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: false }],
          ["@babel/plugin-proposal-private-methods", { "loose": false }],
          "@babel/plugin-proposal-private-property-in-object"
        ],
      }
    }),
    // monacoEditorPlugin.default({}),
    process.env.NODE_ENV == 'production' && viteStaticCopy({
      targets: [
        {src: './public', dest: './'}
      ]
    })
    // babel()
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
  ],
  resolve: {
    alias: {
      '@': _resolve('src'),
      '@hooks': _resolve('src/hooks'),
      '@store': _resolve('src/store'),
      '@components': _resolve('src/components'),
    },
  },
  publicDir: false,
  define: {
    'process.env': {
      template 
    }
  }
})
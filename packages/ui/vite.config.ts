import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel';
import react from '@vitejs/plugin-react'
import path from 'path'
function _resolve(dir: string) {
  return path.resolve(__dirname, dir)
}
export default defineConfig({
  base: './',
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
  define: {
    'process.env': {}
  }
})
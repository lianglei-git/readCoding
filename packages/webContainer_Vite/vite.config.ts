import { defineConfig } from 'vite';
import path from 'path';
import transform_webcontainerFiles from './transforms.node'


const vite_tmpl = transform_webcontainerFiles(path.resolve('./test/react_tmpl'))

export default defineConfig({
  base: './',
  server: {
    cors: false,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy' :'same-origin' 
    }
  },
  define: {
    'process.env': {
      webContainerFiles: vite_tmpl
    }
  }
 
});

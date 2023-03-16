import { defineConfig } from 'vite';

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
 
});

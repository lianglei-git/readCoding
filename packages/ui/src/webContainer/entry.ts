import { WebContainer } from '@webcontainer/api';
1. 
// Call only once
const webcontainerInstance = await WebContainer.boot();


2. 
//  Working with the file system
// await webcontainerInstance.mount(projectFiles);



3. 
async function startDevServer() {
    const installProcess = await webcontainerInstance.spawn('pnpm', ['install']);
  
    const installExitCode = await installProcess.exit;
  
    if (installExitCode !== 0) {
      throw new Error('Unable to run pnpm install');
    }
  
    // `npm run dev`
    await webcontainerInstance.spawn('pnpm', ['run', 'dev']);
  }
  

4. 
//   webcontainerInstance.on('server-ready', (port, url) => (iframeEl.src = url));
/** read https://webcontainers.io/ */
// read: https://zhuanlan.zhihu.com/p/446329929

import { appStore } from '@store/index';
import { WebContainer } from '@webcontainer/api';
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css';

// const Files = process.env.webContainerFiles;




export async function writeIndexJS(path:string, content: string) {
    await webcontainerInstance.fs.writeFile(path, content);
};

/** @type {import('@webcontainer/api').WebContainer}  */
let webcontainerInstance: any;

window.addEventListener('load', async () => {
    // const value = Files.react_tmpl.directory.src.directory['App.tsx'].file.contents
    // textareaEl.value = value //Files['index.js'].file.contents;
    // textareaEl.addEventListener('input', (e) => {
    //     console.log(e.currentTarget.value)
    //     writeIndexJS(e.currentTarget.value);
    // });

    const terminal: any = new Terminal({
        convertEol: true,
    });
    setTimeout(() => {
const terminalEl: any = document.querySelector('.terminal');
        terminal.open(terminalEl);
    }, 5000)
    // Call only once
    console.log(appStore.BootContainerFiles,'appStore.BootContainerFiles')
  
    webcontainerInstance = await WebContainer.boot();
    await webcontainerInstance.mount(appStore.BootContainerFiles);
    // const packageJSON = await webcontainerInstance.fs.readFile('./react_tmpl/package.json', 'utf-8');
    // console.log(packageJSON);
    webcontainerInstance.on('server-ready', (port: any, url: any) => {
      console.log('asdljaslkdjalksdjka')
        appStore.BootContainerInfo.isLoadedBootContainer = true;
        appStore.BootContainerInfo.src = url
    });
    startShell(terminal);
});

/**
 * @param {Terminal} terminal
 */
async function startShell(terminal: Terminal) {
    const shellProcess = await webcontainerInstance.spawn('jsh');
    shellProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      })
    );
    const input = shellProcess.input.getWriter();
    terminal.onData((data) => {
      input.write(data);
    });
    return shellProcess;
  };
  
async function installDependencies(terminal: Terminal) {
    // Install dependencies
    const installProcess = await webcontainerInstance.spawn('pnpm', ['install']);
    installProcess.output.pipeTo(new WritableStream({
        write(data) {
            // console.log(data);
            terminal.write(data);
        }
    }));
    // Wait for install command to exit
    return installProcess.exit;
}


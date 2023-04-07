import './main.css';
import { WebContainer } from '@webcontainer/api';
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css';

const Files = process.env.webContainerFiles;
// console.log(Files,'Files')

// const tab = [] 

// for(let k in Files) {
//     if(Files['directory']){

//     }
// }




// read: https://zhuanlan.zhihu.com/p/446329929
(document.querySelector('#root') as any).innerHTML = `
<p>You can see WebContainer For Vite 🎉</p>
<div class="container">
<div class="editor">
  <textarea>I am a textarea</textarea>
</div>
<div class="preview">
  <span class='loadel'>
  请 iTerm 输入:
  <pre>
    1. cd react_tmpl
    2. pnpm install
    3. pnpm dev
  </pre>
  </span>
  <iframe src="loading.html"></iframe>
</div>
<div class="terminal"></div>
</div>
`

/** @type {HTMLIFrameElement | null} */
const iframeEl: any = document.querySelector('iframe');
const loadEl: any = document.querySelector('.loadel');
/** @type {HTMLTextAreaElement | null} */
const textareaEl: any = document.querySelector('textarea');

const terminalEl: any = document.querySelector('.terminal');

async function writeFileContent(content: string) {
    await webcontainerInstance.fs.writeFile('./react_tmpl/src/App.tsx', content);
};
/** @type {import('@webcontainer/api').WebContainer}  */
let webcontainerInstance: any;

window.addEventListener('load', async () => {
    iframeEl.style.opacity = 0;
    const value = Files.react_tmpl.directory.src.directory['App.tsx'].file.contents
    textareaEl.value = value //Files['index.js'].file.contents;
    textareaEl.addEventListener('input', (e) => {
        console.log(e.currentTarget.value)
        writeFileContent(e.currentTarget.value);
    });

    const terminal: any = new Terminal({
        convertEol: true,
    });
    terminal.open(terminalEl);
    // Call only once
    webcontainerInstance = await WebContainer.boot();
    await webcontainerInstance.mount(Files);
    const packageJSON = await webcontainerInstance.fs.readFile('./react_tmpl/package.json', 'utf-8');
    console.log(packageJSON);
    webcontainerInstance.on('server-ready', (port: any, url: any) => {
        iframeEl.src = url;
        loadEl.style.display = 'none';
        iframeEl.style.opacity = 1;
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


async function startDevServer() {
    // Run `npm run start` to start the Express app
    await webcontainerInstance.spawn('pnpm', ['run', 'start']);

    // Wait for `server-ready` event
    webcontainerInstance.on('server-ready', (port: any, url: any) => {
        iframeEl.src = url;
    });
}

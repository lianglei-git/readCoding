/** read https://webcontainers.io/ */
// read: https://zhuanlan.zhihu.com/p/446329929

import { appStore } from '@store/index';
import { WebContainer } from '@webcontainer/api';
import { reaction } from 'mobx';
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css';

// const Files = process.env.webContainerFiles;




export async function writeFileContent(path: string, content: string) {
  if (webcontainerInstance && webcontainerInstance.fs) {
    // console.log(path, 'writeFileContent')
    await webcontainerInstance.fs.writeFile(path, content);
  }
};

function createFile() {

}

function createDir(path: string) {
  webcontainerInstance.fs.mkdir(path);
}

export function webcontainerCreate(path, isDir) {
  if (isDir) {
    createDir(path);
  } else {
    writeFileContent(path, '');
  }
}

export const terminal: any = new Terminal({
  convertEol: true,
  cursorBlink: true,
});

/** @type {import('@webcontainer/api').WebContainer}  */
let webcontainerInstance: any;

window.addEventListener('load', async () => {
  // const value = Files.react_tmpl.directory.src.directory['App.tsx'].file.contents
  // textareaEl.value = value //Files['index.js'].file.contents;
  // textareaEl.addEventListener('input', (e) => {
  //     console.log(e.currentTarget.value)
  //     writeFileContent(e.currentTarget.value);
  // });


  // setTimeout(() => {
  //   const terminalEl: any = document.querySelector('.terminal');
  //   terminal.open(terminalEl);
  // })
  // Call only once

  webcontainerInstance = await WebContainer.boot();
  const dispose = reaction(() => appStore.Setting.PersistableLoadProcess.value, async (v) => {
    if (v == 100) {
      await webcontainerInstance.mount(appStore.TreeStore.OriginBootContainerFiles);

      // const packageJSON = await webcontainerInstance.fs.readFile('./react_tmpl/package.json', 'utf-8');
      // console.log(packageJSON);
      webcontainerInstance.on('server-ready', (port: any, url: any) => {
        console.log('记载完成!!!! url  :::: ', url)
        appStore.BootContainerInfo.isLoadedBootContainer = true;
        appStore.BootContainerInfo.src = url
      });
      if(location.search.indexOf('cardCode') > -1) {
        let e = await installDependencies(terminal)
        // await e;
        await startShell(terminal);
        e = await RunStart(terminal);
      }else {
        await startShell(terminal);
      }
      dispose();
    }
  }, { fireImmediately: true });
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
      terminal.write(data);
    }
  }));
  // terminal.ex
  // Wait for install command to exit
  return installProcess.exit;
}



async function RunStart(terminal: Terminal) {
  // Install dependencies
  const installProcess = await webcontainerInstance.spawn('pnpm', ['start']);
  installProcess.output.pipeTo(new WritableStream({
    write(data) {
      terminal.write(data);
    }
  }));
  // terminal.ex
  // Wait for install command to exit
  return installProcess.exit;
}


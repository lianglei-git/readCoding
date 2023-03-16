import './main.css'
import { WebContainer } from '@webcontainer/api';

/** @type {import('@webcontainer/api').WebContainer}  */
let webcontainerInstance;

window.addEventListener('load', async () => {
  // Call only once
//   webcontainerInstance = await WebContainer.boot();
});


(document.querySelector('#app') as any).innerHTML = `
<div class="container">
<div class="editor">
  <textarea>I am a textarea</textarea>
</div>
<div class="preview">
  <iframe src="loading.html"></iframe>
</div>
</div>
`

/** @type {HTMLIFrameElement | null} */
const iframeEl = document.querySelector('iframe');

/** @type {HTMLTextAreaElement | null} */
const textareaEl = document.querySelector('textarea');


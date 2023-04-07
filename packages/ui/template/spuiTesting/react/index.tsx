import React from 'react';
import ReactDOM from 'react-dom';
window.React = React;
window.ReactDOM = ReactDOM;
import '@sparrowend/ui/dist/spui.js'
import '@sparrowend/ui/dist/spui.css'
import './index.css';
window.onload = () => {
    window.mountNode = document.getElementById('container');
    import('./demo');

}
  
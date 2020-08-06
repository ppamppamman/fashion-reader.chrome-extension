import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

// content script to CRA app 실험
// Get the element to prepend our app to. This could be any element on a specific website or even just `document.body`.
const targetWebpageBody = document.getElementsByTagName('body')[0];

// Create a div to render the <App /> component to.
const app = document.createElement('div');

// Set the app element's id to `root`. This is the same as the element that create-react-app renders to by default so it will work on the local server too.
app.id = 'root';

// Prepend the <App /> component to the viewport element if it exists. You could also use `appendChild` depending on your needs.
if (targetWebpageBody) targetWebpageBody.prepend(app);
// experiment end 실험

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

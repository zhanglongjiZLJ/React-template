import React from 'react';
import ReactDOM from 'react-dom';
//import React, { Component } from 'react';  
// import ReactDOM from 'react-dom';  
import { createStore } from 'redux';  
import { Provider, connect } from 'react-redux';  
import './index.css';
// import CRouter from './router/router';
import App from './App';
// import Pages from './components/main/Pages';
import registerServiceWorker from './registerServiceWorker';


// const render = Component => {
//     ReactDOM.render(
//         <App />,
//         document.getElementById('root')
//     );
// };

// render(CRouter);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
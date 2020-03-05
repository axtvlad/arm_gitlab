import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css'
import * as serviceWorker from './serviceWorker';
import state from './redux/state'

ReactDOM.render(<App state={state.mainDocs}/>, document.getElementById('root'));
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css'
import * as serviceWorker from './serviceWorker';
import store from './redux/state'
import {BrowserRouter} from "react-router-dom";

let rerender = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                dispatch={store.dispatch.bind(store)}
                state={state}
            />
        </BrowserRouter>,
        document.getElementById('root'));
};

rerender(store.getState());

store.subscribe(rerender);

serviceWorker.unregister();


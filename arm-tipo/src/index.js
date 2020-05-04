import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css'
import * as serviceWorker from './serviceWorker';
import store from './redux/redux-store'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import './i18n';
// TODO REACTORING
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Suspense fallback={(<div><h1>Загрузка</h1></div>)}>
                <App/>
            </Suspense>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();


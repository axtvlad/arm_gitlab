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
import {Spin} from "antd";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Suspense
                fallback={(
                    <Spin
                        size={"large"}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%'
                        }}
                    />
                )}>
                <App/>
            </Suspense>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();
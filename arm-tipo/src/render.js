import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css'
import * as serviceWorker from './serviceWorker';
import {addType, updateTypeNameKz, updateTypeNameRu} from './redux/state'
import {BrowserRouter} from "react-router-dom";

export let rerender = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                updateTypeNameRu={updateTypeNameRu}
                updateTypeNameKz={updateTypeNameKz}
                state={state}
                addType={addType}
            />
        </BrowserRouter>,
        document.getElementById('root'));
};

serviceWorker.unregister();

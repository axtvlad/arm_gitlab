import './index.css';
import 'antd/dist/antd.css'
import * as serviceWorker from './serviceWorker';
import {rerender} from "./render";
import state from "./redux/state";

rerender(state);

serviceWorker.unregister();

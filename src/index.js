import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd'

ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <Provider store={store}>
            <App />
        </Provider>
    </LocaleProvider>

    , document.getElementById('root'));
registerServiceWorker();

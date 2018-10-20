import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RootStore from './stores/RootStore';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';

const rootStore = new RootStore()

const browserHistory = createBrowserHistory();
export let history = syncHistoryWithStore(browserHistory, rootStore.routingStore);

ReactDOM.render(
    <Provider store={rootStore}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
document.getElementById('root'));


window.STORE = rootStore
history.subscribe((location, action) => console.log(location.pathname));
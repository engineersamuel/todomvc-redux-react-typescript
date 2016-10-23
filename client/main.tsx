import React from 'react';
import ReactDOM from 'react-dom';
import {Store, createStore, compose} from 'redux';
import {Provider} from 'react-redux';

import App from './main/components/App';
import rootReducer from './main/reducer';

const initialState = {};

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any
    }
}

const store: Store<any> = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
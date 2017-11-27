import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {AuthReducer} from './reducer/AuthReducer';
import InitState from './InitState/AuthState';

const store = createStore(
    AuthReducer,
    InitState,
    applyMiddleware(thunk)
);

module.exports = store;
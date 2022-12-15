// Core
import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
// Reducers
import combine from './combined-reducers';

const middleware = applyMiddleware(thunk, createLogger());

const store = configureStore(
    { reducer: combine },
    { key: 'value' },
    middleware);

export default store;
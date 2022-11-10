import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';

const middleware = applyMiddleware(thunk, createLogger());

const store = configureStore({ reducer: rootReducer }, middleware); 

export default store;
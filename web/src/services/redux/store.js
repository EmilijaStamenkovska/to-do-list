import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import User from './reducers';
import { configureStore } from '@reduxjs/toolkit';

const middleware = applyMiddleware(thunk, createLogger());

const store = configureStore({ reducer: User }, middleware); 

export default store;
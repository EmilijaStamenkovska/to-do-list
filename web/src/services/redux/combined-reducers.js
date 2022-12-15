import { combineReducers } from "redux";
import todosReducer from './todos-reducer';
import usersReducer from './reducers';

export default combineReducers({
    users: usersReducer,
    todos: todosReducer
});

import { combineReducers } from "redux";
import todosReducer from './todos-reducer';
import usersReducer from './reducers';
import popupReducer from './popup-reducer';

export default combineReducers({
    users: usersReducer,
    todos: todosReducer,
    popup: popupReducer
});

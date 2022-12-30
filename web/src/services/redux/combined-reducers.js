import { combineReducers } from "redux";
import todosReducer from './todos-reducer';
import userReducer from './user-reducer';
import popupReducer from './popup-reducer';

export default combineReducers({
    users: userReducer,
    todos: todosReducer,
    popup: popupReducer
});

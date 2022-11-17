import {
    SET_ALL_TODOS,
    SET_ONE_TODO,
    SET_FINISHED_TODOS,
    SET_UNFINISHED_TODOS
} from './actions';

const initialState = {
    todos: [],
    todo_body: {
        title: '',
        description: '',
        done: 0,
        not_done: 1,
        _created: ''
    },
    finished_todos: [],
    unfinished_todos: []
};

export default function Todo (state = initialState, action) {

    switch (action.type) {
        case SET_ALL_TODOS:
            return {
                ...state,
                todos: action.payload
            };
        case SET_ONE_TODO:
            return {
                ...state,
                todo_body: action.payload
            };
        case SET_FINISHED_TODOS:
            return {
                ...state,
                finished_todos: action.payload
            };
        case SET_UNFINISHED_TODOS:
            return {
                ...state,
                unfinished_todos: action.payload
            };
    };
};

export const setAllTodos = (data) => {
    return {
        type: SET_ALL_TODOS,
        payload: data
    }
}

export const setOneTodo = (data) => {
    return {
        type: SET_ONE_TODO,
        payload: data
    };
};

export const setFinishedTodos = (data) => {
    return {
        type: SET_FINISHED_TODOS,
        payload: data
    };
};

export const setUnfinishedTodos = (data) => {
    return {
        type: SET_UNFINISHED_TODOS,
        payload: data
    };
};
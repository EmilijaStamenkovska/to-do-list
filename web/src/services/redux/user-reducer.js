import { SET_TOKEN, SET_USER } from './actions';

const initialState = {
    jwt_key: '',
    userdata: {
        username: '',
        email: ''
    },
};

export default function User(state = initialState, action) {
    
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                jwt_key: action.payload,
            };
        case SET_USER:
            return {
                ...state,
                userdata: action.payload
            };
        default:
            return state;
    };
};

export const setUserData = (data) => {
    return {
        type: SET_USER,
        payload: data
    };
};

export const setToken = (data) => {
    return {
        type: SET_TOKEN,
        payload: data
    };
};
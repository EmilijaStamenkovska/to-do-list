import { SET_POPUP, SET_POPUP_MESSAGE } from './actions';

const initialState = {
    active: false,
    message: ''
};

export default function Popup(state = initialState, action) {
    switch (action.type) {
        case SET_POPUP:
            return {
                ...state,
                active: action.payload
            };
        case SET_POPUP_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    };
};

export const setPopupActivation = (data) => {
    return {
        type: SET_POPUP,
        payload: data
    };
};

export const setPopupMessage = (data) => {
    return {
        type: SET_POPUP_MESSAGE,
        payload: data
    };
};
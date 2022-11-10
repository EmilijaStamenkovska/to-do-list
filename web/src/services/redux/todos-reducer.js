const constants = {
    GET_TODOS_REQUEST: "GET_TODOS_REQUEST",
    GET_TODOS_SUCCESS: "GET_TODOS_SUCCESS",
    GET_TODOS_FAIL: "GET_TODOS_FAIL"
};

const initialState = {
    todos: [],
    message: undefined
}

export default function reducer (state=initialState, action) {

    switch(action.type) {

        case constants.GET_TODOS_REQUEST:
            return {
                ...state
            }
        case constants.GET_TODOS_SUCCESS:
            return {
                ...state,
                todos: action.payload
            }
        case constants.GET_TODOS_FAIL:
            return {
                ...state,
                message: action.payload
            }

        default: return state
    }
}


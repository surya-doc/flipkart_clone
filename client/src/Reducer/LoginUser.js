import { ERROR_STATUS, LOGIN_REQUEST, LOG_OUT, SIGNIN } from "../ActionType";

export const logThisUser = (state = {user: null, status: null}, action) => {
    const{ type, payload, status } = action;
    switch(type){
        case LOGIN_REQUEST:
            const obj = payload;
            localStorage.setItem('prof', JSON.stringify({ prof: obj }));
            return{
                ...state,
                user: payload,
                status: status
            }
        case LOG_OUT:
            return{
                ...state,
                user: null,
                status: null
            }
        case ERROR_STATUS:
            return{
                ...state,
                status: payload
            }
        default: return state
    }
}

export const signInUser = (state = {user: null}, action) => {
    const{ type, payload } = action;
    switch(type){
        case SIGNIN:
            return{
                ...state,
                user_1: payload
            }
        default: return state
    }
}
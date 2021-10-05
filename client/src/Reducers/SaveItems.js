import { SAVE_ADDRESS, UPDATE_STORE } from "../ActionType";

export const itemsReducers = (state = {data: []}, action) => {
    const{type, payload} = action;
    switch(type){
        case UPDATE_STORE:
            return{
                ...state,
                data: payload
            }
        default: return state
    }
}

export const setLocation = (state = {location: []}, action) => {
    const{type, payload} = action;
    switch(type){
        case SAVE_ADDRESS:
            localStorage.setItem('loc', JSON.stringify({ location: payload }));
            return{
                ...state,
                location: payload
            }
        default: return state
    }
}
import { ADD_ITEMS_TO_REDUX, SET_ADDRESS } from "../ActionType";

export const addressReducer = (state = {location: null}, action) => {
    const{type, payload} = action;
    switch(type){
        case SET_ADDRESS:
            return{
                ...state,
                location: payload
            }
        default: return state;
    }
}

export const orderedItems = (state = {items: []}, action) => {
    const{type, payload} = action;
    switch(type){
        case ADD_ITEMS_TO_REDUX:
            return{
                ...state,
                items: payload
            }
        default: return state
    }
}
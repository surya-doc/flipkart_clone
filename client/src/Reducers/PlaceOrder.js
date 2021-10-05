import { PLACE_ORDER } from "../ActionType";

export const PlaceOrder = (state = {order: []}, action) => {
    const{type, payload} = action;
    switch (type) {
        case PLACE_ORDER:
            return{
                ...state,
                order: payload
            }
        default:
            return state
    }
}
import { CART_UPDATE, CART_UPDATE_WITH_USER } from "../ActionType";

export const cartItem = (state = {cart: [], totalNo: 0}, action) => {
    const{type, payload} = action;
    switch(type){
        case CART_UPDATE:
            return{
                ...state,
                cart: payload
            }
        case CART_UPDATE_WITH_USER:
            return{
                cart: payload.items,
                totalNo: payload.totalNum
            }
        default: return state;
    }
}
import { PLACE_ORDER } from "../ActionType";

export const placeOrder = (order) => async (dispatch) => {
    try {
        dispatch({
            type: PLACE_ORDER,
            payload: order
        })
    } catch (error) {
        console.log(error);
    }
}
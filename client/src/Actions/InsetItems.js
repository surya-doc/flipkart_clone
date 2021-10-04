import { SAVE_ADDRESS, UPDATE_STORE } from "../ActionType";
import axios from 'axios';

export const putItems = (items) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_STORE,
            payload: items
        })
    } catch (error) {
        console.log(error);
    }
}

export const saveAddress = (address, user) => async (dispatch) => {
    const loc = await axios.post('https://guarded-oasis-91779.herokuapp.com/location', {
        address, 
        user
    })
    try {
        dispatch({
            type: SAVE_ADDRESS,
            payload: address
        })
        return address;
    } catch (error) {
        console.log(loc);
        console.log(error);
    }
}
import axios from "axios"
import { ADD_ITEMS_TO_REDUX, SET_ADDRESS } from "../ActionType";

export const addressAction = (address, user) => async (dispatch) => {
    await axios.post('https://guarded-oasis-91779.herokuapp.com/address', {address: address, user});
    try {
        dispatch({
            type: SET_ADDRESS,
            payload: address
        })
    } catch (error) {
        console.log(error);
    }
}

export const getOrders = (users) => async (dispatch) => {
    const getAddress = await axios.get('https://guarded-oasis-91779.herokuapp.com/address', {params: {users: users}});
    try {
        dispatch({
            type: SET_ADDRESS,
            payload: getAddress.data.Address
        })
    } catch (error) {
        console.log(error);
    }
}

export const orderdItems = (user, items, location) => async (dispatch) => {
    const token = localStorage.getItem('token');
    for(var i=0; i<items.order.length; i++){
        items.order[i].orderDate = new Date();
        var date_2 = new Date();
        date_2.setDate(date_2.getDate()+7);
        items.order[i].deleveryDate = date_2;
        items.order[i].location = location;
    }
    const ordered = await axios.post('https://guarded-oasis-91779.herokuapp.com/order', {user: user, items, token})
    if(ordered.data.status === "Fail to verify"){
        localStorage.removeItem("prof");
    }
    const orders = await axios.get('https://guarded-oasis-91779.herokuapp.com/order', {params: {user: user}});
    try {
        dispatch({
            type: ADD_ITEMS_TO_REDUX,
            payload: orders.data.orderedItems
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAllOrders = (user) => async (dispatch) => {
    const orders = await axios.get('https://guarded-oasis-91779.herokuapp.com/order', {params: {user: user}});
    try {
        dispatch({
            type: ADD_ITEMS_TO_REDUX,
            payload: orders.data.orderedItems
        })
    } catch (error) {
        console.log(error);
    }
}
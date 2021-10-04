import axios from "axios";
import { CART_UPDATE_WITH_USER } from "../ActionType";

export const localCartNouser = (item) => async (dispatch) => {
    var existingCartItem = [];
    existingCartItem = JSON.parse(localStorage.getItem('localCart')) || [];
    var flag = 0;
    var itemCount = 0;
    if(existingCartItem.length){
        for(var i=0; i<existingCartItem.length; i++){
            itemCount = itemCount + existingCartItem[i].number;
            if(existingCartItem[i].id === item.id){
                flag = 1;
                existingCartItem[i].number = existingCartItem[i].number+1;
            }
        }
    }
    itemCount = itemCount+1;
    if(flag === 0){
        existingCartItem.push(item);
    }

    localStorage.setItem('localCart', JSON.stringify(existingCartItem));
    try {
        dispatch({
            type: CART_UPDATE_WITH_USER,
            payload: {
                items: existingCartItem,
                totalNum: itemCount
            }
        })
    } catch (error) {
       console.log(error);
    }
}

export const mainCartWithUser = (item, user) => async (dispatch) => {
    const token = localStorage.getItem("token");
    const e = await axios.get(`https://guarded-oasis-91779.herokuapp.com/cart`, {params: {query: user.prof.email, token}});
    var existingCartItem_1 = e.data ? e.data.cartItem : [];
    var flag_1 = 0;
    var cartItemNumber = 0;
    if(existingCartItem_1.length){
        for(var j=0; j<existingCartItem_1.length; j++){
            if(existingCartItem_1[j].id === item.id){
                flag_1 = 1;
                existingCartItem_1[j].number = existingCartItem_1[j].number+1;
            }
        }
    }
    if(flag_1 === 0){
        existingCartItem_1.push(item);
    }

    
    var existingCartItem_2 = [];
    existingCartItem_2 = JSON.parse(localStorage.getItem('localCart')) || [];
    var map = [];
    for(var i=0; i<=20; i++){
        map.push(0);
    }
    for(var c=0; c<existingCartItem_1.length; c++){
        map[existingCartItem_1[c].id] = 1;
    }
    if(existingCartItem_2.length){
        for(var b=0; b<existingCartItem_2.length; b++){
            if(map[existingCartItem_2[b].id] === 0){
                existingCartItem_1.push(existingCartItem_2[b]);
            }
        }
    }
    const tokenResponse = await axios.post('https://guarded-oasis-91779.herokuapp.com/cart', {cartItem: existingCartItem_1, user, token});

    if(tokenResponse.data.status === "Fail to verify"){
        localStorage.removeItem("prof");
    }
    for(var d=0; d<existingCartItem_1.length; d++){
        cartItemNumber = cartItemNumber+existingCartItem_1[d].number;
    }
    try {
        dispatch({
            type: CART_UPDATE_WITH_USER,
            payload: {
                items: existingCartItem_1,
                totalNum: cartItemNumber
            }
        })
    } catch (error) {
       console.log(error); 
    }
    
}

export const cartOnPageLoad = (user) => async (dispatch) => {
    const token = localStorage.getItem("token");
    if(user){
        const e = await axios.get(`https://guarded-oasis-91779.herokuapp.com/cart`, {params: {query: user.prof.email, token}});
        var existingCartItem_1 = e.data ? e.data.cartItem : [];
        var cartItemNumber = 0;
        if(existingCartItem_1){
            for(var d=0; d<existingCartItem_1.length; d++){
                cartItemNumber = cartItemNumber+existingCartItem_1[d].number;
            }
            try {
                dispatch({
                    type: CART_UPDATE_WITH_USER,
                    payload: {
                        items: existingCartItem_1,
                        totalNum: cartItemNumber
                    }
                })
            } catch (error) {
               console.log(error); 
            }
        }
        else{
            var existingCartItem_c = [];
            existingCartItem_c = JSON.parse(localStorage.getItem('localCart')) || [];
            var itemCount_c = 0;
            if(existingCartItem_c.length){
                for(var j=0; j<existingCartItem_c.length; j++){
                    itemCount_c = itemCount_c + existingCartItem_c[j].number;
                }
            }
            try {
                dispatch({
                    type: CART_UPDATE_WITH_USER,
                    payload: {
                        items: existingCartItem_c,
                        totalNum: itemCount_c
                    }
                })
            } catch (error) {
               console.log(error);
            }        
        }
    }
    else{
        var existingCartItem = [];
        existingCartItem = JSON.parse(localStorage.getItem('localCart')) || [];
        var itemCount = 0;
        if(existingCartItem.length){
            for(var i=0; i<existingCartItem.length; i++){
                itemCount = itemCount + existingCartItem[i].number;
            }
        }
        try {
            dispatch({
                type: CART_UPDATE_WITH_USER,
                payload: {
                    items: existingCartItem,
                    totalNum: itemCount
                }
            })
        } catch (error) {
           console.log(error);
        }
    }
}

export const itemRemove = (info, user) => async (dispatch) => {
    const token = localStorage.getItem("token");
    const tokenResponse = await axios.post('https://guarded-oasis-91779.herokuapp.com/singleupdate', {itemId: info, email: user.prof.email, token: token});
    if(tokenResponse.data.status === "Fail to verify"){
        localStorage.removeItem("prof");
    }
    if(user){
        const e = await axios.get(`https://guarded-oasis-91779.herokuapp.com/cart`, {params: {query: user.prof.email, token}});
        var existingCartItem_1 = e.data ? e.data.cartItem : [];
        var cartItemNumber = 0;
        for(var d=0; d<existingCartItem_1.length; d++){
            cartItemNumber = cartItemNumber+existingCartItem_1[d].number;
        }
        try {
            dispatch({
                type: CART_UPDATE_WITH_USER,
                payload: {
                    items: existingCartItem_1,
                    totalNum: cartItemNumber
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    else{
        var existingCartItem = [];
        existingCartItem = JSON.parse(localStorage.getItem('localCart')) || [];
        var itemCount = 0;
        existingCartItem = existingCartItem.filter((element) => element.id !== info);
        if(existingCartItem.length){
            for(var i=0; i<existingCartItem.length; i++){
                itemCount = itemCount + existingCartItem[i].number;
            }
        }
        localStorage.setItem('localCart', JSON.stringify(existingCartItem));
        try {
            dispatch({
                type: CART_UPDATE_WITH_USER,
                payload: {
                    items: existingCartItem,
                    totalNum: itemCount
                }
            })
        } catch (error) {
           console.log(error);
        }
    }
}

export const emptyCart = (user) => async (dispatch) => {
    const token = localStorage.getItem("token");
    const temp = await axios.post('https://guarded-oasis-91779.herokuapp.com/cart', {cartItem: [], user: user, token});
    if(temp.data.status === "Fail to verify"){
        localStorage.removeItem("prof");
    }
}
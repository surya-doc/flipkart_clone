import axios from 'axios';
import { ERROR_STATUS, LOGIN_REQUEST, LOG_OUT, SIGNIN } from '../ActionType';

export const checkToken = () => async (dispatch) => {
    console.log("tok tok tok token.");
    const token = localStorage.getItem("token");
    const res = await axios.post('https://guarded-oasis-91779.herokuapp.com/check', {token});
    if(res.data.status !== "Token verified"){
        localStorage.removeItem("prof");
    }
}


export const loginUser = (user) => async (dispatch) => {
    const res = await axios.post('https://guarded-oasis-91779.herokuapp.com/auth', user);
    if(res.data.status === "Success"){
        console.log(res.data.status);
        localStorage.setItem("token", res.data.token);
    }
    try {
        if(res.data.status === "Success"){
            dispatch({
                type: LOGIN_REQUEST,
                payload: res.data.result,
                status: res.data.status
            })
        }
        else{
            dispatch({
                type: ERROR_STATUS,
                payload: res.data.status
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const signIn = (user) => async (dispatch) => {
    const res = await axios.post('https://guarded-oasis-91779.herokuapp.com/signup', user);
    try {
        dispatch({
            type: SIGNIN,
            payload: user,
        })
    } catch (error) {
        console.log(res);
        console.log(error);
    }
}

export const logOut = (user) => async (dispatch) => {
    localStorage.removeItem("prof");
    try {
        dispatch({
            type: LOG_OUT,
            payload: null
        })
    } catch (error) {
        console.log(error);
    }
}
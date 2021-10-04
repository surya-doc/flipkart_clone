import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './Actions/Login';
import './Auth.css';
import { useHistory } from 'react-router-dom';

function Auth() {
    const[email, changeEmail] = useState("");
    const[password, setPassword] = useState("");
    const[logStas, changeLogStas] = useState("true");
    const[stat, setStat] = useState(false);
    const status = useSelector(state => state.currentUser.status)
    const dispatch = useDispatch();
    const history = useHistory();
    function GoToSignIn(event){
        history.push('/signup')
    }

    function userLogin(event){
        const user = {
            email: email,
            password: password
        }
        dispatch(loginUser(user));
        console.log("Stat", status);
        if(status === "Success"){
            history.push('/');
        }
        event.preventDefault();
    }
    
    return (
        <div className="flex md:w-full">
            <div className="left w-2/5 p-16 md:hidden" style={{backgroundColor: "#2874f0"}}>
                <h4 className="text-white text-2xl p-4">Login</h4>
                <p className="font-semibold pb-8 text-lg" style={{color: "#c1ccde"}}>Get access to your Orders, Wishlist and Recommendations</p>
                <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png" alt="loginImg" />
            </div>
            <div className="right w-3/5 bg-white p-8 md:w-full">
                <div style={{display: logStas === "false" ? "none" : "block"}}>
                    <form action="" onSubmit={userLogin}>
                        <input className="jxtForm" type="text" placeholder="Enter Email" onChange={(e) => {changeEmail(e.target.value)}}/>
                        <br />
                        <input className="jxtForm" type="password" placeholder="Enter Password" style={{marginTop: "40px", marginBottom: "40px"}} onChange={(e) => {setPassword(e.target.value)}}/>
                        <br />
                        <button style={{backgroundColor: "#fb641b", margin: "10px", padding: "10px 40px", width: "90%", color: "#FFF"}} onClick={() => {setStat(true)}}>Login</button>
                    </form>
                </div>
                {
                    status !== "Success" || null ? <p style={{display: stat ? "block" : "none", color: "red"}}>{status}</p> : console.log("A")
                }
                <button onClick={GoToSignIn} style={{display: logStas === "false" ? "none" : "block", marginTop: "2rem", textAlign: "center", width: "100%", color: "#2874f0"}}>New to Flipkart? Create an account</button>
                <button onClick={() => {changeLogStas("true")}} className="flex justify-center" style={{display: logStas === "true" ? "none" : "block", textAlign: "center", width: "50%", padding: "10px", color: "#2874f0", boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.4)", margin: "10px auto"}}>Existing User? Login</button>
            </div>
        </div>
    )
}
export default Auth

import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signIn } from './Actions/Login';
import Auth from './Auth';
import './Auth.css';
import TopHeader from './Components/Navbars/TopHeader';

function SignupForm() {
    const[signedIn, setSignedIn] = useState(false);
    const[password, setPassword] = useState("");
    const[email, setEmail] = useState("");
    const[name, setName] = useState("");
    const dispatch = useDispatch();

    function getData(event){
        event.preventDefault();
        console.log(password, email, name);
        const user = {
            password: password,
            email: email,
            name: name
        }
        dispatch(signIn(user));
        setSignedIn(true);
    }
    return (
        <div style={{backgroundColor: "#f1f3f6"}}>
            <TopHeader />
            <div className="loginPage w-12/12 min-h-screen" style={{display: signedIn ? "none" : "flex"}}>
                <div className="flex md:w-full shadow-lg">
                    <div className="left w-2/5 p-16 md:hidden" style={{backgroundColor: "#2874f0"}}>
                        <h4 className="text-white text-2xl p-4">Sign Up</h4>
                        <p className="font-semibold pb-8 text-lg" style={{color: "#c1ccde"}}>Get access to your Orders, Wishlist and Recommendations</p>
                        <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png" alt="loginImg" />
                    </div>
                    <div className="right w-3/5 bg-white p-8 md:w-full">
                        <div>
                            <form action="" onSubmit={getData}>
                                <input className="jxtForm mb-10" type="password" placeholder="Set Password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                                <br />
                                <input className="jxtForm mb-10" type="email" placeholder="Email Address" name="email" onChange={(e) => setEmail(e.target.value)}/>
                                <br />
                                <input className="jxtForm" type="text" placeholder="Full Name" name="name" onChange={(e) => setName(e.target.value)}/>
                                <br />
                                <button style={{backgroundColor: "#fb641b", margin: "10px", padding: "10px 40px", width: "90%", color: "#FFF"}}>Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="loginPage w-full min-h-screen" style={{display: signedIn ? "flex" : "none"}}>
                <Auth />
            </div>
        </div>
    )
}

export default SignupForm

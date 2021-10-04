import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { cartOnPageLoad, emptyCart } from '../../Actions/CartUpdates';
import { checkToken, loginUser } from '../../Actions/Login';
import { addressAction, orderdItems } from '../../Actions/Order';
import './Order.css';

function Order() {
    const[totalVal, setTotalVal] = useState(0);

    const{type} = useParams()
    const[email, changeEmail] = useState("");
    const[password, setPassword] = useState("");
    const[open, setOpen] = useState("login");
    const[name, setName] = useState("");
    const[mobile, setMobile] = useState("");
    const[pin, setPin] = useState("");
    const[local, setLocal] = useState("");
    const[address, setAddress] = useState("");
    const[city, setCity] = useState("");
    const[stat, setStat] = useState("");
    const[land, setland] = useState("");
    const[alt, setAlt] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    var user = JSON.parse(localStorage.getItem('prof'));
    const token = localStorage.getItem('token');

    const orders = useSelector(state => state.order);
    const status = useSelector(state => state.currentUser.status);
    const location = useSelector(state => state.location.location);
    const loc = useSelector(state => state.location.location);
    const userFromRedux = useSelector(state => state.currentUser.user);

    async function userLogin(event){
        
        const user1 = {
            email: email,
            password: password
        }
        dispatch(loginUser(user1));
        if(status === "Success"){
            user = {
                email: email
            }
        }
        event.preventDefault();
    }

    

    function getAddressDetails(event){
        const fullAddress = {
            name: name,
            mobile: mobile,
            pin: pin,
            local: local,
            address: address,
            city: city,
            stat: stat,
            land: land,
            alt: alt
        }
        dispatch(addressAction(fullAddress, user));
        event.preventDefault();
    }

    async function emptycart(){
        dispatch(orderdItems(user, orders, location));
        if(type === "cart"){
            dispatch(emptyCart(user));
        }
        dispatch(cartOnPageLoad(user));
        history.push("/myorder");
    }

    useEffect(() => {
        async function getTheLocation(){        
            const getAddress = user ? await axios.get('https://guarded-oasis-91779.herokuapp.com/address', {params: {users: user.prof}}) : null;
            if(getAddress != null && getAddress.data.Address === null){
                setOpen("delivery");
            }
        }
        getTheLocation();
    },[])

    useEffect(() => {
        dispatch(checkToken());
    }, [dispatch])

    useEffect(() => {
        async function valueChecker(){
            if(user){
                setTotalVal(1);
                if(loc){
                    console.log(loc);
                    setTotalVal(2);
                }
            }
        }
        valueChecker();
    },[userFromRedux])
    
    return (
        <div className="min-h-screen" style={{backgroundColor: "#f1f3f6"}}>
            <div className="topHeader md:hidden logo cursor-pointer pl-40 py-1" onClick={() => {history.push('/')}} style={{backgroundColor: "#2874f0"}}>
                <img className="w-16 h-4 mt-2" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png" alt="flipkart" />
                <div className="flex text-xs">
                    <p style={{color: "#FFF", fontFamily: "Roboto, Arial, sans-serif", fontStyle: "italic", fontSize: "10px"}}> Explore<span style={{color: "#f2de0e", fontWeight: "700"}}>Pluss</span></p>
                    <img className="flex w-2 h-2" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png" alt="plus" />
                </div>
            </div>
            <div className="topHeader hidden md:flex items-center py-3 text-lg logo cursor-pointer pl-10" onClick={() => {history.push('/')}} style={{backgroundColor: "#2874f0", color: "#FFF"}}>
                <i class="fas fa-arrow-left"></i>
                <p className="ml-2">Order Summary</p>
            </div>

            {/* for large screen */}
            <div className="top-14 relative pb-8 md:hidden" style={{backgroundColor: "#f1f3f6"}}>
                <div className="left w-2/3">
                    <div className="order-form w-full shadow-lg" style={{display: totalVal >= 1 ? "flex" : "none"}}>
                        <p className="mx-4 py-1 px-2 text-xs font-semibold" style={{backgroundColor: "#f0f0f0", color: "#2874f0"}}>1</p>
                        <p className="font-bold" style={{color: "#949494"}}>LOGIN OR SIGNUP</p>
                        <i class="fas fa-sm fa-check" style={{marginLeft: "20px", color: "#2c4d84"}}></i>
                    </div>
                    {/* if not loggedin */}
                    <div className="order-form w-full shadow-lg pt-0 pl-0 pr-0" style={{display: totalVal >= 1 ? "none" : "block"}}>
                        <div className="order-form flex m-0" style={{backgroundColor: "#2874f0"}}>
                            <p className="mx-4 py-1 px-2 text-xs font-semibold rounded-sm" style={{backgroundColor: "#FFF", color: "#2874f0"}}>1</p>
                            <p className="font-bold" style={{color: "#FFF"}}>LOGIN OR SIGNUP</p>
                        </div>
                        <div className="flex">
                            <div className="form-pert w-2/5 ml-3 pt-10">
                            <form action="" onSubmit={userLogin}>
                                <input className="jxtForm" type="text" placeholder="Enter Email" onChange={(e) => {changeEmail(e.target.value)}}/>
                                <p style={{display: status !== "Success" ? "block" : "none", color: "red"}}>{status}</p>
                                <input className="jxtForm" type="text" placeholder="Enter Password" style={{marginTop: "40px", marginBottom: "40px"}} onChange={(e) => {setPassword(e.target.value)}}/>
                                <button className="px-14 py-2 mt-4 w-11/12 shadow-md" style={{backgroundColor: "#fb641b", color: "#FFF", borderRadius: "2px"}} onClick={(e) => {status === "Success" ? setTotalVal(2) : console.log("abcd")}}>CONTINUE</button>
                            </form>
                            </div>
                            <div className="advantage-pert w-3/5 pl-20 pt-10">
                                <p className="text-sm" style={{color: "#949494"}}>Advantages of our secure login</p>
                                <p className="text-sm my-3"><i class="fas fa-sm fa-truck" style={{color: "#2874f0", padding: "0px 4px"}}></i> Easily Track Orders, Hassle free Returns</p>
                                <p className="text-sm my-3"><i class="fas fa-sm fa-bell" style={{color: "#2874f0", padding: "0px 4px"}}></i> Get Relevant Alerts and Recommendation</p>
                                <p className="text-sm my-2"><i class="fas fa-xs fa-star" style={{color: "#2874f0", padding: "0px 4px"}}></i> Wishlist, Reviews, Ratings and more.</p>
                            </div>
                        </div>
                    </div>
                    
                    
                    {/* delivary address */}
                    <div className="order-form w-full shadow-lg" style={{display: totalVal === 0 ? "block" : "none"}}>
                        <div className="flex justify-between">
                            <div className="flex">
                                <p className="mx-4 py-1 px-2 text-xs font-semibold h-6" style={{backgroundColor: "#FFF", color: "#2874f0"}}>2</p>
                                <p className="font-bold" style={{color: "#949494"}}>DELIVERY ADDRESS</p>
                            </div>
                        </div>
                    </div>

                    <div className="order-form w-full shadow-lg" style={{display: totalVal >= 2 ? "block" : "none"}}>
                        <div className="flex justify-between">
                            <div className="flex">
                                <p className="mx-4 py-1 px-2 text-xs font-semibold h-6" style={{backgroundColor: "#f0f0f0", color: "#2874f0"}}>2</p>
                                <p className="font-bold" style={{color: "#949494"}}>DELIVERY ADDRESS</p>
                            </div>
                            <button type="submit" className="ml-16 rounded-sm float-right px-4 py-2 font-semibold" style={{color: "#2874f0", border: "1px solid #e0e0e0"}} onClick={(e) => setTotalVal(1)}>CHANGE</button>
                        </div>
                        <div className="flex ml-16 text-sm" style={{letterSpacing: "1px"}}>
                            <p>{location ? location.name : console.log("null")}, </p>
                            <p>{location ? location.local : console.log("null")}, </p>
                            <p>{location ? location.city : console.log("null")}, </p>
                            <p>{location ? location.stat : console.log("null")}, </p>
                            <p>{location ? location.pin : console.log("null")}</p>
                        </div>
                    </div>
                    
                    <div className="order-form w-full shadow-lg pt-0 pl-0 pr-0" style={{display: totalVal >= 2 || totalVal < 1 ? "none" : "block", backgroundColor: "#f5faff"}}>
                        <div className="order-form flex m-0" style={{backgroundColor: "#2874f0"}}>
                            <p className="mx-4 py-1 px-2 text-xs font-semibold rounded-sm" style={{backgroundColor: "#FFF", color: "#2874f0"}}>2</p>
                            <p className="font-bold" style={{color: "#FFF"}}>DELIVERY ADDRESS</p>
                        </div>
                        {/* for large screen side by side */}
                        <div className="form px-10 py-8 w-5/5 md:hidden">
                            <form action="" onSubmit={getAddressDetails}>
                                <div className="two-rows flex justify-between">
                                    <input className="address-box rounded-sm" type="text" placeholder="Name" onChange={(event) => setName(event.target.value)} required/>
                                    <input className="address-box rounded-sm" type="text" placeholder="10-digit mobile number" onChange={(event) => setMobile(event.target.value)} required/>
                                </div>
                                <div className="two-rows flex justify-between">
                                    <input className="address-box rounded-sm" type="text" placeholder="Pincode" onChange={(event) => setPin(event.target.value)} required/>
                                    <input className="address-box rounded-sm" type="text" placeholder="Locality" onChange={(event) => setLocal(event.target.value)} required/>
                                </div>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Address (Area and Street)" style={{marginLeft: "10px"}} onChange={(event) => setAddress(event.target.value)}></textarea>
                                <div className="two-rows flex justify-between">
                                    <input className="address-box rounded-sm" type="text" placeholder="City/District/Town" onChange={(event) => setCity(event.target.value)} required/>
                                    <select class="form-select address-box w-40" aria-label="Default select example" onChange={(event) => setStat(event.target.value)}>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chandigarh">Chandigarh</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Dadra &amp; Nagar Haveli &amp; Daman &amp; Diu">Dadra &amp; Nagar Haveli &amp; Daman &amp; Diu</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jammu &amp; Kashmir">Jammu &amp; Kashmir</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Andaman &amp; Nicobar Islands">Andaman &amp; Nicobar Islands</option>
                                    <option value="Ladakh">Ladakh</option>
                                    <option value="Lakshadweep">Lakshadweep</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Puducherry">Puducherry</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="West Bengal">West Bengal</option>




                                    </select>
                                </div>
                                <div className="two-rows flex justify-between">
                                    <input className="address-box rounded-sm" type="text" placeholder="Landmark (Optional)" onChange={(event) => setland(event.target.value)}/>
                                    <input className="address-box rounded-sm" type="text" placeholder="Alternate Phone (Optional)" onChange={(event) => setAlt(event.target.value)}/>
                                </div>
                                <button type="submit" className="ml-2 rounded-sm" style={{backgroundColor: "#fb641b", color: "#FFF", padding: "14px 28px"}} onClick={(e) => {setTotalVal(totalVal+1)}}>SAVE AND DELIVER HERE</button>
                            </form>
                        </div>
                    </div>

                    <div className="bg-white w-full mt-8 shadow-lg" style={{display: totalVal >= 2 ? "block" : "none", marginLeft: "60px"}}>
                        <div className="order-form flex m-0" style={{backgroundColor: "#2874f0"}}>
                            <p className="mx-4 py-1 px-2 text-xs font-semibold rounded-sm" style={{backgroundColor: "#FFF", color: "#2874f0"}}>3</p>
                            <p className="font-bold" style={{color: "#FFF"}}>ORDER SUMMARY</p>
                        </div>
                            {
                                orders.length !== 0 
                                ? 
                                orders.order.map((element) => (
                                    <div className="item">
                                        <div className="singleItem flex p-4">
                                            <div className="flex-col justify-center items-center">
                                                <img className="w-24 h-28" src={element.image} alt="elementimg" />
                                                <div className="flex items-center mt-3">
                                                    {
                                                        element.number ? 
                                                        <p className="px-4 py-1 mx-2" style={{border: "1px solid #dbdde0", color: "red"}}>{element.number}</p>
                                                        :
                                                        <p className="px-4 py-1 mx-2" style={{border: "1px solid #dbdde0"}}>{1}</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="middle pl-8">
                                                <h4>{element.title}</h4>
                                                <p>Seller</p>
                                                <div className="allprice flex pt-2 pb-3 items-center">
                                                    <h5 className="afterDis tracking-wide text-lg"><i class="fas fa-rupee-sign"></i>{element.number ? Math.round(element.afterDiscount*element.number) : Math.round(element.afterDiscount)}</h5>
                                                    <h5 className="beforeDis text-md px-2 line-through" style={{color: "#8f8f8f"}}><i class="fas fa-rupee-sign"></i>{element.number ? Math.round(element.price*element.number) : Math.round(element.afterDiscount)}</h5>
                                                    <h5 className="dis text-lg" style={{color: "#26a541", fontSize: "16px", lineHeight: "18px", fontWeight: "600", fontFamily: "Roboto, Arial, sans-serif"}}>{element.discount}% off</h5>
                                                </div>
                                                <div className="flex">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                console.log("Loading!!", orders)
                            }
                            <button className="ml-2 my-8 rounded-sm" style={{backgroundColor: "#fb641b", color: "#FFF", padding: "14px 28px"}} onClick={(e) => {setTotalVal(4)}}>PROCEED</button>
                    </div>


                    <div className="order-form w-full flex shadow-lg">
                        <p className="mx-4 py-1 px-2 text-xs font-semibold" style={{backgroundColor: "#f0f0f0", color: "#2874f0"}}>4</p>
                        <p className="font-bold" style={{color: "#949494"}}>PAYMENT OPTIONS</p>
                        <h4 className="ml-6 font-semibold" style={{color: "#2874f0"}}>Cash On Delivery</h4>
                        <p className="ml-6 font-semibold" style={{color: "#26a541"}}>Available</p>
                    </div>
                </div>
                <button className="ml-14 my-8 rounded-sm shadow-xl" style={{display: totalVal >= 4 ? "block" : "none", backgroundColor: "#fb641b", color: "#FFF", padding: "14px 28px"}} onClick={emptycart}>ORDER</button>
            </div>
                            
            {/* for small screen */}
            <div className="hidden md:block top-14 relative pb-8" style={{backgroundColor: "#f1f3f6"}}>
                <div>
                        <div className="py-2 shadow-lg justify-center items-center bg-white" style={{display: totalVal >= 1 ? "flex" : "none"}}>
                        <p className="font-bold" style={{color: "#949494"}}>LOGIN OR SIGNUP</p>
                        <i class="fas fa-sm fa-check" style={{marginLeft: "20px", color: "#2c4d84"}}></i>
                    </div>
                        {/* if not loggedin */}
                        <div className="w-full shadow-lg pt-0 pl-0 pr-0" style={{display: totalVal >= 1 ? "none" : "block", backgroundColor: "#FFF"}}>
                            <div className="flex justify-center">
                                <div className="w-3/4 ml-3 pt-10">
                                    <form action="" onSubmit={userLogin}>
                                        <input className="jxtForm" type="text" placeholder="Enter Email/Mobile Number" onChange={(e) => {changeEmail(e.target.value)}}/>
                                        <p style={{display: status !== "Success" ? "block" : "none", color: "red"}}>{status}</p>
                                        <input className="jxtForm" type="text" placeholder="Enter Password" style={{marginTop: "40px", marginBottom: "40px"}} onChange={(e) => {setPassword(e.target.value)}}/>
                                        <button className="px-8 py-2 mt-2 mb-4 w-8/12 shadow-md" style={{backgroundColor: "#fb641b", color: "#FFF", borderRadius: "2px"}} onClick={(e) => {status === "Success" ? setTotalVal(2) : console.log("abcd")}}>CONTINUE</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                        
                        {/* delivary address */}
                        <div className="w-full shadow-lg mt-4 pl-2 pb-4" style={{display: totalVal >= 2 ? "block" : "none", backgroundColor: "#FFF"}}>
                            <p className="text-xl">{location ? location.name : console.log("null")}</p>
                            <p className="text-lg">{location ? location.address : console.log("null")}</p>
                            <div className="flex">
                                <p className="text-lg">{location ? location.city : console.log("null")}</p>
                                <p className="text-lg">-{location ? location.pin : console.log("null")}</p>
                            </div>
                            <p className="text-lg pb-4 pt-2">{location ? location.mobile : console.log("null")}</p>
                            <button type="submit" className="px-14 py-1 mt-2 text-lg rounded-sm mx-auto relative flex" style={{backgroundColor: "#2874f0", color: "#FFF"}} onClick={(e) => {setTotalVal(1)}}>Change</button>

                            {/* <div className="flex ml-16 text-sm" style={{letterSpacing: "1px"}}>
                            </div> */}
                        </div>
                        
                        <div className="w-full shadow-lg pt-0 pl-0 pr-0" style={{display: totalVal >= 2 || totalVal < 1 ? "none" : "block", backgroundColor: "#f5faff"}}>
                            <div className="order-form flex m-0" style={{backgroundColor: "#2874f0"}}>
                                <p className="mx-4 py-1 px-2 text-xs font-semibold rounded-sm" style={{backgroundColor: "#FFF", color: "#2874f0"}}>2</p>
                                <p className="font-bold" style={{color: "#FFF"}}>DELIVERY ADDRESS</p>
                            </div>
                            {/* for small screen */}
                            <div className="px-10 py-8 w-5/5 hidden md:block">
                                <form action="" onSubmit={getAddressDetails}>
                                    <input className="address-box_1 rounded-sm" type="text" placeholder="Name" onChange={(event) => setName(event.target.value)} required/>
                                    <input className="address-box_1 rounded-sm" type="text" placeholder="10-digit mobile number" onChange={(event) => setMobile(event.target.value)} required/>
                                    <input className="address-box_1 rounded-sm" type="text" placeholder="Pincode" onChange={(event) => setPin(event.target.value)} required/>
                                    <input className="address-box_1 rounded-sm" type="text" placeholder="Locality" onChange={(event) => setLocal(event.target.value)} required/>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Address (Area and Street)" style={{marginLeft: "10px"}} onChange={(event) => setAddress(event.target.value)}></textarea>
                                        <input className="address-box_1 rounded-sm" type="text" placeholder="City/District/Town" onChange={(event) => setCity(event.target.value)} required/>
                                        <select class="form-select address-box_1 w-40" aria-label="Default select example" onChange={(event) => setStat(event.target.value)}>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Dadra &amp; Nagar Haveli &amp; Daman &amp; Diu">Dadra &amp; Nagar Haveli &amp; Daman &amp; Diu</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jammu &amp; Kashmir">Jammu &amp; Kashmir</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Andaman &amp; Nicobar Islands">Andaman &amp; Nicobar Islands</option>
                                        <option value="Ladakh">Ladakh</option>
                                        <option value="Lakshadweep">Lakshadweep</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Puducherry">Puducherry</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="West Bengal">West Bengal</option>




                                        </select>
                                    <input className="address-box_1 rounded-sm" type="text" placeholder="Landmark (Optional)" onChange={(event) => setland(event.target.value)}/>
                                    <input className="address-box_1 rounded-sm" type="text" placeholder="Alternate Phone (Optional)" onChange={(event) => setAlt(event.target.value)}/>
                                    <button type="submit" className="ml-2 rounded-sm" style={{backgroundColor: "#fb641b", color: "#FFF", padding: "14px 28px"}} onClick={(e) => {setTotalVal(totalVal+1)}}>SAVE AND DELIVER HERE</button>
                                </form>
                            </div>
                        </div>

                        
                        {/* order summary */}
                        {/* for small screen */}
                        <div className="bg-white mt-8 shadow-lg hidden md:block" style={{display: totalVal >= 2 ? "block" : "none"}}>
                                {
                                    orders.length !== 0 
                                    ? 
                                    orders.order.map((element) => (
                                        <div className="item">
                                            <div className="singleItem flex p-4">
                                                <div className="flex-col justify-center items-center">
                                                    <img className="w-14 h-14" src={element.image} alt="elementimg" />
                                                    <div className="flex items-center mt-3">
                                                        {
                                                            element.number ? 
                                                            <p className="px-4 py-1 mx-2" style={{border: "1px solid #dbdde0", color: "red"}}>{element.number}</p>
                                                            :
                                                            <p className="px-4 py-1 mx-2" style={{border: "1px solid #dbdde0"}}>{1}</p>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="middle pl-8">
                                                    <h4>{element.title}</h4>
                                                    <p>Seller</p>
                                                    <div className="allprice flex pt-2 pb-3 items-center">
                                                        <h5 className="afterDis tracking-wide text-lg"><i class="fas fa-rupee-sign"></i>{element.number ? Math.round(element.afterDiscount*element.number) : Math.round(element.afterDiscount)}</h5>
                                                        <h5 className="beforeDis text-md px-2 line-through" style={{color: "#8f8f8f"}}><i class="fas fa-rupee-sign"></i>{element.number ? Math.round(element.price*element.number) : Math.round(element.afterDiscount)}</h5>
                                                        <h5 className="dis text-lg" style={{color: "#26a541", fontSize: "16px", lineHeight: "18px", fontWeight: "600", fontFamily: "Roboto, Arial, sans-serif"}}>{element.discount}% off</h5>
                                                    </div>
                                                    <div className="flex">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    console.log("Loading!!", orders)
                                }
                                <button className="ml-4 my-2 rounded-sm" style={{backgroundColor: "#fb641b", color: "#FFF", padding: "8px 28px"}} onClick={(e) => {setTotalVal(4)}}>PROCEED</button>
                        </div>

                        <div className="order-form w-full flex shadow-lg md:hidden">
                            <p className="mx-4 py-1 px-2 text-xs font-semibold" style={{backgroundColor: "#f0f0f0", color: "#2874f0"}}>4</p>
                            <p className="font-bold" style={{color: "#949494"}}>PAYMENT OPTIONS</p>
                            <h4 className="ml-6 font-semibold" style={{color: "#2874f0"}}>Cash On Delivery</h4>
                            <p className="ml-6 font-semibold" style={{color: "#26a541"}}>Available</p>
                        </div>
                        <div className="w-full md:flex shadow-lg hidden py-2 mt-4 bg-white px-2">
                            {/* <p className="mx-4 py-1 px-2 text-xs font-semibold" style={{backgroundColor: "#f0f0f0", color: "#2874f0"}}>4</p> */}
                            <p className="font-bold" style={{color: "#949494"}}>PAYMENT OPTIONS</p>
                            <h4 className="ml-6 font-semibold" style={{color: "#2874f0"}}>Cash On Delivery</h4>
                            <p className="ml-6 font-semibold" style={{color: "#26a541"}}>Available</p>
                        </div>
                    </div>
                    <button className="mx-auto my-8 rounded-sm shadow-xl w-3/5 py-2" style={{display: totalVal >= 4 ? "block" : "none", backgroundColor: "#fb641b", color: "#FFF"}} onClick={emptycart}>ORDER</button>
                </div>
        </div>
    )
}

export default Order

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../Actions/Order';
import TopHeader from '../Components/Navbars/TopHeader';
import './m.css';
import { useHistory } from 'react-router-dom';
import Auth from '../Auth';
import Footer from '../Components/Footer/Footer';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { checkToken } from '../Actions/Login';

function Myorder() {
    const dispatch = useDispatch();
    const[trigger, setTrigger] = useState(false)
    const[singleOrder, setSingleOrder] = useState(null);
    const user = JSON.parse(localStorage.getItem('prof'));
    const stat = useSelector(state => state.currentUser.status);

    const history= useHistory();
    const items = useSelector(state => state.items);
    useEffect(() => {
        if(user){
            dispatch(getAllOrders(user));
        }
    }, [])

    function individualOrder(e, element){
        console.log(element);
        setSingleOrder(element)
        setTrigger(!trigger);
    }
    useEffect(() => {
        dispatch(checkToken());
    }, [dispatch])
    return (
        <div>
            <div style={{backgroundColor: "#FFF"}}>
                <div className="block md:hidden">
                    <TopHeader />
                    <div className="semiNav md:hidden flex justify-between px-40 relative">
                        <p onClick={() => {history.push("/items/electronics")}}>Electronics</p>
                        <p onClick={() => {history.push("/items/men's clothing")}}>Man</p>
                        <p onClick={() => {history.push("/items/women's clothing")}}>Woman</p>
                        <p>Home and ferniture</p>
                        <p onClick={() => {history.push("/items/jewelery")}}>Jewelry</p>
                        <p>Offer zone</p>
                    </div>
                </div>
                <div className="min-h-screen" style={{display: trigger ? "none" : "block", backgroundColor: "#f1f3f6"}}>
                    <div className="w-full hidden md:flex py-3 pl-2 cursor-pointer" style={{backgroundColor: "#2874f0", color: "#FFF", alignItems: "center"}} onClick={() => {history.push('/')}}>
                        <i class="fas fa-arrow-left"></i>
                        <img className="w-4 h-4 hidden md:block mx-2" src="https://sa-web-h1a.flixcart.com/mosaic/ss/logo_lite-cbb3574d.png" alt="" />    
                        <p>My Orders</p>
                    </div>
                        
                    <div className="h-auto pb-16 md:hidden flex flex-col-reverse" style={{backgroundColor:  user !== null ? "#f1f3f6" : "#FFF", color: "#FFF"}}>
                        {
                            items !== null
                            ?
                            items.items !== null
                            ?
                            items.items.map((element, key) => (
                                <div className="relative top-14 w-4/5 mx-auto my-4 flex bg-white p-3 rounded-md cursor-pointer hover:shadow-xl" key={key} style={{backgroundColor: "#f1f3f6", border: "1px solid #dbdbdb", color: "black"}} onClick={(e) => {
                                        individualOrder(e, element)
                                    }}>
                                    <div className="w-1/4">
                                        <img className="h-20 w-20 ml-8 mr-4" src={element.image} alt="" />
                                    </div>
                                    <div className="middle w-1/4">
                                        <p className="text-sm font-semibold">{element.title}</p>
                                        <p className="text-xs" style={{color: "#878787"}}>{element.category}</p>
                                    </div>
                                    <div className="price ml-16 w-1/4">
                                        <p>₹{Math.round(element.afterDiscount)}</p>
                                    </div>
                                    <div className="w-1/4">
                                        {(Date.parse(element.deleveryDate)-new Date())/(1000*3600*24) > 0 ? <div><p className="text-sm font-semibold"><i class="far fa-xs fa-circle" style={{color: "#26a541", marginRight: "10px"}}></i>Delivery by {new Date((element.deleveryDate)).toDateString()}</p><p className="text-xs mt-2">Your order has been placed</p></div> : <div><p className="text-sm font-semibold"><i class="fas fa-xs fa-circle" style={{color: "#26a541", marginRight: "10px"}}></i>Delivered</p><p className="text-xs mt-2">Your item has been delivered</p></div>}
                                    </div>
                                </div>
                            ))
                            :
                            <div className="relative top-28 bg-white w-4/5 mx-auto p-4 shadow-md">
                                <h1 className="font-semibold text-xl" style={{color: "#000000"}}>My Orders</h1>
                                <img className="w-90 h-40 mx-auto" src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="" />
                                <p className="flex justify-center text-xl mt-6" style={{color: "#000000"}}>You havn't order yet!</p>
                                <p className="flex justify-center text-sm mt-2 mb-4" style={{color: "#000000"}}>Order now.</p>
                                <button className="flex mx-auto px-14 py-2 rounded-sm shadow-md" style={{backgroundColor: "#2874f0", color: "#FFF"}} onClick={() => history.push("/")}>Shop Now</button>
                            </div>
                            :
                            console.log("No item")
                        }
                    </div>
                    <div className="hidden md:flex flex-col-reverse top-0 relative">
                        {
                            items 
                            ?
                            items.items !== null
                            ?
                            items.items.map((element, key) => (
                                <div className="relative w-5/5 flex justify-between bg-white px-2 py-3" style={{backgroundColor: "#f1f3f6", borderTop: "0.2px solid #dbdbdb"}} onClick={(e) => individualOrder(e, element)}>
                                    <div className="w-1/4">
                                        <img className="h-20 w-20 ml-1 mr-4" src={element.image} alt="" />
                                    </div>
                                    <div className="w-4/5 ml-4 flex-col" style={{alignItems: "center"}}>
                                        {(Date.parse(element.deleveryDate)-new Date())/(1000*3600*24) > 0 ? <div><p className="text-xs font-semibold"><i class="far fa-xs fa-circle" style={{color: "#26a541", marginRight: "10px"}}></i>Delivery by {new Date((element.deleveryDate)).toDateString()}</p></div> : <div><p className="text-sm font-semibold"><i class="fas fa-xs fa-circle" style={{color: "#26a541", marginRight: "10px"}}></i>Delivered</p><p className="text-xs mt-2">Your item has been delivered</p></div>}
                                        <p style={{fontSize: "10px"}}>{element.title}</p>
                                    </div>
                                </div>
                            ))
                            :
                            console.log("No item")
                            :
                            console.log("No item")
                        }
                    </div>
                    <div className="loginPage w-full min-h-screen" style={{display: user !== null ? "none" : "flex"}}>
                        <Auth />
                    </div>
                </div>
                <div className="relative top-6 min-h-screen pt-4" style={{display: trigger ? "block" : "none", backgroundColor: "#f1f3f6"}}>
                    <div className="hidden md:block fixed top-0 text-white font-semibold" style={{zIndex: "998", backgroundColor: "#2874f0"}}>
                        <div className="w-screen flex items-center p-3" onClick={() => {history.push('/')}}>
                            <i className="fas fa-arrow-left"></i>
                            <p className="px-4">Order Details</p>
                        </div>
                    </div>

                    {/* for small screen */}
                    <div className="visualise hidden md:block mx-auto mb-14 bg-white mt-8 shadow-md">
                        <div className="left py-4 pr-4 pl-2 flex justify-between w-full" style={{border: "1px solid #e4e4e4"}}>
                            <div className="w-2/5 ml-2">
                                <h3 className="text-sm font-semibold mb-2">{singleOrder ? singleOrder.title : console.log("")}</h3>
                                <p className="des text-xs mb-4" style={{color: "#878787"}}>{singleOrder ? singleOrder.description : console.log("")}</p>
                                <p className="font-semibold">₹{singleOrder ? Math.round(singleOrder.afterDiscount) : console.log("")}</p>
                            </div>
                            <div className="3/5">
                                <img className="w-16 h-16" src={singleOrder ? singleOrder.image : console.log("")} alt="" />
                            </div>
                        </div>
                        <div className="right flex mx-1 my-auto">
                            <div className="w-1/5 flex my-4 items-center justify-end">
                                <div className="w-1/5 float-right pl-1">
                                <div classNam=" w-1/12" style={{minHeight: "14px", minWidth: "14px", maxHeight: "14px", maxWidth: "14px", backgroundColor: "#26a541", borderRadius: "50%"}}></div>
                                <div style={{minWidth: "3px", minHeight: "60px", backgroundColor: singleOrder ? ((new Date(singleOrder.deleveryDate)-new Date())/(1000*3600*24) >= 7) ? "#26a541" : "#e4e4e4" : "#e4e4e4", maxWidth: "3px", margin: "0px 0px 0px 5px"}}></div>
                                <div classNam=" w-1/12" style={{minHeight: "14px", minWidth: "14px", maxHeight: "14px", maxWidth: "14px", backgroundColor: singleOrder ? ((new Date(singleOrder.deleveryDate)-new Date())/(1000*3600*24) >= 7) ? "#26a541" : "#e4e4e4" : "#e4e4e4", borderRadius: "50%"}}></div>
                                </div>
                            </div>

                            <div className="w-4/5 my-4">
                                <div className="flex text-xs">
                                    <div className="mx-2 text-xs">
                                        <p className="font-semibold">Ordered</p>
                                        <p style={{color: "#878787"}}>{singleOrder ? (new Date((singleOrder.orderDate)).toDateString()).slice(0, -4) : console.log("")}</p>
                                    </div>
                                </div>
                                <div style={{minWidth: "3px", minHeight: "50px", margin: "0px 43px"}}></div>
                                <div className="flex text-xs">
                                    <div className="mx-2 text-xs">
                                        <p className="font-semibold">Delivered</p>
                                        <p style={{color: "#878787"}}>{singleOrder ? (new Date((singleOrder.deleveryDate)).toDateString()).slice(0, -4) : console.log("")}</p>
                                    
                                        {singleOrder ? console.log((new Date(singleOrder.deleveryDate)-new Date())/(1000*3600*24) >= 7) : console.log("")}
                                    </div>
                                </div>
                            </div>                                
                        </div>
                        
                    </div>
                    <div className="hidden md:block w-5/5 p-8 h-60 mx-auto bg-white mt-8 shadow-md">
                        <h4 className="text-base font-semibold my-1">Delivery Address</h4>
                        <p className="text-sm font-semibold my-1">{singleOrder ? singleOrder.location ? singleOrder.location.name : console.log("") : console.log("")}</p>
                        <p className="text-sm font-medium mt-1">{singleOrder ? singleOrder.location ? singleOrder.location.local+','+singleOrder.location.address : console.log("") : console.log("")}</p>
                        <p className="text-sm font-medium mb-4">{singleOrder ? singleOrder.location ? singleOrder.location.pin+','+singleOrder.location.stat : console.log("") : console.log("")}</p>
                        <p className="text-sm"><span className="text-sm font-semibold">Phone number</span> {singleOrder ? singleOrder.location ? singleOrder.location.mobile : console.log("") : console.log("")}</p>
                    </div>

                    {/* for large screen */}
                    <div className="md:hidden w-4/5 p-8 h-60 mx-auto bg-white mt-8 shadow-md">
                        <h4 className="text-base font-semibold my-1">Delivery Address</h4>
                        <p className="text-sm font-semibold my-1">{singleOrder ? singleOrder.location ? singleOrder.location.name : console.log("") : console.log("")}</p>
                        <p className="text-sm font-medium mt-1">{singleOrder ? singleOrder.location ? singleOrder.location.local+','+singleOrder.location.address : console.log("") : console.log("")}</p>
                        <p className="text-sm font-medium mb-4">{singleOrder ? singleOrder.location ? singleOrder.location.pin+','+singleOrder.location.stat : console.log("") : console.log("")}</p>
                        <p className="text-sm"><span className="text-sm font-semibold">Phone number</span> {singleOrder ? singleOrder.location ? singleOrder.location.mobile : console.log("") : console.log("")}</p>
                    </div>
                    <div className="visualise md:hidden w-4/5 p-8 mx-auto flex mb-14 bg-white mt-8 shadow-md">
                        <div className="left flex w-5/12">
                            <div className="3/5">
                                <img className="w-16 h-16" src={singleOrder ? singleOrder.image : console.log("")} alt="" />
                            </div>
                            <div className="w-2/5 ml-2">
                                <h3 className="text-sm font-semibold mb-2">{singleOrder ? singleOrder.title : console.log("")}</h3>
                                <p className="des text-xs mb-4" style={{color: "#878787"}}>{singleOrder ? singleOrder.description : console.log("")}</p>
                                <p className="font-semibold">₹{singleOrder ? Math.round(singleOrder.afterDiscount) : console.log("")}</p>
                            </div>
                        </div>
                        <div className="right w-7/12 my-auto md:hidden">
                            <div className="flex my-2 justify-between text-xs">
                                <p>Ordered</p>
                                <p>Packed</p>
                                <p>Shipped</p>
                                <p>Delivered</p>
                            </div>
                            <div className="flex justify-center">
                                <ProgressBar
                                    percent={singleOrder ? Math.round(((new Date() - Date.parse(singleOrder.orderDate))/(1000*3600*24)*100)/7) : 80}
                                    filledBackground="#26a541"
                                    height={4}
                                    width="92%"
                                >
                                    <Step transition="scale">
                                    {({ accomplished }) => (
                                        <div className="min-w-2 min-h-2" style={{ backgroundColor: accomplished ? "#26a541" : "#e4e4e4", minHeight: "13px", minWidth: "13px", borderRadius: "50%"}}>
                                        </div>
                                    )}
                                    </Step>
                                    <Step transition="scale">
                                    {({ accomplished }) => (
                                        <div className="min-w-4 min-h-4" style={{ backgroundColor: accomplished ? "#26a541" : "#e4e4e4", minHeight: "13px", minWidth: "13px", borderRadius: "50%"}}>
                                        </div>
                                    )}
                                    </Step>
                                    <Step transition="scale">
                                    {({ accomplished }) => (
                                        <div className="min-w-4 min-h-4" style={{ backgroundColor: accomplished ? "#26a541" : "#e4e4e4", minHeight: "13px", minWidth: "13px", borderRadius: "50%"}}>
                                        </div>
                                    )}
                                    </Step>
                                    <Step transition="scale">
                                    {({ accomplished }) => (
                                        <div className="min-w-4 min-h-4" style={{ backgroundColor: accomplished ? "#26a541" : "#e4e4e4", minHeight: "13px", minWidth: "13px", borderRadius: "50%"}}>
                                        </div>
                                    )}
                                    </Step>
                                </ProgressBar>                
                            </div>
                                <div className="flex justify-between mt-4 text-sm font-semibold" style={{color: "#9e9e9e"}}>
                                    <p>{singleOrder ? (new Date((singleOrder.orderDate)).toDateString()).slice(0, -4) : console.log("")}</p>
                                    <p>{singleOrder ? (new Date((singleOrder.deleveryDate)).toDateString()).slice(0, -4) : console.log("")}</p>
                                </div>  
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Myorder
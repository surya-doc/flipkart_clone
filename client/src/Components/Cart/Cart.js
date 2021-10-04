// ************************************************** SHOPPING CART SECTION ************************************************
import React, { useEffect, useState } from 'react';
import TopHeader from '../Navbars/TopHeader';
import './Cart.css';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { useDispatch, useSelector } from 'react-redux';

//cartOnPageLoad - LOAD SAVED CART ITEMS OF THE USER FROM DATABAS ON REACT STATE
//itemRemove - REMOVE THE PERTICULAR SAVED CART ITEM FROM THE DATABASE
import { cartOnPageLoad, itemRemove } from '../../Actions/CartUpdates';

//saveAddress - SAVE OR UPDATE THE CURRENT LOCATION OF THE USER TO  DB
import { saveAddress } from '../../Actions/InsetItems';

//placeOrder - TO PLACE THE ORDER OF THE SAVED ITEMS
import { placeOrder } from '../../Actions/PlaceOrder';

import { useHistory } from 'react-router-dom';

//checkToken - CHECKS IF THE CURRENT USER IS VALID LOGGEDIN USER OR NOT (USING JWT-TOKEN)
import { checkToken } from '../../Actions/Login';

//ACTION TYPE OF CART UPDATION
import { CART_UPDATE_WITH_USER } from '../../ActionType';

function Cart() {
    //GET THE LOGEDIN USER DETAILS FROM LOCALSTORAGE
    const user = JSON.parse(localStorage.getItem('prof'));

    //STATE ARRAY VERIABLE TO STORE THE ITEMS ADDED TO CART
    const[cartItems, setCartItems] = useState([]);
    //STATE VERIABLE TO STORE THE PINCODE
    const[pinCode, setPinCode] = useState('');

    const[address, setAddress] = useState('');

    //STATE VERIABLE TO STORE THE TOTAL PRICE OF THE CART ITEMS
    const[totalAmount, setTotalAmount] = useState(0);
    //STATE VERIABLE TO STORE THE TOTAL DISCOUNT ON THE CART ITEMS
    const[totalDiscount, setTotalDIscount] = useState(0);
    //STATE VERIABLE TO STORE THE PAYABLE PRICE OF THE CART ITEMS(TOTALPRICE-DISCOUNTPRICE)
    const[finalAmount, setFinalAmount] = useState(0);
    //STATE VERIABLE TO STORE THE SAVED LOCATION OF THE USER(FETCHING FROM REDUX 'locatioon' STATE)
    const location = useSelector(state => state.location.location)

    const dispatch = useDispatch();
    const history = useHistory();

    //FUNCTION TO SAVE THE LOCATION TO THE REDUX STORE STATE
    async function extended(p){
        const newPinCode = (p[0].PostOffice[0].Division + pinCode);
        const response_1 = await dispatch(saveAddress(newPinCode, user));
        response_1 ? setAddress(response_1) : console.log("Not null");
    }
    
    //IF USER WANTS TO CHECK CURRENT LOCATION VIA PINCODE
    async function getPincode(e){
        e.preventDefault();
        //API TO GET THE LOCATION NAME THROUGH PIN CODE
        const pin = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
        //PARSING THE RESULT INTO JSON OBJECT
        const p = await pin.json();
        //IF SUCCESSFULLY GET THE LOCATION THEN CALL THE FUNCTION ELSE MAKE A RESPONSE
        p[0].Status === 'Success' ? extended(p) : setAddress('Could not found the location.');
    }

    //GET THE CART ITEMS FROM THE REDUX STORE 'cartItemNum' STATE
    const items = useSelector((state) => state.cartItemNum.cart);

    //FUNCTION TO UPDATE THE TOTALAMOUNT, TOTALDISCOUNT AND FINALAMOUNT VIA CALCULATION ON PAGELOAD
    function setOtherValues(){
        var tAmount = 0;
        var tDiscount = 0;
        for(var i=0; i<cartItems.length; i++){
            tAmount = tAmount+cartItems[i].price*cartItems[i].number;
            tDiscount = tDiscount+cartItems[i].afterDiscount*cartItems[i].number;
            setTotalAmount(tAmount);
        }
        setFinalAmount(tDiscount);
        tDiscount = tAmount-tDiscount;
        setTotalDIscount(tDiscount);
    }

    //UPDATE THE CART ITEMS ARRAY WHENEVER 'items' CHANGES
    useEffect(() => {
        async function gettingCartItems(){
            //UPDATE THE CART-ITEMS ARRAY
            setCartItems(items);
        }
        gettingCartItems();
    }, [items])

    //CALL THE FUNCTION TO UPDATE THE TOTAL VALUES
    useEffect(() => {
        setOtherValues();
    })

    //FUNCTION TO REMOVE THE ITEM FROM CART
    function removeItem(id){
        //IF LOGGEDIN THEN REMOVE THE ITEM FROM THE DB ELSE FROM THE LOCALSTORE
        if(user){
            dispatch(itemRemove(id, user));
        }
        else{
            var temp_arr = JSON.parse(localStorage.getItem('localCart'));
            const new_filtered_arr = temp_arr.filter(element => element.id !== id);
            localStorage.setItem('localCart', JSON.stringify(new_filtered_arr));
            try {
                dispatch({
                    type: CART_UPDATE_WITH_USER,
                    payload: {
                        items: new_filtered_arr,
                        totalNum: new_filtered_arr.length
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    //FUNCTION TO ORDER THE ITEMS ON THE CART
    function orderPlace(){
        dispatch(placeOrder(cartItems));
        //GO TO ORDERS PAGE AFTER PLACING ORDER
        history.push('/orders/cart');
    }

    //GET THE CART ITEMS ON PAGE LOAD
    useEffect(() => {
        dispatch(cartOnPageLoad(user));
    }, [])

    //VERIFYING THE USER THROUGH JWT TOKEN
    useEffect(() => {
        dispatch(checkToken());
    }, [dispatch])
    return (
        <div className="min-h-screen" style={{backgroundColor: "#f1f3f6"}}>

            {/* HEADER FOR LARGE SCREEN */}
            <div className="md:hidden block">
                <TopHeader />
            </div>

            {/* HEADER FOR MEDIUM AND SMALL SCREEN */}
            <div className="hidden md:block fixed top-0 text-white font-semibold" style={{zIndex: "998", backgroundColor: "#2874f0"}}>
                <div className="w-screen flex items-center p-3" onClick={() => {history.push('/')}}>
                    <i className="fas fa-arrow-left"></i>
                    <p className="px-4">My Cart</p>
                </div>
            </div>

            {/* DISPLAY ITEMS IF PRESENT ON CART ITEMS ARRAY */}
            <div style={{display: cartItems.length === 0 ? "none" : "block"}}>
            <div className="flex md:flex-col relative top-16 md:top-11" style={{backgroundColor: "#f1f3f6"}}>
                <div className="w-7/12 ml-16 md:w-full md:m-0">
                    <div className="itemsLeft bg-white mt-2 shadow-md md:mt-0">
                        <div className="cartHeader flex items-center justify-between px-2 py-1">
                            <h1 className="text-xl font-semibold block md:hidden">My Cart({cartItems.length})</h1>
                            <div className="place flex justify-center items-center">
                                <div className="flex items-center">
                                    <img className="md:hidden" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZWxsaXBzZSBjeD0iOSIgY3k9IjE0LjQ3OCIgZmlsbD0iI0ZGRTExQiIgcng9IjkiIHJ5PSIzLjUyMiIvPjxwYXRoIGZpbGw9IiMyODc0RjAiIGQ9Ik04LjYwOSA3LjAxYy0xLjA4IDAtMS45NTctLjgyNi0xLjk1Ny0xLjg0NSAwLS40ODkuMjA2LS45NTguNTczLTEuMzA0YTIuMDIgMi4wMiAwIDAgMSAxLjM4NC0uNTRjMS4wOCAwIDEuOTU2LjgyNSAxLjk1NiAxLjg0NCAwIC40OS0uMjA2Ljk1OS0uNTczIDEuMzA1cy0uODY0LjU0LTEuMzgzLjU0ek0zLjEzIDUuMTY1YzAgMy44NzQgNS40NzkgOC45MjIgNS40NzkgOC45MjJzNS40NzgtNS4wNDggNS40NzgtOC45MjJDMTQuMDg3IDIuMzEzIDExLjYzNCAwIDguNjA5IDAgNS41ODMgMCAzLjEzIDIuMzEzIDMuMTMgNS4xNjV6Ii8+PC9nPjwvc3ZnPg==" alt="location" />
                                    <p style={{color: "#87878b", fontWeight: "600", padding:"10px"}}>Deliver to</p>
                                </div>

                                {/* DISPLAY LOCATION FOR LARGE SCREEN */}
                                <div className="locationForm lg:hidden">
                                    {
                                        location
                                        ?
                                        <div className="mt-2">
                                            <p className="address w-96 px-4 font-semibold py-2 md:hidden" style={{border: "1px solid #e0e0e0"}}>{location.name}, <span style={{color: "#8b8b8b"}}>{location.address}</span></p>
                                        </div>
                                        :
                                        <form onSubmit={getPincode}>
                                            <input className="pinInput" type="text" placeholder="Enter delivery pincode" value={pinCode} onChange={(event) => setPinCode(event.target.value)} style={{borderBottom: "2px solid #2874f0"}} />
                                            <button className="pinCodeBtn" type="submit">Check</button>
                                        </form>
                                    }
                                </div>

                                {/* DISPLAY LOCATION FOR MEDIUM AND SMALL SCREEN */}
                                <div className="locationForm hidden lg:flex items-center">
                                    {
                                        location
                                        ?
                                        <div className="mt-2 flex items-center pb-2">
                                            <p>{location.city}-{location.pin}</p>
                                        </div>
                                        :
                                        <form onSubmit={getPincode}>
                                            <input className="pinInput" type="text" placeholder="Enter delivery pincode" value={pinCode} onChange={(event) => setPinCode(event.target.value)} style={{borderBottom: "2px solid #2874f0"}} />
                                            <button className="pinCodeBtn" type="submit">Check</button>
                                        </form>
                                    }
                                </div>
                            </div>
                        </div>

                        {/* DISPLAY CART ITEMS FROM CARTITEM ARRAY */}
                        {/* FOR LARGE SCREEN */}
                        <div className="block md:hidden">
                            {
                                cartItems.map((element) => (
                                    <div className="item">
                                        <div className="singleItem flex p-4">
                                            <div className="flex-col justify-center items-center">
                                                <img className="w-24 h-28" src={element.image} alt="elementimg" />
                                                <div className="flex items-center mt-3">
                                                    <RemoveCircleOutlineIcon style={{color: "#dbdde0"}}/>
                                                    <p className="px-4 py-1 mx-2" style={{border: "1px solid #dbdde0"}}>{element.number}</p>
                                                    <ControlPointIcon style={{color: "#dbdde0"}}/>
                                                </div>
                                            </div>
                                            <div className="middle pl-8">
                                                <h4>{element.title}</h4>
                                                <p className="text-sm" style={{color: "#949595"}}>Seller</p>
                                                <div className="allprice flex pt-2 pb-3 items-center">
                                                    <h5 className="afterDis tracking-wide text-lg">₹{Math.round(element.afterDiscount*element.number)}</h5>
                                                    <h5 className="beforeDis text-md px-2 line-through" style={{color: "#8f8f8f"}}>₹{Math.round(element.price*element.number)}</h5>
                                                    <h5 className="dis text-lg" style={{color: "#26a541", fontSize: "16px", lineHeight: "18px", fontWeight: "600", fontFamily: "Roboto, Arial, sans-serif"}}>{element.discount}% off</h5>
                                                </div>
                                                <div className="flex">
                                                    <p className="removeBtn" style={{textTransform: "uppercase", fontWeight: "600", cursor: "pointer"}} onClick={() => removeItem(element.id)}>Remove</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        {/* DISPLAY CART ITEMS FROM CARTITEM ARRAY */}
                        {/* FOR MEDIUM AND SMALL SCREEN */}
                        <div className="hidden md:block" style={{backgroundColor: "#f1f3f6"}}>
                            {
                                cartItems.map((element) => (
                                    <div className="item mb-2 bg-white">
                                        <div className="singleItem flex p-4 justify-between">
                                            <div className="middle pl-8 md:pl-4">
                                                <h4>{element.title}</h4>
                                                <p className="my-2 text-xs">Seller</p>
                                                <div className="w-14 text-center p-1 rounded-2xl text-sm flex items-center justify-center" style={{backgroundColor: "#26a541", color: "#FFF"}}>{element.star} <i class="fas fa-sm fa-star"></i></div>
                                                <div className="allprice flex pt-2 pb-3 items-center">
                                                    <h5 className="afterDis tracking-wide text-sm">₹{Math.round(element.afterDiscount*element.number)}</h5>
                                                    <h5 className="beforeDis text-sm px-2 line-through" style={{color: "#8f8f8f"}}>₹{Math.round(element.price*element.number)}</h5>
                                                    <h5 className="dis text-sm" style={{color: "#26a541", lineHeight: "18px", fontWeight: "600", fontFamily: "Roboto, Arial, sans-serif"}}>{element.discount}% off</h5>
                                                </div>
                                            </div>
                                            <div className="flex-col justify-center items-center">
                                                <img className="w-24 h-28" src={element.image} alt="elementimg" />
                                                <div className="flex items-center mt-3 md:hidden">
                                                    <RemoveCircleOutlineIcon style={{color: "#dbdde0"}}/>
                                                    <p className="px-4 py-1 mx-2" style={{border: "1px solid #dbdde0"}}>{element.number}</p>
                                                    <ControlPointIcon style={{color: "#dbdde0"}}/>
                                                </div>
                                                <div className="md:flex items-center mt-3 hidden">
                                                    <p className="px-4 py-1 mx-2" style={{border: "1px solid #dbdde0"}}>Qty: {element.number}</p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                        <div className="flex py-2 justify-center items-center" style={{border: "1px solid #f0f0f0"}}>
                                            <i class="fas fa-trash" style={{color: "#c0c1c3"}}></i>
                                            <p className="removeBtn ml-2" style={{fontWeight: "600", cursor: "pointer"}}  onClick={() => removeItem(element.id)}>Remove</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="buttonDiv flex justify-end px-4 py-3 bg-white md:hidden">
                        <button className="px-16 py-3 font-bold text-white rounded-sm" style={{backgroundColor: "#fb641b"}} onClick={orderPlace}>PLACE ORDER</button>
                    </div>
                    <div className="buttonDiv hidden px-4 py-3 bg-white items-center md:flex justify-between fixed bottom-0 w-full">
                        <p>₹ {Math.round(finalAmount)}</p>
                        <button className="px-10 py-2 font-bold text-white rounded-sm" style={{backgroundColor: "#fb641b"}} onClick={orderPlace}>PLACE ORDER</button>
                    </div>
                </div>

                {/* AMOUNT SECTION FOR LARGE SCREEN */}
                <div className="w-4/12 ml-3 mr-16 mt-2 h-full pb-8 md:hidden">
                    <div className="totalPriceRight bg-white shadow-md pb-8 md:hidden">
                        <h4 className="font-bold pt-3 pl-4 pb-3" style={{color: "#929292", borderBottom: "1px solid #dbdde0"}}>PRICE DETAILS</h4>
                        <div className="px-4 pt-3">
                            <div className="flex py-2 justify-between" style={{color : "#3c3c3c"}}>
                                <h4>Price ({cartItems.length} items)</h4>
                                <p>₹ {totalAmount}</p>
                            </div>
                            <div className="flex py-2 justify-between" style={{color: "#3c3c3c", fontSize: "16px"}}>
                                <h4>Discount</h4>
                                <p style={{color: "#388e3c"}}>- ₹ {Math.round(totalDiscount)}</p>
                            </div>
                            <div className="flex py-2 justify-between" style={{color: "#3c3c3c"}}>
                                <h4>Delivery Charges</h4>
                                <p style={{color: "#388e3c"}}>FREE</p>
                            </div>
                        </div>
                        <div className="totalAmtClass flex mx-4 my-2 py-3 justify-between font-semibold text-lg">
                            <h4>Total Amount</h4>
                            <p>₹ {Math.round(finalAmount)}</p>
                        </div>
                    </div>
                    <div className="flex p-4 w-11/12">
                        <img className="w-6" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/shield_b33c0c.svg" alt="" />
                        <p className="text-sm font-semibold ml-2" style={{color: "#949595"}}>Safe and Secure Payments.Easy returns.100% Authentic products.</p>
                    </div>
                </div>
               
                {/* AMOUNT SECTION FOR MEDIUM AND SMALL SCREEN */}
                <div className="totalPriceRight hidden w-full mt-2 bg-white shadow-md h-full pb-8 md:block mb-28" style={{borderBottom: "1px solid #dbdde0"}}>
                    <h4 className="font-bold pt-3 pl-4 pb-3" style={{color: "#929292", borderBottom: "1px solid #dbdde0"}}>PRICE DETAILS</h4>
                    <div className="px-4 pt-3">
                        <div className="flex py-2 justify-between" style={{color : "#3c3c3c"}}>
                            <h4>Price ({cartItems.length} items)</h4>
                            <p>₹ {totalAmount}</p>
                        </div>
                        <div className="flex py-2 justify-between" style={{color: "#3c3c3c", fontSize: "16px"}}>
                            <h4>Discount</h4>
                            <p style={{color: "#388e3c"}}>- ₹ {Math.round(totalDiscount)}</p>
                        </div>
                        <div className="flex py-2 justify-between" style={{color: "#3c3c3c"}}>
                            <h4>Delivery Charges</h4>
                            <p style={{color: "#388e3c"}}>FREE</p>
                        </div>
                    </div>
                    <div className="totalAmtClass flex mx-4 my-2 py-3 justify-between font-semibold text-lg">
                        <h4>Total Amount</h4>
                        <p>₹ {Math.round(finalAmount)}</p>
                    </div>
                </div>
            </div>
            </div>
            
            {/* IF THERE IS NO ITEM ON CART */}
            <div className="relative top-28 bg-white w-4/5 mx-auto p-4 shadow-md" style={{display: cartItems.length === 0 ? "block" : "none"}}>
                <h1 className="font-semibold text-xl">My Cart</h1>
                <img className="w-90 h-40 mx-auto" src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="" />
                <p className="flex justify-center text-xl mt-6">Your cart is empty!</p>
                <p className="flex justify-center text-sm mt-2 mb-4">Add items to it now.</p>
                <button className="flex mx-auto px-14 py-2 rounded-sm shadow-md" style={{backgroundColor: "#2874f0", color: "#FFF"}} onClick={() => history.push("/")}>Shop Now</button>
            </div>
        </div>
    )
}

export default Cart

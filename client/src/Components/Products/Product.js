import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import TopHeader from '../Navbars/TopHeader';
import './Product.css';
import ReactImageMagnify from 'react-image-magnify';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import MultiCarusal from '../Body/MultiCarusal';
import Footer from '../Footer/Footer';
import { saveAddress } from '../../Actions/InsetItems';
import { localCartNouser, mainCartWithUser } from '../../Actions/CartUpdates';
import { placeOrder } from '../../Actions/PlaceOrder';
import { checkToken } from '../../Actions/Login';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Auth from '../../Auth';
import ClearIcon from '@material-ui/icons/Clear';

function Product() {
    const{id} = useParams();
    const product = useSelector((state) => state.updatedDatas.data);
    const[updatedData, setUpdatedData] = useState(null);
    const[loginPage, setLoginPage] = useState(false);
    const[pinCode, setPinCode] = useState('');
    const[address, setAddress] = useState('');
    const cartItemNumber = useSelector((state) => state.cartItemNum.totalNo);
    const cartLength = useSelector((state) => state.cartItemNum.cart);
    const status = useSelector(state => state.currentUser.status);
    const user = JSON.parse(localStorage.getItem('prof'));
    const dispatch = useDispatch();
    const history = useHistory();

    const location = useSelector(state => state.location.location)

    var date_2 = new Date();
    date_2.setDate(date_2.getDate()+7);

    async function extended(p){
        const newPinCode = (p[0].PostOffice[0].Division + pinCode);
        
        const response_1 = await dispatch(saveAddress(newPinCode, user));
        response_1 ? setAddress(response_1) : console.log("Not null");
    }

    async function getPincode(e){
        e.preventDefault();
        const pin = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
        const p = await pin.json();
        p[0].Status === 'Success' ? extended(p) : setAddress('Could not found the location.');
    }
    useEffect(() => {
        const a = parseInt(id);
        for(var j=0; j<product.length; j++){
            if(product[j].id === a){
                setUpdatedData(product[j]);
            }
        }

        const loc = JSON.parse(localStorage.getItem('loc'));
        loc ? setAddress(loc.location) : console.log("NULL");
    }, [address, id, product])

    function addItemsToCart(){
        updatedData.number = 1;
        user ? dispatch(mainCartWithUser(updatedData, user)) : dispatch(localCartNouser(updatedData));
        history.push('/cartitems');
    }

    function OrderPlace(){
        const temp = [];
        temp.push(updatedData);
        dispatch(placeOrder(temp));
        history.push('/orders/individual');
    }

    function signIn(){
        setLoginPage(!loginPage)
    }

    function openCartPage(){
        history.push('/cartitems')
    }

    useEffect(() => {
        if(status === "Success"){
            setLoginPage(false)
        }
    }, [status])

    useEffect(() => {
        dispatch(checkToken());
    }, [dispatch])

    return (
        <div className="prod">
            <div className="md:hidden">
            <TopHeader />
            </div>


            <div className="loginPage w-full h-full fixed flex-col" style={{backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: "999", display: loginPage ? "block" : "none", flexDirection: "row"}}>
                <div className="top-14 flex items-center justify-center">
                    <ClearIcon className="m-4 w-1/1 font-bold" onClick={signIn} style={{color: "#FFF", backgroundColor: "rgba(255, 255, 255, 0.4)", padding: "2px", width: "50px", height: "50px", borderRadius: "50%", margin: "2px", top: "80px"}} />
                </div>
                <div className="w-4/5 flex mx-auto md:w-full">
                    <Auth />
                </div>
            </div>


            <div className="w-full hidden md:flex py-3 pl-2 cursor-pointer justify-between" style={{backgroundColor: "#2874f0", color: "#FFF", alignItems: "center"}}>
                <div className="left flex items-center" onClick={() => {history.push('/')}}>
                    <i class="fas fa-lg fa-arrow-left"></i>
                    <img className="w-6 h-6 hidden md:block mx-2" src="https://sa-web-h1a.flixcart.com/mosaic/ss/logo_lite-cbb3574d.png" alt="" />

                </div>
                <div className="right flex items-center gap-2">
                    <AddBoxIcon className="px-1" onClick={() => {history.push('/myorder')}} style={{fontSize: "28px"}} />
                    <div className="cursor-pointer" onClick={openCartPage}>                    
                        <p className="cartItemNumber font-light absolute text-xs top-1 mb-1" style={{backgroundColor: "#ff6161", borderRadius: "6px", border: "1px solid #FFF", padding: "0px 1.4px", display: cartItemNumber ? "block" : "none", color: "#f0eded"}}>{cartLength.length}</p>
                        <ShoppingCartIcon className="px-1" style={{fontSize: "34px"}} />
                    </div>
                    {
                        user
                        ?
                        <div className="px-2">
                            <PersonOutlineIcon />
                        </div>
                        :
                        <p className="px-2 text-lg" onClick={signIn}>
                        Login
                        </p>
                    }
                </div>
            </div>




            <div className="flex-col relative md:hidden">
                <div className="semiNav flex justify-between px-40 relative md:hidden">
                    <p onClick={() => {history.push("/items/electronics")}}>Electronics</p>
                    <p onClick={() => {history.push("/items/men's clothing")}}>Man</p>
                    <p onClick={() => {history.push("/items/women's clothing")}}>Woman</p>
                    <p>Home and ferniture</p>
                    <p onClick={() => {history.push("/items/jewelery")}}>Jewelry</p>
                    <p>Offer zone</p>
                </div>
            {
                updatedData
                ?
                <div className="itemImage flex relative lg:hidden" style={{top: "9vh"}}>
                    <div className="left flex-col w-5/12">
                        <div className="flex">
                            <div className="smllImg w-20 p-1">
                                <img className="p-1 h-20 w-full" src={updatedData.image} alt="" style={{border: "2px solid #2874f0"}} />
                            </div>
                            <div className="bigImg p-1">
                                <ReactImageMagnify {...{
                                    smallImage: {
                                        alt: "small",
                                        src: updatedData.image,
                                        width: 400,
                                        height: 440
                                    },
                                    largeImage: {
                                        src: updatedData.image,
                                        width: 1000,
                                        height: 1800
                                    }
                                }} />
                            </div>
                        </div>
                        <div className="twoButtonFunction flex justify-center gap-4 m-4">
                            <button className="px-16 py-3 font-semibold rounded-sm" style={{backgroundColor: "#ff9f00", color: "#FFF"}} onClick={addItemsToCart}><ShoppingCartIcon />ADD TO CART</button>
                            <button className="px-16 py-3 font-semibold rounded-sm" style={{backgroundColor: "#fb641b", color: "#FFF"}} onClick={OrderPlace}><FlashOnIcon />BUY NOW</button>
                        </div>
                    </div>
                    <div className="right pt-10 w-7/12">
                        <div className="itemDetails">
                            <h2 className="text-lg font-semibold">{updatedData.title}</h2>
                            <div className="allprice flex pt-3 pb-3 items-center">
                                <h5 className="afterDis tracking-wide text-3xl"><i class="fas fa-rupee-sign"></i>{updatedData.afterDiscount}</h5>
                                <h5 className="beforeDis text-lg px-3 line-through" style={{color: "#8f8f8f"}}><i class="fas fa-rupee-sign"></i>{updatedData.price}</h5>
                                <h5 className="dis text-md" style={{color: "#26a541", fontSize: "16px", lineHeight: "18px", fontWeight: "600", fontFamily: "Roboto, Arial, sans-serif"}}>{updatedData.discount}% off</h5>
                            </div>
                            <div className="rating flex">
                                <div className="flex py-1 rounded-2xl items-center gap-1" style={{backgroundColor: "#26a541", color: "#FFF", padding: "4px 14px"}}>
                                    <p>{updatedData.star}</p>
                                    <i class="fas fa-xs fa-star"></i>
                                </div>
                                <p style={{color: "#878787", fontSize: "16px", fontWeight: "600", paddingLeft: "10px"}}>20,730 ratings and 2,353 reviews</p>
                            </div>
                            <div className="description mt-4 mr-8 flex gap-2 items-baseline">
                                <i class="fas fa-tag" style={{color: "#14be47"}}></i>
                                <p><span className="text-black font-semibold">Description</span>{updatedData.description}</p>
                            </div>
                            <div className="description mt-2 mr-8 flex gap-2 items-baseline">
                                <i class="fas fa-tag" style={{color: "#14be47"}}></i>
                                <p><span className="text-black font-semibold">Discount Offer</span> {updatedData.discount}% of on this product</p>
                            </div>
                            <div className="place">
                                <div className="flex items-center pt-8">
                                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZWxsaXBzZSBjeD0iOSIgY3k9IjE0LjQ3OCIgZmlsbD0iI0ZGRTExQiIgcng9IjkiIHJ5PSIzLjUyMiIvPjxwYXRoIGZpbGw9IiMyODc0RjAiIGQ9Ik04LjYwOSA3LjAxYy0xLjA4IDAtMS45NTctLjgyNi0xLjk1Ny0xLjg0NSAwLS40ODkuMjA2LS45NTguNTczLTEuMzA0YTIuMDIgMi4wMiAwIDAgMSAxLjM4NC0uNTRjMS4wOCAwIDEuOTU2LjgyNSAxLjk1NiAxLjg0NCAwIC40OS0uMjA2Ljk1OS0uNTczIDEuMzA1cy0uODY0LjU0LTEuMzgzLjU0ek0zLjEzIDUuMTY1YzAgMy44NzQgNS40NzkgOC45MjIgNS40NzkgOC45MjJzNS40NzgtNS4wNDggNS40NzgtOC45MjJDMTQuMDg3IDIuMzEzIDExLjYzNCAwIDguNjA5IDAgNS41ODMgMCAzLjEzIDIuMzEzIDMuMTMgNS4xNjV6Ii8+PC9nPjwvc3ZnPg==" alt="location" />
                                    <p style={{color: "#87878b", fontWeight: "600", padding:"10px"}}>Deliver to</p>
                                </div>
                                <div className="locationForm">
                                    {
                                        location
                                        ?
                                        <div className="mt-2">
                                            <p className="address w-96 px-4 font-semibold py-2" style={{border: "1px solid #e0e0e0"}}>{location.name}, <span style={{color: "#8b8b8b"}}>{location.address}</span></p>
                                            <p className="text-sm font-semibold mt-2">Delivery in 7 Days, {(date_2.toDateString()).slice(0, -4)}<span style={{color: "#8b8b8b"}}> | </span><span style={{color: "#388e3c"}}>Free</span></p>
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
                    </div>
                </div>
                :
                null
            }
            </div>
            
            {/* items for mobile view */}
            <div className="moblileScreen hidden lg:flex top-16 relative">
            {
                updatedData
                ?
                <div className="itemImage hidden relative lg:flex" style={{top: "9vh", flexDirection: "column"}}>
                    <div className="img w-2/2 px-4 justify-center flex p-1">
                        <img src={updatedData.image} alt="" />
                    </div>
                    <div className="right pt-10 w-full px-4">
                        <div className="itemDetails">
                            <h2 className="font-semibold text-sm">{updatedData.title}</h2>
                            <div className="allprice flex pt-3 pb-3 items-center">
                                <h5 className="afterDis tracking-wide text-sm">₹{updatedData.afterDiscount}</h5>
                                <h5 className="beforeDis px-3 line-through text-sm" style={{color: "#8f8f8f"}}>₹{updatedData.price}</h5>
                                <h5 className="dis text-sm" style={{color: "#26a541", lineHeight: "18px", fontWeight: "600"}}>{updatedData.discount}% off</h5>
                            </div>
                            <div className="rating flex">
                                <div className="flex py-1 rounded-2xl items-center gap-1" style={{backgroundColor: "#26a541", color: "#FFF", padding: "4px 14px"}}>
                                    <p>{updatedData.star}</p>
                                    <i class="fas fa-xs fa-star"></i>
                                </div>
                                <p className="text-sm" style={{color: "#878787", paddingLeft: "10px"}}>20,730 ratings and 2,353 reviews</p>
                            </div>
                            <div className="description mt-4 mr-8 flex gap-2 items-baseline">
                                <i class="fas fa-tag" style={{color: "#14be47"}}></i>
                                <p><span className="text-black font-semibold">Description</span>{updatedData.description}</p>
                            </div>
                            <div className="description mt-2 mr-8 flex gap-2 items-baseline">
                                <i class="fas fa-tag" style={{color: "#14be47"}}></i>
                                <p><span className="text-black font-semibold">Discount Offer</span> {updatedData.discount}% of on this product</p>
                            </div>
                            <div className="place">
                                <div className="flex items-center pt-8">
                                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZWxsaXBzZSBjeD0iOSIgY3k9IjE0LjQ3OCIgZmlsbD0iI0ZGRTExQiIgcng9IjkiIHJ5PSIzLjUyMiIvPjxwYXRoIGZpbGw9IiMyODc0RjAiIGQ9Ik04LjYwOSA3LjAxYy0xLjA4IDAtMS45NTctLjgyNi0xLjk1Ny0xLjg0NSAwLS40ODkuMjA2LS45NTguNTczLTEuMzA0YTIuMDIgMi4wMiAwIDAgMSAxLjM4NC0uNTRjMS4wOCAwIDEuOTU2LjgyNSAxLjk1NiAxLjg0NCAwIC40OS0uMjA2Ljk1OS0uNTczIDEuMzA1cy0uODY0LjU0LTEuMzgzLjU0ek0zLjEzIDUuMTY1YzAgMy44NzQgNS40NzkgOC45MjIgNS40NzkgOC45MjJzNS40NzgtNS4wNDggNS40NzgtOC45MjJDMTQuMDg3IDIuMzEzIDExLjYzNCAwIDguNjA5IDAgNS41ODMgMCAzLjEzIDIuMzEzIDMuMTMgNS4xNjV6Ii8+PC9nPjwvc3ZnPg==" alt="location" />
                                    <p style={{color: "#87878b", fontWeight: "600", padding:"10px"}}>Deliver to</p>
                                </div>
                                <div className="locationForm">
                                    {
                                        location
                                        ?
                                        <div className="mt-2">
                                            <p className="address w-96 px-4 font-semibold py-2" style={{border: "1px solid #e0e0e0"}}>{location.name}, <span style={{color: "#8b8b8b"}}>{location.address}</span></p>
                                            <p className="text-sm font-semibold mt-2">Delivery in 7 Days, {(date_2.toDateString()).slice(0, -4)}<span style={{color: "#8b8b8b"}}> | </span><span style={{color: "#388e3c"}}>Free</span></p>
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
                    </div>
                    <div className="twoButtonFunction flex fixed bottom-0 shadow-lg w-full" style={{zIndex: "999"}}>
                        <button className="px-10 py-3 w-1/2 font-semibold text-sm" style={{backgroundColor: "#FFF", color: "#000000"}} onClick={addItemsToCart}>ADD TO CART</button>
                        <button className="px-16 py-3 w-1/2 font-semibold text-sm" style={{backgroundColor: "#fb641b", color: "#FFF"}} onClick={OrderPlace}>BUY NOW</button>
                    </div>
                </div>
                :
                null
            }            
        </div>
            
            
            <div className="mt-36 mb-16">
                {
                    updatedData
                    ?
                    <MultiCarusal
                        category={updatedData.category}
                        className="p-10"
                    />
                    :
                    null
                }
            </div>
            <div className="block md:hidden">
                <Footer />
            </div>
        </div>
    )
}

export default Product

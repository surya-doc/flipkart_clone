import React, { useEffect, useState } from 'react';
import './TopHeader.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Auth from '../../Auth';
import ClearIcon from '@material-ui/icons/Clear';
import { useDispatch, useSelector } from 'react-redux';
import Fuse from 'fuse.js';
import OutsideClickHandler from 'react-outside-click-handler';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { cartOnPageLoad } from '../../Actions/CartUpdates';
import { logOut } from '../../Actions/Login';
import { SET_ADDRESS } from '../../ActionType';
const options = {
    includeScore: true,
    keys: ['title', 'description', 'category']
}

function TopHeader() {
    const[loginPage, setLoginPage] = useState(false);
    const[searchValue, setSearchValue] = useState(null);
    const[searchArray, setSearchArray] = useState([]);
    const history = useHistory();
    const dataItems = useSelector((state) => state.updatedDatas.data);
    const status = useSelector(state => state.currentUser.status);
    const fuse = new Fuse(dataItems, options);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('prof'));
    const datas = useSelector(state => state.currentUser.user);

    useEffect(() => {
        if(status === "Success"){
            setLoginPage(false)
        }
    }, [status])

    function signIn(){
        setLoginPage(!loginPage)
    }

    function openCartPage(){
        history.push('/cartitems')
    }

    function getSearchValue(val){
        setSearchValue(val);
        const result = fuse.search(val);
        setSearchArray(result);
    }
    
    const cartItemNumber = useSelector((state) => state.cartItemNum.totalNo);
    const cartLength = useSelector((state) => state.cartItemNum.cart);

    function getSingleItem(id){
        history.push(`/products/${id}`);
        setSearchValue(null);
    }

    useEffect(() => {
        dispatch(cartOnPageLoad(user));
    }, [datas])

    function logoutFunction(){
        dispatch(logOut(user))
        try {
            dispatch({
                type: SET_ADDRESS,
                payload: null
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="header flex-col">
            <div className="topHeader largeScreen md:hidden flex items-center px-32 py-1">
                <div className="logo cursor-pointer" onClick={() => {history.push('/')}}>
                    <img className="w-16 h-4 mt-2" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png" alt="flipkart" />
                    <div className="flex text-xs">
                        <p style={{color: "#FFF", fontFamily: "Roboto, Arial, sans-serif", fontStyle: "italic", fontSize: "10px"}}> Explore<span style={{color: "#f2de0e", fontWeight: "700"}}>Pluss</span></p>
                        <img className="flex w-2 h-2" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png" alt="plus" />
                    </div>
                </div>
                <form className="w-full mx-5 mb-2 mt-2 bg-gray-500 relative">
                    <OutsideClickHandler
                        onOutsideClick={() => {
                            setSearchValue(null)
                        }}
                        >
                        <div className="flex">
                            <input className="input w-full h-full text-black " type="text" placeholder="Search for products, brands and more" onChange={(e) => {getSearchValue(e.target.value)}}/>
                            <button className="search-button px-2"><SearchIcon /></button>
                        </div>
                        <ul className="searchList absolute hidden bg-white mx-0 w-full" style={{display: searchValue ? 'block' : 'none', maxHeight: "90vh", overflow: 'hidden'}}>
                        {
                            searchArray
                            ?
                            searchArray.slice(0,10).map((element) => (
                                <li className="px-4 py-3 lowercase text-xs font-semibold" style={{color: "#484848"}} onClick={() => {getSingleItem(element.item.id)}}>{(element.item.title).substring(0, 140)}...</li>
                            ))
                            :
                            console.log("emptyArray")
                        }
                        </ul>
                    </OutsideClickHandler>
                </form>
                {
                    user
                    ?
                    <div className="myAccount w-48 px-2">
                        <p className="myAccount text-sm font-semibold text-white">My Account <i class="fas fa-xs fa-chevron-up arrowHead" style={{color: "#b4cffa", fontSize: "10px"}}></i></p>
                        <div className="a absolute bg-white p-0 hidden" style={{boxShadow: "2px 6px 8px 4px rgba(0, 0, 0, 0.3)"}}>
                            <p className="abcd pr-24 pt-2 pb-2 text-sm" style={{borderBottom: "1px solid #dbdbdb"}}><i class="fas fa-user-circle" style={{color: "#2874f0", margin: "10px"}}></i> My Profile</p>
                            <p className="pr-24 pt-2 pb-2 text-sm" style={{borderBottom: "1px solid #dbdbdb"}} onClick={() => {history.push('/myorder')}}><i class="fas fa-folder-plus" style={{color: "#2874f0", margin: "10px"}}></i> Orders</p>
                            <p className="pr-24 pt-2 pb-2 text-sm" onClick={() => logoutFunction()}><i class="fas fa-sm fa-power-off" style={{color: "#2874f0", margin: "10px"}}></i> Logout</p>
                        </div>
                    </div>
                    :
                    <div className="myAccount">
                        <button className="loginBtn my-2 mx-4" onClick={signIn}>
                        Login
                        </button>
                        <div className="abcd absolute bg-white p-0 hidden" style={{boxShadow: "2px 6px 8px 4px rgba(0, 0, 0, 0.3)"}}>
                            <div className="flex justify-center -top-3 relative -left-8">
                                <div className="triangle"></div>
                            </div>
                            <p className="abcd_1 flex text-sm justify-between px-4 pt-4 pb-4" style={{borderBottom: "1px solid #dbdbdb"}}>
                                <p className="text-xs font-bold pr-8">New customer?</p>
                                <p className="signup" onClick={() => history.push('/signup')} style={{color: "#2874f0"}}>Sign Up</p>
                            </p>
                            <p className="ab abcd pr-24 pt-2 pb-2 text-sm" style={{borderBottom: "1px solid #dbdbdb"}}><i class="fas fa-user-circle" style={{color: "#2874f0", margin: "10px"}}></i> My Profile</p>
                            <p className="ab abcd pr-24 pt-2 pb-2 text-sm" style={{borderBottom: "1px solid #dbdbdb"}} onClick={() => {history.push('/myorder')}}><i class="fas fa-folder-plus" style={{color: "#2874f0", margin: "10px"}}></i> Orders</p>
                        </div>
                    </div>
                }
                <h5 className="mx-2 my-2 text-white text-sm font-semibold">More</h5>
                <div className="flex md:invisible mx-4 text-sm font-semibold cart text-white cursor-pointer" onClick={openCartPage}>
                    <p className="cartItemNumber font-light absolute text-xs top-1 mb-1" style={{backgroundColor: "#ff6161", borderRadius: "6px", border: "1px solid #FFF", padding: "0px 1.4px", display: cartItemNumber ? "block" : "none", color: "#f0eded"}}>{cartLength.length}</p>
                    <ShoppingCartIcon />
                    <p className="mx-1 cart-text">Cart</p>
                </div>
            </div>

            <div className="loginPage w-full h-full fixed flex-col" style={{backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: "999", display: loginPage ? "block" : "none", flexDirection: "row"}}>
                <div className="top-14 flex items-center justify-center">
                    <ClearIcon className="m-4 w-1/1 font-bold" onClick={signIn} style={{color: "#FFF", backgroundColor: "rgba(255, 255, 255, 0.4)", padding: "2px", width: "50px", height: "50px", borderRadius: "50%", margin: "2px", top: "80px"}} />
                </div>
                <div className="w-4/5 flex mx-auto md:w-full">
                    <Auth />
                </div>
            </div>

            <div className="topHeader mediumScreeen md:block hidden flex-col w-12/12 pb-2">
                <div className="upperTop flex justify-between px-3 pt-3">
                    <div className="logo" onClick={() => {history.push('/')}}>
                        <img className="w-16 h-4 mt-2" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png" alt="flipkart" />
                        <div className="flex text-xs">
                            <p style={{color: "#FFF", fontFamily: "Roboto, Arial, sans-serif", fontStyle: "italic", fontSize: "10px"}}> Explore<span style={{color: "#f2de0e", fontWeight: "700"}}>Pluss</span></p>
                            <img className="flex w-2 h-2" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png" alt="plus" />
                        </div>
                    </div>
                    <div className="others flex text-white gap-3">
                        <AddBoxIcon className="px-1" onClick={() => {history.push('/myorder')}} />
                        <div className="cursor-pointer" onClick={openCartPage}>                    
                            <p className="cartItemNumber font-light absolute text-xs top-1 mb-1" style={{backgroundColor: "#ff6161", borderRadius: "6px", border: "1px solid #FFF", padding: "0px 1.4px", display: cartItemNumber ? "block" : "none", color: "#f0eded"}}>{cartLength.length}</p>
                            <ShoppingCartIcon className="px-1" />
                        </div>
                        {
                            user
                            ?
                            <div className="">
                                <PersonOutlineIcon />
                            </div>
                            :
                            <button className="loginBtn my-2 mx-4" onClick={signIn}>
                            Login
                            </button>
                        }
                    </div>
                </div>
                <form className="w-full mb-2 mt-2 relative">
                    <OutsideClickHandler
                        onOutsideClick={() => {
                            setSearchValue(null)
                        }}
                        >
                        <div className="flex mx-2">
                            <input className="input w-full h-full text-black " type="text" placeholder="Search for products, brands and more" onChange={(e) => {getSearchValue(e.target.value)}}/>
                            <button className="search-button px-2"><SearchIcon /></button>
                        </div>
                        <ul className="searchList mx-0 absolute hidden bg-white w-full" style={{display: searchValue ? 'flex' : 'none', flexDirection: "column", maxHeight: "90vh", overflow: 'hidden'}}>
                        {
                            searchArray
                            ?
                            searchArray.slice(0,10).map((element) => (
                                <li className="px-4 py-3 mx-4 lowercase text-xs font-semibold" style={{color: "#484848"}} onClick={() => {getSingleItem(element.item.id)}}>{(element.item.title).substring(0, 140)}...</li>
                            ))
                            :
                            console.log("emptyArray")
                        }
                        </ul>
                    </OutsideClickHandler>
                </form>
            </div>
        </div>
    )
}

export default TopHeader

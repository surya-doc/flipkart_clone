// ************************************************* MAIN BODY OF THE CLONE **************************************************
import React, { useEffect, useState } from 'react';
import './Body.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import MultiCarusal from './MultiCarusal';
import Moment from 'react-moment';
import moment from 'moment';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Body() {
    // state to store the categories F.S API
    const[categoryList, updateCategoryList] = useState(null);

    // state to store the products getting from F.S. API
    const[allProducts, setAllProducts] = useState([]);
    async function getItems(){

        // fetch all the products from fakestory API
        const products = await fetch('https://fakestoreapi.com/products');
        const p = await products.json();
        setAllProducts(p);

        // fetch products catagories from fakestore API
        const catagories = await fetch('https://fakestoreapi.com/products/categories');
        const a = await catagories.json();
        updateCategoryList(a);
    }

    useEffect(() => {
        // call this function after rendering
        getItems();
    },[])

    const settings = {
        infinite: true,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 4000,
        slidesToShow: 5,
        slidesToScroll: 1,
        caseEase: "linear",
        arrows: false
        }
    
    // show the left time
    const start = moment().add(-4, 'm');

    return (
        <div className="body_container p-2">
            {/* image slider */}
            <Carousel
                autoPlay={true}
                interval={3000}
                infiniteLoop={true}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
            >
                <div>
                    <img className="md:h-24" src="https://rukminim1.flixcart.com/flap/1800/1800/image/d1d1987478f406ae.jpg" alt="background_img_1"/>
                </div>
                <div>
                    <img className="md:h-24" src="https://rukminim1.flixcart.com/flap/1800/1800/image/e6a78d76872e9212.jpg" alt="background_img_2" />
                </div>
                <div>
                    <img className="md:h-24" src="https://rukminim1.flixcart.com/flap/1800/1800/image/d594c8ee940966d1.jpg" alt="background_img_3" />
                </div>
                <div>
                    <img className="md:h-24" src="https://rukminim1.flixcart.com/flap/1800/1800/image/ce3ef56ffd11e0a5.jpg" alt="background_img_4" />
                </div>
                <div>
                    <img className="md:h-24" src="https://rukminim1.flixcart.com/flap/1800/1800/image/ddd5373c6f54c4a7.jpg" alt="background_img_5" />
                </div>
                <div>
                    <img className="md:h-24" src="https://rukminim1.flixcart.com/flap/1800/1800/image/3db8b5e17108b22e.jpg" alt="background_img_7" />
                </div>
                <div>
                    <img className="md:h-24" src="https://rukminim1.flixcart.com/flap/1800/1800/image/b28a00869b943a83.jpg" alt="background" />
                </div>
                <div>
                    <img className="md:h-24" src="https://rukminim1.flixcart.com/flap/1800/1800/image/9bdee7903129d36c.jpg" alt="background" />
                </div>
            </Carousel>
            {/* delas div for large screen */}
            <div className="dealForLargeScreen dayOffer md:hidden mt-4">
                <div className="flex">
                    <div className="left w-4/5">
                        <div className="today flex justify-between bg-white px-4 py-2 pt-3">
                            <div className="front-hd flex">
                                <h4 className="text-xl font-semibold">Deals of the Day</h4>
                                <img className="w-6 ml-4 mr-2" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg" alt="" />
                                <Moment className="flex text-base text-gray-400 text-center items-center" date={start} format="hh:mm:ss" durationFromNow />
                                <p className="flex ml-2 text-base text-gray-400 text-center items-center">Left</p>
                            </div>
                            <button className="shadow btn-day text-xs mr-4 text-white py-2 px-3" style={{backgroundColor: "#2874f0"}}>VIEW ALL</button>
                        </div>
                        <div className="delas-slider">
                            {/* products slider */}
                            <Slider {...settings}>
                                {
                                    allProducts === [] ? console.log("Empty") : 
                                    allProducts.map((ele, index) => (
                                        <div className="card text-center ml-4 mr-4 mb-4 p-8" key={index}>
                                            <div className="flex justify-center"><img className="w-24 h-24" src={ele.image} alt="" /></div>
                                            <h5 className="items pt-4" style={{letterSpacing: "1px"}}>{ele.title}</h5>
                                            <p className="text-sm" style={{color: "#58903c", letterSpacing: "1px"}}>From ₹{ele.price}</p>
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                    </div>
                    {/* right fixed image */}
                    <div className="right w-1/5 h-40">
                        <img src="https://rukminim1.flixcart.com/flap/464/708/image/a33323ee3a5b0bc5.jpg?q=70" alt="" style={{width: "90%", height: "172%", margin: "0 auto"}} />
                    </div>
                </div>
                
                {/* three fixed cards image */}
                <div className="threeCards flex w-full">
                    <div className="indiCard mr-2 shadow-md">
                        <img className=" rounded-sm" src="https://rukminim1.flixcart.com/flap/500/500/image/2f30db9425df5cec.jpg?q=50" alt="" />
                    </div>
                    <div className="indiCard mr-2 shadow-md">
                        <img className=" rounded-sm" src="https://rukminim1.flixcart.com/flap/500/500/image/084789479074d2b2.jpg?q=50" alt="" />
                    </div>
                    <div className="indiCard shadow-md">
                        <img className=" rounded-sm" src="https://rukminim1.flixcart.com/flap/500/500/image/1ce0c4c1fb501b45.jpg?q=50" alt="" />
                    </div>
                </div>
            </div>
            
            {/* deals for small screen */}
            <div className="dilForMediumScreen mt-10 md:block hidden">
                <div className="today-md flex justify-between bg-white px-4 py-16 pt-3">
                    <div>
                        <div>
                            <h4 className="text-md text-white font-semibold">Deals of the Day</h4>
                        </div>
                        <div className="front-hd flex">
                            <img className="w-4 ml-2 mr-2" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg" alt="" />
                            <Moment className="flex text-xs text-white text-center items-center" date={start} format="hh:mm:ss" durationFromNow />
                            <p className="flex ml-2 text-base text-white text-center items-center">Left</p>
                        </div>
                    </div>
                    <button className="shadow btn-day text-xs mr-4 py-0 px-2" style={{backgroundColor: "#FFF", color: "#2874f0"}}>VIEW ALL</button>
                </div>
                <table className="flex justify-center pb-10" style={{backgroundColor: "#2873f0"}}>
                    <tbody className="w-full rounded-sm">
                        <tr className="bg-white mx-2 pb-8 flex justify-center">
                            <td className="p-10 justify-center flex  m-2 w-1/2">
                                <div className="tableimg w-24 h-24">
                                    <img src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg" alt="" />
                                    <p>Mens Cotton Jacket</p>
                                    <p className="text-sm" style={{color: "#58903c", letterSpacing: "1px"}}>From <i class="fas fa-rupee-sign"></i>1000</p>
                                </div>
                            </td>
                            <td className="p-10 justify-center flex m-2 w-1/2">
                                <div className="tableimg w-24 h-24">
                                    <img src="https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg" alt="" />
                                    <p>Solid Gold Petite Micropave</p>
                                    <p className="text-sm" style={{color: "#58903c", letterSpacing: "1px"}}>From <i class="fas fa-rupee-sign"></i>8000</p>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-white mx-2 pb-8 flex justify-center">
                            <td className="pb-20 justify-center flex  m-2 w-1/2">
                                <div className="tableimg w-24 h-24">
                                    <img src="https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg" alt="" />
                                    <p>Removable Hooded Faux</p>
                                    <p className="text-sm" style={{color: "#58903c", letterSpacing: "1px"}}>From <i class="fas fa-rupee-sign"></i>900</p>
                                </div>
                            </td>
                            <td className="pb-24 justify-center flex m-2 w-1/2">
                                <div className="tableimg w-24 h-24">
                                    <img src="https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg" alt="" />
                                    <p>Portable External Hard Drive</p>
                                    <p className="text-sm" style={{color: "#58903c", letterSpacing: "1px"}}>From <i class="fas fa-rupee-sign"></i>4000</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            {/* div for products slider */}
            <div>
                {
                    categoryList 
                    ? 
                    categoryList.map((element,i) => (
                        <MultiCarusal
                            key={i}
                            category={element}
                            className="p-10"
                        />
                    ))
                    : 
                    console.log(categoryList)
                }
            </div>
        </div>
    )
}

export default Body

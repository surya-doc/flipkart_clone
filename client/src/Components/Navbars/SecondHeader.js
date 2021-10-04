import React from 'react';
import './SecondHeader.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from 'react-router-dom';

function SecondHeader() {

    const history = useHistory();

      function Ite(ele){
        history.push(`/items/${ele}`);
      }

    return (
        <div className="s-header md:mt-32 top-20">
            <div className="md-img justify-center hidden md:block">
                <img className="w-4/5 mx-auto h-3/4" src="https://rukminim1.flixcart.com/flap/1080/240/image/de2f542c939ba0c9.png?q=40" alt="safe-delevary" />
            </div>
            <div className="lg-secondHeader md:hidden block">
                <div className="secondHeader shadow-md mt-16 mb-2 flex justify-between px-16 py-2">
                    <div>
                        <div><img className="w-14 h-14" src="https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100" alt="top offers" /></div>
                        <h4 className="text-sm font-semibold">Top Offers</h4>
                    </div>
                    <div>
                        <div><img className="w-14 h-14" src="https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100" alt="top offers" /></div>
                        <h4 className="text-sm font-semibold">Grocery</h4>
                    </div>
                    <div>
                        <div><img className="w-14 h-14" src="https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100" alt="top offers" /></div>
                        <h4 className="text-sm font-semibold">Mobiles</h4>
                    </div>
                    <div className="text-center fashion cursor-pointer">
                        <div><img className="w-14 h-14" src="https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100" alt="top offers" /></div>
                        <h4 className="text-sm text-center font-semibold">Fashion</h4>
                        <div className="h absolute bg-yellow-500 hidden z-50">
                            <h4 className="text-sm text-left" onClick={() => {Ite("men's clothing")}}>Men's wear</h4>
                            <h4 className="text-sm text-left" onClick={() => {Ite("women's clothing")}}>Ladi's wear</h4>
                        </div>
                    </div>
                    <div onClick={() => {Ite('electronics')}} className="cursor-pointer">
                        <div><img className="w-14 h-14" src="https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100" alt="top offers" /></div>
                        <h4 className="text-sm font-semibold">Electronics</h4>
                    </div>
                    <div onClick={() => {Ite("jewelery")}} className="cursor-pointer">
                        <div><img className="w-14 h-14" src="jewellary.png" alt="top offers" /></div>
                        <h4 className="text-sm font-semibold">Jewelry</h4>
                    </div>
                    <div>
                        <div><img className="w-14 h-14" src="https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100" alt="top offers" /></div>
                        <h4 className="text-sm font-semibold">Appliances</h4>
                    </div>
                    <div>
                        <div><img className="w-14 h-14" src="https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100" alt="top offers" /></div>
                        <h4 className="text-sm font-semibold">Travel</h4>
                    </div>
                    <div className="text-center">
                        <div><img className="w-14 h-14" src="https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100" alt="top offers" /></div>
                        <h4 className="text-sm font-semibold">Toys</h4>
                    </div>
                </div>
            </div>
            <div className="md-secondHeade hidden md:block px-2">
                <div className="flex overflow-scroll gap-8">
                    <div>
                        <div><img className="w-10 h-10" src="https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100" alt="top offers" /></div>
                        <h4 className="text-xs font-semibold">TopOffers</h4>
                    </div>
                    <div>
                        <div><img className="w-10 h-10" src="https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100" alt="top offers" /></div>
                        <h4 className="text-xs w-10 font-semibold">Grocery</h4>
                    </div>
                    <div>
                        <div><img className="w-10 h-10" src="https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100" alt="top offers" /></div>
                        <h4 className="text-xs w-10 font-semibold">Mobiles</h4>
                    </div>
                    <div onClick={() => {Ite("jewelery")}} className="cursor-pointer">
                        <div><img className="w-10 h-10" src="jewellary.png" alt="top offers" /></div>
                        <h4 className="text-xs font-semibold">Jewellery</h4>
                    </div>
                    <div className="text-center fashion cursor-pointer" onClick={() => {Ite("men's clothing")}}>
                        <div><img className="w-10 h-10" src="https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100" alt="top offers" /></div>
                        <h4 className="text-xs w-10 font-semibold">Men</h4>
                    </div>
                    <div onClick={() => {Ite('electronics')}} className="cursor-pointer">
                        <div><img className="w-10 h-10" src="https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100" alt="top offers" /></div>
                        <h4 className="text-xs w-10 font-semibold">Electronics</h4>
                    </div>
                    <div className="text-center fashion cursor-pointer" onClick={() => {Ite("women's clothing")}}>
                        <div><img className="w-10 h-10" src="https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100" alt="top offers" /></div>
                        <h4 className="text-xs w-10 font-semibold">Women</h4>
                    </div>
                    <div>
                        <div><img className="w-10 h-10" src="https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100" alt="top offers" /></div>
                        <h4 className="text-xs w-10 font-semibold">Home</h4>
                    </div>
                    <div>
                        <div><img className="w-10 h-10" src="https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100" alt="top offers" /></div>
                        <h4 className="text-xs w-10 font-semibold">Appliances</h4>
                    </div>
                    <div>
                        <div><img className="w-10 h-10" src="https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100" alt="top offers" /></div>
                        <h4 className="text-xs w-10 font-semibold">Travel</h4>
                    </div>
                    <div className="text-center">
                        <div><img className="w-10 h-10" src="https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100" alt="top offers" /></div>
                        <h4 className="text-xs w-10 font-semibold">Juleary</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondHeader

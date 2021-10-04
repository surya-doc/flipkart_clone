// ************************************ CAROUSEL FOR SLIDE SHOWING MULTIPLE PRODUCTS **********************************************
import React, { useEffect, useState } from "react";
import Carousel from 'react-elastic-carousel';
import { useHistory } from "react-router-dom";
import './MultiCarusal.css';

function MultiCarusal({ category }) {
  const history = useHistory();
  // break points conditions for carusal
  const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
      { width: 850, itemsToShow: 4 },
      { width: 1150, itemsToShow: 4},
      { width: 1450, itemsToShow: 5 },
      { width: 1750, itemsToShow: 6 },
    ]

  const[item, setItem] = useState([]);
  // function to get items category wise from F.S API
    async function getItems() {
        //fetching items category wise via different category endpoints from F.A API
        const it = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const newItem = await it.json();
        setItem(newItem);
    }
    useEffect(() => {
        // calling the function on component rendering
        getItems();
    },[])

    function getItemsPage(category){
      // go to single item page and passing the category as params
      history.push(`/items/${category}`);
    }

    return (
      <div className="query mx-3 shadow-lg rounded-sm my-4" style={{backgroundColor: "#FFF"}}>
        <div className="pt-3 pl-3 text-2xl font-semibold" style={{color: "#565656", borderBottom: "1px solid #e5e5e5", paddingBottom: "14px"}}>
          <h1 className="md:text-base">{category === "men's clothing" ? "See the latest collections on men's wears" : null}</h1>
          <h1 className="md:text-base">{category === "electronics" ? "Best Sellers in Computers & Accessories" : null}</h1>
          <h1 className="md:text-base">{category === "jewelery" ? "Jewelery collection" : null}</h1>
          <h1 className="md:text-base">{category === "women's clothing" ? "Biggest collection on ladies wear" : null}</h1>
        </div>
        <Carousel breakPoints={breakPoints}>
          {
            item.map((ele, i) => (
              <div className="py-10 text-center px-4" key={i} onClick={() => {getItemsPage(category)}}>
                <div className="flex justify-center"><img className="multiCarusalImg multiImg w-24 h-24" src={ele.image} alt={i} /></div>
                <h5 className="items pt-4 mx-10" style={{letterSpacing: "1px"}}>{ele.title}</h5>
                <p className="text-sm" style={{color: "#58903c", letterSpacing: "1px"}}>From ₹{ele.price}</p>
                <p className="text-sm" style={{color: "#949494", textTransform: "capitalize"}}>{category}</p>
              </div>
            ))
          }
        </Carousel>
      </div>
    );
  }

  export default MultiCarusal;

// import React, { useEffect, useState } from 'react';
// import "./Cards.css";

// function Cards({ category }) {
//     const[items, setItems] = useState(null);
//     const sellOffer = ["20", "40", "25", "50"];
//     const[randomNum, setRandomNum] = useState(0);
//     async function getItems() {
//         console.log(category);
//         const it = await fetch(`https://fakestoreapi.com/products/category/${category}`);
//         const newIt = await it.json();
//         setItems(newIt);
//         console.log("*))))))))))))))))))))))))))))))))))))))))))))_", items);
//     }
//     useEffect(() => {
//         getItems();
//         setRandomNum(Math.floor(Math.random() * 4));
//     },[category])
//     return (
//         <div>
//             <div className="single_card w-12/12 flex-col min-h-full ml-3 mr-3 mt-2 p-4">
//                 <div className="title">
//                     Min {sellOffer[randomNum]} % off {category}
//                 </div>
//                 {
//                     items ? 
//                     <div className="flex-column">
//                         <div className="flex justify-between items-center">
//                             <div className="sqImg w-24 p-3 shadow-xl cursor-pointer">
//                                 <img src={items[0].image} alt="1" />
//                             </div>
//                             <div className="sqImg w-24 p-3 shadow-xl cursor-pointer">
//                                 <img src={items[1].image} alt="1" />
//                             </div>
//                         </div>
//                         <div className="flex justify-between items-center">
//                             <div className="sqImg w-24 pt-4 p-3 shadow-xl cursor-pointer">
//                                 <img src={items[2].image} alt="1" />
//                             </div>
//                             <div className="sqImg w-24 pt-4 p-3 shadow-xl cursor-pointer">
//                                 <img src={items[3].image} alt="1" />
//                             </div>
//                         </div>
//                         <a className="cardAnchor" href="/">See all Small Buisness Day offers</a>
//                     </div> 
//                     :
//                     null
//                 }
//             </div>
//         </div>
//     )
// }

// export default Cards

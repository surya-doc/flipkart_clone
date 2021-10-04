import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopHeader from '../Navbars/TopHeader';
import './Items.css'
import StarIcon from '@material-ui/icons/Star';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../Footer/Footer';
import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import { checkToken } from '../../Actions/Login';

function Items() {

    const[minValue, setMinValue] = useState('0')
    const[maxValue, setMaxValue] = useState('2500')

    // check box is checked or not
    const[checked_1, setChecked_1] = useState(false);
    const[checked_2, setChecked_2] = useState(false);
    const[checked_3, setChecked_3] = useState(false);
    const[checked_4, setChecked_4] = useState(false);

    // this are the values of individual checkbox
    const[checkBoxValue_1, setCheckBoxVlue_1] = useState('1');
    const[checkBoxValue_2, setCheckBoxVlue_2] = useState('2');
    const[checkBoxValue_3, setCheckBoxVlue_3] = useState('3');
    const[checkBoxValue_4, setCheckBoxVlue_4] = useState('4');

    // check box is checked or not for discount
    const[checkedDis_1, setCheckedDis_1] = useState(false);
    const[checkedDis_2, setCheckedDis_2] = useState(false);
    const[checkedDis_3, setCheckedDis_3] = useState(false);
    const[checkedDis_4, setCheckedDis_4] = useState(false);

    // values of discount individual checkbox
    const[DisccountBox_1, setDisccountBox_1] = useState('10');
    const[DisccountBox_2, setDisccountBox_2] = useState('20');
    const[DisccountBox_3, setDisccountBox_3] = useState('30');
    const[DisccountBox_4, setDisccountBox_4] = useState('40');


    // mobile view of searching
    const[mAll, setMAll] = useState(true);
    const[mPrice, setMPrice] = useState(false);
    const[mStar, setMStar] = useState(true);
    const[mDiscount, setMDiscount] = useState(true);
    const dispatch = useDispatch();
    // mobile view of sorting
    const[screenPos, setScreenPos] = useState(false);


    const{ item } = useParams();

    const data = useSelector((state) => state.updatedDatas.data.filter((elements) => elements.category === item));
    const[increasedArray, updateIA] = useState(data);
    

    function getCustomerReview(){
        console.log(checkBoxValue_4);
    }



    useEffect(() => {
        updateIA(data);
    }, [])

    function setRange(min, max){
        const min_1 = parseInt(min);
        const max_1 = parseInt(max);
        max_1 !== 2500 ? updateIA(data.filter((elements) => elements.afterDiscount >= min_1 && elements.afterDiscount <= max_1)) : updateIA(data.filter((elements) => elements.afterDiscount >= max_1));
    }
        

    function makeChange(num){
        const val = parseInt(num);
        val ? updateIA(data.filter((elements) => elements.star >= val)) : updateIA(data);
    }

    function onDiscount(num){
        const val = parseInt(num);
        val ? updateIA(data.filter((elements) => elements.discount >= val)) : updateIA(data);
    }

    function priceSortAscending(){
        updateIA(data.sort((a, b) => {
            return a.afterDiscount - b.afterDiscount
        }))
        setScreenPos(false);
    }
    function priceSortDecending(){
    updateIA(data.sort((a, b) => {
        return b.afterDiscount - a.afterDiscount
    }))
    setScreenPos(false);
}

    const history = useHistory();

    function goToSingl(id){
        history.push(`/products/${id}`);
    }

    useEffect(() => {
        dispatch(checkToken());
    }, [dispatch])

    useEffect(() => {
        console.log(item);
        updateIA(data);
    }, [item])

    return (
        <div className="items-body">
            <TopHeader />
            <div className="semiNav md:hidden flex justify-between px-40 relative">
                <p onClick={() => {history.push("/items/electronics")}}>Electronics</p>
                <p onClick={() => {history.push("/items/men's clothing")}}>Man</p>
                <p onClick={() => {history.push("/items/women's clothing")}}>Woman</p>
                <p>Home and ferniture</p>
                <p onClick={() => {history.push("/items/jewelery")}}>Jewelry</p>
                <p>Offer zone</p>
            </div>
            <div className="secondBarForMobile shadow-md top-28 bg-white hidden relative md:flex justify-between">
                    <div className="flex justify-center items-center w-1/2 px-2 py-2 cursor-pointer" style={{borderRight: "1px solid #f1f3f6"}} onClick={() => {
                        setScreenPos(!screenPos)
                    }}
                    >
                        <SortIcon />
                        Sort
                    </div>
                    <div className="flex justify-center items-center w-1/2 px-2 py-2 cursor-pointer" style={{borderLeft: "1px solid #f1f3f6"}} onClick={() => {
                        setMAll(false)
                        console.log(mAll)
                        }} 
                    >
                        <FilterListIcon />
                        Filter
                    </div>
            </div>

            {/* appear sort screen on small screen */}
            <div className="fixed bottom-0 w-full h-full" style={{zIndex: "999", display: screenPos ? 'block' : 'none'}}>
                <div className="upperScreen" style={{minWidth: "100vh", minHeight: "70vh", backgroundColor: "rgba(0, 0, 0, 0.4)"}} onClick={() => {
                    setScreenPos(false)
                }}
                >

                </div>
                <div className="bg-white bottom-0 fixed flex-col w-full" style={{minHeight: "30vh"}}>
                    {/* <h1>Sort</h1> */}
                    <p className="font-semibold text-md px-4 py-3">SORT BY</p>
                    <p className="text-sm mx-4 font-semibold sort py-3 cursor-pointer" onClick={priceSortAscending}>Price--Low to High</p>
                    <p className="text-sm mx-4 font-semibold sort py-3 cursor-pointer" onClick={priceSortDecending}>Price--High to Low</p>
                </div>
            </div>




            <div className="itemsBody md:top-28 md:pb-8 top-16 relative flex">
                <div className="sideBar block md:hidden md:w-0 min-h-screen bg-white mx-2 my-1 w-1/5 border-r-2">
                    <h1 class="text-lg filterText font-medium px-3 py-2">Filters</h1>
                    <h4 className="text-xs px-3 py-2 font-semibold">CATEGORIES</h4>
                    <p className="px-3 pt-8 pb-8 mb-4 text-sm" style={{borderBottom: "1px solid #f0f0f0"}}>{item}</p>
                    <p className="px-3 text-sm font-semibold">PRICE</p>
                    <div className="flex items-center">
                        <div class="progress w-4/5 h-1.5 mx-3 my-4">
                            <div class="progress-bar w-100" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div className="prise flex justify-between text-sm pl-3 pr-4 pb-8">
                        <select class="selectBox form-select w-2/5" aria-label="Default select example" onChange={(event) => setMinValue(event.target.value)}>
                            <option selected>100</option>
                            <option value="250">250</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="1500">1500</option>
                            <option value="2000">2000</option>
                        </select>
                        <p style={{color: "#878787"}}>to</p>
                        <select class="selectBox form-select w-2/5" aria-label="Default select example" onChange={(event) => setMaxValue(event.target.value)}>
                            <option selected>250</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="1500">1500</option>
                            <option value="2000">2000</option>
                            <option value="2500">2500 & above</option>
                        </select>
                        <button onClick={() => {setRange(minValue, maxValue)}}>GO</button>
                    </div>
                    <div className="customersRating pt-8 px-4 pb-8" style={{borderTop: "1px solid #f0f0f0"}}>
                        <p className="text-sm font-semibold">CUSTOMER RATINGS</p>
                        
                        <div className="rating flex text-sm pt-3 pb-2">
                            <form>
                                <input className="mr-2" type="checkBox" value={false}  checked={checked_4}
                                onChange={(event) => {
                                    setChecked_4(!checked_4);
                                }} 
                                onClick={() => {
                                    setCheckBoxVlue_4(checkBoxValue_4 !== '0' ? '0' : '4')
                                    getCustomerReview()
                                    makeChange(checkBoxValue_4)
                                }
                                } 
                                />
                            </form>
                            <p>4 <span><StarIcon style={{fontSize: "14px"}} /></span> & above</p>
                        </div>
                        <div className="rating flex text-sm py-2">
                            <form>
                                    <input className="mr-2" type="checkBox" value={false}  checked={checked_3}
                                    onChange={(event) => {
                                        setChecked_3(!checked_3);
                                    }} 
                                    onClick={() => {
                                        setCheckBoxVlue_3(checkBoxValue_3 !== '0' ? '0' : '3')
                                        getCustomerReview()
                                        makeChange(checkBoxValue_3)
                                    }
                                    } 
                                    />
                            </form>
                            <p>3 <span><StarIcon style={{fontSize: "14px"}} /></span> & above</p>
                        </div>
                        <div className="rating flex text-sm py-2">
                                <form>
                                    <input className="mr-2" type="checkBox" value={false}  checked={checked_2}
                                    onChange={(event) => {
                                        setChecked_2(!checked_2);
                                    }} 
                                    onClick={() => {
                                        setCheckBoxVlue_2(checkBoxValue_2 !== '0' ? '0' : '2')
                                        getCustomerReview()
                                        makeChange(checkBoxValue_2)
                                    }
                                    } 
                                    />
                                </form>
                            <p>2 <span><StarIcon style={{fontSize: "14px"}} /></span> & above</p>
                        </div>
                        <div className="rating flex text-sm py-2">
                                <form>
                                    <input className="mr-2" type="checkBox" value={false}  checked={checked_1}
                                    onChange={(event) => {
                                        setChecked_1(!checked_1);
                                    }} 
                                    onClick={() => {
                                        setCheckBoxVlue_1(checkBoxValue_1 !== '0' ? '0' : '1')
                                        getCustomerReview()
                                        makeChange(checkBoxValue_1)
                                    }
                                    } 
                                    />
                                </form>
                            <p>1 <span><StarIcon style={{fontSize: "14px"}} /></span> & above</p>
                        </div>
                    </div>
                    <div className="discount px-4 pt-8" style={{borderTop: "1px solid #f0f0f0"}}>
                        <p className="text-sm font-semibold">DISCOUNT</p>
                            <div className="rating flex text-sm pt-3 pb-2">
                                    <form>
                                        <input className="mr-2" type="checkBox" value={false}  checked={checkedDis_4}
                                        onChange={(event) => {
                                            setCheckedDis_4(!checkedDis_4);
                                        }} 
                                        onClick={() => {
                                            setDisccountBox_4(DisccountBox_4 !== '0' ? '0' : '40')
                                            getCustomerReview()
                                            onDiscount(DisccountBox_4)
                                        }
                                        } 
                                        />
                                    </form>
                                <p>40% <span><StarIcon style={{fontSize: "14px"}} /></span> or more</p>
                            </div>
                            <div className="rating flex text-sm py-2">
                                    <form>
                                        <input className="mr-2" type="checkBox" value={false}  checked={checkedDis_3}
                                        onChange={(event) => {
                                            setCheckedDis_3(!checkedDis_3);
                                        }} 
                                        onClick={() => {
                                            setDisccountBox_3(DisccountBox_3 !== '0' ? '0' : '30')
                                            getCustomerReview()
                                            onDiscount(DisccountBox_3)
                                        }
                                        } 
                                        />
                                    </form>
                                <p>30% <span><StarIcon style={{fontSize: "14px"}} /></span> or more</p>
                            </div>
                            <div className="rating flex text-sm py-2">
                                    <form>
                                        <input className="mr-2" type="checkBox" value={false}  checked={checkedDis_2}
                                        onChange={(event) => {
                                            setCheckedDis_2(!checkedDis_2);
                                        }} 
                                        onClick={() => {
                                            setDisccountBox_2(DisccountBox_2 !== '0' ? '0' : '20')
                                            getCustomerReview()
                                            onDiscount(DisccountBox_2)
                                        }
                                        } 
                                        />
                                    </form>
                                <p>20% <span><StarIcon style={{fontSize: "14px"}} /></span> or more</p>
                            </div>
                            <div className="rating flex text-sm py-2">
                                    <form>
                                        <input className="mr-2" type="checkBox" value={false}  checked={checkedDis_1}
                                        onChange={(event) => {
                                            setCheckedDis_1(!checkedDis_1);
                                        }} 
                                        onClick={() => {
                                            setDisccountBox_1(DisccountBox_1 !== '0' ? '0' : '10')
                                            getCustomerReview()
                                            onDiscount(DisccountBox_1)
                                        }
                                        } 
                                        />
                                    </form>
                                <p>10% <span><StarIcon style={{fontSize: "14px"}} /></span> or more</p>
                            </div>                    
                    </div>
                </div>
                
                <div className="mainItemsContainer flex-col justify-center md:mb-40 bg-white md:w-full w-4/5 m-1">
                    <div className="flex px-4 py-2 md:hidden">
                        <p className="font-bold text-sm px-4">Sort By</p>
                        <button className="text-sm mx-4 font-semibold sort" onClick={priceSortAscending}>Price--Low to High</button>
                        <button className="text-sm mx-4 font-semibold sort" onClick={priceSortDecending}>Price--High to Low</button>
                    </div>
                    <div className="flex justify-center md:mb-40 bg-white">
                        <div className="flex-1 relative gap-4 md:gap-0 falseItems mx-auto grid grid-cols-4 md:grid-cols-2 p-2 md:p-0">
                            {
                                increasedArray.length !== 0 ?
                                increasedArray.map((element, i) => (
                                    <div className="card md:border-0 flex-col items-center hover:shadow-xl" key={i} onClick={() => {goToSingl(element.id)}}>
                                        <img className="h-48 w-48 text-center z-30" src={element.image} alt="" />
                                        <div className="details bg-white w-full md:pl-0" style={{paddingLeft: "1rem", paddingTop: "1rem"}}>
                                            <h4 className="nameOfProduct w-28 text-xs left-0 relative" style={{color: "#878787", fontWeight: "700", letterSpacing: "0.5px"}}>{element.title}</h4>
                                            <p className="des pt-1 text-sm" style={{color: "#4e4e4e"}}>{element.description}</p>
                                            <div className="allprice flex pt-3 items-center">
                                                <h5 className="afterDis font-medium md:text-xs" style={{color: "#212121", lineHeight: "22px", fontWeight: "500"}}>₹{element.afterDiscount}</h5>
                                                <h5 className="beforeDis text-sm px-2 line-through md:text-xs" style={{color: "#8f8f8f"}}>₹{element.price}</h5>
                                                <h5 className="dis md:text-xs text-sm" style={{color: "#388e3c", lineHeight: "18px", fontWeight: "600", fontFamily: "Roboto, Arial, sans-serif"}}>{element.discount}% off</h5>
                                            </div>
                                            <p style={{padding: "2px 10px", width: "40px", display: "flex", alignItems: "center", color: "#FFF", borderRadius: "20px", marginTop: "10px", backgroundColor: "#14be47"}}><i class="fas fa-xs fa-star"></i>{element.star}</p>
                                        </div>
                                    </div>
                                ))
                                :    
                                data.map((element, i) => (
                                    <div className="card md:border-0 flex-col items-center hover:shadow-xl" key={i} onClick={() => {goToSingl(element.id)}}>
                                        <img className="h-48 w-48 text-center z-30" src={element.image} alt="" />
                                        <div className="details pl-4 pt-4  bg-white w-full md:pl-0">
                                            <h4 className="nameOfProduct w-28 text-xs left-0 relative" style={{color: "#878787", fontWeight: "700", letterSpacing: "0.5px"}}>{element.title}</h4>
                                            <p className="des pt-1 text-sm" style={{color: "#4e4e4e"}}>{element.description}</p>
                                            <div className="allprice flex pt-3">
                                                <h5 className="afterDis font-medium" style={{color: "#212121", lineHeight: "22px", fontWeight: "500"}}><i class="fas fa-rupee-sign"></i>{element.afterDiscount}</h5>
                                                <h5 className="beforeDis text-sm px-2 line-through" style={{color: "#8f8f8f"}}><i class="fas fa-rupee-sign"></i>{element.price}</h5>
                                                <h5 className="dis" style={{color: "#388e3c", fontSize: "13px", lineHeight: "18px", fontWeight: "600", fontFamily: "Roboto, Arial, sans-serif"}}>{element.discount}% off</h5>
                                            </div>
                                            <p style={{padding: "2px 10px", width: "40px", display: "flex", alignItems: "center", color: "#FFF", borderRadius: "20px", marginTop: "10px", backgroundColor: "#14be47"}}><i class="fas fa-xs fa-star"></i>{element.star}</p>
                                        </div>
                                    </div>
                                ))
                            }                
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            
            <div className="sortPageForMobile fixed w-full h-full top-0" style={{zIndex: "999", backgroundColor: "#FFF", display: mAll ? "none" : "flex", flexDirection: "column"}}>
                <div className="w-full flex items-center py-3 px-2" style={{backgroundColor: "#2874f0", color: "#FFF"}} onClick={() => {setMAll(true)}}>
                    <i class="fas fa-arrow-left"></i>
                    <p className="mx-2">Filters</p>
                </div>
                <div className="flex">
                    <div className="mobileLeft flex-col" style={{backgroundColor: "#f1f3f6", minHeight: "80vh", borderRight: "1px solid #f1f3f6"}}>
                        <p className="px-2 py-2 text-xs cursor-pointer" style={{backgroundColor: mPrice ? "#f1f3f6" : "#FFF", color: mPrice ? "#5c5c5c" : "#2874f0"}} 
                        onClick={() => {
                            setMPrice(false)
                            setMStar(true)
                            setMDiscount(true)
                        }}
                        >Price</p>
                        <p className="px-2 py-2 text-xs cursor-pointer" style={{backgroundColor: mStar ? "#f1f3f6" : "#FFF", color: mStar ? "#5c5c5c" : "#2874f0"}}
                        onClick={() => {
                            setMPrice(true)
                            setMStar(false)
                            setMDiscount(true)
                        }}
                        >Customer Ratings</p>
                        <p className="px-2 py-2 text-xs cursor-pointer" style={{backgroundColor: mDiscount ? "#f1f3f6" : "#FFF", color: mDiscount ? "#5c5c5c" : "#2874f0"}}
                        onClick={() => {
                            setMPrice(true)
                            setMStar(true)
                            setMDiscount(false)
                        }}
                        >Discount</p>
                    </div>
                    <div className="mobileRight flex items-center justify-center">
                    <div className="customersRating pt-8 px-4 pb-8" style={{display: mStar ? "none" : "block"}}>
                        <p className="text-sm font-semibold">CUSTOMER RATINGS</p>
                            
                        <div className="rating flex text-sm pt-3 pb-2">
                                <form>
                                    <input className="mr-2" type="checkBox" value={false}  checked={checked_4}
                                    onChange={(event) => {
                                        setChecked_4(!checked_4);
                                    }} 
                                    onClick={() => {
                                        setCheckBoxVlue_4(checkBoxValue_4 !== '0' ? '0' : '4')
                                        getCustomerReview()
                                        makeChange(checkBoxValue_4)
                                    }
                                    } 
                                    />
                                </form>
                                <p>4 <span><StarIcon style={{fontSize: "14px"}} /></span> & above</p>
                            </div>
                        <div className="rating flex text-sm py-2">
                                <form>
                                        <input className="mr-2" type="checkBox" value={false}  checked={checked_3}
                                        onChange={(event) => {
                                            setChecked_3(!checked_3);
                                        }} 
                                        onClick={() => {
                                            setCheckBoxVlue_3(checkBoxValue_3 !== '0' ? '0' : '3')
                                            getCustomerReview()
                                            makeChange(checkBoxValue_3)
                                        }
                                        } 
                                        />
                                </form>
                                <p>3 <span><StarIcon style={{fontSize: "14px"}} /></span> & above</p>
                            </div>
                        <div className="rating flex text-sm py-2">
                                    <form>
                                        <input className="mr-2" type="checkBox" value={false}  checked={checked_2}
                                        onChange={(event) => {
                                            setChecked_2(!checked_2);
                                        }} 
                                        onClick={() => {
                                            setCheckBoxVlue_2(checkBoxValue_2 !== '0' ? '0' : '2')
                                            getCustomerReview()
                                            makeChange(checkBoxValue_2)
                                        }
                                        } 
                                        />
                                    </form>
                                <p>2 <span><StarIcon style={{fontSize: "14px"}} /></span> & above</p>
                            </div>
                        <div className="rating flex text-sm py-2">
                                    <form>
                                        <input className="mr-2" type="checkBox" value={false}  checked={checked_1}
                                        onChange={(event) => {
                                            setChecked_1(!checked_1);
                                        }} 
                                        onClick={() => {
                                            setCheckBoxVlue_1(checkBoxValue_1 !== '0' ? '0' : '1')
                                            getCustomerReview()
                                            makeChange(checkBoxValue_1)
                                        }
                                        } 
                                        />
                                    </form>
                                <p>1 <span><StarIcon style={{fontSize: "14px"}} /></span> & above</p>
                            </div>
                    </div>

                    <div className="prise flex justify-between text-sm pl-3 pr-4 pb-8" style={{display: mPrice ? "none" : "block"}}>
                        <select class="selectBox form-select w-2/5" aria-label="Default select example" onChange={(event) => setMinValue(event.target.value)}>
                            <option selected>100</option>
                            <option value="250">250</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="1500">1500</option>
                            <option value="2000">2000</option>
                        </select>
                        <p style={{color: "#878787"}}>to</p>
                        <select class="selectBox form-select w-2/5" aria-label="Default select example" onChange={(event) => setMaxValue(event.target.value)}>
                            <option selected>250</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="1500">1500</option>
                            <option value="2000">2000</option>
                            <option value="2500">2500 & above</option>
                        </select>
                        <button onClick={() => {setRange(minValue, maxValue)}}>GO</button>
                    </div>

                    <div className="discount px-4 pt-8"  style={{display: mDiscount ? "none" : "block"}}>
                        <p className="text-sm font-semibold">DISCOUNT</p>
                            <div className="rating flex text-sm pt-3 pb-2">
                                    <form>
                                        <input className="mr-2" type="checkBox" value={false}  checked={checkedDis_4}
                                        onChange={(event) => {
                                            setCheckedDis_4(!checkedDis_4);
                                        }} 
                                        onClick={() => {
                                            setDisccountBox_4(DisccountBox_4 !== '0' ? '0' : '40')
                                            getCustomerReview()
                                            onDiscount(DisccountBox_4)
                                        }
                                        } 
                                        />
                                    </form>
                                <p>40% <span><StarIcon style={{fontSize: "14px"}} /></span> or more</p>
                            </div>
                            <div className="rating flex text-sm py-2">
                                    <form>
                                        <input className="mr-2" type="checkBox" value={false}  checked={checkedDis_3}
                                        onChange={(event) => {
                                            setCheckedDis_3(!checkedDis_3);
                                        }} 
                                        onClick={() => {
                                            setDisccountBox_3(DisccountBox_3 !== '0' ? '0' : '30')
                                            getCustomerReview()
                                            onDiscount(DisccountBox_3)
                                        }
                                        } 
                                        />
                                    </form>
                                <p>30% <span><StarIcon style={{fontSize: "14px"}} /></span> or more</p>
                            </div>
                            <div className="rating flex text-sm py-2">
                                    <form>
                                        <input className="mr-2" type="checkBox" value={false}  checked={checkedDis_2}
                                        onChange={(event) => {
                                            setCheckedDis_2(!checkedDis_2);
                                        }} 
                                        onClick={() => {
                                            setDisccountBox_2(DisccountBox_2 !== '0' ? '0' : '20')
                                            getCustomerReview()
                                            onDiscount(DisccountBox_2)
                                        }
                                        } 
                                        />
                                    </form>
                                <p>20% <span><StarIcon style={{fontSize: "14px"}} /></span> or more</p>
                            </div>
                            <div className="rating flex text-sm py-2">
                                    <form>
                                        <input className="mr-2" type="checkBox" value={false}  checked={checkedDis_1}
                                        onChange={(event) => {
                                            setCheckedDis_1(!checkedDis_1);
                                        }} 
                                        onClick={() => {
                                            setDisccountBox_1(DisccountBox_1 !== '0' ? '0' : '10')
                                            getCustomerReview()
                                            onDiscount(DisccountBox_1)
                                        }
                                        } 
                                        />
                                    </form>
                                <p>10% <span><StarIcon style={{fontSize: "14px"}} /></span> or more</p>
                            </div>                    
                        </div>

                </div>
                </div>
                <div className="flex pt-1 justify-end pl-4 pr-4 pb-4 rounded-sm" style={{backgroundColor: "#FFF", borderTop: "2px solid #f1f3f6"}}>
                    <button style={{backgroundColor: "#fb641b", padding: "16px 28px", marginBottom: "20px", color: "#FFF"}} onClick={() => {setMAll(true)}}>APPLY</button>
                </div>
            </div>
        </div>
    )
}

export default Items

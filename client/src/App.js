import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import TopHeader from './Components/Navbars/TopHeader';
import SecondHeader from './Components/Navbars/SecondHeader';
import Body from './Components/Body/Body';
import Footer from '../src/Components/Footer/Footer';
import Items from './Components/ItemsBody/Items';
import { useDispatch, useSelector } from 'react-redux'; 
import { putItems } from './Actions/InsetItems';
import Product from './Components/Products/Product';
import Cart from './Components/Cart/Cart';
import { cartOnPageLoad } from './Actions/CartUpdates';
import SignupForm from './SignupForm';
import Order from './Components/Orders/Order';
import { getAllOrders, getOrders } from './Actions/Order';
import Myorder from './MyOrder/Myorder';
import { checkToken } from './Actions/Login';

function App() {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('prof'));
    const datas = useSelector(state => state.updatedDatas.data);
    const userFromRedux = useSelector(state => state.currentUser.user);
    useEffect(() => {
        async function fetchingData(){
            const products = await fetch('https://fakestoreapi.com/products');
            const p = await products.json();
            for(var i=0; i<p.length; i++){
                const rand_1 = Math.floor(Math.random() * 4)+1;
                p[i].star = rand_1;
                p[i].price = Math.floor((p[i].price*(rand_1*10)));
                const rand_2 = Math.floor(Math.random() * 4)+1;
                p[i].discount = rand_2*10;
                p[i].afterDiscount = p[i].price-((p[i].price)*(rand_1*10))/100;
            }
            for(var j=0; j<40; j++){
                const index = (j%20);
                p.push(p[index]);
            }
            dispatch(checkToken());
            dispatch(putItems(p));
            dispatch(cartOnPageLoad(user));
            user ? dispatch(getOrders(user.prof)) : console.log("No User");
            user ? dispatch(getAllOrders(user)) : console.log("No user");
        }
        fetchingData();
    }, [])

    useEffect(() => {
        dispatch(cartOnPageLoad(user));
    }, [datas])

    useEffect(() => {
        user ? dispatch(getOrders(user.prof)) : console.log("No User");
    },[userFromRedux])

    return (
        <Switch>
            <Route path="/" exact>
                <TopHeader />
                <SecondHeader />
                <Body />
                <Footer />
            </Route>
            <Route path="/items/:item">
                <Items />
            </Route>
            <Route path="/products/:id">
                <Product />
            </Route>
            <Route path='/cartitems'>
                <Cart />
            </Route>
            <Route path="/signup">
                <SignupForm />
            </Route>
            <Route path="/orders/:type">
                <Order />
            </Route>
            <Route path="/myorder">
                <Myorder />
            </Route>
        </Switch>
    )
}

export default App

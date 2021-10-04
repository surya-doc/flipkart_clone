import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { itemsReducers } from '../Reducers/SaveItems';
import { logThisUser, signInUser } from '../Reducers/LoginUser';
import { cartItem } from '../Reducers/CartItemReducer'
import { PlaceOrder } from '../Reducers/PlaceOrder';
import { addressReducer, orderedItems } from '../Reducers/Order';

const rootReducer = combineReducers({
    currentUser: logThisUser,
    updatedDatas: itemsReducers,
    location: addressReducer,
    cartItemNum: cartItem,
    SignIn: signInUser,
    order: PlaceOrder,
    items: orderedItems
})

const Store = createStore(rootReducer,  {}, composeWithDevTools(compose(applyMiddleware(thunk))));
export default Store;
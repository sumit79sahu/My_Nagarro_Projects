import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Cart/cartSlice'
import loginReducer from './Login/loginSlice';
import signupReducer from './Signup/signupSlice';
import emailVerificationReducer from "./Verification/EmailVerification";
import authTokenReducer from "./Login/userAuthorizationSlice";
import { combineReducers } from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';


const persistConfig={
    key:'root',
    storage
}
let rootReducer=combineReducers(
    {
        cart:cartReducer,
        token:authTokenReducer
    }
)
const persistedReducer=persistReducer(persistConfig,rootReducer)


const Store=configureStore(
    {
        reducer:{
       
            login:loginReducer,
            signup:signupReducer,
            emailverification:emailVerificationReducer,
            persistedReducer
        },
        devTools: process.env.NODE_ENV !== 'production',
        middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        })
    }
)

export default Store;
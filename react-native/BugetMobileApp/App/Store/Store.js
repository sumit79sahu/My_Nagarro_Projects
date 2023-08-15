import BugetReducer from "./Slice/BugetSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";

import AsyncStorage from '@react-native-async-storage/async-storage';

let persistConfig={
    key:'root',
    storage:AsyncStorage
}
let rootReducer=combineReducers(
    {
        bugets:BugetReducer
    }
)


let persistedReducer=persistReducer(persistConfig,rootReducer)


const Store=configureStore(
    {
        reducer:persistedReducer,
        middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        })
    }
)

export default Store
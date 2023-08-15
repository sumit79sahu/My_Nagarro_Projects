import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice(
    {
        name:'cart',
        initialState:[],
        reducers:{
            add(state,action)
            {
                return[...state,action.payload]
            },
            remove(state,action)
            {
                return state.filter(data=>data.productId!==action.payload)
            }
        }
    }
)
export const {add,remove}=cartSlice.actions;
export default cartSlice.reducer;
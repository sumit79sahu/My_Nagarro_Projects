import { createSlice } from "@reduxjs/toolkit";

const BugetSlice=createSlice({
    name:'bugets',
    initialState:[],
    reducers:{
        addBuget(state,action)
        {
            return [...state,action.payload]
        }
    }
})

export const{addBuget}=BugetSlice.actions;
export default BugetSlice.reducer
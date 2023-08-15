import { createSlice } from "@reduxjs/toolkit";

const loginSlice=createSlice(
    {
        name:'login',
        initialState:false,
        reducers:{
            loginShow(state,action)
            {
                state=action.payload
                return state
            }
        }
    }
)
export const {loginShow}=loginSlice.actions;
export default loginSlice.reducer;
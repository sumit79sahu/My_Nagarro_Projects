import { createSlice } from "@reduxjs/toolkit";

const signupSlice=createSlice(
    {
        name:'signup',
        initialState:false,
        reducers:{
            signupShow(state,action)
            {
                state=action.payload
                return state
            }
        }
    }
)

export const {signupShow}=signupSlice.actions;
export default signupSlice.reducer;
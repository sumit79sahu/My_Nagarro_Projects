import { createSlice } from "@reduxjs/toolkit";


const emailVerification=createSlice(
    {
        name:'emailverification',
        initialState:{email:'',verificationShow:false,successShow:false,failShow:false},
        reducers:{
            emailVerificationShow(state,action)
            {
                state=action.payload
                return state
            },
        }
    }
)

export const {emailVerificationShow}=emailVerification.actions;
export default emailVerification.reducer;
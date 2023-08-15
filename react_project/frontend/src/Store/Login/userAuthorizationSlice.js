import { createSlice } from "@reduxjs/toolkit";

const userAuthorization=createSlice(
    {
        name:'authToken',
        initialState:{token:''},
        reducers:{
            authToken(state,action)
            {
                state.token=action.payload
                return state
            },
            removeAuthToken(state,action)
            {
                state.token=''
                return state
            }
        }

    }
)

export const{authToken,removeAuthToken}=userAuthorization.actions;

export default userAuthorization.reducer
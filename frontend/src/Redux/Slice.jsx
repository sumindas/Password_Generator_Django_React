import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        is_login : false,
        token : "",
    },
    reducers : {
        setUser:(state,action)=>{
            state.is_login = true
            state.token = action.payload.access_token
        },
        setLogout:(state)=>{
            state.token = ""
        }
    }
})

export const {setUser,setLogout} = authSlice.actions

export default authSlice.reducer
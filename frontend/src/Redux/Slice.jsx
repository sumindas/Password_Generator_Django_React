import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        is_login : false,
        token : "",
        username : "",
    },
    reducers : {
        setUser:(state,action)=>{
            state.is_login = true
            state.token = action.payload.access_token
            state.username = action.payload.email
        },
        setLogout:(state)=>{
            state.token = ""
        }
    }
})

export const {setUser,setLogout} = authSlice.actions

export default authSlice.reducer
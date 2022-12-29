import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios'
import { authAPI } from "../url";


const initialState = {
    user:""
  
}

export const signUpUser = createAsyncThunk('signupuser', async (body) => {
    return await axios.post(`${authAPI}register`, body).then(({ data }) => {
        return data
    }).catch ((err)=>{
        console.log(err)
    })
})

export const loginUser = createAsyncThunk('loginuser', async (body) => {
    return await axios.post(`${authAPI}login`, body).then(({ data }) => {
        return data
    }).catch ((err)=>{
        console.log(err)
    })
})
export const googleUser = createAsyncThunk('googleuser', async (body) => {
    return await axios.post(`${authAPI}google`, body).then(({ data }) => {
        return data
    }).catch ((err)=>{
        console.log(err)
    })
})

export const getUser = createAsyncThunk('getUser', async (body) => {
    return await axios.post(`${authAPI}google`, body).then(({ data }) => {
        return data
    }).catch ((err)=>{
        console.log(err)
    })
})


const authslice = createSlice({

    name: "auth",
    initialState,
    reducers: {
        // addToken: (state, action) => {
        //     state.localStorage.getItem("token")
        // },
        // addUser: (state, action) => {
        //     state.localStorage.getItem("user")
        // },
        // logout: (state, action) => {
        //     state.token = null
        //     localStorage.clear()
        // }
    },
    extraReducers: (builder) => {
        //..............Login....................

        builder.addCase(loginUser.pending, (state, action) => {

            state.loading = true
            console.log("Pending of logging user");
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            // console.log(action.payload.user,"starting of full fill");
            state.loading = false
            state.user=action.payload.user
        
            let token = action.payload.token
            state.token = token

            //localStorage.setItem("user", user)
            localStorage.setItem("token", token)
            state.isLoggedin = true;
            console.log(action.payload.user, "testing the action of login full filled");

        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = true
            console.log("Rejected of user");
        })
        
        //...........signUp...............
        builder.addCase(signUpUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.loading = false
            console.log(action.payload.user, "testing the action of signup full filled");
            state.loading = false
            state.user=action.payload.user
            let token = action.payload.token
            state.token = token

            //localStorage.setItem("user",state. user)
            localStorage.setItem("token", token)
        })
        builder.addCase(signUpUser.rejected, (state, action) => {
            state.loading = false
        })

        //.............Google...............
        builder.addCase(googleUser.fulfilled, (state, action) => {

            state.loading = false
            let user = action.payload.User
            let token = action.payload.token

            state.user = user
            state.token = token

            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
        })
        builder.addCase(googleUser.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export const currentUser = (state)=>state.auth.user
export default authslice.reducer
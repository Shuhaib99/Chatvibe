import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios'
// import { auth } from "../url";


const initialState = {
    isLoggedin: false,
    user: "",
    loading: "",
    error: ""
}

export const signUpUser = createAsyncThunk('signupuser', async (body) => {
    return await axios.post('register', body).then(({ data }) => {
        return data
    })
})
export const loginUser = createAsyncThunk('loginuser', async (body) => {
    return await axios.post('login', body).then(({ data }) => {
        return data
    })
})

const authslice = createSlice({

    name: "user",
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.localStorage.getItem("token")
        },
        addUser: (state, action) => {
            state.localStorage.getItem("user")
        },
        logout: (state, action) => {
            state.token = null
            localStorage.clear()
        }
    },
    extraReducers: (builder) => {
        //..............Login....................

        builder.addCase(loginUser.pending, (state, action) => {

            state.loading = true
            console.log("Pending of logging user");
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            // console.log(action.payload.user, "testing the action of login full filled");
            state.loading = false
            let user = action.payload.user
            let token = action.payload.token
            state.token = token
            state.user = user
            
            localStorage.setItem("user", user)
            localStorage.setItem("token", token)
            state.isLoggedin = true;
            console.log("ok");
            console.log("second");
           
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
            let user = action.payload.user
            let token = action.payload.token
            state.token = token
            state.user = user

            localStorage.setItem("user", user)
            localStorage.setItem("token", token)            
        })
        builder.addCase(signUpUser.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export const { addToken, addUser, logout } = authslice.actions
export default authslice.reducer
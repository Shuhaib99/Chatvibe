import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios'
import { authAPI, otpVerifyAPI, superAPI } from "../url";


const initialState = {
    user: ""

}

export const signUpUser = createAsyncThunk('signupuser', async (body) => {
    return await axios.post(`${authAPI}register`, body).then(({ data }) => {
        return data
    }).catch((err) => {
        console.log(err)
    })
})

export const otpAuth = createAsyncThunk('otpAuth', async (body) => {
    return await axios.post(`${otpVerifyAPI}`, body).then(({ data }) => {
        return data
    }).catch((err) => {
        console.log(err)
    })
})

export const loginUser = createAsyncThunk('loginuser', async (body) => {
    return await axios.post(`${authAPI}login`, body).then(({ data }) => {
        return data
    }).catch((err) => {
        console.log(err)
    })
})
export const googleUser = createAsyncThunk('googleuser', async (body) => {
    return await axios.post(`${authAPI}google`, body).then(({ data }) => {
        return data
    }).catch((err) => {
        console.log(err)
    })
})

export const getUser = createAsyncThunk('getUser', async (body) => {
    return await axios.post(`${authAPI}google`, body).then(({ data }) => {
        return data
    }).catch((err) => {
        console.log(err)
    })
})


export const bySuper = createAsyncThunk('bySuper', async (body) => {
    try {
        const { data } = await axios.post(`${superAPI}`, body)
        return data
    } catch (err) {
        console.log(err)
    }
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
        let token
        builder.addCase(loginUser.pending, (state, action) => {

            state.loading = true
            console.log("Pending of logging user");
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            // console.log(action.payload.user,"starting of full fill");
            state.loading = false
            // let user=action.payload.user._id
            // state.user=user

            if (action.payload.isUser !== false) {
                token = action.payload.token
            } else {
                token = ""
            }
            state.token = token

            // localStorage.setItem("user", user)
            localStorage.setItem("token", token)

            state.isLoggedin = true;
            // console.log(action.payload.user, "testing the action of login full filled");

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
            //console.log(action.payload.user, "testing the action of signup full filled");
            state.loading = false

            if (action.payload.isUser !== false) {
                token = action.payload.token
            } else {
                token = ""
            }
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
            // let user = action.payload.User
            if (action.payload.isUser !== false) {
                token = action.payload.token
            }else{
                token=""
            }
            // state.user = user
            state.token = token

            // localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
        })
        builder.addCase(googleUser.rejected, (state, action) => {
            state.loading = false
        })


        //.....................Admin...............................

        builder.addCase(bySuper.pending, (state, action) => {
            console.log("Pending of Spr");
        })
        builder.addCase(bySuper.fulfilled, (state, action) => {
            console.log(action, "action");
            let adlog
            if (action.payload.login_status != false) {
                adlog = action.payload.adlog
                localStorage.setItem("adlog", adlog)
            }
            

        })
        builder.addCase(bySuper.rejected, (state, action) => {

            console.log("Rejected login");
        })

    }
})

// export const currentUser = (state)=>state.auth.user
export default authslice.reducer
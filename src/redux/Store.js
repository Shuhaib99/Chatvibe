import {configureStore} from '@reduxjs/toolkit'
import authslice from './AuthSlice.js'
import PostSlice from './PostSlice'
import UserSlice from './UserSlice.js'
const store = configureStore({
    reducer:{
        auth: authslice,
        postSlice:PostSlice,
        userSlice:UserSlice

    }
})

export default store



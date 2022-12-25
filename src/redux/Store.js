import {configureStore} from '@reduxjs/toolkit'
import authslice from './AuthSlice.js'
import PostSlice from './PostSlice'
const store = configureStore({
    reducer:{
        auth: authslice,
        postSlice:PostSlice

    }
})

export default store



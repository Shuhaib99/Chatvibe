import {configureStore} from '@reduxjs/toolkit'
import authslice from './AuthSlice.js'
import PostSlice from './PostSlice'
const store = configureStore({
    reducer:{
        user: authslice,
        postSlice:PostSlice

    }
})

export default store



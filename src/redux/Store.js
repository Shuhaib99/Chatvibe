import {configureStore} from '@reduxjs/toolkit'
import authslice from './AuthSlice.js'
import ChatSlice from './ChatSlice.js'
import PostSlice from './PostSlice'
import UserSlice from './UserSlice.js'
import AdminSlice from './AdminSlice.js'
const store = configureStore({
    reducer:{
        auth: authslice,
        postSlice:PostSlice,
        userSlice:UserSlice,
        chatSlice:ChatSlice,
        adminSlice:AdminSlice
    }
})

export default store



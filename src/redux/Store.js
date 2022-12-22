import {configureStore} from '@reduxjs/toolkit'
import authslice from './AuthSlice.js'
import imageUploadSlice from './uploadSlice'
const store = configureStore({
    reducer:{
        user: authslice,
        image:imageUploadSlice

    }
})

export default store



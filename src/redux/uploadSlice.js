import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios'
import { userAPI } from "../url";

const initialState = {
    loading: false
}
const config = { headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') } }
export const uploadImage = createAsyncThunk('imagePost', async (body) => {
    return await axios.post(`${userAPI}/imagePost`, body, config).then(({ data }) => {
        return data
    })
})


const imageUploadSlice = createSlice({

    name: "upload_image",
    initialState,
    reducers: {

    },


    extraReducers: (builder) => {
        //..............Login....................

        builder.addCase(uploadImage.pending, (state, action) => {

            state.loading = true
            console.log("Pending of loading Image");
        })

        builder.addCase(uploadImage.fulfilled, (state, action) => {
            console.log("starting of full fill Image");
            state.loading = false

        })

        builder.addCase(uploadImage.rejected, (state, action) => {
            state.loading = true
            console.log("Rejected of uploaded image");
        })
    }
})

export default imageUploadSlice.reducer
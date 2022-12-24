import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios'
import { postAPI } from "../url";
const initialState = {
    loading: "Loading",
    post: []
}

export const uploadImage = createAsyncThunk('imagePost', async (body) => {
        const token = localStorage.getItem('token')
        return await axios.post(`${postAPI}imagePost`, body, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
            return data
        }).catch ((err)=>{
            console.log(err)
        })
})

export const getPosts = createAsyncThunk('getPosts', async () => {
    const token = localStorage.getItem('token')
    return await axios.get(`${postAPI}getPosts`, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch(err => {
        console.log(err)
    })
})





const PostSlice = createSlice({
    name: "upload_image",
    initialState,
    reducers: {

    },


    extraReducers: (builder) => {
        //..............Upload image....................

        builder.addCase(uploadImage.pending, (state, action) => {

            console.log("Pending of loading Image");
            //state.loading = "Pending"
        })

        builder.addCase(uploadImage.fulfilled, (state, action) => {
            console.log(" full filled Image");
            //state.loading = "Successfully added"

        })

        builder.addCase(uploadImage.rejected, (state, action) => {
            //state.loading = "Uploading failed please try again"
            console.log("Rejected of uploaded image");
        })

        //.........................Loading Posts........................

        builder.addCase(getPosts.pending, (state, action) => {

            //console.log("Pending of loading posts");
            state.loading = "Successfully added"
        })

        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.post = action.payload
            console.log("full filled posts"); 

        })

        builder.addCase(getPosts.rejected, (state, action) => {
            //state.loading = "Loading failed please try again"
            //console.log("Rejected of Loading");
        })
    }
})

export default PostSlice.reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios'
import { likeAPI, postAPI, commentAPI, deletePostAPI, savePostAPI } from "../url";
const initialState = {
    loading: "Loading",
    refresh: false,
    post: [],
    likes: []
}

export const uploadImage = createAsyncThunk('imagePost', async (body) => {
    const token = localStorage.getItem('token')
    return await axios.post(`${postAPI}imagePost`, body, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch((err) => {
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

export const likePosts = createAsyncThunk('likePosts', async (body) => {
    const token = localStorage.getItem('token')
    return await axios.post(`${likeAPI}`, body, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch(err => {
        console.log(err)
    })
})

export const commentPost = createAsyncThunk('commentPost', async (body) => {
    const token = localStorage.getItem('token')
    console.log(body, "bodycomment");
    return await axios.post(`${commentAPI}`, body, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch(err => {
        console.log(err)
    })
})
export const savePosts = createAsyncThunk('savePosts', async (body) => {
    const token = localStorage.getItem('token')
    return await axios.post(`${savePostAPI}`, body, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch(err => {
        console.log(err)
    })
})

export const deletePost = createAsyncThunk('deletePost', async (postid) => {
    const token = localStorage.getItem('token')
    // console.log(body,"bodycomment");
    return await axios.delete(`${deletePostAPI}`, { data: { postid } }, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch(err => {
        console.log(err)
    })
})






const PostSlice = createSlice({
    name: "Posts",
    initialState,
    reducers: {
        refr: (state, action) => {
            if (state.refresh === true) {
                state.refresh = false
            }
            else {
                state.refresh = true
            }
            console.log(state.refresh, "Inside of reducer");
        }
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
            // state.post = action.payload
            console.log("full filled posts");

        })

        builder.addCase(getPosts.rejected, (state, action) => {
            //state.loading = "Loading failed please try again"
            //console.log("Rejected of Loading");
        })

        //..............................likes.......................

        builder.addCase(likePosts.pending, (state, action) => {

            console.log("Pending of like");
            //state.loading = "Pending"
        })

        builder.addCase(likePosts.fulfilled, (state, action) => {
            console.log(" full filled like");
            state.likes = action.payload

        })

        builder.addCase(likePosts.rejected, (state, action) => {
            //state.loading = "Uploading failed please try again"
            console.log("Rejected of like");
        })
    }
})
export const { refr } = PostSlice.actions
export default PostSlice.reducer
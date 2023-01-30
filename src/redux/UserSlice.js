import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios'
import { loginUserAPI, postsByIdAPI, userAPI,followUserAPI, FollowingUserAPI, getSavedPostsAPI, getUsersAPI, addReportAPI, getReportAPI, deleteReportAPI, getAllUsersAPI, deleteNotificationAPI } from "../url";
import { followAPI } from "../url";
import { unfollowAPI } from "../url";
import { uploadCoverImgAPI } from "../url";


const initialState = {
    profileid:""
}

export const getUser = createAsyncThunk('getUser', async (params) => {
    const token = localStorage.getItem('token')
    return await axios.get(`${userAPI}` + params.userid.id, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch((err) => {
        console.log(err)
    })
})

export const getCurrentUser = createAsyncThunk('getCurrentUser', async () => {
    const token = localStorage.getItem('token')
    //console.log("getCurrent user");
    return await axios.get(`${loginUserAPI}`, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch((error) => {
        console.log(error)
    })
})

export const getFollowers = createAsyncThunk('getFollowers', async (params) => {
    const token = localStorage.getItem('token')
    //console.log("getCurrent user");
    return await axios.get(`${followUserAPI}`+params, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch((error) => {
        console.log(error)
    })
})

export const getUsers = createAsyncThunk('getUsers', async (params) => {
    try {

    const token = localStorage.getItem('token')
    const {data}=await axios.get(`${getUsersAPI}`+params, { headers: { 'authorization': 'Bearer ' + token } })
        return data
    }catch (err) {
        console.log(err)
    }
})

export const getSavedPosts = createAsyncThunk('getSavedPosts', async () => {
    const token = localStorage.getItem('token')
    //console.log("getCurrent user");
    return await axios.get(`${getSavedPostsAPI}`, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch((error) => {
        console.log(error)
    })
})

export const getFollowingUsers = createAsyncThunk('getFollowers', async (params) => {
    const token = localStorage.getItem('token')
    //console.log("getCurrent user");
    return await axios.get(`${FollowingUserAPI}`+params, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch((error) => {
        console.log(error)
    })
})


export const follow = createAsyncThunk('follow', async (body) => {
    console.log(body, "follw");
    const token = localStorage.getItem('token')
    return await axios.post(`${followAPI}`, body, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch((err) => {
        console.log(err)
    })
})

export const unfollow = createAsyncThunk('unfollow', async (body) => {
    const token = localStorage.getItem('token')
    return await axios.post(`${unfollowAPI}`, body, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch((err) => {
        console.log(err)
    })
})

export const getPostsById = createAsyncThunk('getPostsById', async (params) => {
    const token = localStorage.getItem('token')
    //console.log(params, "getPostsById");
    return await axios.get(`${postsByIdAPI}` + params, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data

    }).catch(err => {
        console.log(err)
    })
})

export const uploadProfileImage = createAsyncThunk('imagePost', async (body) => {
    const token = localStorage.getItem('token')
    return await axios.post(`${uploadCoverImgAPI}`, body, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch((err) => {
        console.log(err)
    })
})


export const addReport = createAsyncThunk('addReport', async (body) => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.post(`${addReportAPI}`, body, { headers: { 'authorization': 'Bearer ' + token } })
        return data
    } catch (err) {
        console.log(err)
    } 
})

export const clearNotification = createAsyncThunk('getuser',async()=>{
    console.log("clearnotification is called");
    const token =localStorage.getItem('token')
    return await axios.delete(`${deleteNotificationAPI}`, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch(err => {
        console.log(err)
    })
})

const UserSlice = createSlice({

    name: "users",
    initialState,
    reducers: {
        addProfileId:(state,action)=>{
            state.profileid=action.payload
            //console.log(state.profileid,"Inside of profile id reducer");
        }
    },
    extraReducers: (builder) => {
        //..............getUser....................

        builder.addCase(getUser.pending, (state, action) => {
            console.log("Pending of getuser");
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            // console.log(action.payload,"full fill getUser");
            // state.user = action.payload
        })
        builder.addCase(getUser.rejected, (state, action) => {

            console.log("Rejected of getUser");
        })
    }
})
export const {addProfileId}=UserSlice.actions
export default UserSlice.reducer
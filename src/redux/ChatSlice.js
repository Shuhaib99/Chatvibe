import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios'
import { addMessageAPI, getMessagesAPI, userChatsAPI } from "../url";

const initialState = {

}

export const userChats = createAsyncThunk('userChats', async () => {
    const token = localStorage.getItem('token')
    return await axios.get(`${userChatsAPI}`, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch((err) => {
        console.log(err)
    })
})
export const getMessages = createAsyncThunk('getMessages', async (params) => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.get(`${getMessagesAPI}` + params, { headers: { 'authorization': 'Bearer ' + token } })
        return data
    } catch (err) {
        console.log(err)
    }
    // .then(({ data }) => {
    //     return data
    // }).catch((err) => {
    //     console.log(err)
    // })
})
export const addMessage = createAsyncThunk('addMessage', async (body) => {
    const token = localStorage.getItem('token')
    return await axios.post(`${addMessageAPI}`, body, { headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
        return data
    }).catch((err) => {
        console.log(err)
    })
})

const ChatSlice = createSlice({

    name: "chat",
    initialState,
    reducers: {

    }
})

export default ChatSlice.reducer
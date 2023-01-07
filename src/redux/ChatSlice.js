import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios'
import { userChatsAPI } from "../url";

const initialState = {
    
}

export const userChats = createAsyncThunk('userChats', async () => {
    const token = localStorage.getItem('token')
    return await axios.get(`${userChatsAPI}`,{ headers: { 'authorization': 'Bearer ' + token } }).then(({ data }) => {
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
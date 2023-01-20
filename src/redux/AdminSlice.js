
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios'
import { deleteReportAPI, getAllUsersAPI, getReportAPI,actionOnUserAPI } from "../url";


const initialState = {
    profileid:""
}

export const getReport = createAsyncThunk('agetReport', async () => {
    try {
        const token = localStorage.getItem('adlog')
        const { data } = await axios.get(`${getReportAPI}`, { headers: { 'authorization': 'Bearer ' + token } })
        return data
    } catch (err) {
        console.log(err)
    } 
})

export const deleteReport = createAsyncThunk('deleteReport', async (reportid) => {
    try {
        const token = localStorage.getItem('adlog')
        const { data } = await axios.delete(`${deleteReportAPI}`,  { data: { reportid } }, { headers: { 'authorization': 'Bearer ' + token } })
        return data
    } catch (err) {
        console.log(err)
    } 
})

export const getAllUsers = createAsyncThunk('getAllUsers', async () => {
    try {
        const token = localStorage.getItem('adlog')
        const { data } = await axios.get(`${getAllUsersAPI}`, { headers: { 'authorization': 'Bearer ' + token } })
        return data
    } catch (err) {
        console.log(err)
    } 
})

export const orUnBlockUsers = createAsyncThunk('getAllUsers', async (body) => {
    try {
        const token = localStorage.getItem('adlog')
        const { data } = await axios.get(`${actionOnUserAPI}`,body, { headers: { 'authorization': 'Bearer ' + token } })
        return data
    } catch (err) {
        console.log(err) 
    } 
})


const AdmnSlice = createSlice({

    name: "admin",
    initialState,
    reducers: {

    }
})

export default AdmnSlice.reducer
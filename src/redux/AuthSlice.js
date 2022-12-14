import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../axios'
// import { auth } from "../url";

const initialState={
    msg:"",
    user:"",
    loading:"",
    error:""
}

export const signUpUser=createAsyncThunk('signupuser',async(body)=>{
    // console.log("Sec.........",body);
    return await axios.post('register',body).then((res)=>{
        return console.log(res.data)
    })
})

export const authslice = createSlice({
    name:"user",
    initialState,
    extraReducers:{
       
        //...........signUp...............
        [signUpUser.pending]:(state,action)=>{
            state.loading =true
        },
        [signUpUser.fulfilled]:(state,{payload:error,msg})=>{
            state.loading =false
            if(error){
                state.error =error
            }else{
                state.msg=msg
            }
        },
        [signUpUser.rejected]:(state,action)=>{
            state.loading =false
        },
    }
})
 
// export const {addToken, addUser, logout}=authslice.actions
// export default authslice.reducer
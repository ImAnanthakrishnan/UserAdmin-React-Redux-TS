import { PayloadAction,createSlice } from "@reduxjs/toolkit";
import {Admin} from "../components/AdminLogin";




type InitialState = {
    currentAdmin : Admin | null;
    loading : boolean;
    error:string | undefined;
}

const initialState : InitialState = {
    currentAdmin : null,
    loading:false,
    error:undefined
}

const AdminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        signInStart : (state) => {
            state.loading = true
        },
        signInSuccess : (state,action:PayloadAction<Admin>) =>{
            state.currentAdmin = action.payload;
            state.loading = false;
            state.error = undefined;
        },
        signInFailure: (state,action:PayloadAction<string | undefined>)=>{
            state.loading = false;
            state.error = action.payload
        },
        signOut : (state) => {
            state.currentAdmin = null;
            state.loading = false;
            state.error = undefined;
        }
    },
 
})

export const {signInStart,signInSuccess,signInFailure,signOut } = AdminSlice.actions;

export default AdminSlice.reducer;
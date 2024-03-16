import { PayloadAction, createSlice } from "@reduxjs/toolkit";
//import { User } from "../components/Signin";

type User = {
    id:number |string;
    username:string;
    email:string;
    image:string;
}

type InitialState = {
    currentUser: User | null;
    loading:boolean;
    error:string | undefined;
}

const initialState:InitialState = {
    currentUser : null,
    loading:false,
    error:undefined
}

const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart : (state) => {
            state.loading = true
        },
        signInSuccess : (state,action:PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = undefined;
        },
        signInFailure: (state,action:PayloadAction<string | undefined>)=>{
            state.loading = false;
            state.error = action.payload
        },
        updateUserStart:(state)=>{
            state.loading = true;

        },
        updateUserSuccess:(state,action:PayloadAction<User>)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error = undefined;

        },
        updateUserFailure:(state,action:PayloadAction<string | undefined>)=>{
            state.loading=false;
            state.error=action.payload
        },
        signOut : (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = undefined;
        }
    }
});

export const {signInStart,signInSuccess,signInFailure ,
updateUserFailure,updateUserStart,updateUserSuccess,signOut} = UserSlice.actions;

export default UserSlice.reducer;
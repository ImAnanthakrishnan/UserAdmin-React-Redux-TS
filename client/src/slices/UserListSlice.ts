import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/AdminAxios";

/*export const fetchUsers = createAsyncThunk("admin/fetchUser",async() => {
  const response = await axios.get("/getUser");
  console.log('re-',response.data);
  return response.data;
})*/

type User = {
    id:string | number  
    username:string;
    email: string;
}

// Define the type for user list state
type UserListState = {
  userList: User[];
  loading:boolean;
  error:string | undefined;
};

// Define the initial state for user list
const initialState: UserListState = {
  loading:true,
  error:'',
  userList: [],
};

// Create the user list slice
const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    fetchUserListSuccess: (state, action: PayloadAction<User[]>) => {
      state.userList = action.payload;
    },
   /* resetUserList: (state) => {
        // Reset the state to its initial value
        state.userList = initialState.userList;
      },
      removeUserSuccess(state, action: PayloadAction<number | string>) {
        state.userList = state.userList.filter(user => user.id !== action.payload);
      },
      updateUserSuccess: (state, action: PayloadAction<User>) => {
        const updatedUserIndex = state.userList.findIndex(user => user.id === action.payload.id);
        if (updatedUserIndex !== -1) {
            state.userList[updatedUserIndex] = action.payload;
        }
    }*/
    // You can add other actions like adding a new user, updating a user, deleting a user, etc.
  }, /*  extraReducers:builder=>{
    builder.addCase(fetchUsers.pending,state=>{
        state.loading=true;
    });
    builder.addCase(fetchUsers.fulfilled,(state,action: PayloadAction<User[]>)=>{
        state.loading=false;
        state.userList=action.payload;
        state.error=''
    })
    builder.addCase(fetchUsers.rejected,(state,action)=>{
        state.loading=false;
        state.userList=[];
        state.error=action.error.message
    })
}*/
});

// Export actions
export const { fetchUserListSuccess,/*resetUserList,removeUserSuccess,updateUserSuccess*/ } = userListSlice.actions;

// Export the reducer
export default userListSlice.reducer;

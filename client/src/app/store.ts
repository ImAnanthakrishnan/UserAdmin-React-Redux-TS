import { combineReducers, configureStore,Reducer } from "@reduxjs/toolkit";
import UserReducer from '../slices/UserSlice';
import AdminReducer from '../slices/AdminSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserListSlice from "../slices/UserListSlice";


const userPersistConfig = {
    key: 'user',
    version: 1,
    storage,
    whitelist: ['currentUser'] 
};


const adminPersistConfig = {
    key: 'admin',
    version: 1,
    storage,
    whitelist: ['currentAdmin']
};


const persistedUserReducer = persistReducer(userPersistConfig, UserReducer);
const persistedAdminReducer = persistReducer(adminPersistConfig, AdminReducer);


const rootReducer = combineReducers({
    user: persistedUserReducer,
    admin: persistedAdminReducer,
    userList: UserListSlice
});


const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => 
       getDefaultMiddleware({
        serializableCheck:false
       })
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

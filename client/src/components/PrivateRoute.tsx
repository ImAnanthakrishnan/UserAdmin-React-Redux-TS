import React from 'react'
import { useAppSelector } from '../app/hooks'
import { Navigate, Outlet } from 'react-router-dom';
const PrivateRoute = () => {
    const {currentUser} = useAppSelector(state=>state.user);
  return currentUser ? <Outlet/> : <Navigate to='/login'/>
}

export default PrivateRoute;

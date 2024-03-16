import React from 'react'
import { useAppSelector } from '../app/hooks'
import { Navigate, Outlet } from 'react-router-dom';
const PrivateAdminRoute = () => {
    const {currentAdmin} = useAppSelector(state=>state.admin);
  return currentAdmin ? <Outlet/> : <Navigate to='/admin'/>
}

export default PrivateAdminRoute;

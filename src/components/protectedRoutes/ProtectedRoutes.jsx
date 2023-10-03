import axios from 'axios';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user) {
     axios.defaults.headers.common['x-access-token'] = user.accessToken; 
    }

    return( user ? <Outlet/> : <Navigate to="/login" /> )
};

export default ProtectedRoutes;

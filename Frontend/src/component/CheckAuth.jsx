import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const CheckAuth = ({ isAuthenticated }) => {

   const location = useLocation().pathname;

   if (isAuthenticated) {
      if (location.includes("login"))
         return <Navigate to="/dashboard" />
   }

   if (!isAuthenticated) {
      if (!(location.includes("login") || location === "/" || location.includes("signup") || location.includes("aboutus")))
         return <Navigate to="/" />
   }

   return <Outlet />
}

export default CheckAuth

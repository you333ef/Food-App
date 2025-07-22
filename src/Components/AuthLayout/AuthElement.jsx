import React from 'react'
import { Outlet } from 'react-router-dom'
import Auth from "./auth.module.css";
const AuthElement = () => {
  return (
    <div className={Auth.auth}>
  
      <Outlet/>
    </div>
  )
}

export default AuthElement
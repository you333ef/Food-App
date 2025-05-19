import React from 'react'
import { Outlet } from 'react-router-dom'
import Auth from '/Food App/src/Components/AuthLayout/auth.module.css'

const AuthElement = () => {
  return (
    <div className={Auth.auth}>
  
      <Outlet/>
    </div>
  )
}

export default AuthElement
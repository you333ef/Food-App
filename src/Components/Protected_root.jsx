import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Protected_root({children,data}){
   
  
  if(localStorage.getItem('token') ||data){
   return children

  }else{
return   <Navigate to="/Login" replace={true} />


  }
}

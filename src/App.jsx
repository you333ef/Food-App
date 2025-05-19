import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthElement from './Components/AuthLayout/AuthElement'
import Login from './Components/AuthLayout/Login'
import Register from './Components/AuthLayout/Register'
import Reset from './Components/AuthLayout/Reset'
import Forget from './Components/AuthLayout/Forget'
import Verify from './Components/AuthLayout/Verify'
import MasterElement from './Components/MasterLayout/MasterElement'
import Home from './Components/MasterLayout/Home'
import Users from './Components/MasterLayout/Users'
import Resipe from './Components/MasterLayout/Resipe'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
 
  let routes=createBrowserRouter([
    {
      path:'/',
       element:<AuthElement/>,
       children:[
        {index:true,element:<Login/>},
        {path:'Login',element:<Login/>},
        {path:'Register',element:<Register/>},
        {path:'Reset',element:<Reset/>},
        {path:'Forget',element:<Forget/>},
        {path:'Veryfi',element:<Verify/>},
        
       ]
  }
  ,{

      path:'/MasterElement',
      element:<MasterElement/>,
      children:[
       {index:true,element:<Home/>},
       {path:'Home',element:<Home/>},
       {path:'Users',element:<Users/>},
       {path:'Resipe',element:<Resipe/>},
      
       
      ]
    }])

  return (
    <div>
      <RouterProvider router={routes}/>
      <ToastContainer />

    </div>
  )
}

export default App
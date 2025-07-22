import axios from "axios";
import { createContext, useEffect, useState } from "react";


 export let  AuthContext =createContext()
const AuthContextProvider=({ children })=>{

let [CurrentUser,setCurrentuser]=useState()
let  funCurrentUser=async()=>{
try {
    let  res= await axios.get('https://upskilling-egypt.com:3006/api/v1/Users/currentUser',
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    )
    setCurrentuser(res.data.group.name)
  console.log(res.data.group.name)
    
} catch (error) {
console.log(error)
    
}
}

useEffect(()=>{
    funCurrentUser()
})





    return(
        <AuthContext.Provider value={{CurrentUser,  funCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )

 }
 export default AuthContextProvider;

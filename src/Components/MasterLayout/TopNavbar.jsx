import React, { useState } from 'react'
import style from './topnavbar.module.css'
import { LuBellDot } from "react-icons/lu";
import image from '../../assets/Ellipse 234.svg'
import { FiSearch, FiChevronDown } from 'react-icons/fi'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TopNavbar = () => {
  let location=useLocation()
  // start tag Things 
  let [tag,setTag]=useState()
  let TagCreage= async()=>{
    try {
      let  res= await axios.get('https://upskilling-egypt.com:3006/api/v1/tag')
    } catch (error) {
      
    }
  }


   // End tag Things 

  return (
    <div className={style.TopNavbar_Container}>
   <div className={style.Left}>
   
    {location.pathname !== '/MasterElement/Home' &&
 location.pathname !== '/MasterElement' &&
 location.pathname !== '/MasterElement/Fav' &&
 location.pathname !== '/MasterElement/Resipe' &&
 location.pathname !== '/MasterElement/Add_Update_Resipe' &&
 !location.pathname.startsWith('/MasterElement/Add_Update_Resipe/update/') && (
    <div className="input-group">
       
        </div>
)}

    
      </div>
      <div className={style.right}>
        <img src={image} alt="avatar" />
        <h5>Upskilling</h5>

        {/* جرس مع dot */}
        <div className="iconWrapper">
          <LuBellDot />
          <span className="dot"></span>
        </div>

        {/* السهم */}
        <div className="iconWrapper">
          <FiChevronDown />
        </div>
      </div>
    </div>
  )
}

export default TopNavbar

import React from 'react'
import iMg1 from '../../assets/eating vegan food-rafiki.svg'
import iMg2 from '../../assets/Group 48102127.svg'
import './header.css'
import { useLocation } from 'react-router-dom'
const Header = () => {
  let loaction=useLocation()
  return (
    <div>
   <section className="hero-section  mt-4">
      <div className="hero-container">
        <div className="hero-content">

       {
  location.pathname === '/MasterElement/Home' ? (
    <h1 className="hero-title">Welcome <span>Upskilling!</span></h1>
  ) : location.pathname === '/MasterElement/CategoriseList' ? (
    <h1 className="hero-creation">Categories <span>Item!</span></h1>
  )
  : location.pathname === '/MasterElement/Resipe'? (
    <h1 className="hero-creation">Recipes <span>Item!</span></h1>
  )
   : location.pathname === '/MasterElement/Fav'? (
    <h1 className="hero-creation">Favorite<span> Item!</span></h1>
  )
  : location.pathname === '/MasterElement/Users' ? (
    <h1 className="hero-creation">Users <span>List</span></h1>
  ) : null
}


         {
  location.pathname === '/MasterElement/Home' ? (
     <p className="hero-description">
            This is a welcoming section for the entry of the application,
            you can now see the options
          </p>
  ) : location.pathname === '/MasterElement/CategoriseList' ? (
      <p className="hero-description-creation">
           You can now add your items that any user can order it from the Application and you can edit
          </p>
   

  )
  : location.pathname === '/MasterElement/Fav' ? (
      <p className="hero-description-creation">
           You can now add your items that any user can order it from the Application and you can edit
          </p>
   
  )
  : location.pathname === '/MasterElement/Resipe' ? (
      <p className="hero-description-creation">
           You can now add your items that any user can order it from the Application and you can edit
          </p>
   
  )
  : location.pathname === '/MasterElement/Users' ? (
    <p className="hero-description-creation">
           You can now add your items that any user can order it from the Application and you can edit
          </p>
  ) : null
}
 
        
        </div>
        <div className="hero-image">
        {location.pathname==='/MasterElement/Home'?
        (
            <img 
            src={iMg1}
            alt="Character illustration" 
            className="character-img"
          />
        ):(
           <img 
            src={iMg2}
            alt="Character illustration" 
            className="character-img"
          />
        )}
        </div>
      </div>
    </section>




    </div>
  )
}

export default Header
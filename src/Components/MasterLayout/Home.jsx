import React, { useContext } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./home.css";  
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navi=useNavigate()
  let torecipe=()=>{
navi('/MasterElement/Resipe')
  }
 
  return (
    <div className="w-100 custom-gradient py-2 px-2 mt-3">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        
      
        <div className="flex-fill text-center text-md-start">
          <h2 className="Fill">
            Fill the Recipes!
          </h2>
          <p className="text-secondary small custom-max-w-md mx-auto mx-md-0">
            you can now fill the meals easily using the table and form ..
            <br />
            click here and fill it with the table!
          </p>
        </div>
        
       
        <div>
          <button className="btn bootn" onClick={torecipe}>
            Fill Recipes
            <FaLongArrowAltRight size={18} className="ms-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

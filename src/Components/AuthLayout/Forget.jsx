
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Logo from '../../images/logo.svg';
import '../AuthLayout/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Forget = () => {
  const navigate = useNavigate();
  let { register, handleSubmit, formState: { errors } } = useForm();
  let onsubmit=async (data)=>{
    console.log(data)
    try {
      
      let res=await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',data)
   if(res.status===200 || res.status===201){
    toast.success('Verification code sent! check your email.', {
  autoClose: 3000,      
  hideProgressBar: true, 
  onClose: () => {
    navigate('/Reset');
  }
});
   }
    }catch (error) {
  console.error('Error during verification:', error);
  const apiMessage =
    error.response?.data?.message ||
    'We couldn’t find that username. Please log in again.';
  toast.error(apiMessage, {
    autoClose: 3000,
    hideProgressBar: true,
  });
}
  }

  return (
   <div className="login-container">
  <div className="login-card">
    <div className="logo-container d-flex justify-content-center align-items-center m-auto">
      <img src={Logo} alt="Food Recipe Logo" />
    </div>

    <div className="login-header">
      <h2 className="login-title">Forgot Your Password?</h2>
      <p className="login-subtitle">
       No worries! Please enter your email and we will send a password reset link 
      </p>
    </div>

    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="row">
        <div className="col-md-12 d-flex flex-column">
          <div className="input-group mb-1 ">
            <div className="input-icon">
              <Mail className="MailIcon" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Enter your E-mail"
              className="input-field"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
            />
          
           
          </div>
            {errors.email && <p className="error-message">{errors.email.message}</p>}
         

     
        </div>
        
      </div>

      <div className="row mt-2">
        <div className="col d-flex justify-content-between">
          <p className="register-link" style={{ cursor: 'pointer' }}>Register Now?</p>
          <p className="forgot-password">Forgot Password?</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <button type="submit" className="login-button w-100">
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
  )
}

export default Forget
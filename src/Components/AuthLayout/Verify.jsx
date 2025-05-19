import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Logo from '../../images/logo.svg';
import '../AuthLayout/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { data, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


const Verify = () => {
let {register,handleSubmit,formState:{errors}}=useForm()
const navigate = useNavigate();  
let onsubmit=async (data)=>{
try {
  let res=await axios.put('https://upskilling-egypt.com:3006/api/v1/Users/verify',data)
if(res.status===200 || res.status===201){
  toast.success("Success🚀");
  navigate('/Login');
}else{
   toast.error('failed verification');

}

} catch (error) {
  console.error('Error during verification:', error);
  if (
    error.response &&
    error.response.status === 409 &&
    error.response.data.message?.includes('already exists')
  ) {
    toast.error('Username or email already exists');
  } else {
    toast.error('verification failed. Please try again.');
  }
  
}
  
}




  return (
   <div className="login-container">
  <div className="login-card">
    <div className="logo-container d-flex justify-content-center align-items-center m-auto">
      <img src={Logo} alt="Food Recipe Logo" />
    </div>

    <div className="login-header">
      <h2 className="login-title"> Verify Account  
</h2>
      <p className="login-subtitle">
      Please Enter Your Otp  or Check Your Inbox
      </p>
    </div>

    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="row">
        <div className="col-md-12 d-flex flex-column">
          <div className="input-group mb-1">
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
            {errors.email && <p className="error-message ">{errors.email.message}</p>}

          <div className="input-group mb-1">
            <div className="input-icon">
              <Lock className="LockIcon" />
            </div>
            <input
              type="text"
              name="password"
              placeholder="OTP"
              className="input-field"
              {...register('code',{required:'Code is required',
               pattern: {
  value: /^\d{4}$/,
  message: 'Code must be 4 digits',
},

              })}
            />
          </div>
          {errors.code && <p className="error-message ">{errors.code.message}</p>}
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
          <button type="submit"   className="login-button w-100">
            send
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
  )
}

export default Verify
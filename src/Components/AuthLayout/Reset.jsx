
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Logo from '../../images/logo.svg';
import '../AuthLayout/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { CgMail } from "react-icons/cg";

import { useNavigate } from 'react-router-dom';

const Reset = () => {
  const navigate = useNavigate();
  let { register, handleSubmit,watch, formState: { errors } } = useForm();
  let onsubmit=async (data)=>{
    console.log(data)
    try {
      let res=await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset',data)
      if(res.status===200 || res.status===201){
        toast.success('Reset successful. Log in now.', {
          autoClose: 3000,
          hideProgressBar: true,
          onClose: () => {
            navigate('/Login');
          }
        });
      }
    } catch (error) {
     
      const apiMessage =
        'The password or OTP is incorrect.';
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
      <h2 className="login-title"> Reset  Password</h2>
      <p className="login-subtitle">
     Please Enter Your Otp  or Check Your Inbox
      </p>
    </div>

    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="row">
        <div className="col-md-12 d-flex flex-column">
          <div className="input-group mb-2">
            <div className="input-icon">
              
              <CgMail className="MailIcon"/>
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
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}

     
        </div>
         <div className="col-md-12 d-flex flex-column">
          <div className="input-group mb-1">
            <div className="input-icon">
            
              <MdOutlinePhoneIphone className="MailIcon"/>
            </div>
            <input
              type="text"
              name="email"
              placeholder="OTP"
              className="input-field"
              {...register('seed', {
                required: 'Code is required',
                pattern: {
                  value: /^[0-9]{4}$/,
                  message: 'Invalid OTP format',
                },
              })}

            />
          </div>
          {errors.seed && (
            <p className="error-message">{errors.seed.message}</p>
          )}

     
        </div>
         <div className="col-md-12 d-flex flex-column">
          <div className="input-group mb-1">
            <div className="input-icon">
          
              <IoLockClosed className="MailIcon"/>
            </div>
            <input
              type="text"
              name="email"
              placeholder=" New Password"
              className="input-field"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}

     
        </div>
         <div className="col-md-12 d-flex flex-column">
          <div className="input-group mb-1">
            <div className="input-icon">
            
              <IoLockClosed className="MailIcon"/>
            </div>
            <input
              type="text"
              name="email"
              placeholder="Confirm New Password"
              className="input-field"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) => {
                  if (value !== watch('password')) {
                    return 'Passwords do not match';
                  }
                },
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}

     
        </div>
      </div>

      <div className="row mt-1">
        <div className="col d-flex justify-content-between">
          <p className="register-link" style={{ cursor: 'pointer' }}>Register Now?</p>
          <p className="forgot-password">Forgot Password?</p>
        </div>
        
      </div>

      <div className="row mt-3">
        <div className="col">
          <button type="submit" className="login-button w-100">
           Reset Password
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
  )
}

export default Reset
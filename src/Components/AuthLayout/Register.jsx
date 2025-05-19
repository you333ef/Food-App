import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Logo from '../../images/logo.svg';
import '../AuthLayout/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUserCircle  } from "react-icons/hi";
import { HiMiniGlobeAsiaAustralia } from "react-icons/hi2";
import { FaLock } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";



const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

 const onSubmit = async (data) => {
  console.log(data);
  try {


    const res = await axios.post(
      'https://upskilling-egypt.com:3006/api/v1/Users/Register',
      data
    );

    if (res.status === 200 || res.status === 201) {
      toast.success("Account created successfully 🚀");
      navigate('/Veryfi');
    } else {
      toast.error(' failed Registration');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    if (
      error.response &&
      error.response.status === 409 &&
      error.response.data.message?.includes('already exists')
    ) {
      toast.error('Username or email already exists');
    } else {
      toast.error('Registration failed. Please try again.');
    }
  }
};
  const password = watch('password');
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container d-flex justify-content-center align-items-center m-auto">
          <img src={Logo} alt="Food Recipe Logo" />
        </div>

        <div className="login-header">
          <h2 className="login-title">Register</h2>
          <p className="login-subtitle">
            Welcome Back! Please enter your details
          </p>
        </div>

        <form className='m-auto d-block justify-content-center align-items-center' onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <div className="input-group">
                <div className="input-icon">
                  <HiOutlineUserCircle   className="MailIcon"/>

                </div>
                <input
                  type="text"
                  name="userName"
                  placeholder="UserName"
                  className="input-field"
             // ...existing code...
{...register('userName', {
  required: 'Username is required',
  minLength: {
    value: 2,
    message: 'Username must be at least 2 characters',
  },
  maxLength: {
    value: 8,
    message: 'Username must not exceed 8 characters',
  },
  pattern: {
    value: /^[A-Za-z]+[A-Za-z0-9]*[0-9]$/,
    message: 'Username must start with letters, end with numbers, and have no spaces.',
  },
})}

                />
              </div>
              {errors.userName && (
                <p className="error-message">{errors.userName.message}</p>
              )}

              <div className="input-group ">
                <div className="input-icon">
                
                  <HiMiniGlobeAsiaAustralia className="LockIcon" />
                </div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="input-field"
                  {...register('country', { required: 'Country is required' })}
                />
              </div>
              {errors.country && (
                <p className="error-message">{errors.country.message}</p>
              )}

              <div className="input-group">
                <div className="input-icon">
                
                 <FaLock className="LockIcon"/>

                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className="input-field"
                {...register('password', {
  required: 'Password is required',
  minLength: {
    value: 6,
    message: 'Password must be at least 6 characters',
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/,
    message: 'Password must have uppercase, lowercase, number, special char.',
  },
  validate: value =>
    value.trim() === value || 'No spaces at the start or end.',
})}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff className="EyeOff" /> : <Eye className="EyeOff" />}
                </button>
              </div>
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </div>

            <div className="col-md-6">
              <div className="input-group ">
                <div className="input-icon">
                
                  <MdMarkEmailUnread className="MailIcon"/>
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

              <div className="input-group">
                <div className="input-icon">
                
                  <MdOutlinePhoneIphone className="MailIcon"/>
                  
                  
                </div>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="PhoneNumber"
                  className="input-field"
                  {...register('phoneNumber', {
                    required: 'Phone number is required',
                  })}
                />
              </div>
              {errors.phoneNumber && (
                <p className="error-message">{errors.phoneNumber.message}</p>
              )}

              <div className="input-group ">
                <div className="input-icon">
                
                    <FaLock className="LockIcon"/>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="input-field"
            {...register('confirmPassword', {
  required: 'Please confirm your password',
  validate: (value) => {
    if (value.trim() !== value) {
      return 'No spaces at the start or end.';
    }
    if (value !== password) {
      return 'Passwords do not match';
    }
    return true;
  },
})}
                />
              </div>
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col d-flex justify-content-between">
              <p className="register-link">Register Now?</p>
              <p className="forgot-password">Forgot Password?</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <button type="submit" className="login-button w-100">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Logo from '../../images/logo.svg';
import '../AuthLayout/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
        'https://upskilling-egypt.com:3006/api/v1/Users/Login',
        data
      );
      if (res.status === 200 ) {
        toast.success("Login successful! 🎉");
       localStorage.setItem('token',res.data.token)
        
        navigate('/MasterElement/Home');
      } else {
        toast.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration failed. Please try again.');
    }
  };
  let To_Register=()=>{
    navigate('/Register')
  }
  let To_Forget=()=>{
    navigate('/Forget')
  }

  // to compare passwords
  const password = watch('password');

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container d-flex justify-content-center align-items-center m-auto">
          <img src={Logo} alt="Food Recipe Logo" />
        </div>

        <div className="login-header">
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">
            Welcome Back! Please enter your details
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-12 d-flex  flex-column  ">
       

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
                              {errors.password && <p className="error-message">{errors.password.message}</p>}

            </div>

     
          </div>

          <div className="row mt-2">
            <div className="col d-flex justify-content-between">
              <p className="register-link  " style={{cursor:'pointer'}} onClick={To_Register}>Register Now?</p>
              <p className="forgot-password" onClick={To_Forget}>Forgot Password?</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <button type="submit" className="login-button w-100">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
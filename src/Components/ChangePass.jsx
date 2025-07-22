import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import Logo from '../images/logo.svg';
import '../Components/AuthLayout/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ChangePass = () => {
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
  
  const token = localStorage.getItem('token');
  
  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }
    try {
      const res = await axios.put(
        'https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword',
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          confirmNewPassword: data.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        } // القوس ده كان ناقص
      );
      if (res.status === 200) {
        toast.success('Password changed successfully! 🎉');
        navigate('/MasterElement/')
      } else {
        toast.error('Failed to change password');
      }
    } catch (error) {
      console.error('Error during password change:', error);
      toast.error('Failed to change password. Please try again.');
    }
  };

  const newPassword = watch('newPassword');

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container d-flex justify-content-center align-items-center m-auto">
          <img src={Logo} alt="Food Recipe Logo" />
        </div>

        <div className="login-header">
          <h2 className="login-title">Change Password</h2>
          <p className="login-subtitle">Please enter your old and new passwords</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-12 d-flex flex-column">
              {/* Old Password */}
              <div className="input-group mb-1">
                <div className="input-icon">
                  <Lock className="LockIcon" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="oldPassword"
                  placeholder="Old Password"
                  className="input-field"
                  {...register('oldPassword', {
                    required: 'Old password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
              </div>
              {errors.oldPassword && <p className="error-message">{errors.oldPassword.message}</p>}

              {/* New Password */}
              <div className="input-group mb-1">
                <div className="input-icon">
                  <Lock className="LockIcon" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="newPassword"
                  placeholder="New Password"
                  className="input-field"
                  {...register('newPassword', {
                    required: 'New password is required',
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
              {errors.newPassword && <p className="error-message">{errors.newPassword.message}</p>}

              {/* Confirm New Password */}
              <div className="input-group mb-1">
                <div className="input-icon">
                  <Lock className="LockIcon" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                  className="input-field"
                  {...register('confirmNewPassword', {
                    required: 'Please confirm your new password',
                    validate: (value) =>
                      value === newPassword || 'Passwords do not match',
                  })}
                />
              </div>
              {errors.confirmNewPassword && (
                <p className="error-message">{errors.confirmNewPassword.message}</p>
              )}
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <button type="submit" className="login-button w-100">
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePass;
import React, { useContext } from 'react';
import { IoHome } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi2';
import { FiGrid } from 'react-icons/fi';
import { LuCalendarSync } from 'react-icons/lu';
import { GoHeartFill } from "react-icons/go";
import { FaUnlockAlt } from 'react-icons/fa';
import { HiLogout } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../ConteXt';
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import './sidepar.css';
import Logo from '../../assets/Logo.svg';

const Sidepar = ({ open, onToggle, isSmallScreen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { CurrentUser } = useContext(AuthContext);
let LogOut=()=>{
 localStorage.removeItem('token');
 navigate('/Login')

  
}
  const menuItems = [
    { icon: IoHome, label: 'Home', path: '/MasterElement/Home' },
    ...(CurrentUser === 'SuperAdmin' ? [
      { icon: HiOutlineUsers, label: 'Users', path: '/MasterElement/Users' }
    ] : []),
    { icon: FiGrid, label: 'Recipes', path: '/MasterElement/Resipe' },
    ...(CurrentUser !== 'SuperAdmin' ? [
      { icon: GoHeartFill, label: 'Favourite', path: '/MasterElement/Fav' }
    ] : []),
    ...(CurrentUser === 'SuperAdmin' ? [
      { icon: LuCalendarSync, label: 'Categories', path: '/MasterElement/CategoriseList' }
    ] : []),
    { icon: FaUnlockAlt, label: 'Change', path: '/change-password' }
  ];

  const isActive = (path) => location.pathname === path;

  if (isSmallScreen && !open) {
    return null;
  }

  const sidebarClass = isSmallScreen
    ? 'sidebar-container sidebar-mobile'
    : `sidebar-container sidebar-desktop ${open ? 'sidebar-open' : 'sidebar-collapsed'}`;

  return (
    
    <div className={sidebarClass}>
      <div className="sidebar-header">
       
        <img src={Logo} alt="Logo"onClick={onToggle} />
       
      </div>

      <div className="sidebar-menu">
        <nav className="menu-nav">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <div className="menu-icon">
                  <Icon size={20} />
                </div>
                {(open || !isSmallScreen) && (
                  <span className="menu-label">{item.label}</span>
                )}
                {isActive(item.path) && (
                  <div className="active-indicator" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <button
         onClick={LogOut}
          className="menu-item logout-btn"
         
        >
          <div className="menu-icon">
            <HiLogout size={20} />
          </div>
          {(open || !isSmallScreen) && (
            <span className="menu-label">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidepar;

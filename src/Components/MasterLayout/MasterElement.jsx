import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './masterElement.css';

import { TiThMenu } from "react-icons/ti";

import Top_Navbar from '../MasterLayout/TopNavbar';
import Sidepar from './Sidepar';
import Header from './Header';
const MasterElement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerWidth < 990;
      setIsSmallScreen(isSmall);
      if (isSmall) setSidebarOpen(false);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="layout-container">
      {isSmallScreen && (
        <button onClick={toggleSidebar} className="sidebar-toggle-btn">
        <TiThMenu/>
        </button>
      )}
      {isSmallScreen && sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidepar open={sidebarOpen} onToggle={toggleSidebar} isSmallScreen={isSmallScreen} />

      <div className={`main-content ${!isSmallScreen && sidebarOpen ? 'with-sidebar' : ''}`}>
       
        <header className="topnavbar">
          <Top_Navbar onToggleSidebar={toggleSidebar} />
        </header>

       
        <div className="page-content">
         
        <Header
 
/>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterElement;

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SalesStaffSidebar from '../staff/SalesStaffSidebar';
import SalesStaffTopNavbar from '../staff/SalesStaffTopNavbar';
import './SalesStaffLayout.css';

const SalesStaffLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`staff-layout ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <SalesStaffSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="staff-main-area">
        <SalesStaffTopNavbar />
        <div className="staff-content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SalesStaffLayout;

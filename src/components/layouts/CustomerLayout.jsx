import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CustomerSidebar from '../customer/CustomerSidebar';
import CustomerTopNavbar from '../customer/CustomerTopNavbar';
import './CustomerLayout.css';

const CustomerLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`customer-layout ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <CustomerSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="customer-main">
        <CustomerTopNavbar />
        <div className="customer-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;

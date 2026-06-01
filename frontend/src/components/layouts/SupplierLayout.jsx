import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SupplierSidebar from '../supplier/SupplierSidebar';
import SupplierTopNavbar from '../supplier/SupplierTopNavbar';
import './SupplierLayout.css';

const SupplierLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`supplier-layout ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <SupplierSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="supplier-main-area">
        <SupplierTopNavbar />
        <div className="supplier-content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SupplierLayout;

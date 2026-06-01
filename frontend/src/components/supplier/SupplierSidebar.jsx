import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  Truck, 
  Warehouse, 
  ShoppingBag, 
  BarChart3, 
  Bell, 
  User, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './SupplierSidebar.css';

const SupplierSidebar = ({ collapsed, setCollapsed }) => {
  const { logout } = useAuth();

  const menuItems = [
    { path: '/supplier/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/supplier/products', icon: Package, label: 'Products' },
    { path: '/supplier/inventory', icon: ClipboardList, label: 'Supply Requests' },
    { path: '/supplier/logistics', icon: Truck, label: 'Deliveries' },
    { path: '/supplier/status', icon: Warehouse, label: 'Inventory Status' },
    { path: '/supplier/orders', icon: ShoppingBag, label: 'Purchase Orders' },
    { path: '/supplier/reports', icon: BarChart3, label: 'Reports' },
    { path: '/supplier/notifications', icon: Bell, label: 'Notifications' },
    { path: '/supplier/profile', icon: User, label: 'Profile' },
  ];

  return (
    <aside className={`supplier-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand">
        <div className="logo-icon">S</div>
        {!collapsed && <span className="logo-text">Supplier<span>Pro</span></span>}
        <button className="collapse-toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
          >
            <item.icon size={22} />
            {!collapsed && <span>{item.label}</span>}
            {isActive && !collapsed && <div className="active-glow" />}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="menu-link logout-link" onClick={logout}>
          <LogOut size={22} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default SupplierSidebar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Package, 
  ShoppingCart, 
  Tag, 
  BarChart3, 
  Bell, 
  User, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './SalesStaffSidebar.css';

const SalesStaffSidebar = ({ collapsed, setCollapsed }) => {
  const { logout } = useAuth();

  const menuItems = [
    { path: '/staff/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/staff/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/staff/customers', icon: Users, label: 'Customers' },
    { path: '/staff/inventory', icon: Package, label: 'Inventory' },
    { path: '/staff/products', icon: ShoppingCart, label: 'Products' },
    { path: '/staff/promotions', icon: Tag, label: 'Promotions' },
    { path: '/staff/reports', icon: BarChart3, label: 'Reports' },
    { path: '/staff/notifications', icon: Bell, label: 'Notifications' },
    { path: '/staff/profile', icon: User, label: 'Profile' },
  ];

  return (
    <aside className={`staff-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand">
        <div className="logo-icon">S</div>
        {!collapsed && <span className="logo-text">Sales<span>Pro</span></span>}
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
            {({ isActive }) => (
              <>
                <item.icon size={22} />
                {!collapsed && <span>{item.label}</span>}
                {isActive && !collapsed && <div className="active-glow" />}
              </>
            )}
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

export default SalesStaffSidebar;

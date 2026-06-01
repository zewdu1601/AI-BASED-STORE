import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  ShoppingBag, 
  Heart, 
  ShoppingCart, 
  Sparkles, 
  CreditCard, 
  Star, 
  Bell, 
  LifeBuoy, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './CustomerSidebar.css';

const CustomerSidebar = ({ collapsed, setCollapsed }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/customer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/customer/profile', icon: User, label: 'My Profile' },
    { path: '/customer/orders', icon: ShoppingBag, label: 'My Orders' },
    { path: '/customer/wishlist', icon: Heart, label: 'Wishlist' },
    { path: '/customer/cart', icon: ShoppingCart, label: 'Cart' },
    { path: '/customer/recommendations', icon: Sparkles, label: 'AI Picks' },
    { path: '/customer/payments', icon: CreditCard, label: 'Payments' },
    { path: '/customer/reviews', icon: Star, label: 'Reviews' },
    { path: '/customer/notifications', icon: Bell, label: 'Notifications' },
    { path: '/customer/support', icon: LifeBuoy, label: 'Support' },
    { path: '/customer/settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`customer-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <div className="sidebar-logo">Smart<span>Store</span></div>}
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {({ isActive }) => (
              <>
                <item.icon size={22} className="nav-icon" />
                {!collapsed && <span>{item.label}</span>}
                {isActive && !collapsed && <div className="active-indicator"></div>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item logout-btn" onClick={handleLogout}>
          <LogOut size={22} className="nav-icon" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default CustomerSidebar;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  Sun, 
  Moon, 
  User, 
  ChevronDown,
  LogOut,
  Plus,
  HelpCircle,
  Settings,
  Key,
  Camera,
  Edit3,
  ExternalLink,
  Package,
  UserPlus,
  ShoppingBag
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import MessageDropdown from './MessageDropdown';
import './TopNavbar.css';

const TopNavbar = () => {
  const { logout, user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [theme, setTheme] = useState('dark');

  const profileRef = useRef(null);
  const fileInputRef = useRef(null);
  const quickAddRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (quickAddRef.current && !quickAddRef.current.contains(event.target)) {
        setShowQuickAdd(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className="admin-navbar">
      <div className="navbar-left">
        <div className="navbar-logo" onClick={() => navigate('/admin/dashboard')}>
          <div className="logo-icon-bg">
            <Package size={20} className="logo-icon" />
          </div>
          <span className="logo-text">AI STORE</span>
        </div>
        
        <div className="search-container-large">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search products, orders, or customers..." />
          <div className="search-shortcut">/</div>
        </div>
      </div>

      <div className="navbar-right">
        {/* Quick Add Dropdown */}
        <div className="nav-dropdown-wrapper" ref={quickAddRef}>
          <button 
            className={`quick-add-btn ${showQuickAdd ? 'active' : ''}`}
            onClick={() => setShowQuickAdd(!showQuickAdd)}
          >
            <Plus size={18} />
            <span>Quick Action</span>
          </button>
          
          {showQuickAdd && (
            <div className="glass-card nav-dropdown quick-add-dropdown">
              <button className="dropdown-item" onClick={() => { navigate('/admin/products'); setShowQuickAdd(false); }}>
                <Package size={16} /> <span>Add Product</span>
              </button>
              <button className="dropdown-item" onClick={() => { navigate('/admin/users'); setShowQuickAdd(false); }}>
                <UserPlus size={16} /> <span>Add User</span>
              </button>
              <button className="dropdown-item" onClick={() => { navigate('/admin/orders'); setShowQuickAdd(false); }}>
                <ShoppingBag size={16} /> <span>Create Order</span>
              </button>
            </div>
          )}
        </div>

        <div className="nav-icon-group">
          <div className="nav-dropdown-wrapper">
            <button 
              className={`icon-btn-nav ${showMessages ? 'active' : ''}`} 
              onClick={() => { setShowMessages(!showMessages); setShowNotifications(false); }}
            >
              <MessageSquare size={20} />
              <span className="badge-dot"></span>
            </button>
            {showMessages && <MessageDropdown onClose={() => setShowMessages(false)} />}
          </div>

          <div className="nav-dropdown-wrapper">
            <button 
              className={`icon-btn-nav ${showNotifications ? 'active' : ''}`} 
              onClick={() => { setShowNotifications(!showNotifications); setShowMessages(false); }}
            >
              <Bell size={20} />
              <span className="badge-dot"></span>
            </button>
            {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
          </div>

          <button className="icon-btn-nav" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className="icon-btn-nav" title="Help">
            <HelpCircle size={20} />
          </button>
        </div>

        <div className="nav-divider"></div>

        {/* Profile Dropdown */}
        <div className="nav-dropdown-wrapper" ref={profileRef}>
          <div className="admin-profile-trigger" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <div className="profile-avatar-wrapper">
              <div className="avatar-img-placeholder">
                {user?.image ? (
                  <img src={user.image} alt="Profile" className="nav-avatar-img" />
                ) : (
                  <User size={18} />
                )}
              </div>
              <div className="online-indicator"></div>
            </div>
            <div className="profile-trigger-info">
              <span className="admin-name">{user?.name || 'Administrator'}</span>
              <ChevronDown size={14} className={showProfileMenu ? 'rotate' : ''} />
            </div>
          </div>

          {showProfileMenu && (
            <div className="glass-card nav-dropdown profile-dropdown">
              <div className="dropdown-header">
                <h4 className="user-full-name">{user?.name || 'Administrator'}</h4>
                <p className="user-email">{user?.email || 'admin@aistore.com'}</p>
                <div className="role-meta">
                  <span className="role-badge">Super Admin</span>
                  <span className="last-login">Last login: Today, 10:30 AM</span>
                </div>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <button className="dropdown-item" onClick={() => { navigate('/admin/profile'); setShowProfileMenu(false); }}>
                <User size={16} /> <span>View Profile</span>
              </button>
              <button className="dropdown-item" onClick={() => { navigate('/admin/profile'); setShowProfileMenu(false); }}>
                <Edit3 size={16} /> <span>Edit Profile</span>
              </button>
              <button className="dropdown-item" onClick={() => fileInputRef.current.click()}>
                <Camera size={16} /> <span>Profile Picture Upload</span>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileUpload}
                accept="image/*"
              />
              <button className="dropdown-item" onClick={() => { navigate('/admin/profile'); setShowProfileMenu(false); }}>
                <Key size={16} /> <span>Change Password</span>
              </button>
              <button className="dropdown-item" onClick={() => { navigate('/admin/settings'); setShowProfileMenu(false); }}>
                <Settings size={16} /> <span>Account Settings</span>
              </button>
              
              <div className="dropdown-divider"></div>
              
              <button className="dropdown-item logout" onClick={logout}>
                <LogOut size={16} /> <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;

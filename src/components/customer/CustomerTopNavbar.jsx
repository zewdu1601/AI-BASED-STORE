import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Heart, 
  ShoppingCart, 
  ShoppingBag,
  User, 
  LogOut,
  Moon,
  Sun,
  Settings,
  MessageSquare,
  CheckCircle,
  X,
  Camera
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './CustomerTopNavbar.css';

const CustomerTopNavbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const fileInputRef = useRef(null);

  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Dynamic state for messages and notifications
  const [messagesList, setMessagesList] = useState([
    { id: 1, initial: 'S', sender: 'Support Team', text: 'Hi! How can we help you today?', time: '5m', bg: '#00C2FF', isRead: false }
  ]);

  const [notificationsList, setNotificationsList] = useState([
    { id: 1, title: 'Order Shipped', desc: 'Your order #ORD-1290 is on the way!', color: '#10b981', isRead: false },
    { id: 2, title: 'Flash Sale Starting', desc: 'Get up to 50% off on Smart Watches today.', color: '#a855f7', isRead: false }
  ]);

  const unreadMessagesCount = messagesList.filter(m => !m.isRead).length;
  const unreadNotificationsCount = notificationsList.filter(n => !n.isRead).length;

  const [profileImage, setProfileImage] = useState(localStorage.getItem('customer_avatar') || '');

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem('customer_avatar', imageUrl);
    }
  };

  const handleMarkMessagesRead = (e) => {
    e.stopPropagation();
    setMessagesList(messagesList.map(m => ({ ...m, isRead: true })));
  };

  const handleMarkNotificationsRead = (e) => {
    e.stopPropagation();
    setNotificationsList(notificationsList.map(n => ({ ...n, isRead: true })));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="customer-top-nav">
      <div className="search-bar-wrapper">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search for orders, products, support..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="nav-actions">
        <Link to="/shop" className="nav-action-btn" style={{ background: 'rgba(0, 194, 255, 0.1)', color: '#00C2FF', padding: '0.4rem 1rem', borderRadius: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'center', width: 'auto', whiteSpace: 'nowrap' }}>
          <ShoppingBag size={18} />
          <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Shop Products</span>
        </Link>
        
        <div style={{ position: 'relative' }}>
          <button className="nav-action-btn" onClick={() => { setShowMessages(!showMessages); setShowNotifications(false); setIsProfileOpen(false); }}>
            <MessageSquare size={20} />
            {unreadMessagesCount > 0 && <span className="notification-dot" style={{ right: '4px', top: '4px' }}></span>}
          </button>
          
          {showMessages && (
            <div className="action-dropdown-menu glass-card fade-in" style={{ position: 'absolute', top: '120%', right: '-80px', width: '320px', padding: '1.2rem', borderRadius: '1rem', zIndex: 100, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.98)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                <h4 style={{ margin: 0, color: 'white', fontSize: '1rem' }}>Recent Messages</h4>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {unreadMessagesCount > 0 && (
                    <span style={{ fontSize: '0.8rem', color: '#00C2FF', cursor: 'pointer' }} onClick={handleMarkMessagesRead}>Mark all read</span>
                  )}
                  <X size={16} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setShowMessages(false)} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messagesList.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '1rem 0', color: 'var(--text-muted)' }}>
                    <CheckCircle size={24} style={{ margin: '0 auto 0.5rem', color: '#10b981' }} />
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>You're all caught up!</p>
                  </div>
                ) : (
                  messagesList.map(msg => (
                    <div key={msg.id} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.5rem', transition: 'background 0.2s', background: msg.isRead ? 'transparent' : 'rgba(255,255,255,0.05)' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = msg.isRead ? 'transparent' : 'rgba(255,255,255,0.05)'}>
                      <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: msg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, fontWeight: 'bold', opacity: msg.isRead ? 0.7 : 1 }}>{msg.initial}</div>
                      <div style={{ flex: 1, minWidth: 0, opacity: msg.isRead ? 0.7 : 1 }}>
                        <p style={{ margin: 0, color: 'white', fontSize: '0.9rem', fontWeight: msg.isRead ? 400 : 600 }}>{msg.sender}</p>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.text}</p>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{msg.time}</span>
                    </div>
                  ))
                )}
              </div>
              <button style={{ width: '100%', marginTop: '1rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 194, 255, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>Open Support Chat</button>
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <button className="nav-action-btn" onClick={() => { setShowNotifications(!showNotifications); setShowMessages(false); setIsProfileOpen(false); }}>
            <Bell size={20} />
            {unreadNotificationsCount > 0 && <span className="notification-dot" style={{ right: '4px', top: '4px' }}></span>}
          </button>

          {showNotifications && (
            <div className="action-dropdown-menu glass-card fade-in" style={{ position: 'absolute', top: '120%', right: '-40px', width: '340px', padding: '1.2rem', borderRadius: '1rem', zIndex: 100, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.98)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                <h4 style={{ margin: 0, color: 'white', fontSize: '1rem' }}>Alerts & Updates</h4>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {unreadNotificationsCount > 0 && (
                    <span style={{ fontSize: '0.8rem', color: '#00C2FF', cursor: 'pointer' }} onClick={handleMarkNotificationsRead}>Mark all read</span>
                  )}
                  <X size={16} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setShowNotifications(false)} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {notificationsList.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '1rem 0', color: 'var(--text-muted)' }}>
                    <CheckCircle size={24} style={{ margin: '0 auto 0.5rem', color: '#10b981' }} />
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>No new alerts</p>
                  </div>
                ) : (
                  notificationsList.map(notif => (
                    <div key={notif.id} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', padding: '0.8rem', borderRadius: '0.5rem', background: notif.isRead ? 'transparent' : 'rgba(255,255,255,0.03)', transition: 'background 0.2s' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: notif.color, marginTop: '6px', opacity: notif.isRead ? 0.3 : 1 }}></div>
                      <div style={{ flex: 1, opacity: notif.isRead ? 0.6 : 1 }}>
                        <p style={{ margin: 0, color: 'white', fontSize: '0.9rem', fontWeight: notif.isRead ? 400 : 500 }}>{notif.title}</p>
                        <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{notif.desc}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <Link to="/customer/wishlist" className="nav-action-btn">
          <Heart size={20} />
        </Link>
        <Link to="/customer/cart" className="nav-action-btn cart-btn">
          <ShoppingCart size={20} />
          {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
        </Link>

        <div className="v-divider"></div>

        <div className="user-profile-trigger" onClick={() => { setIsProfileOpen(!isProfileOpen); setShowMessages(false); setShowNotifications(false); }} style={{ position: 'relative' }}>
          <div className="user-info">
            <span className="user-name">{user?.name || 'Customer'}</span>
            <span className="user-role">Member</span>
          </div>
          <div className="user-avatar-sm" style={{ overflow: 'hidden' }}>
            {profileImage || user?.image ? (
              <img src={profileImage || user.image} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              user?.name?.charAt(0) || 'U'
            )}
          </div>

          {isProfileOpen && (
            <div className="profile-dropdown glass-card fade-in" style={{ position: 'absolute', top: '120%', right: 0, zIndex: 100 }}>
              <div className="dropdown-header">
                <p className="d-name">{user?.name}</p>
                <p className="d-email">{user?.email}</p>
              </div>
              <div className="dropdown-divider"></div>
              <Link to="/customer/profile" className="dropdown-item">
                <User size={16} /> My Profile
              </Link>
              <button className="dropdown-item" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                <Camera size={16} /> Upload Photo
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept="image/*"
                onChange={handlePhotoUpload}
                onClick={(e) => e.stopPropagation()}
              />
              <Link to="/customer/settings" className="dropdown-item">
                <Settings size={16} /> Settings
              </Link>
              <div className="dropdown-divider"></div>
              <button onClick={handleLogout} className="dropdown-item logout">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CustomerTopNavbar;

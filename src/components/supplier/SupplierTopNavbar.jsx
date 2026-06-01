import React, { useState, useRef } from 'react';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  User, 
  LogOut,
  ChevronDown,
  Building2,
  Camera,
  CheckCircle,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './SupplierTopNavbar.css';

const SupplierTopNavbar = () => {
  const { user, logout } = useAuth();
  const fileInputRef = useRef(null);

  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Dynamic state for messages and notifications
  const [messagesList, setMessagesList] = useState([
    { id: 1, initial: 'A', sender: 'Admin', text: 'Please update your inventory for SKU-409.', time: '10m', bg: 'linear-gradient(135deg, #a855f7, #ec4899)', isRead: false }
  ]);

  const [notificationsList, setNotificationsList] = useState([
    { id: 1, title: 'Purchase Order Approved', desc: 'PO-8821 has been approved.', color: '#10b981', isRead: false },
    { id: 2, title: 'Payment Dispatched', desc: 'Invoice #INV-290 paid successfully.', color: '#00C2FF', isRead: false }
  ]);

  const unreadMessagesCount = messagesList.filter(m => !m.isRead).length;
  const unreadNotificationsCount = notificationsList.filter(n => !n.isRead).length;

  const [profileImage, setProfileImage] = useState(localStorage.getItem('supplier_avatar') || '');

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem('supplier_avatar', imageUrl);
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

  return (
    <header className="supplier-top-navbar">
      <div className="navbar-left">
        <div className="company-logo">
          <Building2 size={24} className="text-accent" />
          <div className="logo-text-box">
            <span className="c-name">TechSupply</span>
            <span className="c-type">Official Partner</span>
          </div>
        </div>
        
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search orders, SKU, tracking..." />
          <div className="search-shortcut">⌘K</div>
        </div>
      </div>

      <div className="nav-actions">
        <div style={{ position: 'relative' }}>
          <button className="action-btn" title="Messages" onClick={() => { setShowMessages(!showMessages); setShowNotifications(false); }}>
            <MessageSquare size={20} />
            {unreadMessagesCount > 0 && <span className="btn-badge">{unreadMessagesCount}</span>}
          </button>
          
          {showMessages && (
            <div className="action-dropdown-menu glass-card fade-in" style={{ position: 'absolute', top: '120%', right: '-80px', width: '320px', padding: '1.2rem', borderRadius: '1rem', zIndex: 100, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.98)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
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
              <button style={{ width: '100%', marginTop: '1rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 194, 255, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>Open Inbox</button>
            </div>
          )}
        </div>
        
        <div style={{ position: 'relative' }}>
          <button className="action-btn" title="Notifications" onClick={() => { setShowNotifications(!showNotifications); setShowMessages(false); }}>
            <Bell size={20} />
            {unreadNotificationsCount > 0 && <span className="btn-badge red">{unreadNotificationsCount}</span>}
          </button>

          {showNotifications && (
            <div className="action-dropdown-menu glass-card fade-in" style={{ position: 'absolute', top: '120%', right: '-40px', width: '340px', padding: '1.2rem', borderRadius: '1rem', zIndex: 100, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.98)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
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

        <div className="divider" />

        <div className="user-profile-dropdown">
          <div className="user-avatar-box">
            {profileImage ? (
              <img src={profileImage} alt="Avatar" className="avatar-circle" style={{ width: '35px', height: '35px', objectFit: 'cover' }} />
            ) : (
              <div className="avatar-circle">{user?.name?.charAt(0) || 'S'}</div>
            )}
            <div className="user-meta">
              <span className="user-name">{user?.name || 'Supplier Admin'}</span>
              <span className="user-role">Supplier Admin</span>
            </div>
            <ChevronDown size={14} className="dropdown-arrow" />
          </div>
          
          <div className="profile-menu-dropdown">
            <button className="dropdown-item" onClick={() => fileInputRef.current?.click()}>
              <Camera size={16} />
              <span>Upload Photo</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*"
              onChange={handlePhotoUpload}
            />
            <button className="dropdown-item">
              <User size={16} />
              <span>Profile Settings</span>
            </button>
            <button className="dropdown-item logout" onClick={logout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SupplierTopNavbar;

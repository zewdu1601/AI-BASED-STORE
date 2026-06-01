import React, { useState } from 'react';
import { Bell, ShoppingBag, UserPlus, AlertCircle, Clock, X, CheckCircle } from 'lucide-react';
import './NotificationDropdown.css';

const NotificationDropdown = ({ onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'Order #ORD-9825 has been placed by David.',
      time: '5 mins ago',
      icon: ShoppingBag,
      color: '#6366f1',
      isRead: false
    },
    {
      id: 2,
      type: 'user',
      title: 'New Staff Registered',
      message: 'John Manager has joined the administrative team.',
      time: '2 hours ago',
      icon: UserPlus,
      color: '#a855f7',
      isRead: false
    },
    {
      id: 3,
      type: 'alert',
      title: 'Low Stock Warning',
      message: 'Smart Watch v2 is below 5 units in stock.',
      time: '1 day ago',
      icon: AlertCircle,
      color: '#ef4444',
      isRead: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="glass-card dropdown-menu notification-dropdown">
      <div className="dropdown-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Notifications</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {unreadCount > 0 && (
            <span className="mark-read" onClick={handleMarkRead} style={{ cursor: 'pointer', color: '#00C2FF' }}>Mark all read</span>
          )}
          <X size={16} onClick={onClose} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />
        </div>
      </div>
      <div className="dropdown-list">
        {notifications.length === 0 || unreadCount === 0 && notifications.every(n => n.isRead) ? (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
            <CheckCircle size={24} style={{ margin: '0 auto 0.5rem', color: '#10b981' }} />
            <p style={{ margin: 0, fontSize: '0.9rem' }}>No new alerts</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div key={notif.id} className="dropdown-item notification-item" style={{ opacity: notif.isRead ? 0.6 : 1, background: notif.isRead ? 'transparent' : 'rgba(255,255,255,0.03)' }}>
              <div className="item-icon" style={{ backgroundColor: `${notif.color}20`, color: notif.color }}>
                <notif.icon size={18} />
              </div>
              <div className="item-content">
                <p className="item-title" style={{ fontWeight: notif.isRead ? 400 : 600 }}>{notif.title}</p>
                <p className="item-message">{notif.message}</p>
                <span className="item-time">
                  <Clock size={12} />
                  {notif.time}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="dropdown-footer">
        <button className="view-all-btn">View All Notifications</button>
      </div>
    </div>
  );
};

export default NotificationDropdown;

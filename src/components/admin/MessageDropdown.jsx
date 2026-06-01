import React, { useState } from 'react';
import { MessageSquare, User, Clock, Search, X, CheckCircle } from 'lucide-react';
import './MessageDropdown.css';

const MessageDropdown = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Sarah Miller',
      content: 'I need help with my order #ORD-9821...',
      time: '12 mins ago',
      online: true,
      avatar: null,
      isRead: false
    },
    {
      id: 2,
      sender: 'Michael Chen',
      content: 'When will the Smart Watch be back in stock?',
      time: '1 hour ago',
      online: false,
      avatar: null,
      isRead: false
    },
    {
      id: 3,
      sender: 'Emma Wilson',
      content: 'Thank you for the quick delivery!',
      time: '3 hours ago',
      online: true,
      avatar: null,
      isRead: false
    }
  ]);

  const unreadCount = messages.filter(m => !m.isRead).length;

  const handleMarkRead = () => {
    setMessages(messages.map(m => ({ ...m, isRead: true })));
  };

  return (
    <div className="glass-card dropdown-menu message-dropdown">
      <div className="dropdown-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Recent Messages</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {unreadCount > 0 && (
            <span style={{ fontSize: '0.8rem', color: '#00C2FF', cursor: 'pointer' }} onClick={handleMarkRead}>Mark all read</span>
          )}
          <X size={16} onClick={onClose} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />
        </div>
      </div>
      <div className="dropdown-list">
        {messages.length === 0 || unreadCount === 0 && messages.every(m => m.isRead) ? (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
            <CheckCircle size={24} style={{ margin: '0 auto 0.5rem', color: '#10b981' }} />
            <p style={{ margin: 0, fontSize: '0.9rem' }}>You're all caught up!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="dropdown-item message-item" style={{ opacity: msg.isRead ? 0.6 : 1, background: msg.isRead ? 'transparent' : 'rgba(255,255,255,0.03)' }}>
              <div className="sender-avatar">
                <User size={20} />
                {msg.online && <span className="online-indicator"></span>}
              </div>
              <div className="item-content">
                <div className="item-meta">
                  <p className="sender-name" style={{ fontWeight: msg.isRead ? 400 : 600 }}>{msg.sender}</p>
                  <span className="item-time">{msg.time}</span>
                </div>
                <p className="item-preview">{msg.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="dropdown-footer">
        <button className="view-all-btn">Go to Chat Center</button>
      </div>
    </div>
  );
};

export default MessageDropdown;

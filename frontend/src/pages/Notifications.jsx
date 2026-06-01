import React, { useState } from 'react';
import { 
  Bell, 
  Package, 
  AlertTriangle, 
  CreditCard, 
  Truck, 
  User, 
  ShieldAlert, 
  Info,
  CheckCircle,
  X,
  Search,
  Filter,
  Trash2,
  Clock
} from 'lucide-react';
import './Notifications.css';

const Notifications = () => {
  const [filter, setFilter] = useState('All');
  
  const alerts = [
    { id: 1, type: 'order', title: 'New Order Received', msg: 'Order #ORD-9825 has been placed by David.', time: '5 mins ago', read: false },
    { id: 2, type: 'stock', title: 'Low Stock Warning', msg: 'Smart Watch v2 is below 5 units in stock.', time: '12 mins ago', read: false },
    { id: 3, type: 'payment', title: 'Payment Verified', msg: 'Payment for #ORD-9821 has been successfully confirmed.', time: '1 hour ago', read: true },
    { id: 4, type: 'delivery', title: 'Delivery Update', msg: '#ORD-9818 is currently out for delivery.', time: '3 hours ago', read: true },
    { id: 5, type: 'user', title: 'New User Activity', msg: 'Admin role assigned to John Manager.', time: '1 day ago', read: true },
    { id: 6, type: 'system', title: 'System Notification', msg: 'Monthly backup completed successfully.', time: '1 day ago', read: true }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'order': return <Package size={20} />;
      case 'stock': return <AlertTriangle size={20} />;
      case 'payment': return <CreditCard size={20} />;
      case 'delivery': return <Truck size={20} />;
      case 'user': return <User size={20} />;
      case 'system': return <ShieldAlert size={20} />;
      default: return <Bell size={20} />;
    }
  };

  const filteredAlerts = alerts.filter(a => filter === 'All' || a.type === filter);

  return (
    <div className="admin-notifications">
      <header className="page-header">
        <div>
          <h1 className="page-title">Notification Center</h1>
          <p className="page-subtitle">Manage system alerts, order updates, and security notifications.</p>
        </div>
        <div className="header-actions">
          <button className="add-btn primary">Mark all as Read</button>
        </div>
      </header>

      <div className="glass-card notification-filters">
        {['All', 'order', 'stock', 'payment', 'delivery', 'user', 'system'].map(f => (
          <button 
            key={f} 
            className={`filter-tab ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'All' ? 'All Alerts' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="notifications-list-extended">
        {filteredAlerts.map(alert => (
          <div key={alert.id} className={`notif-card glass-card ${alert.read ? 'read' : 'unread'}`}>
            <div className={`notif-icon-box ${alert.type}`}>
              {getIcon(alert.type)}
            </div>
            <div className="notif-details">
              <div className="notif-header">
                <h3>{alert.title}</h3>
                <div className="notif-meta">
                  <Clock size={12} />
                  <span>{alert.time}</span>
                </div>
              </div>
              <p>{alert.msg}</p>
            </div>
            <div className="notif-actions">
              <button className="icon-btn-sm" title="Mark Read"><CheckCircle size={16} /></button>
              <button className="icon-btn-sm delete" title="Delete"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;

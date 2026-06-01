import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  MessageSquare, 
  AlertTriangle, 
  Truck,
  TrendingUp,
  History,
  Zap,
  ChevronRight,
  Plus,
  Users,
  Package,
  Bell,
  ShoppingCart as CartIcon
} from 'lucide-react';
import AIChatWidget from '../components/AIChatWidget';
import './SalesStaff.css';

const SalesStaff = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const stats = [
    { label: "Today's Orders", value: "48", icon: ShoppingBag, color: "blue", trend: "+12%" },
    { label: "Pending Orders", value: "12", icon: Clock, color: "orange", trend: "Action required" },
    { label: "Completed Orders", value: "36", icon: CheckCircle, color: "green", trend: "92% rate" },
    { label: "Daily Revenue", value: "$4,280", icon: DollarSign, color: "purple", trend: "+8.5%" },
    { label: "Customer Requests", value: "5", icon: MessageSquare, color: "cyan", trend: "3 new" },
    { label: "Low Stock Alerts", value: "18", icon: AlertTriangle, color: "red", trend: "Critical items" },
    { label: "Delivery Updates", value: "7", icon: Truck, color: "indigo", trend: "In transit" },
  ];

  return (
    <div className="staff-dashboard-overview fade-in">
      <div className="dashboard-welcome">
        <h1>Dashboard Overview</h1>
        <p>Monitor your daily sales activities, customer interactions, and store operations.</p>
      </div>

      {/* 📊 Dashboard Cards */}
      <div className="staff-stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="staff-stat-card glass-card">
            <div className={`stat-icon-box ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <h2 className="stat-value">{stat.value}</h2>
              <span className={`stat-trend ${stat.color === 'red' ? 'danger' : ''}`}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content-layout">
        {/* 📈 Main Content Area Left */}
        <div className="content-left">
          <div className="glass-card section-card">
            <div className="card-header">
              <h3><TrendingUp size={18} className="text-primary" /> Daily Sales Overview</h3>
              <button className="view-all">Full Report <ChevronRight size={14} /></button>
            </div>
            <div className="sales-chart-mock">
              <div className="chart-bars">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="c-bar" style={{ height: `${h}%` }}>
                    <div className="bar-glow" />
                  </div>
                ))}
              </div>
              <div className="chart-labels">
                <span>08:00</span><span>10:00</span><span>12:00</span><span>14:00</span><span>16:00</span><span>18:00</span><span>20:00</span>
              </div>
            </div>
          </div>

          <div className="glass-card section-card mt-6">
            <div className="card-header">
              <h3><History size={18} className="text-accent" /> Recent Orders</h3>
              <button className="view-all">Manage Orders <ChevronRight size={14} /></button>
            </div>
            <table className="mini-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map(i => (
                  <tr key={i}>
                    <td><strong>#ORD-721{i}</strong></td>
                    <td>Regular Customer</td>
                    <td>$149.00</td>
                    <td><span className="status-badge success">Completed</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ⚡ Quick Actions & Alerts Right */}
        <div className="content-right">
          <div className="glass-card section-card">
            <div className="card-header">
              <h3><Zap size={18} className="text-warning" /> Quick Actions</h3>
            </div>
            <div className="quick-actions-grid">
              <button className="q-action-btn">
                <CartIcon size={20} />
                <span>New POS Sale</span>
              </button>
              <button className="q-action-btn">
                <ShoppingBag size={20} />
                <span>Verify Order</span>
              </button>
              <button className="q-action-btn">
                <Users size={20} />
                <span>Add Customer</span>
              </button>
              <button className="q-action-btn" onClick={() => setChatOpen(true)}>
                <MessageSquare size={20} />
                <span>Open Chat</span>
              </button>
            </div>
          </div>

          <div className="glass-card section-card mt-6">
            <div className="card-header">
              <h3><Bell size={18} className="text-info" /> Live Notifications</h3>
            </div>
            <div className="priority-alerts">
              <div className="p-alert-item info" style={{ borderLeft: '3px solid #00C2FF', paddingLeft: '1rem', marginBottom: '1rem' }}>
                <div className="alert-body">
                  <p style={{ color: '#00C2FF', fontWeight: 'bold' }}>New Customer Message</p>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>From: John Doe (Regarding Order #ORD-7211)</span>
                </div>
              </div>
              <div className="p-alert-item info" style={{ borderLeft: '3px solid #a855f7', paddingLeft: '1rem' }}>
                <div className="alert-body">
                  <p style={{ color: '#a855f7', fontWeight: 'bold' }}>AI Reorder Suggestion</p>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>System suggests restocking 'Wireless Headphones'</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card section-card mt-6">
            <div className="card-header">
              <h3><AlertTriangle size={18} className="text-danger" /> Low Stock Alerts</h3>
            </div>
            <div className="priority-alerts">
              <div className="p-alert-item critical">
                <div className="alert-dot" />
                <div className="alert-body">
                  <p>Smart Watch Pro</p>
                  <span>Stock critically low (2 left)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Global Staff Chat Widget */}
      <AIChatWidget />
    </div>
  );
};

export default SalesStaff;

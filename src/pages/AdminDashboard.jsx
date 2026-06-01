import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Package, Users, DollarSign, Shield, MapPin, 
  Tag, Activity, Check, X, RefreshCcw, FileText
} from 'lucide-react';

import { useAI } from '../context/AIContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { insights } = useAI();
  const [activeTab, setActiveTab] = useState('Overview');
  const [data, setData] = useState({
    products: [], users: [], stats: {}, logs: []
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [p, u, a, l] = await Promise.all([
          api.get('/products'),
          api.get('/admin/users'),
          api.get('/admin/analytics'),
          api.get('/admin/audit-logs')
        ]);
        setData({
          products: p.data,
          users: u.data,
          stats: a.data,
          logs: l.data
        });
      } catch (err) {
        console.error('Admin dashboard load failed:', err.response?.data || err.message || err);
      }
    };
    if (user) fetchAllData();
  }, [user, activeTab]);

  const SidebarItem = ({ name, icon: Icon }) => (
    <button 
      className={`sidebar-item ${activeTab === name ? 'active' : ''}`}
      onClick={() => setActiveTab(name)}
    >
      <Icon size={20} />
      <span>{name}</span>
    </button>
  );

  return (
    <div className="admin-container">
      <aside className="admin-sidebar glass-card">
        <div className="sidebar-header">
          <Shield className="logo-icon" />
          <h2>Command</h2>
        </div>
        <div className="sidebar-menu">
          <SidebarItem name="Overview" icon={Activity} />
          <SidebarItem name="Catalog" icon={Package} />
          <SidebarItem name="Inventory" icon={RefreshCcw} />
          <SidebarItem name="Orders" icon={DollarSign} />
          <SidebarItem name="AI Intelligence" icon={Activity} />
          <SidebarItem name="Users" icon={Users} />
          <SidebarItem name="Marketing" icon={Tag} />
          <SidebarItem name="Branches" icon={MapPin} />
          <SidebarItem name="System" icon={RefreshCcw} />
          <SidebarItem name="Security" icon={Shield} />
        </div>
      </aside>

      <main className="admin-main">
        {activeTab === 'Overview' && (
          <div className="view-fade">
            <h1>System Overview</h1>
            <div className="stats-grid">
              <StatCard title="Revenue" value={`$${data.stats.totalSales || 0}`} icon={DollarSign} color="#10b981" />
              <StatCard title="Users" value={data.stats.userCount || 0} icon={Users} color="#6366f1" />
              <StatCard title="Orders" value={data.stats.orderCount || 0} icon={Package} color="#a855f7" />
            </div>
          </div>
        )}

        {activeTab === 'Catalog' && (
          <div className="view-fade">
            <div className="header-actions">
              <h1>Product Catalog</h1>
              <button className="primary-btn">Add New Product</button>
            </div>
            <div className="glass-card table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr><th>Product</th><th>Category</th><th>Stock</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {data.products.map(p => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>{p.category}</td>
                      <td>{p.stock}</td>
                      <td><span className={`status-tag ${p.status || 'pending'}`}>{p.status || 'pending'}</span></td>
                      <td className="actions-cell">
                        <button className="icon-btn approve"><Check size={16} /></button>
                        <button className="icon-btn reject"><X size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Inventory' && (
          <div className="view-fade">
            <div className="header-actions">
              <h1>Inventory Management</h1>
              <div className="alerts-badge">3 Low Stock Alerts</div>
            </div>
            <div className="glass-card table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr><th>Product</th><th>Threshold</th><th>Current Stock</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {data.products.map(p => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>{p.lowStockThreshold || 5}</td>
                      <td>{p.stock}</td>
                      <td>
                        <span className={`status-pill ${p.stock <= (p.lowStockThreshold || 5) ? 'danger' : 'success'}`}>
                          {p.stock <= (p.lowStockThreshold || 5) ? 'Restock Required' : 'Healthy'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Orders' && (
          <div className="view-fade">
            <h1>Customer Orders</h1>
            <div className="glass-card table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  <tr className="order-row">
                    <td>#ORD-4421</td>
                    <td>user@example.com</td>
                    <td>$299.00</td>
                    <td><span className="status-tag pending">Processing</span></td>
                    <td className="actions-cell">
                      <button className="small-btn">Verify Pay</button>
                      <button className="small-btn danger">Refund</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'AI Intelligence' && (
          <div className="view-fade">
            <h1>AI Performance Monitoring</h1>
            <div className="stats-grid">
              <StatCard title="Rec. Click Rate" value="24.5%" icon={Activity} color="#22d3ee" />
              <StatCard title="AI Conversions" value="128" icon={Check} color="#10b981" />
              <StatCard title="Active Rules" value="12" icon={Shield} color="#f59e0b" />
            </div>
            
            <div className="glass-card ai-controls" style={{ marginTop: '2rem', padding: '1.5rem' }}>
              <h2>Predictive Demand Forecasting</h2>
              <div className="forecast-list" style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {insights.map((insight, idx) => (
                  <div key={idx} className="forecast-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.8rem' }}>
                    <span>{insight.productName}</span>
                    <span style={{ 
                      color: insight.trending ? '#ef4444' : '#10b981', 
                      fontWeight: 700 
                    }}>
                      {insight.demandForecast}
                    </span>
                  </div>
                ))}
                {insights.length === 0 && <p>Loading deep-learning insights...</p>}
              </div>
            </div>

            <div className="glass-card security-alerts" style={{ marginTop: '2rem', padding: '1.5rem', borderLeft: '4px solid #ef4444' }}>
              <h2>AI Security: Fraud Detection</h2>
              <p style={{ color: '#ef4444', marginTop: '0.5rem' }}>1 Potential fraud pattern detected in last 24h (Order #ORD-992)</p>
            </div>
          </div>
        )}

        {activeTab === 'Users' && (
          <div className="view-fade">
            <div className="header-actions">
              <h1>User Management</h1>
              <button className="primary-btn" onClick={() => navigate('/admin/users/add')}>
                Add User
              </button>
            </div>
            <div className="glass-card table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {data.users.map(u => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td><span className="role-badge">{u.role}</span></td>
                      <td>
                        <span className={`status-dot ${u.isActive !== false ? 'active' : 'inactive'}`}></span>
                        {u.isActive !== false ? 'Active' : 'Deactivated'}
                      </td>
                      <td className="actions-cell">
                        <button className="small-btn">Reset PW</button>
                        <button className={`small-btn ${u.isActive !== false ? 'danger' : 'success'}`}>
                          {u.isActive !== false ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Marketing' && (
          <div className="view-fade">
            <div className="header-actions">
              <h1>Promotions & Coupons</h1>
              <button className="primary-btn">Create Campaign</button>
            </div>
            <div className="promotions-grid">
              <div className="glass-card promo-card">
                <Tag className="icon" />
                <h3>SUMMER-2024</h3>
                <p>20% off all Electronics</p>
                <div className="promo-footer">
                  <span>Expires: Aug 30</span>
                  <button className="small-btn">Edit</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Branches' && (
          <div className="view-fade">
            <div className="header-actions">
              <h1>Store Branches</h1>
              <button className="primary-btn">Add New Branch</button>
            </div>
            <div className="branches-list">
              <div className="glass-card branch-card">
                <MapPin className="icon" />
                <div className="branch-info">
                  <h3>Downtown Flagship</h3>
                  <p>123 Main St, New York</p>
                  <span className="manager">Manager: Sarah Miller</span>
                </div>
                <div className="branch-status">
                  <span className="status-dot active"></span> Online
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'System' && (
          <div className="view-fade">
            <h1>System Maintenance</h1>
            <div className="maintenance-grid">
              <div className="glass-card tool-card">
                <RefreshCcw className="icon" />
                <h3>Database Backup</h3>
                <p>Generate a full system backup and export as .zip</p>
                <button className="secondary-btn">Backup Now</button>
              </div>
              <div className="glass-card tool-card">
                <FileText className="icon" />
                <h3>Export Reports</h3>
                <p>Generate PDF/Excel reports for sales and inventory</p>
                <button className="secondary-btn">Generate Report</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="view-fade">
            <h1>Audit Logs</h1>
            <div className="glass-card table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr><th>User</th><th>Action</th><th>Resource</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {data.logs.map(log => (
                    <tr key={log._id}>
                      <td>{log.user?.email}</td>
                      <td><strong>{log.action}</strong></td>
                      <td>{log.resource}</td>
                      <td>{new Date(log.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .admin-container { display: grid; grid-template-columns: 260px 1fr; gap: 2rem; min-height: 90vh; }
        .admin-sidebar { height: 100%; padding: 2rem 1rem; display: flex; flex-direction: column; gap: 2rem; }
        .sidebar-header { display: flex; align-items: center; gap: 1rem; padding: 0 1rem; color: var(--accent); }
        .sidebar-menu { display: flex; flex-direction: column; gap: 0.5rem; }
        .sidebar-item { 
          display: flex; align-items: center; gap: 1rem; padding: 0.8rem 1.2rem; 
          background: transparent; color: var(--text-muted); border-radius: 0.8rem;
          transition: all 0.3s;
        }
        .sidebar-item:hover { background: rgba(255,255,255,0.05); color: white; }
        .sidebar-item.active { background: var(--primary); color: white; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3); }
        
        .admin-main { display: flex; flex-direction: column; gap: 2rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .stat-card { background: var(--card-bg); padding: 2rem; border-radius: 1.5rem; display: flex; align-items: center; gap: 1.5rem; }
        
        .status-tag { padding: 0.2rem 0.6rem; border-radius: 1rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .status-tag.approved { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-tag.pending { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .status-tag.rejected { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        
        .table-wrapper { padding: 0; overflow: hidden; }
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th { background: rgba(255,255,255,0.02); text-align: left; padding: 1.2rem; color: var(--text-muted); font-size: 0.85rem; }
        .admin-table td { padding: 1.2rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        
        .actions-cell { display: flex; gap: 0.5rem; }
        .icon-btn { padding: 0.5rem; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); }
        .icon-btn.approve:hover { background: #10b981; color: white; }
        .icon-btn.reject:hover { background: #ef4444; color: white; }

        .role-badge { background: rgba(99, 102, 241, 0.1); color: var(--primary); padding: 0.2rem 0.6rem; border-radius: 0.5rem; font-size: 0.8rem; font-weight: 600; }
        .status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 0.5rem; }
        .status-dot.active { background: #10b981; box-shadow: 0 0 8px #10b981; }
        .status-dot.inactive { background: #64748b; }
        .small-btn { padding: 0.4rem 0.8rem; font-size: 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; }
        .small-btn.danger:hover { background: #ef4444; border-color: #ef4444; }
        .small-btn.success:hover { background: #10b981; border-color: #10b981; }

        .promotions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .promo-card { padding: 1.5rem; border-left: 4px solid var(--accent); }
        .promo-card .icon { color: var(--accent); margin-bottom: 1rem; }
        .promo-footer { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; margin-top: 1rem; }

        .branches-list { display: flex; flex-direction: column; gap: 1rem; }
        .branch-card { display: flex; align-items: center; gap: 2rem; padding: 1.5rem; }
        .branch-card .icon { color: var(--accent); }
        .branch-info { flex: 1; }

        .maintenance-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
        .tool-card { padding: 2rem; text-align: center; }
        .tool-card .icon { margin: 0 auto 1.5rem; color: var(--accent); width: 40px; height: 40px; }
        .tool-card h3 { margin-bottom: 0.5rem; }
        .tool-card p { color: var(--text-muted); margin-bottom: 2rem; font-size: 0.9rem; }
        
        .view-fade { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="glass-card stat-card">
    <div className="icon-box" style={{ background: `${color}15`, color }}>
      <Icon size={24} />
    </div>
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{title}</p>
      <h2 style={{ fontSize: '1.8rem', marginTop: '0.2rem' }}>{value}</h2>
    </div>
  </div>
);

export default AdminDashboard;


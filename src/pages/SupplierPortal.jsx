import React from 'react';
import { 
  Package, 
  ClipboardList, 
  CheckCircle, 
  Warehouse, 
  DollarSign, 
  Truck,
  Bell,
  TrendingUp,
  History,
  Activity,
  ArrowUpRight,
  Zap,
  BarChart3
} from 'lucide-react';
import './SupplierPortal.css';

const SupplierPortal = () => {
  const stats = [
    { label: "Total Products Supplied", value: "248", icon: Package, color: "blue", trend: "+12 new" },
    { label: "Pending Supply Requests", value: "8", icon: ClipboardList, color: "orange", trend: "3 critical" },
    { label: "Completed Deliveries", value: "156", icon: CheckCircle, color: "green", trend: "100% rate" },
    { label: "Inventory Status", value: "Optimal", icon: Warehouse, color: "purple", trend: "85% capacity" },
    { label: "Revenue Earned", value: "$52,420", icon: DollarSign, color: "cyan", trend: "+15.4%" },
    { label: "Delivery Alerts", value: "2", icon: Truck, color: "indigo", trend: "Delayed by 1h" },
    { label: "Restock Notifications", value: "5", icon: Bell, color: "red", trend: "Due today" },
  ];

  return (
    <div className="supplier-dashboard-overview fade-in">
      <div className="dashboard-welcome">
        <h1>Supply Dashboard Overview</h1>
        <p>Monitor your supply performance, track requests, and manage inventory logistics.</p>
      </div>

      {/* 📊 Dashboard Cards */}
      <div className="supplier-stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="supplier-stat-card glass-card">
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

      <div className="dashboard-main-layout">
        {/* 📈 Main Content Area Left */}
        <div className="layout-left">
          <div className="glass-card section-card">
            <div className="card-header">
              <h3><Activity size={20} className="text-accent" /> Supply Overview</h3>
              <button className="view-all-btn">Full Analytics <ArrowUpRight size={14} /></button>
            </div>
            <div className="supply-performance-mock">
              <div className="chart-bars">
                {[45, 60, 40, 85, 55, 95, 75, 100, 80, 90].map((h, i) => (
                  <div key={i} className="s-bar" style={{ height: `${h}%` }}>
                    <div className="s-bar-glow" />
                  </div>
                ))}
              </div>
              <div className="chart-labels">
                <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span><span>Week 5</span>
              </div>
            </div>
          </div>

          <div className="glass-card section-card mt-6">
            <div className="card-header">
              <h3><TrendingUp size={20} className="text-success" /> Product Demand Reports</h3>
            </div>
            <div className="demand-grid">
              <div className="demand-item">
                <p>AI Smart Watch</p>
                <div className="d-bar-container"><div className="d-bar-fill" style={{ width: '85%' }} /></div>
                <span>High Demand</span>
              </div>
              <div className="demand-item">
                <p>Bluetooth Headphones</p>
                <div className="d-bar-container"><div className="d-bar-fill" style={{ width: '60%' }} /></div>
                <span>Moderate Demand</span>
              </div>
            </div>
          </div>

          <div className="glass-card section-card mt-6">
            <div className="card-header">
              <h3><History size={20} className="text-muted" /> Recent Shipment Updates</h3>
            </div>
            <table className="supplier-mini-table">
              <thead>
                <tr>
                  <th>Shipment ID</th>
                  <th>Destination</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map(i => (
                  <tr key={i}>
                    <td><strong>#SHP-880{i}</strong></td>
                    <td>Main Store Hub</td>
                    <td>Oct 2{i}, 2023</td>
                    <td><span className="status-badge confirmed">Delivered</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ⚡ Right Side: Requests & Tracking */}
        <div className="layout-right">
          <div className="glass-card section-card">
            <div className="card-header">
              <h3><ClipboardList size={20} className="text-orange" /> Pending Requests</h3>
            </div>
            <div className="request-list-mini">
              <div className="r-item critical">
                <p>Smart Band X</p>
                <span>500 Units Requested</span>
                <button className="q-btn">Process Now</button>
              </div>
              <div className="r-item">
                <p>Wireless Mouse</p>
                <span>200 Units Requested</span>
                <button className="q-btn">View Details</button>
              </div>
            </div>
          </div>

          <div className="glass-card section-card mt-6">
            <div className="card-header">
              <h3><Truck size={20} className="text-indigo" /> Delivery Tracking</h3>
            </div>
            <div className="delivery-track-list">
              <div className="track-item">
                <div className="track-meta">
                  <strong>#SHP-9021</strong>
                  <span>In Transit</span>
                </div>
                <div className="track-progress"><div className="t-progress-fill" style={{ width: '65%' }} /></div>
              </div>
            </div>
          </div>

          <div className="glass-card section-card mt-6">
            <div className="card-header">
              <h3><Zap size={20} className="text-warning" /> Quick Actions</h3>
            </div>
            <div className="supplier-quick-actions">
              <button className="sa-btn"><Package size={18} /> New Supply</button>
              <button className="sa-btn"><Truck size={18} /> Schedule Delivery</button>
              <button className="sa-btn"><BarChart3 size={18} /> Gen Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierPortal;

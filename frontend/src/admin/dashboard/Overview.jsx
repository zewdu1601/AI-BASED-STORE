import React, { useState } from 'react';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  AlertTriangle, 
  Target, 
  Plus, 
  FileText, 
  TrendingUp, 
  Zap,
  MoreVertical,
  Calendar,
  Download,
  Search,
  MessageSquare,
  Bell,
  Sun,
  User,
  UserPlus,
  ChevronDown,
  HelpCircle,
  ArrowRight,
  MousePointer2,
  Tag,
  LogOut,
  Menu
} from 'lucide-react';
import { 
  LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './Overview.css';

const Overview = () => {
  const [activeTab, setActiveTab] = useState('Weekly');

  const salesData = [
    { name: 'Mon', value: 2000 },
    { name: 'Tue', value: 3500 },
    { name: 'Wed', value: 2800 },
    { name: 'Thu', value: 5200 },
    { name: 'Fri', value: 4100 },
    { name: 'Sat', value: 6300 },
    { name: 'Sun', value: 7800 },
  ];

  const pieData = [
    { name: 'Electronics', value: 12450, color: '#6366f1' },
    { name: 'Fashion', value: 6200, color: '#10b981' },
    { name: 'Home & Living', value: 3720, color: '#f59e0b' },
    { name: 'Books', value: 1860, color: '#ec4899' },
    { name: 'Others', value: 620, color: '#94a3b8' },
  ];

  const stats = [
    { label: 'Total Products', value: '1,248', trend: '+12.5%', icon: Package, color: '#6366f1' },
    { label: 'Total Orders', value: '324', trend: '+18.3%', icon: ShoppingCart, color: '#10b981' },
    { label: 'Total Customers', value: '2,543', trend: '+8.7%', icon: Users, color: '#a855f7' },
    { label: 'Total Revenue', value: '$24,850.00', trend: '+24.6%', icon: DollarSign, color: '#f59e0b' },
    { label: 'Total Staff', value: '18', trend: '+5.2%', icon: User, color: '#3b82f6' },
    { label: 'Low Stock Alerts', value: '12', trend: '+20%', icon: AlertTriangle, color: '#ef4444' },
    { label: 'AI Accuracy', value: '94.2%', trend: '+1.2%', icon: Target, color: '#06b6d4' },
  ];

  return (
    <div className="dashboard-wrapper">
      {/* Header Section */}
      <header className="dashboard-header-main">
        <div className="header-greeting">
          <h1>Welcome back, Admin! 👋</h1>
          <p>Here's what's happening with your store today.</p>
        </div>
        <div className="header-actions">
          <div className="date-picker-box">
            <Calendar size={16} />
            <span>May 28, 2025</span>
            <ChevronDown size={14} />
          </div>
          <button className="export-btn">
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </header>

      {/* Stats Cards Row */}
      <div className="stats-row">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card stat-card-premium">
            <div className="stat-icon-circle" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              <stat.icon size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-label-text">{stat.label}</span>
              <h3 className="stat-value-text">{stat.value}</h3>
              <div className="stat-trend-box">
                <TrendingUp size={12} className="trend-icon" />
                <span>{stat.trend}</span>
                <p>vs last month</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="dashboard-main-layout">
        {/* Row 1 */}
        <div className="layout-row-1">
          {/* Sales Overview */}
          <div className="glass-card sales-overview-card">
            <div className="card-header-flex">
              <div className="card-title-group">
                <h3>Sales Overview</h3>
                <p>Total Sales</p>
                <div className="revenue-summary">
                  <h2>$24,850.00</h2>
                  <span className="trend-pos"><TrendingUp size={14} /> 24.6% <small>vs last week</small></span>
                </div>
              </div>
              <div className="card-filter-toggle">
                <button className="filter-tab active">This Week</button>
                <ChevronDown size={14} />
              </div>
            </div>
            
            <div className="chart-flex-container">
              <div className="main-chart-area">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ backgroundColor: '#1e1e2d', border: 'none', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-sidebar-stats">
                <div className="sidebar-stat-item">
                  <p>Average Order Value</p>
                  <h4>$76.70 <span><TrendingUp size={12} /> 12.4%</span></h4>
                </div>
                <div className="sidebar-stat-item">
                  <p>Orders This Week</p>
                  <h4>324 <span><TrendingUp size={12} /> 18.3%</span></h4>
                </div>
                <div className="sidebar-stat-item">
                  <p>New Customers</p>
                  <h4>125 <span><TrendingUp size={12} /> 14.8%</span></h4>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="glass-card recent-orders-card">
            <div className="card-header-flex">
              <h3>Recent Orders</h3>
              <button className="view-all-link">View All</button>
            </div>
            <div className="orders-table-simple">
              <div className="table-header-row">
                <span>Order ID</span>
                <span>Customer</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              {[
                { id: '#10245', name: 'Alex T.', price: '$120.00', status: 'Delivered', color: '#10b981' },
                { id: '#10244', name: 'Sarah K.', price: '$85.50', status: 'Processing', color: '#3b82f6' },
                { id: '#10243', name: 'John D.', price: '$65.00', status: 'Shipped', color: '#f59e0b' },
                { id: '#10242', name: 'Emily R.', price: '$99.99', status: 'Confirmed', color: '#8b5cf6' },
                { id: '#10241', name: 'Michael B.', price: '$150.00', status: 'Cancelled', color: '#ef4444' },
              ].map((order, i) => (
                <div key={i} className="order-item-row">
                  <span className="order-id">{order.id}</span>
                  <span className="order-name">{order.name}</span>
                  <span className="order-amt">{order.price}</span>
                  <span className="order-status">
                    <div className="status-dot" style={{ backgroundColor: order.color }}></div>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="glass-card ai-insights-card-premium">
            <div className="ai-card-badge">
              <Zap size={14} fill="currentColor" />
              <span>AI POWERED</span>
            </div>
            <div className="ai-header-group">
              <BrainCircuit size={24} className="ai-main-icon" />
              <h3>AI Smart Insights</h3>
            </div>
            <div className="ai-insight-list">
              <div className="insight-entry">
                <div className="entry-icon-box"><TrendingUp size={16} /></div>
                <div className="entry-text">
                  <p className="entry-title">Predicted Sales Trend</p>
                  <p className="entry-desc">AI predicts a 15% surge in electronics sales over the next 48 hours based on browsing patterns.</p>
                  <span className="entry-meta">High Confidence (92%)</span>
                </div>
              </div>
              <div className="insight-entry">
                <div className="entry-icon-box"><Target size={16} /></div>
                <div className="entry-text">
                  <p className="entry-title">Top Opportunity</p>
                  <p className="entry-desc">Wireless Headphones category is trending with 32% more interest.</p>
                </div>
              </div>
              <div className="insight-entry">
                <div className="entry-icon-box"><Users size={16} /></div>
                <div className="entry-text">
                  <p className="entry-title">Customer Behavior</p>
                  <p className="entry-desc">Customers are spending 25% more time on product comparison.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="layout-row-2">
          {/* Top Selling Products */}
          <div className="glass-card product-list-card">
            <div className="card-header-flex">
              <h3>Top Selling Products</h3>
              <button className="view-all-link">View All</button>
            </div>
            <div className="product-scroll-list">
              {[
                { id: 1, name: 'Wireless Headphones', cat: 'Electronics', price: '$4,250.00', sold: '125 Sold', img: '🎧' },
                { id: 2, name: 'Smart Watch Series 5', cat: 'Electronics', price: '$3,850.00', sold: '98 Sold', img: '⌚' },
                { id: 3, name: 'Gaming Laptop', cat: 'Electronics', price: '$3,120.00', sold: '76 Sold', img: '💻' },
                { id: 4, name: 'Bluetooth Speaker', cat: 'Electronics', price: '$2,450.00', sold: '65 Sold', img: '🔊' },
              ].map(product => (
                <div key={product.id} className="product-entry-item">
                  <div className="p-img-box">{product.img}</div>
                  <div className="p-info-box">
                    <p className="p-name">{product.name}</p>
                    <p className="p-cat">{product.cat}</p>
                  </div>
                  <div className="p-meta-box">
                    <p className="p-price">{product.price}</p>
                    <p className="p-sold">{product.sold}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Alerts */}
          <div className="glass-card inventory-alerts-card">
            <div className="card-header-flex">
              <h3>Inventory Alerts</h3>
              <button className="view-all-link">View All</button>
            </div>
            <div className="inventory-scroll-list">
              {[
                { name: 'iPhone 14 Pro Max', cat: 'Electronics', stock: '5 Left', status: 'Low Stock', img: '📱' },
                { name: 'Nike Air Max', cat: 'Footwear', stock: '8 Left', status: 'Low Stock', img: '👟' },
                { name: 'Samsung Galaxy Tab', cat: 'Electronics', stock: '0 Left', status: 'Out of Stock', img: '📟' },
                { name: 'Dell XPS 13', cat: 'Laptops', stock: '6 Left', status: 'Low Stock', img: '💻' },
              ].map((item, i) => (
                <div key={i} className="inventory-entry-item">
                  <div className="p-img-box">{item.img}</div>
                  <div className="p-info-box">
                    <p className="p-name">{item.name}</p>
                    <p className="p-cat">{item.cat}</p>
                  </div>
                  <div className="p-status-box">
                    <p className="p-stock" style={{ color: item.stock === '0 Left' ? '#ef4444' : '#f59e0b' }}>{item.stock}</p>
                    <p className="p-status-label">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales by Category */}
          <div className="glass-card category-sales-card">
            <div className="card-header-flex">
              <h3>Sales by Category</h3>
              <div className="card-filter-toggle">
                <button className="filter-tab">This Month</button>
                <ChevronDown size={14} />
              </div>
            </div>
            <div className="donut-chart-box">
              <div className="chart-viz">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="chart-center-label">
                  <p>Total</p>
                  <h4>$24,850</h4>
                  <span className="trend-pos">+24.6%</span>
                </div>
              </div>
              <div className="chart-legend-list">
                {pieData.map((item, i) => (
                  <div key={i} className="legend-entry">
                    <div className="legend-dot" style={{ backgroundColor: item.color }}></div>
                    <div className="legend-info">
                      <p className="l-name">{item.name}</p>
                      <p className="l-val">${item.value.toLocaleString()} ({Math.round(item.value/24850*100)}%)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="quick-actions-grid-v2">
            <button className="q-act-btn-big indigo">
              <Plus size={24} />
              <span>Add Product</span>
            </button>
            <button className="q-act-btn-big emerald">
              <UserPlus size={24} />
              <span>Add User</span>
            </button>
            <button className="q-act-btn-big amber">
              <Tag size={24} />
              <span>Create Promotion</span>
            </button>
            <button className="q-act-btn-big blue">
              <FileText size={24} />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* Bottom Activity Section */}
        <div className="recent-activity-strip">
          <div className="activity-title">
            <h3>Recent Activity</h3>
          </div>
          <div className="activity-list-horizontal">
            <div className="activity-node">
              <div className="node-icon-box blue"><ShoppingCart size={16} /></div>
              <div className="node-text">
                <p>New order #10245</p>
                <span>2 minutes ago</span>
              </div>
            </div>
            <div className="activity-node">
              <div className="node-icon-box green"><TrendingUp size={16} /></div>
              <div className="node-text">
                <p>Product added</p>
                <span>15 minutes ago</span>
              </div>
            </div>
            <div className="activity-node">
              <div className="node-icon-box orange"><User size={16} /></div>
              <div className="node-text">
                <p>User registered</p>
                <span>1 hour ago</span>
              </div>
            </div>
            <div className="activity-node">
              <div className="node-icon-box indigo"><DollarSign size={16} /></div>
              <div className="node-text">
                <p>Payment received</p>
                <span>2 hours ago</span>
              </div>
            </div>
            <div className="activity-node">
              <div className="node-icon-box red"><AlertTriangle size={16} /></div>
              <div className="node-text">
                <p>Low stock alert</p>
                <span>3 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal BrainCircuit Icon
const BrainCircuit = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.105 4 4 0 0 0 7.327-2.316 4 4 0 0 0 2.673-7.559A3 3 0 0 0 12 5Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M6.003 5.125A3 3 0 0 0 12 11"/><path d="M15.327 16.684a4 4 0 0 1-7.327 2.316"/><path d="M14.003 9.125A3 3 0 0 1 12 11"/>
  </svg>
);

export default Overview;

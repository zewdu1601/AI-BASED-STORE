import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  AlertTriangle, 
  UserPlus, 
  RefreshCcw, 
  Target, 
  Plus, 
  Truck, 
  TicketPercent, 
  FileText, 
  Database,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Zap,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  BrainCircuit,
  PieChart as PieIcon,
  BarChart as BarIcon,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const kpis = [
    { label: 'Total Products', value: '1,240', trend: '+12%', up: true, icon: Package, path: '/admin/products', color: '#6366f1' },
    { label: 'Total Orders', value: '452', trend: '+5.4%', up: true, icon: ShoppingCart, path: '/admin/orders', color: '#8b5cf6' },
    { label: 'Total Customers', value: '2,840', trend: '+8.1%', up: true, icon: Users, path: '/admin/customers', color: '#ec4899' },
    { label: 'Total Revenue', value: '$84,200', trend: '+14%', up: true, icon: DollarSign, path: '/admin/payments', color: '#10b981' },
    { label: 'Pending Orders', value: '18', trend: '-2%', up: false, icon: RefreshCcw, path: '/admin/orders', color: '#f59e0b' },
    { label: 'Delivered Orders', value: '384', trend: '+10%', up: true, icon: Truck, path: '/admin/orders', color: '#22d3ee' },
    { label: 'Low Stock Alerts', value: '5', trend: '+1', up: false, icon: AlertTriangle, path: '/admin/inventory', color: '#ef4444' },
    { label: 'New Users Today', value: '12', trend: '+20%', up: true, icon: UserPlus, path: '/admin/users', color: '#a855f7' },
    { label: 'Refund Requests', value: '2', trend: '0%', up: true, icon: RefreshCcw, path: '/admin/orders', color: '#94a3b8' },
    { label: 'AI Recommendation Accuracy', value: '94.2%', trend: '+2.1%', up: true, icon: Target, path: '/admin/recommendations', color: '#f97316' },
  ];

  const salesData = [
    { name: 'Mon', sales: 4000, revenue: 2400 },
    { name: 'Tue', sales: 3000, revenue: 1398 },
    { name: 'Wed', sales: 2000, revenue: 9800 },
    { name: 'Thu', sales: 2780, revenue: 3908 },
    { name: 'Fri', sales: 1890, revenue: 4800 },
    { name: 'Sat', sales: 2390, revenue: 3800 },
    { name: 'Sun', sales: 3490, revenue: 4300 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 400 },
    { name: 'Fashion', value: 300 },
    { name: 'Home', value: 300 },
    { name: 'Health', value: 200 },
  ];

  const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b'];

  const recentOrders = [
    { id: '#ORD-9825', customer: 'David Smith', products: 'iPhone 15, AirPods', qty: 2, amount: 1250.00, payment: 'Success', delivery: 'Out for Delivery', date: '10 mins ago' },
    { id: '#ORD-9821', customer: 'Maria Garcia', products: 'MacBook Air', qty: 1, amount: 999.00, payment: 'Success', delivery: 'Delivered', date: '1 hour ago' },
    { id: '#ORD-9818', customer: 'John Doe', products: 'Smart Watch', qty: 1, amount: 299.00, payment: 'Pending', delivery: 'Processing', date: '3 hours ago' },
  ];

  return (
    <div className="admin-dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1 className="page-title">Executive Dashboard</h1>
          <p className="page-subtitle">Real-time store performance and AI-driven business insights.</p>
        </div>
        
        <div className="quick-actions-panel">
          <button onClick={() => navigate('/admin/products')} className="quick-act-btn"><Plus size={16} /> <span>Product</span></button>
          <button onClick={() => navigate('/admin/users')} className="quick-act-btn"><UserPlus size={16} /> <span>User</span></button>
          <button onClick={() => navigate('/admin/suppliers')} className="quick-act-btn"><Truck size={16} /> <span>Supplier</span></button>
          <button onClick={() => navigate('/admin/promotions')} className="quick-act-btn"><TicketPercent size={16} /> <span>Discount</span></button>
          <button onClick={() => navigate('/admin/reports')} className="quick-act-btn"><FileText size={16} /> <span>Report</span></button>
          <button className="quick-act-btn secondary"><Database size={16} /> <span>Backup</span></button>
        </div>
      </header>

      <div className="dashboard-kpi-grid">
        {kpis.map((kpi, index) => (
          <div key={index} className="glass-card kpi-card-v2" onClick={() => navigate(kpi.path)}>
            <div className="kpi-card-header">
              <div className="kpi-icon-box" style={{ background: `${kpi.color}15`, color: kpi.color }}>
                <kpi.icon size={22} />
              </div>
              <div className={`kpi-trend ${kpi.up ? 'up' : 'down'}`}>
                {kpi.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{kpi.trend}</span>
              </div>
            </div>
            <div className="kpi-card-body">
              <h3 className="kpi-value">{kpi.value}</h3>
              <p className="kpi-label">{kpi.label}</p>
            </div>
            <div className="kpi-sparkline">
              <ResponsiveContainer width="100%" height={30}>
                <AreaChart data={salesData}>
                  <Area type="monotone" dataKey="sales" stroke={kpi.color} fill={`${kpi.color}20`} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-main-grid">
        <div className="dashboard-left-col">
          <div className="glass-card analytics-card large">
            <div className="card-header-flex">
              <h3>Revenue Overview</h3>
              <div className="chart-toggles">
                <button className="chart-tab active">Daily</button>
                <button className="chart-tab">Weekly</button>
                <button className="chart-tab">Monthly</button>
              </div>
            </div>
            <div className="chart-container-large">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ background: 'rgba(13,13,18,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card table-wrapper recent-orders-v2">
            <div className="card-header-flex">
              <h3>Recent Orders</h3>
              <button className="text-btn-sm" onClick={() => navigate('/admin/orders')}>View All Orders <ExternalLink size={14} /></button>
            </div>
            <table className="admin-table compact">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Products</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Delivery</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr key={i}>
                    <td><strong>{order.id}</strong></td>
                    <td>{order.customer}</td>
                    <td><span className="truncate-text">{order.products}</span></td>
                    <td><strong>${order.amount.toFixed(2)}</strong></td>
                    <td><span className={`status-pill ${order.payment.toLowerCase()}`}>{order.payment}</span></td>
                    <td><span className={`status-pill ${order.delivery.toLowerCase().replace(/ /g, '-')}`}>{order.delivery}</span></td>
                    <td>
                      <div className="action-btns">
                        <button className="icon-btn-sm" title="View"><Eye size={14} /></button>
                        <button className="icon-btn-sm" title="Edit"><Edit size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-right-col">
          <div className="glass-card ai-insights-expanded">
            <div className="ai-header-main">
              <BrainCircuit className="ai-icon-glow" size={24} />
              <div>
                <h3>AI Smart Insights</h3>
                <span>Neural Analysis Active</span>
              </div>
            </div>
            <div className="ai-insight-items">
              <div className="ai-insight-box">
                <p>Demand Forecast</p>
                <div className="ai-progress"><div className="ai-progress-fill" style={{ width: '85%' }}></div></div>
                <span>High demand predicted for "Wearables" next week.</span>
              </div>
              <div className="ai-insight-box">
                <p>Trending Products</p>
                <div className="trending-tags">
                  <span className="t-tag">iPhone 15</span>
                  <span className="t-tag">AirPods</span>
                  <span className="t-tag">M3 Mac</span>
                </div>
              </div>
              <div className="ai-insight-box">
                <p>Smart Inventory Suggestion</p>
                <div className="suggestion-pill">Restock "Wireless Mouse" now</div>
              </div>
            </div>
            <button className="ai-full-btn">Open AI Command Center <Zap size={14} /></button>
          </div>

          <div className="glass-card low-stock-panel">
            <div className="card-header-flex">
              <h3>Low Stock Alerts</h3>
              <span className="badge-danger">5 Items</span>
            </div>
            <div className="low-stock-list">
              {[
                { name: 'iPhone 15 Case', stock: 2, min: 10, supplier: 'TechGlobal', img: '📱' },
                { name: 'USB-C Cable', stock: 4, min: 20, supplier: 'EcoCable', img: '🔌' },
              ].map((item, i) => (
                <div key={i} className="stock-alert-item">
                  <div className="s-img-mini">{item.img}</div>
                  <div className="s-info-mini">
                    <p>{item.name}</p>
                    <span>Stock: <strong className="text-danger">{item.stock}</strong> / {item.min}</span>
                  </div>
                  <button className="restock-btn-mini">Restock</button>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card notification-panel-dashboard">
            <div className="card-header-flex">
              <h3>System Notifications</h3>
              <button className="icon-btn-sm"><Clock size={16} /></button>
            </div>
            <div className="dash-notif-list">
              <div className="dash-notif-item unread">
                <div className="n-dot"></div>
                <div className="n-content">
                  <p>New Order #ORD-9825 received.</p>
                  <span>5 mins ago</span>
                </div>
              </div>
              <div className="dash-notif-item">
                <div className="n-dot transparent"></div>
                <div className="n-content">
                  <p>Staff "John" logged in from new IP.</p>
                  <span>2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

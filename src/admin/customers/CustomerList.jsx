import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  ShoppingBag, 
  MessageSquare, 
  AlertCircle, 
  History, 
  Award,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  X,
  TrendingUp,
  Star
} from 'lucide-react';
import adminService from '../../services/adminService';
import './CustomerList.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await adminService.getUsers(); // Fetching users and filtering for customers
      const customersOnly = data.filter(u => u.role === 'Customer' || u.role === 'user');
      setCustomers(customersOnly);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-customers">
      <header className="page-header">
        <div>
          <h1 className="page-title">Customer Management</h1>
          <p className="page-subtitle">Analyze customer behavior, manage profiles, and track loyalty.</p>
        </div>
        <div className="header-actions">
          <div className="loyalty-stat">
            <Award className="text-secondary" size={24} />
            <div>
              <p>Active Loyalty Members</p>
              <strong>1,240</strong>
            </div>
          </div>
        </div>
      </header>

      <div className="glass-card table-controls">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search customers by name, email or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <button className="control-btn"><Filter size={18} /><span>Filters</span></button>
          <button className="control-btn"><Award size={18} /><span>Loyalty Tiers</span></button>
        </div>
      </div>

      <div className="glass-card table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Loyalty Points</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer._id}>
                <td>
                  <div className="customer-info-cell">
                    <div className="customer-avatar">
                      {customer.name.charAt(0)}
                    </div>
                    <div className="customer-meta">
                      <p className="customer-name">{customer.name}</p>
                      <span className="customer-email">{customer.email}</span>
                    </div>
                  </div>
                </td>
                <td>{Math.floor(Math.random() * 20) + 1} Orders</td>
                <td><strong>${(Math.random() * 5000 + 100).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong></td>
                <td>
                  <div className="points-display">
                    <Star size={14} className="text-secondary" />
                    <span>{Math.floor(Math.random() * 1000)} pts</span>
                  </div>
                </td>
                <td>
                  <span className={`status-pill ${customer.isActive !== false ? 'active' : 'inactive'}`}>
                    {customer.isActive !== false ? 'Active' : 'Banned'}
                  </span>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn-sm" title="View Profile" onClick={() => handleViewCustomer(customer)}><Eye size={16} /></button>
                    <button className="icon-btn-sm" title="Orders"><ShoppingBag size={16} /></button>
                    <button className="icon-btn-sm" title="Messages"><MessageSquare size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Profile Modal */}
      {isModalOpen && selectedCustomer && (
        <div className="modal-overlay">
          <div className="glass-card modal-content customer-modal">
            <div className="modal-header">
              <div className="modal-title-area">
                <div className="customer-avatar-lg">{selectedCustomer.name.charAt(0)}</div>
                <div>
                  <h2>{selectedCustomer.name}</h2>
                  <span className="id-badge">ID: {selectedCustomer._id.slice(-6).toUpperCase()}</span>
                </div>
              </div>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>

            <div className="customer-modal-tabs">
              <button className={`modal-tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}><Users size={16} /> Profile</button>
              <button className={`modal-tab ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}><ShoppingBag size={16} /> Orders</button>
              <button className={`modal-tab ${activeTab === 'feedback' ? 'active' : ''}`} onClick={() => setActiveTab('feedback')}><MessageSquare size={16} /> Feedback</button>
              <button className={`modal-tab ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}><History size={16} /> Logs</button>
            </div>

            <div className="customer-modal-body">
              {activeTab === 'profile' && (
                <div className="customer-profile-view">
                  <div className="info-grid-3">
                    <div className="info-card">
                      <Mail size={18} />
                      <div><label>Email</label><p>{selectedCustomer.email}</p></div>
                    </div>
                    <div className="info-card">
                      <Phone size={18} />
                      <div><label>Phone</label><p>+1 (555) 982-3451</p></div>
                    </div>
                    <div className="info-card">
                      <Calendar size={18} />
                      <div><label>Joined</label><p>{new Date(selectedCustomer.createdAt).toLocaleDateString()}</p></div>
                    </div>
                  </div>

                  <div className="loyalty-banner">
                    <div className="loyalty-info">
                      <Award size={32} />
                      <div>
                        <h3>Platinum Member</h3>
                        <p>Currently in top 5% of spenders</p>
                      </div>
                    </div>
                    <div className="loyalty-stats">
                      <div className="l-stat"><strong>2,450</strong><span>Total Points</span></div>
                      <div className="l-stat"><strong>12</strong><span>Redeemed</span></div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="customer-orders-view">
                  <div className="compact-order-list">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="compact-order-item">
                        <div className="order-id-group">
                          <strong>#ORD-982{i}</strong>
                          <span>Feb {10 + i}, 2024</span>
                        </div>
                        <div className="order-price">$120.00</div>
                        <span className="status-pill active">Delivered</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'feedback' && (
                <div className="customer-feedback-view">
                  <div className="feedback-item">
                    <div className="feedback-header">
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill={s <= 4 ? "currentColor" : "none"} />)}
                      </div>
                      <span>2 days ago</span>
                    </div>
                    <p>"Great product quality and fast shipping! Will buy again."</p>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="customer-logs-view">
                  <div className="log-timeline">
                    <div className="log-item">
                      <div className="log-dot"></div>
                      <div className="log-content">
                        <p>Logged in via <strong>iPhone 15</strong></p>
                        <span>Today, 10:45 AM</span>
                      </div>
                    </div>
                    <div className="log-item">
                      <div className="log-dot"></div>
                      <div className="log-content">
                        <p>Added <strong>Smart Watch v2</strong> to wishlist</p>
                        <span>Yesterday, 4:20 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="control-btn danger"><AlertCircle size={18} /> Flag Account</button>
              <button className="save-btn" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;

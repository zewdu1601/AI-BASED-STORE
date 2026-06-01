import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Truck, Plus, Search, Filter, Mail, Phone, 
  MapPin, Star, History, FileText, CheckCircle, 
  X, MoreVertical, ChevronRight, TrendingUp, 
  Package, Building, Activity, Box, ClipboardList,
  AlertCircle, RefreshCw, BarChart3
} from 'lucide-react';
import './SupplierManager.css';

const SupplierManager = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialTab = () => {
    if (location.pathname.includes('/requests')) return 'Supply Requests';
    return 'Supplier List';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [location.pathname]);

  const suppliers = [
    { id: 1, name: 'TechGlobal Inc.', contact: 'Alice Wang', category: 'Electronics', status: 'Active', rating: 4.8, location: 'Shenzhen, CN' },
    { id: 2, name: 'FashionFlow Ltd.', contact: 'Marcus Reed', category: 'Fashion', status: 'Active', rating: 4.5, location: 'Milan, IT' },
    { id: 3, name: 'EcoHome Solutions', contact: 'Elena Petrova', category: 'Home', status: 'Pending', rating: 4.2, location: 'Berlin, DE' },
  ];

  const requests = [
    { id: 'REQ-001', supplier: 'TechGlobal', items: '500x OLED Panels', status: 'Pending', date: '2026-05-14', urgency: 'High' },
    { id: 'REQ-002', supplier: 'FashionFlow', items: '1200x Summer Vests', status: 'Approved', date: '2026-05-12', urgency: 'Normal' },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'Supply Requests') navigate('/admin/suppliers/requests');
    else if (tab === 'Delivery Tracking') navigate('/admin/suppliers/tracking');
    else if (tab === 'Supplier Reports') navigate('/admin/reports/suppliers');
    else navigate('/admin/suppliers');
  };

  const renderContent = () => {
    if (loading) return (
      <div className="gov-loader-container">
        <div className="loader-v2"></div>
        <p>Syncing Corporate Partner Data...</p>
      </div>
    );

    if (activeTab === 'Supply Requests') {
      return (
        <div className="supplier-gov-grid fade-in">
          <div className="glass-card requests-overview-v4">
            <div className="card-header-v4">
              <ClipboardList size={20} />
              <h3>Procurement Requests</h3>
              <span className="live-indicator">ACTIVE QUEUE</span>
            </div>
            <div className="requests-list-v4">
              {requests.map(req => (
                <div key={req.id} className="request-item-v4">
                  <div className="req-meta">
                    <span className="req-id">{req.id}</span>
                    <p className="req-supplier">{req.supplier}</p>
                    <p className="req-items">{req.items}</p>
                  </div>
                  <div className="req-status-area">
                    <span className={`urgency-pill ${req.urgency.toLowerCase()}`}>{req.urgency}</span>
                    <span className={`status-pill-v4 ${req.status.toLowerCase()}`}>{req.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card procurement-stats-v4">
            <div className="card-header-v4">
              <TrendingUp size={20} />
              <h3>Supply Analytics</h3>
            </div>
            <div className="p-stat-box-v4">
              <div className="p-s-item"><span>Pending Volume</span><strong>2.4k Units</strong></div>
              <div className="p-s-item"><span>Avg. Lead Time</span><strong>4.2 Days</strong></div>
              <button className="gov-action-btn primary full mt-4">Initiate Batch Request</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="supplier-list-view fade-in">
        <div className="gov-filter-suite-v4">
          <div className="search-box-v4">
            <Search size={18} />
            <input type="text" placeholder="Search partners by name, category or region..." />
          </div>
          <div className="filter-actions-v4">
            <button className="hub-btn"><Filter size={16} /> Filters</button>
            <button className="hub-btn primary" onClick={() => navigate('/admin/suppliers/add')}><Plus size={16} /> Onboard Partner</button>
          </div>
        </div>

        <div className="supplier-table-card glass-card">
          <table className="gov-table-v4">
            <thead>
              <tr>
                <th>Corporate Partner</th>
                <th>Vertical</th>
                <th>Operational Status</th>
                <th>Reliability</th>
                <th className="text-right">Governance</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="actor-profile-v4">
                      <div className="actor-avatar-v4">{s.name.charAt(0)}</div>
                      <div className="actor-info-v4">
                        <span className="actor-name-v4">{s.name}</span>
                        <span className="actor-email-v4">{s.location}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="category-pill-v4">{s.category}</span></td>
                  <td>
                    <div className={`status-pill-v4 ${s.status.toLowerCase()}`}>
                      {s.status === 'Active' ? <CheckCircle size={14} /> : <Activity size={14} />}
                      <span>{s.status}</span>
                    </div>
                  </td>
                  <td>
                    <div className="rating-pill-v4">
                      <Star size={12} fill="currentColor" />
                      <span>{s.rating}</span>
                    </div>
                  </td>
                  <td className="text-right">
                    <div className="action-hub-v4">
                      <button className="action-hub-btn"><FileText size={16} /></button>
                      <button className="action-hub-btn"><Mail size={16} /></button>
                      <button className="action-hub-btn"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'Supplier List', label: 'Partner Directory', path: '/admin/suppliers' },
    { id: 'Supply Requests', label: 'Procurement Requests', path: '/admin/suppliers/requests' },
    { id: 'Delivery Tracking', label: 'Logistics Tracking', path: '/admin/suppliers/tracking' },
    { id: 'Supplier Reports', label: 'Supply Chain Reports', path: '/admin/reports/suppliers' }
  ];

  return (
    <div className="supplier-governance-container fade-in">
      <header className="supplier-gov-header">
        <div className="header-title-v4">
          <div className="icon-hub-v4"><Building size={28} /></div>
          <div className="text-hub-v4">
            <h1>Corporate Partner Oversight</h1>
            <p>Unified management of supply chain partners, logistics, and procurement intelligence.</p>
          </div>
        </div>
        <div className="header-stats-mini">
          <div className="h-mini-stat"><span>Active Partners</span><strong>{suppliers.length}</strong></div>
          <div className="h-mini-stat"><span>Active Shipments</span><strong>8</strong></div>
        </div>
      </header>

      <div className="gov-tabs-suite">
        {tabs.map(tab => (
          <button 
            key={tab.id} 
            className={`gov-tab-v4 ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="gov-body-v4">
        {renderContent()}
      </div>
    </div>
  );
};

export default SupplierManager;

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Calendar, 
  Zap, 
  BarChart, 
  Trash2, 
  Edit, 
  X,
  MousePointer2,
  Printer
} from 'lucide-react';
import './PromotionManager.css';

const PromotionManager = () => {
  const [promotions, setPromotions] = useState([
    { id: 1, name: 'Summer Electronics Sale', code: 'SUMMER24', discount: '20%', type: 'Percentage', usage: '124/500', status: 'ACTIVE' },
    { id: 2, name: 'First Order Discount', code: 'WELCOME', discount: '$10', type: 'Fixed', usage: '857/∞', status: 'ACTIVE' },
    { id: 3, name: 'Holiday Bundle', code: 'FESTIVE', discount: '15%', type: 'Bundle', usage: '0/200', status: 'UPCOMING' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="promotion-governance-hub">
      <header className="governance-header">
        <div className="header-text">
          <h1 className="governance-title">Promotion & Campaign Manager</h1>
          <p className="governance-subtitle">Create discount codes, manage seasonal sales, and track marketing ROI.</p>
        </div>
        <button className="new-promo-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          <span>New Promotion</span>
        </button>
      </header>

      <div className="metrics-grid-v5">
        <div className="metric-card-v5 glass">
          <div className="metric-icon-box white">
            <Zap size={24} />
          </div>
          <div className="metric-content">
            <p>Active Campaigns</p>
            <h3>8</h3>
          </div>
        </div>
        
        <div className="metric-card-v5 glass">
          <div className="metric-icon-box">
            <MousePointer2 size={24} />
          </div>
          <div className="metric-content">
            <p>Total Redemptions</p>
            <h3>1,420</h3>
          </div>
        </div>

        <div className="metric-card-v5 glass">
          <div className="metric-icon-box">
            <BarChart size={24} />
          </div>
          <div className="metric-content">
            <p>Revenue from Promos</p>
            <h3>$12,450</h3>
          </div>
        </div>
      </div>

      <div className="glass-card governance-controls">
        <div className="search-box-v5">
          <Search size={18} />
          <input type="text" placeholder="Search promotions by name or code..." />
        </div>
        <button className="schedule-btn">
          <Calendar size={18} />
          <span>Schedule</span>
        </button>
      </div>

      <div className="glass-card table-container-v5">
        <table className="governance-table">
          <thead>
            <tr>
              <th>CAMPAIGN NAME</th>
              <th>PROMO CODE</th>
              <th>DISCOUNT</th>
              <th>TYPE</th>
              <th>USAGE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((p) => (
              <tr key={p.id}>
                <td className="campaign-name">{p.name}</td>
                <td><span className="promo-badge">{p.code}</span></td>
                <td className="discount-cell">{p.discount}</td>
                <td>{p.type}</td>
                <td>
                  <div className="usage-progress-container">
                    <span className="usage-text">{p.usage}</span>
                    <div className="progress-bg">
                      <div 
                        className="progress-fill" 
                        style={{ width: p.usage.includes('∞') ? '80%' : `${(parseInt(p.usage.split('/')[0])/parseInt(p.usage.split('/')[1]))*100}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`status-v5 ${p.status.toLowerCase()}`}>
                    {p.status}
                  </span>
                </td>
                <td>
                  <div className="action-hub-v5">
                    <button className="hub-icon-btn"><Edit size={16} /></button>
                    <button className="hub-icon-btn"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Promotion Modal Placeholder */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="glass-card modal-content-v5">
            <div className="modal-header">
              <h2>Launch New Campaign</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            {/* Modal Body */}
            <div className="modal-footer">
              <button onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionManager;

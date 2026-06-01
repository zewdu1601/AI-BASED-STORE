import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Download, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownLeft,
  Settings,
  MoreVertical,
  BarChart3
} from 'lucide-react';
import './PaymentManager.css';

const PaymentManager = () => {
  const transactions = [
    { id: 1, type: 'Inflow', customer: 'David Smith', method: 'Stripe', amount: 1250.00, status: 'Success', date: '10 mins ago' },
    { id: 2, type: 'Outflow', customer: 'TechGlobal Inc.', method: 'Bank Transfer', amount: 4200.00, status: 'Pending', date: '1 hour ago' },
    { id: 3, type: 'Inflow', customer: 'Maria Garcia', method: 'PayPal', amount: 450.00, status: 'Success', date: '3 hours ago' },
    { id: 4, type: 'Inflow', customer: 'John Doe', method: 'Crypto', amount: 890.00, status: 'Failed', date: 'Yesterday' },
  ];

  return (
    <div className="admin-payments">
      <header className="page-header">
        <div>
          <h1 className="page-title">Financial & Payment Manager</h1>
          <p className="page-subtitle">Track revenue, manage gateways, and monitor transaction security.</p>
        </div>
        <div className="header-actions">
          <button className="add-btn primary"><Settings size={20} /><span>Gateways</span></button>
        </div>
      </header>

      <div className="glass-card payment-metrics-grid">
        <div className="pay-metric">
          <div className="pm-icon inflow"><ArrowUpRight size={20} /></div>
          <div className="pm-info">
            <p>Total Revenue</p>
            <h3>$482,450</h3>
          </div>
        </div>
        <div className="pay-metric">
          <div className="pm-icon outflow"><ArrowDownLeft size={20} /></div>
          <div className="pm-info">
            <p>Total Payouts</p>
            <h3>$124,200</h3>
          </div>
        </div>
        <div className="pay-metric">
          <div className="pm-icon secondary"><ShieldCheck size={20} /></div>
          <div className="pm-info">
            <p>Fraud Prevention</p>
            <h3>99.9%</h3>
          </div>
        </div>
        <div className="pay-metric">
          <div className="pm-icon"><BarChart3 size={20} /></div>
          <div className="pm-info">
            <p>Avg. Transaction</p>
            <h3>$145.20</h3>
          </div>
        </div>
      </div>

      <div className="glass-card table-controls">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search transactions by ID or customer..." />
        </div>
        <div className="filter-group">
          <button className="control-btn"><Download size={18} /><span>Export Statements</span></button>
        </div>
      </div>

      <div className="glass-card table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Customer / Entity</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>
                  <div className={`type-pill ${t.type.toLowerCase()}`}>
                    {t.type === 'Inflow' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                    <span>{t.type}</span>
                  </div>
                </td>
                <td><strong>{t.customer}</strong></td>
                <td>
                  <div className="method-cell">
                    <CreditCard size={14} />
                    <span>{t.method}</span>
                  </div>
                </td>
                <td><strong className={t.type === 'Inflow' ? 'text-positive' : 'text-danger'}>
                  {t.type === 'Inflow' ? '+' : '-'}${t.amount.toFixed(2)}
                </strong></td>
                <td>
                  <span className={`status-pill ${t.status.toLowerCase()}`}>
                    {t.status}
                  </span>
                </td>
                <td>{t.date}</td>
                <td>
                  <button className="icon-btn-sm"><Search size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="gateways-overview">
        <div className="glass-card gateway-card">
          <div className="gw-header">
            <div className="gw-logo stripe">S</div>
            <div><h4>Stripe</h4><span>Live Mode</span></div>
            <div className="status-dot-text active"><div className="s-dot"></div></div>
          </div>
          <div className="gw-stats">
            <div className="gw-stat"><span>Fee</span><strong>2.9%</strong></div>
            <div className="gw-stat"><span>Payout</span><strong>Daily</strong></div>
          </div>
        </div>
        <div className="glass-card gateway-card">
          <div className="gw-header">
            <div className="gw-logo paypal">P</div>
            <div><h4>PayPal</h4><span>Live Mode</span></div>
            <div className="status-dot-text active"><div className="s-dot"></div></div>
          </div>
          <div className="gw-stats">
            <div className="gw-stat"><span>Fee</span><strong>3.4%</strong></div>
            <div className="gw-stat"><span>Payout</span><strong>Instant</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentManager;

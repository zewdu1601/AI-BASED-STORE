import React from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, FileText, Printer } from 'lucide-react';

const OrderManager = () => {
  const orders = [
    { id: '#ORD-9901', customer: 'John Doe', items: 3, total: '$299.00', status: 'Pending', type: 'Online' },
    { id: '#ORD-9902', customer: 'Jane Smith', items: 1, total: '$89.00', status: 'Processing', type: 'Pickup' },
    { id: '#ORD-9903', customer: 'Robert Brown', items: 5, total: '$1,240.00', status: 'Confirmed', type: 'Delivery' },
    { id: '#ORD-9904', customer: 'Emma Wilson', items: 2, total: '$45.00', status: 'Cancelled', type: 'Online' },
  ];

  return (
    <div className="order-manager-content fade-in">
      <div className="pane-header">
        <div className="h-left">
          <h2>Order Management</h2>
          <p>Process customer orders, verify pickups, and handle returns.</p>
        </div>
        <div className="h-right">
          <button className="btn-secondary"><Printer size={18} /> Batch Print Invoices</button>
        </div>
      </div>

      <div className="glass-card controls-bar mt-6">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search by Order ID or Customer Name..." />
        </div>
        <div className="filter-box">
          <Filter size={18} />
          <select>
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Ready for Pickup</option>
          </select>
        </div>
      </div>

      <div className="glass-card table-container mt-6">
        <table className="staff-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td><strong>{order.id}</strong></td>
                <td>{order.customer}</td>
                <td><span className="type-tag">{order.type}</span></td>
                <td>{order.total}</td>
                <td>
                  <span className={`status-pill ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="action-row">
                    <button className="icon-btn-sm" title="View Details"><Eye size={16} /></button>
                    <button className="icon-btn-sm success" title="Confirm Order"><CheckCircle size={16} /></button>
                    <button className="icon-btn-sm danger" title="Cancel Order"><XCircle size={16} /></button>
                    <button className="icon-btn-sm" title="Generate Invoice"><FileText size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .pane-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .h-left h2 { font-size: 1.75rem; margin-bottom: 0.25rem; }
        .h-left p { color: var(--text-muted); font-size: 0.95rem; }

        .controls-bar { display: flex; gap: 1.5rem; padding: 1rem 1.5rem; }
        .search-box { flex: 1; display: flex; align-items: center; gap: 0.75rem; }
        .search-box input { background: transparent; border: none; color: white; width: 100%; outline: none; }
        .filter-box { display: flex; align-items: center; gap: 0.75rem; border-left: 1px solid var(--border-color); padding-left: 1.5rem; }
        .filter-box select { background: transparent; border: none; color: var(--text-muted); outline: none; font-weight: 700; cursor: pointer; }

        .type-tag { font-size: 0.75rem; font-weight: 700; color: var(--accent); background: rgba(34, 211, 238, 0.1); padding: 0.2rem 0.6rem; border-radius: 6px; }
        .action-row { display: flex; gap: 0.5rem; }
        .btn-secondary { display: flex; align-items: center; gap: 0.6rem; background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem 1.25rem; border-radius: 10px; font-weight: 700; font-size: 0.85rem; }
      `}</style>
    </div>
  );
};

export default OrderManager;

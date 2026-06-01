import React from 'react';
import { ClipboardList, Eye, FileCheck, FileX, Download, Clock, DollarSign } from 'lucide-react';

const OrderHandling = () => {
  const purchaseOrders = [
    { id: '#PO-5501', date: 'Oct 24, 2023', items: 12, total: '$14,200', status: 'Pending' },
    { id: '#PO-5502', date: 'Oct 23, 2023', items: 5, total: '$4,500', status: 'Accepted' },
    { id: '#PO-5503', date: 'Oct 22, 2023', items: 25, total: '$32,000', status: 'Shipped' },
    { id: '#PO-5504', date: 'Oct 20, 2023', items: 3, total: '$1,200', status: 'Rejected' },
  ];

  return (
    <div className="order-handling-content fade-in">
      <div className="pane-header mb-8 flex justify-between items-end">
        <div>
          <h2>Purchase Order Management</h2>
          <p>View, accept, or reject official purchase orders from store management.</p>
        </div>
        <button className="flex items-center gap-2 bg-main p-3 rounded-xl border border-color font-bold text-sm">
          <Download size={18} /> Export All Orders
        </button>
      </div>

      <div className="orders-table-container glass-card p-6">
        <table className="staff-table">
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Order Date</th>
              <th>Item Count</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((po, i) => (
              <tr key={i}>
                <td><strong>{po.id}</strong></td>
                <td>{po.date}</td>
                <td>{po.items} Items</td>
                <td><span className="font-bold text-accent">{po.total}</span></td>
                <td>
                  <span className={`status-pill ${po.status.toLowerCase()}`}>
                    {po.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="icon-btn-sm" title="View Details"><Eye size={16} /></button>
                    {po.status === 'Pending' && (
                      <>
                        <button className="icon-btn-sm success" title="Accept PO"><FileCheck size={16} /></button>
                        <button className="icon-btn-sm danger" title="Reject PO"><FileX size={16} /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex items-center gap-4">
          <div className="p-4 bg-blue-500/10 text-blue-500 rounded-xl"><Clock size={24} /></div>
          <div><p className="text-xs font-bold text-muted uppercase">Avg Response Time</p><h4 className="text-xl font-bold">2.4 Hours</h4></div>
        </div>
        <div className="glass-card p-6 flex items-center gap-4">
          <div className="p-4 bg-green-500/10 text-green-500 rounded-xl"><FileCheck size={24} /></div>
          <div><p className="text-xs font-bold text-muted uppercase">Acceptance Rate</p><h4 className="text-xl font-bold">94.2%</h4></div>
        </div>
        <div className="glass-card p-6 flex items-center gap-4">
          <div className="p-4 bg-accent/10 text-accent rounded-xl"><DollarSign size={24} /></div>
          <div><p className="text-xs font-bold text-muted uppercase">Outstanding POs</p><h4 className="text-xl font-bold">$42,500</h4></div>
        </div>
      </div>

      <style>{`
        .status-pill.pending { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .status-pill.accepted { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-pill.shipped { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .status-pill.rejected { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
      `}</style>
    </div>
  );
};

export default OrderHandling;

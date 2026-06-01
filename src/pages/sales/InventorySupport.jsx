import React from 'react';
import { Package, AlertTriangle, ArrowUpRight, BarChart, RefreshCcw, Search } from 'lucide-react';

const InventorySupport = () => {
  const stockItems = [
    { name: 'Smart Watch Pro', sku: 'SW-101', stock: 2, status: 'Low Stock', price: '$199' },
    { name: 'Bluetooth Headphones', sku: 'BH-202', stock: 45, status: 'In Stock', price: '$89' },
    { name: '4K Action Camera', sku: 'AC-303', stock: 5, status: 'Low Stock', price: '$299' },
    { name: 'Wireless Mouse', sku: 'WM-404', stock: 0, status: 'Out of Stock', price: '$25' },
  ];

  return (
    <div className="inventory-support-content fade-in">
      <div className="pane-header mb-8">
        <h2>Inventory Support</h2>
        <p>Monitor product stock, report low items, and coordinate restocking.</p>
      </div>

      <div className="inventory-stats-row mb-8">
        <div className="glass-card i-stat">
          <div className="i-icon"><Package size={24} /></div>
          <div><p>Total SKUs</p><h3>1,284</h3></div>
        </div>
        <div className="glass-card i-stat warning">
          <div className="i-icon"><AlertTriangle size={24} /></div>
          <div><p>Low Stock Items</p><h3>18</h3></div>
        </div>
        <div className="glass-card i-stat danger">
          <div className="i-icon"><AlertTriangle size={24} /></div>
          <div><p>Out of Stock</p><h3>4</h3></div>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="section-header mb-6">
          <h3><BarChart size={20} /> Stock Availability Monitor</h3>
          <div className="search-box-sm">
            <Search size={16} />
            <input type="text" placeholder="Filter by name or SKU..." />
          </div>
        </div>

        <table className="staff-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Stock Level</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((item, i) => (
              <tr key={i}>
                <td><strong>{item.name}</strong></td>
                <td><code className="sku-tag">{item.sku}</code></td>
                <td>{item.stock} Units</td>
                <td>{item.price}</td>
                <td>
                  <span className={`status-pill ${item.status.toLowerCase().replace(/ /g, '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="outline-btn-xs"><RefreshCcw size={14} /> Request Restock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .inventory-stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .i-stat { padding: 1.5rem; display: flex; align-items: center; gap: 1.25rem; }
        .i-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(99, 102, 241, 0.1); color: var(--primary); display: flex; align-items: center; justify-content: center; }
        .i-stat.warning .i-icon { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
        .i-stat.danger .i-icon { background: rgba(239, 68, 68, 0.1); color: var(--danger); }
        .i-stat p { font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem; }
        .i-stat h3 { font-size: 1.75rem; font-weight: 800; }

        .search-box-sm { display: flex; align-items: center; gap: 0.75rem; background: var(--bg-main); padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--border-color); width: 300px; }
        .search-box-sm input { background: transparent; border: none; color: white; font-size: 0.85rem; outline: none; }
        .sku-tag { background: rgba(255,255,255,0.05); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem; color: var(--accent); }
        .outline-btn-xs { background: transparent; border: 1px solid var(--border-color); color: var(--text-main); font-size: 0.7rem; font-weight: 700; padding: 0.4rem 0.8rem; border-radius: 6px; display: flex; align-items: center; gap: 0.4rem; }
        .status-pill.low-stock { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
        .status-pill.out-of-stock { background: rgba(239, 68, 68, 0.1); color: var(--danger); }
      `}</style>
    </div>
  );
};

export default InventorySupport;

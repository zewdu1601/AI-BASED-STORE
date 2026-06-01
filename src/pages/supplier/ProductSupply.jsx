import React from 'react';
import { Search, Filter, Plus, Edit2, CheckCircle, Package, ArrowUpRight } from 'lucide-react';

const ProductSupply = () => {
  const products = [
    { id: 'SKU-001', name: 'Smart Watch Pro', stock: 450, price: '$120.00', status: 'In Stock' },
    { id: 'SKU-002', name: 'Bluetooth Headphones', stock: 120, price: '$65.00', status: 'Low Stock' },
    { id: 'SKU-003', name: '4K Action Camera', stock: 0, price: '$180.00', status: 'Out of Stock' },
  ];

  return (
    <div className="product-supply-content fade-in">
      <div className="pane-header mb-8">
        <div className="h-left">
          <h2>Product Supply Management</h2>
          <p>Supply products, manage inventory levels, and update wholesale availability.</p>
        </div>
        <div className="h-right">
          <button className="btn-primary flex items-center gap-2"><Plus size={18} /> Supply New Product</button>
        </div>
      </div>

      <div className="glass-card controls-bar mb-6 p-4 flex gap-4">
        <div className="search-box flex-1 flex items-center gap-3 bg-main p-3 rounded-xl border border-color">
          <Search size={18} className="text-muted" />
          <input type="text" placeholder="Search by SKU or Product Name..." className="bg-transparent border-none outline-none text-main flex-1" />
        </div>
        <div className="filter-box flex items-center gap-3 bg-main p-3 rounded-xl border border-color">
          <Filter size={18} className="text-muted" />
          <select className="bg-transparent border-none outline-none text-main cursor-pointer font-bold">
            <option>All Statuses</option>
            <option>In Stock</option>
            <option>Low Stock</option>
          </select>
        </div>
      </div>

      <div className="glass-card table-wrapper p-6">
        <table className="staff-table">
          <thead>
            <tr>
              <th>SKU ID</th>
              <th>Product Name</th>
              <th>Supply Quantity</th>
              <th>Wholesale Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td><code className="sku-tag">{p.id}</code></td>
                <td><strong>{p.name}</strong></td>
                <td>{p.stock} Units</td>
                <td>{p.price}</td>
                <td>
                  <span className={`status-pill ${p.status.toLowerCase().replace(/ /g, '-')}`}>
                    {p.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="icon-btn-sm" title="Edit Supply"><Edit2 size={16} /></button>
                    <button className="icon-btn-sm success" title="Confirm Inventory"><CheckCircle size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .sku-tag { background: rgba(34, 211, 238, 0.1); color: var(--accent); padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700; font-size: 0.8rem; }
        .status-pill.in-stock { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-pill.low-stock { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .status-pill.out-of-stock { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .btn-primary { background: var(--accent); color: white; padding: 0.75rem 1.5rem; border-radius: 12px; font-weight: 800; box-shadow: 0 4px 15px rgba(34, 211, 238, 0.3); }
      `}</style>
    </div>
  );
};

export default ProductSupply;

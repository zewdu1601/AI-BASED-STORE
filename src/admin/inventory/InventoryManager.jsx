import React, { useState, useEffect } from 'react';
import { 
  Database, 
  AlertTriangle, 
  Warehouse, 
  Barcode, 
  Truck, 
  FileText, 
  Search, 
  Filter, 
  ArrowRight, 
  RotateCcw,
  Plus,
  Package,
  TrendingDown,
  ChevronRight
} from 'lucide-react';
import adminService from '../../services/adminService';
import './InventoryManager.css';

const InventoryManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('monitoring');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const data = await adminService.getProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setLoading(false);
    }
  };

  const lowStockProducts = products.filter(p => p.stock < 10);

  return (
    <div className="admin-inventory">
      <header className="page-header">
        <div>
          <h1 className="page-title">Inventory Management</h1>
          <p className="page-subtitle">Monitor stock levels, manage warehouses, and coordinate restocking.</p>
        </div>
        <div className="header-actions">
          <button className="add-btn"><Plus size={20} /><span>Restock Request</span></button>
        </div>
      </header>

      <div className="glass-card inventory-metrics">
        <div className="metric-item">
          <Database className="text-primary" size={24} />
          <div><p>Total SKUs</p><strong>{products.length}</strong></div>
        </div>
        <div className="metric-item">
          <AlertTriangle className="text-danger" size={24} />
          <div><p>Low Stock Items</p><strong>{lowStockProducts.length}</strong></div>
        </div>
        <div className="metric-item">
          <Warehouse className="text-secondary" size={24} />
          <div><p>Warehouse Capacity</p><strong>74%</strong></div>
        </div>
        <div className="metric-item">
          <RotateCcw className="text-positive" size={24} />
          <div><p>Incoming Shipments</p><strong>12</strong></div>
        </div>
      </div>

      <div className="glass-card inventory-tabs">
        <button className={`inv-tab-btn ${activeTab === 'monitoring' ? 'active' : ''}`} onClick={() => setActiveTab('monitoring')}><Database size={18} /> Stock Monitoring</button>
        <button className={`inv-tab-btn ${activeTab === 'alerts' ? 'active' : ''}`} onClick={() => setActiveTab('alerts')}><AlertTriangle size={18} /> Low Stock Alerts</button>
        <button className={`inv-tab-btn ${activeTab === 'warehouse' ? 'active' : ''}`} onClick={() => setActiveTab('warehouse')}><Warehouse size={18} /> Warehouse Tracking</button>
        <button className={`inv-tab-btn ${activeTab === 'barcode' ? 'active' : ''}`} onClick={() => setActiveTab('barcode')}><Barcode size={18} /> Barcode Management</button>
      </div>

      <div className="inventory-content">
        {activeTab === 'monitoring' && (
          <div className="glass-card table-wrapper">
            <div className="table-header-custom">
              <h3>Live Stock Levels</h3>
              <div className="search-box-sm">
                <Search size={16} />
                <input type="text" placeholder="Filter inventory..." />
              </div>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>SKU Code</th>
                  <th>Current Stock</th>
                  <th>Warehouse Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <div className="p-cell">
                        <div className="p-icon"><Package size={18} /></div>
                        <div><p>{p.name}</p><span>{p.category}</span></div>
                      </div>
                    </td>
                    <td><code>{p._id.slice(-8).toUpperCase()}</code></td>
                    <td>
                      <div className="stock-level-group">
                        <strong>{p.stock}</strong>
                        <div className="stock-meter"><div className="stock-meter-fill" style={{ width: `${Math.min(p.stock, 100)}%`, backgroundColor: p.stock < 10 ? '#ef4444' : '#10b981' }}></div></div>
                      </div>
                    </td>
                    <td>Zone B, Shelf 4</td>
                    <td><span className={`status-dot-text ${p.stock > 0 ? 'active' : 'inactive'}`}>{p.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></td>
                    <td><button className="icon-btn-sm"><ArrowRight size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="alerts-grid">
            {lowStockProducts.length > 0 ? lowStockProducts.map(p => (
              <div key={p._id} className="glass-card alert-card">
                <div className="alert-header">
                  <TrendingDown className="text-danger" size={24} />
                  <span className="stock-badge">Stock: {p.stock}</span>
                </div>
                <h4>{p.name}</h4>
                <p>Inventory level is critical. Recommended restock: 50 units.</p>
                <div className="alert-actions">
                  <button className="restock-btn-sm">Order from Supplier</button>
                  <button className="dismiss-btn-sm">Dismiss</button>
                </div>
              </div>
            )) : <p className="empty-state">No low stock alerts at this time.</p>}
          </div>
        )}

        {activeTab === 'warehouse' && (
          <div className="warehouse-view">
            <div className="warehouse-grid">
              {[1, 2, 3, 4].map(w => (
                <div key={w} className="glass-card warehouse-card">
                  <div className="w-header">
                    <Warehouse size={20} />
                    <h4>Main Warehouse - Sector {w}</h4>
                  </div>
                  <div className="w-body">
                    <div className="w-stat"><span>Occupancy</span><strong>{40 + w * 10}%</strong></div>
                    <div className="w-stat"><span>Last Audit</span><strong>2 days ago</strong></div>
                  </div>
                  <button className="w-details-btn">View Inventory Map <ChevronRight size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'barcode' && (
          <div className="glass-card barcode-center">
            <Barcode size={48} className="text-muted" />
            <h3>Barcode Management System</h3>
            <p>Generate, print, and scan barcodes for seamless inventory tracking.</p>
            <div className="barcode-actions">
              <button className="save-btn">Generate Bulk Barcodes</button>
              <button className="cancel-btn">Configure Scanner</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryManager;

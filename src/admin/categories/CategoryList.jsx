import React, { useState } from 'react';
import { 
  Tags, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Layers, 
  Eye, 
  ChevronRight,
  MoreVertical,
  X,
  Package,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', slug: 'electronics', count: 124, status: 'Active' },
    { id: 2, name: 'Fashion', slug: 'fashion', count: 85, status: 'Active' },
    { id: 3, name: 'Home & Garden', slug: 'home-garden', count: 62, status: 'Inactive' },
    { id: 4, name: 'Health & Beauty', slug: 'health-beauty', count: 45, status: 'Active' },
    { id: 5, name: 'Sports', slug: 'sports', count: 38, status: 'Active' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleOpenModal = (category = null) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="admin-categories">
      <header className="page-header">
        <div>
          <h1 className="page-title">Category Management</h1>
          <p className="page-subtitle">Organize products into intuitive hierarchies and segments.</p>
        </div>
        <button className="add-btn" onClick={() => handleOpenModal()}>
          <Plus size={20} />
          <span>Create Category</span>
        </button>
      </header>

      <div className="glass-card categories-stats">
        <div className="cat-stat-box">
          <Layers className="text-primary" size={24} />
          <div><p>Total Categories</p><strong>{categories.length}</strong></div>
        </div>
        <div className="cat-stat-box">
          <Package className="text-secondary" size={24} />
          <div><p>Top Performing</p><strong>Electronics</strong></div>
        </div>
        <div className="cat-stat-box">
          <CheckCircle className="text-positive" size={24} />
          <div><p>Active Segments</p><strong>4</strong></div>
        </div>
      </div>

      <div className="glass-card table-controls">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search categories by name or slug..." />
        </div>
        <div className="filter-group">
          <button className="control-btn"><Layers size={18} /><span>View Hierarchy</span></button>
        </div>
      </div>

      <div className="glass-card table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Slug</th>
              <th>Product Count</th>
              <th>Status</th>
              <th>Trend</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>
                  <div className="category-info-cell">
                    <div className="cat-icon-thumb"><Tags size={18} /></div>
                    <strong>{cat.name}</strong>
                  </div>
                </td>
                <td><code>/{cat.slug}</code></td>
                <td>{cat.count} Items</td>
                <td>
                  <span className={`status-pill ${cat.status.toLowerCase()}`}>
                    {cat.status}
                  </span>
                </td>
                <td>
                  <div className="trend-preview">
                    <div className="bar" style={{ height: '40%' }}></div>
                    <div className="bar" style={{ height: '60%' }}></div>
                    <div className="bar" style={{ height: '90%' }}></div>
                    <div className="bar" style={{ height: '75%' }}></div>
                  </div>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn-sm" onClick={() => handleOpenModal(cat)}><Edit size={16} /></button>
                    <button className="icon-btn-sm delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Category Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="glass-card modal-content category-modal">
            <div className="modal-header">
              <h2>{editingCategory ? 'Edit Category' : 'Create New Category'}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <form className="category-form">
              <div className="form-group">
                <label>Category Name</label>
                <input type="text" placeholder="e.g. Smart Home" defaultValue={editingCategory?.name} />
              </div>
              <div className="form-group">
                <label>URL Slug</label>
                <input type="text" placeholder="e.g. smart-home" defaultValue={editingCategory?.slug} />
              </div>
              <div className="form-group">
                <label>Parent Category</label>
                <select>
                  <option>None (Top Level)</option>
                  {categories.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select defaultValue={editingCategory?.status || 'Active'}>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Hidden</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>Category Description</label>
                <textarea rows="3" placeholder="Describe the segment..."></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="button" className="save-btn">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;

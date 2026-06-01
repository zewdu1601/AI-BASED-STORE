import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Tag,
  Star,
  X,
  Upload,
  BarChart,
  Package,
  Layers
} from 'lucide-react';
import adminService from '../../services/adminService';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    discountPrice: '',
    stock: '',
    description: '',
    brand: '',
    tags: '',
    status: 'active'
  });

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Health & Beauty',
    'Toys & Hobbies',
    'Sports & Outdoors',
    'Automotive'
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await adminService.getProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        discountPrice: product.discountPrice || '',
        stock: product.stock,
        description: product.description || '',
        brand: product.brand || '',
        tags: product.tags ? product.tags.join(', ') : '',
        status: product.status || 'active'
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        price: '',
        discountPrice: '',
        stock: '',
        description: '',
        brand: '',
        tags: '',
        status: 'active'
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await adminService.deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };

    try {
      if (editingProduct) {
        await adminService.updateProduct(editingProduct._id, formattedData);
      } else {
        await adminService.createProduct(formattedData);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      alert('Error saving product');
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="admin-products">
      <header className="page-header">
        <div>
          <h1 className="page-title">Product Management</h1>
          <p className="page-subtitle">Manage your inventory and product listings.</p>
        </div>
        <button className="add-btn" onClick={() => handleOpenModal()}>
          <Plus size={20} />
          <span>Add New Product</span>
        </button>
      </header>

      <div className="glass-card table-controls">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search products by name, ID or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={18} />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button className="control-btn">
            <Tag size={18} />
            <span>AI Tagging</span>
          </button>
        </div>
      </div>

      <div className="glass-card table-wrapper">
        {loading ? (
          <div className="loading-state">Loading products...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="product-info-cell">
                      <div className="product-thumb">
                        {product.images && product.images[0] ? (
                          <img src={product.images[0]} alt={product.name} />
                        ) : (
                          <Package size={20} className="placeholder-icon" />
                        )}
                      </div>
                      <div className="product-meta">
                        <p className="product-name">{product.name}</p>
                        <span className="product-id">ID: {product._id.slice(-6).toUpperCase()}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="category-badge">{product.category}</span></td>
                  <td>{product.brand || 'N/A'}</td>
                  <td>
                    <div className="price-info">
                      <strong className={product.discountPrice ? 'has-discount' : ''}>${product.price}</strong>
                      {product.discountPrice && <span className="discount-tag">${product.discountPrice}</span>}
                    </div>
                  </td>
                  <td>
                    <div className="stock-info">
                      <span>{product.stock}</span>
                      <div className="stock-bar-bg">
                        <div className="stock-bar-fill" style={{ width: `${Math.min(product.stock, 100)}%`, backgroundColor: product.stock < 10 ? '#ef4444' : '#10b981' }}></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`status-pill ${product.stock > 0 ? 'active' : 'inactive'}`}>
                      {product.stock > 0 ? 'Active' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn-sm" title="Edit" onClick={() => handleOpenModal(product)}><Edit size={16} /></button>
                      <button className="icon-btn-sm delete" title="Delete" onClick={() => handleDelete(product._id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="glass-card modal-content product-modal">
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-sections-grid">
                {/* Left Section: Visuals & Tags */}
                <div className="form-section">
                  <div className="form-group full-width">
                    <label>Product Images</label>
                    <div className="image-upload-zone-compact">
                      <Upload size={24} />
                      <p>Upload Images</p>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Product Brand</label>
                    <input type="text" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} placeholder="e.g. Apple" />
                  </div>

                  <div className="form-group">
                    <label>Tags (Comma separated)</label>
                    <input type="text" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} placeholder="new, summer, sale" />
                  </div>

                  <div className="form-group full-width">
                    <label>Product Description</label>
                    <textarea rows="4" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                  </div>
                </div>

                {/* Right Section: Details & Pricing */}
                <div className="form-section">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  
                  <div className="form-group">
                    <label>Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required>
                      <option value="">Select Category</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="form-grid-inner">
                    <div className="form-group">
                      <label>Regular Price ($)</label>
                      <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Discount Price ($)</label>
                      <input type="number" value={formData.discountPrice} onChange={(e) => setFormData({...formData, discountPrice: e.target.value})} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Stock Quantity</label>
                    <input type="number" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="save-btn">{editingProduct ? 'Update Product' : 'Save Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;

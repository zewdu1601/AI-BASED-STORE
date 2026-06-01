import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  Heart, 
  Award, 
  Tag, 
  Sparkles,
  TrendingUp,
  Package,
  Bell,
  ChevronRight,
  ArrowRight,
  List
} from 'lucide-react';
import api from '../../services/api';
import ProductCard from '../../components/ProductCard';
import AIChatWidget from '../../components/AIChatWidget';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products for dashboard:', error);
      }
    };
    fetchProducts();
  }, []);

  // Mock Stats
  const stats = [
    { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'primary' },
    { label: 'Pending', value: '2', icon: Clock, color: 'warning' },
    { label: 'Delivered', value: '10', icon: CheckCircle, color: 'success' },
    { label: 'Wishlist', value: '24', icon: Heart, color: 'danger' },
    { label: 'Reward Points', value: '850', icon: Award, color: 'secondary' },
    { label: 'Coupons', value: '4', icon: Tag, color: 'accent' },
  ];

  return (
    <div className="customer-dashboard fade-in">
      <header className="dashboard-welcome">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your account today.</p>
      </header>

      {/* 📊 A. Dashboard Cards */}
      <section className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card stat-card">
            <div className={`stat-icon icon-${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-label">{stat.label}</span>
              <h2 className="stat-value">{stat.value}</h2>
            </div>
          </div>
        ))}
      </section>

      <div className="dashboard-content-grid">
        {/* 🛍️ B. Recent Orders & Tracking */}
        <div className="dashboard-main-col">
          <section className="glass-card recent-orders-section">
            <div className="section-header">
              <h3><Package size={20} /> Recent Orders</h3>
              <Link to="/customer/orders" className="view-all">View All <ChevronRight size={16} /></Link>
            </div>
            <div className="order-list-mini">
              {[1, 2, 3].map((order) => (
                <div key={order} className="mini-order-item">
                  <div className="order-img-placeholder">
                    <ShoppingBag size={20} />
                  </div>
                  <div className="order-info">
                    <p className="order-id">Order #AI-892{order}</p>
                    <span className="order-date">Placed on Oct 1{order}, 2023</span>
                  </div>
                  <span className="status-pill success">Delivered</span>
                  <p className="order-price">$129.00</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card ai-suggestions-section mt-4">
            <div className="section-header">
              <h3><Sparkles size={20} /> AI Smart Suggestions</h3>
            </div>
            <div className="suggestions-grid">
              <div className="suggestion-card">
                <div className="s-icon"><TrendingUp size={18} /></div>
                <p>Based on your interest in <strong>Tech Gadgets</strong>, we found 5 new arrivals you might love.</p>
                <button className="s-btn">View Picks <ArrowRight size={14} /></button>
              </div>
              <div className="suggestion-card">
                <div className="s-icon"><Award size={18} /></div>
                <p>You're only <strong>150 points</strong> away from Gold Status. Earn points with your next purchase!</p>
                <button className="s-btn">Earn Points <ArrowRight size={14} /></button>
              </div>
            </div>
          </section>

          {/* New Product List Section */}
          <section className="glass-card mt-4">
            <div className="section-header">
              <h3><List size={20} /> All Products</h3>
              <Link to="/shop" className="view-all">Shop More <ChevronRight size={16} /></Link>
            </div>
            <div className="dashboard-products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
              {products.length > 0 ? products.map(product => (
                <ProductCard key={product._id} product={product} />
              )) : (
                <p style={{ color: 'var(--text-muted)' }}>Loading products...</p>
              )}
            </div>
          </section>
        </div>

        {/* 🔔 C. Sidebar Column: Notifications & Wishlist */}
        <div className="dashboard-side-col">
          <section className="glass-card dash-notifications">
            <div className="section-header">
              <h3><Bell size={20} /> Notifications</h3>
            </div>
            <div className="notif-list-mini">
              <div className="mini-notif unread">
                <div className="notif-dot"></div>
                <div className="notif-text">
                  <p>Your order <strong>#AI-8921</strong> is out for delivery!</p>
                  <span>2 hours ago</span>
                </div>
              </div>
              <div className="mini-notif">
                <div className="notif-text">
                  <p>New AI Recommendation: Smart Watch Series 5</p>
                  <span>Yesterday</span>
                </div>
              </div>
              <div className="mini-notif">
                <div className="notif-text">
                  <p>Promo: Get 20% off on all Fashion items!</p>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>
          </section>

          <section className="glass-card dash-wishlist mt-4">
            <div className="section-header">
              <h3><Heart size={20} /> Saved Items</h3>
              <Link to="/customer/wishlist" className="view-all">View <ChevronRight size={14} /></Link>
            </div>
            <div className="wishlist-mini-grid">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="wish-thumb" title="Product Name">
                  <div className="thumb-placeholder"></div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <AIChatWidget />
    </div>
  );
};

export default CustomerDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ShoppingBag, Zap, ShieldCheck, RefreshCw, ArrowRight, Search, Truck, CreditCard } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [trending, setTrending] = useState([]);
  const [personalized, setPersonalized] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: allProducts } = await api.get('/products');
        setProducts(allProducts.slice(0, 4));
        setTrending(allProducts.slice(4, 8));

        if (user) {
          const { data: feed } = await api.get('/recommendations/feed');
          setPersonalized(feed.products || []);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Home data fetch error:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="home-page">
      {/* ⭐ B. Hero Section */}
      <section className="hero vscode-shell">
        <div className="vscode-activity-bar">
          <span className="activity-btn active"></span>
          <span className="activity-btn"></span>
          <span className="activity-btn"></span>
          <span className="activity-btn"></span>
        </div>
        <div className="vscode-toolbar">
          <div className="window-chrome">
            <span className="window-dot close"></span>
            <span className="window-dot minimize"></span>
            <span className="window-dot maximize"></span>
          </div>
          <div className="window-title">smartstore-ai / src / Home.jsx</div>
          <div className="hero-brand">
            <span className="brand-text">SmartStore</span>
            <span className="brand-pill">AI</span>
          </div>
          <div className="hero-tabs">
            <div className="hero-tab active">Home</div>
            <div className="hero-tab">Shop</div>
            <div className="hero-tab">Product List</div>
            <div className="hero-tab">Dashboard</div>
          </div>
          <div className="hero-toolbar">
            <button className="icon-btn">⋮</button>
            <button className="icon-btn">⌄</button>
          </div>
        </div>
        <div className="hero-content">
          <span className="badge">AI-Powered Experience</span>
          <h1>Smart Shopping with <span className="highlight">AI Recommendations</span></h1>
          <p>Our intelligent engine analyzes your style and preferences to suggest products you’ll actually love.</p>
          
          <div className="hero-search">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Quick find products..." onFocus={() => navigate('/shop')} />
          </div>

          <div className="cta-buttons">
            <button className="primary-btn" onClick={() => navigate('/shop')}>Shop Now <ShoppingBag size={18} /></button>
            <button className="secondary-btn">Explore AI Deals</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="editor-panel">
            <div className="editor-header">
              <div className="editor-tabs">
                <div className="editor-tab active">home.tsx</div>
                <div className="editor-tab">recommendations.js</div>
              </div>
              <div className="editor-actions">
                <button className="icon-btn small">Run</button>
              </div>
            </div>
            <div className="editor-body">
              <div className="editor-code">
                <div className="editor-image-stack">
                  <img src="/assets/hero.png" alt="AI Shopping" className="hero-img" />
                  <div className="hero-mini-grid">
                    <div className="hero-mini-card">
                      <img src="/assets/hero.png" alt="AI Preview" />
                    </div>
                    <div className="hero-mini-card">
                      <img src="/assets/hero.png" alt="AI Preview" />
                    </div>
                  </div>
                </div>
                <div className="code-overlay">
                  <div className="code-line">import AI from 'smartstore';</div>
                  <div className="code-line">const recommended = AI.recommend(user);</div>
                  <div className="code-line">render(recommended, '#hero');</div>
                </div>
              </div>
              <div className="editor-terminal">
                <div className="terminal-label">OUTPUT</div>
                <div className="terminal-lines">
                  <p><span className="terminal-prompt">›</span> AI model loaded successfully</p>
                  <p><span className="terminal-prompt">›</span> 32 recommendations generated</p>
                  <p><span className="terminal-prompt">›</span> Theme set to VS Code Dark</p>
                </div>
              </div>
              <div className="editor-status-bar">
                <span>main</span>
                <span>UTF-8</span>
                <span>Ln 42, Col 12</span>
              </div>
            </div>
          </div>
          <div className="blob-gradient"></div>
        </div>
      </section>

      {/* ⭐ Lifestyle Experience Section */}
      <section className="lifestyle-experience glass-card mt-4">
        <div className="experience-grid">
          <div className="experience-img">
            <img src="/assets/lifestyle.png" alt="Premium Lifestyle" />
          </div>
          <div className="experience-text">
            <h2>Experience <span className="highlight">Next-Gen</span> Commerce</h2>
            <p>We’ve combined the convenience of online shopping with the precision of deep learning. SmartStore AI understands your context, predicts your needs, and simplifies your life.</p>
            <button className="secondary-btn">Learn More About Our AI</button>
          </div>
        </div>
      </section>

      {/* ⭐ C & D. AI Recommendations Section */}
      <section className="recommendations mt-4">
        <div className="section-header">
          <h2>Recommended for You</h2>
          <span className="ai-tag">Personalized</span>
        </div>
        <div className="product-grid">
          {loading ? [1,2,3,4].map(i => <div key={i} className="skeleton-card"></div>) : 
            personalized.length > 0 ? personalized.slice(0, 4).map(p => (
              <ProductCard key={p._id} product={{...p, isAIRecommended: true}} />
            )) : products.map(p => (
              <ProductCard key={p._id} product={{...p, isAIRecommended: true}} />
            ))
          }
        </div>

        <div className="section-header mt-4">
          <h2>Trending Products</h2>
          <span className="ai-tag trending">Hot Now</span>
        </div>
        <div className="product-grid">
          {trending.map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>

        <div className="section-header mt-4">
          <h2>Customers Also Bought</h2>
          <span className="ai-tag cross-sell">Popular Choice</span>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).reverse().map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>

      {/* ⭐ E. Features Section */}
      <section className="features-grid mt-4">
        <div className="feature-item glass-card">
          <div className="feature-img-wrap">
            <img src="/assets/delivery.png" alt="Delivery" />
          </div>
          <h3>Fast Delivery</h3>
          <p>Get your AI-picked items at your doorstep in record time with our optimized logistics.</p>
        </div>
        <div className="feature-item glass-card">
          <div className="feature-img-wrap">
            <img src="/assets/payment.png" alt="Secure" />
          </div>
          <h3>Secure Payments</h3>
          <p>Every transaction is protected by neural-encrypted security protocols.</p>
        </div>
        <div className="feature-item glass-card">
          <div className="feature-icon-wrap">
            <RefreshCw size={40} />
          </div>
          <h3>Easy Returns</h3>
          <p>Not satisfied? Our automated system makes returns and refunds effortless.</p>
        </div>
      </section>

      {/* 📣 F. Call to Action (CTA) */}
      <section className="cta-banner glass-card mt-4">
        <div className="cta-inner">
          <h2>Ready to upgrade your shopping experience?</h2>
          <p>Join thousands of users enjoying personalized AI commerce.</p>
          <div className="cta-actions">
            <button className="primary-btn" onClick={() => navigate('/register')}>Get Started</button>
            <button className="secondary-btn" onClick={() => navigate('/shop')}>
              Explore Products <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Heart, ShieldCheck, Truck, Check, Cpu, Battery, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackAction } from '../utils/aiTracker';

import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAI } from '../context/AIContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { logAction } = useAI();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
        // Track view via AI context
        logAction('view', data._id, data.category);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-20 text-center">Loading product intelligence...</div>;
  if (!product) return <div className="p-20 text-center">Product not found.</div>;

  // For demonstration, if product only has 1 image, duplicate it to show the gallery feature
  const displayImages = product.images?.length > 1 
    ? product.images 
    : [product.images?.[0], product.images?.[0] + '&thumb=1', product.images?.[0] + '&thumb=2'];

  return (
    <div className="product-details">
      <div className="details-layout">
        {/* Gallery Section */}
        <div className="gallery-section">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="product-gallery glass-card"
          >
            <img src={displayImages[activeImage]} alt={product.name} className="main-image" />
          </motion.div>
          
          <div className="thumbnail-rail">
            {displayImages.map((img, idx) => (
              <div 
                key={idx} 
                className={`thumbnail glass-card ${activeImage === idx ? 'active' : ''}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="product-info-section"
        >
          <span className="category-tag">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="brand">by {product.brand}</p>
          
          <div className="price-box">
            <span className="price">${product.price}</span>
            <span className="stock-status">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
          </div>

          <p className="description">{product.description || 'Advanced AI-designed features and premium materials for the modern lifestyle.'}</p>

          <div className="features">
            <div className="feature"><Truck size={18} /> Free Delivery</div>
            <div className="feature"><ShieldCheck size={18} /> 2 Year Warranty</div>
          </div>

          {/* New Extra Features Section */}
          <div className="extra-features glass-card">
            <h3>Technical Highlights</h3>
            <ul className="feature-list">
              <li><Check size={16} className="feature-icon" /> AI-Optimized Performance algorithms built-in</li>
              <li><Cpu size={16} className="feature-icon" /> Next-generation smart processing chip</li>
              <li><Battery size={16} className="feature-icon" /> Extended battery life with eco-mode</li>
              <li><Activity size={16} className="feature-icon" /> Real-time tracking and adaptive feedback</li>
            </ul>
          </div>

          <div className="actions">
            <button className="add-btn primary-btn" onClick={() => {
              addToCart(product);
              logAction('cart_add', product._id, product.category);
            }}>
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button 
              className={`wishlist-btn ${isInWishlist(product._id) ? 'active' : ''}`} 
              onClick={() => toggleWishlist(product)}
            >
              <Heart size={20} fill={isInWishlist(product._id) ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="ai-insight glass-card">
            <h4>AI Insight</h4>
            <p>This product is trending in your area and matches your previous interest in high-performance gadgets.</p>
          </div>
        </motion.div>
      </div>

      <div className="related-section">
        <h2>Customers Also Bought</h2>
        <div className="related-grid">
          {/* Simulation of related products */}
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="related-card glass-card">
              <div className="img-placeholder" />
              <p>AI Smart Gadget {i}</p>
              <span>$199.00</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        <div className="review-form glass-card">
          <h4>Write a Review</h4>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map(star => <span key={star}>⭐</span>)}
          </div>
          <textarea className="glass-input" placeholder="Share your experience..." />
          <button className="primary-btn">Submit Review</button>
        </div>
      </div>

      <style>{`
        .product-details { padding: 2rem 0; }
        .details-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
        
        .gallery-section { display: flex; flex-direction: column; gap: 1rem; }
        .product-gallery { padding: 0; overflow: hidden; border-radius: 2rem; height: 500px; display: flex; justify-content: center; align-items: center; background: rgba(255,255,255,0.02); }
        .product-gallery img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .product-gallery:hover img { transform: scale(1.05); }
        
        .thumbnail-rail { display: flex; gap: 1rem; margin-top: 0.5rem; }
        .thumbnail { width: 80px; height: 80px; border-radius: 1rem; overflow: hidden; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; padding: 0; }
        .thumbnail img { width: 100%; height: 100%; object-fit: cover; }
        .thumbnail:hover { border-color: rgba(0, 194, 255, 0.5); }
        .thumbnail.active { border-color: #00C2FF; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0, 194, 255, 0.2); }

        .category-tag { color: var(--accent); font-weight: 700; text-transform: uppercase; font-size: 0.8rem; }
        h1 { font-size: 3.5rem; margin: 0.5rem 0; }
        .brand { color: var(--text-muted); font-size: 1.1rem; margin-bottom: 2rem; }
        .price-box { display: flex; align-items: center; gap: 2rem; margin-bottom: 2rem; }
        .price { font-size: 2.5rem; font-weight: 700; }
        .stock-status { color: #10b981; font-weight: 600; padding: 0.3rem 0.8rem; background: rgba(16, 185, 129, 0.1); border-radius: 2rem; }
        .description { font-size: 1.1rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 1.5rem; }
        
        .features { display: flex; gap: 2rem; margin-bottom: 1.5rem; }
        .feature { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.9rem; }
        
        .extra-features { padding: 1.5rem; margin-bottom: 2rem; border-left: 3px solid #a855f7; background: linear-gradient(to right, rgba(168, 85, 247, 0.05), transparent); }
        .extra-features h3 { font-size: 1.1rem; margin-bottom: 1rem; color: var(--text-main); }
        .feature-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.8rem; }
        .feature-list li { display: flex; align-items: center; gap: 0.8rem; color: var(--text-muted); font-size: 0.95rem; }
        .feature-icon { color: #a855f7; }

        .actions { display: flex; gap: 1rem; margin-bottom: 3rem; }
        .add-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.8rem; padding: 1.2rem; font-size: 1.1rem; border-radius: 1rem; border: none; cursor: pointer; font-weight: 600; }
        .wishlist-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 1.2rem; color: var(--text-muted); transition: all 0.2s; border-radius: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .wishlist-btn:hover { background: rgba(255,255,255,0.1); }
        .wishlist-btn.active { color: #ef4444; border-color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        
        .ai-insight { padding: 1.5rem; border-left: 4px solid var(--accent); }
        .ai-insight h4 { color: var(--accent); margin-bottom: 0.5rem; }

        .related-section { margin-top: 6rem; }
        .related-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; margin-top: 2rem; }
        .related-card { padding: 1rem; text-align: center; }
        .img-placeholder { width: 100%; height: 150px; background: rgba(255,255,255,0.05); border-radius: 1rem; margin-bottom: 1rem; }
        
        .reviews-section { margin-top: 6rem; max-width: 700px; }
        .review-form { padding: 2rem; margin-top: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .rating-input { font-size: 1.5rem; cursor: pointer; }
        textarea { height: 120px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem; padding: 1rem; color: white; resize: vertical; }
        textarea:focus { outline: none; border-color: var(--accent); }
      `}</style>
    </div>
  );
};

export default ProductDetails;


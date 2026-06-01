import React from 'react';
import { Sparkles, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIRecommendationCard = ({ product }) => {
  return (
    <div className="ai-card glass-card">
      <div className="ai-badge">
        <Sparkles size={14} />
        <span>98% Match</span>
      </div>
      <img src={product.images?.[0]} alt={product.name} />
      <div className="card-info">
        <h3>{product.name}</h3>
        <p className="reason">Based on your interest in {product.category}</p>
        <div className="card-bottom">
          <strong>${product.price}</strong>
          <Link to={`/product/${product._id}`} className="view-btn">View Intelligence</Link>
        </div>
      </div>

      <style>{`
        .ai-card { 
          position: relative; overflow: hidden; 
          border: 1px solid var(--accent);
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.1);
        }
        .ai-badge {
          position: absolute; top: 1rem; left: 1rem;
          background: var(--accent); color: white;
          padding: 0.3rem 0.8rem; border-radius: 2rem;
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.75rem; font-weight: 700; z-index: 10;
        }
        img { width: 100%; height: 180px; object-fit: cover; }
        .card-info { padding: 1.5rem; }
        .reason { font-size: 0.8rem; color: var(--text-muted); margin: 0.5rem 0 1.5rem; }
        .card-bottom { display: flex; justify-content: space-between; align-items: center; }
        strong { font-size: 1.2rem; color: white; }
        .view-btn { color: var(--accent); font-weight: 700; font-size: 0.85rem; }
      `}</style>
    </div>
  );
};

export default AIRecommendationCard;


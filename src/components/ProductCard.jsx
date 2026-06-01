import { Star, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="glass-card product-card"
    >
      <div className="product-image">
        <Link to={`/product/${product._id}`}>
          <img src={product.images?.[0] || 'https://via.placeholder.com/300'} alt={product.name} />
        </Link>
        {product.isAIRecommended && <span className="ai-badge">AI Pick</span>}
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>

        <div className="rating">
          <Star size={16} fill="gold" color="gold" />
          <span>{product.rating}</span>
        </div>

        <div className="card-footer">
          <span className="price">${product.price}</span>
          <div className="btn-group">
            <Link to={`/product/${product._id}`} className="view-btn"><Eye size={18} /></Link>
            <button className="add-to-cart" onClick={() => addToCart(product)}>
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .product-card {
          padding: 0;
          overflow: hidden;
          width: 280px;
        }
        .product-image {
          position: relative;
          height: 200px;
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ai-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: linear-gradient(to right, #6366f1, #a855f7);
          color: white;
          font-size: 0.7rem;
          padding: 0.3rem 0.6rem;
          border-radius: 2rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .product-info {
          padding: 1.5rem;
        }
        .category {
          color: var(--text-muted);
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
        }
        .rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .btn-group { display: flex; gap: 0.5rem; }
        .view-btn { background: rgba(255,255,255,0.05); padding: 0.6rem; border-radius: 0.5rem; color: var(--text-muted); }
        .view-btn:hover { color: var(--accent); }
        .price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--accent);
        }
        .add-to-cart {
          padding: 0.6rem;
        }
      `}</style>
    </motion.div>
  );
};

export default ProductCard;

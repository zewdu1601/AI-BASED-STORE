import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="wishlist-container">
      <div className="header-flex">
        <h1>My Wishlist</h1>
        <span className="count">{wishlist.length} Items</span>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-state glass-card">
          <Heart size={48} />
          <p>Your wishlist is empty</p>
          <Link to="/shop" className="primary-btn">Go Shopping</Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div key={item._id} className="wish-card glass-card">
              <img src={item.images?.[0] || 'https://via.placeholder.com/200'} alt={item.name} />
              <div className="wish-content">
                <h3>{item.name}</h3>
                <p className="price">${item.price}</p>
                <div className="wish-actions">
                  <button className="add-cart-btn" onClick={() => addToCart(item)}>
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </button>
                  <button className="remove-btn" onClick={() => toggleWishlist(item)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .wishlist-container { max-width: 1200px; margin: 0 auto; }
        .header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .count { color: var(--text-muted); font-size: 1.1rem; }
        .empty-state { text-align: center; padding: 4rem; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
        .wishlist-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
        .wish-card { overflow: hidden; display: flex; flex-direction: column; transition: transform 0.3s; }
        .wish-card:hover { transform: translateY(-5px); }
        .wish-card img { width: 100%; height: 200px; object-fit: cover; }
        .wish-content { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; gap: 0.8rem; }
        .wish-content h3 { font-size: 1.1rem; }
        .price { font-size: 1.25rem; font-weight: 700; color: var(--accent); }
        .wish-actions { display: flex; gap: 0.5rem; margin-top: auto; }
        .add-cart-btn { 
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          background: var(--primary); color: white; padding: 0.8rem; border-radius: 0.6rem;
        }
        .remove-btn { 
          width: 45px; display: flex; align-items: center; justify-content: center;
          background: rgba(239, 68, 68, 0.1); color: #ef4444; border-radius: 0.6rem;
        }
      `}</style>
    </div>
  );
};

export default Wishlist;


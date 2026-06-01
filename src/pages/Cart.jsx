import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, CreditCard, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { user } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <h1>Your AI Cart</h1>
      
      <div className="cart-layout">
        <main className="cart-items">
          <AnimatePresence>
            {cartItems.map(item => (
              <motion.div 
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass-card cart-item"
              >
                <img src={item.images[0]} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="price">${item.price}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}><Minus size={16} /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}><Plus size={16} /></button>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="remove-btn">
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {cartItems.length === 0 && <p className="empty-msg">Your cart is as empty as a vacuum. Let's add some intelligence!</p>}
        </main>

        <aside className="summary glass-card">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total</span>
            <span>${subtotal}</span>
          </div>
          
          <div className="cart-extras">
            <div className="coupon-box">
              <input type="text" placeholder="Coupon Code" className="glass-input" />
              <button className="small-btn">Apply</button>
            </div>
          </div>

          <button className="checkout-btn" onClick={() => navigate('/checkout')} disabled={cartItems.length === 0}>
            <CreditCard size={20} /> Checkout Now
          </button>
        </aside>
      </div>

      <style>{`
        .cart-page { display: flex; flex-direction: column; gap: 2.5rem; }
        .cart-layout { display: grid; grid-template-columns: 1fr 350px; gap: 2rem; }
        .cart-items { display: flex; flex-direction: column; gap: 1rem; }
        .cart-item { display: flex; align-items: center; gap: 1.5rem; padding: 1rem; }
        .cart-item img { width: 100px; height: 100px; object-fit: cover; border-radius: 0.5rem; }
        .item-details { flex: 1; }
        .quantity-controls { display: flex; align-items: center; gap: 1rem; background: rgba(255,255,255,0.05); padding: 0.4rem 0.8rem; border-radius: 0.5rem; }
        .quantity-controls button { background: transparent; color: var(--accent); padding: 0.2rem; }
        .quantity-controls span { font-weight: 700; min-width: 20px; text-align: center; }
        .remove-btn { background: transparent; color: #ef4444; }
        .summary { padding: 2rem; height: fit-content; display: flex; flex-direction: column; gap: 1.5rem; }
        .summary-row { display: flex; justify-content: space-between; color: var(--text-muted); }
        .total { font-size: 1.5rem; color: white; font-weight: 700; }
        .cart-extras { display: flex; flex-direction: column; gap: 1rem; padding: 1.5rem 0; border-top: 1px solid rgba(255,255,255,0.05); }
        .coupon-box { display: flex; gap: 0.5rem; }
        .coupon-box input { flex: 1; padding: 0.6rem; font-size: 0.8rem; }
        .loyalty-redeem { font-size: 0.85rem; color: #f59e0b; }
        .checkout-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
      `}</style>
    </div>
  );
};

export default Cart;


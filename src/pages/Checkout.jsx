import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, Truck, CreditCard, ChevronRight } from 'lucide-react';

const Checkout = () => {
  const { cartItems, subtotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(user?.addresses?.[0] || {});

  const handleNext = () => {
    if (step === 2) navigate('/payment');
    else setStep(step + 1);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Shipping</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Review</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Payment</div>
      </div>

      <div className="checkout-layout">
        <main className="checkout-main glass-card">
          {step === 1 && (
            <div className="view-fade">
              <h2>Select Shipping Address</h2>
              <div className="address-options">
                {user?.addresses?.map((addr, i) => (
                  <label key={i} className={`address-card ${address === addr ? 'selected' : ''}`}>
                    <input type="radio" name="address" onChange={() => setAddress(addr)} checked={address === addr} />
                    <div className="addr-info">
                      <strong>{user.name}</strong>
                      <p>{addr.street}</p>
                      <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                    </div>
                  </label>
                ))}
              </div>
              <button className="secondary-btn">+ Add New Address</button>
            </div>
          )}

          {step === 2 && (
            <div className="view-fade">
              <h2>Review Your Order</h2>
              <div className="review-list">
                {cartItems.map(item => (
                  <div key={item._id} className="review-item">
                    <img src={item.images[0]} alt={item.name} />
                    <div className="item-meta">
                      <p>{item.name}</p>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <strong>${item.price * item.quantity}</strong>
                  </div>
                ))}
              </div>
              <div className="shipping-summary">
                <Truck size={20} />
                <div>
                  <p>Shipping to: <strong>{address.street}, {address.city}</strong></p>
                  <span>Estimated Delivery: 2-3 Business Days</span>
                </div>
              </div>
            </div>
          )}

          <div className="checkout-footer">
            <button className="primary-btn" onClick={handleNext}>
              {step === 2 ? 'Proceed to Payment' : 'Next Step'}
              <ChevronRight size={20} />
            </button>
          </div>
        </main>

        <aside className="checkout-summary glass-card">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Items ({cartItems.length})</span>
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
        </aside>
      </div>

      <style>{`
        .checkout-container { max-width: 1100px; margin: 0 auto; }
        .checkout-steps { display: flex; gap: 2rem; margin-bottom: 3rem; justify-content: center; }
        .step { font-weight: 700; color: var(--text-muted); position: relative; }
        .step.active { color: var(--accent); }
        .step.active::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 100%; height: 2px; background: var(--accent); }
        
        .checkout-layout { display: grid; grid-template-columns: 1fr 350px; gap: 2rem; }
        .checkout-main { padding: 2.5rem; }
        .address-options { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0; }
        .address-card { padding: 1.5rem; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; display: flex; gap: 1rem; cursor: pointer; transition: all 0.2s; }
        .address-card.selected { border-color: var(--accent); background: rgba(99, 102, 241, 0.05); }
        
        .review-list { margin: 1.5rem 0; display: flex; flex-direction: column; gap: 1rem; }
        .review-item { display: flex; align-items: center; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .review-item img { width: 50px; height: 50px; border-radius: 0.5rem; object-fit: cover; }
        .item-meta { flex: 1; }
        
        .shipping-summary { display: flex; gap: 1rem; align-items: center; padding: 1.5rem; background: rgba(255,255,255,0.02); border-radius: 1rem; margin-top: 2rem; }
        .checkout-footer { margin-top: 3rem; display: flex; justify-content: flex-end; }
        .checkout-summary { padding: 2rem; height: fit-content; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 1rem; color: var(--text-muted); }
        .total { font-size: 1.5rem; color: white; font-weight: 800; margin-top: 1rem; }
      `}</style>
    </div>
  );
};

export default Checkout;


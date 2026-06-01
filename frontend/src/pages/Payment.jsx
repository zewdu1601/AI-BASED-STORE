import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Lock, CreditCard } from 'lucide-react';

const Payment = () => {
  const { subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      clearCart();
      navigate('/orders');
      alert('Payment Successful! Your AI order is being processed.');
    }, 2000);
  };

  return (
    <div className="payment-container view-fade">
      <div className="payment-card glass-card">
        <div className="card-header">
          <Lock size={18} />
          <span>Secure Checkout</span>
        </div>
        
        <div className="amount-banner">
          <span>Payable Amount</span>
          <h1>${subtotal}</h1>
        </div>

        <div className="card-input-box">
          <label>Card Details</label>
          <div className="glass-input card-input">
            <CreditCard size={20} />
            <input type="text" placeholder="XXXX XXXX XXXX XXXX" maxLength="16" />
          </div>
          <div className="card-meta">
            <input type="text" placeholder="MM/YY" className="glass-input" />
            <input type="password" placeholder="CVV" className="glass-input" />
          </div>
        </div>

        <button className="primary-btn pay-btn" onClick={handlePay} disabled={processing}>
          {processing ? 'Processing Intelligence...' : `Pay $${subtotal}`}
        </button>

        <div className="security-badges">
          <div className="badge"><ShieldCheck size={14} /> PCI Compliant</div>
          <div className="badge"><ShieldCheck size={14} /> 256-bit SSL</div>
        </div>
      </div>

      <style>{`
        .payment-container { max-width: 500px; margin: 4rem auto; }
        .payment-card { padding: 3rem; display: flex; flex-direction: column; gap: 2rem; }
        .card-header { display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.9rem; }
        .amount-banner { text-align: center; padding: 2rem; background: rgba(255,255,255,0.02); border-radius: 1rem; }
        .amount-banner h1 { font-size: 3rem; color: var(--accent); }
        
        .card-input-box { display: flex; flex-direction: column; gap: 1rem; }
        .card-input { display: flex; align-items: center; gap: 1rem; }
        .card-input input { background: transparent; border: none; width: 100%; font-size: 1.1rem; letter-spacing: 2px; }
        .card-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        
        .pay-btn { height: 60px; font-size: 1.2rem; margin-top: 1rem; }
        .security-badges { display: flex; justify-content: center; gap: 2rem; }
        .badge { font-size: 0.75rem; color: #10b981; display: flex; align-items: center; gap: 0.3rem; font-weight: 700; }
      `}</style>
    </div>
  );
};

export default Payment;


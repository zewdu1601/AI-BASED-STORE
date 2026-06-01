import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Search, Scan, ShoppingCart, CreditCard, 
  Banknote, Smartphone, Printer, Trash2, 
  Plus, Minus, Clock, RefreshCcw 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const POSTerminal = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const barcodeRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setItems(data);
      } catch (err) { console.error(err); }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const matched = items.find(p => p._id.substring(0, 8) === searchTerm);
    if (matched) {
      addToCart(matched);
      setSearchTerm('');
    }
  }, [searchTerm, items]);

  const addToCart = (product) => {
    const existing = cart.find(c => c._id === product._id);
    if (existing) {
      setCart(cart.map(c => c._id === product._id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(c => 
      c._id === id ? { ...c, quantity: Math.max(1, c.quantity + delta) } : c
    ));
  };

  const removeFromCart = (id) => setCart(cart.filter(c => c._id !== id));

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('/api/pos/checkout', {
        items: cart.map(i => ({ product: i._id, quantity: i.quantity, price: i.price })),
        totalAmount: total,
        paymentMethod
      }, config);
      alert('Sale Completed Successfully!');
      setCart([]);
    } catch (err) { alert(err.response?.data?.message || 'Checkout failed'); }
  };

  return (
    <div className="pos-terminal-content fade-in">
      <div className="pos-layout-inner">
        <div className="pos-main-side">
          <div className="search-bar glass-card mb-6">
            <Search className="icon" size={20} />
            <input 
              type="text" 
              placeholder="Scan Barcode or Search Products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              ref={barcodeRef}
            />
            <Scan className="scan-icon" size={20} />
          </div>

          <div className="product-grid-pos">
            {items.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
              <button key={p._id} className="pos-p-card glass-card" onClick={() => addToCart(p)}>
                <div className="p-img" style={{ backgroundImage: `url(${p.images?.[0]})` }} />
                <div className="p-info">
                  <p>{p.name}</p>
                  <strong>${p.price}</strong>
                  <span className={`stock-tag ${p.stock < 10 ? 'low' : ''}`}>{p.stock} in stock</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <aside className="pos-cart-sidebar glass-card">
          <div className="cart-header">
            <ShoppingCart size={20} />
            <h2>Current Order</h2>
            <button className="clear-btn" onClick={() => setCart([])}>Clear</button>
          </div>

          <div className="cart-items-list">
            {cart.length === 0 ? (
              <div className="empty-cart-state">
                <ShoppingCart size={40} />
                <p>Cart is empty</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item._id} className="c-item">
                  <div className="c-info">
                    <p>{item.name}</p>
                    <span>${item.price}</span>
                  </div>
                  <div className="c-controls">
                    <button onClick={() => updateQty(item._id, -1)}><Minus size={12} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item._id, 1)}><Plus size={12} /></button>
                    <button className="c-remove" onClick={() => removeFromCart(item._id)}><Trash2 size={12} /></button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="cart-footer-pos">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="method-grid">
              {['cash', 'card', 'mobile'].map(m => (
                <button 
                  key={m}
                  className={`m-btn ${paymentMethod === m ? 'active' : ''}`}
                  onClick={() => setPaymentMethod(m)}
                >
                  {m === 'cash' && <Banknote size={18} />}
                  {m === 'card' && <CreditCard size={18} />}
                  {m === 'mobile' && <Smartphone size={18} />}
                  <span className="capitalize">{m}</span>
                </button>
              ))}
            </div>

            <button className="complete-btn" onClick={handleCheckout} disabled={cart.length === 0}>
              Complete Sale <Printer size={18} className="ml-2" />
            </button>
          </div>
        </aside>
      </div>

      <style>{`
        .pos-terminal-content { height: 100%; display: flex; flex-direction: column; }
        .pos-layout-inner { display: grid; grid-template-columns: 1fr 380px; gap: 1.5rem; height: 100%; min-height: 0; }
        .pos-main-side { display: flex; flex-direction: column; min-height: 0; }
        
        .search-bar { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.5rem; }
        .search-bar input { flex: 1; background: transparent; border: none; color: white; font-size: 1.1rem; outline: none; }
        .scan-icon { color: var(--accent); cursor: pointer; }

        .product-grid-pos { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem; overflow-y: auto; padding-right: 0.5rem; }
        .pos-p-card { padding: 0; overflow: hidden; border: 1px solid transparent; transition: all 0.2s; text-align: left; }
        .pos-p-card:hover { border-color: var(--primary); transform: translateY(-2px); }
        .p-img { height: 110px; background-size: cover; background-position: center; background-color: rgba(0,0,0,0.2); }
        .p-info { padding: 1rem; }
        .p-info p { font-size: 0.85rem; font-weight: 600; margin-bottom: 0.25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .p-info strong { font-size: 1.1rem; color: var(--accent); display: block; }
        .stock-tag { font-size: 0.7rem; color: var(--text-muted); font-weight: 700; }
        .stock-tag.low { color: var(--danger); }

        .pos-cart-sidebar { display: flex; flex-direction: column; height: 100%; padding: 0; overflow: hidden; }
        .cart-header { padding: 1.5rem; display: flex; align-items: center; gap: 0.75rem; border-bottom: 1px solid var(--border-color); }
        .cart-header h2 { font-size: 1.1rem; flex: 1; margin: 0; }
        .clear-btn { font-size: 0.75rem; color: var(--text-muted); background: transparent; }

        .cart-items-list { flex: 1; overflow-y: auto; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .empty-cart-state { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); opacity: 0.5; gap: 1rem; }
        
        .c-item { display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.03); }
        .c-info p { font-size: 0.9rem; font-weight: 700; margin: 0; }
        .c-info span { font-size: 0.8rem; color: var(--text-muted); }
        .c-controls { display: flex; align-items: center; gap: 0.6rem; }
        .c-controls button { width: 22px; height: 22px; background: var(--bg-main); border-radius: 4px; display: flex; align-items: center; justify-content: center; }
        .c-remove { color: var(--danger) !important; }

        .cart-footer-pos { padding: 1.5rem; border-top: 1px solid var(--border-color); background: rgba(0,0,0,0.1); }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-muted); }
        .total-row { font-size: 1.5rem; font-weight: 800; color: white; margin: 1rem 0; }

        .method-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 1.25rem; }
        .m-btn { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; padding: 0.75rem; border-radius: 10px; background: var(--bg-main); border: 1px solid var(--border-color); color: var(--text-muted); font-size: 0.7rem; font-weight: 700; }
        .m-btn.active { background: rgba(99, 102, 241, 0.1); border-color: var(--primary); color: var(--primary); }
        .capitalize { text-transform: capitalize; }

        .complete-btn { width: 100%; padding: 1rem; background: var(--primary); color: white; border-radius: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 0.75rem; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3); }
        .complete-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

export default POSTerminal;

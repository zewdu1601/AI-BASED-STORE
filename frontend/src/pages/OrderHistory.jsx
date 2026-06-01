import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Package, ChevronRight, FileText, Download } from 'lucide-react';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const res = await axios.get('/api/orders/myorders', config);
        setOrders(res.data);
      } catch (err) { console.error(err); }
    };
    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="orders-container">
      <h1>My Purchase History</h1>
      
      {orders.length === 0 ? (
        <div className="empty-orders glass-card">
          <Package size={48} />
          <p>No orders found. Start your first purchase!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-item glass-card">
              <div className="order-main">
                <div className="order-id">
                  <span>Order ID:</span>
                  <strong>{order._id.substring(0, 8)}...</strong>
                </div>
                <div className="order-date">
                  <span>Placed on:</span>
                  <strong>{new Date(order.createdAt).toLocaleDateString()}</strong>
                </div>
                <div className="order-status">
                  <span className={`status-pill ${order.status}`}>{order.status}</span>
                </div>
                <div className="order-total">
                  <span>Total:</span>
                  <strong>${order.totalAmount}</strong>
                </div>
              </div>
              
              <div className="order-footer">
                <div className="item-preview">
                  {order.items?.map((item, i) => (
                    <img key={i} src={item.product?.images?.[0] || 'https://via.placeholder.com/50'} alt="item" title={item.product?.name} />
                  ))}
                </div>
                <div className="footer-actions">
                  <button className="secondary-btn small-btn">
                    <Download size={16} />
                    <span>Invoice</span>
                  </button>
                  <button className="primary-btn small-btn">
                    <span>Reorder</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .orders-container { max-width: 900px; margin: 0 auto; }
        h1 { margin-bottom: 2.5rem; }
        .orders-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .order-item { padding: 0; overflow: hidden; }
        .order-main { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .order-main div { display: flex; flex-direction: column; gap: 0.3rem; }
        .order-main span { font-size: 0.8rem; color: var(--text-muted); }
        
        .status-pill { width: fit-content; padding: 0.2rem 0.8rem; border-radius: 1rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .status-pill.pending { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .status-pill.paid { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-pill.shipped { background: rgba(99, 102, 241, 0.1); color: #6366f1; }
        .status-pill.delivered { background: rgba(34, 211, 238, 0.1); color: #22d3ee; }

        .order-footer { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; background: rgba(255,255,255,0.02); }
        .item-preview { display: flex; gap: 0.5rem; }
        .item-preview img { width: 40px; height: 40px; border-radius: 0.4rem; object-fit: cover; border: 1px solid rgba(255,255,255,0.1); }
        .footer-actions { display: flex; gap: 1rem; }
        .small-btn { padding: 0.5rem 1rem; font-size: 0.8rem; display: flex; align-items: center; gap: 0.5rem; }
      `}</style>
    </div>
  );
};

export default OrderHistory;


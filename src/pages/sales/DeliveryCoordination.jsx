import React from 'react';
import { Truck, MapPin, Package, CheckCircle, Clock, Search } from 'lucide-react';

const DeliveryCoordination = () => {
  const deliveries = [
    { id: '#DEL-501', order: '#ORD-9903', customer: 'Robert Brown', destination: 'Silicon Valley, CA', status: 'In Transit', ETA: '2:30 PM' },
    { id: '#DEL-502', order: '#ORD-8821', customer: 'Emma Wilson', destination: 'Palo Alto, CA', status: 'Preparing', ETA: '4:15 PM' },
    { id: '#DEL-503', order: '#ORD-7712', customer: 'Michael Chen', destination: 'San Jose, CA', status: 'Delivered', ETA: '11:00 AM' },
  ];

  return (
    <div className="delivery-coordination-content fade-in">
      <div className="pane-header mb-8">
        <h2>Delivery Coordination</h2>
        <p>Prepare orders for shipping, track delivery status, and coordinate with carriers.</p>
      </div>

      <div className="delivery-tracking-map glass-card mb-8">
        <div className="map-overlay">
          <div className="map-stats">
            <div className="m-stat">
              <Truck size={18} className="text-primary" />
              <span>4 Active Deliveries</span>
            </div>
            <div className="m-stat">
              <CheckCircle size={18} className="text-success" />
              <span>12 Today's Deliveries</span>
            </div>
          </div>
          <div className="map-marker" style={{ top: '40%', left: '30%' }}>
            <div className="marker-ping" />
            <Truck size={24} className="marker-icon" />
          </div>
          <div className="map-placeholder-text">
            Interactive AI Delivery Map
            <span>Real-time logistics tracking active</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="section-header mb-6">
          <h3><Package size={20} /> Shipping Queue</h3>
          <div className="search-box-sm">
            <Search size={16} />
            <input type="text" placeholder="Track delivery ID..." />
          </div>
        </div>

        <table className="staff-table">
          <thead>
            <tr>
              <th>Delivery ID</th>
              <th>Order</th>
              <th>Destination</th>
              <th>ETA</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((del, i) => (
              <tr key={i}>
                <td><strong>{del.id}</strong></td>
                <td>{del.order}</td>
                <td><div className="flex items-center gap-2"><MapPin size={14} className="text-muted" /> {del.destination}</div></td>
                <td><div className="flex items-center gap-2"><Clock size={14} className="text-muted" /> {del.ETA}</div></td>
                <td>
                  <span className={`status-pill ${del.status.toLowerCase().replace(/ /g, '-')}`}>
                    {del.status}
                  </span>
                </td>
                <td>
                  <button className="outline-btn-xs">Update Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .delivery-tracking-map { height: 250px; position: relative; overflow: hidden; background: #0f172a; border: 1px solid var(--border-color); }
        .map-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .map-placeholder-text { text-align: center; color: var(--text-muted); font-weight: 700; letter-spacing: 1px; text-transform: uppercase; font-size: 0.9rem; }
        .map-placeholder-text span { display: block; font-size: 0.7rem; font-weight: 500; margin-top: 0.5rem; opacity: 0.7; }
        
        .map-stats { position: absolute; top: 1.5rem; left: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; z-index: 2; }
        .m-stat { background: var(--sidebar-bg); padding: 0.6rem 1rem; border-radius: 10px; border: 1px solid var(--border-color); display: flex; align-items: center; gap: 0.75rem; font-size: 0.8rem; font-weight: 700; }

        .map-marker { position: absolute; z-index: 1; }
        .marker-icon { color: var(--primary); filter: drop-shadow(0 0 10px var(--primary)); }
        .marker-ping { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: rgba(99, 102, 241, 0.2); border-radius: 50%; animation: ping 2s infinite; }
        @keyframes ping { 0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(2); opacity: 0; } }

        .status-pill.in-transit { background: rgba(34, 211, 238, 0.1); color: var(--accent); }
        .status-pill.preparing { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
      `}</style>
    </div>
  );
};

export default DeliveryCoordination;

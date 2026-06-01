import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Truck, MapPin, Navigation, CheckCircle, Clock, 
  AlertTriangle, Search, Filter, Package, User, 
  Phone, ExternalLink, BarChart3, MoreVertical,
  Activity, Zap, ShieldCheck, RefreshCw
} from 'lucide-react';
import './DeliveryManager.css';

const DeliveryManager = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSupplierView = location.pathname.includes('/suppliers/tracking');

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const deliveries = [
    { id: 1, order: '#SHIP-9825', customer: 'TechGlobal Inc.', address: 'Shenzhen Gateway', status: 'In Transit', courier: 'Cargo Jet 702', time: 'Est. 2 days' },
    { id: 2, order: '#SHIP-9821', customer: 'FashionFlow Ltd.', address: 'Milan Logistics Hub', status: 'Arrived', courier: 'Express Van 12', time: 'Delivered' },
    { id: 3, order: '#SHIP-9815', customer: 'EcoHome Solutions', address: 'Berlin Central', status: 'Delayed', courier: 'TBD', time: 'Unknown' },
  ];

  return (
    <div className="logistics-governance-container fade-in">
      <header className="logistics-gov-header">
        <div className="header-title-v4">
          <div className="icon-hub-v4"><Navigation size={28} /></div>
          <div className="text-hub-v4">
            <h1>{isSupplierView ? 'Supply Chain Logistics' : 'Logistics & Delivery Control'}</h1>
            <p>Real-time monitoring of global shipments, fleet telemetry, and route optimization.</p>
          </div>
        </div>
        <div className="header-stats-mini">
          <div className="h-mini-stat"><span>Fleet Active</span><strong>12</strong></div>
          <div className="h-mini-stat"><span>On-Time Rate</span><strong>96%</strong></div>
        </div>
      </header>

      {isSupplierView && (
        <div className="gov-tabs-suite">
          <button className="gov-tab-v4" onClick={() => navigate('/admin/suppliers')}>Partner Directory</button>
          <button className="gov-tab-v4" onClick={() => navigate('/admin/suppliers/requests')}>Procurement Requests</button>
          <button className="gov-tab-v4 active">Logistics Tracking</button>
          <button className="gov-tab-v4" onClick={() => navigate('/admin/reports/suppliers')}>Supply Chain Reports</button>
        </div>
      )}

      <div className="logistics-grid-v4">
        <div className="glass-card fleet-telemetry-v4">
          <div className="card-header-v4">
            <Zap size={20} />
            <h3>Fleet Telemetry</h3>
            <span className="live-indicator">LIVE</span>
          </div>
          <div className="telemetry-list-v4">
            {[
              { name: 'Drone Delta-1', status: 'In Air', battery: 84, color: '#10b981' },
              { name: 'Autonomous Van 02', status: 'Charging', battery: 12, color: '#f59e0b' },
              { name: 'Standard Truck 05', status: 'Stationary', battery: 100, color: '#6366f1' },
            ].map((f, i) => (
              <div key={i} className="tel-item-v4">
                <div className="tel-info-v4">
                  <p>{f.name}</p>
                  <span>{f.status} • {f.battery}% Energy</span>
                </div>
                <div className="tel-meter-v4">
                  <div className="tel-meter-fill" style={{ width: `${f.battery}%`, backgroundColor: f.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card shipments-card-v4">
          <div className="card-header-v4">
            <Package size={20} />
            <h3>Active Shipments</h3>
            <div className="search-box-v4">
              <Search size={16} />
              <input type="text" placeholder="Search tracking ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="shipment-table-wrapper">
            <table className="gov-table-v4">
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Origin / Partner</th>
                  <th>Carrier</th>
                  <th>Status</th>
                  <th className="text-right">Intelligence</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((d) => (
                  <tr key={d.id}>
                    <td><strong>{d.order}</strong></td>
                    <td>
                      <div className="actor-profile-v4">
                        <div className="actor-avatar-v4 sm">{d.customer[0]}</div>
                        <div className="actor-info-v4">
                          <span className="actor-name-v4 sm">{d.customer}</span>
                          <span className="actor-email-v4 sm">{d.address}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="carrier-badge-v4">{d.courier}</span></td>
                    <td>
                      <div className={`status-pill-v4 ${d.status.toLowerCase().replace(' ', '-')}`}>
                        {d.status === 'Delayed' ? <AlertTriangle size={14} /> : <Clock size={14} />}
                        <span>{d.status}</span>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="action-hub-v4">
                        <button className="action-hub-btn"><ExternalLink size={16} /></button>
                        <button className="action-hub-btn"><Activity size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryManager;

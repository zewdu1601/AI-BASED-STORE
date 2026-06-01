import React from 'react';
import { Truck, MapPin, Package, Clock, CheckCircle, Search, Calendar, ChevronRight } from 'lucide-react';

const DeliveryManagement = () => {
  const shipments = [
    { id: 'SHP-7721', po: '#PO-5503', destination: 'Main Store Hub', status: 'In Transit', progress: 75, courier: 'Global Express' },
    { id: 'SHP-7725', po: '#PO-5502', destination: 'Warehouse B', status: 'Preparing', progress: 20, courier: 'Internal Fleet' },
    { id: 'SHP-7690', po: '#PO-5488', destination: 'Main Store Hub', status: 'Delivered', progress: 100, courier: 'Express Plus' },
  ];

  return (
    <div className="delivery-mgmt-content fade-in">
      <div className="pane-header mb-8">
        <h2>Delivery Management</h2>
        <p>Schedule shipments, track active deliveries, and confirm successful handovers.</p>
      </div>

      <div className="delivery-grid grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3><Truck size={20} className="text-accent" /> Active Shipments</h3>
              <div className="flex gap-2">
                <button className="bg-main px-4 py-2 rounded-lg border border-color text-xs font-bold flex items-center gap-2">
                  <Calendar size={14} /> Schedule New
                </button>
              </div>
            </div>

            <div className="shipment-list flex flex-col gap-6">
              {shipments.map((s, i) => (
                <div key={i} className="s-card bg-main/50 p-6 rounded-2xl border border-color hover:border-accent transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black text-accent uppercase tracking-tighter">{s.id}</span>
                        <span className="text-muted text-xs">•</span>
                        <span className="text-xs font-bold text-muted uppercase">{s.po}</span>
                      </div>
                      <h4 className="font-bold text-lg flex items-center gap-2"><MapPin size={16} className="text-muted" /> {s.destination}</h4>
                    </div>
                    <span className={`status-pill ${s.status.toLowerCase().replace(/ /g, '-')}`}>{s.status}</span>
                  </div>

                  <div className="progress-container mb-4">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-muted">Shipment Progress</span>
                      <span>{s.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent transition-all" style={{ width: `${s.progress}%` }} />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div className="text-xs font-bold flex items-center gap-2">
                      <Package size={14} className="text-muted" /> {s.courier}
                    </div>
                    <button className="text-accent text-xs font-bold flex items-center gap-1">Track Live <ChevronRight size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="logistics-sidebar">
          <div className="glass-card p-6 mb-6">
            <h3 className="mb-6">Logistics Overview</h3>
            <div className="flex flex-col gap-6">
              <div className="l-stat flex items-center gap-4">
                <div className="p-3 bg-accent/10 text-accent rounded-xl"><Package size={20} /></div>
                <div><h4 className="text-lg font-bold">1,240</h4><p className="text-xs text-muted font-bold uppercase">Units in Transit</p></div>
              </div>
              <div className="l-stat flex items-center gap-4">
                <div className="p-3 bg-green-500/10 text-green-500 rounded-xl"><CheckCircle size={20} /></div>
                <div><h4 className="text-lg font-bold">18</h4><p className="text-xs text-muted font-bold uppercase">Successful Today</p></div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="mb-4">Quick Tracking</h3>
            <div className="bg-main p-3 rounded-xl border border-color flex items-center gap-3">
              <Search size={18} className="text-muted" />
              <input type="text" placeholder="Enter SHP ID..." className="bg-transparent border-none outline-none text-sm font-bold flex-1" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .status-pill.in-transit { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .status-pill.preparing { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .status-pill.delivered { background: rgba(16, 185, 129, 0.1); color: #10b981; }
      `}</style>
    </div>
  );
};

export default DeliveryManagement;

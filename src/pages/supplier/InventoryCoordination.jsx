import React from 'react';
import { Warehouse, AlertTriangle, Check, X, Truck, Calendar } from 'lucide-react';

const InventoryCoordination = () => {
  const requests = [
    { id: '#REQ-201', product: 'Smart Watch Pro', quantity: 200, priority: 'Critical', date: '2023-10-25' },
    { id: '#REQ-202', product: 'Noise Cancelling Headphones', quantity: 150, priority: 'High', date: '2023-10-26' },
  ];

  return (
    <div className="inventory-coord-content fade-in">
      <div className="pane-header mb-8">
        <h2>Inventory Coordination</h2>
        <p>Manage restock requests from Admin, approve supplies, and coordinate warehouse logistics.</p>
      </div>

      <div className="coord-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="requests-section glass-card p-6">
          <h3 className="flex items-center gap-3 mb-6"><AlertTriangle size={20} className="text-warning" /> Incoming Restock Requests</h3>
          <div className="req-list flex flex-col gap-4">
            {requests.map((req, i) => (
              <div key={i} className={`req-card p-5 rounded-2xl border ${req.priority === 'Critical' ? 'border-danger/30 bg-danger/5' : 'border-color bg-main'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-bold text-muted uppercase tracking-wider">{req.id}</span>
                    <h4 className="text-lg font-bold mt-1">{req.product}</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${req.priority === 'Critical' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'}`}>
                    {req.priority}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm font-bold"><span className="text-muted">Quantity:</span> {req.quantity} Units</div>
                  <div className="flex gap-2">
                    <button className="bg-success text-white p-2 rounded-lg hover:brightness-110 transition-all"><Check size={18} /></button>
                    <button className="bg-danger text-white p-2 rounded-lg hover:brightness-110 transition-all"><X size={18} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="warehouse-status glass-card p-6">
          <h3 className="flex items-center gap-3 mb-6"><Warehouse size={20} className="text-accent" /> Warehouse Logistics</h3>
          <div className="w-status-card bg-main p-6 rounded-2xl border border-color">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-accent/10 text-accent rounded-xl"><Truck size={24} /></div>
              <div>
                <p className="text-xs font-bold text-muted uppercase">Next Scheduled Pickup</p>
                <h4 className="text-xl font-bold">Tomorrow, 10:00 AM</h4>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm py-2 border-b border-white/5">
                <span className="text-muted">Carrier</span>
                <span className="font-bold">Global Logistics Inc.</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-white/5">
                <span className="text-muted">Loading Dock</span>
                <span className="font-bold">Dock 4 (Priority)</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-muted">Vehicle Plate</span>
                <span className="font-bold">CA-8821-X</span>
              </div>
            </div>
            <button className="w-full mt-6 py-3 border border-accent text-accent rounded-xl font-bold hover:bg-accent/10 transition-all">
              Update Dispatch Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryCoordination;

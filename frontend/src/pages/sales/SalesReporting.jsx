import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Target, FileText, Download } from 'lucide-react';

const SalesReporting = () => {
  return (
    <div className="sales-reporting-content fade-in">
      <div className="pane-header mb-8">
        <div className="h-left">
          <h2>Reporting & Analytics</h2>
          <p>Monitor revenue, track sales performance, and generate daily operational reports.</p>
        </div>
        <div className="h-right flex gap-3">
          <button className="btn-secondary"><Download size={18} /> Export CSV</button>
          <button className="btn-primary"><FileText size={18} /> Daily Shift Report</button>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="glass-card chart-main">
          <div className="chart-header-row">
            <h3>Revenue Overview</h3>
            <select className="chart-select">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="chart-placeholder">
            <div className="bar-grid">
              {[60, 80, 45, 90, 70, 85, 100].map((h, i) => (
                <div key={i} className="bar-group">
                  <div className="bar-fill" style={{ height: `${h}%` }}>
                    <div className="bar-tooltip">$1,240</div>
                  </div>
                  <span>Day {i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reporting-side">
          <div className="glass-card perf-card">
            <h4 className="flex items-center gap-2 mb-4"><Target size={18} className="text-accent" /> Sales Target</h4>
            <div className="progress-circle-container">
              <div className="p-circle">
                <span className="p-val">82%</span>
              </div>
            </div>
            <p className="p-footer">You are <strong>$840</strong> away from today's target!</p>
          </div>

          <div className="glass-card stat-mini mt-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-muted text-xs font-bold uppercase">Avg Transaction</p>
              <TrendingUp size={14} className="text-success" />
            </div>
            <h3 className="text-2xl font-bold">$114.20</h3>
            <span className="text-xs text-success font-bold">+5.4% from yesterday</span>
          </div>
        </div>
      </div>

      <div className="glass-card table-section mt-8">
        <div className="section-header mb-6">
          <h3>Best Selling Products (Today)</h3>
        </div>
        <table className="staff-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Product Name</th>
              <th>Quantity Sold</th>
              <th>Total Revenue</th>
              <th>Growth</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="rank-badge gold">1</span></td>
              <td>Smart Watch Pro</td>
              <td>12 Units</td>
              <td>$2,388.00</td>
              <td><span className="text-success flex items-center gap-1 font-bold">+15% <TrendingUp size={14} /></span></td>
            </tr>
            <tr>
              <td><span className="rank-badge silver">2</span></td>
              <td>Bluetooth Headphones</td>
              <td>8 Units</td>
              <td>$712.00</td>
              <td><span className="text-success flex items-center gap-1 font-bold">+8% <TrendingUp size={14} /></span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <style>{`
        .analytics-grid { display: grid; grid-template-columns: 1fr 300px; gap: 1.5rem; }
        .chart-main { padding: 1.5rem; min-height: 400px; display: flex; flex-direction: column; }
        .chart-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .chart-select { background: var(--bg-main); border: 1px solid var(--border-color); color: white; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.8rem; }
        
        .chart-placeholder { flex: 1; display: flex; align-items: flex-end; padding-bottom: 2rem; border-left: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); position: relative; }
        .bar-grid { width: 100%; display: flex; justify-content: space-around; align-items: flex-end; height: 100%; padding: 0 1rem; }
        .bar-group { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; width: 40px; }
        .bar-fill { width: 100%; background: linear-gradient(to top, var(--primary), var(--accent)); border-radius: 6px 6px 0 0; position: relative; transition: all 0.3s; }
        .bar-fill:hover { filter: brightness(1.2); }
        .bar-tooltip { position: absolute; top: -30px; left: 50%; transform: translateX(-50%); background: black; color: white; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem; opacity: 0; transition: opacity 0.2s; pointer-events: none; }
        .bar-fill:hover .bar-tooltip { opacity: 1; }
        .bar-group span { font-size: 0.7rem; color: var(--text-muted); font-weight: 700; }

        .progress-circle-container { display: flex; justify-content: center; padding: 1rem 0; }
        .p-circle { width: 120px; height: 120px; border-radius: 50%; border: 10px solid rgba(34, 211, 238, 0.1); border-top-color: var(--accent); display: flex; align-items: center; justify-content: center; }
        .p-val { font-size: 1.5rem; font-weight: 800; color: var(--accent); }
        .perf-card { padding: 1.5rem; text-align: center; }
        .p-footer { font-size: 0.8rem; color: var(--text-muted); margin-top: 1rem; }

        .rank-badge { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; }
        .rank-badge.gold { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
        .rank-badge.silver { background: rgba(148, 163, 184, 0.2); color: #94a3b8; }
      `}</style>
    </div>
  );
};

export default SalesReporting;

import React from 'react';
import { 
  TrendingUp, TrendingDown, Users, 
  ShoppingBag, Target, Zap 
} from 'lucide-react';

const AdminAnalytics = () => {
  return (
    <div className="analytics-container view-fade">
      <div className="analytics-header">
        <h1>Advanced BI Insights</h1>
        <div className="time-filter glass-card">
          <button className="active">7D</button>
          <button>1M</button>
          <button>3M</button>
          <button>1Y</button>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="glass-card chart-card wide">
          <div className="card-top">
            <h3>Revenue Growth</h3>
            <span className="trend positive"><TrendingUp size={16} /> +12.4%</span>
          </div>
          <div className="chart-simulation">
            {/* Simulation of a line chart */}
            <div className="line-chart">
              {[40, 60, 45, 90, 70, 85, 100].map((h, i) => (
                <div key={i} className="bar" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card stat-detail">
          <Target size={32} className="icon" />
          <h3>Conversion Rate</h3>
          <p className="value">4.2%</p>
          <span>Industry Avg: 2.1%</span>
        </div>

        <div className="glass-card stat-detail">
          <Zap size={32} className="icon" />
          <h3>AI Contribution</h3>
          <p className="value">38%</p>
          <span>Orders via Recommendations</span>
        </div>

        <div className="glass-card list-card">
          <h3>Top Performing Categories</h3>
          <div className="list-items">
            <div className="list-item"><span>1. Electronics</span> <strong>$45k</strong></div>
            <div className="list-item"><span>2. Wearables</span> <strong>$28k</strong></div>
            <div className="list-item"><span>3. Smart Home</span> <strong>$15k</strong></div>
          </div>
        </div>

        <div className="glass-card list-card">
          <h3>Customer Segmentation</h3>
          <div className="segment-bars">
            <div className="segment"><label>VIP</label> <div className="bar-bg"><div className="bar-fill" style={{ width: '15%' }} /></div></div>
            <div className="segment"><label>Loyal</label> <div className="bar-bg"><div className="bar-fill" style={{ width: '45%' }} /></div></div>
            <div className="segment"><label>New</label> <div className="bar-bg"><div className="bar-fill" style={{ width: '30%' }} /></div></div>
            <div className="segment"><label>At Risk</label> <div className="bar-bg"><div className="bar-fill" style={{ width: '10%' }} /></div></div>
          </div>
        </div>
      </div>

      <style>{`
        .analytics-container { display: flex; flex-direction: column; gap: 2rem; }
        .analytics-header { display: flex; justify-content: space-between; align-items: center; }
        .time-filter { display: flex; gap: 0.5rem; padding: 0.5rem; }
        .time-filter button { padding: 0.4rem 1rem; border-radius: 0.5rem; background: transparent; font-size: 0.8rem; }
        .time-filter button.active { background: var(--primary); color: white; }
        
        .analytics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .chart-card.wide { grid-column: span 2; padding: 2rem; height: 350px; }
        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .trend { display: flex; align-items: center; gap: 0.4rem; font-weight: 700; font-size: 0.9rem; }
        .trend.positive { color: #10b981; }
        
        .chart-simulation { height: 200px; display: flex; align-items: flex-end; }
        .line-chart { width: 100%; height: 100%; display: flex; align-items: flex-end; gap: 2rem; padding: 0 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .bar { flex: 1; background: linear-gradient(to top, var(--primary), var(--accent)); border-radius: 0.4rem 0.4rem 0 0; opacity: 0.8; }
        
        .stat-detail { padding: 2.5rem; text-align: center; }
        .stat-detail .icon { color: var(--accent); margin: 0 auto 1.5rem; }
        .stat-detail .value { font-size: 2.5rem; font-weight: 800; margin: 0.5rem 0; }
        .stat-detail span { color: var(--text-muted); font-size: 0.85rem; }
        
        .list-card { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .list-item { display: flex; justify-content: space-between; padding: 1rem; background: rgba(255,255,255,0.02); border-radius: 0.8rem; }
        
        .segment-bars { display: flex; flex-direction: column; gap: 1rem; }
        .segment { display: flex; align-items: center; gap: 1rem; }
        .segment label { width: 60px; font-size: 0.85rem; color: var(--text-muted); }
        .bar-bg { flex: 1; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; }
        .bar-fill { height: 100%; background: var(--accent); border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default AdminAnalytics;


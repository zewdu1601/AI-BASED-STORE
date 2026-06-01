import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Target, 
  Users, 
  BarChart, 
  TrendingUp, 
  Search, 
  History, 
  FileText, 
  Activity,
  Zap,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  MousePointer2,
  PieChart,
  LineChart
} from 'lucide-react';
import './AIRecommendations.css';

const AIRecommendations = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const metrics = [
    { label: 'Recommendation Accuracy', value: '94.2%', icon: Target, trend: '+2.1%', positive: true },
    { label: 'Conversion Rate', value: '18.5%', icon: Activity, trend: '+5.4%', positive: true },
    { label: 'AI Predicted Sales', value: '$84,200', icon: TrendingUp, trend: '+12%', positive: true },
    { label: 'Customer Insights', value: '2.4k', icon: Users, trend: '+150', positive: true },
  ];

  return (
    <div className="ai-recommendations">
      <header className="page-header">
        <div>
          <h1 className="page-title">AI Recommendation Dashboard</h1>
          <p className="page-subtitle">Harness neural insights to optimize sales and customer engagement.</p>
        </div>
        <div className="header-actions">
          <div className="ai-status-pill">
            <Zap size={16} fill="currentColor" />
            <span>AI Engine: Active</span>
          </div>
        </div>
      </header>

      <div className="glass-card ai-metrics-grid">
        {metrics.map((m, i) => (
          <div key={i} className="ai-metric-card">
            <div className="m-header">
              <div className="m-icon"><m.icon size={20} /></div>
              <span className={`m-trend ${m.positive ? 'positive' : 'negative'}`}>{m.trend}</span>
            </div>
            <div className="m-body">
              <h3>{m.value}</h3>
              <p>{m.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card ai-tabs">
        <button className={`ai-tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}><PieChart size={18} /> Overview</button>
        <button className={`ai-tab-btn ${activeTab === 'behavior' ? 'active' : ''}`} onClick={() => setActiveTab('behavior')}><Users size={18} /> Behavior Analysis</button>
        <button className={`ai-tab-btn ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}><History size={18} /> Prediction Logs</button>
        <button className={`ai-tab-btn ${activeTab === 'config' ? 'active' : ''}`} onClick={() => setActiveTab('config')}><BrainCircuit size={18} /> Model Configuration</button>
      </div>

      <div className="ai-content">
        {activeTab === 'overview' && (
          <div className="ai-overview-grid">
            <div className="glass-card ai-chart-card large">
              <div className="card-header">
                <h3>Customer Buying Trends</h3>
                <span className="time-range">Last 30 Days</span>
              </div>
              <div className="mock-ai-chart">
                <div className="chart-glow-line"></div>
                {/* Visual representing AI data processing */}
                <div className="data-points">
                  {[1, 2, 3, 4, 5, 6, 7].map(i => (
                    <div key={i} className="data-node" style={{ left: `${(i-1)*15}%`, top: `${Math.random()*60 + 20}%` }}></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card ai-insights-sidebar">
              <h3>Top AI Insights</h3>
              <div className="insight-list">
                <div className="insight-item">
                  <TrendingUp className="text-positive" size={20} />
                  <div className="i-text">
                    <p>Electronics bundle recommended</p>
                    <span>Predicted 25% lift in AOV</span>
                  </div>
                </div>
                <div className="insight-item">
                  <Users className="text-secondary" size={20} />
                  <div className="i-text">
                    <p>High-value segment identified</p>
                    <span>120 customers ready for loyalty upgrade</span>
                  </div>
                </div>
                <div className="insight-item">
                  <Zap className="text-primary" size={20} />
                  <div className="i-text">
                    <p>Smart Stock Optimization</p>
                    <span>AI suggests restocking Home Hub now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'behavior' && (
          <div className="glass-card table-wrapper">
            <div className="table-header-custom">
              <h3>Customer Interaction Logs</h3>
              <div className="search-box-sm">
                <Search size={16} />
                <input type="text" placeholder="Search interactions..." />
              </div>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Last Interaction</th>
                  <th>Inferred Interest</th>
                  <th>Engagement Score</th>
                  <th>AI Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Alex Thompson', action: 'Viewed Smart Watch', interest: 'Wearables', score: 8.5, rec: 'Series 7 Pro' },
                  { name: 'Sarah Miller', action: 'Purchased AirPods', interest: 'Audio', score: 9.2, rec: 'Headphone Case' },
                  { name: 'John Doe', action: 'Search: Laptop', interest: 'Computing', score: 6.8, rec: 'MacBook M3' },
                ].map((item, idx) => (
                  <tr key={idx}>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.action}</td>
                    <td><span className="category-badge">{item.interest}</span></td>
                    <td>
                      <div className="score-meter">
                        <div className="score-fill" style={{ width: `${item.score * 10}%` }}></div>
                        <span>{item.score}</span>
                      </div>
                    </td>
                    <td><button className="rec-btn-sm"><Zap size={12} /> {item.rec}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendations;

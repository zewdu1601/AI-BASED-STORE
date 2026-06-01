import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Printer, 
  BarChart, 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  BrainCircuit, 
  Calendar,
  Filter,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Truck
} from 'lucide-react';
import './ReportGenerator.css';

const ReportGenerator = () => {
  const location = useLocation();
  
  // Determine initial report type based on path
  const getInitialType = () => {
    if (location.pathname.includes('/reports/staff')) return 'Staff Reports';
    if (location.pathname.includes('/reports/sales')) return 'Sales Reports';
    if (location.pathname.includes('/reports/inventory')) return 'Inventory Reports';
    if (location.pathname.includes('/reports/ai')) return 'AI Analytics';
    if (location.pathname.includes('/reports/suppliers')) return 'Supplier Reports';
    return 'Sales Reports';
  };

  const [reportType, setReportType] = useState(getInitialType());
  const [dateRange, setDateRange] = useState('Last 30 Days');

  useEffect(() => {
    setReportType(getInitialType());
  }, [location.pathname]);

  const reportCategories = [
    { name: 'Sales Reports', icon: TrendingUp, desc: 'Detailed revenue and transaction analysis.' },
    { name: 'Product Reports', icon: Package, desc: 'Performance tracking for individual items.' },
    { name: 'Customer Reports', icon: Users, desc: 'Demographics and buying behavior patterns.' },
    { name: 'Inventory Reports', icon: BarChart, desc: 'Stock turnover and warehouse efficiency.' },
    { name: 'Staff Reports', icon: Clock, desc: 'Attendance and performance metrics.' },
    { name: 'Supplier Reports', icon: Truck, desc: 'Supply chain audits and vendor performance.' },
    { name: 'AI Analytics', icon: BrainCircuit, desc: 'Recommendation accuracy and sales predictions.' },
  ];

  return (
    <div className="admin-reports fade-in">
      <header className="reports-header-v4">
        <div className="header-title-group">
          <h1 className="gov-main-title">Intelligence & Reports</h1>
          <p className="gov-subtitle">Generate high-fidelity audits and performance insights across the store network.</p>
        </div>
        <div className="reports-header-actions">
          <button className="gov-btn secondary"><Activity size={18} /> System Health</button>
          <button className="gov-btn primary"><Download size={18} /> Export All Audits</button>
        </div>
      </header>

      <div className="reports-container-v4">
        {/* Left Column: Intelligence Matrix */}
        <div className="intelligence-matrix">
          <div className="glass-card matrix-card">
            <div className="card-header-mini">
              <ShieldCheck size={20} />
              <h3>Intelligence Matrix</h3>
            </div>
            <div className="intelligence-list">
              {reportCategories.map((cat, i) => (
                <button 
                  key={i} 
                  className={`intelligence-item ${reportType === cat.name ? 'active' : ''}`}
                  onClick={() => setReportType(cat.name)}
                >
                  <div className="intel-icon"><cat.icon size={18} /></div>
                  <div className="intel-info">
                    <p>{cat.name}</p>
                    <span>{cat.desc}</span>
                  </div>
                  <Zap size={14} className="zap-icon" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Engine & Preview */}
        <div className="generation-engine">
          <div className="glass-card engine-card">
            <div className="engine-header">
              <div className="engine-title">
                <Zap size={20} className="text-primary" />
                <h3>{reportType} Engine</h3>
              </div>
              <div className="engine-controls">
                <Calendar size={16} />
                <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>Year to Date</option>
                </select>
              </div>
            </div>

            <div className="report-preview-v4">
              <div className="preview-orb"></div>
              <div className="preview-content">
                <FileText size={48} className="preview-icon" />
                <h4>{reportType} Ready</h4>
                <p>Advanced heuristics applied for <strong>{dateRange}</strong></p>
                <div className="engine-metrics">
                  <div className="eng-met"><span>Complexity</span><strong>High</strong></div>
                  <div className="eng-met"><span>Data Points</span><strong>14.2k</strong></div>
                  <div className="eng-met"><span>Security</span><strong>Encrypted</strong></div>
                </div>
              </div>
            </div>

            <div className="export-suite-v4">
              <button className="export-v4 pdf">
                <FileText size={20} />
                <div className="exp-text"><strong>Generate PDF</strong><span>Document Audit</span></div>
              </button>
              <button className="export-v4 excel">
                <BarChart size={20} />
                <div className="exp-text"><strong>Generate Excel</strong><span>Data Spreadsheet</span></div>
              </button>
              <button className="export-v4 printer">
                <Printer size={20} />
                <div className="exp-text"><strong>Hard Copy</strong><span>Print Terminal</span></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;

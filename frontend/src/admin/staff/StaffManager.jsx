import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, UserPlus, Search, Filter, Mail, Phone, 
  MapPin, Shield, Calendar, DollarSign, Award, 
  Clock, CheckCircle, AlertCircle, MoreVertical,
  Download, FileText, TrendingUp, UserCog, Target,
  RefreshCw, PieChart, Activity
} from 'lucide-react';
import adminService from '../../services/adminService';
import './StaffManager.css';

const StaffManager = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine initial tab based on path
  const getInitialTab = () => {
    if (location.pathname.includes('/attendance')) return 'Attendance';
    if (location.pathname.includes('/salary')) return 'Salary';
    return 'View Staff';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [searchTerm, setSearchTerm] = useState('');
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [location.pathname]);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const data = await adminService.getUsers();
      const staffOnly = data.filter(u => u.role === 'Sales Staff' || u.role === 'Admin');
      setStaff(staffOnly.map(s => ({
        ...s,
        status: Math.random() > 0.2 ? 'On Duty' : 'Off Duty',
        attendance: Math.floor(Math.random() * 15 + 85) + '%',
        performance: Math.floor(Math.random() * 20 + 80),
        salary: (Math.floor(Math.random() * 2000 + 2500))
      })));
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'Attendance') navigate('/admin/staff/attendance');
    else if (tab === 'Salary') navigate('/admin/staff/salary');
    else if (tab === 'Performance Reports') navigate('/admin/reports/staff');
    else navigate('/admin/users'); // View Staff is handled by UserManager with filtering
  };

  const renderContent = () => {
    if (loading) return (
      <div className="gov-loader-container">
        <div className="loader-v2"></div>
        <p>Synchronizing Workforce Data...</p>
      </div>
    );

    switch(activeTab) {
      case 'Attendance':
        return (
          <div className="staff-gov-grid fade-in">
            <div className="glass-card attendance-summary-v4">
              <div className="card-header-v4">
                <Clock size={20} />
                <h3>Attendance Insights</h3>
                <span className="live-indicator">LIVE MONITORING</span>
              </div>
              <div className="stat-grid-v4">
                <div className="stat-card-v4 present">
                  <span className="stat-val">{staff.filter(s => s.status === 'On Duty').length}</span>
                  <span className="stat-lab">On Duty</span>
                </div>
                <div className="stat-card-v4 late">
                  <span className="stat-val">2</span>
                  <span className="stat-lab">Late Arrival</span>
                </div>
                <div className="stat-card-v4 absent">
                  <span className="stat-val">{staff.filter(s => s.status === 'Off Duty').length}</span>
                  <span className="stat-lab">Off Duty</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card log-card-v4">
              <div className="card-header-v4">
                <Activity size={20} />
                <h3>Real-time Shift Log</h3>
              </div>
              <div className="shift-log-list">
                {staff.map(member => (
                  <div key={member._id} className="shift-log-item">
                    <div className="staff-meta-mini">
                      <div className="avatar-mini-v4">{member.name[0]}</div>
                      <div>
                        <p className="m-name">{member.name}</p>
                        <p className="m-time">In: 08:30 AM | Out: --</p>
                      </div>
                    </div>
                    <span className={`status-pill-v4 ${member.status.toLowerCase().replace(' ', '-')}`}>
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'Salary':
        return (
          <div className="staff-gov-grid fade-in">
            <div className="glass-card salary-overview-v4">
              <div className="card-header-v4">
                <DollarSign size={20} />
                <h3>Payroll Command</h3>
              </div>
              <div className="payroll-stats-v4">
                <div className="p-box">
                  <span>Monthly Budget</span>
                  <h4>${(staff.length * 3200).toLocaleString()}</h4>
                </div>
                <div className="p-box highlight">
                  <span>Pending Payouts</span>
                  <h4>$12,400</h4>
                </div>
              </div>
              <button className="gov-action-btn primary full">Process Workforce Payroll</button>
            </div>
            
            <div className="glass-card table-card-v4">
              <div className="card-header-v4">
                <PieChart size={20} />
                <h3>Salary Structures</h3>
              </div>
              <table className="gov-table-v4">
                <thead>
                  <tr>
                    <th>Staff Member</th>
                    <th>Base Salary</th>
                    <th>Incentives</th>
                    <th>Total Payout</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map(member => (
                    <tr key={member._id}>
                      <td><strong>{member.name}</strong></td>
                      <td>${member.salary.toLocaleString()}</td>
                      <td><span className="text-emerald">+$250.00</span></td>
                      <td className="text-highlight">${(member.salary + 250).toLocaleString()}</td>
                      <td className="text-right"><button className="hub-btn"><FileText size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const tabs = [
    { id: 'View Staff', label: 'Workforce Overview', path: '/admin/users' },
    { id: 'Attendance', label: 'Attendance Tracking', path: '/admin/staff/attendance' },
    { id: 'Salary', label: 'Payroll Management', path: '/admin/staff/salary' },
    { id: 'Performance Reports', label: 'Compliance Reports', path: '/admin/reports/staff' }
  ];

  return (
    <div className="staff-governance-container fade-in">
      <header className="staff-gov-header">
        <div className="header-title-v4">
          <div className="icon-hub-v4"><UserCog size={28} /></div>
          <div className="text-hub-v4">
            <h1>Sales Staff Governance</h1>
            <p>Integrated oversight of workforce attendance, payroll, and operational compliance.</p>
          </div>
        </div>
        <div className="header-stats-mini">
          <div className="h-mini-stat"><span>Active Staff</span><strong>{staff.length}</strong></div>
          <div className="h-mini-stat"><span>Average Performance</span><strong>94%</strong></div>
        </div>
      </header>

      <div className="gov-tabs-suite">
        {tabs.map(tab => (
          <button 
            key={tab.id} 
            className={`gov-tab-v4 ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="gov-body-v4">
        {renderContent()}
      </div>
    </div>
  );
};

export default StaffManager;

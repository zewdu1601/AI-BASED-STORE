import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, Search, Plus, MoreVertical, Shield, 
  Trash2, Edit, Lock, Unlock, Mail, 
  CheckCircle, XCircle, Filter, ArrowRight,
  UserCheck, UserX, Activity, Bell,
  Briefcase, Building, ShoppingBag, Eye,
  AlertTriangle, History, Send, Key, RefreshCw
} from 'lucide-react';
import adminService from '../../services/adminService';
import './UserManager.css';

const UserManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse role from query string
  const getRoleFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('role');
  };

  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(getRoleFromQuery() || 'All');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notification, setNotification] = useState({ title: '', message: '', type: 'System', priority: 'Normal' });

  const tabs = [
    { name: 'All', icon: <Users size={16} /> },
    { name: 'Admin', icon: <Shield size={16} /> },
    { name: 'Sales Staff', icon: <Briefcase size={16} /> },
    { name: 'Supplier', icon: <Building size={16} /> },
    { name: 'Customer', icon: <ShoppingBag size={16} /> },
    { name: 'Logs', icon: <History size={16} /> }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const role = getRoleFromQuery();
    if (role) setActiveTab(role);
    else if (location.pathname === '/admin/users' && !location.search) setActiveTab('All');
  }, [location.search, location.pathname]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const userData = await adminService.getUsers();
      const logData = await adminService.getAuditLogs();
      setUsers(userData);
      setAuditLogs(logData);
    } catch (err) {
      console.error('Error fetching management data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (userId) => {
    if (!window.confirm('Reset this user\'s password to a random temporary one?')) return;
    try {
      const res = await adminService.resetPassword(userId);
      alert(res.message);
      fetchData();
    } catch (err) { alert(err.response?.data?.message || 'Reset failed'); }
  };

  const handleSuspend = async (userId) => {
    const reason = prompt('Enter suspension reason:');
    if (!reason) return;
    try {
      await adminService.suspendUser(userId, reason);
      fetchData();
    } catch (err) { alert(err.response?.data?.message || 'Suspension failed'); }
  };

  const handleToggleStatus = async (userId) => {
    try {
      await adminService.toggleUserStatus(userId);
      fetchData();
    } catch (err) { alert(err.response?.data?.message || 'Action failed'); }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to permanently delete this account?')) return;
    try {
      await adminService.deleteUser(userId);
      fetchData();
    } catch (err) { alert(err.response?.data?.message || 'Deletion restricted'); }
  };

  const filteredUsers = users.filter(user => {
    const matchesTab = activeTab === 'All' || user.role === activeTab;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || 
                         (statusFilter === 'Active' && user.isActive) || 
                         (statusFilter === 'Suspended' && !user.isActive);
    return matchesTab && matchesSearch && matchesStatus;
  });

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Admin': return 'badge-gold';
      case 'Sales Staff': return 'badge-emerald';
      case 'Supplier': return 'badge-sky';
      case 'Customer': return 'badge-purple';
      default: return 'badge-gray';
    }
  };

  if (loading) return (
    <div className="management-loading">
      <div className="loader-v2"></div>
      <p>Synchronizing Actor Ecosystem...</p>
    </div>
  );

  return (
    <div className="governance-container fade-in">
      <header className="gov-header">
        <div className="gov-title-area">
          <h1 className="gov-main-title">Central Governance & Actor Control</h1>
          <p className="gov-subtitle">Governing {users.length} system actors across the integrated supply chain.</p>
          <div className="gov-header-actions">
            <button className="header-action-btn" onClick={fetchData}><Activity size={14} /> Refresh State</button>
            <button className="header-action-btn primary" onClick={() => navigate(`/admin/users/add?role=${activeTab !== 'All' && activeTab !== 'Logs' ? activeTab : 'Admin'}`)}><Plus size={14} /> Add User</button>
          </div>
        </div>
      </header>

      <div className="gov-main-card glass-card">
        <div className="gov-tabs-row">
          {tabs.map(tab => (
            <button 
              key={tab.name} 
              className={`gov-tab-v4 ${activeTab === tab.name ? 'active' : ''}`} 
              onClick={() => { setActiveTab(tab.name); navigate(tab.name === 'All' ? '/admin/users' : `/admin/users?role=${tab.name}`); }}
            >
              {tab.icon}
              <span>{tab.name}</span>
              {tab.name !== 'Logs' && (
                <span className="count-tag-v4">
                  {tab.name === 'All' ? users.length : users.filter(u => u.role === tab.name).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab !== 'Logs' && (
          <div className="gov-filter-suite">
            <div className="gov-search-box-v4">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search actors by name or email..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
            <div className="gov-status-select">
              <Filter size={14} />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Statuses</option>
                <option value="Active">Active Only</option>
                <option value="Suspended">Suspended / Pending</option>
              </select>
            </div>
          </div>
        )}

        <div className="gov-table-wrapper">
          {activeTab === 'Logs' ? (
            <table className="gov-table-v4 logs">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Administrator</th>
                  <th>Action</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log, i) => (
                  <tr key={i}>
                    <td className="log-time-v4">{new Date(log.createdAt).toLocaleString()}</td>
                    <td><strong>{log.user?.name || 'System'}</strong></td>
                    <td><span className={`log-badge-v4 ${log.action.toLowerCase()}`}>{log.action}</span></td>
                    <td className="log-details-v4">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="gov-table-v4 main">
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>System Actor</th>
                  <th style={{ width: '15%' }}>Access Role</th>
                  <th style={{ width: '20%' }}>Status</th>
                  <th style={{ width: '30%', textAlign: 'right' }}>Permissions Management Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user._id}>
                    <td>
                      <div className="actor-profile-v4">
                        <div className="actor-avatar-v4">{user.name.charAt(0)}</div>
                        <div className="actor-info-v4">
                          <span className="actor-name-v4">{user.name}</span>
                          <span className="actor-email-v4">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className={`role-text-v4`}>{user.role.toLowerCase()}</span></td>
                    <td>
                      <div className={`status-pill-v4 ${user.isActive ? 'active' : 'suspended'}`}>
                        {user.isActive ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                        <span>{user.isActive ? 'Verified & Active' : 'Suspended'}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="action-hub-v4">
                        <button className="action-hub-btn" onClick={() => navigate(`/admin/users/edit/${user._id}`)}><Edit size={16} /></button>
                        <button className="action-hub-btn" onClick={() => { setSelectedUser(user); setShowNotifyModal(true); }}><Send size={16} /></button>
                        <button className="action-hub-btn" onClick={() => handleResetPassword(user._id)}><Key size={16} /></button>
                        <button 
                          className={`action-hub-btn ${user.isActive ? 'suspend' : 'activate'}`}
                          onClick={() => user.isActive ? handleSuspend(user._id) : handleToggleStatus(user._id)}
                        >
                          {user.isActive ? <UserX size={16} /> : <UserCheck size={16} />}
                        </button>
                        <button
                          className="action-hub-btn delete"
                          onClick={() => handleDelete(user._id)}
                          disabled={user.username === 'Admin' || user.name === 'Super Admin'}
                          title={user.username === 'Admin' || user.name === 'Super Admin' ? 'Super Admin account cannot be deleted' : 'Delete user'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {filteredUsers.length === 0 && activeTab !== 'Logs' && (
            <div className="empty-state-v4">
              <AlertTriangle size={48} />
              <p>No system actors found in the current governance view.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManager;

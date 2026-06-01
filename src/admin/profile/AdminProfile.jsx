import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Lock, 
  History, 
  Save, 
  Camera, 
  CheckCircle, 
  Smartphone,
  Globe,
  Settings,
  MoreVertical,
  LogOut,
  ChevronRight,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/userService';
import './AdminProfile.css';

const AdminProfile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const fileInputRef = React.useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const loginHistory = [
    { device: 'Chrome on Windows', ip: '192.168.1.45', location: 'California, USA', time: 'Just now' },
    { device: 'Safari on iPhone', ip: '172.16.0.12', location: 'New York, USA', time: '2 hours ago' },
    { device: 'Firefox on MacOS', ip: '10.0.0.8', location: 'London, UK', time: '1 day ago' },
  ];

  return (
    <div className="admin-profile-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Admin Profile</h1>
          <p className="page-subtitle">Manage your personal information, security settings, and account activity.</p>
        </div>
      </header>

      <div className="profile-container-main">
        {/* Left Profile Sidebar */}
        <div className="profile-sidebar-glass">
          <div className="profile-hero">
            <div className="profile-img-container">
              <div className="avatar-large">
                {user?.image ? (
                  <img src={user.image} alt="Profile" className="profile-avatar-img" />
                ) : (
                  <User size={64} />
                )}
                <button 
                  className="upload-icon-btn" 
                  title="Upload Photo"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Camera size={18} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={handleFileUpload}
                  accept="image/*"
                />
              </div>
              <div className="status-badge-online">Online</div>
            </div>
            <h2 className="user-display-name">{user?.name || 'Super Admin'}</h2>
            <p className="user-display-role">System Administrator</p>
          </div>

          <nav className="profile-side-nav">
            <button className={`p-side-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
              <User size={18} /> <span>Personal Info</span>
            </button>
            <button className={`p-side-btn ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
              <Shield size={18} /> <span>Security & 2FA</span>
            </button>
            <button className={`p-side-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
              <History size={18} /> <span>Login History</span>
            </button>
            <button className={`p-side-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
              <Settings size={18} /> <span>Account Settings</span>
            </button>
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="profile-content-glass">
          {activeTab === 'profile' && (
            <div className="profile-pane fade-in">
              <div className="pane-header">
                <h3>Personal Information</h3>
                <button className="save-btn primary"><Save size={18} /> Save Changes</button>
              </div>
              <form className="profile-form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <User size={16} />
                    <input type="text" defaultValue={user?.name || 'Administrator'} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <div className="input-with-icon">
                    <Globe size={16} />
                    <input type="text" defaultValue="admin_main" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={16} />
                    <input type="email" defaultValue={user?.email || 'admin@aistore.com'} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="input-with-icon">
                    <Phone size={16} />
                    <input type="text" defaultValue="+1 (555) 000-0000" />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Office Address</label>
                  <div className="input-with-icon">
                    <MapPin size={16} />
                    <textarea defaultValue="123 Tech Avenue, Silicon Valley, CA" />
                  </div>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="profile-pane fade-in">
              <h3>Security & Authentication</h3>
              
              <div className="security-section">
                <div className="sec-item">
                  <div className="sec-info">
                    <h4>Two-Factor Authentication (2FA)</h4>
                    <p>Add an extra layer of security to your account.</p>
                  </div>
                  <button className="toggle-btn-p active">Enabled</button>
                </div>
                
                <div className="sec-divider"></div>
                
                <div className="sec-item">
                  <div className="sec-info">
                    <h4>Change Password</h4>
                    <p>Last changed 3 months ago.</p>
                  </div>
                  <button className="outline-btn-p" onClick={() => setIsPasswordModalOpen(true)}>
                    <Lock size={16} /> Update Password
                  </button>
                </div>
              </div>

              <div className="glass-card security-alert">
                <Shield className="text-primary" size={24} />
                <div className="alert-text">
                  <p>Account Security Score: <strong>85%</strong></p>
                  <span>We recommend updating your password every 6 months.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="profile-pane fade-in">
              <h3>Recent Login Activity</h3>
              <div className="login-history-list">
                {loginHistory.map((login, i) => (
                  <div key={i} className="login-item-glass">
                    <div className="device-icon-box">
                      {login.device.includes('iPhone') ? <Smartphone size={20} /> : <Globe size={20} />}
                    </div>
                    <div className="login-details-main">
                      <div className="login-head">
                        <h4>{login.device}</h4>
                        <span>{login.time}</span>
                      </div>
                      <p>{login.ip} • {login.location}</p>
                    </div>
                    <div className="login-status-dot active"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="profile-pane fade-in">
              <h3>Account Settings</h3>
              <div className="settings-section">
                <div className="config-item-flex">
                  <div className="config-info">
                    <h4>Language Preference</h4>
                    <p>Select your primary interface language.</p>
                  </div>
                  <select className="select-input-sm">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                
                <div className="sec-divider"></div>
                
                <div className="config-item-flex">
                  <div className="config-info">
                    <h4>Email Notifications</h4>
                    <p>Receive weekly reports and security alerts via email.</p>
                  </div>
                  <button className="toggle-btn-p active">Enabled</button>
                </div>

                <div className="sec-divider"></div>

                <div className="config-item-flex danger-zone">
                  <div className="config-info">
                    <h4 className="text-danger">Deactivate Account</h4>
                    <p>Temporary disable your administrative access.</p>
                  </div>
                  <button className="outline-btn-danger">Deactivate</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="modal-overlay">
          <div className="glass-card modal-content password-modal fade-in">
            <div className="modal-header">
              <div className="header-with-icon">
                <div className="icon-box-primary"><Lock size={20} /></div>
                <div>
                  <h2>Change Password</h2>
                  <p>Update your account security credentials.</p>
                </div>
              </div>
              <button className="close-btn" onClick={() => setIsPasswordModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <form 
              className="password-form" 
              onSubmit={async (e) => { 
                e.preventDefault(); 
                if (passwordForm.new !== passwordForm.confirm) {
                  alert("New passwords do not match!");
                  return;
                }
                try {
                  // Real API call to update password in backend
                  await userService.updateProfile({ password: passwordForm.new });
                  
                  // Sync local state/storage
                  updateUser({ password: passwordForm.new });
                  
                  setIsPasswordModalOpen(false);
                  alert("Password updated successfully and synchronized with database!");
                } catch (err) {
                  console.error(err);
                  alert(err.response?.data?.message || "Failed to update password in database.");
                }
              }}
            >
              <div className="form-group">
                <label>Current Password</label>
                <div className="input-with-icon">
                  <Lock size={16} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>New Password</label>
                <div className="input-with-icon">
                  <Lock size={16} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={passwordForm.new}
                    onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Confirm New Password</label>
                <div className="input-with-icon">
                  <CheckCircle size={16} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setIsPasswordModalOpen(false)}>Cancel</button>
                <button type="submit" className="save-btn primary">Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;

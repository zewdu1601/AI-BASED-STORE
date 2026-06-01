import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Shield, 
  MapPin, 
  Settings, 
  CreditCard, 
  Award,
  Camera,
  History,
  Lock,
  Smartphone,
  CheckCircle,
  XCircle,
  Save,
  ChevronRight,
  Bell,
  Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await userService.getProfile();
        setProfileData(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) loadProfile();
  }, [user]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div className="loading-state">Initializing AI Identity...</div>;

  const navItems = [
    { id: 'account', label: 'My Account', icon: User },
    { id: 'orders', label: 'Order History', icon: ShoppingBag },
    { id: 'wishlist', label: 'My Wishlist', icon: Heart },
    { id: 'addresses', label: 'Shipping Addresses', icon: MapPin },
    { id: 'security', label: 'Security & 2FA', icon: Shield },
    { id: 'loyalty', label: 'Loyalty & Rewards', icon: Award },
    { id: 'settings', label: 'Manage Settings', icon: Settings },
  ];

  return (
    <div className="customer-profile fade-in">
      {/* 👑 A. User Hero Section */}
      <header className="profile-header-main">
        <div className="user-profile-info">
          <div className="avatar-wrapper">
            <div className="avatar-main">
              {user?.image ? (
                <img src={user.image} alt="Profile" className="avatar-img" />
              ) : (
                user?.name?.charAt(0) || 'U'
              )}
            </div>
            <button className="upload-cam-btn" onClick={() => fileInputRef.current.click()}>
              <Camera size={16} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handlePhotoUpload}
              accept="image/*"
            />
          </div>
          <div className="user-text-info">
            <h1>{user?.name || 'Customer'}</h1>
            <p>{user?.email || 'customer@aistore.ai'}</p>
            <div className="status-tag active mt-2">Verified Account</div>
          </div>
        </div>

        <div className="loyalty-card">
          <div className="points-badge">
            <Award size={24} />
            <span>{profileData?.loyaltyPoints || 0} Reward Points</span>
          </div>
          <p className="loyalty-status">Silver Member Benefits Active</p>
        </div>
      </header>

      <div className="profile-layout">
        {/* 🧭 B. Sidebar Navigation */}
        <aside className="profile-nav-sidebar">
          {navItems.map((item) => (
            <button 
              key={item.id}
              className={`p-nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                if (item.id === 'orders') navigate('/orders');
                else if (item.id === 'wishlist') navigate('/wishlist');
                else setActiveTab(item.id);
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
              {activeTab === item.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </aside>

        {/* 📝 C. Main Content Area */}
        <main className="profile-main-content">
          {activeTab === 'account' && (
            <div className="tab-pane fade-in">
              <h2>Personal Information</h2>
              <form className="info-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue={user?.name} placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" defaultValue={profileData?.phone || '+1 (555) 000-0000'} />
                </div>
                <div className="form-group full-width">
                  <label>Email Address</label>
                  <input type="email" defaultValue={user?.email} disabled />
                </div>
                <div className="form-group full-width">
                  <label>Personal Bio</label>
                  <textarea rows="3" defaultValue="Passionate about AI-driven fashion and smart gadgets." />
                </div>
              </form>
              <div className="action-footer">
                <button className="save-btn"><Save size={18} /> Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="tab-pane fade-in">
              <h2>Security & Privacy</h2>
              <div className="config-card-flex">
                <div className="config-info">
                  <h4>Two-Factor Authentication (2FA)</h4>
                  <p>Add an extra layer of security using your smartphone.</p>
                </div>
                <button className="status-tag active">Enabled</button>
              </div>

              <div className="config-card-flex">
                <div className="config-info">
                  <h4>Manage Login Devices</h4>
                  <p>3 active devices linked to your account.</p>
                </div>
                <button className="outline-btn-sm">View Devices</button>
              </div>

              <div className="config-card-flex">
                <div className="config-info">
                  <h4>Change Password</h4>
                  <p>Last updated 2 months ago.</p>
                </div>
                <button className="outline-btn-sm"><Lock size={16} /> Update Password</button>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="tab-pane fade-in">
              <div className="pane-header-flex mb-4">
                <h2>Manage Addresses</h2>
                <button className="btn-primary-sm">+ Add New</button>
              </div>
              <div className="address-grid">
                <div className="address-item default">
                  <span className="addr-type">Shipping Address</span>
                  <span className="default-pill">Default</span>
                  <p className="addr-text">
                    123 Tech Avenue,<br />
                    Silicon Valley, CA 94025<br />
                    United States
                  </p>
                </div>
                <div className="address-item">
                  <span className="addr-type">Billing Address</span>
                  <p className="addr-text">
                    Same as Shipping Address
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'loyalty' && (
            <div className="tab-pane fade-in loyalty-pane">
              <h2>Loyalty & Rewards</h2>
              <div className="loyalty-hero-card glass-card p-4 text-center">
                <Award size={48} className="text-warning mb-3" />
                <h3>Silver Tier Member</h3>
                <p className="text-muted">You are 150 points away from <strong>Gold Tier</strong>!</p>
                <div className="progress-bar-container mt-3">
                  <div className="progress-fill" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div className="rewards-grid mt-4">
                <div className="reward-item glass-card p-3">
                  <Star size={20} className="text-warning" />
                  <h4>Free Shipping</h4>
                  <p>Unlocked for all orders over $50</p>
                </div>
                <div className="reward-item glass-card p-3">
                  <CreditCard size={20} className="text-secondary" />
                  <h4>5% Cash Back</h4>
                  <p>On all AI-recommended products</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tab-pane fade-in">
              <h2>Account Settings</h2>
              <div className="config-card-flex">
                <div className="config-info">
                  <h4>Email Notifications</h4>
                  <p>Receive order updates and promotional alerts.</p>
                </div>
                <button className="status-tag active">Active</button>
              </div>
              <div className="config-card-flex">
                <div className="config-info">
                  <h4>Delete Account</h4>
                  <p>Permanently remove your data from AI Store.</p>
                </div>
                <button className="btn-danger-sm">Request Deletion</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;

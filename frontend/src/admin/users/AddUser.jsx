import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User, Mail, Phone, Lock, Shield, Camera, Save, ArrowLeft,
  Briefcase, Key, Eye, EyeOff, CheckCircle, AlertCircle,
  Building, MapPin, Hash, UserPlus, Calendar, DollarSign,
  Clock, FileText, Upload, LockIcon, Globe, Truck, Heart,
  Bell, CreditCard, Activity, Target
} from 'lucide-react';
import adminService from '../../services/adminService';
import './AddUser.css';

const AddUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  
  // Parse role from query string or state
  const getInitialRole = () => {
    const params = new URLSearchParams(location.search);
    return params.get('role') || location.state?.role || 'Admin';
  };

  const initialRole = getInitialRole();

  const [formData, setFormData] = useState({
    // Core Identity
    name: '', username: '', email: '', phone: '', password: '', confirmPassword: '',
    role: initialRole, image: null, isActive: true,
    
    // Personal (HR / CRM)
    gender: 'Male', dateOfBirth: '', homeAddress: '', nationalId: '',
    employeeId: initialRole !== 'Customer' ? `EMP-${Math.floor(1000 + Math.random() * 9000)}` : '',
    customerId: initialRole === 'Customer' ? `CUST-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
    
    // Employment (Admin & Staff)
    jobTitle: initialRole === 'Admin' ? 'System Admin' : (initialRole === 'Sales Staff' ? 'Sales Assistant' : ''),
    department: initialRole === 'Admin' ? 'Management' : 'Sales', 
    salary: '', joiningDate: new Date().toISOString().split('T')[0],
    workShift: 'Morning (09:00 - 17:00)', adminResponsibilities: '',
    
    // Shipping & Logistics (Customer)
    shippingAddress: '', billingAddress: '', preferredDeliveryMethod: 'Standard', deliveryInstructions: '',
    
    // Preferences (Customer)
    preferences: {
      favoriteCategories: [],
      preferredPaymentMethod: 'Credit Card',
      notificationPreferences: { email: true, sms: false, push: true }
    },
    
    // Security & Verification
    security: {
      twoFactorEnabled: false,
      emailVerified: false,
      phoneVerified: false,
      loginRestrictions: { startTime: '09:00', endTime: '21:00', allowedIPs: [] }
    },
    
    // Permissions (Admin & Staff)
    permissions: {
      products: initialRole === 'Admin',
      orders: initialRole === 'Admin' || initialRole === 'Sales Staff',
      customers: initialRole === 'Admin' || initialRole === 'Sales Staff',
      inventory: initialRole === 'Sales Staff',
      reports: initialRole === 'Admin',
      promotions: false,
      financials: false,
      analytics: false,
      settings: false
    }
  });

  useEffect(() => {
    const role = getInitialRole();
    if (role !== formData.role) {
      setFormData(prev => ({
        ...prev,
        role: role,
        jobTitle: role === 'Admin' ? 'System Admin' : (role === 'Sales Staff' ? 'Sales Assistant' : ''),
        department: role === 'Admin' ? 'Management' : 'Sales',
        permissions: {
          ...prev.permissions,
          products: role === 'Admin',
          orders: role === 'Admin' || role === 'Sales Staff',
          customers: role === 'Admin' || role === 'Sales Staff',
          reports: role === 'Admin'
        }
      }));
    }
  }, [location.search]);

  const getSections = () => {
    const base = [{ id: 'account', label: 'Account Identity', icon: <User size={18} /> }];
    
    if (formData.role === 'Customer') {
      return [
        ...base,
        { id: 'personal', label: 'Personal Profile', icon: <UserPlus size={18} /> },
        { id: 'logistics', label: 'Shipping & CRM', icon: <Truck size={18} /> },
        { id: 'preferences', label: 'Preferences', icon: <Heart size={18} /> }
      ];
    }
    
    return [
      ...base,
      { id: 'personal', label: 'Personal HR', icon: <MapPin size={18} /> },
      { id: 'employment', label: formData.role === 'Admin' ? 'Administrative HR' : 'Workforce HR', icon: <Briefcase size={18} /> },
      { id: 'security', label: 'Access & Security', icon: <Shield size={18} /> }
    ];
  };

  const sections = getSections();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const parts = name.split('.');
      if (parts.length === 3) {
        setFormData(prev => ({
          ...prev,
          [parts[0]]: { ...prev[parts[0]], [parts[1]]: { ...prev[parts[0]][parts[1]], [parts[2]]: value } }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [parts[0]]: { ...prev[parts[0]], [parts[1]]: value }
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePermissionToggle = (permId) => {
    setFormData(prev => ({
      ...prev,
      permissions: { ...prev.permissions, [permId]: !prev.permissions[permId] }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      // Client-side duplicate guard to avoid backend 400 for existing email/username
      try {
        const existing = await adminService.getUsers();
        const dup = existing.find(u => u.email === formData.email || u.username === formData.username);
        if (dup) {
          setError(`A user with that ${dup.email === formData.email ? 'email' : 'username'} already exists.`);
          setLoading(false);
          return;
        }
      } catch (fetchErr) {
        // If fetchUsers fails, continue and let the create request surface the proper error
        console.warn('Could not check duplicates before create:', fetchErr);
      }

      const payload = { ...formData };
      delete payload.confirmPassword;
      if (!payload.customerId) delete payload.customerId;

      await adminService.createUser(payload);
      alert(`${formData.role} provisioned successfully!`);
      navigate('/admin/users');
    } catch (err) {
      console.error('Create user error:', err.response || err);
      const status = err.response?.status;
      const msg = err.response?.data?.message || err.message || 'Provisioning failed';
      setError(`(${status || 'ERR'}) ${msg}`);
      setLoading(false);
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'account':
        return (
          <div className="section-form-grid fade-in">
            <div className="form-group">
              <label>Full Legal Name</label>
              <div className="input-with-icon">
                <User size={16} />
                <input name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Username</label>
              <div className="input-with-icon">
                <Target size={16} />
                <input name="username" type="text" placeholder="johndoe_99" value={formData.username} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={16} />
                <input name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-with-icon">
                <Phone size={16} />
                <input name="phone" type="text" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={16} />
                <input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={formData.password} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-with-icon">
                <Key size={16} />
                <input name="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={formData.confirmPassword} onChange={handleInputChange} required />
              </div>
            </div>
          </div>
        );
      case 'personal':
        return (
          <div className="section-form-grid fade-in">
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange} className="custom-select">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <div className="input-with-icon">
                <Calendar size={16} />
                <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Primary Residence Address</label>
              <div className="input-with-icon">
                <MapPin size={16} />
                <input name="homeAddress" type="text" placeholder="123 Main St, City, Country" value={formData.homeAddress} onChange={handleInputChange} />
              </div>
            </div>
            {formData.role !== 'Customer' ? (
              <>
                <div className="form-group">
                  <label>National ID / Passport</label>
                  <div className="input-with-icon">
                    <Hash size={16} />
                    <input name="nationalId" type="text" placeholder="ID-98765432" value={formData.nationalId} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Employee Identifier (EID)</label>
                  <div className="input-with-icon readonly">
                    <Hash size={16} />
                    <input name="employeeId" type="text" value={formData.employeeId} readOnly />
                  </div>
                </div>
              </>
            ) : (
              <div className="form-group">
                <label>System Customer ID</label>
                <div className="input-with-icon readonly">
                  <Hash size={16} />
                  <input name="customerId" type="text" value={formData.customerId} readOnly />
                </div>
              </div>
            )}
          </div>
        );
      case 'employment':
        return (
          <div className="section-form-grid fade-in">
            <div className="form-group">
              <label>{formData.role} Role / Title</label>
              <div className="input-with-icon">
                <Shield size={16} />
                <input name="jobTitle" type="text" value={formData.jobTitle} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Department</label>
              <select name="department" value={formData.department} onChange={handleInputChange} className="custom-select">
                <option value="Management">Management</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="IT & Infrastructure">IT & Infrastructure</option>
                <option value="Logistics">Logistics</option>
              </select>
            </div>
            <div className="form-group">
              <label>Monthly Salary ($)</label>
              <div className="input-with-icon">
                <DollarSign size={16} />
                <input name="salary" type="number" value={formData.salary} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Joining Date</label>
              <div className="input-with-icon">
                <Calendar size={16} />
                <input name="joiningDate" type="date" value={formData.joiningDate} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Work Responsibilities / Notes</label>
              <div className="input-with-icon">
                <FileText size={16} />
                <textarea name="adminResponsibilities" rows="3" placeholder="Primary duties and responsibilities..." value={formData.adminResponsibilities} onChange={handleInputChange} className="custom-textarea"></textarea>
              </div>
            </div>
          </div>
        );
      case 'logistics':
        return (
          <div className="section-form-grid fade-in">
            <div className="form-group full-width">
              <label>Shipping Address (Default)</label>
              <div className="input-with-icon">
                <Truck size={16} />
                <input name="shippingAddress" type="text" placeholder="Same as residence" value={formData.shippingAddress} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Billing Address</label>
              <div className="input-with-icon">
                <CreditCard size={16} />
                <input name="billingAddress" type="text" placeholder="Same as shipping" value={formData.billingAddress} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Preferred Delivery Method</label>
              <select name="preferredDeliveryMethod" value={formData.preferredDeliveryMethod} onChange={handleInputChange} className="custom-select">
                <option value="Standard">Standard (3-5 Days)</option>
                <option value="Express">Express (1-2 Days)</option>
                <option value="Pick-up">Store Pick-up</option>
              </select>
            </div>
            <div className="form-group">
              <label>Delivery Instructions</label>
              <div className="input-with-icon">
                <Bell size={16} />
                <input name="deliveryInstructions" type="text" placeholder="Leave at the porch" value={formData.deliveryInstructions} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        );
      case 'preferences':
        return (
          <div className="section-form-grid fade-in">
            <div className="form-group">
              <label>Preferred Payment Method</label>
              <select name="preferences.preferredPaymentMethod" value={formData.preferences.preferredPaymentMethod} onChange={handleInputChange} className="custom-select">
                <option value="Credit Card">Credit/Debit Card</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>
            <div className="form-group">
              <label>Notification Channels</label>
              <div className="notification-options">
                <label><input type="checkbox" checked={formData.preferences.notificationPreferences.email} onChange={(e) => handleInputChange({ target: { name: 'preferences.notificationPreferences.email', value: e.target.checked } })} /> Email Alerts</label>
                <label><input type="checkbox" checked={formData.preferences.notificationPreferences.sms} onChange={(e) => handleInputChange({ target: { name: 'preferences.notificationPreferences.sms', value: e.target.checked } })} /> SMS Alerts</label>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="security-permissions-container fade-in">
            <div className="security-box">
              <h4><LockIcon size={18} /> Access Governance</h4>
              <div className="security-options">
                <div className="sec-item">
                  <div className="sec-info"><p>Two-Factor Authentication</p><span>Multi-layered login protection.</span></div>
                  <button type="button" className={`mini-toggle ${formData.security.twoFactorEnabled ? 'active' : ''}`} onClick={() => setFormData(p => ({...p, security: {...p.security, twoFactorEnabled: !p.security.twoFactorEnabled}}))}><div className="toggle-dot"></div></button>
                </div>
                <div className="sec-item">
                  <div className="sec-info"><p>Verified Identity</p><span>Email & Phone verification status.</span></div>
                  <div className="flex gap-2"><CheckCircle size={18} className="text-success" /><Phone size={18} className="text-success" /></div>
                </div>
              </div>
            </div>
            <div className="permissions-box-v3">
              <h4><Shield size={18} /> System Functional Access</h4>
              <div className="perm-grid-v3">
                {Object.entries(formData.permissions).map(([key, val]) => (
                  <label key={key} className="perm-chip-v3">
                    <input type="checkbox" checked={val} onChange={() => handlePermissionToggle(key)} />
                    <div className="chip-content"><CheckCircle size={14} className="check" /><span>{key.charAt(0).toUpperCase() + key.slice(1)}</span></div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="add-user-page fade-in">
      <form onSubmit={handleSubmit}>
        <header className="page-header">
          <div className="header-left">
            <button type="button" className="back-btn" onClick={() => navigate('/admin/users')}><ArrowLeft size={20} /></button>
            <div>
              <h1 className="page-title">{formData.role} Provisioning</h1>
              <p className="page-subtitle">Configure specialized system profile, logistics, and permissions for the {formData.role.toLowerCase()}.</p>
            </div>
          </div>
          <button type="submit" className="save-btn primary" disabled={loading}>{loading ? 'Saving...' : <><Save size={18} /> <span>Save {formData.role} Account</span></>}</button>
        </header>
 
        {error && <div className="error-banner"><AlertCircle size={18} /> {error}</div>}

        <div className="multi-section-container">
          <div className="form-sidebar">
            <div className="profile-upload-mini">
              <div className="avatar-preview-v3">
                {formData.image ? <img src={formData.image} alt="" /> : <User size={48} />}
                <button type="button" onClick={() => fileInputRef.current.click()}><Camera size={16} /></button>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} accept="image/*" />
              <div className="profile-labels">
                <h4>{formData.name || 'New Profile'}</h4>
                <span>{formData.role} Layer</span>
              </div>
            </div>

            <nav className="section-nav">
              {sections.map(s => (
                <button key={s.id} type="button" className={`nav-item ${activeSection === s.id ? 'active' : ''}`} onClick={() => setActiveSection(s.id)}>
                  {s.icon} <span>{s.label}</span>
                </button>
              ))}
            </nav>

            <div className="upload-docs-section">
              <h5><Upload size={14} /> Verification Files</h5>
              <div className="doc-item" onClick={() => docInputRef.current.click()}>
                <FileText size={16} />
                <div className="doc-info"><p>Identity Doc</p><span>Upload ID or Passport</span></div>
              </div>
              <input type="file" ref={docInputRef} style={{ display: 'none' }} />
            </div>
          </div>

          <div className="form-main-content">
            <div className="glass-card section-card">
              <div className="section-header-mini">
                <h3>{sections.find(s => s.id === activeSection).label}</h3>
                <div className="step-indicator">Onboarding Stage {sections.findIndex(s => s.id === activeSection) + 1}</div>
              </div>
              {renderSectionContent()}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;

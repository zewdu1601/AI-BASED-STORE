import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Building, User, Mail, Phone, MapPin, Lock, Shield, 
  Camera, Save, ArrowLeft, Briefcase, Key, Eye, EyeOff, 
  Hash, AlertCircle, Globe, FileText, CreditCard, Truck, 
  Activity, Upload, CheckCircle, Award, Zap
} from 'lucide-react';
import adminService from '../../services/adminService';
import './AddSupplier.css';

const AddSupplier = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('info');
  
  const [formData, setFormData] = useState({
    name: '', 
    companyName: '',
    supplierId: `SUP-${Math.floor(1000 + Math.random() * 9000)}`,
    phone: '',
    email: '',
    address: '',
    website: '',
    businessLicense: '',
    taxId: '',
    productCategory: 'Electronics',
    supplyCapacity: '',
    deliveryRegions: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'Supplier',
    isActive: true,
    banking: {
      bankName: '',
      accountNumber: '',
      accountHolder: '',
      paymentMethod: 'Bank Transfer'
    },
    companyLogo: null,
    documents: []
  });

  const sections = [
    { id: 'info', label: 'Supplier Identity', icon: <Building size={18} /> },
    { id: 'business', label: 'Business & Logistics', icon: <Truck size={18} /> },
    { id: 'banking', label: 'Financials & Banking', icon: <CreditCard size={18} /> },
    { id: 'account', label: 'Portal Access', icon: <Lock size={18} /> }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, companyLogo: reader.result }));
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
      await adminService.createUser(formData);
      alert('Supplier onboarded successfully!');
      navigate('/admin/suppliers');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register supplier');
      setLoading(false);
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'info':
        return (
          <div className="section-form-grid fade-in">
            <div className="form-group">
              <label>Contact Person Name</label>
              <div className="input-with-icon">
                <User size={16} />
                <input name="name" type="text" placeholder="John Smith" value={formData.name} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Company Name</label>
              <div className="input-with-icon">
                <Building size={16} />
                <input name="companyName" type="text" placeholder="Global Tech Corp" value={formData.companyName} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Company Email</label>
              <div className="input-with-icon">
                <Mail size={16} />
                <input name="email" type="email" placeholder="procurement@company.com" value={formData.email} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Company Phone</label>
              <div className="input-with-icon">
                <Phone size={16} />
                <input name="phone" type="text" placeholder="+1 (555) 123-4567" value={formData.phone} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Company Website</label>
              <div className="input-with-icon">
                <Globe size={16} />
                <input name="website" type="text" placeholder="https://www.company.com" value={formData.website} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Supplier ID</label>
              <div className="input-with-icon readonly">
                <Hash size={16} />
                <input name="supplierId" type="text" value={formData.supplierId} readOnly />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Physical HQ Address</label>
              <div className="input-with-icon">
                <MapPin size={16} />
                <input name="address" type="text" placeholder="Full business address" value={formData.address} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        );
      case 'business':
        return (
          <div className="section-form-grid fade-in">
            <div className="form-group">
              <label>Business License Number</label>
              <div className="input-with-icon">
                <Award size={16} />
                <input name="businessLicense" type="text" placeholder="BL-12345678" value={formData.businessLicense} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Tax Identification (TIN)</label>
              <div className="input-with-icon">
                <FileText size={16} />
                <input name="taxId" type="text" placeholder="TAX-000-111" value={formData.taxId} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Product Category</label>
              <select name="productCategory" value={formData.productCategory} onChange={handleInputChange} className="custom-select">
                <option value="Electronics">Electronics</option>
                <option value="Grocery">Grocery & FMCG</option>
                <option value="Home & Furniture">Home & Furniture</option>
                <option value="Clothing">Clothing & Apparel</option>
                <option value="Industrial">Industrial Supplies</option>
              </select>
            </div>
            <div className="form-group">
              <label>Supply Capacity (Weekly)</label>
              <div className="input-with-icon">
                <Activity size={16} />
                <input name="supplyCapacity" type="text" placeholder="e.g. 5000 Units" value={formData.supplyCapacity} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Serviceable Delivery Regions</label>
              <div className="input-with-icon">
                <Truck size={16} />
                <input name="deliveryRegions" type="text" placeholder="North America, Europe, Asia" value={formData.deliveryRegions} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        );
      case 'banking':
        return (
          <div className="section-form-grid fade-in">
            <div className="form-group">
              <label>Bank Name</label>
              <div className="input-with-icon">
                <Building size={16} />
                <input name="banking.bankName" type="text" placeholder="Chase Manhattan" value={formData.banking.bankName} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Account Number</label>
              <div className="input-with-icon">
                <Hash size={16} />
                <input name="banking.accountNumber" type="text" placeholder="9876543210" value={formData.banking.accountNumber} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Account Holder Name</label>
              <div className="input-with-icon">
                <User size={16} />
                <input name="banking.accountHolder" type="text" placeholder="Global Tech Corp LLC" value={formData.banking.accountHolder} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Primary Payment Method</label>
              <select name="banking.paymentMethod" value={formData.banking.paymentMethod} onChange={handleInputChange} className="custom-select">
                <option value="Bank Transfer">Bank Transfer (SWIFT/ACH)</option>
                <option value="Wire">Wire Transfer</option>
                <option value="PayPal">Corporate PayPal</option>
                <option value="Credit Card">Corporate Credit Card</option>
              </select>
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="section-form-grid fade-in">
            <div className="form-group">
              <label>Partner Username</label>
              <div className="input-with-icon">
                <Key size={16} />
                <input name="username" type="text" placeholder="supplier_portal_v1" value={formData.username} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Account Status</label>
              <select name="isActive" value={formData.isActive} onChange={handleInputChange} className="custom-select">
                <option value={true}>Active Partner</option>
                <option value={false}>Pending Approval</option>
              </select>
            </div>
            <div className="form-group">
              <label>Portal Password</label>
              <div className="input-with-icon">
                <Lock size={16} />
                <input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={formData.password} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-with-icon">
                <Shield size={16} />
                <input name="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={formData.confirmPassword} onChange={handleInputChange} required />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="add-supplier-page fade-in">
      <form onSubmit={handleSubmit}>
        <header className="page-header-v4">
          <div className="header-left">
            <button type="button" className="back-btn" onClick={() => navigate('/admin/suppliers')}><ArrowLeft size={20} /></button>
            <div>
              <h1 className="gov-main-title">Supplier B2B Onboarding</h1>
              <p className="gov-subtitle">Register a corporate partner for procurement, logistics, and automated settlements.</p>
            </div>
          </div>
          <button type="submit" className="gov-btn primary" disabled={loading}>
            {loading ? 'Registering...' : <><Save size={18} /> <span>Finalize Partnership</span></>}
          </button>
        </header>

        {error && <div className="error-banner"><AlertCircle size={18} /> {error}</div>}

        <div className="multi-section-container-v4">
          <div className="form-sidebar-v4">
            <div className="profile-upload-mini">
              <div className="avatar-preview-v4">
                {formData.companyLogo ? <img src={formData.companyLogo} alt="" /> : <Building size={32} />}
                <button type="button" onClick={() => fileInputRef.current.click()}><Camera size={14} /></button>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleLogoUpload} style={{ display: 'none' }} accept="image/*" />
              <div className="profile-labels">
                <h4>{formData.companyName || 'New Partner'}</h4>
                <span>{formData.productCategory} Supplier</span>
              </div>
            </div>

            <nav className="section-nav-v4">
              {sections.map(s => (
                <button key={s.id} type="button" className={`nav-item-v4 ${activeSection === s.id ? 'active' : ''}`} onClick={() => setActiveSection(s.id)}>
                  {s.icon} <span>{s.label}</span>
                </button>
              ))}
            </nav>

            <div className="upload-docs-section-v4">
              <h5><Upload size={14} /> Legal Documentation</h5>
              <div className="doc-item-v4" onClick={() => docInputRef.current.click()}>
                <FileText size={16} />
                <div className="doc-info">
                  <p>Business License</p>
                  <span>Upload PDF or Image</span>
                </div>
              </div>
              <input type="file" ref={docInputRef} style={{ display: 'none' }} />
            </div>
          </div>

          <div className="form-main-content-v4">
            <div className="glass-card section-card-v4">
              <div className="section-header-mini-v4">
                <Zap size={20} className="text-primary" />
                <h3>{sections.find(s => s.id === activeSection).label}</h3>
                <div className="step-indicator">Step {sections.findIndex(s => s.id === activeSection) + 1} of 4</div>
              </div>
              {renderSectionContent()}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSupplier;

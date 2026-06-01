import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  CreditCard, 
  Truck, 
  Mail, 
  Shield, 
  BrainCircuit, 
  Database, 
  History,
  Save,
  Globe,
  Bell,
  Cpu,
  Lock,
  Cloud,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import './StoreSettings.css';

const StoreSettings = () => {
  const [activeTab, setActiveTab] = useState('store');
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'dark');
  const [brightness, setBrightness] = useState(100);

  useEffect(() => {
    // Sync local state with actual theme if changed elsewhere
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme'));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleBrightnessChange = (e) => {
    const val = e.target.value;
    setBrightness(val);
    document.documentElement.style.setProperty('--brightness', val / 100);
  };

  const settingsTabs = [
    { id: 'store', label: 'Store Settings', icon: Globe },
    { id: 'ui', label: 'UI & Accessibility', icon: Monitor },
    { id: 'payment', label: 'Payment Settings', icon: CreditCard },
    { id: 'shipping', label: 'Shipping Settings', icon: Truck },
    { id: 'security', label: 'Security Settings', icon: Shield },
    { id: 'ai', label: 'AI Configuration', icon: BrainCircuit },
    { id: 'backup', label: 'Backup & Restore', icon: Cloud },
    { id: 'logs', label: 'System Logs', icon: History },
  ];

  return (
    <div className="admin-settings">
      <header className="page-header">
        <div>
          <h1 className="page-title">System Settings</h1>
          <p className="page-subtitle">Configure global store parameters, security protocols, and AI models.</p>
        </div>
        <button className="save-btn primary"><Save size={20} /><span>Save All Changes</span></button>
      </header>

      <div className="settings-container">
        <div className="glass-card settings-sidebar">
          {settingsTabs.map((tab) => (
            <button 
              key={tab.id}
              className={`settings-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="glass-card settings-content">
          {activeTab === 'store' && (
            <div className="tab-pane">
              <h3>General Store Settings</h3>
              <form className="settings-form">
                <div className="form-group">
                  <label>Store Name</label>
                  <input type="text" defaultValue="AI-Based Smart Store" />
                </div>
                <div className="form-group">
                  <label>Support Email</label>
                  <input type="email" defaultValue="support@aistore.com" />
                </div>
                <div className="form-group">
                  <label>Store Currency</label>
                  <select defaultValue="USD">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Store Address</label>
                  <textarea defaultValue="123 Tech Avenue, Silicon Valley, CA" />
                </div>
              </form>
            </div>
          )}

          {activeTab === 'ui' && (
            <div className="tab-pane">
              <h3>UI & Accessibility</h3>
              <div className="ui-settings-grid">
                <div className="config-item-toggle">
                  <div className="toggle-info">
                    <h4>Interface Theme</h4>
                    <p>Switch between Darkness and Whiteness modes.</p>
                  </div>
                  <div className="theme-toggle-pills">
                    <button 
                      className={`theme-pill ${theme === 'light' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('light')}
                    >
                      <Sun size={14} /> Light
                    </button>
                    <button 
                      className={`theme-pill ${theme === 'dark' ? 'active' : ''}`}
                      onClick={() => handleThemeChange('dark')}
                    >
                      <Moon size={14} /> Dark
                    </button>
                  </div>
                </div>

                <div className="config-item-slider">
                  <div className="slider-info">
                    <h4>Interface Brightness</h4>
                    <p>Adjust the global luminosity of the dashboard.</p>
                  </div>
                  <div className="brightness-slider-container">
                    <Sun size={14} className="text-muted" />
                    <input 
                      type="range" 
                      min="50" 
                      max="120" 
                      value={brightness} 
                      onChange={handleBrightnessChange}
                      className="range-slider"
                    />
                    <Sun size={18} className="text-primary" />
                    <span className="brightness-val">{brightness}%</span>
                  </div>
                </div>

                <div className="config-item-toggle mt-4">
                  <div className="toggle-info">
                    <h4>Glassmorphism Effects</h4>
                    <p>Enable high-fidelity blur and transparency filters.</p>
                  </div>
                  <button className="status-pill active">On</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="tab-pane">
              <div className="pane-header-flex">
                <h3>AI Configuration</h3>
                <div className="ai-badge-glow">Neural Engine v2.4</div>
              </div>
              <div className="ai-config-grid">
                <div className="config-item-toggle">
                  <div className="toggle-info">
                    <h4>Auto-Tagging Products</h4>
                    <p>AI will automatically generate tags based on product images.</p>
                  </div>
                  <button className="status-pill active">On</button>
                </div>
                <div className="config-item-toggle">
                  <div className="toggle-info">
                    <h4>Personalized Recommendations</h4>
                    <p>Enable dynamic product suggestions in the storefront.</p>
                  </div>
                  <button className="status-pill active">On</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="tab-pane">
              <h3>Security & Privacy</h3>
              <div className="security-settings-grid">
                <div className="form-group">
                  <label>Session Timeout (Minutes)</label>
                  <input type="number" defaultValue="30" />
                </div>
                <div className="config-item-toggle mt-4">
                  <div className="toggle-info">
                    <h4>Brute Force Protection</h4>
                    <p>Lock account after 5 failed login attempts.</p>
                  </div>
                  <button className="status-pill active">Active</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="tab-pane backup-pane">
              <Cloud size={48} className="text-secondary" />
              <h3>Database Backup & Restore</h3>
              <p>Last automated backup: <strong>Today, 04:00 AM</strong></p>
              <div className="backup-actions">
                <button className="add-btn primary"><Database size={18} /> Backup Now</button>
                <button className="cancel-btn">Restore from Archive</button>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="tab-pane">
              <h3>System Audit Logs</h3>
              <div className="logs-list-compact">
                {[
                  { user: 'Admin', action: 'Changed Store Settings', time: '10 mins ago' },
                  { user: 'Manager', action: 'Updated Inventory: iPhone 15', time: '1 hour ago' },
                ].map((log, i) => (
                  <div key={i} className="log-row">
                    <History size={14} />
                    <div className="log-info">
                      <p><strong>{log.user}</strong> {log.action}</p>
                      <span>{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreSettings;

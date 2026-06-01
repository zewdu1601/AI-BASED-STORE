import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Mail, Phone, MapPin } from 'lucide-react';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Simple validation
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) return setMsg('Please enter a valid email.');

    setSubmitting(true);
    try {
      await axios.post('/api/users/subscribe', { email });
      setMsg('Subscribed successfully!');
      setEmail('');
    } catch (err) {
      setMsg('Subscription failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="smart-footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Column 1: About System */}
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span className="logo-ai">Smart</span>Store <span className="logo-accent">AI</span>
            </Link>
            <p>Revolutionizing retail with predictive intelligence and seamless multi-channel experiences. The future of commerce is here.</p>
            <div className="social-links">
              <Facebook size={20} />
              <Twitter size={20} />
              <Instagram size={20} />
              <Github size={20} />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-links">
            <h4>Quick Navigation</h4>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop Catalog</Link>
            <Link to="/about">About Intelligence</Link>
            <Link to="/contact">Contact Support</Link>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-links contact-info">
            <h4>Contact Info</h4>
            <div className="info-item"><Mail size={16} /> support@smartstore.ai</div>
            <div className="info-item"><Phone size={16} /> +1 (800) AI-STORE</div>
            <div className="info-item"><MapPin size={16} /> 101 Innovation Way, Silicon Valley</div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-newsletter">
            <h4>Newsletter Subscription</h4>
            <p>Get AI-powered deal alerts and tech updates.</p>
            <form onSubmit={handleSubscribe} className="newsletter-box">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="glass-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="primary-btn" disabled={submitting}>
                {submitting ? '...' : <Mail size={18} />}
              </button>
            </form>
            {msg && <p className="subscribe-msg">{msg}</p>}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 SmartStore AI Systems. All rights reserved.</p>
          <div className="bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style>{`
        .smart-footer {
          background: var(--footer-bg);
          color: var(--text-main);
          padding: 5rem 2rem 2rem;
          margin-top: 6rem;
          border-top: 1px solid var(--border-color);
          box-shadow: inset 0px 1px 5px rgba(255,255,255,0.05);
          transition: background 0.3s;
        }
        .footer-content { max-width: 1400px; margin: 0 auto; }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .footer-brand .logo { font-size: 1.8rem; font-weight: 800; color: var(--text-main); display: block; margin-bottom: 1.5rem; text-decoration: none; }
        .logo-ai { color: var(--accent); }
        .footer-brand p { line-height: 1.6; font-size: 0.95rem; color: var(--text-muted); }
        .social-links { display: flex; gap: 1.5rem; margin-top: 2rem; color: var(--text-muted); cursor: pointer; }
        .social-links svg:hover { color: var(--accent); }

        .footer-links h4, .footer-newsletter h4 { color: var(--text-main); font-size: 1.1rem; margin-bottom: 1.5rem; font-weight: 700; }
        .footer-links { display: flex; flex-direction: column; gap: 0.8rem; }
        .footer-links a { text-decoration: none; color: var(--text-muted); font-size: 0.9rem; transition: color 0.2s; }
        .footer-links a:hover { color: var(--accent); }

        .contact-info .info-item { display: flex; align-items: center; gap: 0.8rem; font-size: 0.9rem; color: var(--text-muted); }

        .footer-newsletter p { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem; }
        .newsletter-box { display: flex; gap: 0.5rem; }
        .newsletter-box input { flex: 1; padding: 0.8rem; background: rgba(var(--text-main-rgb), 0.03); border: 1px solid var(--border-color); border-radius: 0.5rem; color: var(--text-main); }
        .primary-btn { background: #38BDF8; color: white; border: none; padding: 0.8rem 1.2rem; border-radius: 0.5rem; cursor: pointer; transition: all 0.3s; }
        .primary-btn:hover { background: #0EA5E9; transform: translateY(-2px); }
        .subscribe-msg { font-size: 0.8rem; margin-top: 0.5rem; color: var(--accent); }
        
        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .bottom-links { display: flex; gap: 2rem; }
        .bottom-links a { text-decoration: none; color: inherit; transition: color 0.2s; }
        .bottom-links a:hover { color: var(--text-main); }

        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

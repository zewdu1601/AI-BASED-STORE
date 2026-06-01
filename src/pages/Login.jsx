import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const role = user.role?.toLowerCase();
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'sales staff') {
        navigate('/staff/dashboard');
      } else if (role === 'supplier') {
        navigate('/supplier/dashboard');
      } else if (role === 'customer') {
        navigate('/customer/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      const role = data.role?.toLowerCase();
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'sales staff') {
        navigate('/staff/dashboard');
      } else if (role === 'supplier') {
        navigate('/supplier/dashboard');
      } else if (role === 'customer') {
        navigate('/customer/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card auth-card"
      >
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your AI-powered account</p>
        
        <form onSubmit={handleSubmit}>
          {error && <p className="error-msg">{error}</p>}
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username"
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn">Sign In</button>
        </form>

        <p className="footer-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </motion.div>

      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: var(--bg-main);
        }
        .auth-card {
          width: 100%;
          max-width: 400px;
          text-align: center;
          padding: 2.5rem;
          border: 1px solid var(--border-color);
        }
        h2 {
          margin-bottom: 0.5rem;
          color: var(--text-main);
        }
        .subtitle {
          color: var(--text-muted);
          margin-bottom: 2rem;
        }
        .input-group {
          text-align: left;
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        input {
          width: 100%;
          padding: 0.8rem 1rem;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          color: var(--text-main);
          outline: none;
          transition: all 0.3s;
        }
        input:focus {
          border-color: var(--primary);
          background: var(--card-hover);
        }
        .password-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .password-toggle {
          position: absolute;
          right: 1rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s;
        }
        .password-toggle:hover {
          color: var(--primary);
        }
        .login-btn {
          width: 100%;
          margin-top: 1rem;
          padding: 0.8rem;
          background: var(--primary);
          color: white;
          border-radius: 0.75rem;
          font-weight: 700;
          transition: all 0.3s;
        }
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }
        .error-msg {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
          padding: 0.75rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .footer-text {
          margin-top: 2rem;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .footer-text a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default Login;

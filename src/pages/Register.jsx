import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const { register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(name, username, email, password, role);
      if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Registration failed. Try a different username or email.');
    }
  };

  return (
    <div className="login-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card auth-card"
      >
        <h2>Join AI.STORE</h2>
        <p className="subtitle">Start your personalized shopping journey</p>
        
        <form onSubmit={handleSubmit}>
          {error && <p className="error-msg">{error}</p>}
          
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="John Doe"
              required 
            />
          </div>

          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="johndoe123"
              required 
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="name@example.com"
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>

          <button type="submit" className="login-btn">Create Account</button>
        </form>

        <p className="footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>

      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh;
          padding: 2rem 0;
        }
        .auth-card {
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        h2 { margin-bottom: 0.5rem; }
        .subtitle { color: var(--text-muted); margin-bottom: 2rem; }
        .input-group { text-align: left; margin-bottom: 1.2rem; }
        label { display: block; margin-bottom: 0.4rem; font-size: 0.85rem; color: var(--text-muted); }
        input { 
          width: 100%; padding: 0.8rem; background: rgba(15, 23, 42, 0.5); 
          border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 0.5rem; 
          color: white; outline: none; transition: border-color 0.3s;
        }
        input:focus { border-color: var(--accent); }
        .login-btn { width: 100%; margin-top: 1rem; }
        .error-msg { color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: 0.5rem; border-radius: 0.5rem; margin-bottom: 1rem; font-size: 0.9rem; }
        .footer-text { margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-muted); }
        .footer-text a { color: var(--accent); text-decoration: none; }
      `}</style>
    </div>
  );
};

export default Register;

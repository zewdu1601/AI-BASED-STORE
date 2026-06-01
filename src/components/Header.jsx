import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  ShoppingCart, User, LogOut, 
  Search, Bell, Heart, LayoutDashboard,
  Menu, X, Sun, Moon, Sliders
} from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [brightness, setBrightness] = useState(1);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleBrightness = (val) => {
    setBrightness(val);
    document.documentElement.style.setProperty('--brightness', val);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?query=${searchTerm}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="smart-header">
      <div className="header-main">
        {/* Logo Section */}
        <Link to="/" className="logo">
          <span className="logo-ai">Smart</span>Store <span className="logo-accent">AI</span>
        </Link>

        {/* Navigation Menu - Center */}
        <nav className="header-nav-inline">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/shop">Product List</Link>
          {user?.role?.toLowerCase() === 'admin' && <Link to="/admin" className="admin-link">Dashboard</Link>}
          {user?.role?.toLowerCase() === 'sales staff' && <Link to="/staff" className="staff-link">POS</Link>}
          {user?.role?.toLowerCase() === 'customer' && (
            <>
              <Link to="/customer/dashboard" className="customer-link">Dashboard</Link>
              <Link to="/orders">Orders</Link>
            </>
          )}
        </nav>

        {/* Actions - Right */}
        <div className="header-actions">
          <button className="action-icon theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="brightness-control">
            <Sliders size={18} className="action-icon" />
            <input 
              type="range" min="0.5" max="1.5" step="0.1" 
              value={brightness} onChange={(e) => handleBrightness(e.target.value)}
              className="brightness-slider"
            />
          </div>

          <Link to="/notifications" className="action-icon"><Bell size={20} /></Link>
          <Link to="/wishlist" className="action-icon"><Heart size={20} /></Link>
          <Link to="/cart" className="action-icon cart-link">
            <ShoppingCart size={22} />
            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
          </Link>
          
          {user ? (
            <div className="user-profile">
              <div className="avatar">{user.name[0]}</div>
              <div className="user-dropdown glass-card">
                <p>Hello, {user.name}</p>
                <Link to="/profile">My Profile</Link>
                <button onClick={handleLogout} className="logout-link"><LogOut size={16} /> Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
          
          <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Search Bar - Below Header Row */}
      <div className="header-search-row">
        <form className="search-container" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search products, brands, AI picks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit"><Search size={20} /></button>
        </form>
      </div>

      <style>{`
        .smart-header {
          background: var(--header-bg);
          color: var(--text-main);
          box-shadow: 0px 4px 10px rgba(0,0,0,0.3);
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: background 0.3s;
        }

        .header-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
          gap: 2rem;
        }

        .action-icon { color: var(--text-muted); transition: color 0.2s; cursor: pointer; }
        .action-icon:hover { color: var(--accent); }
        
        .header-nav-inline {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .header-nav-inline a {
          text-decoration: none;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.95rem;
          transition: color 0.2s;
        }
        .header-nav-inline a:hover { color: var(--accent); }
        
        .mobile-toggle { display: none; background: transparent; color: var(--text-main); }

        .header-search-row {
          background: rgba(0,0,0,0.1);
          padding: 0.8rem 2rem;
          border-top: 1px solid rgba(255,255,255,0.03);
          display: flex;
          justify-content: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          text-decoration: none;
          color: var(--text-main);
          white-space: nowrap;
        }
        .logo-ai { color: #00C2FF; }
        .logo-accent { color: #00C2FF; }

        .search-container {
          flex: 1;
          display: flex;
          max-width: 600px;
          background: rgba(var(--text-main-rgb), 0.05);
          border: 1px solid var(--border-color);
          border-radius: 2rem;
          overflow: hidden;
          transition: all 0.3s;
        }
        .search-container:focus-within {
          border-color: #00C2FF;
          box-shadow: 0 0 10px rgba(0, 194, 255, 0.2);
        }
        .search-container input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 0.8rem 1.5rem;
          color: var(--text-main);
          outline: none;
        }
        .search-container input::placeholder {
          color: var(--text-muted);
        }
        .search-container button {
          background: transparent;
          padding: 0 1.5rem;
          color: #00C2FF;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .theme-toggle { background: transparent; padding: 0; }
        
        .brightness-control { 
          display: flex; 
          align-items: center; 
          gap: 0.5rem;
          position: relative;
        }
        .brightness-slider {
          width: 0;
          opacity: 0;
          transition: all 0.3s;
          position: absolute;
          top: 120%;
          right: 0;
          background: var(--card-bg);
          padding: 0.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .brightness-control:hover .brightness-slider {
          width: 80px;
          opacity: 1;
        }

        .action-icon { color: rgba(255,255,255,0.7); transition: color 0.2s; cursor: pointer; }
        [data-theme='light'] .action-icon { color: #64748B; }
        
        .cart-link { position: relative; }
        .cart-badge {
          position: absolute; top: -8px; right: -8px;
          background: #22C55E; color: white;
          font-size: 0.7rem; font-weight: 700;
          width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        .user-profile { position: relative; cursor: pointer; }
        .avatar {
          width: 36px; height: 36px; background: #00C2FF;
          border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-weight: 700;
        }
        .user-dropdown {
          position: absolute; top: 120%; right: 0;
          width: 200px; padding: 1rem;
          display: none; flex-direction: column; gap: 0.8rem;
        }
        .user-profile:hover .user-dropdown { display: flex; }
        .logout-link { color: #ef4444; background: transparent; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; }

        .login-btn { 
          background: #00C2FF; color: white; 
          padding: 0.6rem 1.5rem; border-radius: 2rem;
          font-weight: 700; text-decoration: none;
        }

        .mobile-toggle { display: none; background: transparent; color: white; }

        @media (max-width: 768px) {
          .header-search-row { display: none; }
          .header-nav-inline { display: none; }
          .mobile-toggle { display: block; }
        }
      `}</style>
    </header>
  );
};

export default Header;

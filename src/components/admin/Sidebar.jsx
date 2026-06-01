import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Tags, Database, ShoppingCart, 
  Users, BrainCircuit, BarChart3, Truck, TicketPercent, 
  Star, Navigation, CreditCard, UserCog, FileText, 
  Settings, LogOut, ChevronLeft, ChevronRight, Shield, 
  Activity, UserPlus, ChevronDown, ChevronUp, Folder,
  User, Image, Bell, BarChart, HardDrive, ShieldAlert,
  History, LogIn, Lock, Wallet, Percent, MessageSquare,
  Gift, Layers, ClipboardList, TrendingUp, Search, 
  Globe, Mail, DatabaseBackup, Terminal, UserCircle,
  Key, LogOut as LogoutIcon, RefreshCcw, MapPin,
  Eye, Building, ShieldCheck, Zap, CheckCircle, XCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const SidebarItem = ({ item, collapsed, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  
  const handleClick = (e) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const Icon = item.icon;

  return (
    <div className={`sidebar-item-wrapper level-${level}`}>
      {hasChildren ? (
        <div 
          className={`nav-item folder ${isOpen ? 'open' : ''}`} 
          onClick={handleClick}
        >
          <div className="item-main">
            {Icon && <Icon className="nav-icon" size={18} />}
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </div>
          {!collapsed && (isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
        </div>
      ) : (
        <NavLink 
          to={item.path} 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          title={collapsed ? item.label : ''}
        >
          <div className="item-main">
            {Icon && <Icon className="nav-icon" size={18} />}
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </div>
        </NavLink>
      )}

      {hasChildren && isOpen && !collapsed && (
        <div className="sub-menu">
          {item.children.map((child, index) => (
            <SidebarItem key={index} item={child} collapsed={collapsed} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { logout } = useAuth();

  const menuData = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    {
      icon: Users,
      label: 'User Management',
      children: [
        { label: 'All Users', path: '/admin/users', icon: Users },
        {
          label: 'Admins',
          icon: Shield,
          children: [
            { label: 'Add Admin', path: '/admin/users/add?role=Admin', icon: UserPlus },
            { label: 'View Admins', path: '/admin/users?role=Admin', icon: Eye },
            { label: 'Edit Admin', path: '/admin/users?role=Admin', icon: UserCog },
            { label: 'Manage Permissions', path: '/admin/users?role=Admin', icon: ShieldAlert }
          ]
        },
        {
          label: 'Sales Staff',
          icon: UserCog,
          children: [
            { label: 'Add Sales Staff', path: '/admin/users/add?role=Sales Staff', icon: UserPlus },
            { label: 'View Staff', path: '/admin/users?role=Sales Staff', icon: Eye },
            { label: 'Attendance', path: '/admin/staff/attendance', icon: ClipboardList },
            { label: 'Salary Management', path: '/admin/staff/salary', icon: Wallet },
            { label: 'Staff Reports', path: '/admin/reports/staff', icon: FileText }
          ]
        },
        {
          label: 'Suppliers',
          icon: Truck,
          children: [
            { label: 'Add Supplier', path: '/admin/suppliers/add', icon: Building },
            { label: 'View Suppliers', path: '/admin/suppliers', icon: Eye },
            { label: 'Supply Requests', path: '/admin/suppliers/requests', icon: Package },
            { label: 'Delivery Tracking', path: '/admin/suppliers/tracking', icon: Navigation },
            { label: 'Supplier Reports', path: '/admin/reports/suppliers', icon: FileText }
          ]
        },
        {
          label: 'Customers',
          icon: User,
          children: [
            { label: 'Add Customer', path: '/admin/users/add?role=Customer', icon: UserPlus },
            { label: 'View Customers', path: '/admin/users?role=Customer', icon: Eye },
            { label: 'Customer Orders', path: '/admin/orders', icon: ShoppingCart },
            { label: 'Customer Feedback', path: '/admin/reviews', icon: MessageSquare },
            { label: 'Loyalty Program', path: '/admin/loyalty', icon: Gift }
          ]
        },
        {
          label: 'Roles & Permissions',
          icon: Key,
          children: [
            { label: 'Assign Roles', path: '/admin/users', icon: UserCircle },
            { label: 'Manage Access', path: '/admin/settings/security', icon: Lock },
            { label: 'User Activity Logs', path: '/admin/users?role=Logs', icon: History },
            { label: 'Security Setting', path: '/admin/settings/security', icon: ShieldCheck }
          ]
        }
      ]
    },
    {
      icon: Package,
      label: 'Products',
      children: [
        { label: 'Add Product', path: '/admin/products/add', icon: UserPlus },
        { label: 'View Products', path: '/admin/products', icon: Eye },
        { label: 'Categories', path: '/admin/categories', icon: Tags },
        { label: 'Brands', path: '/admin/brands', icon: Star },
        { label: 'Product Reviews', path: '/admin/reviews', icon: MessageSquare },
        { label: 'Product Images', path: '/admin/products', icon: Image },
        { label: 'Product Reports', path: '/admin/reports/products', icon: FileText }
      ]
    },
    {
      icon: Database,
      label: 'Inventory',
      children: [
        { label: 'Stock Management', path: '/admin/inventory', icon: HardDrive },
        { label: 'Low Stock Alerts', path: '/admin/inventory', icon: ShieldAlert },
        { label: 'Warehouse Management', path: '/admin/warehouse', icon: MapPin },
        { label: 'Barcode Management', path: '/admin/inventory', icon: Terminal },
        { label: 'Restock Requests', path: '/admin/inventory', icon: RefreshCcw },
        { label: 'Inventory Reports', path: '/admin/reports/inventory', icon: FileText }
      ]
    },
    {
      icon: ShoppingCart,
      label: 'Orders',
      children: [
        { label: 'Pending Orders', path: '/admin/orders', icon: History },
        { label: 'Confirmed Orders', path: '/admin/orders', icon: CheckCircle },
        { label: 'Delivered Orders', path: '/admin/orders', icon: Truck },
        { label: 'Cancelled Orders', path: '/admin/orders', icon: XCircle },
        { label: 'Return Requests', path: '/admin/orders/returns', icon: RefreshCcw },
        { label: 'Invoices', path: '/admin/orders', icon: FileText },
        { label: 'Order Reports', path: '/admin/reports/orders', icon: FileText }
      ]
    },
    {
      icon: CreditCard,
      label: 'Payments',
      children: [
        { label: 'Payment Transactions', path: '/admin/payments', icon: Activity },
        { label: 'Refund Requests', path: '/admin/payments/refunds', icon: RefreshCcw },
        { label: 'Payment Verification', path: '/admin/payments', icon: ShieldCheck },
        { label: 'Revenue Reports', path: '/admin/reports/revenue', icon: TrendingUp },
        { label: 'Financial Analytics', path: '/admin/analytics/finance', icon: BarChart3 }
      ]
    },
    {
      icon: BrainCircuit,
      label: 'AI Recommendation',
      children: [
        { label: 'Recommendation Engine', path: '/admin/recommendations', icon: BrainCircuit },
        { label: 'Customer Behavior Analysis', path: '/admin/analytics/customers', icon: Search },
        { label: 'Trending Products', path: '/admin/recommendations', icon: TrendingUp },
        { label: 'Smart Search', path: '/admin/recommendations', icon: Search },
        { label: 'Recommendation Reports', path: '/admin/reports/ai', icon: FileText },
        { label: 'AI Settings', path: '/admin/settings', icon: Settings }
      ]
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      children: [
        { label: 'Sales Analytics', path: '/admin/analytics', icon: BarChart3 },
        { label: 'Customer Analytics', path: '/admin/analytics/customers', icon: Users },
        { label: 'Product Analytics', path: '/admin/analytics', icon: Package },
        { label: 'Revenue Statistics', path: '/admin/analytics/finance', icon: Wallet },
        { label: 'AI Prediction Reports', path: '/admin/reports/ai', icon: BrainCircuit },
        { label: 'Dashboard Charts', path: '/admin/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      icon: TicketPercent,
      label: 'Promotions',
      children: [
        { label: 'Discounts', path: '/admin/promotions', icon: Percent },
        { label: 'Promo Codes', path: '/admin/promotions', icon: TicketPercent },
        { label: 'Flash Sales', path: '/admin/promotions', icon: Zap },
        { label: 'Advertisements', path: '/admin/promotions', icon: Globe },
        { label: 'Campaign Reports', path: '/admin/reports/promotions', icon: FileText }
      ]
    },
    {
      icon: Bell,
      label: 'Notifications',
      children: [
        { label: 'System Notifications', path: '/admin/notifications', icon: Shield },
        { label: 'Order Alerts', path: '/admin/notifications', icon: ShoppingCart },
        { label: 'Payment Alerts', path: '/admin/notifications', icon: CreditCard },
        { label: 'Delivery Notifications', path: '/admin/notifications', icon: Truck },
        { label: 'User Notifications', path: '/admin/notifications', icon: Users }
      ]
    },
    {
      icon: FileText,
      label: 'Reports',
      children: [
        { label: 'Sales Reports', path: '/admin/reports/sales', icon: FileText },
        { label: 'Inventory Reports', path: '/admin/reports/inventory', icon: Database },
        { label: 'Customer Reports', path: '/admin/reports/customers', icon: User },
        { label: 'Supplier Reports', path: '/admin/reports/suppliers', icon: Truck },
        { label: 'Financial Reports', path: '/admin/reports/revenue', icon: CreditCard },
        { label: 'AI Reports', path: '/admin/reports/ai', icon: BrainCircuit },
        { label: 'Export Reports', path: '/admin/reports', icon: HardDrive }
      ]
    },
    {
      icon: Settings,
      label: 'Settings',
      children: [
        { label: 'Store Settings', path: '/admin/settings', icon: Settings },
        { label: 'Payment Settings', path: '/admin/settings', icon: CreditCard },
        { label: 'Shipping Settings', path: '/admin/settings', icon: Truck },
        { label: 'Email Settings', path: '/admin/settings', icon: Mail },
        { label: 'Security Settings', path: '/admin/settings/security', icon: ShieldCheck },
        { label: 'Backup & Restore', path: '/admin/settings', icon: DatabaseBackup },
        { label: 'System Logs', path: '/admin/users', icon: Terminal }
      ]
    },
    {
      icon: UserCircle,
      label: 'Profile',
      children: [
        { label: 'View Profile', path: '/admin/profile', icon: Eye },
        { label: 'Edit Profile', path: '/admin/profile', icon: UserCog },
        { label: 'Upload Profile Picture', path: '/admin/profile', icon: Image },
        { label: 'Change Password', path: '/admin/profile', icon: Key },
        { label: 'Account Security', path: '/admin/profile', icon: Lock }
      ]
    }
  ];

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <div className="brand-logo">SmartStore Pro</div>}
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuData.map((item, index) => (
          <SidebarItem key={index} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          <LogoutIcon className="nav-icon" size={18} />
          {!collapsed && <span className="nav-label">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

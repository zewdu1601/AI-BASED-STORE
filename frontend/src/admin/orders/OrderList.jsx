import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  Truck, 
  XCircle,
  Clock,
  ExternalLink,
  Printer,
  X,
  CreditCard,
  Package,
  RotateCcw,
  FileText,
  MapPin,
  BarChart
} from 'lucide-react';
import adminService from '../../services/adminService';
import './OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const statusTabs = [
    { id: 'All', label: 'All Orders', icon: Package },
    { id: 'Pending', label: 'Pending', icon: Clock },
    { id: 'Confirmed', label: 'Confirmed', icon: CheckCircle },
    { id: 'Processing', label: 'Processing', icon: RotateCcw },
    { id: 'Delivered', label: 'Delivered', icon: Truck },
    { id: 'Cancelled', label: 'Cancelled', icon: XCircle },
    { id: 'Return', label: 'Return Requests', icon: RotateCcw }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await adminService.getOrders();
      const formattedOrders = data.map(order => ({
        ...order,
        orderId: order.orderId || `#ORD-${order._id.slice(-4).toUpperCase()}`,
        customer: {
          name: order.user?.name || 'Guest',
          email: order.user?.email || 'N/A'
        }
      }));
      setOrders(formattedOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await adminService.updateOrderStatus(id, newStatus);
      setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      alert('Error updating order status');
    }
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle size={14} />;
      case 'Shipped': return <Truck size={14} />;
      case 'Processing': return <Clock size={14} />;
      case 'Cancelled': return <XCircle size={14} />;
      case 'Pending': return <Clock size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         o.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || o.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="admin-orders-v5">
      <header className="governance-header">
        <div className="header-text">
          <h1 className="governance-title">Order Management</h1>
          <p className="governance-subtitle">Process customer orders, verify pickups, and handle returns.</p>
        </div>
        <button className="batch-btn-v5">
          <Printer size={18} />
          <span>Batch Print Invoices</span>
        </button>
      </header>

      <div className="metrics-grid-v5">
        <div className="metric-card-v5 glass">
          <div className="metric-icon-box orange">
            <Clock size={24} />
          </div>
          <div className="metric-content">
            <p>Pending Orders</p>
            <h3>{orders.filter(o => o.status === 'Pending').length}</h3>
          </div>
        </div>
        
        <div className="metric-card-v5 glass">
          <div className="metric-icon-box green">
            <Package size={24} />
          </div>
          <div className="metric-content">
            <p>Ready for Pickup</p>
            <h3>{orders.filter(o => o.deliveryMethod === 'Pickup' && o.status === 'Confirmed').length}</h3>
          </div>
        </div>

        <div className="metric-card-v5 glass">
          <div className="metric-icon-box blue">
            <BarChart size={24} />
          </div>
          <div className="metric-content">
            <p>Today's Revenue</p>
            <h3>${orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString()).reduce((acc, curr) => acc + curr.totalAmount, 0).toFixed(2)}</h3>
          </div>
        </div>
      </div>

      <div className="glass-card governance-controls-v5">
        <div className="search-box-v5">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by Order ID or Customer Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-dropdown-v5">
          <Filter size={18} />
          <select value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="glass-card table-wrapper">
        <table className="admin-table v4">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>Order ID</th>
              <th style={{ width: '20%' }}>Customer</th>
              <th style={{ width: '15%' }}>Type</th>
              <th style={{ width: '15%' }}>Total</th>
              <th style={{ width: '15%' }}>Status</th>
              <th style={{ width: '20%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td><strong>{order.orderId}</strong></td>
                <td>{order.customer.name}</td>
                <td>
                  <span className={`type-tag ${order.deliveryMethod?.toLowerCase() || 'online'}`}>
                    {order.deliveryMethod || 'Online'}
                  </span>
                </td>
                <td><strong>${order.totalAmount.toFixed(2)}</strong></td>
                <td>
                  <span className={`status-tag-v4 ${order.status.toLowerCase()}`}>
                    {order.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  <div className="action-hub-mini">
                    <button className="hub-btn" title="View" onClick={() => openOrderDetails(order)}><Eye size={16} /></button>
                    <button className="hub-btn success" title="Confirm" onClick={() => handleUpdateStatus(order._id, 'Confirmed')}><CheckCircle size={16} /></button>
                    <button className="hub-btn danger" title="Cancel" onClick={() => handleUpdateStatus(order._id, 'Cancelled')}><XCircle size={16} /></button>
                    <button className="hub-btn" title="Invoice"><FileText size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="modal-overlay">
          <div className="glass-card modal-content order-modal">
            <div className="modal-header">
              <div className="modal-title-area">
                <h2>Order {selectedOrder.orderId}</h2>
                <span className={`status-badge-lg ${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</span>
              </div>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            
            <div className="order-modal-body">
              <div className="modal-info-grid">
                <div className="info-section">
                  <h3><MapPin size={16} /> Delivery Details</h3>
                  <div className="info-card-sub">
                    <p><strong>Customer:</strong> {selectedOrder.customer.name}</p>
                    <p><strong>Phone:</strong> {selectedOrder.phone || 'N/A'}</p>
                    <p><strong>Address:</strong> {selectedOrder.address}</p>
                    <div className="tracking-info-box">
                      <p><strong>Tracking Number:</strong></p>
                      <code>TRK-982354712</code>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h3><CreditCard size={16} /> Payment & Summary</h3>
                  <div className="info-card-sub">
                    <p><strong>Method:</strong> Credit Card (**** 4242)</p>
                    <p><strong>Payment Status:</strong> <span className="text-positive">{selectedOrder.paymentStatus}</span></p>
                    <p><strong>Subtotal:</strong> ${selectedOrder.totalAmount.toFixed(2)}</p>
                    <p><strong>Tax:</strong> $0.00</p>
                    <div className="total-box">
                      <span>Total</span>
                      <strong>${selectedOrder.totalAmount.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-items-section">
                <h3>Order Items</h3>
                <div className="items-list">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="order-item-row">
                      <div className="item-img-placeholder"><Package size={20} /></div>
                      <div className="item-name-info">
                        <p>{item.product?.name || 'Product'}</p>
                        <span>Qty: {item.quantity}</span>
                      </div>
                      <div className="item-price-info">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="status-timeline-section">
                <h3>Update Order Pipeline</h3>
                <div className="pipeline-controls">
                  <button className="pipeline-btn" onClick={() => handleUpdateStatus(selectedOrder._id, 'Confirmed')}>Confirm Order</button>
                  <button className="pipeline-btn" onClick={() => handleUpdateStatus(selectedOrder._id, 'Processing')}>Start Processing</button>
                  <button className="pipeline-btn" onClick={() => handleUpdateStatus(selectedOrder._id, 'Delivered')}>Mark Delivered</button>
                  <button className="pipeline-btn danger" onClick={() => handleUpdateStatus(selectedOrder._id, 'Cancelled')}>Cancel Order</button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="invoice-btn"><Printer size={18} /> Print Invoice</button>
              <button className="save-btn" onClick={() => setIsModalOpen(false)}>Close Overview</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;

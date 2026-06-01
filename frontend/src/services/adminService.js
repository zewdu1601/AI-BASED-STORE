import api from './api';

const adminService = {
  // Product Management
  getProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Order Management
  getOrders: async () => {
    const response = await api.get('/admin/orders'); // Assuming this exists or will be added
    return response.data;
  },
  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/admin/orders/${id}/status`, { status });
    return response.data;
  },

  // User Management
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  createUser: async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },
  updateUser: async (id, userData) => {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  },
  toggleUserStatus: async (id) => {
    const response = await api.put(`/admin/users/${id}/toggle`);
    return response.data;
  },
  resetUserPassword: async (id) => {
    const response = await api.put(`/admin/users/${id}/reset-password`);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  // Analytics
  getDashboardStats: async () => {
    const response = await api.get('/admin/analytics');
    return response.data;
  },

  // Audit Logs
  getAuditLogs: async () => {
    const response = await api.get('/admin/audit-logs');
    return response.data;
  }
};

export default adminService;

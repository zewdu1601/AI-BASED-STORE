import api from './api';

const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
  getWishlist: async () => {
    const response = await api.get('/users/wishlist');
    return response.data;
  },
  addToWishlist: async (productId) => {
    const response = await api.post('/users/wishlist', { productId });
    return response.data;
  },
  removeFromWishlist: async (productId) => {
    const response = await api.delete(`/users/wishlist/${productId}`);
    return response.data;
  }
};

export default userService;

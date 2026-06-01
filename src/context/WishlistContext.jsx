import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user?.token) {
        try {
          const config = { headers: { Authorization: `Bearer ${user.token}` } };
          const { data } = await axios.get('/api/users/profile', config);
          setWishlist(data.wishlist || []);
        } catch (err) { console.error(err); }
      }
    };
    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (product) => {
    if (!user) return alert('Please login to use wishlist');
    
    const isExist = wishlist.find(item => item._id === product._id);
    const config = { headers: { Authorization: `Bearer ${user.token}` } };

    try {
      if (isExist) {
        await axios.delete(`/api/users/wishlist/${product._id}`, config);
        setWishlist(prev => prev.filter(item => item._id !== product._id));
      } else {
        await axios.post('/api/users/wishlist', { productId: product._id }, config);
        setWishlist(prev => [...prev, product]);
      }
    } catch (err) { console.error(err); }
  };

  const isInWishlist = (id) => wishlist.some(item => item._id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

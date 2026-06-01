import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { trackAction } from '../utils/aiTracker';

const AIContext = createContext();

export const AIProvider = ({ children }) => {
  const { user } = useAuth();
  const [segment, setSegment] = useState('NEW');
  const [recommendations, setRecommendations] = useState([]);
  const [insights, setInsights] = useState([]);

  const fetchAIContent = async () => {
    try {
      if (!user?.token) {
        // No auth token – skip fetching AI content
        setSegment('NEW');
        setRecommendations([]);
        setInsights([]);
        return;
      }
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('/api/recommendations/feed', config);
      setSegment(data.segment || 'NEW');
      setRecommendations(data.products || []);
      
      if (user?.role === 'admin') {
        const { data: aiInsights } = await axios.get('/api/recommendations/insights', config);
        setInsights(aiInsights);
      }
    } catch (err) { console.error('AI fetch failed', err); }
  };

  useEffect(() => {
    fetchAIContent();
  }, [user]);

  const logAction = (type, productId, category) => {
    trackAction(type, productId, category);
    // Periodically refresh content after significant actions
    if (type === 'cart_add' || type === 'purchase') fetchAIContent();
  };

  return (
    <AIContext.Provider value={{ segment, recommendations, insights, logAction, refreshAI: fetchAIContent }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => useContext(AIContext);

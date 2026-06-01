import axios from 'axios';

export const trackAction = async (actionType, productId, category) => {
  try {
    await axios.post('/api/recommendations/track', {
      actionType,
      productId,
      category
    });
  } catch (err) {
    console.error('Tracking failed', err);
  }
};

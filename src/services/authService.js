import api from './api';

const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  if (data.token) localStorage.setItem('user', JSON.stringify(data));
  return data;
};

const register = async (userData) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};

const logout = () => {
  localStorage.removeItem('user');
};

export default { login, register, logout };

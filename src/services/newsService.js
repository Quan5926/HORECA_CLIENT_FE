import axios from 'axios';
import { API_BASE } from '@/config/api'

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  timeout: 50000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  getPublicNews() {
    return api.get('/news');
  },
  getNewsDetail(id) {
    return api.get(`/news/${id}`);
  }
};
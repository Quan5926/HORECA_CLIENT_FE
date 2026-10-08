import axios from 'axios';
import { API_BASE } from '@/config/api';

const API_URL = import.meta.env.VITE_API_URL || `${API_BASE}/api`;

const contactService = {
  sendContact(data) {
    return axios.post(`${API_URL}/lien-he`, data);
  },

  getCompanyInfo() {
    return axios.get(`${API_URL}/thong-tin-cong-ty`);
  }
};

export default contactService;
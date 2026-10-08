import axios from 'axios';
import { API_BASE } from '@/config/api'

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  timeout: 50000,
});

export const bannerService = {
  getBannersByPosition: async (viTri) => {
    try {
      const response = await api.get(`/banners/public?viTri=${viTri}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi lấy banner vị trí " + viTri + ":", error);
      return [];
    }
  }
};
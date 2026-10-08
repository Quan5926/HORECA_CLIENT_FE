import axios from 'axios';
import { API_BASE } from '@/config/api'
const api = axios.create({
baseURL: `${API_BASE}/api`,
  timeout: 50000,
});

export const categoryServiceUser = {
  // Chỉ lấy những danh mục đang hiển thị (trangThai = true)
  getActiveCategories: async () => {
    try {
      // Giả sử Backend có endpoint /public/categories hoặc bạn lọc ở đây
      const response = await api.get('/categories');
      // Lọc lấy những thằng có trangThai là true nếu Backend chưa lọc sẵn
      return response.data.filter(c => c.trangThai === true);
    } catch (error) {
      console.error("Lỗi lấy danh mục User:", error);
      return [];
    }
  }
};
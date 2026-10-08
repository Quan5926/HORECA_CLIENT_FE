import axios from 'axios';
import { API_BASE } from '@/config/api'
// Instance Public (Không có interceptor token)
const api = axios.create({
  baseURL: `${API_BASE}/api`,
  timeout: 50000,
});

export const userProductService = {
  // Lấy danh sách sản phẩm hiển thị ra trang chủ / trang cửa hàng
  getProducts: async (page = 1, size = 12, search = '', categoryId = '') => {
    try {
      const response = await api.get(`/products?page=${page}&size=${size}&search=${search}&categoryId=${categoryId}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi lấy danh sách sản phẩm:", error);
      return { content: [], totalPages: 1 };
    }
  },

  // Lấy chi tiết 1 sản phẩm cho khách xem
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi lấy chi tiết sản phẩm ${id}:`, error);
      return null;
    }
  },

  // Lấy danh sách danh mục cho menu
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error("Lỗi tải danh mục:", error);
      return [];
    }
  },

  // Gọi API lấy sản phẩm liên quan đã xử lý sẵn ở Backend
  getRelatedProducts: async (productId, categoryId) => {
    try {
      const response = await api.get(`/products/${productId}/related?categoryId=${categoryId}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi lấy sản phẩm liên quan:", error);
      return []; // Lỗi thì trả về mảng rỗng để không bị sập UI
    }
  }
};
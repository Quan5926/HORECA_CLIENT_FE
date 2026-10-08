import axios from 'axios';
import { API_BASE } from '@/config/api'
const API_URL = `${API_BASE}/api/reviews`;
// Hàm lấy token từ localStorage
const getAuthHeader = () => {
  // Đã sửa 'token' thành 'auth_token' cho khớp với lúc đăng nhập
  const token = localStorage.getItem('auth_token'); 
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default {
  // 1. Khách vãng lai xem bình luận (Không cần truyền Header Token)
  getReviewsByNewsId(newsId) {
    return axios.get(`${API_URL}/news/${newsId}`);
  },

  // 2. Gửi bình luận mới (BẮT BUỘC có Header Token và đổi URL thành /news)
  submitReview(reviewData) {
    return axios.post(`${API_URL}/news`, reviewData, {
      headers: getAuthHeader()
    });
  }
};
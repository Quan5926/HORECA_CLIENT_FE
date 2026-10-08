import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 50000,
});

// Interceptor thêm token vào header mỗi khi gửi request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor xử lý response: retry khi mất mạng, logout khi token hết hạn
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (!config._retryCount) config._retryCount = 0;

    // Retry tối đa 2 lần nếu lỗi mạng/timeout
    const isNetworkError = !error.response;
    if (isNetworkError && config._retryCount < 2) {
      config._retryCount += 1;
      await new Promise(res => setTimeout(res, 1000 * config._retryCount));
      return api(config);
    }

    // Xử lý token hết hạn
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_role');

      const path = window.location.pathname;
      const publicPaths = ['/', '/tin-tuc', '/san-pham'];
      const isPublic = publicPaths.some(p => path.startsWith(p));

      if (!isPublic) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default {
  login(identifier, password, recaptchaToken) {
    return api.post('/auth/login', {
      identifier,
      password,
      recaptchaToken
    });
  },

  requestOtp(data) {
    console.log('[authService] Gửi request-otp với data:', data);
    return api.post('/auth/register/request-otp', data, {
      headers: { 'Content-Type': 'application/json' }
    });
  },

  verifyOtp(data) {
    console.log('[authService] Gửi verify-otp với data:', data);
    return api.post('/auth/register/verify', data, {
      headers: { 'Content-Type': 'application/json' }
    });
  },

  forgotPasswordRequestOtp(data) {
    console.log('[authService] Gửi forgot request-otp với data:', data);
    return api.post('/auth/forgot-password/request-otp', data, {
      headers: { 'Content-Type': 'application/json' }
    });
  },

  forgotPasswordVerifyOtp(data) {
    console.log('[authService] Gửi forgot verify-otp với data:', data);
    return api.post('/auth/forgot-password/verify-otp', data, {
      headers: { 'Content-Type': 'application/json' }
    });
  },

  forgotPasswordReset(data) {
    console.log('[authService] Gửi forgot reset với data:', data);
    return api.post('/auth/forgot-password/reset', data, {
      headers: { 'Content-Type': 'application/json' }
    });
  },
};
import axios from 'axios';
import { reactive, watch } from 'vue';
import { API_BASE } from '@/config/api'
// ✅ Chỉ load cartItems từ localStorage nếu đúng user đang đăng nhập
const getCurrentUserId = () => localStorage.getItem('userId');

const loadCartForCurrentUser = () => {
  const userId = getCurrentUserId();
  if (!userId) return []; // Chưa login → giỏ rỗng
  const saved = localStorage.getItem(`cartItems_${userId}`);
  return saved ? JSON.parse(saved) : [];
};

export const cartState = reactive({
  items: loadCartForCurrentUser(),

  get totalQuantity() {
    return this.items.reduce((total, item) => total + item.soLuong, 0);
  },

  // ✅ Gọi khi login xong để load đúng giỏ hàng của user
  reloadForUser() {
    this.items = loadCartForCurrentUser();
  },

  // ✅ Gọi khi logout để xóa giỏ hàng khỏi UI (không xóa localStorage)
  clearCart() {
    this.items = [];
  },

  async addToCart(product, quantity = 1) {
  const token = localStorage.getItem('auth_token');
  const userId = getCurrentUserId();

  const idDeGuiDi = product.chiTietId || product.id;
  const anhSP = product.anhChinh
    || product.anhSanPham
    || (product.danhSachAnh && product.danhSachAnh[0])
    || '';

  const cartItemFormat = {
    id: null, // ✅ chưa có cart item ID, chờ BE trả về
    chiTietId: idDeGuiDi,
    tenSanPham: product.tenSanPham || 'Sản phẩm chưa có tên',
    giaBan: product.giaBan || 0,
    giaGoc: product.giaGoc || product.giaNhap || product.giaBan || 0,
    soLuong: quantity,
    tonKho: product.tonKho || 99,
    trongLuong: product.trongLuong || 0,
    anhSanPham: anhSP,
    duocChon: true
  };

  // Cập nhật local state trước cho UI nhanh
  const existingItem = this.items.find(
    item => item.chiTietId === cartItemFormat.chiTietId
  );
  if (existingItem) {
    existingItem.soLuong += quantity;
  } else {
    this.items.push(cartItemFormat);
  }

  // Đồng bộ DB và lấy lại cart item ID thật từ BE
  if (token && userId) {
    try {
     await axios.post(`${API_BASE}/api/v1/cart/add`, {
        nguoiDungId:      Number(userId),
        chiTietSanPhamId: idDeGuiDi,
        soLuong:          quantity,
        giaHienTai:       cartItemFormat.giaBan
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // ✅ Sau khi add xong, fetch lại giỏ hàng từ DB để lấy đúng item.id
      const res = await axios.get(
        `${API_BASE}/api/v1/cart/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.chiTietGioHangs) {
        // ✅ Sync item.id thật từ DB vào cartState
        res.data.chiTietGioHangs.forEach(dbItem => {
          const localItem = cartState.items.find(
            i => i.chiTietId === (dbItem.chiTietId || dbItem.chiTietSanPhamId)
          );
          if (localItem) {
            localItem.id = dbItem.id; // ✅ gán đúng cart item ID
            localItem.soLuong = dbItem.soLuong; // ✅ sync số lượng
          }
        });
      }

      console.log('Đồng bộ DB thành công!');
    } catch (err) {
      console.error('Lỗi đồng bộ giỏ hàng:', err.response?.data);
    }
  }
}
});

// ✅ Lưu riêng theo từng userId — user khác không bị lẫn giỏ hàng
watch(
  () => cartState.items,
  (newItems) => {
    const userId = getCurrentUserId();
    if (userId) {
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(newItems));
    }
  },
  { deep: true }
);
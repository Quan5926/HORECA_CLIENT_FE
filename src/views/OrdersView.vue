<template>
  <div class="orders-wrapper">
    <main class="main-content">

      <!-- HERO HEADER -->
      <div class="page-hero">
        <div class="hero-bg-pattern"></div>
        <div class="container-fluid px-lg-5 py-5 position-relative">
          <nav aria-label="breadcrumb" class="mb-3">
            <ol class="breadcrumb mb-0 small">
              <li class="breadcrumb-item">
                <router-link to="/" class="breadcrumb-link">
                  <i class="bi bi-house-door-fill me-1"></i>Trang chủ
                </router-link>
              </li>
              <li class="breadcrumb-item active bread-active">Đơn hàng của tôi</li>
            </ol>
          </nav>
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <h1 class="page-title mb-1">Đơn hàng của tôi</h1>
              <p class="page-subtitle mb-0">Quản lý và theo dõi tất cả đơn hàng</p>
            </div>
            <div class="sort-control">
              <i class="bi bi-funnel-fill sort-icon"></i>
              <select v-model="currentSort" class="sort-select">
                <option value="NEWEST">Mới nhất</option>
                <option value="OLDEST">Cũ nhất</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid px-lg-5 py-4">

        <!-- FILTER TABS -->
        <div class="filter-scroll mb-5">
          <div class="filter-track">
            <button v-for="tab in filterTabs" :key="tab.value"
                    class="filter-chip"
                    :class="{ 'filter-chip--active': currentFilter === tab.value }"
                    @click="setFilter(tab.value)">
              <span class="chip-dot"></span>
              {{ tab.label }}
              <span class="chip-count" v-if="getTabCount(tab.value) > 0">{{ getTabCount(tab.value) }}</span>
            </button>
          </div>
        </div>

        <!-- LOADING -->
        <div v-if="isLoading" class="loading-state">
          <div class="loading-spinner"></div>
          <p class="loading-text">Đang tải đơn hàng...</p>
        </div>

        <!-- EMPTY STATE -->
        <div v-else-if="paginatedOrders.length === 0" class="empty-state">
          <div class="empty-icon-wrap">
            <i class="bi bi-bag-x empty-icon"></i>
          </div>
          <h4 class="empty-title">Không có đơn hàng nào</h4>
          <p class="empty-desc">Chưa có đơn hàng khớp với bộ lọc đang chọn.</p>
          <div class="d-flex gap-3 justify-content-center flex-wrap">
            <button v-if="currentFilter !== 'ALL'" @click="setFilter('ALL')" class="btn-ghost">
              Xem tất cả
            </button>
            <router-link to="/" class="btn-primary-custom">
              <i class="bi bi-bag-heart me-2"></i>Mua sắm ngay
            </router-link>
          </div>
        </div>

        <!-- ORDER LIST -->
        <div v-else class="order-list">
          <div v-for="(order, orderIdx) in paginatedOrders" :key="order.id"
               class="order-card"
               :style="`animation-delay: ${orderIdx * 0.08}s`">

            <!-- Card Header -->
            <div class="order-card__header">
              <div class="order-meta">
                <div class="order-id">
                  <i class="bi bi-receipt-cutoff me-2"></i>
                  {{ order.maDonHang }}
                </div>
                <div class="order-date">
                  <i class="bi bi-calendar3 me-1"></i>
                  {{ order.date }}
                </div>
              </div>
              <div class="status-badge" :class="getStatusClass(order.statusRaw)">
                <span class="status-dot"></span>
                {{ order.status }}
              </div>
            </div>

            <!-- Card Body: Products -->
            <div class="order-card__body">
              <div v-for="(item, idx) in order.productList" :key="idx"
                   class="product-row"
                   :class="{ 'product-row--last': idx === order.productList.length - 1 }">
                <div class="product-thumb">
                  <img :src="getOrderImage(item)" :alt="item.name" class="thumb-img">
                </div>
                <div class="product-info">
                  <h6 class="product-name">{{ item.name }}</h6>
                  <div class="product-meta">
                    <span v-if="item.thuocTinhBienThe" class="product-variant">
                      <i class="bi bi-tag me-1"></i>{{ item.thuocTinhBienThe }}
                    </span>
                    <span class="product-qty">x{{ item.quantity }}</span>
                    <span class="product-price">{{ formatPrice(item.price) }}đ</span>
                  </div>
                </div>
                <div class="product-actions" v-if="['HOAN_THANH', 'DA_GIAO'].includes(order.statusRaw)">
                  <button @click="openReviewModal(item)" class="btn-review">
                    <i class="bi bi-star-fill me-1"></i>Đánh giá
                  </button>
                </div>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="order-card__footer">
              <div class="order-total">
                <span class="total-label">Tổng thanh toán</span>
                <span class="total-value">{{ formatPrice(order.total) }}₫</span>
              </div>
              <div class="order-actions">
                <button class="btn-outline-sm" @click="viewDetail(order)">
                  <i class="bi bi-eye me-1"></i>Chi tiết
                </button>
                <button v-if="['HOAN_THANH', 'DA_GIAO', 'DA_HUY'].includes(order.statusRaw)"
                        @click="handleRepurchase(order)" class="btn-filled-sm">
                  <i class="bi bi-arrow-repeat me-1"></i>Mua lại
                </button>
                <button v-if="order.statusRaw === 'CHO_XAC_NHAN'"
                        @click="cancelOrder(order)" class="btn-danger-sm">
                  <i class="bi bi-x-circle me-1"></i>Hủy đơn
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- PAGINATION -->
        <nav v-if="totalPages > 1" class="pagination-nav">
          <button class="page-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
            <i class="bi bi-chevron-left"></i>
          </button>
          <button v-for="p in totalPages" :key="p"
                  class="page-btn"
                  :class="{ 'page-btn--active': currentPage === p }"
                  @click="changePage(p)">{{ p }}</button>
          <button class="page-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
            <i class="bi bi-chevron-right"></i>
          </button>
        </nav>
      </div>
    </main>

    <!-- ORDER DETAIL MODAL -->
    <transition name="modal-fade">
      <div v-if="showDetailModal" class="modal-overlay" @click.self="showDetailModal = false">
        <div class="modal-box modal-box--detail">
          <div class="modal-header-custom">
            <div>
              <h5 class="modal-title-custom">Chi tiết đơn hàng</h5>
              <p class="modal-sub">{{ selectedOrder?.maDonHang }}</p>
            </div>
            <button @click="showDetailModal = false" class="modal-close"><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="modal-body-custom" v-if="selectedOrder">
            <div class="detail-section">
              <div class="detail-row">
                <span class="detail-label">Mã đơn hàng</span>
                <span class="detail-value fw-bold">{{ selectedOrder.maDonHang }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Ngày đặt</span>
                <span class="detail-value">{{ selectedOrder.date }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Trạng thái</span>
                <span class="status-badge" :class="getStatusClass(selectedOrder.statusRaw)">
                  <span class="status-dot"></span>{{ selectedOrder.status }}
                </span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Tổng tiền</span>
                <span class="detail-value text-danger fw-bold fs-5">{{ formatPrice(selectedOrder.total) }}₫</span>
              </div>
            </div>
            <div class="detail-products">
              <p class="detail-section-title">Sản phẩm ({{ selectedOrder.productList?.length }})</p>
              <div v-for="item in selectedOrder.productList" :key="item.chiTietId" class="detail-product-row">
                <img :src="getOrderImage(item)" class="detail-thumb">
                <div class="detail-product-info">
                  <p class="detail-product-name">{{ item.name }}</p>
                  <p class="detail-product-meta">x{{ item.quantity }} — {{ formatPrice(item.price) }}đ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- REVIEW MODAL -->
    <transition name="modal-fade">
      <div v-if="showReviewModal" class="modal-overlay" @click.self="showReviewModal = false">
        <div class="modal-box modal-box--review">
          <div class="modal-header-custom">
            <div>
              <h5 class="modal-title-custom">Đánh giá sản phẩm</h5>
              <p class="modal-sub">{{ reviewData.productName }}</p>
            </div>
            <button @click="showReviewModal = false" class="modal-close"><i class="bi bi-x-lg"></i></button>
          </div>

          <div class="modal-body-custom">
            <!-- Star Rating -->
            <div class="star-rating-wrap">
              <div class="stars-row">
                <i v-for="s in 5" :key="s"
                   @click="reviewData.rating = s"
                   @mouseover="hoverRating = s"
                   @mouseleave="hoverRating = 0"
                   :class="['bi star-icon', (hoverRating || reviewData.rating) >= s ? 'bi-star-fill star-active' : 'bi-star']"></i>
              </div>
              <p class="rating-label">{{ ratingLabels[reviewData.rating - 1] }}</p>
            </div>

            <!-- Comment -->
            <div class="form-group-custom">
              <label class="form-label-custom">Nhận xét của bạn</label>
              <textarea v-model="reviewData.comment" class="form-textarea"
                        placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..." rows="4"></textarea>
            </div>

            <!-- File Upload -->
            <div class="form-group-custom">
              <label class="form-label-custom">Hình ảnh / Video (tuỳ chọn)</label>
              <div class="upload-grid">
                <label class="upload-add-btn">
                  <i class="bi bi-camera-fill upload-icon"></i>
                  <span class="upload-text">Thêm ảnh</span>
                  <input type="file" multiple accept="image/*,video/*" @change="handleFileUpload" hidden>
                </label>
                <div v-for="(file, i) in previewFiles" :key="i" class="upload-preview">
                  <img v-if="file.type === 'image'" :src="file.url" class="preview-media">
                  <video v-else :src="file.url" class="preview-media"></video>
                  <button @click="removeFile(i)" class="preview-remove"><i class="bi bi-x"></i></button>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer-custom">
            <button @click="showReviewModal = false" class="btn-ghost">Để sau</button>
            <button @click="submitReview" :disabled="isSubmitting" class="btn-primary-custom">
              <span v-if="isSubmitting" class="btn-spinner"></span>
              <i v-else class="bi bi-send-fill me-2"></i>
              {{ isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- TOAST NOTIFICATION -->
    <transition name="toast-slide">
      <div v-if="toast.show" class="toast-notification" :class="`toast--${toast.type}`">
        <i :class="['bi me-2', toast.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill']"></i>
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { API_BASE } from '@/config/api'
const router = useRouter();
const orders = ref([]);
const isLoading = ref(true);
const isSubmitting = ref(false);
const hoverRating = ref(0);

const currentFilter = ref('ALL');
const currentSort = ref('NEWEST');
const currentPage = ref(1);
const itemsPerPage = 5;

const showDetailModal = ref(false);
const showReviewModal = ref(false);
const selectedOrder = ref(null);

const selectedFiles = ref([]);
const previewFiles = ref([]);
const reviewData = ref({ productId: null, productName: '', rating: 5, comment: '' });

const toast = ref({ show: false, message: '', type: 'success' });

const ratingLabels = ['Rất tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời!'];

const filterTabs = [
  { label: 'Tất cả', value: 'ALL', color: 'all' },
  { label: 'Chờ xác nhận', value: 'CHO_XAC_NHAN', color: 'pending' },
  { label: 'Đang đóng gói', value: 'DANG_DONG_GOI', color: 'packing' },
  { label: 'Đang giao', value: 'DANG_GIAO', color: 'shipping' },
  { label: 'Hoàn thành', value: 'HOAN_THANH', color: 'done' },
  { label: 'Đã hủy', value: 'DA_HUY', color: 'cancelled' }
];

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type };
  setTimeout(() => { toast.value.show = false; }, 3500);
};

const getTabCount = (filterVal) => {
  if (filterVal === 'ALL') return orders.value.length;
  return orders.value.filter(o => o.statusRaw === filterVal).length;
};

const fetchOrders = async () => {
  const userId = localStorage.getItem('userId') || localStorage.getItem('user_id');
  const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
  if (!userId || !token) { isLoading.value = false; return; }
  try {
    const response = await axios.get(`${API_BASE}/api/v1/order/user/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.data) {
      orders.value = response.data.map(order => ({
        id: order.id,
        maDonHang: order.maDonHang || `DH00${order.id}`,
        dateRaw: order.ngayTao || new Date(),
        date: order.ngayTao ? new Date(order.ngayTao).toLocaleString('vi-VN') : 'N/A',
        total: order.tongTienThanhToan || order.tongTienTruocGiam || 0,
        statusRaw: order.trangThai,
        status: formatStatusVi(order.trangThai),
        productList: (order.chiTietDonHangs || []).map(item => ({
          productId: item.sanPhamId || (item.sanPham && item.sanPham.id) || item.idSanPham,
          chiTietSanPhamId: item.chiTietSanPhamId,
          name: item.tenSanPham || 'Sản phẩm không tên',
          image: item.anhSanPham || null,
          quantity: item.soLuong || 1,
          price: item.giaBan || 0,
          chiTietId: item.id,
          thuocTinhBienThe: item.thuocTinhBienThe || null
        })),
        originalData: order
      }));
    }
  } catch (error) {
    console.error('Lỗi tải đơn hàng:', error);
    showToast('Không thể tải danh sách đơn hàng', 'error');
  } finally {
    isLoading.value = false;
  }
};

const filteredAndSortedOrders = computed(() => {
  let result = [...orders.value];
  if (currentFilter.value !== 'ALL') {
    result = result.filter(o => o.statusRaw === currentFilter.value);
  }
  result.sort((a, b) => {
    const dateA = new Date(a.dateRaw).getTime();
    const dateB = new Date(b.dateRaw).getTime();
    return currentSort.value === 'NEWEST' ? dateB - dateA : dateA - dateB;
  });
  return result;
});

const totalPages = computed(() => Math.ceil(filteredAndSortedOrders.value.length / itemsPerPage) || 1);
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredAndSortedOrders.value.slice(start, start + itemsPerPage);
});

const setFilter = (status) => { currentFilter.value = status; currentPage.value = 1; };
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const getImageUrl = (path) => {
  if (!path) return 'https://placehold.co/100x100/f5ebe0/5C3D2E?text=SP';
  if (path.startsWith('http') || path.startsWith('blob:')) return path;
  return `${API_BASE}${path.startsWith('/') ? '' : '/uploads/'}${path}`;
};
const getOrderImage = (item) => getImageUrl(item.image);

const formatStatusVi = (status) => {
  const map = {
    'CHO_XAC_NHAN': 'Chờ xác nhận', 'DA_XAC_NHAN': 'Đã xác nhận',
    'DANG_DONG_GOI': 'Đang đóng gói', 'DA_GIAO_DVVC': 'Đã giao ĐVVC',
    'DANG_GIAO': 'Đang giao hàng', 'DA_GIAO': 'Đã nhận hàng',
    'HOAN_THANH': 'Hoàn thành', 'DA_HUY': 'Đã hủy'
  };
  return map[status] || status;
};

const getStatusClass = (statusRaw) => {
  const map = {
    'HOAN_THANH': 'status--success', 'DA_GIAO': 'status--success',
    'CHO_XAC_NHAN': 'status--pending', 'DANG_DONG_GOI': 'status--packing',
    'DANG_GIAO': 'status--shipping', 'DA_HUY': 'status--cancelled'
  };
  return map[statusRaw] || 'status--default';
};

const formatPrice = (p) => new Intl.NumberFormat('vi-VN').format(p);

const viewDetail = (order) => {
  selectedOrder.value = order;
  showDetailModal.value = true;
};

const handleRepurchase = async (order) => {
  const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
  const userId = localStorage.getItem('userId') || localStorage.getItem('user_id');
  if (!order.productList?.length) return showToast('Đơn hàng không có sản phẩm!', 'error');
  try {
    for (const item of order.productList) {
     await axios.post(`${API_BASE}/api/v1/cart/add`, {
        nguoiDungId: userId, chiTietSanPhamId: item.chiTietId, soLuong: item.quantity, giaHienTai: item.price
      }, { headers: { 'Authorization': `Bearer ${token}` } });
    }
    window.dispatchEvent(new Event('cart-updated'));
    showToast('Đã thêm vào giỏ hàng!');
    setTimeout(() => router.push('/gio-hang'), 1000);
  } catch { showToast('Lỗi khi thêm vào giỏ!', 'error'); }
};

const cancelOrder = async (order) => {
  if (!confirm(`Bạn có chắc muốn hủy đơn hàng ${order.maDonHang}?`)) return;
  const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
  try {
    await axios.put(`${API_BASE}/api/v1/order/${order.id}/cancel`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    showToast('Đã hủy đơn hàng thành công');
    fetchOrders();
  } catch { showToast('Không thể hủy đơn hàng!', 'error'); }
};

const openReviewModal = (productItem) => {
  const finalId = productItem.productId;
  if (!finalId) return showToast('Không tìm thấy ID sản phẩm!', 'error');
  reviewData.value = { productId: finalId, productName: productItem.name, rating: 5, comment: '' };
  selectedFiles.value = [];
  previewFiles.value = [];
  hoverRating.value = 0;
  showReviewModal.value = true;
};

const handleFileUpload = (e) => {
  Array.from(e.target.files).forEach(file => {
    selectedFiles.value.push(file);
    previewFiles.value.push({ url: URL.createObjectURL(file), type: file.type.startsWith('image') ? 'image' : 'video' });
  });
};
const removeFile = (index) => { selectedFiles.value.splice(index, 1); previewFiles.value.splice(index, 1); };

const submitReview = async () => {
  if (!reviewData.value.comment?.trim()) return showToast('Vui lòng nhập nhận xét!', 'error');
  if (!reviewData.value.productId) return showToast('Không tìm thấy ID sản phẩm!', 'error');
  isSubmitting.value = true;
  try {
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
    const userId = localStorage.getItem('user_id') || localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('productId', Number(reviewData.value.productId));
    formData.append('userId', userId ? Number(userId) : 0);
    formData.append('rating', reviewData.value.rating);
    formData.append('content', reviewData.value.comment);
    selectedFiles.value.forEach(file => formData.append('files', file));
    await axios.post(`${API_BASE}/api/reviews/product`, formData, {
      headers: { 'Authorization': token ? `Bearer ${token}` : '', 'Content-Type': 'multipart/form-data' }
    });
    showToast('Đã gửi đánh giá! Chờ Admin duyệt.');
    showReviewModal.value = false;
    reviewData.value = { productId: null, rating: 5, comment: '' };
    selectedFiles.value = [];
    previewFiles.value = [];
  } catch (error) {
    showToast('Không thể gửi đánh giá: ' + (error.response?.data || 'Lỗi kết nối'), 'error');
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => fetchOrders());
</script>

<style scoped>
/* =====================================================
   ORDERS PAGE — tất cả màu dùng hex trực tiếp,
   KHÔNG dùng var() vì scoped CSS không thấy :root
   ===================================================== */

.orders-wrapper {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: #ffffff;
  min-height: 100vh;
}

/* ── HERO ── */
.page-hero {
  background: #fff;
  border-bottom: 2px solid #ffebee;
  position: relative;
  overflow: hidden;
}
.hero-bg-pattern {
  position: absolute; inset: 0;
  background-image:
    radial-gradient(circle at 95% 50%, rgba(229,57,53,.05) 0%, transparent 55%),
    radial-gradient(circle at 5%  50%, rgba(229,57,53,.03) 0%, transparent 45%);
  pointer-events: none;
}
.page-title {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  color: #E53935;
  font-weight: 700;
  letter-spacing: -0.5px;
}
.page-subtitle { color: #999; font-size: .9rem; }
.breadcrumb-link { color: #999; text-decoration: none; transition: color .2s; }
.breadcrumb-link:hover { color: #E53935; }
.bread-active { color: #333 !important; font-weight: 600; }
.breadcrumb-item + .breadcrumb-item::before { color: #ccc; }

.sort-control {
  display: flex; align-items: center; gap: 10px;
  background: #fff; border: 1.5px solid #ffcdd2;
  border-radius: 50px; padding: 8px 18px;
  box-shadow: 0 2px 8px rgba(229,57,53,.08);
}
.sort-icon { color: #E53935; }
.sort-select {
  background: transparent; border: none; outline: none;
  color: #333; font-size: .875rem; cursor: pointer; font-weight: 500;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

/* ── FILTER CHIPS ── */
.filter-scroll { padding-bottom: 4px; }
.filter-track { display: flex; gap: 10px; flex-wrap: wrap; }
.filter-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 50px;
  border: 1.5px solid #ffcdd2;
  background: #fff;
  font-family: 'Segoe UI', system-ui, sans-serif;
  font-size: .875rem;
  font-weight: 500;
  color: #555;
  cursor: pointer;
  white-space: nowrap;
  transition: background .18s, color .18s, border-color .18s, box-shadow .18s;
  box-shadow: 0 1px 4px rgba(0,0,0,.04);
}
.filter-chip:hover:not(.filter-chip--active) {
  border-color: #E53935;
  color: #E53935;
  background: #fff5f5;
}
.filter-chip--active {
  background: #E53935;
  border-color: #E53935;
  color: #fff;
  box-shadow: 0 4px 14px rgba(229,57,53,.35);
}

/* dot */
.chip-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #ffcdd2;
  flex-shrink: 0;
  transition: background .18s;
}
.filter-chip--active .chip-dot {
  background: rgba(255,255,255,.7);
}

/* count badge */
.chip-count {
  background: rgba(229,57,53,.12);
  color: #E53935;
  font-size: .7rem;
  font-weight: 700;
  padding: 1px 7px;
  border-radius: 20px;
  min-width: 20px;
  text-align: center;
  transition: background .18s, color .18s;
}
.filter-chip--active .chip-count {
  background: rgba(255,255,255,.25);
  color: #fff;
}

/* ── LOADING ── */
.loading-state { text-align: center; padding: 80px 20px; }
.loading-spinner {
  width: 44px; height: 44px;
  border: 3px solid #fff5f5;
  border-top-color: #E53935;
  border-radius: 50%;
  animation: spin .8s linear infinite;
  margin: 0 auto 16px;
}
.loading-text { color: #999; font-size: .9rem; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── EMPTY STATE ── */
.empty-state { text-align: center; padding: 80px 20px; }
.empty-icon-wrap {
  width: 90px; height: 90px; background: #fff5f5;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  margin: 0 auto 24px;
}
.empty-icon { font-size: 2.2rem; color: #E53935; opacity: .6; }
.empty-title { color: #E53935; margin-bottom: 8px; font-weight: 700; }
.empty-desc { color: #999; margin-bottom: 24px; }

/* ── ORDER CARDS ── */
.order-list { display: flex; flex-direction: column; gap: 20px; }
.order-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(229,57,53,.08);
  overflow: hidden;
  border: 1.5px solid #ffebee;
  animation: cardIn .45s ease both;
  transition: box-shadow .25s, transform .25s;
}
.order-card:hover {
  box-shadow: 0 12px 40px rgba(229,57,53,.14);
  transform: translateY(-2px);
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

.order-card__header {
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 10px;
  padding: 16px 24px;
  background: linear-gradient(to right, #f8f8f8, #fff);
  border-bottom: 1px solid #ffebee;
}
.order-meta { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
.order-id { font-weight: 700; color: #E53935; font-size: 1rem; }
.order-date { font-size: .8rem; color: #999; }

/* ── STATUS BADGES ── */
.status-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 13px; border-radius: 50px; font-size: .78rem; font-weight: 600;
}
.status-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.status--success  { background: #ecfdf5; color: #059669; }
.status--pending  { background: #fffbeb; color: #d97706; }
.status--packing  { background: #eff6ff; color: #3b82f6; }
.status--shipping { background: #e0f2fe; color: #0284c7; }
.status--cancelled{ background: #fef2f2; color: #dc2626; }
.status--default  { background: #f3f4f6; color: #6b7280; }

/* ── PRODUCT ROWS ── */
.order-card__body { padding: 0 24px; }
.product-row {
  display: flex; align-items: center; gap: 16px;
  padding: 16px 0; border-bottom: 1px dashed #ffebee;
}
.product-row--last { border-bottom: none; }
.product-thumb {
  width: 72px; height: 72px; border-radius: 12px; overflow: hidden;
  border: 1px solid #ffebee; flex-shrink: 0; background: #fff5f5;
}
.thumb-img { width: 100%; height: 100%; object-fit: cover; }
.product-info { flex: 1; min-width: 0; }
.product-name {
  font-weight: 600; color: #E53935; margin-bottom: 6px;
  font-size: .9rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.product-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.product-variant { font-size: .78rem; color: #999; background: #f5f5f5; padding: 2px 8px; border-radius: 4px; }
.product-qty   { font-size: .82rem; color: #666; font-weight: 500; }
.product-price { font-size: .85rem; color: #dc2626; font-weight: 700; }

/* ── CARD FOOTER ── */
.order-card__footer {
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 12px;
  padding: 14px 24px;
  border-top: 1.5px solid #ffebee;
  background: #f8f8f8;
}
.order-total { display: flex; flex-direction: column; }
.total-label { font-size: .75rem; color: #999; margin-bottom: 2px; }
.total-value  { font-size: 1.25rem; font-weight: 700; color: #dc2626; }

/* ── ACTION BUTTONS ── */
.order-actions { display: flex; gap: 10px; flex-wrap: wrap; }

.btn-review {
  padding: 7px 16px; border-radius: 50px;
  border: 1.5px solid #f59e0b; background: #fffbeb;
  color: #d97706; font-size: .8rem; font-weight: 600; cursor: pointer;
  transition: all .2s; white-space: nowrap;
  font-family: 'Segoe UI', system-ui, sans-serif;
}
.btn-review:hover { background: #f59e0b; color: #fff; }

.btn-outline-sm {
  padding: 8px 18px; border-radius: 50px; font-size: .82rem; font-weight: 600;
  cursor: pointer; transition: all .2s; white-space: nowrap;
  border: 1.5px solid #ffcdd2; background: #fff; color: #E53935;
  font-family: 'Segoe UI', system-ui, sans-serif;
}
.btn-outline-sm:hover { border-color: #E53935; background: #fff5f5; }

.btn-filled-sm {
  padding: 8px 18px; border-radius: 50px; font-size: .82rem; font-weight: 600;
  cursor: pointer; transition: all .2s; white-space: nowrap;
  border: 1.5px solid #333; background: #fff; color: #000;
  font-family: 'Segoe UI', system-ui, sans-serif;
}
.btn-filled-sm:hover { background: #f5f5f5; border-color: #000; transform: translateY(-1px); }

.btn-danger-sm {
  padding: 8px 18px; border-radius: 50px; font-size: .82rem; font-weight: 600;
  cursor: pointer; transition: all .2s; white-space: nowrap;
  border: 1.5px solid #fca5a5; background: #fef2f2; color: #dc2626;
  font-family: 'Segoe UI', system-ui, sans-serif;
}
.btn-danger-sm:hover { background: #dc2626; color: #fff; border-color: #dc2626; }

/* ── PAGINATION ── */
.pagination-nav {
  display: flex; justify-content: center; gap: 6px; margin-top: 40px;
}
.page-btn {
  width: 40px; height: 40px;
  border-radius: 12px;
  border: 1.5px solid #ffcdd2;
  background: #fff;
  color: #E53935;
  font-weight: 600; font-size: .875rem;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background .18s, color .18s, border-color .18s, box-shadow .18s;
  font-family: 'Segoe UI', system-ui, sans-serif;
}
.page-btn--active {
  background: #E53935;
  border-color: #E53935;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(229,57,53,.3);
}
.page-btn:hover:not(.page-btn--active):not(:disabled) {
  background: #fff5f5;
  border-color: #E53935;
}
.page-btn:disabled { opacity: .35; cursor: not-allowed; }

/* ── MODAL ── */
.modal-overlay {
  position: fixed; inset: 0; z-index: 1050;
  background: rgba(0,0,0,.55); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.modal-box {
  background: #fff; border-radius: 20px;
  box-shadow: 0 25px 80px rgba(0,0,0,.3);
  width: 100%; overflow: hidden;
  display: flex; flex-direction: column; max-height: 90vh;
}
.modal-box--review { max-width: 500px; }
.modal-box--detail { max-width: 560px; }

.modal-header-custom {
  display: flex; justify-content: space-between; align-items: flex-start;
  padding: 24px 28px 20px; border-bottom: 1px solid #ffebee;
  background: linear-gradient(to right, #f8f8f8, #fff);
}
.modal-title-custom { color: #E53935; font-size: 1.2rem; font-weight: 700; margin-bottom: 4px; }
.modal-sub { color: #999; font-size: .82rem; margin: 0; }
.modal-close {
  width: 36px; height: 36px; border-radius: 50%;
  border: 1px solid #ffcdd2; background: #fff; color: #666;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .2s; flex-shrink: 0;
}
.modal-close:hover { background: #E53935; color: #fff; border-color: #E53935; }
.modal-body-custom { padding: 24px 28px; overflow-y: auto; flex: 1; }
.modal-footer-custom {
  padding: 16px 28px; border-top: 1px solid #ffebee;
  display: flex; justify-content: flex-end; gap: 12px;
  background: #f8f8f8;
}

/* detail rows */
.detail-section { background: #f8f8f8; border-radius: 12px; padding: 16px; margin-bottom: 20px; }
.detail-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 0; border-bottom: 1px dashed #ece5dd;
}
.detail-row:last-child { border-bottom: none; }
.detail-label { color: #999; font-size: .85rem; }
.detail-value { font-weight: 600; color: #333; }
.detail-section-title { font-weight: 700; color: #E53935; margin-bottom: 12px; font-size: .9rem; }
.detail-product-row {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 0; border-bottom: 1px dashed #ffebee;
}
.detail-product-row:last-child { border-bottom: none; }
.detail-thumb { width: 56px; height: 56px; border-radius: 10px; object-fit: cover; border: 1px solid #ffebee; }
.detail-product-name { font-weight: 600; font-size: .88rem; color: #E53935; margin-bottom: 2px; }
.detail-product-meta { font-size: .8rem; color: #999; margin: 0; }

/* ── STAR RATING ── */
.star-rating-wrap {
  text-align: center; margin-bottom: 20px;
  padding: 20px; background: #f8f8f8; border-radius: 12px;
}
.stars-row { display: flex; justify-content: center; gap: 8px; margin-bottom: 8px; }
.star-icon { font-size: 2rem; color: #d1d5db; cursor: pointer; transition: transform .15s, color .15s; }
.star-active { color: #f59e0b; }
.star-icon:hover { transform: scale(1.2); }
.rating-label { color: #666; font-size: .9rem; font-weight: 500; margin: 0; }

/* ── FORM ── */
.form-group-custom { margin-bottom: 18px; }
.form-label-custom { display: block; font-size: .82rem; font-weight: 600; color: #555; margin-bottom: 8px; }
.form-textarea {
  width: 100%; border: 1.5px solid #ffcdd2; border-radius: 12px;
  padding: 12px 16px; font-size: .9rem; color: #333;
  resize: vertical; outline: none; transition: border-color .2s;
  background: #f8f8f8; font-family: 'Segoe UI', system-ui, sans-serif;
}
.form-textarea:focus { border-color: #E53935; background: #fff; }

/* ── UPLOAD ── */
.upload-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.upload-add-btn {
  width: 72px; height: 72px; border-radius: 12px;
  border: 2px dashed #ffcdd2; background: #f8f8f8;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer; transition: all .2s; color: #999;
}
.upload-add-btn:hover { border-color: #E53935; background: #fff5f5; color: #E53935; }
.upload-icon { font-size: 1.3rem; margin-bottom: 3px; }
.upload-text { font-size: .68rem; font-weight: 600; }
.upload-preview {
  width: 72px; height: 72px; border-radius: 12px;
  overflow: hidden; position: relative; border: 1px solid #ffcdd2;
}
.preview-media { width: 100%; height: 100%; object-fit: cover; }
.preview-remove {
  position: absolute; top: 3px; right: 3px;
  width: 20px; height: 20px; border-radius: 50%;
  background: rgba(0,0,0,.6); color: #fff; border: none;
  font-size: .7rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
}

/* ── SHARED BUTTONS ── */
.btn-ghost {
  padding: 10px 24px; border-radius: 50px;
  border: 1.5px solid #ffcdd2; background: #fff; color: #666;
  font-size: .9rem; font-weight: 500; cursor: pointer; transition: all .2s;
  font-family: 'Segoe UI', system-ui, sans-serif;
}
.btn-ghost:hover { background: #f5f5f5; }

.btn-primary-custom {
  display: inline-flex; align-items: center;
  padding: 10px 24px; border-radius: 50px;
  border: none; background: #E53935; color: #fff;
  font-size: .9rem; font-weight: 600;
  cursor: pointer; text-decoration: none; transition: all .2s;
  box-shadow: 0 4px 14px rgba(229,57,53,.3);
  font-family: 'Segoe UI', system-ui, sans-serif;
}
.btn-primary-custom:hover { background: #B71C1C; transform: translateY(-1px); color: #fff; }
.btn-primary-custom:disabled { opacity: .5; cursor: not-allowed; transform: none; pointer-events: none; }

.btn-spinner {
  display: inline-block; width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,.4); border-top-color: #fff;
  border-radius: 50%; animation: spin .7s linear infinite; margin-right: 8px;
}

/* ── TOAST ── */
.toast-notification {
  position: fixed; top: 80px; right: 30px; z-index: 2000;
  padding: 14px 22px; border-radius: 12px;
  font-size: .875rem; font-weight: 500;
  display: flex; align-items: center;
  box-shadow: 0 8px 30px rgba(0,0,0,.2);
}
.toast--success { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
.toast--error   { background: #fef2f2; color: #dc2626; border: 1px solid #fca5a5; }

/* ── TRANSITIONS ── */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .25s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-active .modal-box,
.modal-fade-leave-active .modal-box { transition: transform .25s ease; }
.modal-fade-enter-from .modal-box  { transform: scale(.95) translateY(10px); }
.modal-fade-leave-to .modal-box    { transform: scale(.95) translateY(10px); }

.toast-slide-enter-active, .toast-slide-leave-active { transition: all .3s ease; }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateX(20px); }

/* ═══════════════════════════════════
   MOBILE RESPONSIVE — ORDERS
═══════════════════════════════════ */

@media (max-width: 768px) {
  /* Hero */
  .page-title { font-size: 1.4rem; }
  .page-subtitle { font-size: .8rem; }
  .sort-control { padding: 6px 14px; }
  .sort-select { font-size: .8rem; }

  /* Filter chips */
  .filter-chip { padding: 7px 14px; font-size: .8rem; }

  /* Order card */
  .order-card__header { padding: 12px 16px; }
  .order-id { font-size: .9rem; }
  .order-date { font-size: .75rem; }

  .order-card__body { padding: 0 16px; }
  .product-row { gap: 10px; padding: 12px 0; }
  .product-thumb { width: 56px; height: 56px; border-radius: 8px; }
  .product-name { font-size: .82rem; }
  .product-meta { gap: 8px; }
  .product-variant { font-size: .72rem; }
  .product-qty { font-size: .75rem; }
  .product-price { font-size: .78rem; }

  /* Review button nhỏ lại */
  .product-actions { flex-shrink: 0; }
  .btn-review { padding: 5px 10px; font-size: .72rem; }

  .order-card__footer {
    padding: 12px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .total-value { font-size: 1.1rem; }

  .order-actions { width: 100%; justify-content: flex-end; }
  .btn-outline-sm, .btn-filled-sm, .btn-danger-sm {
    padding: 7px 14px; font-size: .78rem;
  }

  /* Pagination */
  .pagination-nav { gap: 4px; margin-top: 28px; }
  .page-btn { width: 34px; height: 34px; border-radius: 8px; font-size: .8rem; }

  /* Modal */
  .modal-overlay { padding: 0; align-items: flex-end; }
  .modal-box { border-radius: 20px 20px 0 0; max-height: 92vh; max-width: 100%; }
  .modal-header-custom { padding: 18px 20px 14px; }
  .modal-title-custom { font-size: 1rem; }
  .modal-body-custom { padding: 16px 20px; }
  .modal-footer-custom { flex-direction: column; gap: 8px; padding: 14px 20px; }
  .modal-footer-custom > * { width: 100%; justify-content: center; }

  /* Review modal */
  .star-icon { font-size: 1.6rem; }
  .upload-add-btn, .upload-preview { width: 60px; height: 60px; }

  /* Toast */
.toast-notification { top: 16px; bottom: auto; right: 16px; left: auto; max-width: calc(100vw - 32px); font-size: .8rem; padding: 10px 14px; }
  .toast-slide-enter-from, .toast-slide-leave-to { transform: translateY(10px); }
}

@media (max-width: 575px) {
  .container-fluid { padding-left: 12px !important; padding-right: 12px !important; }
  .py-4 { padding-top: 16px !important; padding-bottom: 16px !important; }
  .py-5 { padding-top: 24px !important; padding-bottom: 24px !important; }

  .order-meta { gap: 10px; }
  .order-card { border-radius: 12px; }
  .order-card__header { flex-direction: column; align-items: flex-start; gap: 8px; }

  /* Product row — stack ảnh và info */
  .product-thumb { width: 48px; height: 48px; }
  .product-name { font-size: .8rem; white-space: normal; }

  /* Footer actions stack */
  .order-actions { gap: 6px; }
  .btn-outline-sm, .btn-filled-sm, .btn-danger-sm { padding: 6px 12px; font-size: .75rem; }

  /* Detail modal rows */
  .detail-row { flex-direction: column; align-items: flex-start; gap: 4px; }
  .detail-thumb { width: 44px; height: 44px; }

  /* Empty state */
  .empty-icon-wrap { width: 70px; height: 70px; }
  .empty-icon { font-size: 1.8rem; }
  .empty-title { font-size: 1rem; }
}
</style>
<template>
  <div class="checkout-wrapper">
    <div class="container py-4">

      <!-- BREADCRUMB -->
      <nav class="mb-4">
        <ol class="checkout-breadcrumb">
          <li><router-link to="/">Trang chủ</router-link></li>
          <li><i class="bi bi-chevron-right"></i></li>
          <li><router-link to="/gio-hang">Giỏ hàng</router-link></li>
          <li><i class="bi bi-chevron-right"></i></li>
          <li class="active">Thanh toán</li>
        </ol>
      </nav>

      <!-- STEPS -->
     <div class="checkout-steps mb-4">
  <div class="step done">
    <div class="step-dot"><i class="bi bi-check-lg"></i></div>
    <span>Giỏ hàng</span>
  </div>
  <div class="step-line done"></div>
  <div class="step active">
    <div class="step-dot">2</div>
    <span>Thanh toán</span>
  </div>
  <div class="step-line"></div>
  <div class="step">
    <div class="step-dot">3</div>
    <span>Hoàn tất</span>
  </div>
</div>

      <div class="checkout-layout">

        <!-- ══════════ LEFT COLUMN ══════════ -->
        <div class="checkout-left">

          <!-- ĐỊA CHỈ GIAO HÀNG -->
          <div class="checkout-card mb-4">
           <div class="card-section-header">
  <div class="header-icon"><i class="bi bi-geo-alt-fill"></i></div>
  <div class="header-text">
    <h5 class="mb-0">Địa chỉ nhận hàng</h5>
    <p class="mb-0 text-muted small">Chọn hoặc thêm địa chỉ giao hàng</p>
  </div>
  <button @click="isAddressModalOpen = true" class="btn-change-address ms-auto">
    <i class="bi bi-pencil-square"></i>
    <span class="btn-addr-text">Thay đổi</span>
  </button>
</div>

            <div v-if="selectedAddress" class="selected-address-display">
              <div class="sad-avatar">
                <i class="bi bi-person-fill"></i>
              </div>
              <div class="sad-info">
                <div class="sad-name">{{ selectedAddress.hoTenNguoiNhan }}</div>
                <div class="sad-phone"><i class="bi bi-telephone me-1"></i>{{ selectedAddress.soDienThoai }}</div>
                <div class="sad-addr"><i class="bi bi-geo-alt me-1"></i>{{ selectedAddress.diaChiDayDu }}</div>
              </div>
              <span v-if="selectedAddress.laDiaChiMacDinh || selectedAddress.laMacDinh" class="default-badge">
                <i class="bi bi-check-circle-fill me-1"></i>Mặc định
              </span>
            </div>
            <div v-else class="no-address-alert">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              Vui lòng thêm địa chỉ giao hàng!
              <button @click="isAddressModalOpen = true" class="btn-add-address-inline ms-3">
                <i class="bi bi-plus-circle me-1"></i>Thêm ngay
              </button>
            </div>
          </div>

          <!-- SẢN PHẨM -->
          <div class="checkout-card mb-4">
            <div class="card-section-header">
              <div class="header-icon"><i class="bi bi-bag-check-fill"></i></div>
              <div>
                <h5 class="mb-0">Sản phẩm đặt mua</h5>
                <p class="mb-0 text-muted small">{{ checkoutItems.length }} sản phẩm</p>
              </div>
            </div>
            <div class="product-list">
              <div v-for="item in checkoutItems" :key="item.id" class="product-row">
                <div class="product-img-wrap">
                  <img :src="item.anhSanPham || 'https://via.placeholder.com/80x80/f5f5f5/999?text=No+Image'"
                       alt="Product" class="product-img"
                       @error="$event.target.src='https://via.placeholder.com/80x80/f5f5f5/999?text=No+Image'">
                  <span class="product-qty-badge">{{ item.soLuong }}</span>
                </div>
               <div class="product-info-co">
  <div class="product-name-co">{{ item.tenSanPham }}</div>

  <!-- Biến thể màu sắc / kích thước -->
  <div class="product-variants-co" v-if="item.mauSac || item.kichThuoc">
    <span class="variant-tag-co" v-if="item.mauSac">
      <i class="bi bi-circle-fill" style="font-size:7px;"></i> {{ item.mauSac }}
    </span>
    <span class="variant-tag-co" v-if="item.kichThuoc">
      <i class="bi bi-rulers"></i> {{ item.kichThuoc }}
    </span>
  </div>

  <div class="product-weight-co" v-if="item.trongLuong">
    <i class="bi bi-box-seam me-1"></i>{{ item.trongLuong }}
  </div>
</div>
                <!-- MỚI -->
<div class="product-price-co">
  <span v-if="item.giaGoc && item.giaGoc > item.giaBan"
        class="text-muted text-decoration-line-through"
        style="font-size:0.72rem; display:block;">
    {{ formatPrice(item.giaGoc) }}đ
  </span>
  <span :style="item.giaGoc && item.giaGoc > item.giaBan
          ? 'color:#e53935; font-weight:700;'
          : 'color:#222;'">
    {{ formatPrice(item.giaBan) }}đ
  </span>
</div>
              </div>
            </div>
          </div>

          <!-- VẬN CHUYỂN & GHI CHÚ -->
          <div class="ship-note-grid mb-4">
  <div class="checkout-card">
    <div class="card-section-header">
      <div class="header-icon"><i class="bi bi-truck-front-fill"></i></div>
      <h6 class="mb-0">Vận chuyển</h6>
    </div>
    <div class="shipping-option selected-shipping">
      <div class="so-left">
        <i class="bi bi-lightning-charge-fill text-warning me-2"></i>
        <div>
          <div class="fw-bold" style="font-size:.85rem">Giao hàng nhanh</div>
          <div class="text-muted" style="font-size:.75rem">Nhận hàng trong 2–3 ngày</div>
        </div>
      </div>
      <div class="so-price fw-bold">{{ formatPrice(shippingFee) }}đ</div>
    </div>
  </div>
  <div class="checkout-card">
    <div class="card-section-header">
      <div class="header-icon"><i class="bi bi-chat-left-text-fill"></i></div>
      <h6 class="mb-0">Ghi chú</h6>
    </div>
    <textarea v-model="orderNote" class="note-input" rows="3"
              placeholder="Lưu ý cho người bán (tùy chọn)..."></textarea>
  </div>
</div>

          <!-- THANH TOÁN -->
          <div class="checkout-card mb-4">
            <div class="card-section-header">
              <div class="header-icon"><i class="bi bi-credit-card-2-front-fill"></i></div>
              <h5 class="mb-0">Phương thức thanh toán</h5>
            </div>
          <div class="payment-methods">
  <label v-for="pm in paymentMethods" :key="pm.value"
         class="payment-box" :class="{ active: paymentMethod === pm.value }">
    <input type="radio" v-model="paymentMethod" :value="pm.value" hidden>
    <div class="pm-top">
      <div class="pm-icon"><i :class="pm.icon"></i></div>
      <div class="pm-check"><i class="bi bi-check-circle-fill"></i></div>
    </div>
    <div class="pm-label">{{ pm.label }}</div>
  </label>
</div>
          </div>

        </div>

        <!-- ══════════ RIGHT COLUMN ══════════ -->
        <div class="checkout-right">
          <div class="summary-sticky">
            <div class="checkout-card">
              <h5 class="summary-title">Tóm tắt đơn hàng</h5>

              <div class="summary-rows">
                <div class="summary-row">
                  <span>Tạm tính ({{ checkoutItems.length }} sp)</span>
                  <span>{{ formatPrice(totalItemsPrice) }}đ</span>
                </div>
                <div class="summary-row">
                  <span>Phí vận chuyển</span>
                  <span>{{ formatPrice(shippingFee) }}đ</span>
                </div>
                <div class="summary-row discount" v-if="discountAmount > 0">
                  <span>Giảm giá voucher</span>
                  <span class="text-success">-{{ formatPrice(discountAmount) }}đ</span>
                </div>
              </div>

              <div class="summary-total">
                <span>Tổng thanh toán</span>
                <span class="total-amount">{{ formatPrice(finalTotalPrice) }}đ</span>
              </div>

              <button @click="placeOrder" class="btn-place-order" :disabled="isPlacingOrder || !selectedAddress">
                <span v-if="isPlacingOrder" class="spinner-border spinner-border-sm me-2"></span>
                <i v-else class="bi bi-bag-check-fill me-2"></i>
                {{ isPlacingOrder ? 'Đang xử lý...' : 'Đặt hàng ngay' }}
              </button>

              <div v-if="!selectedAddress" class="order-warning">
                <i class="bi bi-exclamation-circle me-1"></i>
                Chưa chọn địa chỉ giao hàng
              </div>

              <div class="trust-badges">
                <div class="tb-item"><i class="bi bi-shield-check"></i><span>Thanh toán bảo mật</span></div>
                <div class="tb-item"><i class="bi bi-arrow-repeat"></i><span>Đổi trả 7 ngày</span></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ══════ MODAL DANH SÁCH ĐỊA CHỈ ══════ -->
    <transition name="modal-fade">
      <div v-if="isAddressModalOpen" class="co-modal-overlay" @click.self="isAddressModalOpen = false">
        <div class="co-modal">
          <div class="co-modal-header">
            <h5><i class="bi bi-geo-alt-fill me-2 text-danger"></i>Địa chỉ của tôi</h5>
            <button @click="isAddressModalOpen = false" class="co-modal-close"><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="co-modal-body">
            <div v-if="isLoadingAddresses" class="text-center py-4">
              <div class="spinner-border text-danger"></div>
            </div>
            <div v-else-if="addresses.length === 0" class="empty-address">
              <i class="bi bi-geo-alt display-4 text-muted"></i>
              <p class="text-muted mt-2">Chưa có địa chỉ nào</p>
            </div>
            <div v-else>
              <div v-for="addr in addresses" :key="addr.id"
                   class="address-item-co"
                   :class="{ selected: selectedAddressId === addr.id }"
                   @click="selectedAddressId = addr.id">
                <div class="ai-radio">
                  <div class="radio-dot" :class="{ active: selectedAddressId === addr.id }"></div>
                </div>
                <div class="ai-content">
                  <div class="ai-name-row">
                    <span class="ai-name">{{ addr.hoTenNguoiNhan }}</span>
                    <span class="ai-sep">|</span>
                    <span class="ai-phone">{{ addr.soDienThoai }}</span>
                    <!-- ✅ Check cả 2 field: laDiaChiMacDinh (BE) và laMacDinh (normalized) -->
                    <span v-if="addr.laDiaChiMacDinh || addr.laMacDinh" class="default-badge-sm">Mặc định</span>
                  </div>
                  <div class="ai-addr">{{ addr.diaChiDayDu }}</div>
                </div>
                <div class="ai-actions">
                  <button @click.stop="openEditAddressForm(addr)" class="ai-btn-edit">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button @click.stop="deleteAddress(addr.id)"
                          class="ai-btn-delete"
                          :disabled="addr.laDiaChiMacDinh || addr.laMacDinh">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="co-modal-footer">
            <button @click="openAddAddressForm" class="btn-add-new-addr">
              <i class="bi bi-plus-circle me-2"></i>Thêm địa chỉ mới
            </button>
            <button @click="isAddressModalOpen = false" class="btn-confirm-addr">
              <i class="bi bi-check2 me-2"></i>Xác nhận
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ══════ MODAL FORM ĐỊA CHỈ ══════ -->
    <transition name="modal-fade">
      <div v-if="isAddressFormOpen" class="co-modal-overlay form-layer" @click.self="isAddressFormOpen = false">
        <div class="co-modal co-modal--form">
          <div class="co-modal-header">
            <h5>
              <i class="bi bi-pencil-square me-2 text-danger"></i>
              {{ editingAddressId ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới' }}
            </h5>
            <button @click="isAddressFormOpen = false" class="co-modal-close"><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="co-modal-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold">Họ tên người nhận <span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="addressForm.tenNguoiNhan" placeholder="Nguyễn Văn A">
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">Số điện thoại <span class="text-danger">*</span></label>
                <input type="tel" class="form-control" v-model="addressForm.sdt"
                       placeholder="0912 345 678"
                       :class="{ 'is-invalid': sdtError }"
                       @input="sdtError = ''">
                <div v-if="sdtError" class="invalid-feedback">{{ sdtError }}</div>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">Tỉnh / Thành phố <span class="text-danger">*</span></label>
                <select class="form-select" v-model="selectedProvinceCode" @change="onProvinceChange">
                  <option value="" disabled>Chọn Tỉnh/Thành</option>
                  <option v-for="p in provinces" :key="p.code" :value="p.code">{{ p.name }}</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">Phường/Xã - Quận/Huyện <span class="text-danger">*</span></label>
                <select class="form-select" v-model="selectedWardCode" @change="onWardChange"
                        :disabled="!selectedProvinceCode">
                  <option value="" disabled>{{ selectedProvinceCode ? 'Chọn Phường/Xã' : 'Chọn tỉnh trước' }}</option>
                  <option v-for="w in wards" :key="w.code" :value="w.code">{{ w.extendedName }}</option>
                </select>
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold">Địa chỉ chi tiết <span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="addressForm.diaChiChiTiet"
                       placeholder="Số nhà, tên đường, tòa nhà...">
              </div>
              <div class="col-12">
                <div class="default-toggle-co" @click="addressForm.laMacDinh = !addressForm.laMacDinh">
                  <div class="toggle-sw" :class="{ on: addressForm.laMacDinh }">
                    <div class="toggle-knob"></div>
                  </div>
                  <span>Đặt làm địa chỉ mặc định</span>
                </div>
              </div>
            </div>
          </div>
          <div class="co-modal-footer">
            <button @click="isAddressFormOpen = false" class="btn-cancel-form">Hủy</button>
            <button @click="saveAddress" class="btn-save-form" :disabled="isSavingAddress">
              <span v-if="isSavingAddress" class="spinner-border spinner-border-sm me-2"></span>
              {{ isSavingAddress ? 'Đang lưu...' : (editingAddressId ? 'Cập nhật' : 'Lưu địa chỉ') }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- TOAST -->
    <transition name="toast-up">
      <div v-if="toast.show" class="co-toast" :class="`co-toast--${toast.type}`">
        <i :class="toast.type === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-exclamation-circle-fill'" class="me-2"></i>
        {{ toast.message }}
      </div>
    </transition>
    <!-- MOBILE BOTTOM BAR -->
<div class="mobile-bottom-bar">
  <div class="mbb-summary">
    <span class="mbb-label">Tổng thanh toán</span>
    <span class="mbb-total">{{ formatPrice(finalTotalPrice) }}đ</span>
  </div>
  <button @click="placeOrder" class="mbb-btn-order"
          :disabled="isPlacingOrder || !selectedAddress">
    <span v-if="isPlacingOrder" class="spinner-border spinner-border-sm"></span>
    <span v-else>{{ !selectedAddress ? 'Chọn địa chỉ' : 'Đặt hàng ngay' }}</span>
    <i v-if="!isPlacingOrder" class="bi bi-arrow-right-circle-fill"></i>
  </button>
</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { API_BASE } from '@/config/api'
const router = useRouter();

// ── STATE ──
const checkoutItems      = ref([]);
const addresses          = ref([]);
const isAddressModalOpen = ref(false);
const isAddressFormOpen  = ref(false);
const isLoadingAddresses = ref(false);
const isSavingAddress    = ref(false);
const isPlacingOrder     = ref(false);
const selectedAddressId  = ref(null);
const editingAddressId   = ref(null);
const orderNote          = ref('');
const paymentMethod      = ref('COD');
const shippingFee        = ref(30000);
const discountAmount     = ref(0);
const sdtError           = ref('');
const toast              = ref({ show: false, message: '', type: 'success' });

const addressForm = ref({
  tenNguoiNhan: '', sdt: '',
  tinhThanh: '', quanHuyen: '', phuongXa: '', diaChiChiTiet: '',
  laMacDinh: false
});
const provinces            = ref([]);
const wards                = ref([]);
const selectedProvinceCode = ref('');
const selectedWardCode     = ref('');

const paymentMethods = [
  { value: 'COD',    label: 'Thanh toán khi nhận hàng', icon: 'bi bi-cash-stack' },
  { value: 'BANK',   label: 'Chuyển khoản ngân hàng',   icon: 'bi bi-bank' },
  { value: 'VNPAY',  label: 'Thanh toán VNPay',          icon: 'bi bi-qr-code-scan' },
];

// ── COMPUTED ──
const selectedAddress = computed(() =>
  addresses.value.find(a => a.id === selectedAddressId.value)
);
const totalItemsPrice = computed(() =>
  checkoutItems.value.reduce((s, i) => s + (i.giaBan || 0) * i.soLuong, 0)
);
const finalTotalPrice = computed(() =>
  totalItemsPrice.value + shippingFee.value - discountAmount.value
);

// ── HELPERS ──
const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
});

const formatPrice = (v) =>
  v ? Math.round(Number(v)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '0';

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type };
  setTimeout(() => { toast.value.show = false; }, 3500);
};

// ✅ Validate SĐT phía FE trước khi gửi lên BE
const validateSdt = (sdt) => {
  const regex = /^(0|\+84)(3[2-9]|5[6-9]|7[0-9]|8[1-9]|9[0-9])\d{7}$/;
  return regex.test(sdt.replace(/\s/g, ''));
};

// ── MOUNTED ──
onMounted(() => {
  const stored = localStorage.getItem('checkoutItems');
  if (stored) {
    checkoutItems.value = JSON.parse(stored);
  } else {
    showToast('Không có sản phẩm để thanh toán!', 'error');
    router.push('/gio-hang');
    return;
  }
  fetchProvinces();
  fetchAddresses();
});

// ── API ──
const fetchAddresses = async () => {
  const token = localStorage.getItem('auth_token');
  if (!token) return;
  isLoadingAddresses.value = true;
  try {
    const res = await axios.get(`${API_BASE}/api/v1/addresses`, getAuthHeaders());
    // ✅ Normalize field: đồng bộ với ProfileView
    addresses.value = res.data.map(addr => ({
      ...addr,
      laMacDinh: addr.laDiaChiMacDinh ?? addr.laMacDinh ?? false
    })).sort((a, b) => (b.laMacDinh === true) - (a.laMacDinh === true));

    if (addresses.value.length > 0) {
      const def = addresses.value.find(a => a.laMacDinh);
      selectedAddressId.value = def ? def.id : addresses.value[0].id;
    }
  } catch (e) {
    console.error('Lỗi tải địa chỉ:', e.response?.data || e.message);
    showToast('Không thể tải địa chỉ!', 'error');
  } finally {
    isLoadingAddresses.value = false;
  }
};

const fetchProvinces = async () => {
  try {
    const res = await axios.get('https://provinces.open-api.vn/api/p/');
    provinces.value = res.data;
  } catch (e) { console.error(e); }
};

const onProvinceChange = async () => {
  const p = provinces.value.find(p => p.code === selectedProvinceCode.value);
  addressForm.value.tinhThanh = p?.name || '';
  selectedWardCode.value = '';
  wards.value = [];
  if (!selectedProvinceCode.value) return;
  try {
    const res = await axios.get(`https://provinces.open-api.vn/api/p/${selectedProvinceCode.value}?depth=3`);
    const all = [];
    res.data.districts?.forEach(d =>
      d.wards?.forEach(w => all.push({
        code: w.code, name: w.name, districtName: d.name,
        extendedName: `${w.name} (${d.name})`
      }))
    );
    wards.value = all;
  } catch (e) { console.error(e); }
};

const onWardChange = () => {
  const w = wards.value.find(w => w.code === selectedWardCode.value);
  if (w) { addressForm.value.phuongXa = w.name; addressForm.value.quanHuyen = w.districtName; }
};

const openAddAddressForm = () => {
  editingAddressId.value = null;
  addressForm.value = {
    tenNguoiNhan: '', sdt: '',
    tinhThanh: '', quanHuyen: '', phuongXa: '', diaChiChiTiet: '',
    laMacDinh: addresses.value.length === 0
  };
  selectedProvinceCode.value = '';
  selectedWardCode.value     = '';
  wards.value                = [];
  sdtError.value             = '';
  isAddressFormOpen.value    = true;
};

const openEditAddressForm = async (addr) => {
  editingAddressId.value  = addr.id;
  sdtError.value          = '';
  selectedProvinceCode.value = '';
  selectedWardCode.value     = '';
  wards.value                = [];

  let tinh = '', huyen = '', xa = '', detail = '';
  if (addr.diaChiDayDu) {
    const parts = addr.diaChiDayDu.split(',').map(s => s.trim());
    if (parts.length >= 4) {
      tinh   = parts[parts.length - 1];
      huyen  = parts[parts.length - 2];
      xa     = parts[parts.length - 3];
      detail = parts.slice(0, parts.length - 3).join(', ');
      const fp = provinces.value.find(p => p.name === tinh);
      if (fp) {
        selectedProvinceCode.value = fp.code;
        await onProvinceChange();
        const fw = wards.value.find(w => w.name === xa && w.districtName === huyen);
        if (fw) selectedWardCode.value = fw.code;
      }
    } else { detail = addr.diaChiDayDu; }
  }
  addressForm.value = {
    tenNguoiNhan: addr.hoTenNguoiNhan,
    sdt:          addr.soDienThoai,
    tinhThanh: tinh, quanHuyen: huyen, phuongXa: xa,
    diaChiChiTiet: detail,
    laMacDinh: addr.laMacDinh || false  // ✅ dùng field đã normalize
  };
  isAddressFormOpen.value = true;
};

const saveAddress = async () => {
  if (!addressForm.value.tenNguoiNhan?.trim()) {
    showToast('Vui lòng nhập họ tên người nhận!', 'error'); return;
  }
  // ✅ Validate SĐT phía FE để tránh lỗi 400 từ BE
  if (!validateSdt(addressForm.value.sdt)) {
    sdtError.value = 'Số điện thoại không đúng định dạng Việt Nam (VD: 0912345678)';
    showToast('Số điện thoại không hợp lệ!', 'error'); return;
  }
  if (!selectedWardCode.value) {
    showToast('Vui lòng chọn Phường/Xã!', 'error'); return;
  }
  if (!addressForm.value.diaChiChiTiet?.trim()) {
    showToast('Vui lòng nhập địa chỉ chi tiết!', 'error'); return;
  }

  isSavingAddress.value = true;
  const payload = {
    tenNguoiNhan:  addressForm.value.tenNguoiNhan.trim(),
    sdt:           addressForm.value.sdt.replace(/\s/g, ''), // bỏ khoảng trắng
    tinhThanh:     addressForm.value.tinhThanh,
    quanHuyen:     addressForm.value.quanHuyen,
    phuongXa:      addressForm.value.phuongXa,
    diaChiChiTiet: addressForm.value.diaChiChiTiet.trim(),
    laMacDinh:     addressForm.value.laMacDinh
  };

  try {
    if (editingAddressId.value) {
      await axios.put(`${API_BASE}/api/v1/addresses/${editingAddressId.value}`, payload, getAuthHeaders());
      showToast('Cập nhật địa chỉ thành công!');
    } else {
    await axios.post(`${API_BASE}/api/v1/addresses`, payload, getAuthHeaders());
      showToast('Thêm địa chỉ mới thành công!');
    }
    isAddressFormOpen.value = false;
    await fetchAddresses();
  } catch (e) {
    // ✅ Hiển thị lỗi validation từ BE rõ ràng
    const beErrors = e.response?.data;
    if (beErrors && typeof beErrors === 'object') {
      const msgs = Object.values(beErrors).join(', ');
      showToast(msgs || 'Lỗi lưu địa chỉ!', 'error');
    } else {
      showToast(beErrors || 'Lỗi lưu địa chỉ!', 'error');
    }
  } finally {
    isSavingAddress.value = false;
  }
};

const deleteAddress = async (id) => {
  if (!confirm('Xóa địa chỉ này?')) return;
  try {
    await axios.delete(`${API_BASE}/api/v1/addresses/${id}`, getAuthHeaders());
    showToast('Đã xóa địa chỉ!');
    await fetchAddresses();
  } catch (e) {
    showToast(e.response?.data || 'Không thể xóa địa chỉ này!', 'error');
  }
};

// ── ĐẶT HÀNG ──
const placeOrder = async () => {
  if (!selectedAddress.value) {
    showToast('Vui lòng chọn địa chỉ giao hàng!', 'error'); return;
  }
  const token = localStorage.getItem('auth_token');
  if (!token) { router.push('/dang-nhap'); return; }

  isPlacingOrder.value = true;
  try {
    await axios.post(`${API_BASE}/api/v1/order/checkout`, {
      nguoiDungId:         Number(localStorage.getItem('userId')),
      diaChiGiaoHangId:    Number(selectedAddress.value.id),
      phuongThucThanhToan: paymentMethod.value,
      phiVanChuyen: Number(shippingFee.value), 
      ghiChu:              orderNote.value || '',
      maVoucher:           localStorage.getItem('checkoutVoucher') || null, // ✅ đúng tên field BE
      chiTietGioHangIds:   checkoutItems.value.map(i => Number(i.id))
      // ❌ Bỏ: trangThai, trangThaiThanhToan, tongTienTruocGiam, tienGiamGia, tongTienThanhToan, maVoucherApDung
      // BE tự tính các field này trong service
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    localStorage.removeItem('checkoutItems');
    localStorage.removeItem('checkoutVoucher');
    window.dispatchEvent(new Event('cart-updated'));
    router.push('/dat-hang-thanh-cong');
  } catch (e) {
    const msg = e.response?.data?.message || e.response?.data || e.message;
    showToast('Lỗi đặt hàng: ' + (typeof msg === 'object' ? JSON.stringify(msg) : msg), 'error');
  } finally {
    isPlacingOrder.value = false;
  }
};
</script>

<style scoped>
.checkout-wrapper {
  background: #f4f5f7;
  min-height: 100vh;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

/* ── BREADCRUMB ── */
.checkout-breadcrumb {
  list-style: none; display: flex; align-items: center; gap: 6px;
  margin: 0; padding: 0; font-size: .82rem;
}
.checkout-breadcrumb a { color: #888; text-decoration: none; transition: color .2s; }
.checkout-breadcrumb a:hover { color: #e53935; }
.checkout-breadcrumb .active { color: #e53935; font-weight: 700; }
.checkout-breadcrumb i { color: #ccc; font-size: .7rem; }

/* ── STEPS ── */
.checkout-steps {
  display: flex; align-items: center; justify-content: center; gap: 0;
}
.step {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  font-size: .75rem; color: #aaa; font-weight: 600;
}
.step.active { color: #e53935; }
.step.done   { color: #4caf50; }
.step-dot {
  width: 32px; height: 32px; border-radius: 50%;
  border: 2px solid #ddd; background: #fff; color: #aaa;
  display: flex; align-items: center; justify-content: center;
  font-size: .8rem; font-weight: 700; transition: all .3s;
}
.step.active .step-dot { border-color: #e53935; background: #e53935; color: #fff; }
.step.done   .step-dot { border-color: #4caf50; background: #4caf50; color: #fff; }
.step-line { flex: 1; max-width: 80px; height: 2px; background: #ddd; margin: 0 8px; margin-bottom: 20px; }
.step-line.done { background: #4caf50; }

/* ── LAYOUT ── */
.checkout-layout {
  display: grid; grid-template-columns: 1fr 360px; gap: 24px; align-items: start;
}
@media (max-width: 992px) { .checkout-layout { grid-template-columns: 1fr; } }

/* ── CARD ── */
.checkout-card {
  background: #fff; border-radius: 16px; padding: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,.06); border: 1.5px solid #f0f0f0;
}
.card-section-header {
  display: flex; align-items: center; gap: 12px;
  padding-bottom: 16px; margin-bottom: 20px;
  border-bottom: 1.5px solid #f5f5f5;
}
.card-section-header h5, .card-section-header h6 { font-weight: 700; color: #222; margin: 0; }
.header-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: #fff0f0; color: #e53935;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem; flex-shrink: 0;
}

/* ── ĐỊA CHỈ ĐÃ CHỌN ── */
.btn-change-address {
  background: #fff0f0; color: #e53935; border: 1.5px solid #ffcdd2;
  border-radius: 8px; padding: 7px 14px; font-size: .8rem; font-weight: 600;
  cursor: pointer; transition: all .2s; white-space: nowrap;
}
.btn-change-address:hover { background: #e53935; color: #fff; }
.selected-address-display {
  display: flex; align-items: flex-start; gap: 14px;
  background: #f8f9fa; border-radius: 12px; padding: 16px;
  border: 1.5px solid #e8f5e9;
}
.sad-avatar {
  width: 42px; height: 42px; border-radius: 50%;
  background: #e53935; color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; flex-shrink: 0;
}
.sad-name  { font-weight: 700; color: #222; font-size: .95rem; }
.sad-phone { font-size: .82rem; color: #666; margin-top: 3px; }
.sad-addr  { font-size: .82rem; color: #555; margin-top: 3px; }
.default-badge {
  display: inline-flex; align-items: center;
  background: #e8f5e9; color: #2e7d32;
  padding: 3px 10px; border-radius: 20px; font-size: .72rem; font-weight: 700;
  border: 1px solid #c8e6c9; margin-left: auto; white-space: nowrap;
}
.no-address-alert {
  display: flex; align-items: center; padding: 14px 16px;
  background: #fff8e1; border-radius: 10px; border: 1px solid #ffecb3;
  color: #f57f17; font-size: .875rem; font-weight: 500;
}
.btn-add-address-inline {
  background: #e53935; color: #fff; border: none; border-radius: 8px;
  padding: 6px 14px; font-size: .78rem; font-weight: 600; cursor: pointer;
}

/* ── SẢN PHẨM ── */
.product-list { display: flex; flex-direction: column; gap: 0; }
.product-row {
  display: flex; align-items: center; gap: 14px; padding: 14px 0;
  border-bottom: 1px solid #f5f5f5;
}
.product-row:last-child { border-bottom: none; }
.product-img-wrap { position: relative; flex-shrink: 0; }
.product-img { width: 64px; height: 64px; border-radius: 10px; object-fit: cover; border: 1px solid #eee; }
.product-qty-badge {
  position: absolute; top: -6px; right: -6px; width: 20px; height: 20px;
  background: #e53935; color: #fff; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: .68rem; font-weight: 700; border: 2px solid #fff;
}
.product-info-co   { flex: 1; min-width: 0; }
.product-name-co   { font-size: .875rem; font-weight: 600; color: #222; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.product-weight-co { font-size: .75rem; color: #888; margin-top: 4px; }
.product-price-co  { text-align: right; flex-shrink: 0; }
.unit-price        { font-size: .75rem; color: #999; }
.total-price-item  { font-size: .9rem; font-weight: 700; color: #e53935; }

/* ── VẬN CHUYỂN ── */
.shipping-option {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 14px; border-radius: 10px; border: 1.5px solid #e8f5e9;
  background: #f8fdf9;
}
.so-left { display: flex; align-items: center; }
.so-price { color: #2e7d32; }
.note-input {
  width: 100%; border: 1.5px solid #e8e8e8; border-radius: 10px;
  padding: 10px 12px; font-family: inherit; font-size: .875rem; resize: none; outline: none;
  transition: border-color .2s;
}
.note-input:focus { border-color: #e53935; }

/* ── THANH TOÁN ── */
.payment-methods { display: flex; gap: 12px; flex-wrap: wrap; }
.payment-box {
  flex: 1; min-width: 120px; border: 2px solid #e8e8e8; border-radius: 12px;
  padding: 14px 12px; display: flex; flex-direction: column; align-items: center; gap: 6px;
  cursor: pointer; transition: all .2s; background: #fff; position: relative;
}
.payment-box:hover { border-color: #e53935; }
.payment-box.active { border-color: #e53935; background: #fff8f8; }
.pm-icon { font-size: 1.5rem; color: #888; }
.payment-box.active .pm-icon { color: #e53935; }
.pm-label { font-size: .72rem; font-weight: 600; text-align: center; color: #555; }
.pm-check { display: none; position: absolute; top: 6px; right: 8px; color: #e53935; font-size: .85rem; }
.payment-box.active .pm-check { display: block; }

/* ── SUMMARY ── */
.summary-sticky { position: sticky; top: 20px; }
.summary-title { font-size: 1.1rem; font-weight: 700; color: #222; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 2px solid #f5f5f5; }
.summary-rows { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
.summary-row { display: flex; justify-content: space-between; font-size: .875rem; color: #555; }
.summary-row.discount span:last-child { color: #2e7d32; font-weight: 600; }
.summary-total {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 0; border-top: 2px dashed #eee; margin-bottom: 20px;
  font-weight: 700;
}
.total-amount { font-size: 1.4rem; color: #e53935; }
.btn-place-order {
  width: 100%; background: linear-gradient(135deg, #e53935, #b71c1c);
  color: #fff; border: none; border-radius: 12px; padding: 15px;
  font-size: 1rem; font-weight: 700; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all .25s; box-shadow: 0 4px 14px rgba(229,57,53,.3);
}
.btn-place-order:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(229,57,53,.4); }
.btn-place-order:disabled { opacity: .5; cursor: not-allowed; transform: none; }
.order-warning { font-size: .78rem; color: #f57f17; text-align: center; margin-top: 10px; }
.trust-badges { display: flex; gap: 12px; margin-top: 16px; padding-top: 14px; border-top: 1px solid #f5f5f5; }
.tb-item { flex: 1; display: flex; align-items: center; gap: 6px; font-size: .72rem; color: #888; }
.tb-item i { color: #4caf50; }

/* ── MODAL ── */
.co-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.55);
  backdrop-filter: blur(4px); z-index: 1050;
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.form-layer { z-index: 1060; }
.co-modal {
  background: #fff; border-radius: 20px; width: 100%; max-width: 580px;
  max-height: 90vh; display: flex; flex-direction: column;
  box-shadow: 0 20px 60px rgba(0,0,0,.2);
}
.co-modal--form { max-width: 640px; }
.co-modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 24px; border-bottom: 1px solid #f0f0f0;
}
.co-modal-header h5 { font-weight: 700; color: #222; margin: 0; }
.co-modal-close {
  width: 32px; height: 32px; border-radius: 50%;
  border: 1px solid #e0e0e0; background: #f5f5f5; color: #555;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .2s;
}
.co-modal-close:hover { background: #e53935; color: #fff; border-color: #e53935; }
.co-modal-body { flex: 1; overflow-y: auto; padding: 20px 24px; }
.co-modal-footer {
  padding: 16px 24px; border-top: 1px solid #f0f0f0;
  display: flex; justify-content: space-between; align-items: center;
  background: #f8f8f8; border-radius: 0 0 20px 20px;
  gap: 12px;
}
.empty-address { text-align: center; padding: 40px 0; }

/* Address list item */
.address-item-co {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 16px; border-radius: 12px; border: 1.5px solid #f0f0f0;
  margin-bottom: 10px; cursor: pointer; transition: all .2s;
}
.address-item-co:hover { border-color: #ffcdd2; background: #fff8f8; }
.address-item-co.selected { border-color: #e53935; background: #fff0f0; }
.radio-dot {
  width: 18px; height: 18px; border-radius: 50%;
  border: 2px solid #ddd; background: #fff; flex-shrink: 0;
  transition: all .2s; position: relative; margin-top: 2px;
}
.radio-dot.active { border-color: #e53935; }
.radio-dot.active::after {
  content: ''; position: absolute; inset: 3px;
  border-radius: 50%; background: #e53935;
}
.ai-content { flex: 1; min-width: 0; }
.ai-name-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
.ai-name  { font-weight: 700; color: #222; font-size: .9rem; }
.ai-sep   { color: #ccc; }
.ai-phone { color: #666; font-size: .85rem; }
.ai-addr  { font-size: .82rem; color: #777; }
.default-badge-sm {
  background: #e8f5e9; color: #2e7d32; padding: 2px 8px;
  border-radius: 20px; font-size: .68rem; font-weight: 700; border: 1px solid #c8e6c9;
}
.ai-actions { display: flex; flex-direction: column; gap: 6px; flex-shrink: 0; }
.ai-btn-edit, .ai-btn-delete {
  width: 30px; height: 30px; border-radius: 8px; border: 1px solid #e8e8e8;
  background: #f5f5f5; cursor: pointer; display: flex;
  align-items: center; justify-content: center; font-size: .78rem; transition: all .2s;
}
.ai-btn-edit:hover  { background: #e3f2fd; color: #1976d2; border-color: #90caf9; }
.ai-btn-delete:hover:not(:disabled) { background: #ffebee; color: #e53935; border-color: #ffcdd2; }
.ai-btn-delete:disabled { opacity: .35; cursor: not-allowed; }

/* Modal buttons */
.btn-add-new-addr {
  background: #f5f5f5; color: #444; border: 1.5px solid #e0e0e0;
  border-radius: 10px; padding: 10px 18px; font-weight: 600; cursor: pointer;
  font-size: .875rem; transition: all .2s; display: flex; align-items: center;
}
.btn-add-new-addr:hover { border-color: #e53935; color: #e53935; background: #fff0f0; }
.btn-confirm-addr {
  background: #e53935; color: #fff; border: none;
  border-radius: 10px; padding: 10px 24px; font-weight: 700; cursor: pointer;
  font-size: .875rem; display: flex; align-items: center; transition: all .2s;
}
.btn-confirm-addr:hover { background: #b71c1c; }
.btn-cancel-form {
  background: #f5f5f5; color: #666; border: 1px solid #e0e0e0;
  border-radius: 10px; padding: 10px 20px; font-weight: 600; cursor: pointer; transition: all .2s;
}
.btn-save-form {
  background: #e53935; color: #fff; border: none;
  border-radius: 10px; padding: 10px 24px; font-weight: 700; cursor: pointer;
  display: flex; align-items: center; transition: all .2s;
}
.btn-save-form:hover:not(:disabled) { background: #b71c1c; }
.btn-save-form:disabled { opacity: .5; cursor: not-allowed; }

/* Toggle */
.default-toggle-co {
  display: flex; align-items: center; gap: 12px; cursor: pointer;
  padding: 12px 16px; border-radius: 10px; background: #f8f8f8;
  border: 1.5px solid #f0f0f0; transition: border-color .2s;
}
.default-toggle-co:hover { border-color: #e53935; }
.toggle-sw {
  width: 40px; height: 22px; border-radius: 50px; background: #ddd;
  position: relative; flex-shrink: 0; transition: background .2s;
}
.toggle-sw.on { background: #4caf50; }
.toggle-knob {
  position: absolute; top: 3px; left: 3px; width: 16px; height: 16px;
  border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,.2);
  transition: transform .2s;
}
.toggle-sw.on .toggle-knob { transform: translateX(18px); }

.co-toast {
  position: fixed; top: 20px; right: 20px; z-index: 9999;
  padding: 13px 20px; border-radius: 12px; font-size: .875rem;
  font-weight: 500; display: flex; align-items: center;
  box-shadow: 0 8px 30px rgba(0,0,0,.15);
  max-width: 360px;
}
.co-toast--success { background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; }
.co-toast--error   { background: #ffebee; color: #c62828; border: 1px solid #ffcdd2; }

/* Transitions */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .25s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.toast-up-enter-active, .toast-up-leave-active { transition: all .3s cubic-bezier(.32,.72,0,1); }
.toast-up-enter-from, .toast-up-leave-to { opacity: 0; transform: translateY(-12px); }
/* ── BIẾN THỂ TRANG THANH TOÁN ── */
.product-variants-co {
  display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;
}
.variant-tag-co {
  display: inline-flex; align-items: center; gap: 3px;
  font-size: .72rem; font-weight: 500;
  background: #fff0f0; color: #e53935;
  border: 1px solid #ffcdd2;
  padding: 2px 7px; border-radius: 20px;
}
/* ═══════════════════════════════════
   MOBILE RESPONSIVE — CHECKOUT
═══════════════════════════════════ */

/* ── Helpers ── */
.header-text { flex: 1; min-width: 0; }
.ship-note-grid { display: grid; gap: 14px; }

/* pm-top để check + icon cùng hàng */
.pm-top {
  display: flex; align-items: center;
  justify-content: space-between; width: 100%;
}

@media (min-width: 768px) {
  .ship-note-grid { grid-template-columns: 1fr 1fr; }
}

/* ──────────────────────────────────
   ≤ 992px: ẩn right column (sticky)
   vì layout đã stack 1 cột
────────────────────────────────── */
@media (max-width: 992px) {
  .checkout-layout { grid-template-columns: 1fr; gap: 16px; }
  .summary-sticky { position: static; }

  .checkout-right { display: block; }

  /* Giữ nút trong summary card, bỏ sticky nên không cần bottom bar nữa */
  .btn-place-order { display: flex; }
  .order-warning   { display: block; }
  .trust-badges    { display: flex; }

  /* Ẩn bottom bar — dùng nút trong summary card thay thế */
  .mobile-bottom-bar { display: none !important; }
  .checkout-wrapper { padding-bottom: 24px; }
}


@media (max-width: 992px) {
  /* Summary card compact */
  .summary-title { font-size: .95rem; margin-bottom: 14px; padding-bottom: 10px; }
  .summary-rows  { gap: 9px; margin-bottom: 12px; }
  .summary-row   { font-size: .82rem; }
  .summary-total { padding: 12px 0; margin-bottom: 0; }
  .total-amount  { font-size: 1.2rem; }

  /* Checkout card padding gọn */
  .checkout-right .checkout-card { padding: 16px; }
}

/* ──────────────────────────────────
   ≤ 768px: tablet / mobile lớn
────────────────────────────────── */
@media (max-width: 768px) {
  /* Container padding */
  .container { padding-left: 12px; padding-right: 12px; }
  .py-4 { padding-top: 16px !important; padding-bottom: 16px !important; }

  /* Steps gọn hơn */
  .checkout-steps { gap: 0; margin-bottom: 16px !important; }
  .step-dot { width: 28px; height: 28px; font-size: .72rem; }
  .step span { font-size: .68rem; }
  .step-line { max-width: 48px; margin: 0 4px; margin-bottom: 16px; }

  /* Cards */
  .checkout-card { padding: 16px; border-radius: 14px; }
  .card-section-header { padding-bottom: 12px; margin-bottom: 14px; gap: 10px; }
  .card-section-header h5 { font-size: .95rem; }
  .card-section-header h6 { font-size: .85rem; }
  .header-icon { width: 32px; height: 32px; border-radius: 8px; font-size: .85rem; }

  /* Địa chỉ */
  .btn-change-address { padding: 6px 10px; font-size: .75rem; }
  .btn-addr-text { display: none; } /* Chỉ hiện icon trên mobile nhỏ */
  .selected-address-display { padding: 12px; gap: 10px; }
  .sad-avatar { width: 36px; height: 36px; font-size: .95rem; }
  .sad-name { font-size: .875rem; }
  .sad-phone, .sad-addr { font-size: .76rem; }
  .default-badge { font-size: .65rem; padding: 2px 8px; }

  /* Sản phẩm */
  .product-row { gap: 10px; padding: 12px 0; }
  .product-img { width: 56px; height: 56px; border-radius: 8px; }
  .product-name-co { font-size: .8rem; }
  .variant-tag-co { font-size: .68rem; }
  .product-weight-co { font-size: .7rem; }
  .unit-price { font-size: .7rem; }
  .total-price-item { font-size: .85rem; }

  /* Vận chuyển */
  .shipping-option { padding: 10px 12px; }

  /* Thanh toán */
  .payment-methods { gap: 8px; }
  .payment-box { padding: 11px 10px; border-radius: 10px; min-width: 100px; }
  .pm-icon { font-size: 1.25rem; }
  .pm-label { font-size: .65rem; }

  /* Breadcrumb */
  .checkout-breadcrumb { font-size: .75rem; }

  /* Modal */
  .co-modal { border-radius: 16px; max-height: 85vh; }
  .co-modal-header { padding: 16px 18px; }
  .co-modal-body { padding: 16px 18px; }
  .co-modal-footer { padding: 14px 18px; }
  .address-item-co { padding: 12px; }
  .ai-name { font-size: .85rem; }
  .ai-phone, .ai-addr { font-size: .78rem; }
}

/* ──────────────────────────────────
   ≤ 575px: mobile nhỏ
────────────────────────────────── */
@media (max-width: 575px) {
  /* Steps: dots nhỏ nhất */
  .step-dot { width: 24px; height: 24px; font-size: .65rem; }
  .step span { font-size: .62rem; }
  .step-line { max-width: 32px; }

  /* Card padding tối thiểu */
  .checkout-card { padding: 13px 12px; border-radius: 12px; }
  .mb-4 { margin-bottom: 12px !important; }

  /* Địa chỉ đã chọn: stack dọc trên màn rất nhỏ */
  .selected-address-display { flex-direction: column; gap: 8px; }
  .sad-avatar { display: none; }
  .default-badge { margin-left: 0; align-self: flex-start; }

  /* Sản phẩm: ảnh nhỏ hơn */
  .product-img { width: 50px; height: 50px; }
  .product-qty-badge { width: 17px; height: 17px; font-size: .6rem; top: -5px; right: -5px; }
  .product-name-co { font-size: .78rem; white-space: normal; line-height: 1.3; }

  /* Payment: 1 hàng cuộn ngang */
  .payment-methods {
    flex-wrap: nowrap; overflow-x: auto; gap: 8px;
    padding-bottom: 4px; scrollbar-width: none;
  }
  .payment-methods::-webkit-scrollbar { display: none; }
  .payment-box { flex-shrink: 0; min-width: 110px; max-width: 130px; }

  /* Note textarea nhỏ */
  .note-input { font-size: .8rem; }

  /* Modal full-screen dạng bottom sheet */
  .co-modal-overlay { align-items: flex-end; padding: 0; }
  .co-modal {
    border-radius: 20px 20px 0 0; max-height: 92vh;
    max-width: 100%; width: 100%;
  }
  .co-modal--form { max-width: 100%; }
  .co-modal-footer { flex-direction: column; gap: 8px; border-radius: 0; }
  .co-modal-footer > * { width: 100%; justify-content: center; }
  .btn-confirm-addr, .btn-add-new-addr,
  .btn-save-form, .btn-cancel-form { text-align: center; justify-content: center; }

  /* Form fields */
  .form-control, .form-select { font-size: .875rem; }

  /* Toast */
 .co-toast { top: 12px; right: 12px; left: 12px; max-width: unset; font-size: .8rem; }
}

/* ─────────────────────────────────
   MOBILE BOTTOM BAR
   (ẩn trên desktop, hiện ≤992px)
───────────────────────────────── */
.mobile-bottom-bar {
  display: none; /* mặc định ẩn */
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 -4px 20px rgba(0,0,0,.08);
  padding: 12px 16px;
  align-items: center; gap: 14px;
  safe-area-inset-bottom: env(safe-area-inset-bottom);
  padding-bottom: max(12px, env(safe-area-inset-bottom));
}
.mbb-summary {
  display: flex; flex-direction: column; gap: 1px; flex: 1;
}
.mbb-label { font-size: .72rem; color: #888; font-weight: 500; }
.mbb-total { font-size: 1.15rem; font-weight: 800; color: #e53935; line-height: 1.2; }
.mbb-btn-order {
  display: flex; align-items: center; gap: 7px;
  background: linear-gradient(135deg, #e53935, #b71c1c);
  color: #fff; border: none; border-radius: 12px;
  padding: 13px 20px; font-size: .9rem; font-weight: 700;
  cursor: pointer; transition: all .2s; font-family: inherit;
  box-shadow: 0 4px 14px rgba(229,57,53,.35); white-space: nowrap;
  flex-shrink: 0;
}
.mbb-btn-order:hover:not(:disabled) { transform: translateY(-1px); }
.mbb-btn-order:disabled {
  opacity: .55; cursor: not-allowed; transform: none;
  background: #aaa; box-shadow: none;
}
.mbb-btn-order i { font-size: 1rem; }
</style>
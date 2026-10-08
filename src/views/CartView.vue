<template>
  <div class="horeca-cart-wrapper">

    <!-- ══════════════════ HERO BREADCRUMB ══════════════════ -->
    <div class="cart-hero">
      <div class="hero-bg-pattern"></div>
      <div class="container">
        <div class="hero-inner">
          <div class="brand-badge">
            <span class="brand-icon">🍽</span>
            <span class="brand-name">HORECA</span>
            <span class="brand-divider">|</span>
            <span class="brand-sub">Professional Kitchen</span>
          </div>
          <nav aria-label="breadcrumb">
            <ol class="horeca-breadcrumb">
              <li>
                <router-link to="/"><i class="bi bi-house-fill"></i> Trang chủ</router-link>
              </li>
              <li class="sep"><i class="bi bi-chevron-right"></i></li>
              <li class="active">Giỏ hàng</li>
            </ol>
          </nav>
          <h1 class="hero-title">Giỏ hàng của bạn</h1>
        </div>
      </div>
    </div>

    <!-- ══════════════════ MAIN CONTENT ══════════════════ -->
    <main class="cart-main">
      <div class="container">

        <!-- ── EMPTY STATE ── -->
        <div v-if="cartItems.length === 0" class="empty-state-card">
          <div class="empty-icon-ring">
            <i class="bi bi-cart-x"></i>
          </div>
          <h2>Giỏ hàng đang trống</h2>
          <p>Chưa có sản phẩm nào trong giỏ hàng của bạn.<br>Hãy khám phá danh mục sản phẩm chuyên nghiệp từ HORECA!</p>
          <router-link to="/" class="btn-horeca-primary">
            <i class="bi bi-grid-fill"></i> Khám phá sản phẩm
          </router-link>
          <div class="empty-features">
            <div class="ef-item"><i class="bi bi-truck"></i><span>Giao hàng toàn quốc</span></div>
            <div class="ef-item"><i class="bi bi-shield-check"></i><span>Chất lượng chuẩn HACCP</span></div>
            <div class="ef-item"><i class="bi bi-award"></i><span>Thương hiệu uy tín</span></div>
          </div>
        </div>

        <!-- ── CART CONTENT ── -->
        <div v-else class="cart-layout">

          <!-- LEFT -->
          <div class="cart-left">

            <div class="cart-header-bar">
              <div class="header-left-spacer">
                <label class="horeca-checkbox-label">
                  <input type="checkbox" class="horeca-checkbox" id="selectAll"
                    @change="toggleSelectAll" :checked="isAllSelected">
                  <span class="checkmark"></span>
                  <span class="label-text">Chọn tất cả <strong>({{ cartItems.length }} sản phẩm)</strong></span>
                </label>
              </div>
              <div class="header-right-cols">
                <span class="hcol">Đơn giá</span>
                <span class="hcol">Số lượng</span>
                <span class="hcol hcol-total">Thành tiền</span>
                <span class="hcol-del"></span>
              </div>
            </div>

            <!-- Product Items -->
            <div class="products-list">
              <div v-for="item in cartItems" :key="item.id"
                   class="product-row" :class="{ 'row-selected': item.duocChon }">

                <div class="row-left">
                  <label class="horeca-checkbox-label">
                    <input type="checkbox" class="horeca-checkbox" v-model="item.duocChon">
                    <span class="checkmark"></span>
                  </label>
                  <div class="product-img-wrap">
                    <img
                      :src="item.anhSanPham || 'https://via.placeholder.com/100x100/f5f5f5/999?text=No+Image'"
                      alt="Product" class="product-img"
                      @error="$event.target.src='https://via.placeholder.com/100x100/f5f5f5/999?text=No+Image'"
                    >
                
                  </div>
                  <div class="product-info">
                    <h4 class="product-name">{{ item.tenSanPham }}</h4>

                    <!-- ── HIỂN THỊ BIẾN THỂ ── -->
                    <div class="variant-tags" v-if="item.mauSac || item.kichThuoc || item.maSku">
                      <span class="variant-tag" v-if="item.mauSac">
                        <i class="bi bi-circle-fill" style="font-size:7px;"></i> {{ item.mauSac }}
                      </span>
                      <span class="variant-tag" v-if="item.kichThuoc">
                        <i class="bi bi-rulers"></i> {{ item.kichThuoc }}
                      </span>
                    
                    </div>

                    <div class="product-meta">
                      <span class="meta-tag" v-if="item.trongLuong">
                        <i class="bi bi-box-seam"></i> {{ item.trongLuong }}g
                      </span>
                      <span class="meta-tag stock-ok" v-if="item.tonKho > 5">
                        <i class="bi bi-check-circle"></i> Còn hàng
                      </span>
                      <span class="meta-tag stock-low" v-else-if="item.tonKho > 0">
                        <i class="bi bi-exclamation-circle"></i> Sắp hết
                      </span>
                    </div>
                    <button @click="removeItem(item.id)" class="btn-remove-mobile">
                      <i class="bi bi-trash3"></i> Xóa
                    </button>
                  </div>
                </div>

                <div class="row-right">
                  <div class="price-col">
                    <span class="current-price">{{ formatPrice(item.giaBan) }}đ</span>
                    <span v-if="item.giaGoc && item.giaGoc > item.giaBan" class="original-price">
                      {{ formatPrice(item.giaGoc) }}đ
                    </span>
                  </div>
                  <div class="qty-col">
                    <div class="qty-control">
                      <button @click="decreaseQty(item)" :disabled="item.soLuong <= 1" class="qty-btn">
                        <i class="bi bi-dash"></i>
                      </button>
                      <span class="qty-num">{{ item.soLuong }}</span>
                      <button @click="increaseQty(item)" :disabled="item.soLuong >= (item.tonKho || 99)" class="qty-btn">
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div class="subtotal-col">
                    <span class="subtotal">{{ formatPrice(item.giaBan * item.soLuong) }}đ</span>
                  </div>
                  <div class="del-col">
                    <button @click="removeItem(item.id)" class="btn-remove-desktop" title="Xóa sản phẩm">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Voucher Trigger Bar -->
<div class="voucher-trigger-bar">
  <div class="vtb-left">
    <i class="bi bi-ticket-perforated-fill"></i>
    <span>Mã giảm giá HORECA</span>
    <span class="vtb-count" v-if="appliedVoucher && voucherValid">
      <i class="bi bi-check-circle-fill"></i> Đã áp dụng
    </span>
  </div>
  <button class="btn-open-voucher" @click="showVoucherPopup = true">
    <span>{{ appliedVoucher && voucherValid ? 'Thay đổi mã' : 'Chọn hoặc nhập mã' }}</span>
    <i class="bi bi-chevron-right"></i>
  </button>
</div>

<!-- Voucher Popup -->
<teleport to="body">
  <transition name="popup-fade">
    <div v-if="showVoucherPopup" class="voucher-overlay" @click.self="showVoucherPopup = false">
      <div class="voucher-popup">

        <div class="popup-header">
          <div class="popup-title">
            <i class="bi bi-ticket-perforated-fill"></i>
            <span>Chọn mã giảm giá</span>
          </div>
          <button class="popup-close" @click="showVoucherPopup = false">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <div class="popup-input-section">
          <div class="voucher-input-row">
            <input type="text" v-model="popupVoucherInput"
              placeholder="Nhập mã giảm giá của bạn..."
              class="voucher-input" @keyup.enter="applyFromPopup">
            <button class="btn-apply" @click="applyFromPopup">Áp dụng</button>
          </div>
          <div v-if="popupMessage" class="voucher-msg"
               :class="popupMsgValid ? 'msg-ok' : 'msg-err'">
            <i :class="popupMsgValid ? 'bi bi-check-circle' : 'bi bi-x-circle'"></i>
            {{ popupMessage }}
          </div>
        </div>

        <div class="popup-list-section">
        <div class="popup-group-header">
  <div class="popup-group-label">
    <i class="bi bi-check-circle-fill"></i> Mã có thể sử dụng
  </div>
  <button v-if="bestVoucher" class="btn-best-voucher" @click="applyBestVoucher">
    <i class="bi bi-stars"></i> Chọn mã tốt nhất
  </button>
</div>
          <div class="popup-voucher-list">
            <div v-for="v in validVouchers" :key="v.code"
                 class="popup-voucher-item"
                 :class="{ 'pvi-selected': selectedPopupCode === v.code }"
                 @click="selectVoucher(v)">
              <div class="pvi-left">
                <div class="pvi-logo">H</div>
                <div class="pvi-body">
                  <span class="pvi-code">{{ v.code }}</span>
                  <span class="pvi-desc">{{ v.desc }}</span>
                  <span class="pvi-condition" v-if="v.minOrder > 0">
                    <i class="bi bi-info-circle"></i>
                    Đơn tối thiểu {{ formatPrice(v.minOrder) }}đ
                  </span>
                </div>
              </div>
              <div class="pvi-right">
                <div class="pvi-radio" :class="{ 'pvi-radio-on': selectedPopupCode === v.code }">
                  <span v-if="selectedPopupCode === v.code" class="pvi-radio-dot"></span>
                </div>
              </div>
            </div>
          </div>

          <template v-if="invalidVouchers.length > 0">
            <div class="popup-group-label popup-group-muted">
              <i class="bi bi-slash-circle"></i> Chưa đủ điều kiện
            </div>
            <div class="popup-voucher-list">
              <div v-for="v in invalidVouchers" :key="v.code"
                   class="popup-voucher-item pvi-disabled">
                <div class="pvi-left">
                  <div class="pvi-logo pvi-logo-muted">H</div>
                  <div class="pvi-body">
                    <span class="pvi-code pvi-code-muted">{{ v.code }}</span>
                    <span class="pvi-desc">{{ v.desc }}</span>
                    <span class="pvi-condition pvi-condition-warn">
                      <i class="bi bi-exclamation-circle"></i>
                      Cần thêm {{ formatPrice(v.minOrder - subtotalPrice) }}đ nữa
                    </span>
                  </div>
                </div>
                <div class="pvi-right">
                  <span class="pvi-unavail-badge">Chưa đủ ĐK</span>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="popup-footer">
          <button class="btn-popup-cancel" @click="showVoucherPopup = false">Đóng</button>
          <button class="btn-popup-confirm" @click="confirmPopupVoucher"
                  :disabled="!selectedPopupCode">
            <i class="bi bi-check-lg"></i> Áp dụng mã
          </button>
        </div>

      </div>
    </div>
  </transition>
</teleport>
          </div>

          <!-- RIGHT -->
          <div class="cart-right">
            <div class="summary-card">
              <div class="summary-header">
                <i class="bi bi-receipt-cutoff"></i>
                <span>Tóm tắt đơn hàng</span>
              </div>

              <div class="voucher-input-wrap">
  <label class="input-label">Mã giảm giá</label>
  <div class="applied-voucher-row" v-if="appliedVoucher && voucherValid">
    <div class="applied-badge">
      <i class="bi bi-ticket-perforated-fill"></i>
      <span>{{ appliedVoucher }}</span>
    </div>
    <button class="btn-change-voucher" @click="showVoucherPopup = true">Thay đổi</button>
  </div>
  <button v-else class="btn-select-voucher" @click="showVoucherPopup = true">
    <i class="bi bi-ticket-perforated"></i>
    <span>Chọn hoặc nhập mã giảm giá</span>
    <i class="bi bi-chevron-right" style="margin-left:auto"></i>
  </button>
  <div v-if="voucherMessage" class="voucher-msg"
       :class="voucherValid ? 'msg-ok' : 'msg-err'">
    <i :class="voucherValid ? 'bi bi-check-circle' : 'bi bi-x-circle'"></i>
    {{ voucherMessage }}
  </div>
</div>

              <div class="price-breakdown">
                <div class="breakdown-row">
                  <span class="bd-label">Tạm tính ({{ selectedItemsCount }} sp)</span>
                  <span class="bd-value">{{ formatPrice(subtotalPrice) }}đ</span>
                </div>
                <div class="breakdown-row">
                  <span class="bd-label">Phí vận chuyển</span>
                  <span class="bd-value" :class="shippingFee === 0 ? 'text-success' : ''">
                    {{ shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee) + 'đ' }}
                  </span>
                </div>
                <div class="breakdown-row discount-row">
                  <span class="bd-label">Giảm giá voucher</span>
                  <span class="bd-value text-red">
                    {{ discountAmount > 0 ? '- ' + formatPrice(discountAmount) + 'đ' : '0đ' }}
                  </span>
                </div>
              </div>

              <div class="total-row">
                <div class="total-label">
                  <span>Tổng thanh toán</span>
                  <span class="vat-note">(Đã bao gồm VAT)</span>
                </div>
                <span class="total-value">{{ formatPrice(totalPrice) }}đ</span>
              </div>

              <button @click="goToCheckout" class="btn-checkout"
                      :disabled="selectedItemsCount === 0">
                <span>Tiến hành thanh toán</span>
                <i class="bi bi-arrow-right-circle-fill"></i>
              </button>

              <div class="payment-icons">
                <span class="pay-icon">💳</span>
                <span class="pay-icon">🏦</span>
                <span class="pay-icon">💵</span>
                <span class="pay-txt">Thanh toán an toàn & bảo mật</span>
              </div>
            </div>

            <div class="trust-card">
              <div class="trust-header">Tại sao chọn <strong>HORECA</strong>?</div>
              <div class="trust-item">
                <div class="trust-icon"><i class="bi bi-truck-front-fill"></i></div>
                <div class="trust-text">
                  <strong>Giao hàng nhanh 2–4 giờ</strong>
                  <span>Nội thành TP.HCM & Hà Nội</span>
                </div>
              </div>
              <div class="trust-item">
                <div class="trust-icon"><i class="bi bi-patch-check-fill"></i></div>
                <div class="trust-text">
                  <strong>Chuẩn HACCP & Global GAP</strong>
                  <span>Chứng nhận quốc tế uy tín</span>
                </div>
              </div>
              <div class="trust-item">
                <div class="trust-icon"><i class="bi bi-arrow-repeat"></i></div>
                <div class="trust-text">
                  <strong>Đổi trả 7 ngày</strong>
                  <span>Cam kết hoàn tiền nếu có lỗi</span>
                </div>
              </div>
              <div class="trust-item">
                <div class="trust-icon"><i class="bi bi-headset"></i></div>
                <div class="trust-text">
                  <strong>Hotline 0786.667.447</strong>
                  <span>Hỗ trợ 24/7 tận tâm</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { cartState } from '@/services/cartStore';
import { API_BASE } from '@/config/api';

const router   = useRouter();
const imageMap = ref({});
const cartItems = computed(() => cartState.items);

onMounted(async () => {
  const token = localStorage.getItem('auth_token');
  if (!token) return;
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const res = await axios.get(`${API_BASE}/api/v1/cart/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.data?.chiTietGioHangs) return;

    const dbItems = res.data.chiTietGioHangs.map(item => {
      const giaBan = Number(item.giaBan) || 0; // giaKhiThem — giá lúc add (đã flash nếu có)
      const giaGoc = Number(item.giaGoc) || 0; // giaBan gốc từ sản phẩm

      return {
        id:         item.id,
        chiTietId:  item.chiTietId,
        tenSanPham: item.tenSanPham,
        mauSac:     item.mauSac     || '',
        kichThuoc:  item.kichThuoc  || '',
        maSku:      item.maSku      || '',
        giaBan,
        giaGoc:     giaGoc > giaBan ? giaGoc : 0,
        soLuong:    item.soLuong    || 1,
        tonKho:     item.tonKho     || 99,
        trongLuong: item.trongLuong || 0,
        anhSanPham: item.anhSanPham ? getImageUrl(item.anhSanPham) : null,
        duocChon:   true,
      };
    });

    dbItems.forEach(item => {
      if (item.chiTietId && item.anhSanPham) {
        imageMap.value[item.chiTietId] = item.anhSanPham;
      }
    });
    cartState.items = dbItems;

  } catch (error) {
    console.error('Lỗi lấy dữ liệu giỏ hàng:', error);
  }
});

const getImageUrl = (url) => {
  if (!url || url.trim() === '') return null;
  if (url.startsWith('http') || url.startsWith('blob:')) return url;
  if (url.startsWith('/uploads/')) return `${API_BASE}${url}`;
  return `${API_BASE}/uploads/${url}`;
};

// ── VOUCHER & PHÍ SHIP ──
const appliedVoucher = ref('');
const voucherMessage = ref('');
const voucherValid   = ref(false);
const discountAmount = ref(0);
const shippingFee    = ref(30000);

// ── POPUP STATE ──
const showVoucherPopup  = ref(false);
const popupVoucherInput = ref('');
const popupMessage      = ref('');
const popupMsgValid     = ref(false);
const selectedPopupCode = ref('');

const validVouchers = computed(() =>
  vouchers.filter(v => subtotalPrice.value >= v.minOrder)
);
const invalidVouchers = computed(() =>
  vouchers.filter(v => subtotalPrice.value < v.minOrder)
);

// Tìm mã tiết kiệm nhiều nhất:
// freeShip quy đổi thành 30.000đ, so sánh với discount tiền mặt
const bestVoucher = computed(() => {
  if (validVouchers.value.length === 0) return null;
  return validVouchers.value.reduce((best, v) => {
    const value    = v.freeShip ? 30000 : v.discount;
    const bestVal  = best.freeShip ? 30000 : best.discount;
    return value > bestVal ? v : best;
  });
});

const applyBestVoucher = () => {
  const best = bestVoucher.value;
  if (!best) return;
  selectedPopupCode.value = best.code;
  confirmPopupVoucher();
};

const selectVoucher = (v) => {
  selectedPopupCode.value = v.code;
  popupVoucherInput.value = v.code;
  popupMessage.value      = '';
};

const applyFromPopup = () => {
  const code  = popupVoucherInput.value.trim().toUpperCase();
  const found = vouchers.find(v => v.code === code);
  if (!found) {
    popupMessage.value  = 'Mã không hợp lệ.';
    popupMsgValid.value = false;
    return;
  }
  if (subtotalPrice.value < found.minOrder) {
    popupMessage.value  = `Cần đơn tối thiểu ${formatPrice(found.minOrder)}đ.`;
    popupMsgValid.value = false;
    return;
  }
  selectedPopupCode.value = code;
  popupMessage.value      = 'Hợp lệ! Nhấn "Áp dụng mã" để xác nhận.';
  popupMsgValid.value     = true;
};

const confirmPopupVoucher = () => {
  const found = vouchers.find(v => v.code === selectedPopupCode.value);
  if (!found) return;
  appliedVoucher.value  = found.code;
  voucherValid.value    = true;
  discountAmount.value  = found.discount;
  shippingFee.value     = found.freeShip ? 0 : 30000;
  voucherMessage.value  = found.freeShip
    ? 'Áp dụng thành công! Miễn phí vận chuyển.'
    : `Áp dụng thành công! Giảm ${formatPrice(found.discount)}đ.`;
  showVoucherPopup.value = false;
};

const vouchers = [
  { code: 'HORECA10',  desc: 'Giảm 10.000đ cho đơn từ 150k',    discount: 10000, minOrder: 150000, freeShip: false },
  { code: 'HORECA25',  desc: 'Giảm 25.000đ cho đơn từ 250k',    discount: 25000, minOrder: 250000, freeShip: false },
  { code: 'FREESHIP',  desc: 'Miễn phí vận chuyển toàn quốc',   discount: 0,     minOrder: 0,      freeShip: true  },
  { code: 'NEWCHEF',   desc: 'Khách mới: giảm 50.000đ đơn đầu', discount: 50000, minOrder: 0,      freeShip: false },
];

const applyVoucher = () => {
  const code  = appliedVoucher.value.trim().toUpperCase();
  const found = vouchers.find(v => v.code === code);
  if (!found) {
    voucherMessage.value = 'Mã giảm giá không hợp lệ.';
    voucherValid.value   = false;
    discountAmount.value = 0;
    shippingFee.value    = 30000;
    return;
  }
  if (subtotalPrice.value < found.minOrder) {
    voucherMessage.value = `Đơn tối thiểu ${formatPrice(found.minOrder)}đ để dùng mã này.`;
    voucherValid.value   = false;
    discountAmount.value = 0;
    shippingFee.value    = 30000;
    return;
  }
  voucherValid.value   = true;
  discountAmount.value = found.discount;
  shippingFee.value    = found.freeShip ? 0 : 30000;
  voucherMessage.value = found.freeShip
    ? 'Áp dụng thành công! Miễn phí vận chuyển.'
    : `Áp dụng thành công! Giảm ${formatPrice(found.discount)}đ.`;
};

const copyCode = (code) => {
  navigator.clipboard.writeText(code);
  appliedVoucher.value = code;
};

// ── TÍNH TOÁN ──
const subtotalPrice = computed(() =>
  cartItems.value
    .filter(i => i.duocChon)
    .reduce((s, i) => s + (Number(i.giaBan) || 0) * i.soLuong, 0)
);
const totalPrice = computed(() =>
  Math.max(0, subtotalPrice.value + shippingFee.value - discountAmount.value)
);
const selectedItemsCount = computed(() =>
  cartItems.value
    .filter(i => i.duocChon)
    .reduce((s, i) => s + i.soLuong, 0)
);
const isAllSelected = computed(() =>
  cartItems.value.length > 0 && cartItems.value.every(i => i.duocChon)
);

const formatPrice = (value) => {
  if (!value) return '0';
  return Math.round(Number(value)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const toggleSelectAll = (e) => {
  cartItems.value.forEach(item => item.duocChon = e.target.checked);
};

const updateQtyOnServer = async (item, newQty) => {
  const oldQty = Number(item.soLuong);
  item.soLuong = newQty;
  if (!item.id) {
    console.warn('item.id chưa có, bỏ qua sync');
    return;
  }
  const token = localStorage.getItem('auth_token');
  if (!token) return;
  try {
    await axios.put(
      `${API_BASE}/api/v1/cart/update/${item.id}`,
      { soLuong: newQty },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    console.error('Lỗi sync số lượng:', err);
    item.soLuong = oldQty;
  }
};

const increaseQty = (item) => {
  if (Number(item.soLuong) < (item.tonKho || 99)) {
    updateQtyOnServer(item, Number(item.soLuong) + 1);
  }
};

const decreaseQty = (item) => {
  if (Number(item.soLuong) > 1) {
    updateQtyOnServer(item, Number(item.soLuong) - 1);
  }
};

const removeItem = async (id) => {
  if (!confirm('Xóa sản phẩm này khỏi giỏ hàng?')) return;
  const token = localStorage.getItem('auth_token');
  if (token) {
    try {
      await axios.delete(`${API_BASE}/api/v1/cart/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      alert('Có lỗi xảy ra khi xóa sản phẩm.');
      return;
    }
  }
  cartState.items = cartState.items
    .filter(item => item.id !== id)
    .map(item => ({
      ...item,
      anhSanPham: imageMap.value[item.chiTietId] || item.anhSanPham
    }));
  window.dispatchEvent(new Event('cart-updated'));
};

const goToCheckout = () => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    alert('Vui lòng đăng nhập để thanh toán!');
    router.push('/dang-nhap');
    return;
  }
  const selectedProducts = cartItems.value
    .filter(i => i.duocChon)
    .map(i => ({ ...i, soLuong: Number(i.soLuong) }));
  localStorage.setItem('checkoutItems', JSON.stringify(selectedProducts));
  localStorage.setItem('checkoutTotal', totalPrice.value);
  router.push('/thanh-toan');
};


</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.horeca-cart-wrapper {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
               'Helvetica Neue', Arial, sans-serif;
  background: #F5F4F2;
  min-height: 100vh;
  color: #1A1A1A;
  font-size: 14px;
}

/* ── HERO ── */
.cart-hero {
  background: #C62828;
  position: relative;
  overflow: hidden;
  padding: 26px 0 34px;
}
.hero-bg-pattern {
  position: absolute; inset: 0;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px,
    transparent 1px, transparent 14px
  );
}
.hero-inner { position: relative; z-index: 1; }
.brand-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 4px 14px; border-radius: 100px;
  margin-bottom: 12px; font-size: 12px;
  color: rgba(255,255,255,0.9); letter-spacing: 0.04em;
}
.brand-name { font-weight: 700; color: #fff; font-size: 13px; }
.brand-divider { opacity: 0.4; }
.horeca-breadcrumb {
  list-style: none; display: flex; align-items: center;
  gap: 6px; margin-bottom: 10px; font-size: 13px;
}
.horeca-breadcrumb li a {
  color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.2s;
}
.horeca-breadcrumb li a:hover { color: #fff; }
.horeca-breadcrumb li.sep { color: rgba(255,255,255,0.35); font-size: 10px; }
.horeca-breadcrumb li.active { color: #fff; font-weight: 600; }
.hero-title {
  font-size: 28px; font-weight: 700; color: #fff; letter-spacing: -0.3px;
}

/* ── MAIN ── */
.cart-main { padding: 26px 0 60px; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

/* ── EMPTY STATE ── */
.empty-state-card {
  background: #fff; border-radius: 16px;
  padding: 60px 32px; text-align: center;
  box-shadow: 0 2px 20px rgba(0,0,0,0.06);
}
.empty-icon-ring {
  width: 92px; height: 92px; border-radius: 50%;
  background: #FFF0F0; border: 2px solid #FFCCCC;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px; font-size: 36px; color: #C62828;
  animation: float 3s ease-in-out infinite;
}
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
.empty-state-card h2 { font-size: 22px; font-weight: 700; margin-bottom: 10px; }
.empty-state-card p { color: #777; line-height: 1.7; margin-bottom: 24px; }
.btn-horeca-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: #C62828; color: #fff; padding: 12px 24px;
  border-radius: 10px; font-weight: 600; font-size: 14px;
  text-decoration: none; transition: all 0.25s; border: none; cursor: pointer;
}
.btn-horeca-primary:hover {
  background: #A31E1E; transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(198,40,40,0.3); color: #fff;
}
.empty-features {
  display: flex; justify-content: center; gap: 26px;
  margin-top: 34px; flex-wrap: wrap;
}
.ef-item { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #666; }
.ef-item i { color: #C62828; font-size: 16px; }

/* ── LAYOUT ── */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr 348px;
  gap: 20px;
  align-items: start;
}
.cart-left { display: flex; flex-direction: column; gap: 14px; }

/* ── HEADER BAR ── */
.cart-header-bar {
  background: #fff; border-radius: 12px;
  padding: 12px 16px;
  display: flex; align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  border: 1px solid #EDEDED;
}
.header-left-spacer {
  flex: 1; min-width: 0;
  display: flex; align-items: center;
}
.header-right-cols {
  display: flex; align-items: center; flex-shrink: 0;
}
.hcol {
  width: 130px; text-align: center;
  font-size: 12px; font-weight: 600; color: #999;
  text-transform: uppercase; letter-spacing: 0.05em;
}
.hcol-total { color: #C62828; }
.hcol-del { width: 40px; }

/* ── PRODUCT ROW ── */
.products-list {
  background: #fff; border-radius: 14px; overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05); border: 1px solid #EDEDED;
}
.product-row {
  display: flex; align-items: center;
  padding: 16px; border-bottom: 1px solid #F5F4F2;
  transition: background 0.15s;
}
.product-row:last-child { border-bottom: none; }
.product-row.row-selected { background: #FFF8F8; }
.product-row:hover { background: #FAFAFA; }
.product-row.row-selected:hover { background: #FFF0F0; }

.row-left {
  flex: 1; min-width: 0;
  display: flex; align-items: center; gap: 12px;
}
.row-right {
  display: flex; align-items: center; flex-shrink: 0;
}
.price-col, .qty-col, .subtotal-col { width: 130px; text-align: center; }
.del-col { width: 40px; display: flex; justify-content: center; }

/* Checkbox */
.horeca-checkbox-label {
  display: flex; align-items: center; gap: 10px; cursor: pointer;
}
.horeca-checkbox { display: none; }
.checkmark {
  width: 18px; height: 18px; border-radius: 5px;
  border: 2px solid #DDD; background: #fff;
  position: relative; transition: all 0.2s; flex-shrink: 0;
}
.horeca-checkbox:checked + .checkmark { background: #C62828; border-color: #C62828; }
.horeca-checkbox:checked + .checkmark::after {
  content: ''; position: absolute;
  left: 4px; top: 1px; width: 6px; height: 9px;
  border: 2px solid #fff; border-top: none; border-left: none;
  transform: rotate(45deg);
}
.label-text { font-size: 14px; color: #444; }

/* Image */
.product-img-wrap { position: relative; flex-shrink: 0; }
.product-img {
  width: 82px; height: 82px; border-radius: 10px;
  object-fit: cover; border: 1px solid #EEE;
}


/* Product info */
.product-info { flex: 1; min-width: 0; }
.product-name {
  font-size: 14px; font-weight: 600; color: #1A1A1A; margin-bottom: 5px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

/* ── VARIANT TAGS ── */
.variant-tags {
  display: flex; flex-wrap: wrap; gap: 5px;
  margin-bottom: 5px;
}
.variant-tag {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; font-weight: 500;
  background: #FFF0F0; color: #C62828;
  border: 1px solid #FFCCCC;
  padding: 2px 8px; border-radius: 20px;
}
.variant-tag--sku {
  background: #F5F4F2; color: #888;
  border-color: #E0E0E0; font-family: monospace;
}

.product-meta { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 4px; }
.meta-tag {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; background: #F5F4F2; color: #666;
  padding: 2px 8px; border-radius: 100px;
}
.stock-ok  { background: #E8F5E9; color: #2E7D32; }
.stock-low { background: #FFF3E0; color: #E65100; }
.btn-remove-mobile {
  display: none; background: none; border: none;
  color: #C62828; font-size: 12px; cursor: pointer;
  font-weight: 500; padding: 4px 0;
}

/* Price / qty / subtotal */
.current-price  { font-size: 14px; font-weight: 700; color: #C62828; display: block; }
.original-price { font-size: 11px; color: #AAA; text-decoration: line-through; display: block; }
.qty-control {
  display: inline-flex; align-items: center;
  border: 1.5px solid #E8E8E8; border-radius: 8px;
  overflow: hidden; background: #F9F9F9;
}
.qty-btn {
  background: none; border: none; width: 30px; height: 30px;
  cursor: pointer; color: #444; font-size: 13px; transition: background 0.15s;
  display: flex; align-items: center; justify-content: center;
}
.qty-btn:hover:not(:disabled) { background: #FFECEC; color: #C62828; }
.qty-btn:disabled { color: #CCC; cursor: not-allowed; }
.qty-num { font-size: 14px; font-weight: 600; min-width: 28px; text-align: center; }
.subtotal { font-size: 14px; font-weight: 700; color: #1A1A1A; }
.btn-remove-desktop {
  background: none; border: none; color: #CCC; font-size: 14px;
  cursor: pointer; padding: 7px; border-radius: 7px; transition: all 0.2s;
}
.btn-remove-desktop:hover { color: #C62828; background: #FFF0F0; }

/* ── VOUCHER SECTION ── */
.voucher-section {
  background: #fff; border-radius: 14px; padding: 20px;
  border: 1px solid #EDEDED; box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.section-heading {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 700; color: #1A1A1A; margin-bottom: 14px;
}
.section-heading i { color: #C62828; font-size: 17px; }
.voucher-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.voucher-card {
  border: 1.5px dashed #E0C8C8; border-radius: 10px;
  display: flex; align-items: center; gap: 10px; padding: 11px 12px;
  cursor: pointer; transition: all 0.2s; background: #FFFAFA;
}
.voucher-card:hover {
  border-color: #C62828; background: #FFF5F5;
  transform: translateY(-1px); box-shadow: 0 4px 12px rgba(198,40,40,0.1);
}
.voucher-logo {
  width: 32px; height: 32px; border-radius: 7px;
  background: #C62828; color: #fff; font-weight: 800; font-size: 15px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.voucher-body { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.voucher-code { font-size: 12px; font-weight: 700; color: #C62828; letter-spacing: 0.05em; }
.voucher-desc { font-size: 11px; color: #777; line-height: 1.3; }
.btn-copy {
  background: #F5F4F2; border: none; width: 28px; height: 28px;
  border-radius: 7px; cursor: pointer; color: #666; font-size: 12px;
  transition: all 0.2s; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.btn-copy:hover { background: #C62828; color: #fff; }

/* ── CART RIGHT ── */
.cart-right { display: flex; flex-direction: column; gap: 14px; }
.summary-card {
  background: #fff; border-radius: 16px; padding: 22px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.07); border: 1px solid #EDEDED;
}
.summary-header {
  display: flex; align-items: center; gap: 8px;
  font-size: 15px; font-weight: 700; color: #1A1A1A;
  margin-bottom: 18px; padding-bottom: 14px;
  border-bottom: 2px solid #F5F4F2;
}
.summary-header i { color: #C62828; font-size: 18px; }
.voucher-input-wrap { margin-bottom: 16px; }
.input-label {
  display: block; font-size: 11px; font-weight: 600; color: #888;
  margin-bottom: 7px; text-transform: uppercase; letter-spacing: 0.06em;
}
.voucher-input-row { display: flex; gap: 8px; }
.voucher-input {
  flex: 1; border: 1.5px solid #E8E8E8; border-radius: 8px;
  padding: 9px 12px; font-size: 14px; font-family: inherit;
  transition: border-color 0.2s; outline: none; background: #FAFAFA;
}
.voucher-input:focus { border-color: #C62828; background: #fff; }
.btn-apply {
  background: #1A1A1A; color: #fff; border: none; border-radius: 8px;
  padding: 9px 14px; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; white-space: nowrap; font-family: inherit;
}
.btn-apply:hover { background: #C62828; }
.voucher-msg {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; margin-top: 8px; padding: 7px 11px; border-radius: 7px;
}
.msg-ok  { background: #E8F5E9; color: #2E7D32; }
.msg-err { background: #FFEBEE; color: #C62828; }
.price-breakdown { display: flex; flex-direction: column; gap: 11px; margin-bottom: 14px; }
.breakdown-row { display: flex; justify-content: space-between; align-items: center; }
.bd-label { color: #666; }
.bd-value { font-weight: 600; color: #1A1A1A; }
.text-success { color: #2E7D32 !important; }
.text-red     { color: #C62828 !important; }
.discount-row { padding-bottom: 14px; border-bottom: 2px dashed #EEE; }
.total-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 18px; }
.total-label { display: flex; flex-direction: column; gap: 2px; }
.total-label span:first-child { font-size: 15px; font-weight: 700; }
.vat-note { font-size: 11px; color: #AAA; }
.total-value { font-size: 22px; font-weight: 800; color: #C62828; }
.btn-checkout {
  width: 100%;
  background: linear-gradient(135deg, #C62828, #E53935);
  color: #fff; border: none; border-radius: 12px;
  padding: 15px 20px; font-size: 15px; font-weight: 700;
  cursor: pointer; display: flex; align-items: center;
  justify-content: center; gap: 9px;
  transition: all 0.25s; font-family: inherit;
  box-shadow: 0 5px 18px rgba(198,40,40,0.3);
}
.btn-checkout:hover:not(:disabled) {
  transform: translateY(-2px); box-shadow: 0 8px 24px rgba(198,40,40,0.4);
}
.btn-checkout:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }
.payment-icons {
  display: flex; align-items: center; justify-content: center;
  gap: 6px; margin-top: 14px;
}
.pay-icon { font-size: 16px; }
.pay-txt  { font-size: 11px; color: #AAA; }

/* Trust Card */
.trust-card {
  background: #fff; border-radius: 14px; padding: 18px 20px;
  border: 1px solid #EDEDED; box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.trust-header {
  font-size: 13px; color: #666; margin-bottom: 14px;
  padding-bottom: 11px; border-bottom: 1px solid #F5F4F2;
}
.trust-header strong { color: #C62828; }
.trust-item { display: flex; gap: 11px; align-items: flex-start; margin-bottom: 12px; }
.trust-item:last-child { margin-bottom: 0; }
.trust-icon {
  width: 34px; height: 34px; border-radius: 8px;
  background: #FFF0F0; color: #C62828;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; flex-shrink: 0;
}
.trust-text { display: flex; flex-direction: column; gap: 2px; }
.trust-text strong { font-size: 13px; color: #1A1A1A; }
.trust-text span   { font-size: 12px; color: #888; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .cart-layout { grid-template-columns: 1fr; }
  .cart-right  { order: 1; }
}

@media (max-width: 768px) {
  /* Hero */
  .cart-hero { padding: 18px 0 24px; }
  .hero-title { font-size: 20px; }
  .brand-badge { font-size: 11px; padding: 3px 10px; }

  /* Ẩn header bar desktop */
  .cart-header-bar { display: none; }

  /* Product row — stack dọc */
  .product-row { flex-direction: column; align-items: flex-start; gap: 0; padding: 14px 12px; }
  .row-left { width: 100%; gap: 10px; }
  .row-right { width: 100%; margin-top: 10px; padding-top: 10px; border-top: 1px solid #F5F4F2; display: flex; align-items: center; justify-content: space-between; }

  /* Ẩn col không cần trên mobile */
  .price-col { display: none; }
  .del-col { display: none; }
  .btn-remove-desktop { display: none; }
  .subtotal-col { width: auto; text-align: left; }
  .qty-col { width: auto; }

  /* Show nút xóa mobile */
  .btn-remove-mobile { display: flex; align-items: center; gap: 4px; }

  /* Ảnh nhỏ lại */
  .product-img { width: 70px; height: 70px; border-radius: 8px; }
  .product-name { font-size: 13px; }
  .variant-tag { font-size: 10px; }
  .meta-tag { font-size: 10px; }

  /* Qty control nhỏ hơn */
  .qty-btn { width: 28px; height: 28px; font-size: 12px; }
  .qty-num { font-size: 13px; min-width: 24px; }

  /* Subtotal */
  .subtotal { font-size: 15px; color: #C62828; }

  /* Voucher grid 1 cột */
  .voucher-grid { grid-template-columns: 1fr; }
  .voucher-section { padding: 16px; }
  .voucher-card { padding: 10px; }

  /* Summary card */
  .summary-card { padding: 16px; border-radius: 12px; }
  .total-value { font-size: 20px; }
  .btn-checkout { padding: 13px 16px; font-size: 14px; }

  /* Trust card compact */
  .trust-card { padding: 14px 16px; }
  .trust-item { margin-bottom: 10px; }
  .trust-icon { width: 30px; height: 30px; font-size: 13px; }
  .trust-text strong { font-size: 12px; }
  .trust-text span { font-size: 11px; }

  /* Empty state */
  .empty-state-card { padding: 40px 20px; }
  .empty-icon-ring { width: 76px; height: 76px; font-size: 30px; }
  .empty-state-card h2 { font-size: 18px; }
  .empty-features { gap: 16px; }
  .ef-item { font-size: 12px; }
   .cart-main { padding-bottom: 80px; }
}

@media (max-width: 575px) {
  .container { padding: 0 12px; }
  .cart-main { padding: 16px 0 40px; }

  /* Hero */
  .cart-hero { padding: 14px 0 18px; }
  .hero-title { font-size: 18px; }
  .brand-badge { display: none; } /* ẩn cho gọn */

  /* Product row */
  .product-row { padding: 12px 10px; }
  .product-img { width: 62px; height: 62px; }
  .product-name { font-size: 12.5px; }

  /* Row right — giá + qty gọn hơn */
  .row-right { gap: 8px; }
  .subtotal { font-size: 14px; }
  .qty-btn { width: 26px; height: 26px; }
  .qty-num { min-width: 20px; font-size: 12px; }

  /* Voucher */
  .voucher-desc { display: none; } /* chỉ hiện code */
  .voucher-code { font-size: 13px; }

  /* Summary */
  .summary-card { padding: 14px 12px; }
  .bd-label { font-size: 13px; }
  .bd-value { font-size: 13px; }
  .total-value { font-size: 18px; }
  .btn-checkout { padding: 12px 14px; font-size: 13px; border-radius: 10px; }
  .payment-icons { gap: 4px; }
  .pay-txt { font-size: 10px; }


  /* Empty state */
  .empty-state-card { padding: 32px 16px; border-radius: 12px; }
  .empty-features { flex-direction: column; align-items: center; gap: 10px; }
}



/* ── VOUCHER TRIGGER BAR ── */
.voucher-trigger-bar {
  background: #fff; border-radius: 14px; padding: 16px 20px;
  display: flex; align-items: center; justify-content: space-between;
  border: 1px solid #EDEDED; box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.vtb-left {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 600; color: #1A1A1A;
}
.vtb-left > i { color: #C62828; font-size: 18px; }
.vtb-count {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 12px; font-weight: 500; color: #2E7D32;
  background: #E8F5E9; padding: 2px 10px; border-radius: 20px;
}
.btn-open-voucher {
  display: flex; align-items: center; gap: 6px;
  background: none; border: 1.5px solid #C62828; color: #C62828;
  padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; font-family: inherit; white-space: nowrap;
}
.btn-open-voucher:hover { background: #C62828; color: #fff; }

/* ── VOUCHER POPUP OVERLAY ── */
.voucher-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: flex-end; justify-content: center;
}
@media (min-width: 600px) {
  .voucher-overlay { align-items: center; }
}
.voucher-popup {
  background: #fff; width: 100%; max-width: 520px;
  border-radius: 20px 20px 0 0; overflow: hidden;
  display: flex; flex-direction: column; max-height: 88vh;
}
@media (min-width: 600px) {
  .voucher-popup { border-radius: 16px; max-height: 80vh; }
}

/* Popup Header */
.popup-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 20px 14px; border-bottom: 1px solid #F5F4F2; flex-shrink: 0;
}
.popup-title {
  display: flex; align-items: center; gap: 8px;
  font-size: 16px; font-weight: 700; color: #1A1A1A;
}
.popup-title i { color: #C62828; font-size: 19px; }
.popup-close {
  background: #F5F4F2; border: none; width: 32px; height: 32px;
  border-radius: 8px; cursor: pointer; color: #666; font-size: 13px;
  display: flex; align-items: center; justify-content: center; transition: all 0.2s;
}
.popup-close:hover { background: #FFECEC; color: #C62828; }

/* Popup Input */
.popup-input-section {
  padding: 14px 20px; border-bottom: 1px solid #F5F4F2; flex-shrink: 0;
}

/* Popup List */
.popup-list-section { flex: 1; overflow-y: auto; padding: 14px 20px; }
.popup-group-label {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 700; color: #2E7D32;
  text-transform: uppercase; letter-spacing: 0.07em;
  margin-bottom: 10px; margin-top: 4px;
}
.popup-group-muted { color: #999; margin-top: 18px; }
.popup-group-muted i { color: #CCC; }

.popup-voucher-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 4px; }
.popup-voucher-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 14px; border-radius: 12px;
  border: 1.5px solid #E8E8E8; background: #FAFAFA;
  cursor: pointer; transition: all 0.2s;
}
.popup-voucher-item:hover:not(.pvi-disabled) { border-color: #C62828; background: #FFF5F5; }
.popup-voucher-item.pvi-selected { border-color: #C62828; background: #FFF0F0; }
.popup-voucher-item.pvi-disabled { cursor: not-allowed; opacity: 0.6; }

.pvi-left { display: flex; align-items: flex-start; gap: 10px; flex: 1; min-width: 0; }
.pvi-logo {
  width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0;
  background: #C62828; color: #fff; font-weight: 800; font-size: 16px;
  display: flex; align-items: center; justify-content: center;
}
.pvi-logo-muted { background: #DCDCDC; color: #999; }
.pvi-body { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.pvi-code { font-size: 13px; font-weight: 700; color: #C62828; letter-spacing: 0.05em; }
.pvi-code-muted { color: #AAA; }
.pvi-desc { font-size: 12px; color: #555; }
.pvi-condition {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; color: #888;
}
.pvi-condition-warn { color: #E65100; }

.pvi-right { flex-shrink: 0; margin-left: 10px; display: flex; align-items: center; }
.pvi-radio {
  width: 18px; height: 18px; border-radius: 50%;
  border: 2px solid #DDD; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.pvi-radio-on { border-color: #C62828; background: #C62828; }
.pvi-radio-dot { width: 6px; height: 6px; border-radius: 50%; background: #fff; }
.pvi-unavail-badge {
  font-size: 10px; font-weight: 600; color: #999;
  background: #F0F0F0; border: 1px solid #E0E0E0;
  padding: 3px 8px; border-radius: 20px; white-space: nowrap;
}

/* Popup Footer */
.popup-footer {
  display: flex; gap: 10px; padding: 14px 20px;
  border-top: 1px solid #F5F4F2; flex-shrink: 0;
}
.btn-popup-cancel {
  flex: 1; background: #F5F4F2; border: none; border-radius: 10px;
  padding: 12px; font-size: 14px; font-weight: 600; cursor: pointer;
  color: #444; font-family: inherit; transition: background 0.2s;
}
.btn-popup-cancel:hover { background: #E8E8E8; }
.btn-popup-confirm {
  flex: 2; background: linear-gradient(135deg, #C62828, #E53935);
  color: #fff; border: none; border-radius: 10px;
  padding: 12px 16px; font-size: 14px; font-weight: 700;
  cursor: pointer; display: flex; align-items: center;
  justify-content: center; gap: 7px; font-family: inherit;
  transition: all 0.25s; box-shadow: 0 4px 14px rgba(198,40,40,0.3);
}
.btn-popup-confirm:hover:not(:disabled) {
  transform: translateY(-1px); box-shadow: 0 6px 18px rgba(198,40,40,0.4);
}
.btn-popup-confirm:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; transform: none; }

/* ── POPUP ANIMATION ── */
.popup-fade-enter-active,
.popup-fade-leave-active { transition: opacity 0.25s ease; }
.popup-fade-enter-from,
.popup-fade-leave-to { opacity: 0; }
.popup-fade-enter-active .voucher-popup,
.popup-fade-leave-active .voucher-popup {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.popup-fade-enter-from .voucher-popup,
.popup-fade-leave-to   .voucher-popup { transform: translateY(100%); }
@media (min-width: 600px) {
  .popup-fade-enter-from .voucher-popup,
  .popup-fade-leave-to   .voucher-popup { transform: scale(0.95) translateY(8px); }
}

/* ── SUMMARY CARD — VOUCHER ── */
.applied-voucher-row {
  display: flex; align-items: center; justify-content: space-between;
  background: #FFF0F0; border: 1.5px solid #FFCCCC;
  border-radius: 8px; padding: 9px 12px;
}
.applied-badge {
  display: flex; align-items: center; gap: 7px;
  font-size: 13px; font-weight: 700; color: #C62828;
}
.btn-change-voucher {
  background: none; border: none; font-size: 12px; font-weight: 600;
  color: #C62828; cursor: pointer; text-decoration: underline; font-family: inherit;
}
.btn-select-voucher {
  width: 100%; display: flex; align-items: center; gap: 8px;
  background: #FAFAFA; border: 1.5px dashed #DDD; border-radius: 8px;
  padding: 10px 12px; font-size: 13px; color: #888;
  cursor: pointer; font-family: inherit; transition: all 0.2s;
}
.btn-select-voucher:hover { border-color: #C62828; color: #C62828; background: #FFF5F5; }
.btn-select-voucher i:first-child { color: #C62828; font-size: 16px; }
/* ── BEST VOUCHER BUTTON ── */
.popup-group-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 10px; margin-top: 4px;
}
.popup-group-header .popup-group-label { margin-bottom: 0; margin-top: 0; }

.btn-best-voucher {
  display: inline-flex; align-items: center; gap: 5px;
  background: linear-gradient(135deg, #fff8e1, #fff3cd);
  border: 1.5px solid #F9A825; color: #E65100;
  font-size: 11px; font-weight: 700; padding: 4px 10px;
  border-radius: 20px; cursor: pointer; font-family: inherit;
  transition: all 0.2s; white-space: nowrap;
}
.btn-best-voucher:hover {
  background: linear-gradient(135deg, #F9A825, #FB8C00);
  color: #fff; border-color: #FB8C00;
  box-shadow: 0 3px 10px rgba(249,168,37,0.35);
}
.btn-best-voucher i { font-size: 12px; }
</style>
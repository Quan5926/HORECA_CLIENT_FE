<template>
  <div class="hot-deal-page-wrapper font-general bg-light">
    <main class="main-content pb-5">
      <div class="container-fluid px-lg-5">

        <!-- BREADCRUMB -->
        <nav aria-label="breadcrumb" class="py-3 mt-2">
          <ol class="breadcrumb mb-0 small text-dark">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-decoration-none text-muted">
                <i class="bi bi-house-door-fill me-1"></i>Trang chủ
              </router-link>
            </li>
            <li class="breadcrumb-item active text-shopee fw-bold" aria-current="page">Hot Deal</li>
          </ol>
        </nav>

        <!-- BANNER CAROUSEL -->
        <section v-if="hotDealBanners.length > 0" class="category-banner-wrapper mb-4 mt-2">
          <div id="hotDealCarousel" class="carousel slide rounded-1 overflow-hidden shadow-sm position-relative" data-bs-ride="carousel" data-bs-interval="5000">
            <div class="carousel-indicators">
              <button v-for="(banner, index) in hotDealBanners" :key="'hd-ind-' + banner.id"
                      type="button" data-bs-target="#hotDealCarousel" :data-bs-slide-to="index"
                      :class="{ active: index === 0 }"></button>
            </div>

            <div class="carousel-inner">
              <div v-for="(banner, index) in hotDealBanners" :key="banner.id"
                   :class="['carousel-item', { active: index === 0 }]">
                <router-link :to="banner.lienKet || '#'" class="d-block position-relative w-100 h-100">
                  <img :src="getMainImage(banner.duongDanAnh)" class="d-block w-100 object-fit-cover banner-img"
                       :alt="banner.tieuDe || 'Banner Hot Deal'">

                  <div v-if="banner.tieuDe || banner.moTa"
                       class="animated-caption position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center p-md-5 p-3">
                    <div class="col-md-8 col-lg-6">
                      <h2 class="text-white fw-bold display-5 text-shadow animate-title" v-html="banner.tieuDe"></h2>
                      <p v-if="banner.moTa" class="text-white fs-5 text-shadow animate-desc mt-3">{{ banner.moTa }}</p>
                      <button v-if="banner.tieuDe" class="btn btn-warning mt-3 px-4 py-2 fw-bold animate-btn">
                        Mua Ngay
                      </button>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#hotDealCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#hotDealCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </section>

        <!-- MAIN CONTENT: SIDEBAR + PRODUCTS -->
        <div class="row g-3">

          <!-- SIDEBAR -->
          <aside class="col-lg-2-5 d-none d-lg-block">
            <div class="filter-sidebar bg-white p-3 rounded-2 shadow-sm">

              <!-- DANH MỤC -->
              <div class="filter-section mb-4">
                <h6 class="filter-title text-uppercase mb-3 fw-bold"><i class="bi bi-fire me-2 text-shopee"></i>Hot Deal</h6>

                <div class="d-flex flex-column gap-1">
                  <button
                    v-for="tab in hotTabs" :key="tab.value"
                    @click="setActiveTab(tab.value)"
                    :class="['category-item text-start w-100 border-0 bg-transparent', { 'active': activeTab === tab.value }]"
                  >
                    <i :class="tab.icon + ' me-2'"></i>{{ tab.label }}
                  </button>
                </div>
              </div>

              <!-- BỘ LỌC GIÁ -->
              <div class="filter-section border-top pt-4">
                <h6 class="filter-title text-uppercase mb-3 fw-bold"><i class="bi bi-funnel me-2"></i>Bộ Lọc Tìm Kiếm</h6>

                <div class="filter-group mb-4">
                  <p class="filter-subtitle mb-2 text-muted small fw-bold">Khoảng Giá</p>
                  <div class="d-flex align-items-center gap-2 mb-3">
                    <input type="number" v-model="filters.minPrice" class="form-control form-control-sm text-center border-radius-2" placeholder="TỪ">
                    <div class="text-muted">-</div>
                    <input type="number" v-model="filters.maxPrice" class="form-control form-control-sm text-center border-radius-2" placeholder="ĐẾN">
                  </div>
                  <button @click="applyFilters" class="btn btn-shopee-primary w-100 btn-sm text-uppercase fw-bold border-radius-2">Áp dụng</button>
                </div>

                <div class="filter-group mb-4 border-top pt-3">
                  <p class="filter-subtitle mb-2 text-muted small fw-bold">Đánh Giá</p>
                  <div class="d-flex flex-column gap-2">
                    <div class="form-check cursor-pointer" v-for="star in [5, 4, 3, 2, 1]" :key="star">
                      <input class="form-check-input shopee-radio" type="radio" name="ratingFilter" :id="'star'+star" :value="star" v-model="filters.rating" @change="applyFilters">
                      <label class="form-check-label cursor-pointer d-flex align-items-center gap-1" :for="'star'+star">
                        <div class="rating-stars text-warning">
                          <i v-for="n in 5" :key="n" :class="n <= star ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                        </div>
                        <span class="small text-muted" v-if="star < 5">trở lên</span>
                      </label>
                    </div>
                  </div>
                </div>

                <button @click="resetFilters" class="btn btn-outline-secondary btn-sm w-100 text-uppercase border-radius-2 shadow-none mt-2 fw-medium">Xóa tất cả</button>
              </div>
            </div>
          </aside>

          <!-- PRODUCT GRID -->
          <div class="col-lg-9-5">

            <!-- SORT BAR -->
            <div class="shopee-sort-bar bg-white d-flex flex-column flex-md-row align-items-md-center justify-content-between p-3 mb-3 rounded-2 shadow-sm">
              <div class="d-flex align-items-center gap-2 flex-wrap">
                <span class="text-secondary small me-2 d-none d-md-inline">Sắp xếp theo</span>
                <button @click="setSort('bestseller')" :class="['btn btn-sm px-4 border-radius-2 shadow-none', sortBy === 'bestseller' ? 'btn-shopee-primary' : 'btn-white']">Bán chạy</button>
                <button @click="setSort('newest')" :class="['btn btn-sm px-4 border-radius-2 shadow-none', sortBy === 'newest' ? 'btn-shopee-primary' : 'btn-white']">Mới nhất</button>

                <div class="dropdown">
                  <button :class="['btn btn-sm dropdown-toggle px-3 min-w-150 border-radius-2 shadow-none text-start d-flex justify-content-between align-items-center', sortBy.includes('price') ? 'btn-shopee-primary' : 'btn-white']" data-bs-toggle="dropdown">
                    {{ sortLabel }}
                  </button>
                  <ul class="dropdown-menu shadow-sm border-0 small border-radius-2 mt-1">
                    <li><a class="dropdown-item py-2" href="#" @click.prevent="setSort('price_asc')">Giá: Thấp đến Cao</a></li>
                    <li><a class="dropdown-item py-2" href="#" @click.prevent="setSort('price_desc')">Giá: Cao đến Thấp</a></li>
                  </ul>
                </div>
                  <button class="d-lg-none filter-icon-btn" @click="showMobileFilter = true" title="Bộ lọc">
                  <i class="bi bi-sliders"></i>
                  <span v-if="hasActiveFilters" class="filter-icon-dot"></span>
                </button>
              </div>

              <div class="d-none d-md-flex align-items-center gap-2 small mt-3 mt-md-0">
                <div class="page-info me-3">
                  <span class="text-shopee fw-bold">{{ currentPage }}</span> / {{ totalPages }}
                </div>
                <div class="btn-group shadow-sm">
                  <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="btn btn-sm btn-white border-end"><i class="bi bi-chevron-left"></i></button>
                  <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="btn btn-sm btn-white"><i class="bi bi-chevron-right"></i></button>
                </div>
              </div>
            </div>

            <!-- LOADING -->
            <div v-if="isLoading" class="text-center py-5">
              <div class="spinner-border text-shopee" style="width: 3rem; height: 3rem;" role="status"></div>
            </div>

            <!-- EMPTY STATE -->
            <div v-else-if="products.length === 0" class="text-center py-5 bg-white rounded shadow-sm">
              <i class="bi bi-search fs-1 text-muted opacity-25"></i>
              <h6 class="text-secondary mt-3">Không tìm thấy sản phẩm nào phù hợp</h6>
            </div>

            <!-- PRODUCT LIST -->
            <div v-else class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 mt-2">
              <div class="col" v-for="product in products" :key="product.id">
                <div class="product-item card h-100 bg-white text-decoration-none border-radius-2 position-relative">

                  <!-- DISCOUNT BADGE -->
                 <div v-if="product.giamGia && !product.lienHe" class="shopee-discount-badge">
                    <span class="percent">{{ product.giamGia }}%</span>
                    <span class="label">GIẢM</span>
                  </div>

               <!-- PRODUCT IMAGE -->
<router-link :to="`/san-pham/chi-tiet/${product.id}`" class="product-img-wrapper position-relative overflow-hidden d-flex align-items-center justify-content-center bg-light">
  <img :src="getProductImage(product)" 
     class="img-fluid w-100 h-100 object-fit-cover" 
     :alt="product.tenSanPham"
     @error="$event.target.src='https://placehold.co/400x400?text=No+Image'">
</router-link>
<div class="hot-badge">🔥 HOT</div>

                <!-- PRODUCT INFO -->
<div class="card-body p-3 d-flex flex-column text-center">
  <router-link :to="`/san-pham/chi-tiet/${product.id}`" class="text-decoration-none">
    <div class="product-category-label">{{ product.tenDanhMuc || 'Hot Deal' }}</div>
    <div class="product-name text-dark mb-2" :title="product.tenSanPham">
      {{ product.tenSanPham }}
    </div>
  </router-link>

  <div class="d-flex gap-1 flex-wrap justify-content-center mt-1 mb-2">
    <span v-if="getSoldCount(product) >= 100" class="badge-custom badge-hot">Bán chạy</span>
    <span v-if="product.giamGia >= 30" class="badge-custom badge-cheap">Siêu rẻ</span>
  </div>

  <div class="mt-auto">
  <!-- GIÁ: lienHe hoặc bình thường -->
  <template v-if="product.lienHe">
  <div class="d-flex justify-content-center mb-2">
    <button
      class="btn btn-sm btn-success rounded-pill px-3 fw-bold d-flex align-items-center gap-1"
      style="font-size: 0.75rem;"
      @click.stop="openContact(product)">
      <i class="bi bi-telephone-fill"></i> Liên hệ
    </button>
  </div>
</template>
  <template v-else>
  <div class="price-shopee mb-2 justify-content-center flex-column align-items-center">
    <span v-if="product.giaGoc && product.giaGoc > product.giaBan"
          class="text-muted text-decoration-line-through"
          style="font-size:0.78rem; line-height:1.2;">
      {{ formatPrice(product.giaGoc) }}đ
    </span>
    <span class="amount fw-bold"
          :style="product.giaGoc && product.giaGoc > product.giaBan ? 'color:#ee4d2d;' : ''">
      {{ formatPrice(product.giaBan) }}đ
    </span>
  </div>
</template>

  <div class="rating-stars text-warning mb-1" style="font-size: 0.75rem;">
    <i v-for="n in 5" :key="n" :class="n <= Math.round(product.diemDanhGia || 0) ? 'bi bi-star-fill' : 'bi bi-star'"></i>
  </div>
  <span class="sold-count text-muted mb-3 d-block" style="font-size: 0.8rem;">Đã bán {{ formatSoldCount(product) }}</span>

  <button v-if="!product.lienHe"
    @click.prevent="addToCart(product)"
    class="btn btn-outline-cart w-100 fw-bold text-uppercase">
    Thêm vào giỏ
  </button>
  <router-link v-else
    :to="`/san-pham/chi-tiet/${product.id}`"
    class="btn btn-outline-cart w-100 fw-bold text-uppercase text-decoration-none">
    Xem chi tiết
  </router-link>
</div>
</div>
                    

                </div>
              </div>
            </div>

            <!-- PAGINATION -->
            <nav v-if="products.length > 0 && totalPages > 1" class="mt-5 mb-4 d-flex justify-content-center">
              <ul class="pagination shopee-pagination mb-0 gap-2">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <button class="page-link" @click="changePage(currentPage - 1)">
                    <i class="bi bi-chevron-left"></i>
                  </button>
                </li>
                <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                  <button class="page-link" @click="changePage(page)">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <button class="page-link" @click="changePage(currentPage + 1)">
                    <i class="bi bi-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>

          </div>
        </div>
      </div>
    </main>
    <ContactPopup
  :show="contactPopup.show"
  :phone="contactPopup.phone"
  :zalo="contactPopup.zalo"
  @close="contactPopup.show = false"
/>


<!-- MOBILE FILTER POPUP -->
<teleport to="body">
  <transition name="filter-slide">
    <div v-if="showMobileFilter" class="mobile-filter-backdrop" @click.self="showMobileFilter = false">
      <div class="mobile-filter-panel">

        <!-- Header -->
        <div class="mfp-header">
          <span class="mfp-title"><i class="bi bi-sliders me-2"></i>Bộ lọc</span>
          <button class="mfp-close" @click="showMobileFilter = false">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="mfp-body">

          <!-- Tab -->
          <div class="mfp-section">
            <p class="mfp-label">Danh mục</p>
            <div class="mfp-pills">
              <button
                v-for="tab in hotTabs" :key="tab.value"
                class="mfp-pill"
                :class="{ 'mfp-pill--active': activeTab === tab.value }"
                @click="activeTab = tab.value"
              >
                <i :class="tab.icon + ' me-1'"></i>{{ tab.label }}
              </button>
            </div>
          </div>

          <!-- Giá -->
          <div class="mfp-section">
            <p class="mfp-label">Khoảng giá</p>
            <div class="mfp-price-row">
              <input type="number" v-model="filters.minPrice"
                class="mfp-price-input" placeholder="Từ" />
              <span class="mfp-price-sep">—</span>
              <input type="number" v-model="filters.maxPrice"
                class="mfp-price-input" placeholder="Đến" />
            </div>
          </div>

          <!-- Đánh giá -->
          <div class="mfp-section">
            <p class="mfp-label">Đánh giá</p>
            <div class="mfp-rating-list">
              <div
                v-for="star in [5,4,3,2,1]" :key="star"
                class="mfp-rating-item"
                :class="{ 'mfp-rating-item--active': filters.rating === star }"
                @click="filters.rating = filters.rating === star ? null : star"
              >
                <span v-for="n in 5" :key="n" class="mfp-star">
                  <i :class="n <= star ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                </span>
                <span class="mfp-star-label" v-if="star < 5">trở lên</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="mfp-footer">
          <button class="mfp-btn-reset" @click="resetFilters(); showMobileFilter = false">
            Xóa tất cả
          </button>
          <button class="mfp-btn-apply" @click="applyFilters(); showMobileFilter = false">
            Áp dụng
          </button>
        </div>

      </div>
    </div>
  </transition>
</teleport>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import axios from 'axios';
import { cartState } from '@/services/cartStore';
import { bannerService } from '@/services/bannerService';
import { API_BASE } from '@/config/api'
// Import fallback banners
import banner1 from '@/assets/images/bannerhotdeal1.png';
import banner2 from '@/assets/images/bannerhotdeal2.png';
import banner3 from '@/assets/images/bannerhotdeal3.png';
import ContactPopup from '@/components/ContactPopup.vue';
const contactPopup = ref({ show: false, phone: '', zalo: '' });
const showMobileFilter = ref(false)

const hasActiveFilters = computed(() =>
  !!filters.minPrice || !!filters.maxPrice || !!filters.rating || activeTab.value !== 'all'
)
const openContact = (product) => {
  contactPopup.value = {
    show: true,
    phone: product.soDienThoai || '',
    zalo: product.zaloLink || '',
  };
};
// ===================== STATE =====================
const products = ref([]);
const isLoading = ref(true);
const hotDealBanners = ref([]);

const currentPage = ref(1);
const totalPages = ref(1);
const sortBy = ref('bestseller');
const activeTab = ref('all');

const filters = reactive({
  minPrice: null,
  maxPrice: null,
  rating: null
});

const hotTabs = [
  { value: 'all',      label: 'Tất cả Hot Deal',  icon: 'bi bi-grid' },
  { value: 'flash',    label: 'Flash Sale',        icon: 'bi bi-lightning-charge' },
  { value: 'top10',    label: 'Top 10 bán chạy',   icon: 'bi bi-trophy' },
  { value: 'discount', label: 'Giảm giá sâu',      icon: 'bi bi-percent' },
];

const sortLabel = computed(() => {
  if (sortBy.value === 'price_asc') return 'Giá: Thấp đến Cao';
  if (sortBy.value === 'price_desc') return 'Giá: Cao đến Thấp';
  return 'Giá';
});

const apiClient = axios.create({
  baseURL: `${API_BASE}/api`,
  timeout: 10000,
});

// ===================== HELPERS =====================
const formatPrice = (price) => {
  if (!price) return '0';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const getSoldCount = (product) => {
  if (!product) return 0;
  if (product.daBan) return product.daBan;
  if (product.soLuongDaBan) return product.soLuongDaBan;
  if (product.tongDaBan) return product.tongDaBan;
  if (product.chiTietSanPhams && Array.isArray(product.chiTietSanPhams)) {
    return product.chiTietSanPhams.reduce((sum, item) => sum + (item.daBan || item.soLuongDaBan || 0), 0);
  }
  return 0;
};

const formatSoldCount = (product) => {
  const count = getSoldCount(product);
  if (!count) return 0;
  if (count >= 1000) return (count / 1000).toFixed(1) + 'k';
  return count;
};

const getProductImage = (product) => {
  let path = product.anhSanPham || product.anhChinh || 
    (product.danhSachAnh && product.danhSachAnh.length > 0 ? product.danhSachAnh[0] : null);
  if (!path) return 'https://placehold.co/400x400?text=No+Image';
  if (path.startsWith('http') || path.startsWith('blob:')) return path;
  if (path.startsWith('/uploads/')) return `${API_BASE}${path}`;
  return `${API_BASE}/uploads/${path}`;
};

const getMainImage = (imgString) => {
  if (!imgString) return 'https://placehold.co/800x400?text=No+Image';
  if (imgString.startsWith('http') || imgString.startsWith('data:image') || imgString.startsWith('blob:')) return imgString;
  if (imgString.startsWith('/uploads/')) return `${API_BASE}${imgString}`;
  return `${API_BASE}/uploads/${imgString}`;
};

// ===================== FETCH BANNERS =====================
const fetchBanners = async () => {
  try {
    const data = await bannerService.getBannersByPosition('HOT_DEAL');
    if (data && data.length > 0) {
      hotDealBanners.value = data;
    } else {
      hotDealBanners.value = [
        { id: 1, duongDanAnh: banner1, lienKet: '/hot-deal', tieuDe: 'GIA VỊ HỮU CƠ <br><span style="color:#ffd600">GIẢM SỐC 50%</span>' },
        { id: 2, duongDanAnh: banner2, lienKet: '/hot-deal', tieuDe: 'COMBO TIẾT KIỆM <br><span style="color:#ffd600">CHỈ TỪ 99K</span>' },
        { id: 3, duongDanAnh: banner3, lienKet: '/hot-deal', tieuDe: 'MUA 1 TẶNG 1 <br><span style="color:#ffd600">SỐT CHẤM</span>' },
      ];
    }
  } catch {
    hotDealBanners.value = [
      { id: 1, duongDanAnh: banner1, lienKet: '/hot-deal', tieuDe: 'HOT DEAL - ƯU ĐÃI SỐC' },
    ];
  }
};

// ===================== FETCH HOT PRODUCTS =====================
/**
 * Tất cả tab đều dùng endpoint /api/products (endpoint duy nhất backend có).
 * Lấy 1 lần toàn bộ sản phẩm (size lớn), rồi sort/filter client-side.
 *
 * Tab logic:
 *  - all      : lấy tất cả, sort theo daBan giảm dần
 *  - top10    : lấy tất cả, sort theo daBan giảm dần, chỉ hiện 10 cái đầu
 *  - discount : lọc sản phẩm có giamGia >= 20, sort theo giamGia giảm dần
 *  - flash    : lọc sản phẩm có giamGia >= 30 (không có flash-sale riêng)
 */
const fetchHotProducts = async () => {
  isLoading.value = true;
  products.value = [];

  try {
    const [productRes, flashRes] = await Promise.allSettled([
      apiClient.get('/products', {
        params: {
          page: 1,
          size: 100,
          trangThai: true,
          minPrice: filters.minPrice || '',
          maxPrice: filters.maxPrice || '',
        },
      }),
      axios.get(`${API_BASE}/api/khuyen-mai-flash`)
    ]);

    // Build flash map: chiTietSanPhamId → phanTramGiamGia
    const flashMap = new Map();
    if (flashRes.status === 'fulfilled') {
      (flashRes.value.data || [])
        .filter(f => f.trangThaiHienThi === 'Đang diễn ra')
        .forEach(f => flashMap.set(Number(f.chiTietSanPhamId), f.phanTramGiamGia || 0));
    }

    if (productRes.status !== 'fulfilled') {
      products.value = [];
      return;
    }

    const rawData = productRes.value.data;
    let allItems = [];

    if (rawData && Array.isArray(rawData.content)) {
      allItems = rawData.content;
    } else if (Array.isArray(rawData)) {
      allItems = rawData;
    } else if (rawData && Array.isArray(rawData.data)) {
      allItems = rawData.data;
    }

    // Apply flash sale price vào từng sản phẩm
    allItems = allItems.map(p => {
      const chiTietId = p.chiTietId ||
        (p.chiTietSanPhams && p.chiTietSanPhams.length > 0 ? p.chiTietSanPhams[0].id : null);
      const flashPercent = chiTietId ? (flashMap.get(Number(chiTietId)) || 0) : 0;
      if (flashPercent > 0) {
        const giaGoc = p.giaBan || 0;
        return {
          ...p,
          giaBan:  Math.round(giaGoc * (1 - flashPercent / 100)),
          giaGoc,
          giamGia: flashPercent,
        };
      }
      return p;
    });

    // ── Lọc theo rating nếu có ──
    if (filters.rating) {
      allItems = allItems.filter(p => Math.round(p.diemDanhGia || 0) >= filters.rating);
    }

    // ── Sort theo sortBy của sort-bar ──
    if (sortBy.value === 'price_asc') {
      allItems.sort((a, b) => (a.giaBan || 0) - (b.giaBan || 0));
    } else if (sortBy.value === 'price_desc') {
      allItems.sort((a, b) => (b.giaBan || 0) - (a.giaBan || 0));
    } else if (sortBy.value === 'newest') {
      allItems.sort((a, b) => (b.id || 0) - (a.id || 0));
    } else {
      // mặc định: bestseller → sort theo số đã bán giảm dần
      allItems.sort((a, b) => getSoldCount(b) - getSoldCount(a));
    }

    // ── Lọc theo tab đang chọn ──
    let filtered = allItems;
    if (activeTab.value === 'top10') {
      filtered = allItems.slice(0, 10);   // top 10 bán chạy nhất (đã sort ở trên)
    } else if (activeTab.value === 'discount') {
      filtered = allItems.filter(p => (p.giamGia || 0) >= 20);
      // re-sort: giảm giá nhiều nhất lên trước
      if (!sortBy.value.includes('price')) {
        filtered.sort((a, b) => (b.giamGia || 0) - (a.giamGia || 0));
      }
   } else if (activeTab.value === 'flash') {
  // Chỉ lấy sản phẩm đang thực sự có flash sale (giaGoc > giaBan)
  filtered = allItems.filter(p => p.giaGoc && p.giaGoc > p.giaBan);
  if (!sortBy.value.includes('price')) {
    filtered.sort((a, b) => (b.giamGia || 0) - (a.giamGia || 0));
  }
}

    // ── Phân trang client-side ──
    const pageSize = 15;
    const total = filtered.length;
    totalPages.value = Math.max(1, Math.ceil(total / pageSize));

    // Đảm bảo currentPage không vượt quá totalPages
    if (currentPage.value > totalPages.value) currentPage.value = 1;

    const start = (currentPage.value - 1) * pageSize;
    products.value = filtered.slice(start, start + pageSize);

  } catch (error) {
    console.error('Lỗi lấy sản phẩm Hot Deal:', error);
    products.value = [];
  } finally {
    isLoading.value = false;
  }
};

// ===================== CONTROLS =====================
const setActiveTab = (tab) => {
  activeTab.value = tab;
  currentPage.value = 1;
  fetchHotProducts();
};

const setSort = (type) => {
  sortBy.value = type;
  currentPage.value = 1;
  fetchHotProducts();
};

const applyFilters = () => {
  currentPage.value = 1;
  fetchHotProducts();
};

const resetFilters = () => {
  filters.minPrice = null;
  filters.maxPrice = null;
  filters.rating = null;
  sortBy.value = 'bestseller';
  applyFilters();
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchHotProducts();
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }
};

// ===================== ADD TO CART =====================
const addToCart = async (product) => {
  const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
  if (!token) {
    alert('Vui lòng đăng nhập để thêm vào giỏ hàng!');
    return;
  }
 if (product.lienHe) return;
  const correctChiTietId = product.chiTietId ||
    (product.chiTietSanPhams && product.chiTietSanPhams.length > 0 ? product.chiTietSanPhams[0].id : null);

  if (!correctChiTietId) {
    alert('Lỗi dữ liệu sản phẩm: Không tìm thấy mã chi tiết sản phẩm. Vui lòng thử lại sau!');
    return;
  }

  const payload = {
    nguoiDungId: localStorage.getItem('user_id') || 2,
    chiTietSanPhamId: correctChiTietId,
    soLuong: 1,
    giaHienTai: product.giaBan || 0,
  };

  try {
    const response = await axios.post(`${API_BASE}/api/v1/cart/add`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data && response.data.chiTietGioHangs) {
      cartState.items = response.data.chiTietGioHangs.map((i) => {
        const sp = i.sanPham || i;
        return {
          id: i.id,
          tenSanPham: sp.tenSanPham || product.tenSanPham,
          maSku: sp.maSku || '',
          giaBan: i.giaHienTai || sp.giaBan || product.giaBan,
          giaGoc: sp.giaNhap || sp.giaBan || product.giaGoc || 0,
          soLuong: i.soLuong || 1,
          tonKho: sp.tonKho || 99,
          trongLuong: sp.trongLuong || 0,
          anhSanPham: (sp.anhSanPham || sp.anhChinh) ? getProductImage(sp) : getProductImage(product),
          duocChon: true,
        };
      });
    } else {
      const cartItemFormat = {
        id: correctChiTietId,
        tenSanPham: product.tenSanPham,
        giaBan: product.giaBan,
        giaGoc: product.giaGoc || product.giaBan,
        soLuong: 1,
        tonKho: product.tonKho || 99,
        trongLuong: product.trongLuong || 0,
        anhSanPham: getProductImage(product),
        duocChon: true,
      };
      const existingItem = cartState.items.find((i) => i.id === cartItemFormat.id);
      if (existingItem) existingItem.soLuong += 1;
      else cartState.items.push(cartItemFormat);
    }

    window.dispatchEvent(new Event('cart-updated'));
    alert('Thêm vào giỏ hàng thành công!');
  } catch (error) {
    console.error('Lỗi chi tiết:', error.response?.data);
    alert('Lỗi: ' + (error.response?.data?.message || 'Không thể thêm vào giỏ'));
  }
};

// ===================== LIFECYCLE =====================
onMounted(() => {
  fetchBanners();
  fetchHotProducts();
});
</script>

<style scoped>
/* ===== COLOR SCHEME (Giữ nguyên palette CategoryDetail) ===== */
.text-shopee { color: #ee4d2d !important; }
.bg-shopee { background-color: #ee4d2d !important; }
.btn-shopee-primary { background-color: #ee4d2d !important; color: white !important; border: 1px solid #ee4d2d; }
.btn-shopee-primary:hover { background-color: #d73211 !important; color: white; }
.btn-white { background-color: white; border: 1px solid #e1e1e1; color: #333; }
.btn-white:hover { background-color: #f8f8f8; }
.border-radius-2 { border-radius: 2px !important; }
.cursor-pointer { cursor: pointer; }

/* ===== LAYOUT COLS ===== */
.col-lg-2-5 { width: 20%; }
.col-lg-9-5 { width: 80%; }
@media (max-width: 991px) { .col-lg-2-5, .col-lg-9-5 { width: 100%; } }

/* ===== SIDEBAR ===== */
.filter-title { font-size: 14px; font-weight: 700; color: #333; }
.filter-subtitle { font-size: 14px; font-weight: 500; color: #333; }

.category-item {
  display: block;
  color: rgba(0,0,0,.8);
  font-size: 14px;
  text-decoration: none;
  padding: 8px 12px 8px 16px;
  transition: all 0.2s ease;
  position: relative;
  border-radius: 4px;
}
.category-item:hover { color: #ee4d2d; transform: translateX(2px); background-color: #fffaf9; }
.category-item.active { color: #ee4d2d; font-weight: 700; }
.category-item.active::before {
  content: "";
  position: absolute;
  left: 0; top: 50%;
  transform: translateY(-50%);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 6px solid #ee4d2d;
}

.shopee-checkbox:checked, .shopee-radio:checked { background-color: #ee4d2d; border-color: #ee4d2d; }

/* ===== SORT BAR ===== */
.shopee-sort-bar { background-color: #ffffff; }
.min-w-150 { min-width: 170px; }

/* ===== PRODUCT CARD ===== */
.product-item {
  border: 1px solid transparent !important;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  transition: transform 0.1s ease, border 0.1s ease, box-shadow 0.1s ease;
  min-height: 330px;
  overflow: visible;
}
.product-item:hover {
  border: 1px solid #ee4d2d !important;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,.15) !important;
  transform: translateY(-2px);
  z-index: 2;
}

.product-img-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #fafafa;
}

/* ===== DISCOUNT BADGE ===== */
.shopee-discount-badge {
  position: absolute; top: 0; right: 0;
  background-color: rgba(255, 212, 36, 0.95);
  width: 36px; height: 40px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  z-index: 3;
}
.shopee-discount-badge::after {
  content: ""; position: absolute; left: 0; bottom: -4px;
  border-width: 0 18px 4px; border-style: solid;
  border-color: transparent rgba(255, 212, 36, 0.95) transparent rgba(255, 212, 36, 0.95);
}
.shopee-discount-badge .percent { color: #ee4d2d; font-size: 12px; font-weight: 700; line-height: 1; margin-top: 2px; }
.shopee-discount-badge .label { color: white; font-size: 10px; font-weight: 600; text-transform: uppercase; }

/* ===== HOT FLAME BADGE (góc trên bên trái) ===== */
.hot-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #ff3b3b;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 4px;
  z-index: 10;
  pointer-events: none;
  letter-spacing: 0.3px;
}

/* ===== CUSTOM BADGE TAGS ===== */
.badge-custom {
  font-size: 0.65rem; padding: 2px 4px; border-radius: 2px;
  font-weight: 600; text-transform: uppercase;
}
.badge-hot { background-color: #ee4d2d; color: #fff; }
.badge-cheap { border: 1px solid #ff7a00; color: #ff7a00; background-color: transparent; }

/* ===== PRICE & RATING ===== */
.product-name {
  font-size: 18px;
  color: #222;
  line-height: 1.4;
  min-height: 50px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 500;
  margin-bottom: 4px;
}

.price-shopee {
  color: #c0392b;
  display: flex;
  align-items: baseline;
  justify-content: center;
  font-size: 18px;
}

.product-category-label {
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 6px;
}

.btn-outline-cart {
  border: 1.5px solid #c0392b;
  color: #c0392b;
  background: transparent;
  border-radius: 3px;
  font-size: 13px;
  letter-spacing: 1px;
  padding: 8px 0;
  transition: all 0.2s ease;
}
.btn-outline-cart:hover {
  background: #c0392b;
  color: white;
}

/* Xóa hoặc ẩn shopee-cart-btn cũ */
.shopee-cart-btn { display: none; }

/* ===== CART BUTTON ===== */
.shopee-cart-btn {
  border: 1px solid #ee4d2d;
  color: #ee4d2d;
  background: transparent;
  padding: 4px 8px;
  border-radius: 4px;
}

.shopee-cart-btn:hover {
  background: #fff5f3;
}
/* ===== PAGINATION ===== */
.shopee-pagination .page-link {
  border: none; color: #999; font-size: 16px; font-weight: 500;
  width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
  border-radius: 2px !important; margin: 0 4px; background: transparent; transition: 0.2s;
}
.shopee-pagination .page-item.active .page-link { background-color: #ee4d2d; color: white; }
.shopee-pagination .page-link:hover:not(.active) { color: #ee4d2d; }

/* ===== BANNER ===== */
.banner-img {
  height: 400px;
  max-height: 400px;
  object-fit: cover;
  object-position: center center;
  width: 100%;
  border-radius: 2px;
  background-color: #f5f5f5;
}

.category-banner-wrapper .carousel-inner {
  min-height: 400px;
}
.category-banner-wrapper .carousel-item {
  height: 400px;
}
.animated-caption {
  background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%);
  pointer-events: none;
}
.animated-caption .btn { pointer-events: auto; }
.text-shadow { text-shadow: 2px 2px 6px rgba(0,0,0,0.8); }

.animate-title, .animate-desc, .animate-btn { opacity: 0; }
.carousel-item.active .animate-title { animation: slideInLeft 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards; }
.carousel-item.active .animate-desc { animation: slideInUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0.3s forwards; }
.carousel-item.active .animate-btn { animation: zoomIn 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) 0.6s forwards; }

@keyframes slideInLeft { 0% { transform: translateX(-80px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
@keyframes slideInUp { 0% { transform: translateY(40px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
@keyframes zoomIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }


/* ===== MOBILE RESPONSIVE ===== */
@media (max-width: 575px) {

  .banner-img { height: 160px; max-height: 160px; }   /* ← sửa dòng này */
  .category-banner-wrapper .carousel-inner { min-height: 160px; }  /* ← thêm dòng này */
  .category-banner-wrapper .carousel-item  { height: 160px; }      /* ← thêm dòng này */
  .animated-caption h2 { font-size: 1.2rem !important; }
  .animated-caption p  { font-size: .85rem !important; display: none; }
  .animated-caption .btn { padding: 6px 16px; font-size: .8rem; }

  /* Sort bar */
  .shopee-sort-bar { padding: 10px 12px !important; gap: 8px; }
  .shopee-sort-bar .btn { font-size: 12px; padding: 5px 10px; }
  .shopee-sort-bar .dropdown .btn { min-width: unset; font-size: 12px; padding: 5px 10px; }

  /* Product grid — 2 cột nhỏ gọn */
  .row-cols-2 > .col { padding: 6px; }

  /* Card */
  .product-item { min-height: unset; }
  .product-name { font-size: 13px; min-height: 36px; }
  .product-category-label { font-size: 10px; letter-spacing: .8px; }
  .price-shopee { font-size: 14px; }
  .sold-count { font-size: 11px !important; }
  .rating-stars { font-size: .65rem !important; }
  .card-body { padding: 8px 10px !important; }

  /* Discount badge */
  .shopee-discount-badge { width: 30px; height: 34px; }
  .shopee-discount-badge .percent { font-size: 10px; }
  .shopee-discount-badge .label  { font-size: 8px; }

  /* Flame badge */
  .flame-badge { width: 34px; height: 44px; top: -18px; right: -4px; }

  /* Badge tags */
  .badge-custom { font-size: .58rem; padding: 1px 4px; }

  /* Cart button */
  .btn-outline-cart { font-size: 11px; padding: 6px 0; letter-spacing: .5px; }

  /* Contact button */
  .btn-success.rounded-pill { font-size: .68rem !important; padding: 4px 10px !important; }

  /* Pagination */
  .shopee-pagination .page-link { width: 32px; height: 32px; font-size: 13px; margin: 0 2px; }

  /* Filter bar sticky — tắt trên mobile */
  .da-filter-section { position: relative; top: unset; }
}

@media (min-width: 576px) and (max-width: 768px) {
  .banner-img { height: 240px; max-height: 240px; }   /* ← sửa dòng này */
  .category-banner-wrapper .carousel-inner { min-height: 240px; }  /* ← thêm dòng này */
  .category-banner-wrapper .carousel-item  { height: 240px; }      /* ← thêm dòng này */
  .product-name { font-size: 14px; }
  .price-shopee { font-size: 15px; }
}
/* ===== MOBILE FILTER BUTTON ===== */

.mobile-filter-btn:hover { background: #fff5f3; }


/* ===== BACKDROP ===== */
.mobile-filter-backdrop {
  position: fixed; inset: 0; z-index: 99999;
  background: rgba(0,0,0,.45);
  display: flex; align-items: flex-end;
}

/* ===== PANEL ===== */
.mobile-filter-panel {
  width: 100%; max-height: 85vh;
  background: #fff;
  border-radius: 20px 20px 0 0;
  display: flex; flex-direction: column;
  overflow: hidden;
}

/* Header */
.mfp-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}
.mfp-title { font-size: 16px; font-weight: 700; color: #222; }
.mfp-close {
  width: 32px; height: 32px; border-radius: 50%;
  border: none; background: #f5f5f5; color: #555;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; cursor: pointer;
  transition: all .2s;
}
.mfp-close:hover { background: #fde8e8; color: #ee4d2d; }

/* Body */
.mfp-body {
  flex: 1; overflow-y: auto; padding: 16px 20px;
  display: flex; flex-direction: column; gap: 20px;
}
.mfp-section {}
.mfp-label {
  font-size: 12px; font-weight: 700; text-transform: uppercase;
  letter-spacing: .8px; color: #999; margin-bottom: 10px;
}

/* Pills danh mục */
.mfp-pills { display: flex; flex-wrap: wrap; gap: 8px; }
.mfp-pill {
  padding: 7px 14px; border-radius: 30px; font-size: 13px; font-weight: 600;
  border: 1.5px solid #e8eaed; background: transparent; color: #555;
  cursor: pointer; transition: all .2s;
}
.mfp-pill:hover { border-color: #ee4d2d; color: #ee4d2d; background: #fff5f3; }
.mfp-pill--active { background: #ee4d2d; border-color: #ee4d2d; color: #fff !important; }

/* Price inputs */
.mfp-price-row {
  display: flex; align-items: center; gap: 10px;
}
.mfp-price-input {
  flex: 1; border: 1.5px solid #e8eaed; border-radius: 10px;
  padding: 10px 12px; font-size: 14px; outline: none;
  transition: border-color .2s;
}
.mfp-price-input:focus { border-color: #ee4d2d; }
.mfp-price-sep { color: #999; font-size: 16px; flex-shrink: 0; }

/* Rating */
.mfp-rating-list { display: flex; flex-direction: column; gap: 8px; }
.mfp-rating-item {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 14px; border-radius: 10px;
  border: 1.5px solid #e8eaed; cursor: pointer;
  transition: all .2s;
}
.mfp-rating-item:hover { border-color: #ffc107; background: #fffbf0; }
.mfp-rating-item--active { border-color: #ffc107; background: #fffbf0; }
.mfp-star { color: #ffc107; font-size: 15px; }
.mfp-star-label { font-size: 13px; color: #666; margin-left: 4px; }

/* Footer */
.mfp-footer {
  display: flex; gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
  flex-shrink: 0;
}
.mfp-btn-reset {
  flex: 1; padding: 12px; border-radius: 10px;
  border: 1.5px solid #e8eaed; background: #fff;
  color: #666; font-size: 14px; font-weight: 700;
  cursor: pointer; transition: all .2s;
}
.mfp-btn-reset:hover { border-color: #ee4d2d; color: #ee4d2d; }
.mfp-btn-apply {
  flex: 2; padding: 12px; border-radius: 10px;
  border: none; background: #ee4d2d;
  color: #fff; font-size: 14px; font-weight: 700;
  cursor: pointer; transition: all .2s;
}
.mfp-btn-apply:hover { background: #d73211; }

/* Transition */
.filter-slide-enter-active,
.filter-slide-leave-active { transition: opacity .25s ease; }
.filter-slide-enter-active .mobile-filter-panel,
.filter-slide-leave-active .mobile-filter-panel { transition: transform .3s cubic-bezier(.4,0,.2,1); }
.filter-slide-enter-from { opacity: 0; }
.filter-slide-enter-from .mobile-filter-panel { transform: translateY(100%); }
.filter-slide-leave-to { opacity: 0; }
.filter-slide-leave-to .mobile-filter-panel { transform: translateY(100%); }

/* FILTER ICON BUTTON */
.filter-icon-btn {
  position: relative;
  width: 36px; height: 36px;
  border-radius: 8px;
  border: 1.5px solid #ee4d2d;
  background: #fff;
  color: #ee4d2d;
  font-size: 16px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all .2s;
  flex-shrink: 0;
}
.filter-icon-btn:hover { background: #fff5f3; }
.filter-icon-dot {
  position: absolute; top: 4px; right: 4px;
  width: 7px; height: 7px; border-radius: 50%;
  background: #ee4d2d; border: 1.5px solid #fff;
}
</style>
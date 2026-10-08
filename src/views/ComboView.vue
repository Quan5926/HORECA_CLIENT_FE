<template>
  <div class="combo-page-wrapper font-general">
    <main class="main-content bg-white pb-5">
      <div class="container-fluid px-lg-5">
        <nav aria-label="breadcrumb" class="py-3">
          <ol class="breadcrumb mb-0 small text-dark">
            <li class="breadcrumb-item"><router-link to="/" class="text-decoration-none text-muted"><i class="bi bi-house-door-fill me-1"></i>Trang chủ</router-link></li>
            <li class="breadcrumb-item"><router-link to="/san-pham" class="text-decoration-none text-muted">Sản phẩm</router-link></li>
            <li class="breadcrumb-item active text-main-brown fw-bold" aria-current="page">Combo Nấu Ăn</li>
          </ol>
        </nav>
    
        <section v-if="categoryBanners.length > 0" class="category-banner-wrapper mb-5 mt-3">
          <div id="categoryCarousel" class="carousel slide rounded overflow-hidden shadow-sm" data-bs-ride="carousel" data-bs-interval="5000">
            <div class="carousel-indicators">
              <button v-for="(banner, index) in categoryBanners" :key="'cat-ind-' + banner.id"
                      type="button" data-bs-target="#categoryCarousel" :data-bs-slide-to="index" 
                      :class="{ active: index === 0 }"></button>
            </div>
            <div class="carousel-inner">
              <div v-for="(banner, index) in categoryBanners" :key="banner.id" 
                   :class="['carousel-item', { active: index === 0 }]">
                <router-link :to="banner.lienKet || '#'">
                  <img :src="banner.duongDanAnh" class="d-block w-100 object-fit-cover" 
                       style="height: 350px;" :alt="banner.tieuDe || 'Banner Sản Phẩm'">
                </router-link>
              </div>
            </div>
            <template v-if="categoryBanners.length > 1">
              <button class="carousel-control-prev" type="button" data-bs-target="#categoryCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon p-3 bg-dark rounded-circle opacity-50"></span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#categoryCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon p-3 bg-dark rounded-circle opacity-50"></span>
              </button>
            </template>
          </div>
        </section>
        <div class="row g-4">
          <aside class="col-lg-3">
            <div class="sidebar-block mb-4">
              <h5 class="sidebar-title">Danh mục Combo</h5>
              <ul class="list-unstyled sidebar-list border p-3 pt-2">
                <li v-for="cat in categories" :key="cat.name">
                    <a href="#" class="d-flex justify-content-between">
                        {{ cat.name }} <span class="badge bg-light text-secondary rounded-pill">{{ cat.count }}</span>
                    </a>
                </li>
              </ul>
            </div>

            <div class="sidebar-block mb-4">
              <h5 class="sidebar-title-simple">Lọc giá</h5>
              <div class="ps-1">
                <div class="form-check mb-2" v-for="(range, i) in priceFilters" :key="i">
                  <input class="form-check-input cursor-pointer" type="radio" name="priceRange" :id="'p'+i">
                  <label class="form-check-label small cursor-pointer" :for="'p'+i">{{ range }}</label>
                </div>
              </div>
            </div>

            <div class="sidebar-block mb-4">
              <h5 class="sidebar-title-simple">Thương hiệu</h5>
              <div class="d-flex gap-2">
                <input type="text" class="form-control form-control-sm w-50" placeholder="Khác">
                <input type="text" class="form-control form-control-sm w-50" value="Vipep" readonly>
              </div>
            </div>

            <div class="sidebar-block">
              <h5 class="sidebar-title">Gợi ý nấu ngon</h5>
              <div class="border p-3 bg-light-brown-subtle">
                 <div class="d-flex gap-3 small align-items-center mb-3 cursor-pointer" v-for="k in 3" :key="k">
                    <img src="https://placehold.co/60x60/8b572a/ffffff?text=Tip" class="rounded border" alt="tip">
                    <span class="fw-bold text-main-brown line-clamp-2">Cách sử dụng Combo Phở Bò Vipep chuẩn vị Hà Nội...</span>
                 </div>
              </div>
            </div>
          </aside>

          <div class="col-lg-9">
            <div class="sort-bar d-flex align-items-center gap-2 mb-4 flex-wrap pb-3 border-bottom">
              <span class="small fw-bold text-secondary">Sắp xếp theo:</span>
              <button class="btn btn-sort active">Bán chạy nhất</button>
              <button class="btn btn-sort">Giá tăng dần</button>
              <button class="btn btn-sort">Giá giảm dần</button>
              <button class="btn btn-sort">Mới nhất</button>
            </div>

            <div class="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-3">
              <div class="col" v-for="(product, index) in products" :key="index">
                <div class="product-item card h-100 border-0 shadow-sm overflow-hidden group-hover-parent">
                  <div v-if="product.discount" class="discount-badge">-{{ product.discount }}%</div>
                  
                  <div class="p-2 position-relative overflow-hidden">
                    <img :src="product.image" class="card-img-top transition-zoom" :alt="product.name">
                    
                    <div class="hover-actions position-absolute bottom-0 start-0 w-100 p-2 d-flex justify-content-center gap-2 opacity-0 group-hover-show">
                        <button class="btn btn-light btn-sm rounded-circle shadow text-main-brown" title="Thêm vào giỏ"><i class="bi bi-cart-plus-fill"></i></button>
                        <button class="btn btn-light btn-sm rounded-circle shadow text-danger" title="Yêu thích"><i class="bi bi-heart"></i></button>
                    </div>
                  </div>
                  
                  <div class="card-body p-3 pt-0 text-center">
                    <h6 class="product-name text-dark hover-text-brown cursor-pointer">{{ product.name }}</h6>
                    <div class="price-wrapper">
                      <span class="current-price text-danger fw-bold fs-5">{{ product.price }}</span>
                      <span v-if="product.oldPrice" class="old-price text-muted small text-decoration-line-through ms-2">{{ product.oldPrice }}</span>
                    </div>
                    <div class="rating text-warning small mt-1">
                        <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <nav class="mt-5">
              <ul class="pagination justify-content-center pagination-sm">
                <li class="page-item active"><a class="page-link px-3" href="#">1</a></li>
                <li class="page-item"><a class="page-link px-3" href="#">2</a></li>
                <li class="page-item"><a class="page-link px-3" href="#">3</a></li>
                <li class="page-item"><a class="page-link px-3" href="#">...</a></li>
                <li class="page-item"><a class="page-link px-3" href="#">Sau</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </main>

   
    </div>
</template>

<script>
// 1. Import Service
import { bannerService } from '@/services/bannerService';

export default {
  data() {
    return {
      categoryBanners: [],

      priceFilters: [
        'Dưới 100.000đ', '100.000đ - 200.000đ', '200.000đ - 300.000đ', 
        '300.000đ - 500.000đ', 'Trên 500.000đ'
      ],
      categories: [
        { name: 'Combo Ăn Dặm', count: 5 },
        { name: 'Combo Nấu Phở/Lẩu', count: 8 },
        { name: 'Combo Tẩm Ướp', count: 12 },
        { name: 'Combo Tiết Kiệm', count: 6 },
        { name: 'Hộp Quà Biếu', count: 4 }
      ],
      products: [
        { name: "Combo Gia Vị Nấu Phở Bò Hà Nội (Set 5 gói)", price: "85,000đ", oldPrice: "100,000đ", discount: 15, image: "https://placehold.co/300x300?text=Combo+Pho+Bo" },
        // ... (Giữ nguyên các product của bạn)
      ]
    }
  },
  // 2. Thêm async
  async mounted() {
    try {
      // 3. GỌI API LẤY BANNER VỊ TRÍ 'CATEGORY'
      const data = await bannerService.getBannersByPosition('CATEGORY');
      
      if (data && data.length > 0) {
        // Gán data thật
        this.categoryBanners = data;
      } else {
        // Fallback data ảo
        this.categoryBanners = [
          { id: 98, duongDanAnh: 'https://placehold.co/1920x350/8b572a/ffffff?text=Banner+Sản+Phẩm+1', lienKet: '#', tieuDe: 'Banner Sản Phẩm Chung 1' },
          { id: 99, duongDanAnh: 'https://placehold.co/1920x350/7eb33d/ffffff?text=Banner+Sản+Phẩm+2', lienKet: '#', tieuDe: 'Banner Sản Phẩm Chung 2' }
        ];
      }
    } catch (error) {
      console.error("Lỗi lấy banner danh mục:", error);
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
</script>

<style scoped>
/* ================= VARIABLES & UTILS ================= */
:root {
  --main-brown: #4d3105;
  --light-brown: #8b572a;
  --vipep-green: #7eb33d;
  --vipep-red: #ee2624;
}

.text-main-brown { color: #4d3105 !important; }
.bg-main-brown { background-color: #4d3105 !important; }
.text-vipep-green { color: #7eb33d !important; }
.bg-light-brown-subtle { background-color: #fdf8f0; }
.hover-text-brown:hover { color: #4d3105 !important; transition: 0.2s; }
.hover-green:hover { color: #7eb33d !important; }
.hover-white:hover { color: white !important; }
.cursor-pointer { cursor: pointer; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* ================= HEADER ================= */
.main-logo { max-height: 55px; }
.cart-btn { background-color: #4d3105; padding: 8px 15px; border-radius: 10px; transition: 0.3s; }
.cart-btn:hover { background-color: #7eb33d; }
.main-menu { background-color: #4d3105; }
.nav-link { color: #fff !important; font-size: 13px !important; font-weight: 700; padding: 14px 18px !important; }
.nav-link:hover, .nav-link.router-link-active { color: #7eb33d !important; }

/* ================= BANNER SLIDER (CAROUSEL) ================= */
#categoryCarousel {
  position: relative;
}
.carousel-item {
  height: 350px;
}
.banner-img {
  height: 100%;
  object-fit: cover;
}

/* ================= SIDEBAR ================= */
.sidebar-title { background-color: #4d3105; color: #fff; padding: 10px 15px; font-size: 16px; font-weight: bold; border-radius: 8px 8px 0 0; margin-bottom: 0; }
.sidebar-title-simple { font-size: 16px; font-weight: bold; color: #4d3105; margin-bottom: 12px; border-bottom: 2px solid #eee; padding-bottom: 5px; }
.sidebar-list { border-radius: 0 0 8px 8px; }
.sidebar-list li { padding: 8px 0; border-bottom: 1px dashed #eee; }
.sidebar-list li:last-child { border-bottom: none; }
.sidebar-list a { text-decoration: none; color: #555; font-size: 14px; transition: 0.2s; }
.sidebar-list a:hover { color: #7eb33d; padding-left: 5px; }

/* ================= PRODUCT CARD ================= */
.product-item { transition: all 0.3s ease; }
.product-item:hover { border-color: #4d3105; box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; transform: translateY(-5px); }
.discount-badge { position: absolute; top: 10px; left: 0; background-color: #ee2624; color: white; font-size: 11px; padding: 4px 10px; border-radius: 0 20px 20px 0; z-index: 2; font-weight: bold; box-shadow: 2px 2px 5px rgba(0,0,0,0.2); }
.transition-zoom { transition: transform 0.6s ease; }
.product-item:hover .transition-zoom { transform: scale(1.1); }
.group-hover-show { transition: opacity 0.3s ease, transform 0.3s ease; transform: translateY(10px); }
.product-item:hover .group-hover-show { opacity: 1; transform: translateY(0); }
.product-name { font-size: 14px; line-height: 1.4; font-weight: 600; margin-bottom: 5px; height: 40px; overflow: hidden; }

/* ================= SORT BAR & PAGINATION ================= */
.btn-sort { border: 1px solid #ddd; background: #fff; color: #555; font-size: 13px; padding: 6px 15px; border-radius: 4px; transition: 0.2s; }
.btn-sort:hover, .btn-sort.active { border-color: #4d3105; background-color: #4d3105; color: #fff; }
.pagination .page-link { color: #333; border: none; margin: 0 3px; border-radius: 4px; font-weight: 600; }
.pagination .page-item.active .page-link { background-color: #4d3105; color: white; }

/* ================= FOOTER ================= */
.wave-separator { width: 100%; height: 120px; background: #ffffff; position: relative; margin-bottom: -1px; }
.wave-svg { position: absolute; bottom: 0; width: 100%; height: 120px; display: block; }

/* FOOTER STYLE */
.text-vipep-green { color: #28a745 !important; }
.hover-white:hover { color: #fff !important; text-decoration: underline !important; }
.pointer { cursor: pointer; transition: transform 0.3s ease; }
.pointer:hover { transform: scale(1.1); }

/* ================= FLOATING CONTACT BUTTONS ================= */
.floating-contact { position: fixed; right: 20px; bottom: 80px; z-index: 9999; display: flex; flex-direction: column; gap: 12px; }
.contact-item { display: flex; align-items: center; text-decoration: none; transition: all 0.3s ease; position: relative; flex-direction: row-reverse; }
.icon-wrapper { width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 22px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); z-index: 2; background: white; }
.hotline .icon-wrapper { background: #dc3545; animation: pulse-red 2s infinite; }
.zalo .icon-wrapper { background: #0088ff; }
.messenger .icon-wrapper { background: #0078ff; }
.scroll-top { background: #4d3105; color: white; border: none; width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.contact-item .label { background: rgba(0, 0, 0, 0.7); color: white; padding: 5px 15px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-right: 10px; opacity: 0; visibility: hidden; transform: translateX(20px); transition: all 0.3s ease; white-space: nowrap; }
.contact-item:hover .label { opacity: 1; visibility: visible; transform: translateX(0); }
.contact-item:hover .icon-wrapper { transform: scale(1.1); }

@keyframes pulse-red { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); } }

@media (max-width: 768px) { .floating-contact { right: 10px; bottom: 100px; } .icon-wrapper { width: 40px; height: 40px; font-size: 20px; } .contact-item .label { display: none; } }
.dropdown-menu li:hover > .dropdown-menu { display: block; top: 0; left: 100%; margin-top: -1px; }
</style>
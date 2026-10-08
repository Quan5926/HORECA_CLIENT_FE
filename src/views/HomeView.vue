<template>
  <div class="home-page font-general">

    <!-- Carousel Banner -->
    <section class="container-fluid px-0 my-0" v-if="homeBanners.length > 0">
      <div class="hc-wrap">
        <div class="hc-progress-line">
          <div class="hc-progress-bar" :style="{ width: progressWidth + '%', transition: isTransitioning ? 'none' : `width ${slideDuration}ms linear` }"></div>
        </div>
        <div class="hc-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div v-for="(banner, index) in homeBanners" :key="banner.id"
               class="hc-slide" :class="{ active: index === currentIndex }">
            <router-link :to="banner.lienKet || '#'" class="hc-link">
              <img :src="banner.duongDanAnh" class="hc-img" :alt="banner.tieuDe || 'Banner HORECA VN'" loading="eager" decoding="async" />
              <div class="hc-overlay"></div>
            </router-link>
          </div>
        </div>
        <div class="hc-dots" v-if="homeBanners.length > 1">
          <button v-for="(banner, index) in homeBanners" :key="'dot-' + banner.id"
                  class="hc-dot" :class="{ active: index === currentIndex }"
                  @click="goToSlide(index)" :aria-label="'Chuyển đến banner ' + (index + 1)">
          </button>
        </div>
      </div>
    </section>

    <!-- SERVICE BAR V2 -->
    <section class="sb2-section reveal">
      <div class="sb2-inner">
        <div class="sb2-item reveal-item">
          <div class="sb2-icon-wrap">
            <svg class="sb2-svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s-8-4.5-8-11.8V5l8-3 8 3v5.2C20 17.5 12 22 12 22z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <div class="sb2-body">
            <strong class="sb2-title">100% Tự Nhiên</strong>
            <span class="sb2-desc">Không tạp chất, an toàn tuyệt đối</span>
          </div>
          <div class="sb2-stat"><span class="sb2-num">100%</span><span class="sb2-unit">Thuần sạch</span></div>
        </div>
        <div class="sb2-divider"></div>
        <div class="sb2-item reveal-item">
          <div class="sb2-icon-wrap">
            <svg class="sb2-svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div class="sb2-body">
            <strong class="sb2-title">Cam Kết Chất Lượng</strong>
            <span class="sb2-desc">Đổi trả trong 7 ngày</span>
          </div>
          <div class="sb2-stat"><span class="sb2-num">7</span><span class="sb2-unit">Ngày đổi trả</span></div>
        </div>
        <div class="sb2-divider"></div>
        <div class="sb2-item reveal-item">
          <div class="sb2-icon-wrap">
            <svg class="sb2-svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </div>
          <div class="sb2-body">
            <strong class="sb2-title">Hỗ Trợ 24/7</strong>
            <span class="sb2-desc">Tư vấn nhiệt tình, tận tâm</span>
          </div>
          <div class="sb2-stat"><span class="sb2-num">24/7</span><span class="sb2-unit">Luôn trực tuyến</span></div>
        </div>
        <div class="sb2-divider"></div>
        <div class="sb2-item reveal-item">
          <div class="sb2-icon-wrap">
            <svg class="sb2-svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="1"/>
              <path d="M16 8h4l3 3v5h-7V8z"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
          <div class="sb2-body">
            <strong class="sb2-title">Giao Hàng Toàn Quốc</strong>
            <span class="sb2-desc">Nhanh chóng, đóng gói cẩn thận</span>
          </div>
          <div class="sb2-stat"><span class="sb2-num">63</span><span class="sb2-unit">Tỉnh thành</span></div>
        </div>
      </div>
    </section>

    <!-- Danh Mục Sản Phẩm -->
    <section class="container my-5 reveal">
      <h3 class="section-heading fw-bold mb-4">DANH MỤC HORECA VN</h3>
      <div class="row g-3">
        <div class="col-lg-3 col-md-6 col-6 reveal-item" v-for="cat in horecaCategories" :key="cat.id">
          <router-link :to="`/san-pham/${createSlug(cat.tenDanhMuc || cat.name)}`"
                       class="horeca-cat-card d-flex align-items-center justify-content-between p-3 h-100 position-relative overflow-hidden text-decoration-none shadow-sm">
            <div class="cat-content z-2">
              <h5 class="fw-bold text-white mb-2">{{ cat.tenDanhMuc || cat.name }}</h5>
              <div class="text-white-50 small"><i class="bi bi-box-seam me-1"></i> {{ cat.soLuongSanPham || cat.count || 0 }} sản phẩm</div>
            </div>
            <div class="cat-img-wrapper z-2">
              <img :src="getMainImage(cat.hinhAnh || cat.image)" :alt="cat.tenDanhMuc || cat.name" class="img-fluid rounded-circle border-glow" style="width: 80px; height: 80px; object-fit: cover;">
            </div>
            <div class="bg-gradient-overlay"></div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- FLASH SALE V2 -->
    <section class="container my-5 pb-4 section-divider reveal">
      <div class="fs2-wrapper">
        <div class="fs2-blob fs2-blob--tl"></div>
        <div class="fs2-blob fs2-blob--br"></div>
        <div class="fs2-header">
          <div class="fs2-header-left">
            <div class="fs2-lightning-wrap"><i class="bi bi-lightning-charge-fill fs2-lightning-icon"></i></div>
            <div>
              <h3 class="fs2-title">FLASH SALE TRỢ GIÁ</h3>
              <p class="fs2-subtitle">Ưu đãi cực sốc – Số lượng có hạn</p>
            </div>
          </div>
          <div class="fs2-countdown-wrap">
            <span class="fs2-countdown-label">Kết thúc trong</span>
            <div class="fs2-countdown">
              <div class="fs2-cd-block"><span class="fs2-cd-num">{{ countdownHours }}</span><span class="fs2-cd-unit">GIỜ</span></div>
              <span class="fs2-cd-sep">:</span>
              <div class="fs2-cd-block"><span class="fs2-cd-num">{{ countdownMinutes }}</span><span class="fs2-cd-unit">PHÚT</span></div>
              <span class="fs2-cd-sep">:</span>
              <div class="fs2-cd-block"><span class="fs2-cd-num">{{ countdownSeconds }}</span><span class="fs2-cd-unit">GIÂY</span></div>
            </div>
          </div>
        </div>
        <div class="fs2-grid" v-if="flashSaleLoading">
          <div class="fs2-card fs2-card--skeleton" v-for="n in 5" :key="n">
            <div class="fs2-sk-img"></div>
            <div class="fs2-sk-line fs2-sk-line--full"></div>
            <div class="fs2-sk-line fs2-sk-line--half"></div>
            <div class="fs2-sk-bar"></div>
          </div>
        </div>
        <div class="fs2-grid" v-else-if="flashSaleProducts.length > 0">
          <router-link v-for="item in flashSaleProducts" :key="item.id" :to="`/san-pham/chi-tiet/${item.id}`" class="fs2-card text-decoration-none reveal-item">
            <div v-if="item.discount > 0 && !item.lienHe" class="fs2-badge-sale">-{{ item.discount }}%</div>
            <div class="fs2-img-box">
              <transition name="fade-img" mode="out-in">
                <img :key="item.image" :src="item.image" :alt="item.name" class="fs2-img mix-blend-multiply" />
              </transition>
              <div class="fs2-img-glow"></div>
            </div>
            <div class="fs2-info">
              <p class="fs2-name">{{ item.name }}</p>
              <div class="fs2-price-row">
                <template v-if="item.lienHe">
                  <button
                    class="btn btn-sm btn-success rounded-pill px-3 fw-bold d-flex align-items-center gap-1"
                    style="font-size: 0.75rem;"
                    @click.stop="openContact(item)">
                    <i class="bi bi-telephone-fill"></i> Liên hệ
                  </button>
                </template>
                <template v-else>
                  <span class="fs2-price-sale">{{ item.salePrice }}₫</span>
                  <span v-if="item.discount > 0" class="fs2-price-old">{{ item.originalPrice }}₫</span>
                </template>
              </div>
            </div>
            <div class="fs2-progress-wrap">
              <div class="fs2-progress-track">
                <div class="fs2-progress-fill" :style="{ width: Math.max(item.soldBarPercent, 8) + '%' }">
                  <i class="bi bi-fire fs2-fire-icon"></i>
                </div>
              </div>
              <span class="fs2-sold-label">{{ item.daBan > 0 ? 'Đã bán ' + item.daBan : 'Hàng mới về' }}</span>
            </div>
          </router-link>
        </div>
        <div v-else class="fs2-empty">
          <i class="bi bi-inbox fs-1 d-block mb-2 opacity-25"></i>Chưa có sản phẩm flash sale
        </div>
      </div>
    </section>

    <!-- VIDEO + BANNER V2 -->
    <section class="container my-5 section-divider reveal px-2 px-md-3">
  <div class="vb2-grid">
        <div class="vb2-video-panel">
          <div class="vb2-video-label"><i class="bi bi-play-circle-fill me-2"></i>Giới thiệu HORECA VN</div>
          <div class="vb2-video-frame">
            <iframe width="100%" height="100%" :src="dynamicVideoUrl" title="HORECA VN Intro" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
        <div class="vb2-right">
          <div class="vb2-banner vb2-banner--top">
            <img :src="dynamicRightTop" alt="Banner chính" class="vb2-img" @error="$event.target.src = fallbackRightTop" />
            <div class="vb2-banner-overlay"><span class="vb2-banner-badge">Mới nhất</span></div>
          </div>
          <div class="vb2-bottom-row">
            <div class="vb2-banner vb2-banner--btm">
              <img :src="dynamicRightBtm1" alt="Sản phẩm 1" class="vb2-img" @error="$event.target.src = fallbackRightBtm1" />
              <div class="vb2-banner-overlay vb2-banner-overlay--dark"><span class="vb2-banner-label">Bộ sưu tập</span></div>
            </div>
            <div class="vb2-banner vb2-banner--btm">
              <img :src="dynamicRightBtm2" alt="Sản phẩm 2" class="vb2-img" @error="$event.target.src = fallbackRightBtm2" />
              <div class="vb2-banner-overlay vb2-banner-overlay--dark"><span class="vb2-banner-label">Hàng mới về</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BÁT CƠM -->
    <section class="container my-5 section-group section-divider reveal">
      <div class="product-section-header d-flex justify-content-between align-items-center mb-4">
        <div class="section-title-group">
          <h4 class="section-heading fw-bold mb-1">Bát Cơm</h4>
          <p class="text-muted small mb-0">Chất liệu sứ cao cấp, an toàn thực phẩm</p>
        </div>
        <router-link to="/san-pham/bat-com" class="btn-viewall">Xem tất cả <i class="bi bi-arrow-right ms-1"></i></router-link>
      </div>
      <div class="row g-3">
        <div class="col-lg-3 d-none d-lg-block reveal-item">
          <div class="banner-side rounded-4 h-100 shadow-sm" :style="{ backgroundImage: `url(${dynamicSideBatCom})` }">
            <div class="banner-overlay p-4 d-flex flex-column justify-content-end h-100">
              <span class="badge bg-warning text-dark w-auto mb-2">Best Seller</span>
              <h5 class="fw-bold text-white mb-0 text-shadow">BÁT CƠM</h5>
              <p class="text-white-50 small">Chất liệu sứ cao cấp</p>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="row g-3" v-if="batComLoading">
            <div class="col-md-3 col-6" v-for="n in 4" :key="n">
              <div class="skeleton-card rounded-4 p-3 bg-white h-100">
                <div class="bg-light rounded-3 mb-3" style="height: 140px;"></div>
                <div class="bg-light rounded mb-2" style="height: 14px;"></div>
                <div class="bg-light rounded mx-auto" style="height: 20px; width: 60%;"></div>
              </div>
            </div>
          </div>
          <div class="row g-3" v-else>
            <div class="col-md-3 col-6 reveal-item" v-for="p in batComProducts" :key="p.id">
              <div class="product-card-v2 bg-white rounded-4 shadow-sm h-100 overflow-hidden position-relative">
            
                <!-- MỚI -->
<router-link :to="`/san-pham/chi-tiet/${p.id}`" class="d-block product-img-box-v2 position-relative">
  <div v-if="p.discount > 0 && !p.lienHe" class="shopee-badge">-{{ p.discount }}%</div>
  <transition name="fade-img" mode="out-in">
    <img :key="p.image" :src="p.image" class="product-img-v2" :alt="p.name">
  </transition>
  <div class="quick-view-overlay"><span class="quick-view-btn"><i class="bi bi-eye me-1"></i>Xem nhanh</span></div>
</router-link>
                <div class="p-3 d-flex flex-column gap-1">
                  <router-link :to="`/san-pham/chi-tiet/${p.id}`" class="text-decoration-none">
                    <h6 class="product-name-v2">{{ p.name }}</h6>
                  </router-link>
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="rating-stars-v2">
                      <i v-for="n in 5" :key="n" :class="n <= Math.round(p.diemDanhGia || 0) ? 'bi bi-star-fill text-warning' : 'bi bi-star text-muted'" style="font-size: 11px;"></i>
                    </div>
                    <span class="sold-v2 text-muted"><i class="bi bi-bag-check me-1" style="font-size: 10px;"></i>Đã bán {{ p.daBan > 0 ? p.daBan : '—' }}</span>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mt-1">
                    <!-- Thay thế đoạn giá trong tất cả product-card-v2 -->
<template v-if="p.lienHe">
  <button class="btn btn-sm btn-success rounded-pill px-3 fw-bold d-flex align-items-center gap-1"
    style="font-size: 0.75rem;" @click.stop="openContact(p)">
    <i class="bi bi-telephone-fill"></i> Liên hệ
  </button>
</template>
<template v-else>
  <div class="d-flex flex-column">
    <span class="text-danger fw-bold fs-6">{{ p.price }}₫</span>
    <!-- Chỉ hiện gạch ngang khi discount > 0 VÀ oldPrice khác price -->
    <span v-if="p.discount > 0" class="text-muted text-decoration-line-through"
      style="font-size: 0.78rem; line-height: 1;">{{ p.oldPrice }}₫</span>
  </div>
  <button class="cart-btn-v2" @click.prevent="addToCart(p)" title="Thêm vào giỏ">
    <i class="bi bi-cart-plus"></i>
  </button>
</template>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 text-center text-muted py-4" v-if="batComProducts.length === 0">
              <i class="bi bi-inbox fs-1 d-block mb-2 opacity-25"></i>Chưa có sản phẩm trong danh mục này
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CỐC SỨ LONG PHƯƠNG -->
    <section class="container my-5 section-group section-divider reveal">
      <div class="product-section-header d-flex justify-content-between align-items-center mb-4">
        <div class="section-title-group">
          <h4 class="section-heading fw-bold mb-1">Cốc Sứ Long Phương</h4>
          <p class="text-muted small mb-0">Tinh hoa gốm sứ Việt Nam</p>
        </div>
        <router-link to="/san-pham/ly-coc" class="btn-viewall">Xem tất cả <i class="bi bi-arrow-right ms-1"></i></router-link>
      </div>
      <div class="row g-3">
        <div class="col-lg-9">
          <div class="row g-3" v-if="cocSuLoading">
            <div class="col-md-3 col-6" v-for="n in 4" :key="n">
              <div class="skeleton-card rounded-4 p-3 bg-white h-100">
                <div class="bg-light rounded-3 mb-3" style="height: 140px;"></div>
                <div class="bg-light rounded mb-2" style="height: 14px;"></div>
                <div class="bg-light rounded mx-auto" style="height: 20px; width: 60%;"></div>
              </div>
            </div>
          </div>
          <div class="row g-3" v-else>
            <div class="col-md-3 col-6 reveal-item" v-for="p in cocSuProducts" :key="p.id">
              <div class="product-card-v2 bg-white rounded-4 shadow-sm h-100 overflow-hidden position-relative">
            
                <!-- MỚI -->
<router-link :to="`/san-pham/chi-tiet/${p.id}`" class="d-block product-img-box-v2 position-relative">
  <div v-if="p.discount > 0 && !p.lienHe" class="shopee-badge">-{{ p.discount }}%</div>
  <transition name="fade-img" mode="out-in">
    <img :key="p.image" :src="p.image" class="product-img-v2" :alt="p.name">
  </transition>
  <div class="quick-view-overlay"><span class="quick-view-btn"><i class="bi bi-eye me-1"></i>Xem nhanh</span></div>
</router-link>
                <div class="p-3 d-flex flex-column gap-1">
                  <router-link :to="`/san-pham/chi-tiet/${p.id}`" class="text-decoration-none">
                    <h6 class="product-name-v2">{{ p.name }}</h6>
                  </router-link>
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="rating-stars-v2">
                      <i v-for="n in 5" :key="n" :class="n <= Math.round(p.diemDanhGia || 0) ? 'bi bi-star-fill text-warning' : 'bi bi-star text-muted'" style="font-size: 11px;"></i>
                    </div>
                    <span class="sold-v2 text-muted"><i class="bi bi-bag-check me-1" style="font-size: 10px;"></i>Đã bán {{ p.daBan > 0 ? p.daBan : '—' }}</span>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mt-1">
                    <template v-if="p.lienHe">
                      <button
                        class="btn btn-sm btn-success rounded-pill px-3 fw-bold d-flex align-items-center gap-1"
                        style="font-size: 0.75rem;"
                        @click.stop="openContact(p)">
                        <i class="bi bi-telephone-fill"></i> Liên hệ
                      </button>
                    </template>
                    <template v-else>
                      <div class="d-flex flex-column">
                        <span class="text-danger fw-bold fs-6">{{ p.price }}₫</span>
                        <span v-if="p.discount > 0" class="text-muted text-decoration-line-through" style="font-size: 0.78rem; line-height: 1;">{{ p.oldPrice }}₫</span>
                      </div>
                      <button class="cart-btn-v2" @click.prevent="addToCart(p)" title="Thêm vào giỏ"><i class="bi bi-cart-plus"></i></button>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 text-center text-muted py-4" v-if="cocSuProducts.length === 0">
              <i class="bi bi-inbox fs-1 d-block mb-2 opacity-25"></i>Chưa có sản phẩm trong danh mục này
            </div>
          </div>
        </div>
        <div class="col-lg-3 d-none d-lg-block reveal-item">
          <div class="banner-side rounded-4 h-100 shadow-sm" :style="{ backgroundImage: `url(${dynamicSideCocSu})` }">
            <div class="banner-overlay p-4 d-flex flex-column justify-content-end h-100 text-end">
              <h5 class="fw-bold text-white mb-0 text-shadow">CỐC SỨ</h5>
              <p class="text-white-50 small">Long Phương – Tinh hoa gốm sứ</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BỘ BÁT ĐĨA LONG PHƯƠNG -->
    <section class="container my-5 section-group section-divider reveal">
      <div class="product-section-header d-flex justify-content-between align-items-center mb-4">
        <div class="section-title-group">
          <h4 class="section-heading fw-bold mb-1">Bộ Bát Đĩa Long Phương</h4>
          <p class="text-muted small mb-0">Sang trọng, bền đẹp – Chuẩn xuất khẩu</p>
        </div>
        <router-link to="/san-pham/su-long-phuong" class="btn-viewall">Xem tất cả <i class="bi bi-arrow-right ms-1"></i></router-link>
      </div>
      <div class="row g-3">
        <div class="col-lg-3 d-none d-lg-block reveal-item">
          <div class="banner-side rounded-4 h-100 shadow-sm" :style="{ backgroundImage: `url(${dynamicSideBatDia})` }">
            <div class="banner-overlay p-4 d-flex flex-column justify-content-end h-100">
              <h5 class="fw-bold text-white mb-0 text-shadow">BỘ BÁT ĐĨA</h5>
              <p class="text-white-50 small">Long Phương – Sang trọng, bền đẹp</p>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="row g-3" v-if="boBatDiaLoading">
            <div class="col-md-3 col-6" v-for="n in 4" :key="n">
              <div class="skeleton-card rounded-4 p-3 bg-white h-100">
                <div class="bg-light rounded-3 mb-3" style="height: 140px;"></div>
                <div class="bg-light rounded mb-2" style="height: 14px;"></div>
                <div class="bg-light rounded mx-auto" style="height: 20px; width: 60%;"></div>
              </div>
            </div>
          </div>
          <div class="row g-3" v-else>
            <div class="col-md-3 col-6 reveal-item" v-for="p in boBatDiaProducts" :key="p.id">
              <div class="product-card-v2 bg-white rounded-4 shadow-sm h-100 overflow-hidden position-relative">
              
               <!-- MỚI -->
<router-link :to="`/san-pham/chi-tiet/${p.id}`" class="d-block product-img-box-v2 position-relative">
  <div v-if="p.discount > 0 && !p.lienHe" class="shopee-badge">-{{ p.discount }}%</div>
  <transition name="fade-img" mode="out-in">
    <img :key="p.image" :src="p.image" class="product-img-v2" :alt="p.name">
  </transition>
  <div class="quick-view-overlay"><span class="quick-view-btn"><i class="bi bi-eye me-1"></i>Xem nhanh</span></div>
</router-link>
                <div class="p-3 d-flex flex-column gap-1">
                  <router-link :to="`/san-pham/chi-tiet/${p.id}`" class="text-decoration-none">
                    <h6 class="product-name-v2">{{ p.name }}</h6>
                  </router-link>
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="rating-stars-v2">
                      <i v-for="n in 5" :key="n" :class="n <= Math.round(p.diemDanhGia || 0) ? 'bi bi-star-fill text-warning' : 'bi bi-star text-muted'" style="font-size: 11px;"></i>
                    </div>
                    <span class="sold-v2 text-muted"><i class="bi bi-bag-check me-1" style="font-size: 10px;"></i>Đã bán {{ p.daBan > 0 ? p.daBan : '—' }}</span>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mt-1">
                    <template v-if="p.lienHe">
                      <button
                        class="btn btn-sm btn-success rounded-pill px-3 fw-bold d-flex align-items-center gap-1"
                        style="font-size: 0.75rem;"
                        @click.stop="openContact(p)">
                        <i class="bi bi-telephone-fill"></i> Liên hệ
                      </button>
                    </template>
                    <template v-else>
                      <div class="d-flex flex-column">
                        <span class="text-danger fw-bold fs-6">{{ p.price }}₫</span>
                        <span v-if="p.discount > 0" class="text-muted text-decoration-line-through" style="font-size: 0.78rem; line-height: 1;">{{ p.oldPrice }}₫</span>
                      </div>
                      <button class="cart-btn-v2" @click.prevent="addToCart(p)" title="Thêm vào giỏ"><i class="bi bi-cart-plus"></i></button>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 text-center text-muted py-4" v-if="boBatDiaProducts.length === 0">
              <i class="bi bi-inbox fs-1 d-block mb-2 opacity-25"></i>Chưa có sản phẩm trong danh mục này
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- QUÀ TẶNG DOANH NGHIỆP -->
    <section class="container my-5 section-divider reveal">
      <div class="mb-4 rounded-4 overflow-hidden shadow-sm" v-if="dynamicBannerQuaTang">
        <img :src="dynamicBannerQuaTang" class="w-100 img-fluid" alt="Banner Quà Tặng Doanh Nghiệp" @error="$event.target.style.display='none'">
      </div>
      <div class="text-center mb-4">
        <h4 class="korean-title d-inline-block px-5 py-2 text-uppercase fw-bold shadow-sm">🎁 QUÀ TẶNG DOANH NGHIỆP HORECA VN</h4>
      </div>
      <div class="row g-3" v-if="giftLoading">
        <div class="col-lg-3 col-md-6" v-for="n in 4" :key="n">
          <div class="skeleton-card rounded-4 p-3 bg-white h-100">
            <div class="bg-light rounded-3 mb-3" style="height: 160px;"></div>
            <div class="bg-light rounded mb-2" style="height: 14px;"></div>
            <div class="bg-light rounded" style="height: 14px; width: 70%; margin: 0 auto;"></div>
          </div>
        </div>
      </div>
      <div class="row g-3" v-else>
        <div class="col-lg-3 col-6 reveal-item" v-for="p in giftProducts" :key="p.id">
          <div class="product-card-v2 product-card-gift-v2 bg-white rounded-4 shadow-sm h-100 overflow-hidden position-relative">
            
           <!-- MỚI -->
<router-link :to="`/san-pham/chi-tiet/${p.id}`" class="d-block product-img-box-v2 position-relative">
  <div v-if="p.discount > 0 && !p.lienHe" class="shopee-badge">-{{ p.discount }}%</div>
  <transition name="fade-img" mode="out-in">
    <img :key="p.image" :src="p.image" class="product-img-v2" :alt="p.name">
  </transition>
  <div class="quick-view-overlay"><span class="quick-view-btn"><i class="bi bi-eye me-1"></i>Xem nhanh</span></div>
</router-link>
            <div class="p-3 d-flex flex-column gap-1">
              <router-link :to="`/san-pham/chi-tiet/${p.id}`" class="text-decoration-none">
                <h6 class="product-name-v2">{{ p.name }}</h6>
              </router-link>
              <div class="d-flex align-items-center justify-content-between">
                <div class="rating-stars-v2">
                  <i v-for="n in 5" :key="n" :class="n <= Math.round(p.diemDanhGia || 0) ? 'bi bi-star-fill text-warning' : 'bi bi-star text-muted'" style="font-size: 11px;"></i>
                </div>
                <span class="sold-v2 text-muted"><i class="bi bi-bag-check me-1" style="font-size: 10px;"></i>Đã bán {{ p.daBan > 0 ? p.daBan : '—' }}</span>
              </div>
              <div class="d-flex align-items-center justify-content-between mt-1">
                <template v-if="p.lienHe">
                  <button
                    class="btn btn-sm btn-success rounded-pill px-3 fw-bold d-flex align-items-center gap-1"
                    style="font-size: 0.75rem;"
                    @click.stop="openContact(p)">
                    <i class="bi bi-telephone-fill"></i> Liên hệ
                  </button>
                </template>
                <template v-else>
                  <div class="d-flex flex-column">
                    <span class="text-danger fw-bold fs-6">{{ p.price }}₫</span>
                    <span v-if="p.discount > 0" class="text-muted text-decoration-line-through" style="font-size: 0.78rem; line-height: 1;">{{ p.oldPrice }}₫</span>
                  </div>
                  <button class="cart-btn-v2 cart-btn-gift" @click.prevent="addToCart(p)" title="Thêm vào giỏ"><i class="bi bi-bag-plus"></i></button>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-center text-muted py-4" v-if="giftProducts.length === 0">
          <i class="bi bi-inbox fs-1 d-block mb-2 opacity-25"></i>Chưa có sản phẩm trong danh mục này
        </div>
      </div>
      <div class="text-center mt-5 position-relative">
        <div class="line-center"></div>
        <router-link to="/san-pham/qua-tang" class="btn btn-horeca rounded-pill px-5 py-2 btn-more fw-bold text-uppercase shadow text-decoration-none">
          Xem thêm sản phẩm khác
        </router-link>
      </div>
    </section>

    <!-- CAM KẾT THƯƠNG HIỆU -->
    <section class="brand-promise-section py-5 my-4 reveal" style="background: linear-gradient(135deg, #6e1014 0%, #b31f24 50%, #6e1014 100%);">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold text-uppercase text-white mb-2">TẠI SAO CHỌN HORECA VN?</h2>
          <div class="mx-auto mt-2" style="width: 80px; height: 3px; background: #fff; border-radius: 2px; opacity: 0.6;"></div>
        </div>
        <div class="row g-4 text-center">
         <div class="col-lg-3 col-6 reveal-item">
  <div class="brand-item p-4 rounded-4 h-100">
              <div class="brand-icon mb-3"><i class="bi bi-award-fill text-warning" style="font-size: 3rem;"></i></div>
              <h5 class="fw-bold text-white mb-2">Thương Hiệu Uy Tín</h5>
              <p class="text-white-50 small mb-0">Hơn 10 năm kinh nghiệm cung ứng nguyên liệu và thiết bị F&B cho hệ thống Horeca</p>
            </div>
          </div>
         <div class="col-lg-3 col-6 reveal-item">
  <div class="brand-item p-4 rounded-4 h-100">
              <div class="brand-icon mb-3"><i class="bi bi-gem text-info" style="font-size: 3rem;"></i></div>
              <h5 class="fw-bold text-white mb-2">Chất Liệu Cao Cấp</h5>
              <p class="text-white-50 small mb-0">Nguyên liệu 100% tự nhiên, không tạp chất, đạt tiêu chuẩn an toàn thực phẩm quốc tế</p>
            </div>
          </div>
        <div class="col-lg-3 col-6 reveal-item">
  <div class="brand-item p-4 rounded-4 h-100">
              <div class="brand-icon mb-3"><i class="bi bi-gift-fill" style="font-size: 3rem; color: #ffcdd2;"></i></div>
              <h5 class="fw-bold text-white mb-2">Giải Pháp Toàn Diện</h5>
              <p class="text-white-50 small mb-0">Cung cấp trọn gói từ nguyên liệu, thiết bị đến gia vị cho khách sạn, nhà hàng, cafe</p>
            </div>
          </div>
  <div class="col-lg-3 col-6 reveal-item">
  <div class="brand-item p-4 rounded-4 h-100">
              <div class="brand-icon mb-3"><i class="bi bi-patch-check-fill text-success" style="font-size: 3rem;"></i></div>
              <h5 class="fw-bold text-white mb-2">Đạt Chuẩn Xuất Khẩu</h5>
              <p class="text-white-50 small mb-0">Sản phẩm đạt tiêu chuẩn EU, Nhật Bản – phục vụ hệ thống khách sạn 3–5 sao</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Review Khách Hàng -->
    <!-- Review Khách Hàng -->
<section class="container my-5 pb-5 reveal">
  <div class="text-center mb-5">
    <h3 class="fw-bold text-uppercase" style="color: #4a4a4a;">KHÁCH HÀNG NÓI GÌ VỀ HORECA VN?</h3>
    <div class="divider-small mx-auto bg-danger mt-2"></div>
  </div>

  <!-- Desktop: Bootstrap carousel cũ (2 cột) -->
  <div id="reviewCarousel" class="carousel slide review-carousel d-none d-md-block" data-bs-ride="carousel" data-bs-interval="5000">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="row g-4">
          <div class="col-md-6">
            <div class="review-card p-4 bg-white border rounded-4 shadow-sm h-100 position-relative">
              <div class="d-flex align-items-center mb-3">
                <img src="https://i.pravatar.cc/150?u=trang" class="rounded-circle me-3 border border-2 border-danger p-1" width="65" height="65" alt="Avatar">
                <div>
                  <h6 class="fw-bold mb-0 text-horeca">Chị Trang Nguyễn</h6>
                  <small class="text-muted">Bếp trưởng – Khách sạn Mường Thanh</small>
                  <div class="text-warning small"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
                </div>
              </div>
              <p class="mb-0 text-secondary review-content fst-italic">"Gia vị và nguyên liệu của HORECA VN rất ổn định về chất lượng, mùi thơm tự nhiên không hóa chất. Giao hàng đúng hẹn, đóng gói cẩn thận – nhà bếp chúng tôi đã sử dụng hơn 2 năm và rất hài lòng!"</p>
              <i class="bi bi-quote quote-icon opacity-25"></i>
            </div>
          </div>
          <div class="col-md-6">
            <div class="review-card p-4 bg-white border rounded-4 shadow-sm h-100 position-relative">
              <div class="d-flex align-items-center mb-3">
                <img src="https://i.pravatar.cc/150?u=nhung" class="rounded-circle me-3 border border-2 border-danger p-1" width="65" height="65" alt="Avatar">
                <div>
                  <h6 class="fw-bold mb-0 text-horeca">Anh Minh Tuấn</h6>
                  <small class="text-muted">Giám đốc F&B – Chuỗi nhà hàng Hà Nội</small>
                  <div class="text-warning small"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
                </div>
              </div>
              <p class="mb-0 text-secondary review-content fst-italic">"Đặt combo thiết bị bếp và nguyên liệu pha chế cho 3 chi nhánh, HORECA VN tư vấn rất tận tâm. Giá cạnh tranh, sản phẩm đúng chuẩn, sẽ tiếp tục là đối tác lâu dài!"</p>
              <i class="bi bi-quote quote-icon opacity-25"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="row g-4">
          <div class="col-md-6">
            <div class="review-card p-4 bg-white border rounded-4 shadow-sm h-100 position-relative">
              <div class="d-flex align-items-center mb-3">
                <img src="https://i.pravatar.cc/150?u=hoa" class="rounded-circle me-3 border border-2 border-danger p-1" width="65" height="65" alt="Avatar">
                <div>
                  <h6 class="fw-bold mb-0 text-horeca">Chị Thu Hoa</h6>
                  <small class="text-muted">Chủ Cafe – Đà Nẵng</small>
                  <div class="text-warning small"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i></div>
                </div>
              </div>
              <p class="mb-0 text-secondary review-content fst-italic">"Nguyên liệu pha chế của HORECA VN đa dạng, chất lượng vượt trội so với nhập lẻ bên ngoài."</p>
              <i class="bi bi-quote quote-icon opacity-25"></i>
            </div>
          </div>
          <div class="col-md-6">
            <div class="review-card p-4 bg-white border rounded-4 shadow-sm h-100 position-relative">
              <div class="d-flex align-items-center mb-3">
                <img src="https://i.pravatar.cc/150?u=long" class="rounded-circle me-3 border border-2 border-danger p-1" width="65" height="65" alt="Avatar">
                <div>
                  <h6 class="fw-bold mb-0 text-horeca">Anh Quốc Long</h6>
                  <small class="text-muted">Quản lý bếp – Resort 4 sao Cần Thơ</small>
                  <div class="text-warning small"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
                </div>
              </div>
              <p class="mb-0 text-secondary review-content fst-italic">"Resort chúng tôi đặt hàng định kỳ hàng tháng, không lần nào thất vọng. HORECA VN là đối tác tin cậy nhất!"</p>
              <i class="bi bi-quote quote-icon opacity-25"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev w-auto review-carousel-prev" type="button" data-bs-target="#reviewCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon bg-horeca rounded-circle p-3" aria-hidden="true"></span>
    </button>
    <button class="carousel-control-next w-auto review-carousel-next" type="button" data-bs-target="#reviewCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon bg-horeca rounded-circle p-3" aria-hidden="true"></span>
    </button>
  </div>

  <!-- Mobile: carousel dọc 2 card trên/dưới, tự chuyển -->
  <div class="d-md-none review-mobile-carousel" ref="reviewMobileRef">
    <!-- Slide 1: card 1 + card 2 -->
    <div class="review-mobile-slide" :class="{ active: reviewMobileIdx === 0 }">
      <div class="review-card p-3 bg-white border rounded-4 shadow-sm mb-3 position-relative">
        <div class="d-flex align-items-center mb-2">
          <img src="https://i.pravatar.cc/150?u=trang" class="rounded-circle me-3 border border-2 border-danger p-1" width="50" height="50" alt="Avatar">
          <div>
            <h6 class="fw-bold mb-0 text-horeca" style="font-size:0.9rem;">Chị Trang Nguyễn</h6>
            <small class="text-muted" style="font-size:0.72rem;">Bếp trưởng – Khách sạn Mường Thanh</small>
            <div class="text-warning" style="font-size:0.75rem;"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
          </div>
        </div>
        <p class="mb-0 text-secondary fst-italic" style="font-size:0.8rem;line-height:1.5;">"Gia vị và nguyên liệu của HORECA VN rất ổn định về chất lượng. Giao hàng đúng hẹn, đóng gói cẩn thận!"</p>
      </div>
      <div class="review-card p-3 bg-white border rounded-4 shadow-sm position-relative">
        <div class="d-flex align-items-center mb-2">
          <img src="https://i.pravatar.cc/150?u=nhung" class="rounded-circle me-3 border border-2 border-danger p-1" width="50" height="50" alt="Avatar">
          <div>
            <h6 class="fw-bold mb-0 text-horeca" style="font-size:0.9rem;">Anh Minh Tuấn</h6>
            <small class="text-muted" style="font-size:0.72rem;">Giám đốc F&B – Chuỗi nhà hàng Hà Nội</small>
            <div class="text-warning" style="font-size:0.75rem;"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
          </div>
        </div>
        <p class="mb-0 text-secondary fst-italic" style="font-size:0.8rem;line-height:1.5;">"Đặt combo thiết bị bếp và nguyên liệu pha chế cho 3 chi nhánh, HORECA VN tư vấn rất tận tâm. Sẽ tiếp tục là đối tác lâu dài!"</p>
      </div>
    </div>
    <!-- Slide 2: card 3 + card 4 -->
    <div class="review-mobile-slide" :class="{ active: reviewMobileIdx === 1 }">
      <div class="review-card p-3 bg-white border rounded-4 shadow-sm mb-3 position-relative">
        <div class="d-flex align-items-center mb-2">
          <img src="https://i.pravatar.cc/150?u=hoa" class="rounded-circle me-3 border border-2 border-danger p-1" width="50" height="50" alt="Avatar">
          <div>
            <h6 class="fw-bold mb-0 text-horeca" style="font-size:0.9rem;">Chị Thu Hoa</h6>
            <small class="text-muted" style="font-size:0.72rem;">Chủ Cafe – Đà Nẵng</small>
            <div class="text-warning" style="font-size:0.75rem;"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i></div>
          </div>
        </div>
        <p class="mb-0 text-secondary fst-italic" style="font-size:0.8rem;line-height:1.5;">"Nguyên liệu pha chế của HORECA VN đa dạng, chất lượng vượt trội so với nhập lẻ bên ngoài."</p>
      </div>
      <div class="review-card p-3 bg-white border rounded-4 shadow-sm position-relative">
        <div class="d-flex align-items-center mb-2">
          <img src="https://i.pravatar.cc/150?u=long" class="rounded-circle me-3 border border-2 border-danger p-1" width="50" height="50" alt="Avatar">
          <div>
            <h6 class="fw-bold mb-0 text-horeca" style="font-size:0.9rem;">Anh Quốc Long</h6>
            <small class="text-muted" style="font-size:0.72rem;">Quản lý bếp – Resort 4 sao Cần Thơ</small>
            <div class="text-warning" style="font-size:0.75rem;"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
          </div>
        </div>
        <p class="mb-0 text-secondary fst-italic" style="font-size:0.8rem;line-height:1.5;">"Resort chúng tôi đặt hàng định kỳ hàng tháng, không lần nào thất vọng. HORECA VN là đối tác tin cậy nhất!"</p>
      </div>
    </div>
    <!-- Dots -->
    <div class="review-mobile-dots">
      <span class="review-mobile-dot" :class="{ active: reviewMobileIdx === 0 }" @click="reviewMobileIdx = 0"></span>
      <span class="review-mobile-dot" :class="{ active: reviewMobileIdx === 1 }" @click="reviewMobileIdx = 1"></span>
    </div>
  </div>
</section>

    <!-- Tin Tức -->
   <!-- Tin Tức -->
<section class="horeca-news-section py-5 bg-light reveal">
  <div class="container px-lg-5">
    <div class="text-center mb-5">
      <h2 class="display-6 fw-bold text-uppercase position-relative d-inline-block title-with-line pb-2" style="color:#b31f24;">Tin Tức HORECA VN</h2>
      <p class="text-secondary mt-3">Cập nhật những tin tức và sự kiện mới nhất</p>
    </div>
    <div class="row g-4 justify-content-center">
      <div class="col-md-3 col-6 reveal-item" v-for="news in recentNews" :key="news.id">
        <article class="card h-100 border-0 shadow-sm rounded-4 hover-up transition-all bg-white news-card-custom">
          <div class="card-img-wrapper overflow-hidden position-relative" style="height: 180px;">
            <router-link :to="{ name: 'news-detail', params: { id: news.id } }">
              <div class="img-overlay-light"></div>
              <img :src="getMainImage(news.anhDaiDien || news.hinhAnh || news.duongDanAnh || news.image || news.thumbnail || '')" class="card-img-top w-100 h-100 object-fit-cover transition-zoom" :alt="news.tieuDe" @error="$event.target.src='https://placehold.co/400x400?text=Tin+Tức+Horeca'">
            </router-link>
            <span class="badge bg-danger position-absolute top-0 end-0 m-2 px-2 py-1 rounded-pill shadow-sm" style="font-size:0.65rem;">Mới</span>
          </div>
          <div class="card-body p-3">
            <div class="small text-muted mb-2 fw-medium" style="font-size:0.72rem;">
              <i class="bi bi-calendar-event me-1 text-danger"></i> {{ formatDateTime(news.ngayTao) }}
            </div>
            <router-link :to="{ name: 'news-detail', params: { id: news.id } }" class="text-decoration-none">
              <h6 class="card-title fw-bold text-dark hover-text-horeca cursor-pointer line-clamp-2 mb-2 lh-base" style="font-size:0.85rem;">{{ news.tieuDe }}</h6>
            </router-link>
            <p class="card-text text-secondary line-clamp-2 mb-0 news-desc-text" style="font-size:0.78rem;">{{ news.moTaNgan }}</p>
          </div>
          <div class="card-footer bg-transparent border-top-0 px-3 pb-3 pt-0">
            <router-link :to="{ name: 'news-detail', params: { id: news.id } }" class="text-decoration-none text-danger fw-bold d-inline-flex align-items-center readmore-link" style="font-size:0.78rem;">
              Xem chi tiết <i class="bi bi-arrow-right ms-1"></i>
            </router-link>
          </div>
        </article>
      </div>
    </div>
  </div>
</section>

   <!-- Toast -->
<div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 99999;">
      <div id="cartToast" class="toast align-items-center border-0 shadow-lg" role="alert"
           :class="toastType === 'success' ? 'bg-success text-white' : 'bg-danger text-white'"
           style="min-width: 280px; border-radius: 12px;">
        <div class="d-flex">
          <div class="toast-body fw-semibold d-flex align-items-center gap-2">
            <i :class="toastType === 'success' ? 'bi bi-bag-check-fill' : 'bi bi-exclamation-circle-fill'" style="font-size: 1.2rem;"></i>
            {{ toastMessage }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="hideToast"></button>
        </div>
      </div>
    </div>

    <!-- POPUP CHỌN BIẾN THỂ -->
    <Teleport to="body">
      <div v-if="variantModal.show" class="variant-modal-overlay" @click.self="variantModal.show = false">
        <div class="variant-modal">
          <div class="variant-modal-header">
            <img :src="variantModal.product?.image" class="variant-modal-img">
            <div class="variant-modal-info">
              <div class="variant-modal-name">{{ variantModal.product?.name }}</div>
             <div class="variant-modal-price">
  <span class="text-danger fw-bold fs-5">
    {{ selectedVariant ? formatPrice(selectedVariant.giaBan) : formatPrice(variantModal.product?.priceRaw) }}₫
  </span>
  <!-- Thêm dòng này -->
  <span v-if="selectedVariant?.flashPercent > 0"
    class="text-muted text-decoration-line-through ms-2"
    style="font-size:0.85rem;">
    {{ formatPrice(selectedVariant.giaBanGoc) }}₫
  </span>
  <span v-if="selectedVariant?.flashPercent > 0"
    class="badge bg-danger ms-2"
    style="font-size:0.7rem;">
    🔥 -{{ selectedVariant.flashPercent }}%
  </span>
</div>
              <div class="text-muted small">Kho: {{ selectedVariant?.tonKho ?? variantModal.product?.tonKho }}</div>
            </div>
          </div>
          <div class="variant-modal-body">
            <div v-if="variantColors.length > 0" class="mb-3">
              <div class="small fw-bold text-muted mb-2">Màu sắc</div>
              <div class="d-flex flex-wrap gap-2">
                <button v-for="color in variantColors" :key="color"
                  @click="selectColor(color)"
                  :class="['variant-btn', { active: selectedColor === color }]">
                  <span v-if="getHexByColor(color)" class="color-dot" :style="{ background: getHexByColor(color) }"></span>
                  {{ color }}
                </button>
              </div>
            </div>
            <div v-if="variantSizes.length > 0" class="mb-3">
              <div class="small fw-bold text-muted mb-2">Kích thước</div>
              <div class="d-flex flex-wrap gap-2">
                <button v-for="size in variantSizes" :key="size"
                  @click="selectSize(size)"
                  :class="['variant-btn', { active: selectedSize === size, disabled: !isSizeAvailable(size) }]"
                  :disabled="!isSizeAvailable(size)">
                  {{ size }}
                </button>
              </div>
            </div>
            <div class="mb-3">
              <div class="small fw-bold text-muted mb-2">Số lượng</div>
              <div class="qty-control d-flex align-items-center">
                <button @click="variantModal.qty = Math.max(1, variantModal.qty - 1)" class="qty-btn">−</button>
                <input type="number" v-model.number="variantModal.qty" min="1" :max="selectedVariant?.tonKho ?? 99" class="qty-input">
                <button @click="variantModal.qty++" class="qty-btn">+</button>
              </div>
            </div>
          </div>
          <div class="variant-modal-footer">
            <button @click="variantModal.show = false" class="btn btn-outline-secondary flex-1">Hủy</button>
            <button @click="confirmAddToCart" :disabled="!selectedVariant || isAddingToCart" class="btn btn-horeca flex-1 fw-bold">
              <span v-if="isAddingToCart"><span class="spinner-border spinner-border-sm me-1"></span>Đang thêm...</span>
              <span v-else><i class="bi bi-cart-plus me-1"></i>Thêm vào giỏ</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- CONTACT POPUP -->
    <ContactPopup
      :show="contactPopup.show"
      :phone="contactPopup.phone"
      :zalo="contactPopup.zalo"
      @close="contactPopup.show = false"
    />
  </div>
</template>
 
<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import axios from 'axios';
import newsService from '@/services/newsService';
import { bannerService } from '@/services/bannerService';
import { cartState } from '@/services/cartStore';
import ContactPopup from '@/components/ContactPopup.vue';
import _fallbackBatCom    from '@/assets/images/batcom.png';
import _fallbackCocSu     from '@/assets/images/cocsu.png';
import _fallbackBatDia    from '@/assets/images/batdia.png';
import _fallbackQuaTang   from '@/assets/images/quatangdoanhnghiep.png';
import _fallbackRightTop  from '@/assets/images/banner5.png';
import _fallbackRightBtm1 from '@/assets/images/sanpham1.png';
import _fallbackRightBtm2 from '@/assets/images/sanpham2.png';
import { API_BASE } from '@/config/api'
const fallbackRightTop  = _fallbackRightTop;
const fallbackRightBtm1 = _fallbackRightBtm1;
const fallbackRightBtm2 = _fallbackRightBtm2;

const dynamicVideoUrl      = ref('https://www.youtube.com/embed/f2G6vvcA-Yk?si=lbTXx9BUwbMQQeo3');
const dynamicRightTop      = ref(_fallbackRightTop);
const dynamicRightBtm1     = ref(_fallbackRightBtm1);
const dynamicRightBtm2     = ref(_fallbackRightBtm2);
const dynamicSideBatCom    = ref(_fallbackBatCom);
const dynamicSideCocSu     = ref(_fallbackCocSu);
const dynamicSideBatDia    = ref(_fallbackBatDia);
const dynamicBannerQuaTang = ref(_fallbackQuaTang);
const slideDuration        = 5000;
const currentIndex         = ref(0);
const isTransitioning      = ref(false);
let   carouselTimer        = null;
let   progressTimer        = null;
const progressWidth        = ref(0);
const homeBanners          = ref([]);
const recentNews           = ref([]);
const horecaCategories     = ref([]);
const flashSaleProducts    = ref([]);
const flashSaleLoading     = ref(true);
const batComProducts       = ref([]);
const batComLoading        = ref(true);
const cocSuProducts        = ref([]);
const cocSuLoading         = ref(true);
const boBatDiaProducts     = ref([]);
const boBatDiaLoading      = ref(true);
const giftProducts         = ref([]);
const giftLoading          = ref(true);
const countdownHours       = ref('02');
const countdownMinutes     = ref('15');
const countdownSeconds     = ref('45');
const toastMessage         = ref('');
const toastType            = ref('success');
let toastTimeout           = null;
let countdownInterval      = null;
let imageRotationInterval  = null;

const contactPopup = ref({ show: false, phone: '', zalo: '' });
const openContact = (product) => {
  contactPopup.value = {
    show: true,
    phone: product.soDienThoai || '',
    zalo: product.zaloLink || '',
  };
};

// ── VARIANT MODAL ──
const variantModal   = reactive({ show: false, product: null, qty: 1 })
const selectedColor  = ref(null)
const selectedSize   = ref(null)
const isAddingToCart = ref(false)

const variantColors = computed(() => {
  if (!variantModal.product?._chiTietSanPhams) return []
  return [...new Set(
    variantModal.product._chiTietSanPhams
      .filter(v => v.mauSac && v.mauSac.trim() && v.trangThai)
      .map(v => v.mauSac)
  )]
})

const variantSizes = computed(() => {
  if (!variantModal.product?._chiTietSanPhams) return []
  return [...new Set(
    variantModal.product._chiTietSanPhams
      .filter(v => v.kichThuoc && v.kichThuoc.trim() && v.trangThai)
      .map(v => v.kichThuoc)
  )]
})

const selectedVariant = computed(() => {
  if (!variantModal.product?._chiTietSanPhams) return null
  return variantModal.product._chiTietSanPhams.find(v => {
    const matchColor = !variantColors.value.length || v.mauSac === selectedColor.value
    const matchSize  = !variantSizes.value.length  || v.kichThuoc === selectedSize.value
    return matchColor && matchSize && v.trangThai
  }) || null
})

const getHexByColor = (color) =>
  variantModal.product?._chiTietSanPhams?.find(v => v.mauSac === color)?.mauSacHex || null

const isSizeAvailable = (size) => {
  if (!selectedColor.value && variantColors.value.length > 0) return true
  return variantModal.product?._chiTietSanPhams?.some(v =>
    v.kichThuoc === size && v.trangThai &&
    (!variantColors.value.length || v.mauSac === selectedColor.value)
  )
}

const selectColor = (color) => {
  selectedColor.value = color
  if (selectedSize.value && !isSizeAvailable(selectedSize.value)) selectedSize.value = null
}
const selectSize = (size) => { selectedSize.value = size }

const confirmAddToCart = async () => {
  if (!selectedVariant.value) return
  isAddingToCart.value = true
  const token = localStorage.getItem('auth_token') || localStorage.getItem('token')
  try {
    await axios.post(`${API_BASE}/api/v1/cart/add`, {
      nguoiDungId: localStorage.getItem('user_id') || 2,
      chiTietSanPhamId: selectedVariant.value.id,
      soLuong: variantModal.qty,
      giaHienTai: selectedVariant.value.giaBan,
    }, { headers: { Authorization: `Bearer ${token}` } })
    window.dispatchEvent(new Event('cart-updated'))
    showToast(`Đã thêm "${variantModal.product.name}" vào giỏ hàng!`, 'success')
    variantModal.show = false
  } catch (e) {
    showToast('Lỗi: ' + (e.response?.data?.message || 'Không thể thêm vào giỏ'), 'error')
  } finally {
    isAddingToCart.value = false
  }
}

// ── SCROLL REVEAL ──
let revealObserver = null;
const createObserver = () => new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

const observeElements = () => {
  if (!revealObserver) revealObserver = createObserver();
  document.querySelectorAll('.reveal:not(.visible), .reveal-item:not(.visible)').forEach(el => revealObserver.observe(el));
};
const reObserve = () => nextTick(() => setTimeout(observeElements, 50));
watch(flashSaleProducts, reObserve); watch(batComProducts, reObserve); watch(cocSuProducts, reObserve);
watch(boBatDiaProducts, reObserve); watch(giftProducts, reObserve); watch(recentNews, reObserve); watch(horecaCategories, reObserve);

// ── CAROUSEL ──
const goToSlide = (index) => {
  if (homeBanners.value.length === 0) return;
  isTransitioning.value = true; progressWidth.value = 0;
  setTimeout(() => { currentIndex.value = index; isTransitioning.value = false; startProgress(); }, 30);
};
const nextSlide = () => goToSlide((currentIndex.value + 1) % homeBanners.value.length);
const startProgress = () => {
  clearTimeout(progressTimer); progressWidth.value = 0;
  setTimeout(() => { progressWidth.value = 100; }, 30);
  progressTimer = setTimeout(nextSlide, slideDuration);
};
const startCarousel = () => { if (homeBanners.value.length <= 1) return; startProgress(); };
const stopCarousel  = () => { clearTimeout(carouselTimer); clearTimeout(progressTimer); };

// ── TOAST ──
const showToast = (message, type = 'success') => {
  toastMessage.value = message; toastType.value = type;
  const el = document.getElementById('cartToast');
  if (el) { el.classList.add('show'); if (toastTimeout) clearTimeout(toastTimeout); toastTimeout = setTimeout(() => el.classList.remove('show'), 3000); }
};
const hideToast = () => document.getElementById('cartToast')?.classList.remove('show');

// ── HELPERS ──
const createSlug = (text) => {
  if (!text) return '';
  return text.toString().toLowerCase()
    .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ặ|ẵ|â|ấ|ầ|ẩ|ậ|ẫ/g, 'a').replace(/é|è|ẻ|ẹ|ẽ|ê|ế|ề|ể|ệ|ễ/g, 'e')
    .replace(/i|í|ì|ỉ|ị|ĩ/g, 'i').replace(/ó|ò|ỏ|ọ|õ|ô|ố|ồ|ổ|ộ|ỗ|ơ|ớ|ờ|ở|ợ|ỡ/g, 'o')
    .replace(/ú|ù|ủ|ụ|ũ|ư|ứ|ừ|ử|ự|ữ/g, 'u').replace(/ý|ỳ|ỷ|ỵ|ỹ/g, 'y').replace(/đ/g, 'd')
    .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
};

const formatPrice = (price) => {
  if (!price && price !== 0) return '0';
  return Number(price).toLocaleString('vi-VN');
};

const formatDateTime = (dateString) => { if (!dateString) return 'N/A'; return dateString.substring(0, 10); };

const getAllImages = (imgData) => {
  if (!imgData || imgData === 'null' || imgData === 'undefined') return ['https://placehold.co/400x400?text=No+Image'];
  let rawImages = [];
  if (Array.isArray(imgData)) {
    rawImages = imgData.map(img => typeof img === 'object' ? (img.url || img.duongDan || img.hinhAnh || img.name || '') : img);
  } else if (typeof imgData === 'string') {
    let cleanImg = imgData.trim().replace(/^["']|["']$/g, '').trim();
    if (cleanImg.startsWith('data:image')) { cleanImg = cleanImg.replace(/\s+/g, ''); rawImages = [cleanImg]; }
    else if (cleanImg.startsWith('[') && cleanImg.endsWith(']')) { try { rawImages = JSON.parse(cleanImg); } catch { rawImages = [cleanImg]; } }
    else { rawImages = cleanImg.split('|||').map(i => i.split(',')).flat().map(i => i.trim()); }
  }
  const formatted = rawImages.filter(img => img && typeof img === 'string').map(img => {
    if (img.startsWith('http') || img.startsWith('data:image')) return img;
    if (img.startsWith('uploads/')) return `${API_BASE}/${img}`;
    if (img.startsWith('/')) return `${API_BASE}${img}`;
    return `${API_BASE}/uploads/${img}`;
  });
  return formatted.length > 0 ? formatted : ['https://placehold.co/400x400?text=No+Image'];
};
const getMainImage = (imgData) => getAllImages(imgData)[0];
// Sau khi fetch xong tất cả products, apply flash sale price nếu sản phẩm đang flash
const applyFlashSalePrices = () => {
  if (flashSaleProducts.value.length === 0) return;

  const flashMap = new Map(
    flashSaleProducts.value
      .filter(f => f.chiTietId)
      .map(f => [f.chiTietId, f])
  );

  [batComProducts, cocSuProducts, boBatDiaProducts, giftProducts].forEach(listRef => {
    listRef.value = listRef.value.map(p => {
      const flashItem = p.chiTietId ? flashMap.get(p.chiTietId) : null;
      // ← Phải khớp cả product ID lẫn chiTietId
      if (flashItem && flashItem.id === p.id && flashItem.discount > 0) {
        // Sản phẩm này đang flash sale → đồng bộ giá
        return {
          ...p,
          discount:      flashItem.discount,
          price:         flashItem.salePrice,
          priceRaw:      flashItem.priceRaw,
          oldPrice:      flashItem.originalPrice,
          salePrice:     flashItem.salePrice,
          originalPrice: flashItem.originalPrice,
        };
      }
      return p; // Không flash → giữ nguyên giá gốc
    });
  });
};
const mapProduct = (p, flashPercent = null, flashChiTietId = null) => {
  const name = p.tenSanPham || p.name || 'Sản phẩm';

  let giaBan = 0;

  if (flashChiTietId && p.chiTietSanPhams?.length) {
    const matched = p.chiTietSanPhams.find(ct => ct.id === Number(flashChiTietId));
    giaBan = matched?.giaBan || 0;
  }

  if (!giaBan) {
    giaBan = p.giaBan
      || p.chiTietSanPhams?.[0]?.giaBan
      || p.gia
      || 0;
  }

  // ── Chỉ giảm giá khi là flash sale, còn lại giữ nguyên giá gốc ──
  let discount      = 0;
  let finalPriceRaw = giaBan;
  let oldPriceRaw   = giaBan;

  if (flashPercent > 0) {
    discount      = flashPercent;
    finalPriceRaw = Math.round(giaBan * (1 - flashPercent / 100));
    oldPriceRaw   = giaBan;
  }

  const daBan = p.daBan || p.soLuongDaBan || 0;
  const soldBarPercent = daBan > 0
    ? Math.min(Math.round((daBan / (daBan + 10)) * 100), 95) : 0;

  const imageField = p.anhChinh || p.image || p.hinhAnh || '';
  const imagesArray = getAllImages(
    p.danhSachAnh?.length ? p.danhSachAnh : imageField
  );

  const chiTietId = flashChiTietId
    ? Number(flashChiTietId)
    : (p.chiTietId || p.chiTietSanPhams?.[0]?.id || null);

  return {
    id:            p.id,
    chiTietId,
    name,
    discount,
    price:         formatPrice(finalPriceRaw),
    priceRaw:      finalPriceRaw,
    oldPrice:      formatPrice(oldPriceRaw),
    salePrice:     formatPrice(finalPriceRaw),
    originalPrice: formatPrice(oldPriceRaw),
    daBan,
    diemDanhGia:   p.diemDanhGia || 0,
    soldBarPercent,
    image:         imagesArray[0],
    images:        imagesArray,
    currentImgIdx: 0,
    tonKho:        p.tonKho || 99,
    lienHe:        p.lienHe      || false,
    soDienThoai:   p.soDienThoai || '',
    zaloLink:      p.zaloLink    || '',
  };
};
// ── ADD TO CART ──
const addToCart = async (product) => {
  const token = localStorage.getItem('auth_token') || localStorage.getItem('token')
  if (!token) { showToast('Vui lòng đăng nhập để thêm vào giỏ hàng!', 'error'); return }
  try {
    const [detailRes, flashRes] = await Promise.allSettled([
      axios.get(`${API_BASE}/api/products/${product.id}`),
      axios.get(`${API_BASE}/api/khuyen-mai-flash`)
    ])

    const detail = detailRes.status === 'fulfilled' ? detailRes.value.data : {}
    const variants = detail.chiTietSanPhams || []

    // Build flash map: chiTietSanPhamId → phanTramGiamGia
    const flashMap = new Map()
    if (flashRes.status === 'fulfilled') {
      ;(flashRes.value.data || [])
        .filter(f => f.trangThaiHienThi === 'Đang diễn ra')
        .forEach(f => flashMap.set(Number(f.chiTietSanPhamId), f.phanTramGiamGia || 0))
    }

    // Apply flash sale vào từng variant
    const variantsWithFlash = variants.map(v => {
      const flashPercent = flashMap.get(Number(v.id)) || 0
      if (flashPercent > 0) {
        return {
          ...v,
          giaBanGoc: v.giaBan,                                          // giữ giá gốc
          giaBan: Math.round(v.giaBan * (1 - flashPercent / 100)),      // giá sau flash
          flashPercent,
        }
      }
      return v
    })

    const hasRealVariants = variantsWithFlash.some(v =>
      (v.mauSac && v.mauSac.trim()) || (v.kichThuoc && v.kichThuoc.trim())
    )

    if (!hasRealVariants || variantsWithFlash.length <= 1) {
      const v = variantsWithFlash[0]
      if (!v) { showToast('Sản phẩm không có thông tin biến thể!', 'error'); return }
      await axios.post(`${API_BASE}/api/v1/cart/add`, {
        nguoiDungId: localStorage.getItem('user_id') || 2,
        chiTietSanPhamId: v.id,
        soLuong: 1,
        giaHienTai: v.giaBan,   // đã là giá flash nếu có
      }, { headers: { Authorization: `Bearer ${token}` } })
      window.dispatchEvent(new Event('cart-updated'))
      showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success')
      return
    }

    variantModal.product = { ...product, _chiTietSanPhams: variantsWithFlash }
    variantModal.qty     = 1
    selectedColor.value  = null
    selectedSize.value   = null
    variantModal.show    = true
  } catch (e) {
    showToast('Lỗi: ' + (e.response?.data?.message || 'Không thể tải sản phẩm'), 'error')
  }
}

const startImageRotation = () => {
  imageRotationInterval = setInterval(() => {
    [flashSaleProducts, batComProducts, cocSuProducts, boBatDiaProducts, giftProducts].forEach(listRef => {
      listRef.value?.forEach(p => {
        if (p.images?.length > 1) { p.currentImgIdx = (p.currentImgIdx + 1) % p.images.length; p.image = p.images[p.currentImgIdx]; }
      });
    });
  }, 4000);
};

const fetchSectionBanners = async () => {
  const MAP = {
    HOME_VIDEO:      (b) => { dynamicVideoUrl.value     = b.lienKet      || dynamicVideoUrl.value; },
    HOME_RIGHT_TOP:  (b) => { dynamicRightTop.value     = b.duongDanAnh  || dynamicRightTop.value; },
    HOME_RIGHT_BTM1: (b) => { dynamicRightBtm1.value    = b.duongDanAnh  || dynamicRightBtm1.value; },
    HOME_RIGHT_BTM2: (b) => { dynamicRightBtm2.value    = b.duongDanAnh  || dynamicRightBtm2.value; },
    SIDE_BAT_COM:    (b) => { dynamicSideBatCom.value   = b.duongDanAnh  || dynamicSideBatCom.value; },
    SIDE_COC_SU:     (b) => { dynamicSideCocSu.value    = b.duongDanAnh  || dynamicSideCocSu.value; },
    SIDE_BAT_DIA:    (b) => { dynamicSideBatDia.value   = b.duongDanAnh  || dynamicSideBatDia.value; },
    BANNER_QUA_TANG: (b) => { dynamicBannerQuaTang.value = b.duongDanAnh || dynamicBannerQuaTang.value; },
  };
  await Promise.allSettled(Object.keys(MAP).map(async (viTri) => {
    try {
      const data = await bannerService.getBannersByPosition(viTri);
      if (Array.isArray(data) && data.length > 0) { const active = data.find(b => b.trangThai) || data[0]; MAP[viTri](active); }
    } catch { /* giữ fallback */ }
  }));
};

const fetchProductsByCategoryId = async (categoryId, targetRef, loadingRef) => {
  loadingRef.value = true;
  try {
    let products = [];
    try {
      const res = await axios.get(`${API_BASE}/api/products/category/${categoryId}`, { params: { page: 1, size: 4 } });
      products = res.data?.content || res.data?.data || res.data || [];
    } catch {
      const res2 = await axios.get(`${API_BASE}/api/products`, { params: { status: true, page: 1, size: 4, categoryId } });
      products = res2.data?.content || res2.data?.data || res2.data || [];
    }

    // ── KHÔNG truyền flashPercent → mapProduct giữ nguyên giá gốc ──
    targetRef.value = products.slice(0, 4).map(p => mapProduct(p, null, null));
  } catch {
    targetRef.value = [];
  } finally {
    loadingRef.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/categories`);
    horecaCategories.value = response.data.filter(cat => cat.status === true && !cat.danhMucChaId && !cat.parentId).slice(0, 8);
  } catch { console.error('Lỗi khi tải danh mục'); }
};

const fetchFlashSaleProducts = async () => {
  flashSaleLoading.value = true;
  try {
    const flashRes = await axios.get(`${API_BASE}/api/khuyen-mai-flash`);
    const activeFlash = (flashRes.data || [])
      .filter(f => f.trangThaiHienThi === 'Đang diễn ra')
      .sort((a, b) => b.phanTramGiamGia - a.phanTramGiamGia)
      .slice(0, 5);

    if (activeFlash.length === 0) { flashSaleProducts.value = []; return; }

    const results = await Promise.allSettled(
      activeFlash.map(async (flash) => {
        const res = await axios.get(`${API_BASE}/api/products/by-chi-tiet/${flash.chiTietSanPhamId}`);
        // Truyền thêm chiTietSanPhamId để mapProduct lấy đúng giá biến thể
        return mapProduct(res.data, flash.phanTramGiamGia, flash.chiTietSanPhamId);
      })
    );

    flashSaleProducts.value = results
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value);

  } catch (e) {
    console.error('Flash sale error:', e);
    flashSaleProducts.value = [];
  } finally {
    flashSaleLoading.value = false;
  }
};

const fetchGiftProducts = async () => { await fetchProductsByCategoryId(12, giftProducts, giftLoading); };

const fetchRecentNews = async () => {
  try {
    const response = await newsService.getPublicNews();
    let allNews = Array.isArray(response.data) ? response.data : (response.data?.content || response.data?.data || []);
    if (allNews.length > 0) {
      recentNews.value = [...allNews]
        .sort((a, b) => new Date(b.ngayTao || 0) - new Date(a.ngayTao || 0))
        .slice(0, 4)  // ← đổi từ 3 thành 4
        .map(news => ({ ...news, anhDaiDien: news.anhDaiDien || news.hinhAnh || news.image || news.thumbnail || news.duongDanAnh || '' }));
    }
  } catch (error) { console.warn('Lỗi lấy tin tức:', error.message); }
};
const startCountdown = () => {
  const now = new Date(); const endOfDay = new Date(); endOfDay.setHours(23, 59, 59, 999);
  let remaining = Math.floor((endOfDay - now) / 1000);
  const tick = () => {
    if (remaining <= 0) remaining = 86399;
    countdownHours.value   = String(Math.floor(remaining / 3600)).padStart(2, '0');
    countdownMinutes.value = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
    countdownSeconds.value = String(remaining % 60).padStart(2, '0');
    remaining--;
  };
  tick(); countdownInterval = setInterval(tick, 1000);
};

// ── REVIEW MOBILE CAROUSEL ──
const reviewMobileIdx = ref(0);
let reviewMobileTimer = null;

const startReviewMobileCarousel = () => {
  reviewMobileTimer = setInterval(() => {
    reviewMobileIdx.value = reviewMobileIdx.value === 0 ? 1 : 0;
  }, 5000);
};

onMounted(async () => {
  revealObserver = createObserver();
  try {
    const bannerData = await bannerService.getBannersByPosition('HOME');
    if (bannerData?.length > 0) { homeBanners.value = bannerData; nextTick(() => startCarousel()); }
  } catch {}
  nextTick(() => observeElements());
  fetchSectionBanners();

  // Fetch flash sale TRƯỚC
  await fetchFlashSaleProducts();

  fetchRecentNews();
  await fetchCategories();

  // Fetch các section song song
  await Promise.all([
    fetchProductsByCategoryId(18, batComProducts, batComLoading),
    fetchProductsByCategoryId(11, cocSuProducts, cocSuLoading),
    fetchProductsByCategoryId(13, boBatDiaProducts, boBatDiaLoading),
    fetchGiftProducts(),
  ]);

  // Sau khi có đủ data → đồng bộ giá flash sale xuống các section
  applyFlashSalePrices();

  startCountdown();
  startImageRotation();
  startReviewMobileCarousel();
});

onUnmounted(() => {
  stopCarousel();
  if (countdownInterval)     clearInterval(countdownInterval);
  if (imageRotationInterval) clearInterval(imageRotationInterval);
  if (toastTimeout)          clearTimeout(toastTimeout);
  if (revealObserver)        revealObserver.disconnect();
  if (reviewMobileTimer) clearInterval(reviewMobileTimer);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');

:root {
  --horeca-red: #b31f24;
  --horeca-red-dark: #8a181c;
  --horeca-red-light: #fdf1f1;
}

.home-page { color: #333; background-color: #f8f9fa; }
.section-divider { border-bottom: 1px dashed #e0e0e0; padding-bottom: 3rem; }
.object-fit-cover { object-fit: cover; }

/* ══ SCROLL REVEAL ══ */
.reveal { opacity: 0; transform: translateX(-50px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1); will-change: opacity, transform; }
.reveal.visible { opacity: 1; transform: translateX(0); }
.reveal-item { opacity: 0; transform: translateX(-35px); transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1); will-change: opacity, transform; }
.reveal-item.visible { opacity: 1; transform: translateX(0); }
.reveal-item:nth-child(1) { transition-delay: 0s; }
.reveal-item:nth-child(2) { transition-delay: 0.08s; }
.reveal-item:nth-child(3) { transition-delay: 0.16s; }
.reveal-item:nth-child(4) { transition-delay: 0.24s; }
.reveal-item:nth-child(5) { transition-delay: 0.32s; }
.reveal-item:nth-child(6) { transition-delay: 0.40s; }
.reveal-item:nth-child(7) { transition-delay: 0.48s; }
.reveal-item:nth-child(8) { transition-delay: 0.56s; }
@media (prefers-reduced-motion: reduce) { .reveal, .reveal-item { opacity: 1; transform: none; transition: none; } }

/* ══ CAROUSEL ══ */
.hc-wrap { position: relative; width: 100%; overflow: hidden; background: #111; }
.hc-progress-line { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: rgba(255,255,255,0.2); z-index: 20; }
.hc-progress-bar { height: 100%; background: #b31f24; width: 0; }
.hc-track { display: flex; width: 100%; transition: transform 0.75s cubic-bezier(0.77, 0, 0.18, 1); will-change: transform; }
.hc-slide { min-width: 100%; flex-shrink: 0; position: relative; overflow: hidden; max-height: 800px; }
.hc-link { display: block; width: 100%; line-height: 0; }
.hc-img { width: 100%; height: 100%; max-height: 800px; display: block; object-fit: cover; object-position: center center; }
.hc-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 45%); pointer-events: none; }
.hc-dots { position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 10; }
.hc-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.45); border: none; cursor: pointer; padding: 0; transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1); }
.hc-dot.active { width: 28px; border-radius: 10px; background: #fff; }
.hc-dot:hover:not(.active) { background: rgba(255,255,255,0.75); transform: scale(1.2); }
@media (max-width: 1200px) { .hc-slide { max-height: 650px; } .hc-img { max-height: 650px; } }
@media (max-width: 768px) { .hc-slide { max-height: 260px; } .hc-img { max-height: 260px; } .hc-dot { width: 6px; height: 6px; } .hc-dot.active { width: 20px; } }
@media (max-width: 480px) { .hc-slide { max-height: 200px; } .hc-img { max-height: 200px; } }

/* ══ SERVICE BAR V2 ══ */
.sb2-section { background: #fff; border-top: 1px solid #f5e0e0; border-bottom: 4px solid #b31f24; box-shadow: 0 6px 30px rgba(179, 31, 36, 0.08); }
.sb2-inner { display: flex; align-items: stretch; max-width: 1320px; margin: 0 auto; padding: 0 1.5rem; }
.sb2-item { flex: 1; display: flex; align-items: center; gap: 14px; padding: 22px 20px; cursor: default; transition: background 0.25s ease; position: relative; min-width: 0; }
.sb2-divider { width: 1px; flex-shrink: 0; background: linear-gradient(to bottom, transparent 10%, #f0d0d0 40%, #f0d0d0 60%, transparent 90%); align-self: stretch; margin: 12px 0; }
.sb2-item::before { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%) scaleX(0); width: 60%; height: 3px; background: #b31f24; border-radius: 2px 2px 0 0; transition: transform 0.3s ease; }
.sb2-item:hover::before { transform: translateX(-50%) scaleX(1); }
.sb2-item:hover { background: linear-gradient(180deg, #fff 0%, #fdf1f1 100%); }
.sb2-icon-wrap { flex-shrink: 0; width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, #b31f24, #8a181c); box-shadow: 0 4px 12px rgba(179,31,36,0.3); display: flex; align-items: center; justify-content: center; transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.sb2-item:hover .sb2-icon-wrap { transform: scale(1.08) rotate(-5deg); }
.sb2-svg { width: 28px; height: 28px; stroke-width: 1.8px; }
.sb2-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
.sb2-title { font-size: 0.9rem; font-weight: 700; color: #1a1a1a; line-height: 1.35; word-break: break-word; white-space: normal; }
.sb2-desc { font-size: 0.75rem; color: #999; font-weight: 400; line-height: 1.4; white-space: normal; word-break: break-word; }
.sb2-stat { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; text-align: center; min-width: 52px; border-left: 1px dashed #f0d0d0; padding-left: 14px; }
.sb2-num { font-size: 1.4rem; font-weight: 800; color: #b31f24; line-height: 1; letter-spacing: -0.5px; }
.sb2-unit { font-size: 0.6rem; color: #bbb; font-weight: 600; letter-spacing: 0.3px; text-transform: uppercase; white-space: nowrap; margin-top: 3px; }
@media (max-width: 992px) { .sb2-stat { display: none; } .sb2-item { padding: 18px 12px; gap: 10px; } .sb2-title { font-size: 0.85rem; } .sb2-desc { font-size: 0.72rem; } .sb2-icon-wrap { width: 48px; height: 48px; border-radius: 12px; } .sb2-svg { width: 22px; height: 22px; } }
@media (max-width: 768px) { .sb2-inner { flex-wrap: wrap; } .sb2-divider { display: none; } .sb2-item { flex: 1 1 calc(50% - 1px); padding: 16px 12px; border-bottom: 1px dashed #f0d0d0; } }

/* ══ FLASH SALE V2 ══ */
.fs2-wrapper { position: relative; background: #fff; border: 1px solid #ffd5d5; border-radius: 20px; padding: 28px 32px 32px; overflow: hidden; }
.fs2-blob { position: absolute; border-radius: 50%; pointer-events: none; z-index: 0; }
.fs2-blob--tl { width: 280px; height: 280px; top: -100px; left: -80px; background: radial-gradient(circle, rgba(179,31,36,0.07) 0%, transparent 70%); }
.fs2-blob--br { width: 220px; height: 220px; bottom: -80px; right: -60px; background: radial-gradient(circle, rgba(255,100,80,0.08) 0%, transparent 70%); }
.fs2-header { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; padding-bottom: 20px; margin-bottom: 24px; border-bottom: 1px solid #ffe0e0; }
.fs2-header-left { display: flex; align-items: center; gap: 14px; }
.fs2-lightning-wrap { width: 46px; height: 46px; border-radius: 50%; background: #b31f24; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.fs2-lightning-icon { font-size: 1.4rem; color: #fff; animation: fs2-flicker 1.4s ease-in-out infinite alternate; }
@keyframes fs2-flicker { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0.65; transform: scale(0.88); } }
.fs2-title { font-size: 1.3rem; font-weight: 800; color: #b31f24; letter-spacing: 0.5px; margin: 0; font-style: italic; line-height: 1.1; }
.fs2-subtitle { font-size: 0.78rem; color: #e86060; margin: 3px 0 0; font-weight: 500; }
.fs2-countdown-wrap { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
.fs2-countdown-label { font-size: 0.72rem; font-weight: 600; color: #b31f24; text-transform: uppercase; letter-spacing: 0.5px; }
.fs2-countdown { display: flex; align-items: center; gap: 6px; }
.fs2-cd-block { display: flex; flex-direction: column; align-items: center; background: #b31f24; border-radius: 8px; padding: 6px 10px 4px; min-width: 44px; }
.fs2-cd-num { font-size: 1.1rem; font-weight: 800; color: #fff; line-height: 1; letter-spacing: 1px; font-variant-numeric: tabular-nums; }
.fs2-cd-unit { font-size: 0.55rem; color: rgba(255,255,255,0.75); font-weight: 600; letter-spacing: 0.8px; margin-top: 2px; }
.fs2-cd-sep { font-size: 1.2rem; font-weight: 800; color: #b31f24; line-height: 1; margin-bottom: 8px; }
.fs2-grid { position: relative; z-index: 2; display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
@media (max-width: 1199px) { .fs2-grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 900px)  { .fs2-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 600px)  { .fs2-grid { grid-template-columns: repeat(2, 1fr); } }
.fs2-card { display: flex; flex-direction: column; background: #fff; border: 1px solid #f3e0e0; border-radius: 14px; overflow: hidden; position: relative; transition: transform 0.28s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.28s ease, border-color 0.2s; text-decoration: none; }
.fs2-card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(179,31,36,0.13); border-color: #f5c6c8; }
.fs2-badge-sale { position: absolute; top: 10px; right: 10px; z-index: 5; background: #b31f24; color: #fff; font-size: 0.68rem; font-weight: 800; padding: 4px 9px; border-radius: 20px; letter-spacing: 0.3px; box-shadow: 0 2px 8px rgba(179,31,36,0.35); }
.fs2-img-box { position: relative; background: linear-gradient(135deg, #fafafa 0%, #f4f4f4 100%); padding: 14px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.fs2-img { height: 180px; width: 100%; object-fit: contain; transition: transform 0.35s ease; }
.fs2-card:hover .fs2-img { transform: scale(1.07); }
.fs2-img-glow { position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 80px; height: 40px; background: rgba(179,31,36,0.08); border-radius: 50%; filter: blur(12px); pointer-events: none; opacity: 0; transition: opacity 0.3s; }
.fs2-card:hover .fs2-img-glow { opacity: 1; }
.fs2-info { padding: 10px 12px 6px; flex: 1; }
.fs2-name { font-size: 0.82rem; font-weight: 600; color: #222; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 38px; margin: 0 0 8px; transition: color 0.2s; }
.fs2-card:hover .fs2-name { color: #b31f24; }
.fs2-price-row { display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; }
.fs2-price-sale { font-size: 1rem; font-weight: 800; color: #b31f24; line-height: 1; }
.fs2-price-old { font-size: 0.72rem; color: #bbb; text-decoration: line-through; font-weight: 400; }
.fs2-progress-wrap { padding: 6px 12px 12px; position: relative; }
.fs2-progress-track { height: 16px; background: #ffe5e5; border-radius: 20px; overflow: visible; position: relative; }
.fs2-progress-fill { height: 100%; background: linear-gradient(90deg, #d44249 0%, #b31f24 100%); border-radius: 20px; position: relative; min-width: 30px; transition: width 0.8s ease; }
.fs2-fire-icon { position: absolute; right: -2px; top: 50%; transform: translateY(-50%); font-size: 11px; color: #ffc107; }
.fs2-sold-label { display: block; position: absolute; top: 6px; left: 0; right: 0; text-align: center; font-size: 10px; font-weight: 700; color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,0.4); line-height: 16px; pointer-events: none; z-index: 3; }
.fs2-card--skeleton { animation: fs2-skeleton-pulse 1.5s infinite; pointer-events: none; }
@keyframes fs2-skeleton-pulse { 0%,100%{opacity:1} 50%{opacity:0.55} }
.fs2-sk-img { height: 194px; background: #f0f0f0; }
.fs2-sk-line { height: 12px; border-radius: 4px; background: #f0f0f0; margin: 10px 12px 0; }
.fs2-sk-line--full { width: calc(100% - 24px); }
.fs2-sk-line--half { width: calc(55% - 12px); margin-top: 8px; }
.fs2-sk-bar { height: 16px; border-radius: 20px; background: #f0f0f0; margin: 10px 12px 12px; }
.fs2-empty { position: relative; z-index: 2; text-align: center; color: #aaa; padding: 32px 0; }

/* ══ VIDEO + BANNER V2 ══ */
.vb2-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: stretch; }
@media (max-width: 991px) { .vb2-grid { grid-template-columns: 1fr; } }
.vb2-video-panel { display: flex; flex-direction: column; gap: 10px; }
.vb2-video-label { display: inline-flex; align-items: center; font-size: 0.8rem; font-weight: 700; color: #b31f24; text-transform: uppercase; letter-spacing: 0.5px; }
.vb2-video-frame { flex: 1; border-radius: 16px; overflow: hidden; border: 1px solid #e8e8e8; min-height: 360px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
.vb2-video-frame iframe { display: block; width: 100%; height: 100%; min-height: 360px; }
.vb2-right { display: flex; flex-direction: column; gap: 12px; }
.vb2-banner { position: relative; border-radius: 14px; overflow: hidden; border: 1px solid #e8e8e8; box-shadow: 0 3px 14px rgba(0,0,0,0.05); flex: 1; transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; }
.vb2-banner:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.vb2-banner--top { min-height: 200px; }
.vb2-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
.vb2-banner:hover .vb2-img { transform: scale(1.04); }
.vb2-banner-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%); display: flex; align-items: flex-end; padding: 14px; pointer-events: none; }
.vb2-banner-overlay--dark { background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%); }
.vb2-banner-badge { display: inline-block; background: #b31f24; color: #fff; font-size: 0.72rem; font-weight: 700; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.3px; text-transform: uppercase; }
.vb2-banner-label { display: inline-block; color: #fff; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.3px; text-shadow: 0 1px 4px rgba(0,0,0,0.5); text-transform: uppercase; }
.vb2-bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; flex: 1; }
.vb2-banner--btm { min-height: 150px; }

/* ══ SECTION HEADINGS ══ */
.section-heading { font-size: 1.4rem; color: #2d2d2d; letter-spacing: 0.5px; position: relative; padding-left: 16px; }
.section-heading::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 5px; height: 80%; background: linear-gradient(to bottom, #b31f24, #8a181c); border-radius: 3px; }
.product-section-header { padding-bottom: 8px; border-bottom: 2px solid #f0f0f0; }
.btn-viewall { font-size: 0.85rem; color: #b31f24; text-decoration: none; font-weight: 600; transition: 0.2s; white-space: nowrap; }
.btn-viewall:hover { color: #8a181c; text-decoration: underline; }

/* ══ CATEGORY CARDS ══ */
.horeca-cat-card { border-radius: 12px; background: linear-gradient(135deg, #8a181c 0%, #b31f24 60%, #d44249 100%); border: none; transition: all 0.3s ease; min-height: 130px; }
.horeca-cat-card:hover { transform: translateY(-5px); box-shadow: 0 8px 24px rgba(179,31,36,0.4) !important; }
.horeca-cat-card h5 { font-size: 1.05rem; letter-spacing: 0.5px; color: #ffffff; font-weight: 700; }
.cat-img-wrapper { width: 85px; height: 85px; flex-shrink: 0; }
.cat-img-wrapper img { width: 100%; height: 100%; object-fit: cover; border: 2px solid rgba(255,255,255,0.5); box-shadow: 0 0 10px rgba(255,255,255,0.25); transition: transform 0.5s ease; }
.horeca-cat-card:hover .cat-img-wrapper img { transform: scale(1.05) rotate(5deg); }

/* ══ PRODUCT CARDS ══ */
.product-card-v2 { border: 1px solid #f0f0f0 !important; transition: all 0.3s cubic-bezier(0.25,0.8,0.25,1); cursor: pointer; }
.product-card-v2:hover { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(0,0,0,0.12) !important; border-color: #f5c6c8 !important; }
.product-img-box-v2 { display: block; background: #f8f8f8; overflow: hidden; border-bottom: 1px solid #f0f0f0; position: relative; aspect-ratio: 1 / 1; padding: 0; }
.product-img-box-v2 img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
.product-card-v2:hover .product-img-box-v2 img { transform: scale(1.06); }
.quick-view-overlay { position: absolute; bottom: -42px; left: 0; right: 0; display: flex; justify-content: center; transition: bottom 0.3s ease; z-index: 5; }
.product-card-v2:hover .quick-view-overlay { bottom: 8px; }
.quick-view-btn { background: rgba(0,0,0,0.72); color: #fff; font-size: 0.78rem; padding: 5px 16px; border-radius: 20px; backdrop-filter: blur(4px); white-space: nowrap; letter-spacing: 0.3px; }
/* MỚI */
.shopee-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 6;
  background: #ee4d2d;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 3px;
  letter-spacing: 0.2px;
  line-height: 1.6;
  pointer-events: none;
  box-shadow: 0 1px 4px rgba(238,77,45,0.35);
}
.product-name-v2 { font-size: 0.88rem; font-weight: 600; color: #222; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 38px; margin: 0; transition: color 0.2s ease; }
.product-card-v2:hover .product-name-v2 { color: #b31f24; }
.rating-stars-v2 { line-height: 1; display: flex; align-items: center; gap: 1px; }
.sold-v2 { font-size: 0.73rem; }
.cart-btn-v2 { width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid #b31f24; background: white; color: #b31f24; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; cursor: pointer; flex-shrink: 0; transition: all 0.25s ease; box-shadow: 0 2px 8px rgba(179,31,36,0.15); }
.cart-btn-v2:hover { background: #b31f24; color: white; transform: scale(1.12) rotate(-8deg); box-shadow: 0 4px 14px rgba(179,31,36,0.4); }
.cart-btn-gift { border-color: #b31f24; color: #b31f24; }
.cart-btn-gift:hover { background: #b31f24; color: white; }

/* ══ CORNER BADGES ══ */
.corner-badges { position: absolute; top: 0; right: 0; width: 64px; height: 64px; z-index: 6; overflow: hidden; }
.cbadge { display: inline-block; font-size: 0.6rem; font-weight: 800; letter-spacing: 1px; padding: 3px 8px; border-radius: 4px; line-height: 1.4; text-transform: uppercase; box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
.cbadge--new {
  position: absolute;
  top: 14px;
  right: -20px;
  width: 84px;
  padding: 4px 0;
  background: #ff3b3b;
  color: #fff;
  font-size: 0.55rem;
  font-weight: 900;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
  transform: rotate(45deg);
  border-radius: 0;
  box-shadow: 0 2px 6px rgba(255,59,59,0.4);
  display: block;
}
.cbadge--sale {
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: #f59e0b;
  color: #fff;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 1px;
  padding: 3px 8px;
  border-radius: 4px;
  line-height: 1.4;
  text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
.cbadge--hot {
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: #ee4d2d;
  color: #fff;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 1px;
  padding: 3px 8px;
  border-radius: 4px;
  line-height: 1.4;
  text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
.product-card-gift-v2 { border: 1px solid #f5c6c8 !important; }
.product-card-gift-v2:hover { border-color: #b31f24 !important; box-shadow: 0 16px 32px rgba(179,31,36,0.15) !important; }
.gift-hot-badge-v2 { position: absolute; top: 0; right: 0; background: linear-gradient(135deg, #b31f24, #8a181c); color: white; font-size: 0.72rem; font-weight: 700; padding: 4px 12px 4px 10px; border-radius: 0 12px 0 12px; z-index: 3; }
.skeleton-card { border: 1px solid #f0f0f0; animation: skeleton-pulse 1.5s infinite; }
@keyframes skeleton-pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }

/* ══ BANNER SIDE ══ */
.banner-side { background-size: cover; background-position: center; position: relative; overflow: hidden; min-height: 420px; border: 1px solid #dee2e6; }
.banner-overlay { background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%); }
.text-shadow { text-shadow: 1px 1px 3px rgba(0,0,0,0.5); }

/* ══ MORE BUTTON ══ */
.line-center { position: absolute; top: 50%; left: 0; width: 100%; height: 1px; background: #dee2e6; z-index: 1; }
.btn-horeca { background: #b31f24; color: #fff; border: none; }
.btn-horeca:hover { background: #8a181c; color: #fff; }
.btn-more { position: relative; z-index: 2; font-size: 0.9rem; letter-spacing: 0.5px; }
.korean-title { border: 2px solid #b31f24; color: #b31f24; background-color: white; border-radius: 50px; }

/* ══ BRAND PROMISE ══ */
.brand-item { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.2); transition: 0.3s; }
.brand-item:hover { background: rgba(255,255,255,0.14) !important; border-color: rgba(255,255,255,0.4) !important; transform: translateY(-4px); }

/* ══ REVIEWS ══ */
.text-horeca { color: #b31f24 !important; }
.bg-horeca { background-color: #b31f24 !important; }
.divider-small { width: 60px; height: 3px; border-radius: 2px; }
.quote-icon { font-size: 5rem; position: absolute; bottom: -15px; right: 10px; color: #b31f24; }

/* ══ NEWS ══ */
.hover-up { transition: transform 0.3s ease, box-shadow 0.3s ease; }
.hover-up:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.transition-zoom { transition: transform 0.4s ease; }
.card-img-wrapper:hover .transition-zoom { transform: scale(1.05); }
.img-overlay-light { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.03); z-index: 1; transition: 0.3s; }
.card-img-wrapper:hover .img-overlay-light { background: rgba(0,0,0,0.15); }
.title-with-line::after { content: ''; display: block; width: 60px; height: 3px; background: #b31f24; margin: 8px auto 0; border-radius: 2px; }
.readmore-link { transition: gap 0.3s; }
.readmore-link:hover { gap: 8px !important; }
.hover-text-horeca:hover { color: #b31f24 !important; }
.cursor-pointer { cursor: pointer; }
.mix-blend-multiply { mix-blend-mode: multiply; }

/* ══ TRANSITIONS ══ */
.fade-img-enter-active, .fade-img-leave-active { transition: opacity 0.5s ease; }
.fade-img-enter-from, .fade-img-leave-to { opacity: 0; }
.toast { opacity: 0; transition: opacity 0.3s ease; }
.toast.show { opacity: 1; }

/* ══ VARIANT MODAL ══ */
.variant-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 9999; display: flex; align-items: center; justify-content: center; }
.variant-modal { background: #fff; border-radius: 12px; width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto; padding-bottom: env(safe-area-inset-bottom); animation: slideUp .25s ease; }
@keyframes slideUp { from { transform: translateY(60px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@media (max-width: 576px) { .variant-modal-overlay { align-items: flex-end; } .variant-modal { border-radius: 16px 16px 0 0; } }
.variant-modal-header { display: flex; gap: 12px; padding: 16px; border-bottom: 1px solid #f0f0f0; }
.variant-modal-img { width: 80px; height: 80px; object-fit: cover; border-radius: 8px; border: 1px solid #eee; }
.variant-modal-info { flex: 1; }
.variant-modal-name { font-weight: 600; font-size: 14px; margin-bottom: 4px; }
.variant-modal-body { padding: 16px; }
.variant-modal-footer { display: flex; gap: 8px; padding: 12px 16px; border-top: 1px solid #f0f0f0; }
.variant-modal-footer .flex-1 { flex: 1; }
.variant-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 4px; font-size: 13px; border: 1px solid #ddd; background: #fff; cursor: pointer; transition: all .15s; }
.variant-btn:hover { border-color: #b31f24; color: #b31f24; }
.variant-btn.active { border-color: #b31f24; color: #b31f24; background: #fff5f3; font-weight: 600; }
.variant-btn.disabled { opacity: .4; cursor: not-allowed; }
.color-dot { width: 12px; height: 12px; border-radius: 50%; border: 1px solid rgba(0,0,0,.15); display: inline-block; }
.qty-control { border: 1px solid #ddd; border-radius: 4px; width: fit-content; }
.qty-btn { width: 32px; height: 32px; border: none; background: #f5f5f5; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; touch-action: manipulation; }
.qty-btn:first-child { border-radius: 4px 0 0 4px; }
.qty-btn:last-child  { border-radius: 0 4px 4px 0; }
.qty-input { width: 48px; height: 32px; border: none; border-left: 1px solid #ddd; border-right: 1px solid #ddd; text-align: center; font-size: 14px; outline: none; }
/* ══════════════════════════════════════════
   MOBILE OPTIMIZATIONS - HomePage
══════════════════════════════════════════ */

/* ── Review carousel arrows ── */
.review-carousel-prev { left: -50px; opacity: 1; }
.review-carousel-next { right: -50px; opacity: 1; }

@media (max-width: 768px) {
  .review-carousel-prev { left: 0; }
  .review-carousel-next { right: 0; }

  /* Thu nhỏ review card để tránh bị che bởi mũi tên */
  #reviewCarousel .row { padding: 0 40px; }
  #reviewCarousel .col-md-6 { flex: 0 0 100%; max-width: 100%; }
}

/* ── Flash sale wrapper ── */
@media (max-width: 576px) {
  .fs2-wrapper { padding: 16px 14px 20px; border-radius: 14px; }
  .fs2-header { flex-direction: column; align-items: flex-start; gap: 10px; padding-bottom: 14px; margin-bottom: 16px; }
  .fs2-title { font-size: 1.05rem; }
  .fs2-countdown-wrap { align-items: flex-start; }
  .fs2-cd-block { min-width: 36px; padding: 5px 8px 4px; }
  .fs2-cd-num { font-size: 0.95rem; }
}

/* ── Category cards ── */
@media (max-width: 576px) {
  .horeca-cat-card { min-height: 100px; padding: 10px !important; }
  .horeca-cat-card h5 { font-size: 0.85rem; }
  .cat-img-wrapper { width: 60px; height: 60px; }
}

/* ── Korean title (Quà Tặng) ── */
@media (max-width: 576px) {
  .korean-title {
    font-size: 0.9rem !important;
    padding: 10px 18px !important;
    letter-spacing: 0;
  }
}

/* ── Section headings ── */
@media (max-width: 576px) {
  .section-heading { font-size: 1.1rem; }
  .product-section-header { flex-wrap: wrap; gap: 6px; }
  .btn-viewall { font-size: 0.8rem; }
}

/* ── Service bar ── */
@media (max-width: 480px) {
  .sb2-icon-wrap { width: 40px; height: 40px; border-radius: 10px; }
  .sb2-svg { width: 20px; height: 20px; }
  .sb2-title { font-size: 0.8rem; }
  .sb2-desc { font-size: 0.68rem; }
  .sb2-item { padding: 12px 10px; gap: 8px; }
}

/* ── Product card giá ── */
@media (max-width: 400px) {
  .product-name-v2 { font-size: 0.8rem; min-height: 34px; }
  .cart-btn-v2 { width: 32px; height: 32px; font-size: 0.95rem; }
}

/* ── Brand promise section ── */
@media (max-width: 576px) {
  .brand-promise-section h2 { font-size: 1.2rem; }
  .brand-item { padding: 16px !important; }
  .brand-icon i { font-size: 2.2rem !important; }
}

/* ── News section ── */
@media (max-width: 576px) {
  .horeca-news-section .card-img-wrapper { height: 180px !important; }
  .horeca-news-section h2 { font-size: 1.3rem !important; }
}

/* ── Video frame ── */
@media (max-width: 576px) {
  .vb2-video-frame { min-height: 220px; }
  .vb2-video-frame iframe { min-height: 220px; }
}

/* ══ VIDEO + BANNER MOBILE ══ */
@media (max-width: 991px) {
  .vb2-grid { grid-template-columns: 1fr; gap: 14px; }
  .vb2-video-frame { min-height: 240px; }
  .vb2-video-frame iframe { min-height: 240px; }
  .vb2-banner--top { min-height: 160px; }
  .vb2-banner--btm { min-height: 120px; }
}

@media (max-width: 576px) {
  .vb2-video-frame { min-height: 200px; }
  .vb2-video-frame iframe { min-height: 200px; }
  .vb2-bottom-row { gap: 8px; }
  .vb2-banner-badge, .vb2-banner-label { font-size: 0.68rem; padding: 3px 8px; }
}

/* ══ BRAND PROMISE MOBILE ══ */
@media (max-width: 576px) {
  .brand-promise-section { padding: 32px 0 !important; }
  .brand-promise-section h2 { font-size: 1.1rem !important; letter-spacing: 0; }
  .brand-item {
    padding: 14px 10px !important;
    border-radius: 12px !important;
  }
  .brand-icon i { font-size: 2rem !important; }
  .brand-item h5 { font-size: 0.85rem !important; margin-bottom: 6px !important; }
  .brand-item p { font-size: 0.72rem !important; }
}

/* ══ REVIEW CAROUSEL MOBILE ══ */
.review-carousel .carousel-control-prev { left: 0; opacity: 1; }
.review-carousel .carousel-control-next { right: 0; opacity: 1; }

@media (max-width: 768px) {
  /* Ẩn 2 nút mũi tên, dùng swipe thay thế */
  .review-carousel .carousel-control-prev,
  .review-carousel .carousel-control-next { display: none; }

  /* Hiện 1 card mỗi lần */
  .review-carousel .col-md-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  /* Thêm dots indicator */
  .review-carousel { padding-bottom: 30px; }
}

@media (max-width: 576px) {
  /* Review: bỏ carousel, hiện thẳng dạng list */
  #reviewCarousel .carousel-inner { overflow: visible; }
  #reviewCarousel .carousel-item { display: block !important; opacity: 1 !important; position: relative !important; }
  #reviewCarousel .carousel-item + .carousel-item { margin-top: 16px; }
  #reviewCarousel .row { padding: 0 !important; flex-direction: column; }
  #reviewCarousel .col-md-6 { flex: 0 0 100%; max-width: 100%; }
  
  .review-card { padding: 14px !important; }
  .review-card img.rounded-circle { width: 46px !important; height: 46px !important; }
  .review-card h6 { font-size: 0.85rem; }
  .review-content { font-size: 0.78rem !important; line-height: 1.5; }
  .quote-icon { display: none; }
}
@media (max-width: 576px) {
  /* Tin tức mobile */
  .news-card-custom .card-img-wrapper { height: 140px !important; }
  .news-card-custom .card-body { padding: 10px 12px !important; }
  .news-card-custom .card-title { font-size: 0.82rem !important; margin-bottom: 6px !important; }
  .news-card-custom .card-text { display: none; } /* ẩn mô tả, chỉ giữ tiêu đề */
  .news-card-custom .card-footer { padding: 0 12px 10px !important; }
  .news-card-custom .small.text-muted { font-size: 0.68rem !important; }
  .news-card-custom .badge { font-size: 0.65rem !important; padding: 3px 8px !important; }
}
/* ══ REVIEW MOBILE CAROUSEL ══ */
.review-mobile-carousel { position: relative; overflow: hidden; }
.review-mobile-slide {
  display: none;
  animation: reviewFadeIn 0.5s ease;
}
.review-mobile-slide.active { display: block; }
@keyframes reviewFadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.review-mobile-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}
.review-mobile-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #ddd;
  cursor: pointer;
  transition: all 0.3s;
}
.review-mobile-dot.active {
  background: #b31f24;
  width: 24px;
  border-radius: 4px;
}

/* ══ NEWS 4 CỘT MOBILE ══ */
@media (max-width: 576px) {
  /* Tin tức: 2 cột, 2 hàng, tin thứ 3-4 căn giữa */
  .horeca-news-section .row.justify-content-center { --bs-gutter-x: 0.75rem; }
  .news-card-custom .card-img-wrapper { height: 120px !important; }
  .news-card-custom .card-body { padding: 8px 10px !important; }
  .news-card-custom .card-title { font-size: 0.78rem !important; -webkit-line-clamp: 2; min-height: unset; }
  .news-desc-text { display: none; }
  .news-card-custom .card-footer { padding: 0 10px 8px !important; }
}
</style>
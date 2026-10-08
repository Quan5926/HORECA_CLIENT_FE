<template>
  <div class="store-page-wrapper font-general bg-cream-light">
    <main class="main-content pb-0 position-relative z-1">
      <div class="page-header-bg"></div>

      <div class="container-fluid px-lg-5 pt-4 position-relative z-2">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-4 small">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-decoration-none text-muted opacity-75 hover-red">
                <i class="bi bi-house-door-fill me-1"></i>Trang chủ
              </router-link>
            </li>
            <li class="breadcrumb-item active text-main-red fw-bold" aria-current="page">Hệ thống cơ sở</li>
          </ol>
        </nav>

        <div class="text-center mb-5">
          <div class="d-inline-flex align-items-center justify-content-center mb-3">
            <span class="separator-line bg-main-red opacity-25"></span>
            <span class="badge bg-white text-main-red shadow-sm border border-light-subtle px-3 py-2 rounded-pill text-uppercase fw-bold mx-3 ls-1">
              HORECA VN
            </span>
            <span class="separator-line bg-main-red opacity-25"></span>
          </div>
          <h1 class="fw-bolder text-main-red text-uppercase display-5 mb-3 font-primary">
            Hệ Thống Cơ Sở HORECA VN
          </h1>
          <p class="text-secondary mx-auto lead fs-6" style="max-width: 680px;">
            Trải nghiệm mua sắm sản phẩm gốm sứ, nguyên liệu F&amp;B chính hãng tại trụ sở và showroom của HORECA VN tại Hà Nội.
          </p>
        </div>
      </div>

      <!-- ===================== MAIN CONTENT ===================== -->
      <div class="container-fluid px-lg-5 pb-5 position-relative z-2">
        <div class="row g-0 premium-shadow rounded-5 overflow-hidden bg-white" style="min-height: 700px;">

          <!-- LEFT: Danh sách cơ sở -->
          <div class="col-lg-4 d-flex flex-column border-end border-light-subtle position-relative bg-white z-1">

            <!-- Filter header -->
            <div class="p-4 bg-white border-bottom border-light-subtle">
              <div class="d-flex align-items-center mb-4">
                <div class="icon-square bg-red-subtle text-main-red rounded-circle me-3">
                  <i class="bi bi-shop-window fs-4"></i>
                </div>
                <div>
                  <h5 class="mb-0 fw-bold text-main-red">Tìm cơ sở</h5>
                  <small class="text-muted">Trụ sở &amp; Showroom HORECA VN</small>
                </div>
              </div>

              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label small fw-bold text-muted text-uppercase ls-1 mb-1">Tỉnh / Thành phố</label>
                  <select class="form-select border-light-subtle shadow-sm text-main-red fw-semibold py-2" v-model="selectedCity">
                    <option value="">Tất cả địa điểm</option>
                    <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold text-muted text-uppercase ls-1 mb-1">Tìm tên cơ sở / địa chỉ</label>
                  <div class="position-relative">
                    <input type="text"
                           class="form-control border-light-subtle shadow-sm ps-3 pe-5 py-2"
                           placeholder="Ví dụ: Hàng Chiếu, Bạch Đằng..."
                           v-model="searchQuery">
                    <i class="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-main-red"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Result count -->
            <div class="px-4 py-2 bg-light-subtle d-flex justify-content-between align-items-center border-bottom border-light-subtle">
              <small class="text-muted fw-semibold">
                <i class="bi bi-list-check me-1"></i>Tìm thấy:
                <span class="text-main-red fw-bold">{{ filteredStores.length }}</span> cơ sở
              </small>
              <button v-if="selectedCity || searchQuery" @click="resetFilter"
                      class="btn btn-link btn-sm text-decoration-none text-muted p-0 small hover-red">
                <i class="bi bi-x-circle me-1"></i>Xóa lọc
              </button>
            </div>

            <!-- Store list -->
            <div class="store-list-container flex-grow-1 overflow-auto custom-scrollbar p-3 bg-light-subtle">

              <!-- Empty -->
              <div v-if="filteredStores.length === 0"
                   class="text-center p-5 text-muted h-100 d-flex flex-column justify-content-center align-items-center">
                <div class="bg-white rounded-circle p-4 mb-3 shadow-sm">
                  <i class="bi bi-geo-alt-fill fs-1 opacity-25 text-main-red"></i>
                </div>
                <p class="mb-2 fw-bold text-main-red">Không tìm thấy kết quả</p>
                <p class="small mb-3">Vui lòng thử lại với từ khóa khác.</p>
                <button class="btn btn-outline-red rounded-pill btn-sm px-3" @click="resetFilter">Xóa bộ lọc</button>
              </div>

              <!-- Store cards -->
              <div
                v-for="(store, index) in filteredStores"
                :key="index"
                class="store-item-card p-3 mb-3 bg-white border border-light-subtle rounded-4 cursor-pointer position-relative transition-all"
                :class="{ 'active-store-card': activeStoreId === index }"
                @click="selectStore(index)"
              >
                <div class="d-flex align-items-start mb-2">
                  <!-- Number marker -->
                  <div class="store-marker me-3 flex-shrink-0 text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm transition-all"
                       :class="activeStoreId === index ? 'bg-main-red scale-up' : 'bg-secondary bg-opacity-50'">
                    <span class="fw-bold small">{{ index + 1 }}</span>
                  </div>

                  <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start mb-1">
                      <h6 class="fw-bold text-main-red mb-0 lh-sm" style="font-size:0.9rem;">{{ store.name }}</h6>
                      <span class="badge rounded-pill fw-normal small py-1 px-2 ms-2 flex-shrink-0"
                            :class="activeStoreId === index
                              ? 'bg-red-subtle text-main-red border border-red-subtle'
                              : 'bg-secondary-subtle text-secondary'">
                        <i class="bi bi-dot fs-5" style="margin-top:-2px;"></i>Đang mở
                      </span>
                    </div>

                    <!-- Type badge -->
                    <span class="badge rounded-pill mb-2 small px-2 py-1"
                          :style="store.type === 'Showroom'
                            ? 'background:#fdf1f1;color:#b31f24;border:1px solid #f5c6c8'
                            : 'background:#fff3cd;color:#856404;border:1px solid #ffeeba'">
                      <i class="bi bi-building me-1"></i>{{ store.type }}
                    </span>

                    <p class="small text-secondary mb-3 pe-1" style="line-height:1.5;">
                      <i class="bi bi-geo-alt-fill text-muted me-1 opacity-50"></i>{{ store.address }}
                    </p>

                    <div class="d-flex justify-content-between align-items-center pt-2 border-top border-light-subtle">
                      <a :href="'tel:' + store.phone"
                         class="text-decoration-none text-main-red small fw-bold d-flex align-items-center hover-red py-1">
                        <div class="icon-sm bg-red-subtle rounded-circle me-2 text-main-red">
                          <i class="bi bi-telephone-fill" style="font-size:10px;"></i>
                        </div>
                        {{ store.phone }}
                      </a>
                      <a :href="store.mapLink" target="_blank"
                         class="btn btn-sm btn-main-red rounded-pill px-3 py-1 fw-semibold shadow-sm"
                         @click.stop>
                        Chỉ đường <i class="bi bi-box-arrow-up-right ms-1 small"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- RIGHT: Map -->
          <div class="col-lg-8 position-relative">
            <div class="h-100 w-100 d-flex align-items-center justify-content-center position-relative map-container">
              <iframe
                :src="currentStore ? currentStore.embedUrl : stores[0].embedUrl"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>

              <!-- Info popup -->
              <div class="position-absolute bottom-0 start-0 m-4 card premium-shadow border-0 d-none d-md-block animate-pop-in rounded-4 overflow-hidden"
                   style="max-width:400px; z-index:10; min-width:300px;"
                   v-if="currentStore">
                <div class="h-2 bg-main-red w-100"></div>
                <div class="card-body p-4 bg-white">
                  <div class="d-flex justify-content-between align-items-start mb-1">
                    <h5 class="card-title fw-bold text-main-red mb-0 pe-3" style="font-size:1rem;">{{ currentStore.name }}</h5>
                    <button class="btn btn-light btn-sm rounded-circle shadow-sm p-0 d-flex align-items-center justify-content-center flex-shrink-0"
                            style="width:24px;height:24px;" @click="activeStoreId = null">
                      <i class="bi bi-x small"></i>
                    </button>
                  </div>

                  <!-- Type badge popup -->
                  <span class="badge rounded-pill mb-3 small px-2 py-1"
                        :style="currentStore.type === 'Showroom'
                          ? 'background:#fdf1f1;color:#b31f24;border:1px solid #f5c6c8'
                          : 'background:#fff3cd;color:#856404;border:1px solid #ffeeba'">
                    <i class="bi bi-building me-1"></i>{{ currentStore.type }}
                  </span>

                  <div class="d-flex align-items-start mb-3">
                    <i class="bi bi-geo-alt-fill text-main-red fs-5 me-3 mt-1 flex-shrink-0"></i>
                    <p class="card-text text-dark mb-0 small">{{ currentStore.address }}</p>
                  </div>

                  <div class="d-flex align-items-center mb-4">
                    <i class="bi bi-clock-fill text-muted fs-6 me-3 flex-shrink-0"></i>
                    <div>
                      <span class="text-success fw-bold small me-2"><i class="bi bi-dot"></i>Đang mở cửa</span>
                      <span class="small text-muted">08:00 – 18:00 hôm nay</span>
                    </div>
                  </div>

                  <div class="d-flex gap-2">
                    <a :href="'tel:' + currentStore.phone"
                       class="btn btn-outline-red fw-semibold btn-sm flex-grow-1 py-2 rounded-pill">
                      <i class="bi bi-telephone-fill me-2"></i>Gọi ngay
                    </a>
                    <a :href="currentStore.mapLink" target="_blank"
                       class="btn btn-main-red fw-semibold btn-sm flex-grow-1 py-2 rounded-pill shadow-sm">
                      <i class="bi bi-cursor-fill me-2"></i>Google Maps
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <!-- ===================== THÔNG TIN LIÊN HỆ ===================== -->
      <div class="bg-white py-5 position-relative z-1" style="border-top:1px solid rgba(0,0,0,0.05);">
        <div class="container my-2">
          <div class="text-center mb-5">
            <h5 class="text-main-red fw-bold text-uppercase ls-2 mb-2 small">Liên hệ với chúng tôi</h5>
            <h3 class="fw-bold text-dark text-uppercase mb-3">Thông Tin Cơ Sở HORECA VN</h3>
            <div class="mx-auto bg-main-red rounded-pill mb-4" style="width:60px;height:4px;opacity:0.3;"></div>
          </div>

          <div class="row g-4 justify-content-center">
            <!-- Trụ sở chính -->
            <div class="col-md-6 col-lg-5">
              <div class="info-card h-100 rounded-4 p-4 border border-light-subtle bg-white shadow-sm hover-lift">
                <div class="d-flex align-items-center mb-4">
                  <div class="icon-circle bg-warning-subtle me-3">
                    <i class="bi bi-building-fill text-warning fs-4"></i>
                  </div>
                  <div>
                    <span class="badge bg-warning text-dark rounded-pill px-3 py-1 small fw-bold mb-1 d-block">Trụ sở chính</span>
                    <h5 class="fw-bold text-main-red mb-0" style="font-size:1rem;">Công ty HORECA VN</h5>
                  </div>
                </div>
                <ul class="list-unstyled mb-4 d-flex flex-column gap-3">
                  <li class="d-flex align-items-start gap-3">
                    <div class="icon-sm bg-red-subtle rounded-circle flex-shrink-0 mt-1"><i class="bi bi-geo-alt-fill text-main-red" style="font-size:11px;"></i></div>
                    <span class="small text-secondary">Số 15 Ngõ 495 Bạch Đằng, P. Hồng Hà, Quận Hai Bà Trưng, Hà Nội</span>
                  </li>
                  <li class="d-flex align-items-center gap-3">
                    <div class="icon-sm bg-red-subtle rounded-circle flex-shrink-0"><i class="bi bi-telephone-fill text-main-red" style="font-size:11px;"></i></div>
                    <a href="tel:0786667447" class="small fw-bold text-main-red text-decoration-none hover-red">0786 667 447</a>
                  </li>
                  <li class="d-flex align-items-center gap-3">
                    <div class="icon-sm bg-red-subtle rounded-circle flex-shrink-0"><i class="bi bi-clock-fill text-main-red" style="font-size:11px;"></i></div>
                    <span class="small text-secondary">Thứ 2 – Thứ 7: 08:00 – 18:00</span>
                  </li>
                </ul>
                <a href="https://maps.google.com/?q=15+Ngõ+495+Bạch+Đằng,+Hồng+Hà,+Hai+Bà+Trưng,+Hà+Nội"
                   target="_blank"
                   class="btn btn-main-red rounded-pill px-4 py-2 fw-semibold w-100 shadow-sm">
                  <i class="bi bi-cursor-fill me-2"></i>Xem trên Google Maps
                </a>
              </div>
            </div>

            <!-- Showroom -->
            <div class="col-md-6 col-lg-5">
              <div class="info-card h-100 rounded-4 p-4 border border-light-subtle bg-white shadow-sm hover-lift">
                <div class="d-flex align-items-center mb-4">
                  <div class="icon-circle bg-red-subtle me-3">
                    <i class="bi bi-shop-window text-main-red fs-4"></i>
                  </div>
                  <div>
                    <span class="badge bg-red-subtle text-main-red border border-red-subtle rounded-pill px-3 py-1 small fw-bold mb-1 d-block">Showroom</span>
                    <h5 class="fw-bold text-main-red mb-0" style="font-size:1rem;">Showroom Hàng Chiếu</h5>
                  </div>
                </div>
                <ul class="list-unstyled mb-4 d-flex flex-column gap-3">
                  <li class="d-flex align-items-start gap-3">
                    <div class="icon-sm bg-red-subtle rounded-circle flex-shrink-0 mt-1"><i class="bi bi-geo-alt-fill text-main-red" style="font-size:11px;"></i></div>
                    <span class="small text-secondary">47 Hàng Chiếu, P. Hoàn Kiếm, Hà Nội</span>
                  </li>
                  <li class="d-flex align-items-center gap-3">
                    <div class="icon-sm bg-red-subtle rounded-circle flex-shrink-0"><i class="bi bi-telephone-fill text-main-red" style="font-size:11px;"></i></div>
                    <a href="tel:0786667447" class="small fw-bold text-main-red text-decoration-none hover-red">0786 667 447</a>
                  </li>
                  <li class="d-flex align-items-center gap-3">
                    <div class="icon-sm bg-red-subtle rounded-circle flex-shrink-0"><i class="bi bi-clock-fill text-main-red" style="font-size:11px;"></i></div>
                    <span class="small text-secondary">Thứ 2 – Chủ nhật: 08:00 – 21:00</span>
                  </li>
                </ul>
                <a href="https://maps.google.com/?q=47+Hàng+Chiếu,+Hoàn+Kiếm,+Hà+Nội"
                   target="_blank"
                   class="btn btn-outline-red rounded-pill px-4 py-2 fw-semibold w-100">
                  <i class="bi bi-cursor-fill me-2"></i>Xem trên Google Maps
                </a>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="mt-5 pt-2 text-center">
            <div class="cta-box rounded-5 p-5 text-white shadow-lg mx-auto position-relative overflow-hidden" style="max-width:900px;">
              <div class="shape-blob shape-1"></div>
              <div class="shape-blob shape-2"></div>
              <div class="row align-items-center position-relative" style="z-index:10;">
                <div class="col-md-7 text-center text-md-start mb-4 mb-md-0">
                  <h3 class="fw-bolder mb-2">Muốn trở thành đại lý HORECA VN?</h3>
                  <p class="mb-0 opacity-90 fs-6">Liên hệ ngay để nhận chính sách ưu đãi đặc biệt dành cho đại lý phân phối.</p>
                </div>
                <div class="col-md-5 text-center text-md-end">
                  <a href="tel:0786667447"
                     class="btn btn-white fw-bold rounded-pill px-5 py-3 shadow-sm hover-scale text-main-red fs-6 d-inline-flex align-items-center gap-2">
                    <i class="bi bi-telephone-fill"></i> Gọi 0786 667 447
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCity: '',
      searchQuery: '',
      activeStoreId: 0,
      cities: ['Hà Nội'],
      stores: [
        {
          name: 'Trụ sở chính – HORECA VN',
          address: 'Số 15 Ngõ 495 Bạch Đằng, P. Hồng Hà, Quận Hai Bà Trưng, Hà Nội',
          phone: '0786667447',
          city: 'Hà Nội',
          type: 'Trụ sở chính',
          mapLink: 'https://maps.google.com/?q=Số+15+Ngõ+495+Bạch+Đằng,+Hồng+Hà,+Hai+Bà+Trưng,+Hà+Nội',
          embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5!2d105.8620!3d21.0220!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAyJzA0LjIiTiAxMDXCsDUyJzIwLjYiRQ!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s'
        },
        {
          name: 'Showroom HORECA VN – Hàng Chiếu',
          address: '47 Hàng Chiếu, P. Hoàn Kiếm, Hà Nội',
          phone: '0786667447',
          city: 'Hà Nội',
          type: 'Showroom',
          mapLink: 'https://maps.google.com/?q=47+Hàng+Chiếu,+Hoàn+Kiếm,+Hà+Nội',
          embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.924088730949!2d105.8499423154025!3d21.03572299291771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abbf5c6e7ce3%3A0xcfa0176116013235!2zNDcgUC4gSMOgbmcgQ2hp4bq_dSwgxJDhu5NuZyBYdcOibiwgSG_DoG4gS2nhur9tLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1700000000000!5m2!1svi!2s'
        }
      ]
    }
  },
  computed: {
    filteredStores() {
      return this.stores.filter(store => {
        const matchCity = this.selectedCity ? store.city === this.selectedCity : true
        const matchSearch = this.searchQuery
          ? store.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            store.address.toLowerCase().includes(this.searchQuery.toLowerCase())
          : true
        return matchCity && matchSearch
      })
    },
    currentStore() {
      if (this.filteredStores.length > 0 && this.activeStoreId !== null) {
        return this.filteredStores[this.activeStoreId] || this.filteredStores[0]
      }
      return this.stores[0]
    }
  },
  methods: {
    selectStore(index) {
      this.activeStoreId = index
    },
    resetFilter() {
      this.selectedCity = ''
      this.searchQuery = ''
    }
  }
}
</script>

<style scoped>
/* ══════════════════════════════════════════════════════════════
   VARIABLES & BASE
══════════════════════════════════════════════════════════════ */
:root {
  --main-red: #b31f24;
  --main-red-dark: #8a181c;
  --red-subtle: #fdf1f1;
  --cream-light: #fff8f8;
}

.font-general, .font-primary { font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
.bg-cream-light    { background-color: #fff8f8 !important; }
.text-main-red     { color: #b31f24 !important; }
.bg-main-red       { background-color: #b31f24 !important; }
.bg-red-subtle     { background-color: #fdf1f1 !important; }
.border-red-subtle { border-color: #f5c6c8 !important; }
.ls-1 { letter-spacing: 1px; }
.ls-2 { letter-spacing: 2px; }
.cursor-pointer { cursor: pointer; }
.transition-all { transition: all 0.3s ease; }
.h-2 { height: 4px; }

/* ══════════════════════════════════════════════════════════════
   SHADOWS & HOVER
══════════════════════════════════════════════════════════════ */
.premium-shadow {
  box-shadow: 0 10px 30px -5px rgba(179, 31, 36, 0.1),
              0 4px 12px -2px rgba(0, 0, 0, 0.05);
}
.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 2rem rgba(179, 31, 36, 0.1) !important;
  border-color: #f5c6c8 !important;
}
.hover-scale:hover { transform: scale(1.03); }
.hover-red:hover   { color: #b31f24 !important; }

/* ══════════════════════════════════════════════════════════════
   BUTTONS
══════════════════════════════════════════════════════════════ */
.btn-main-red {
  background-color: #b31f24;
  color: #fff;
  border: none;
  transition: 0.25s;
}
.btn-main-red:hover {
  background-color: #8a181c;
  color: #fff;
  box-shadow: 0 4px 14px rgba(179, 31, 36, 0.35);
}
.btn-outline-red {
  color: #b31f24;
  border: 1.5px solid #b31f24;
  background: transparent;
  transition: 0.25s;
}
.btn-outline-red:hover {
  background-color: #b31f24;
  color: #fff;
}
.btn-white {
  background-color: #fff;
  color: #b31f24;
  border: none;
  transition: 0.25s;
}
.btn-white:hover { background-color: #f8f9fa; }

/* ══════════════════════════════════════════════════════════════
   FORM
══════════════════════════════════════════════════════════════ */
.form-control:focus,
.form-select:focus {
  border-color: #b31f24;
  box-shadow: 0 0 0 0.25rem rgba(179, 31, 36, 0.15);
}

/* ══════════════════════════════════════════════════════════════
   PAGE HEADER BG
══════════════════════════════════════════════════════════════ */
.page-header-bg {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 400px;
  background-image: radial-gradient(#b31f24 0.5px, transparent 0.5px);
  background-size: 20px 20px;
  opacity: 0.04;
  z-index: 0;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0));
}
.separator-line {
  height: 1px; width: 60px; display: inline-block;
}

/* ══════════════════════════════════════════════════════════════
   STORE LIST
══════════════════════════════════════════════════════════════ */
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #f5c6c8; border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e8a0a3; }

.icon-square {
  width: 48px; height: 48px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.icon-circle {
  width: 52px; height: 52px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.icon-sm {
  width: 22px; height: 22px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.store-marker {
  width: 28px; height: 28px; font-size: 12px;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.scale-up { transform: scale(1.12); }

.store-item-card:hover {
  border-color: #f5c6c8 !important;
  box-shadow: 0 4px 14px rgba(179, 31, 36, 0.06);
}
.store-item-card.active-store-card {
  background-color: #fff5f5 !important;
  border-color: #b31f24 !important;
}
.active-store-card .store-marker {
  box-shadow: 0 4px 10px rgba(179, 31, 36, 0.3) !important;
}

/* ══════════════════════════════════════════════════════════════
   MAP
══════════════════════════════════════════════════════════════ */
.map-container::after {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  box-shadow: inset 3px 0 10px -5px rgba(0,0,0,0.1);
  pointer-events: none; z-index: 5;
}

@keyframes popIn {
  0%   { opacity: 0; transform: scale(0.9) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-pop-in {
  animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* ══════════════════════════════════════════════════════════════
   INFO CARDS
══════════════════════════════════════════════════════════════ */
.info-card {
  transition: all 0.3s ease;
}

/* ══════════════════════════════════════════════════════════════
   CTA BOX
══════════════════════════════════════════════════════════════ */
.cta-box {
  background: linear-gradient(110deg, #8a181c 0%, #b31f24 60%, #d44249 100%);
  position: relative;
}
.shape-blob {
  position: absolute; border-radius: 50%;
  filter: blur(60px); opacity: 0.3; pointer-events: none;
}
.shape-1 {
  width: 280px; height: 280px;
  background: rgba(255,255,255,0.3);
  top: -100px; left: -80px;
}
.shape-2 {
  width: 220px; height: 220px;
  background: rgba(255,200,200,0.4);
  bottom: -60px; right: -40px;
}

/* ══════════════════════════════════════════════════════════════
   RESPONSIVE — TABLET (≤991px)
══════════════════════════════════════════════════════════════ */
@media (max-width: 991px) {
  /* Layout chính: stack dọc thay vì 2 cột */
  .row.g-0.premium-shadow { flex-direction: column; }

  /* Danh sách cơ sở */
  .col-lg-4 { border-right: none !important; border-bottom: 1px solid #f5e0e0; }
  .store-list-container { max-height: 340px; }

  /* Bản đồ */
  .col-lg-8 { min-height: 380px; }
  .map-container { height: 380px; }

  /* Info popup ẩn trên tablet nhỏ, hiện nổi bật hơn */
  .animate-pop-in { max-width: 100% !important; min-width: unset !important; margin: 12px !important; }
}

/* ══════════════════════════════════════════════════════════════
   RESPONSIVE — MOBILE (≤768px)
══════════════════════════════════════════════════════════════ */
@media (max-width: 768px) {
  /* ── Wrapper ── */
  .store-page-wrapper { background-color: #fff8f8; }

  /* ── Header / Title ── */
  .display-5 { font-size: 1.5rem !important; }
  .lead { font-size: .875rem !important; }
  .separator-line { width: 30px; }
  .container-fluid { padding-left: 16px !important; padding-right: 16px !important; }
  .pt-4 { padding-top: 20px !important; }
  .mb-5 { margin-bottom: 24px !important; }

  /* ── Card chính ── */
  .premium-shadow {
    border-radius: 0 !important;
    box-shadow: none !important;
    border: none !important;
  }

  /* ── Panel trái: filter + danh sách ── */
  .col-lg-4 { border-bottom: 3px solid #fdf1f1 !important; }

  .p-4 { padding: 16px !important; }

  /* Header filter */
  .icon-square { width: 40px; height: 40px; }
  .icon-square .bi { font-size: 1.1rem !important; }

  /* Form inputs */
  .form-select,
  .form-control { font-size: .875rem; padding: 10px 12px; }

  /* Count bar */
  .px-4.py-2 { padding: 8px 16px !important; }

  /* Store list */
  .store-list-container {
    max-height: 300px;
    padding: 10px !important;
  }

  /* Store card */
  .store-item-card { padding: 12px !important; border-radius: 12px !important; margin-bottom: 10px !important; }
  .store-marker { width: 24px; height: 24px; font-size: 11px; }
  .store-item-card h6 { font-size: .82rem !important; }
  .store-item-card .small { font-size: .75rem !important; }
  .store-item-card .badge { font-size: .68rem !important; }

  /* Nút chỉ đường trong card */
  .store-item-card .btn-sm { padding: 4px 12px; font-size: .75rem; }

  /* ── Bản đồ ── */
  .col-lg-8 { min-height: 260px; }
  .map-container { height: 260px; }

  /* Info popup — ẩn trên mobile (có thông tin ở phần dưới rồi) */
  .animate-pop-in { display: none !important; }

  /* ── Phần thông tin liên hệ ── */
  .bg-white.py-5 { padding-top: 32px !important; padding-bottom: 32px !important; }
  .bg-white.py-5 h3 { font-size: 1.2rem !important; }
  .bg-white.py-5 h5.small { font-size: .7rem !important; }

  .info-card { padding: 16px !important; border-radius: 14px !important; }
  .icon-circle { width: 42px; height: 42px; }
  .icon-circle .bi { font-size: 1.1rem !important; }
  .info-card h5 { font-size: .9rem !important; }
  .info-card .small { font-size: .8rem !important; }
  .info-card .btn { font-size: .82rem; padding: 10px 16px; }

  /* ── CTA ── */
  .cta-box {
    border-radius: 20px !important;
    padding: 28px 20px !important;
    text-align: center;
  }
  .cta-box h3 { font-size: 1.15rem !important; }
  .cta-box p  { font-size: .82rem !important; }
  .cta-box .btn-white { padding: 12px 28px; font-size: .875rem; width: 100%; justify-content: center; }
  .shape-1 { width: 160px; height: 160px; top: -60px; left: -50px; }
  .shape-2 { width: 130px; height: 130px; bottom: -40px; right: -30px; }
}

/* ══════════════════════════════════════════════════════════════
   RESPONSIVE — SMALL MOBILE (≤480px)
══════════════════════════════════════════════════════════════ */
@media (max-width: 480px) {
  .display-5 { font-size: 1.25rem !important; }

  /* Header filter: icon + title gọn hơn */
  .d-flex.align-items-center.mb-4 .icon-square { display: none; }

  /* Store list cao hơn vì không có map popup */
  .store-list-container { max-height: 260px; }

  /* Map nhỏ lại */
  .map-container { height: 220px; }
  .col-lg-8 { min-height: 220px; }

  /* Info cards stack full width */
  .col-md-6 { padding: 0 !important; }
  .info-card { border-radius: 12px !important; }

  /* CTA */
  .cta-box { padding: 24px 16px !important; border-radius: 16px !important; }
  .cta-box h3 { font-size: 1rem !important; }
}
</style>
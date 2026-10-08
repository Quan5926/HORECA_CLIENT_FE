<template>
  <div class="muoi-himalaya-page-wrapper font-general bg-light">
    <main class="main-content pb-5">
      <div class="container-fluid px-lg-5">

        <nav aria-label="breadcrumb" class="py-3 mt-2">
          <ol class="breadcrumb mb-0 small text-dark">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-decoration-none text-muted">
                <i class="bi bi-house-door-fill me-1"></i>Trang chủ
              </router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/san-pham" class="text-decoration-none text-muted">Sản phẩm</router-link>
            </li>
            <li class="breadcrumb-item active text-shopee fw-bold" aria-current="page">{{ categoryName }}</li>
          </ol>
        </nav>

        <section v-if="categoryBanners.length > 0" class="category-banner-wrapper mb-4 mt-2">
          <div id="categoryCarousel" class="carousel slide rounded-1 overflow-hidden shadow-sm position-relative" data-bs-ride="carousel" data-bs-interval="5000">
            <div class="carousel-indicators">
              <button v-for="(banner, index) in categoryBanners" :key="'cat-ind-' + banner.id"
                      type="button" data-bs-target="#categoryCarousel" :data-bs-slide-to="index"
                      :class="{ active: index === 0 }"></button>
            </div>
            <div class="carousel-inner">
              <div v-for="(banner, index) in categoryBanners" :key="banner.id"
                   :class="['carousel-item', { active: index === 0 }]">
                <router-link :to="banner.lienKet || '#'" class="d-block position-relative w-100 h-100">
                  <img :src="getMainImage(banner.duongDanAnh)" class="d-block w-100 object-fit-cover banner-img"
                       :alt="banner.tieuDe || 'Banner'">
                  <div v-if="banner.tieuDe || banner.moTa"
                       class="animated-caption position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center p-md-5 p-3">
                    <div class="col-md-8 col-lg-6">
                      <h2 class="text-white fw-bold display-5 text-shadow animate-title">{{ banner.tieuDe }}</h2>
                      <p class="text-white fs-5 text-shadow animate-desc mt-3">{{ banner.moTa }}</p>
                      <button v-if="banner.tieuDe" class="btn btn-warning mt-3 px-4 py-2 fw-bold animate-btn">Xem Ngay</button>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#categoryCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#categoryCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </section>

        <div class="row g-3">

          <!-- ══ SIDEBAR ══ -->
          <aside class="col-lg-2-5 d-none d-lg-block">
            <div class="filter-sidebar bg-white p-3 rounded-2 shadow-sm">

              <div class="filter-section mb-4">
                <h6 class="filter-title text-uppercase mb-3 fw-bold">
                  <i class="bi bi-list-ul me-2"></i>Tất Cả Danh Mục
                </h6>

                <div class="accordion accordion-flush shopee-category-accordion" id="categorySidebarAcc">

                  <!-- Tất cả sản phẩm -->
                  <div class="accordion-item border-0 bg-transparent">
                    <router-link
                      to="/san-pham"
                      class="category-item d-flex justify-content-between align-items-center"
                      :class="{ 'active': !route.params.slug }"
                    >
                      <span>Tất cả sản phẩm</span>
                    </router-link>
                  </div>

                  <!-- Danh mục cấp 1 -->
                  <div v-for="cat in allCategories" :key="cat.id" class="accordion-item border-0 bg-transparent mb-1">

                    <!-- Cấp 1 không có con → link thẳng -->
                    <router-link
                      v-if="!cat.children || cat.children.length === 0"
                      :to="`/san-pham/${createSlug(cat.tenDanhMuc || cat.name)}`"
                      class="category-item d-flex justify-content-between align-items-center"
                      :class="{ 'active': route.params.slug === createSlug(cat.tenDanhMuc || cat.name) }"
                    >
                      <span>{{ cat.tenDanhMuc || cat.name }}</span>
                      <span class="text-muted small">({{ cat.count || 0 }})</span>
                    </router-link>

                    <!-- Cấp 1 có con → link + chevron tách riêng -->
                    <template v-else>
                      <div class="d-flex align-items-center">
                        <router-link
                          :to="`/san-pham/${createSlug(cat.tenDanhMuc || cat.name)}`"
                          class="category-item flex-grow-1"
                          :class="{ 'active': route.params.slug === createSlug(cat.tenDanhMuc || cat.name) }"
                        >
                          {{ cat.tenDanhMuc || cat.name }}
                        </router-link>
                        <span
                          class="chevron-toggle px-2 py-1 cursor-pointer"
                          data-bs-toggle="collapse"
                          :data-bs-target="'#sidebarCat' + cat.id"
                        >
                          <i class="bi bi-chevron-down small cat-chevron"
                            :class="{ 'rotated': isCategoryActive(cat) }"></i>
                        </span>
                      </div>

                      <!-- Accordion cấp 2 -->
                      <div
                        :id="'sidebarCat' + cat.id"
                        class="accordion-collapse collapse"
                        :class="{ 'show': isCategoryActive(cat) }"
                        data-bs-parent="#categorySidebarAcc"
                      >
                        <div class="accordion-body p-0 ps-3">

                          <template v-for="child in cat.children" :key="child.id">

                            <!-- Cấp 2 không có con → link thẳng -->
                            <router-link
                              v-if="!child.children || child.children.length === 0"
                              :to="`/san-pham/${createSlug(child.tenDanhMuc || child.name)}`"
                              class="category-item category-child-item d-flex justify-content-between align-items-center text-muted"
                              :class="{ 'active-child text-shopee fw-bold': route.params.slug === createSlug(child.tenDanhMuc || child.name) }"
                            >
                              <span>{{ child.tenDanhMuc || child.name }}</span>
                              <span class="small">({{ child.count || 0 }})</span>
                            </router-link>

                            <!-- Cấp 2 có con → link + chevron tách riêng -->
                            <template v-else>
                              <div class="d-flex align-items-center">
                                <router-link
                                  :to="`/san-pham/${createSlug(child.tenDanhMuc || child.name)}`"
                                  class="category-item category-child-item flex-grow-1 text-muted"
                                  :class="{ 'active-child text-shopee fw-bold': route.params.slug === createSlug(child.tenDanhMuc || child.name) }"
                                >
                                  {{ child.tenDanhMuc || child.name }}
                                </router-link>
                                <span
                                  class="chevron-toggle px-2 py-1 cursor-pointer"
                                  data-bs-toggle="collapse"
                                  :data-bs-target="'#sidebarChild' + child.id"
                                >
                                  <i class="bi bi-chevron-down small child-chevron"
                                    :class="{ 'rotated': isChildActive(child) }"></i>
                                </span>
                              </div>

                              <!-- Accordion cấp 3 -->
                              <div
                                :id="'sidebarChild' + child.id"
                                class="accordion-collapse collapse ps-2"
                                :class="{ 'show': isChildActive(child) }"
                              >
                                <router-link
                                  v-for="grand in child.children" :key="grand.id"
                                  :to="`/san-pham/${createSlug(grand.tenDanhMuc || grand.name)}`"
                                  class="category-item category-child-item d-flex justify-content-between align-items-center text-muted"
                                  :class="{ 'active-child text-shopee fw-bold': route.params.slug === createSlug(grand.tenDanhMuc || grand.name) }"
                                >
                                  <span>{{ grand.tenDanhMuc || grand.name }}</span>
                                  <span class="small">({{ grand.count || 0 }})</span>
                                </router-link>
                              </div>

                            </template>

                          </template>

                        </div>
                      </div>
                    </template>

                  </div>
                </div>
              </div>

              <!-- Bộ lọc -->
              <div class="filter-section border-top pt-4">
                <h6 class="filter-title text-uppercase mb-3 fw-bold">
                  <i class="bi bi-funnel me-2"></i>BỘ LỌC TÌM KIẾM
                </h6>

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
                    <div class="form-check cursor-pointer">
                      <input class="form-check-input shopee-radio" type="radio"
                             name="ratingFilter" id="starAll" :value="null"
                             v-model="filters.rating" @change="applyFilters">
                      <label class="form-check-label cursor-pointer" for="starAll">
                        <span class="small text-muted">Tất cả</span>
                      </label>
                    </div>
                    <div class="form-check cursor-pointer" v-for="star in [5, 4, 3, 2, 1]" :key="star">
                      <input class="form-check-input shopee-radio" type="radio"
                             name="ratingFilter" :id="'star'+star"
                             :value="star" v-model="filters.rating" @change="applyFilters">
                      <label class="form-check-label cursor-pointer d-flex align-items-center gap-1" :for="'star'+star">
                        <div class="rating-stars text-warning">
                          <i v-for="n in 5" :key="n" :class="n <= star ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                        </div>
                        <span class="small text-muted" v-if="star < 5">trở lên</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="filter-group mb-4 border-top pt-3">
                  <p class="filter-subtitle mb-2 text-muted small fw-bold">Đơn Vị Vận Chuyển</p>
                  <div class="form-check mb-2" v-for="(shipping, i) in shippingMethods" :key="i">
                    <input class="form-check-input shopee-checkbox" type="checkbox"
                           :id="'ship'+i" :value="shipping.id"
                           v-model="filters.shipping" @change="applyFilters">
                    <label class="form-check-label small cursor-pointer text-muted" :for="'ship'+i">{{ shipping.name }}</label>
                  </div>
                </div>

                <button @click="resetFilters" class="btn btn-outline-secondary btn-sm w-100 text-uppercase border-radius-2 shadow-none mt-2 fw-medium">Xóa tất cả</button>
              </div>

            </div>
          </aside>

          <!-- ══ CONTENT ══ -->
          <div class="col-lg-9-5">

            <div class="shopee-sort-bar bg-white p-3 mb-3 rounded-2 shadow-sm">
  <div class="d-flex align-items-center gap-2 flex-wrap">
    <span class="text-secondary small me-1 d-none d-md-inline">Sắp xếp theo</span>
    <button @click="setSort('newest')" :class="['btn btn-sm px-3 border-radius-2 shadow-none', sortBy === 'newest' ? 'btn-shopee-primary' : 'btn-white']">Mới nhất</button>
    <button @click="setSort('bestseller')" :class="['btn btn-sm px-3 border-radius-2 shadow-none', sortBy === 'bestseller' ? 'btn-shopee-primary' : 'btn-white']">Bán chạy</button>
    <div class="dropdown">
      <button :class="['btn btn-sm dropdown-toggle px-3 border-radius-2 shadow-none d-flex align-items-center gap-1', sortBy.includes('price') ? 'btn-shopee-primary' : 'btn-white']" data-bs-toggle="dropdown">
        {{ sortLabel }}
      </button>
      <ul class="dropdown-menu shadow-sm border-0 small border-radius-2 mt-1">
        <li><a class="dropdown-item py-2" href="#" @click.prevent="setSort('price_asc')">Giá: Thấp → Cao</a></li>
        <li><a class="dropdown-item py-2" href="#" @click.prevent="setSort('price_desc')">Giá: Cao → Thấp</a></li>
      </ul>
    </div>
    <div class="d-lg-none d-flex gap-2 ms-auto">
      <button class="filter-icon-btn" @click="showMobileCatFilter = true">
        <i class="bi bi-list-ul"></i>
      </button>
      <button class="filter-icon-btn" @click="showMobileSearchFilter = true">
        <i class="bi bi-sliders"></i>
        <span v-if="hasActiveFilters" class="filter-icon-dot"></span>
      </button>
    </div>
    <div class="d-none d-lg-flex align-items-center gap-2 small ms-auto">
      <span class="text-muted">Trang</span>
      <span class="text-shopee fw-bold">{{ currentPage }}</span>
      <span class="text-muted">/ {{ totalPages }}</span>
      <div class="btn-group shadow-sm ms-1">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="btn btn-sm btn-white border-end"><i class="bi bi-chevron-left"></i></button>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="btn btn-sm btn-white"><i class="bi bi-chevron-right"></i></button>
      </div>
    </div>
  </div>
</div>

            <div v-if="isLoading" class="text-center py-5">
              <div class="spinner-border text-shopee" style="width: 3rem; height: 3rem;" role="status"></div>
            </div>
            <div v-else-if="products.length === 0" class="text-center py-5 bg-white rounded shadow-sm">
              <i class="bi bi-search fs-1 text-muted opacity-25"></i>
              <h6 class="text-secondary mt-3">Không tìm thấy sản phẩm nào phù hợp</h6>
            </div>

            <div v-else class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 mt-2">
              <div class="col" v-for="product in products" :key="product.id">
                <div class="product-item card h-100 bg-white text-decoration-none border-radius-2 position-relative">

                  <!-- MỚI -->
<div v-if="(flashSaleMap.get(product.id)?.discount || product.giamGia) && !product.lienHe" class="shopee-discount-badge">
  <span class="percent">{{ flashSaleMap.get(product.id)?.discount || product.giamGia }}%</span>
  <span class="label">GIẢM</span>
</div>

                  <router-link :to="`/san-pham/chi-tiet/${product.id}`" class="product-img-wrapper position-relative overflow-hidden d-flex align-items-center justify-content-center bg-light">
                    <img :src="getProductImage(product)" class="img-fluid w-100 h-100 object-fit-cover" :alt="product.tenSanPham">
                  </router-link>

                  <div class="card-body p-3 d-flex flex-column text-center">
                    <router-link :to="`/san-pham/chi-tiet/${product.id}`" class="text-decoration-none">
                      <div class="product-category-label">{{ categoryName }}</div>
                      <div class="product-name text-dark mb-2" :title="product.tenSanPham">{{ product.tenSanPham }}</div>
                    </router-link>

                    <div class="d-flex gap-1 flex-wrap justify-content-center mt-1 mb-2">
                      <span v-if="product.daBan >= 100" class="badge-custom badge-hot">Bán chạy</span>
                      <span v-if="product.giamGia >= 30" class="badge-custom badge-cheap">Siêu rẻ</span>
                    </div>

                    <div class="mt-auto">
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
                     <!-- MỚI -->
<template v-else>
  <div class="price-shopee mb-2 justify-content-center flex-column align-items-center">
    <span class="amount fw-bold">
      {{ formatPrice(flashSaleMap.get(product.id)?.salePrice || product.giaBan) }}đ
    </span>
    <span v-if="flashSaleMap.get(product.id)"
      class="text-muted text-decoration-line-through"
      style="font-size: 0.78rem;">
      {{ formatPrice(flashSaleMap.get(product.id).originalPrice) }}đ
    </span>
  </div>
</template>

                      <div class="rating-stars text-warning mb-1" style="font-size: 0.75rem;">
                        <i v-for="n in 5" :key="n" :class="n <= (product.diemDanhGia || 0) ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                      </div>
                      <span class="text-muted d-block mb-3" style="font-size: 0.8rem;">Đã bán {{ formatSoldCount(product) }}</span>

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

            <nav v-if="products.length > 0 && totalPages > 1" class="mt-5 mb-4 d-flex justify-content-center">
              <ul class="pagination shopee-pagination mb-0 gap-2">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <button class="page-link" @click="changePage(currentPage - 1)"><i class="bi bi-chevron-left"></i></button>
                </li>
                <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                  <button class="page-link" @click="changePage(page)">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <button class="page-link" @click="changePage(currentPage + 1)"><i class="bi bi-chevron-right"></i></button>
                </li>
              </ul>
            </nav>

          </div>
        </div>
      </div>
    </main>

    <!-- ══ POPUP BIẾN THỂ ══ -->
    <Teleport to="body">
      <div v-if="variantModal.show" class="variant-modal-overlay" @click.self="variantModal.show = false">
        <div class="variant-modal">
          <div class="variant-modal-header">
            <img :src="getProductImage(variantModal.product)" class="variant-modal-img">
            <div class="variant-modal-info">
  <div class="variant-modal-name">{{ variantModal.product?.tenSanPham }}</div>
  <div class="variant-modal-price text-shopee fw-bold fs-5">
    <span class="small text-decoration-underline me-1">đ</span>
    {{ selectedVariant ? formatPrice(selectedVariant.giaBan) : formatPrice(variantModal.product?.giaBan) }}
    <!-- Thêm phần này -->
    <span v-if="selectedVariant?.flashPercent > 0"
      class="text-muted text-decoration-line-through ms-2"
      style="font-size:0.85rem;">
      {{ formatPrice(selectedVariant.giaBanGoc) }}đ
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
              <div class="qty-control d-flex align-items-center gap-0">
                <button @click="variantModal.qty = Math.max(1, variantModal.qty - 1)" class="qty-btn">−</button>
                <input type="number" v-model.number="variantModal.qty" min="1" :max="selectedVariant?.tonKho ?? 99" class="qty-input">
                <button @click="variantModal.qty++" class="qty-btn">+</button>
              </div>
            </div>
          </div>
          <div class="variant-modal-footer">
            <button @click="variantModal.show = false" class="btn btn-outline-secondary flex-1">Hủy</button>
            <button @click="confirmAddToCart" :disabled="!selectedVariant || isAddingToCart"
              class="btn btn-shopee-primary flex-1 fw-bold">
              <span v-if="isAddingToCart"><span class="spinner-border spinner-border-sm me-1"></span>Đang thêm...</span>
              <span v-else><i class="bi bi-cart-plus me-1"></i>Thêm vào giỏ</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
    
    <ContactPopup
      :show="contactPopup.show"
      :phone="contactPopup.phone"
      :zalo="contactPopup.zalo"
      @close="contactPopup.show = false"
    />
    <!-- MOBILE CATEGORY POPUP -->
<teleport to="body">
  <transition name="filter-slide">
    <div v-if="showMobileCatFilter" class="mobile-filter-backdrop" @click.self="showMobileCatFilter = false">
      <div class="mobile-filter-panel">
        <div class="mfp-header">
          <span class="mfp-title"><i class="bi bi-list-ul me-2"></i>Danh mục sản phẩm</span>
          <button class="mfp-close" @click="showMobileCatFilter = false"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="mfp-body">
          <div class="mfp-cat-list">

            <!-- Tất cả -->
            <router-link
              to="/san-pham"
              class="mfp-cat-item"
              :class="{ 'mfp-cat-item--active': !route.params.slug }"
              @click="showMobileCatFilter = false"
            >
              <i class="bi bi-grid me-2"></i>Tất cả sản phẩm
            </router-link>

            <template v-for="cat in allCategories" :key="cat.id">

              <!-- CẤP 1 -->
              <div class="mfp-cat-group">
                <div class="mfp-cat-row">
                  <router-link
                    :to="`/san-pham/${createSlug(cat.tenDanhMuc || cat.name)}`"
                    class="mfp-cat-item mfp-cat-item--parent flex-grow-1"
                    :class="{ 'mfp-cat-item--active': route.params.slug === createSlug(cat.tenDanhMuc || cat.name) }"
                    @click="showMobileCatFilter = false"
                  >
                    <i class="bi bi-tag me-2"></i>{{ cat.tenDanhMuc || cat.name }}
                  </router-link>
                  <button v-if="cat.children && cat.children.length"
                    class="mfp-chevron-btn"
                    @click.stop="toggleMobileCat(cat.id)"
                  >
                    <i class="bi bi-chevron-down"
                       :class="{ 'rotated': openMobileCats.has(cat.id) }"></i>
                  </button>
                </div>

                <!-- CẤP 2 -->
                <div v-if="cat.children && cat.children.length && openMobileCats.has(cat.id)"
                     class="mfp-sub-list">
                  <template v-for="child in cat.children" :key="child.id">

                    <div class="mfp-cat-row">
                      <router-link
                        :to="`/san-pham/${createSlug(child.tenDanhMuc || child.name)}`"
                        class="mfp-cat-item mfp-cat-item--child flex-grow-1"
                        :class="{ 'mfp-cat-item--active': route.params.slug === createSlug(child.tenDanhMuc || child.name) }"
                        @click="showMobileCatFilter = false"
                      >
                        <span class="mfp-cat-dot"></span>{{ child.tenDanhMuc || child.name }}
                      </router-link>
                      <button v-if="child.children && child.children.length"
                        class="mfp-chevron-btn"
                        @click.stop="toggleMobileChild(child.id)"
                      >
                        <i class="bi bi-chevron-down"
                           :class="{ 'rotated': openMobileChildren.has(child.id) }"></i>
                      </button>
                    </div>

                    <!-- CẤP 3 -->
                    <div v-if="child.children && child.children.length && openMobileChildren.has(child.id)"
                         class="mfp-sub-list">
                      <router-link
                        v-for="grand in child.children" :key="grand.id"
                        :to="`/san-pham/${createSlug(grand.tenDanhMuc || grand.name)}`"
                        class="mfp-cat-item mfp-cat-item--grand"
                        :class="{ 'mfp-cat-item--active': route.params.slug === createSlug(grand.tenDanhMuc || grand.name) }"
                        @click="showMobileCatFilter = false"
                      >
                        <span class="mfp-cat-dot mfp-cat-dot--grand"></span>{{ grand.tenDanhMuc || grand.name }}
                      </router-link>
                    </div>

                  </template>
                </div>
              </div>

            </template>
          </div>
        </div>
      </div>
    </div>
  </transition>
</teleport>

<!-- MOBILE SEARCH FILTER POPUP -->
<teleport to="body">
  <transition name="filter-slide">
    <div v-if="showMobileSearchFilter" class="mobile-filter-backdrop" @click.self="showMobileSearchFilter = false">
      <div class="mobile-filter-panel">
        <div class="mfp-header">
          <span class="mfp-title"><i class="bi bi-sliders me-2"></i>Bộ lọc tìm kiếm</span>
          <button class="mfp-close" @click="showMobileSearchFilter = false"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="mfp-body">

          <!-- Giá -->
          <div class="mfp-section">
            <p class="mfp-label">Khoảng giá</p>
            <div class="mfp-price-row">
              <input type="number" v-model="filters.minPrice" class="mfp-price-input" placeholder="Từ" />
              <span class="mfp-price-sep">—</span>
              <input type="number" v-model="filters.maxPrice" class="mfp-price-input" placeholder="Đến" />
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
        <div class="mfp-footer">
          <button class="mfp-btn-reset" @click="resetFilters(); showMobileSearchFilter = false">Xóa tất cả</button>
          <button class="mfp-btn-apply" @click="applyFilters(); showMobileSearchFilter = false">Áp dụng</button>
        </div>
      </div>
    </div>
  </transition>
</teleport>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { cartState } from '@/services/cartStore'; 
import { API_BASE } from '@/config/api'
import ContactPopup from '@/components/ContactPopup.vue';
const contactPopup = ref({ show: false, phone: '', zalo: '' });
const openContact = (product) => {
  contactPopup.value = {
    show: true,
    phone: product.soDienThoai || '',
    zalo: product.zaloLink || '',
  };
};
const route = useRoute();
const router = useRouter();
// ── VARIANT MODAL ──
const variantModal = reactive({ show: false, product: null, qty: 1 })
const selectedColor = ref(null)
const selectedSize = ref(null)
const isAddingToCart = ref(false)
const showMobileCatFilter = ref(false)
const showMobileSearchFilter = ref(false)
const openMobileCats = ref(new Set())
const openMobileChildren = ref(new Set())

const toggleMobileCat = (id) => {
  const next = new Set(openMobileCats.value)
  next.has(id) ? next.delete(id) : next.add(id)
  openMobileCats.value = next
}
const toggleMobileChild = (id) => {
  const next = new Set(openMobileChildren.value)
  next.has(id) ? next.delete(id) : next.add(id)
  openMobileChildren.value = next
}
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
  // Reset size nếu combo màu+size hiện tại không tồn tại
  if (selectedSize.value && !isSizeAvailable(selectedSize.value)) {
    selectedSize.value = null
  }
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
    variantModal.show = false
    alert('Thêm vào giỏ hàng thành công!')
  } catch (e) {
    alert('Lỗi: ' + (e.response?.data?.message || 'Không thể thêm vào giỏ'))
  } finally {
    isAddingToCart.value = false
  }
}
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
const products = ref([]);
// ── FLASH SALE ──
const flashSaleMap = ref(new Map()); // productId → { discount, salePrice, originalPrice }
const categoryName = ref('Tất cả sản phẩm');
const isLoading = ref(true);
const allCategories = ref([]); 
const categoryBanners = ref([]); 

const currentPage = ref(1);
const totalPages = ref(1);

const shippingMethods = ref([
  { id: 'hoatoc', name: 'Hỏa tốc' },
  { id: 'nhanh', name: 'Nhanh' },
  { id: 'tietkiem', name: 'Tiết kiệm' }
]);

const sortBy = ref('newest');
const sortLabel = computed(() => {
  if(sortBy.value === 'price_asc') return 'Giá: Thấp đến Cao';
  if(sortBy.value === 'price_desc') return 'Giá: Cao đến Thấp';
  return 'Giá';
});

const filters = reactive({
  minPrice: null,
  maxPrice: null,
  rating: null,
  shipping: []
});

const hasActiveFilters = computed(() =>
  !!filters.minPrice || !!filters.maxPrice || !!filters.rating
)

const apiClient = axios.create({
 baseURL: `${API_BASE}/api`,
  timeout: 10000,
});

const formatPrice = (price) => {
  if (!price) return '0';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const getSoldCount = (product) => {
  if (!product) return 0;
  if (product.daBan) return product.daBan;
  if (product.soLuongDaBan) return product.soLuongDaBan;
  if (product.tongDaBan) return product.tongDaBan;
  if (product.chiTietSanPhams && Array.isArray(product.chiTietSanPhams)) {
    return product.chiTietSanPhams.reduce((sum, item) => {
      return sum + (item.daBan || item.soLuongDaBan || 0);
    }, 0);
  }
  return 0;
};

const formatSoldCount = (product) => {
  const count = getSoldCount(product);
  return formatNumber(count);
};

const formatNumber = (num) => {
  if (!num) return 0;
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num;
};

const createSlug = (text) => {
  if (!text) return '';
  return text.toString().toLowerCase()
    .replace(/[áàảãạăắằẳẵặâấầẩẫậ]/g, 'a').replace(/[éèẻẽẹêếềểễệ]/g, 'e')
    .replace(/[iíìỉĩị]/g, 'i').replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, 'o')
    .replace(/[úùủũụưứừửữự]/g, 'u').replace(/[ýỳỷỹỵ]/g, 'y').replace(/đ/g, 'd')
    .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+|-+$/g, '');       
};

const getProductImage = (product) => {
  let path = product.anhSanPham || product.anhChinh || (product.danhSachAnh && product.danhSachAnh.length > 0 ? product.danhSachAnh[0] : null);
  
  if (!path) return 'https://placehold.co/400x400?text=No+Image';
  if (path.startsWith('http') || path.startsWith('blob:')) return path;
  if (path.startsWith('/uploads/')) return `${API_BASE}${path}`;
  return `${API_BASE}/uploads/${path}`;
};

const getMainImage = (imgString) => {
  if (!imgString) return 'https://placehold.co/800x400?text=No+Image';
  if (imgString.startsWith('http') || imgString.startsWith('data:image')) return imgString;
  if (imgString.startsWith('/uploads/')) return `${API_BASE}${imgString}`;
  return `${API_BASE}/uploads/${imgString}`;
};

// Hàm kiểm tra xem danh mục cha có đang được active (mở xổ xuống) hay không
const isCategoryActive = (parentCat) => {
  const currentSlug = route.params.slug;
  if (!currentSlug) return false;
  if (currentSlug === createSlug(parentCat.tenDanhMuc || parentCat.name)) return true;
  if (parentCat.children && parentCat.children.length > 0) {
    return parentCat.children.some(child => {
      if (currentSlug === createSlug(child.tenDanhMuc || child.name)) return true;
      if (child.children && child.children.length > 0) {
        return child.children.some(g =>
          currentSlug === createSlug(g.tenDanhMuc || g.name)
        );
      }
      return false;
    });
  }
  return false;
};


const isChildActive = (childCat) => {
  const currentSlug = route.params.slug;
  if (!currentSlug) return false;
  if (currentSlug === createSlug(childCat.tenDanhMuc || childCat.name)) return true;
  if (childCat.children && childCat.children.length > 0) {
    return childCat.children.some(g =>
      currentSlug === createSlug(g.tenDanhMuc || g.name)
    );
  }
  return false;
};

const fetchCategoryBanners = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/banners/public?viTri=CATEGORY_DETAIL`)
    if (response.data) categoryBanners.value = response.data.sort((a, b) => (a.thuTu || 0) - (b.thuTu || 0));
  } catch (error) { categoryBanners.value = []; }
};


const fetchFlashSaleMap = async () => {
  try {
    const res = await axios.get(`${API_BASE}/api/khuyen-mai-flash`);
    const activeFlash = (res.data || [])
      .filter(f => f.trangThaiHienThi === 'Đang diễn ra');

    const map = new Map();
    await Promise.allSettled(
      activeFlash.map(async (flash) => {
        try {
          const pRes = await axios.get(`${API_BASE}/api/products/by-chi-tiet/${flash.chiTietSanPhamId}`);
          const p = pRes.data;
          const chiTiet = p.chiTietSanPhams?.find(ct => ct.id === Number(flash.chiTietSanPhamId));
          const giaBan = chiTiet?.giaBan || p.giaBan || 0;
          const salePrice = Math.round(giaBan * (1 - flash.phanTramGiamGia / 100));
          map.set(p.id, {
            discount: flash.phanTramGiamGia,
            salePrice,
            originalPrice: giaBan,
          });
        } catch {}
      })
    );
    flashSaleMap.value = map;
  } catch {}
};

const fetchProductsData = async () => {
  isLoading.value = true;
  products.value = [];
  try {
    // Load categories nếu chưa có
   if (allCategories.value.length === 0) {
  const catResponse = await apiClient.get('/categories');
  const rawCategories = catResponse.data; // ❌ bỏ filter status sớm

  const categoryMap = {};
  rawCategories.forEach(cat => {
    categoryMap[cat.id] = { ...cat, children: [] };
  });
  rawCategories.forEach(cat => {
    if (cat.danhMucChaId && categoryMap[cat.danhMucChaId]) {
      categoryMap[cat.danhMucChaId].children.push(categoryMap[cat.id]);
    }
  });
  // Lấy root thực sự, lọc status SAU khi build xong
  allCategories.value = rawCategories
    .filter(cat => !cat.danhMucChaId)
    .filter(cat => cat.trangThai !== false)
    .map(cat => categoryMap[cat.id]);
}

    const searchKeyword = route.query.q || '';

    // ✅ Nếu có keyword → gọi thẳng /products/search (endpoint đã hoạt động)
    if (searchKeyword) {
      categoryName.value = `Kết quả tìm kiếm: "${searchKeyword}"`;
      const response = await apiClient.get('/products/search', {
        params: {
          keyword: searchKeyword,
          size: 50,  // lấy nhiều để hiện đủ
          page: 0
        }
      });
      const data = response.data;
      if (Array.isArray(data)) {
        products.value = data;
      } else if (data.content && Array.isArray(data.content)) {
        products.value = data.content;
        totalPages.value = data.totalPages || 1;
      } else {
        products.value = [];
      }
      isLoading.value = false;
      return; // ← thoát sớm, không chạy tiếp
    }

    // Không có keyword → xử lý theo danh mục
let categoryIdParam = null;
if (route.params.slug) {
  let matchedCategory = null;
  for (const parent of allCategories.value) {
  if (createSlug(parent.tenDanhMuc || parent.name) === route.params.slug) {
    matchedCategory = parent; break;
  }
  if (parent.children) {
    for (const child of parent.children) {
      if (createSlug(child.tenDanhMuc || child.name) === route.params.slug) {
        matchedCategory = child; break;
      }
      if (child.children) {
        const grand = child.children.find(g =>
          createSlug(g.tenDanhMuc || g.name) === route.params.slug
        );
        if (grand) { matchedCategory = grand; break; }
      }
    }
    if (matchedCategory) break;
  }
}
  if (matchedCategory) {
    categoryName.value = matchedCategory.tenDanhMuc || matchedCategory.name;
    categoryIdParam = matchedCategory.id; // ✅ lưu categoryId
  } else {
    categoryName.value = 'Danh mục không tồn tại';
    isLoading.value = false; return;
  }
} else {
  categoryName.value = 'Tất cả sản phẩm';
}

// ✅ Dùng /products với categoryId thay vì /products/category/{id}
// → hỗ trợ đầy đủ filter giá, sort, phân trang
// Trong fetchProductsData(), đoạn gọi /products, sửa params:
const response = await apiClient.get('/products', {
  params: {
    page: currentPage.value,
    size: 15,
    sortBy: sortBy.value,
    categoryId: categoryIdParam,
    trangThai: true,
    minPrice: filters.minPrice ? Number(filters.minPrice) : null,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : null,
    minRating: filters.rating ? Number(filters.rating) : null,
  }
});

products.value = response.data.content || response.data;
totalPages.value = response.data.totalPages || 1;

   

  } catch (error) {
    console.error('Lỗi fetchProductsData:', error);
  } finally {
    isLoading.value = false;
  }
};

const setSort = (type) => {
  sortBy.value = type;
  currentPage.value = 1;
  // Không reset rating ở đây để giữ bộ lọc sao
  fetchProductsData();
};

const applyFilters = () => {
  currentPage.value = 1;
  fetchProductsData();
};

const resetFilters = () => {
  filters.minPrice = null;
  filters.maxPrice = null;
  filters.rating = null;
  filters.shipping = [];
  sortBy.value = 'newest';
  currentPage.value = 1;
  fetchProductsData(); // ← thêm dòng này
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchProductsData();
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }
};

const addToCart = async (product) => {
  const token = localStorage.getItem('auth_token') || localStorage.getItem('token')
  if (!token) { alert('Vui lòng đăng nhập để thêm vào giỏ hàng!'); return }

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
          giaBanGoc: v.giaBan,
          giaBan: Math.round(v.giaBan * (1 - flashPercent / 100)),
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
      if (!v) return
      await axios.post(`${API_BASE}/api/v1/cart/add`, {
        nguoiDungId: localStorage.getItem('user_id') || 2,
        chiTietSanPhamId: v.id,
        soLuong: 1,
        giaHienTai: v.giaBan,
      }, { headers: { Authorization: `Bearer ${token}` } })
      window.dispatchEvent(new Event('cart-updated'))
      alert('Thêm vào giỏ hàng thành công!')
      return
    }

    // Có biến thể → mở popup, truyền _chiTietSanPhams (có flash)
    variantModal.product = { ...detail, _chiTietSanPhams: variantsWithFlash }
    variantModal.qty = 1
    selectedColor.value = null
    selectedSize.value = null
    variantModal.show = true

  } catch (e) {
    alert('Lỗi: ' + (e.response?.data?.message || 'Không thể tải sản phẩm'))
  }
}

// MỚI
onMounted(() => {
  fetchCategoryBanners();
  fetchFlashSaleMap();
  fetchProductsData();
});

// ✅ Mới — gọi fetchProductsData trực tiếp sau khi reset state
watch(() => [route.params.slug, route.query.q], () => {
  currentPage.value = 1;
  filters.minPrice = null;
  filters.maxPrice = null;
  filters.rating = null;
  filters.shipping = [];
  sortBy.value = 'newest';
  fetchProductsData(); // ← gọi thẳng, không qua resetFilters
});

watch(showMobileCatFilter, (val) => {
  if (!val) return
  const slug = route.params.slug
  if (!slug) return
  // Tự mở accordion cha/con chứa slug hiện tại
  for (const cat of allCategories.value) {
    if (isCategoryActive(cat)) {
      openMobileCats.value = new Set([cat.id])
      for (const child of (cat.children || [])) {
        if (isChildActive(child)) {
          openMobileChildren.value = new Set([child.id])
        }
      }
    }
  }
})
</script>

<style scoped>
.mfp-cat-group { display: flex; flex-direction: column; }
.mfp-cat-row { display: flex; align-items: center; }
.mfp-sub-list { display: flex; flex-direction: column; }

.mfp-chevron-btn {
  flex-shrink: 0; width: 36px; height: 36px;
  border: none; background: transparent; color: #aaa;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; border-radius: 8px; transition: all .2s;
  font-size: 12px;
}
.mfp-chevron-btn:hover { background: #f5f5f5; color: #ee4d2d; }
.mfp-chevron-btn .bi { transition: transform .25s ease; }
.mfp-chevron-btn .rotated { transform: rotate(180deg); }
/* SHOPEE COLOR SCHEME */
.text-shopee { color: #ee4d2d !important; }
.bg-shopee { background-color: #ee4d2d !important; }
.btn-shopee-primary { background-color: #ee4d2d !important; color: white !important; border: 1px solid #ee4d2d; }
.btn-shopee-primary:hover { background-color: #d73211 !important; color: white; }

.filter-icon-btn {
  position: relative; width: 36px; height: 36px; border-radius: 8px;
  border: 1.5px solid #ee4d2d; background: #fff5f3; color: #ee4d2d;
  font-size: 16px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .2s; flex-shrink: 0;
}
.filter-icon-btn:hover { background: #ffece7; transform: scale(1.05); }
.btn-white { background-color: white; border: 1px solid #e1e1e1; color: #333; }
.btn-white:hover { background-color: #f8f8f8; }
.border-radius-2 { border-radius: 2px !important; }

/* LAYOUT COLS */
.col-lg-2-5 { width: 20%; }
.col-lg-9-5 { width: 80%; }
@media (max-width: 991px) { .col-lg-2-5, .col-lg-9-5 { width: 100%; } }

/* ==========================================================
   SIDEBAR FILTER - CẬP NHẬT GIAO DIỆN DANH MỤC CÓ TAM GIÁC
   ========================================================== */
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
.category-item:hover { color: #ee4d2d; transform: translateX(2px); background-color: #fffaf9;}
.category-item.active { 
  color: #ee4d2d; 
  font-weight: 700; 
}
/* Mũi tên tam giác cực xịn khi active */
.category-item.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 6px solid #ee4d2d; 
}

/* CSS MỚI CHO SIDEBAR DANH MỤC CÓ CHA CON (ACCORDION) */
.shopee-category-accordion .accordion-button {
  all: unset;
}

/* Chevron xoay khi mở */
.cat-chevron,
.child-chevron {
  transition: transform 0.2s ease;
  font-size: 11px;
  color: #aaa;
  flex-shrink: 0;
  margin-right: 10px;
}

[data-bs-target].active .cat-chevron,
[data-bs-target].active .child-chevron {
  transform: rotate(180deg);
}
.shopee-category-accordion .accordion-button::after {
  width: 12px;
  height: 12px;
  background-size: 12px;
  margin-right: 10px;
  transition: transform 0.2s ease;
}
.shopee-category-accordion .accordion-button:not(.collapsed) {
  color: #ee4d2d;
  background-color: transparent;
  box-shadow: none;
}
.shopee-category-accordion .accordion-button:not(.collapsed)::after {
  filter: invert(36%) sepia(87%) saturate(1633%) hue-rotate(349deg) brightness(98%) contrast(92%); /* Đổi màu mũi tên sang đỏ Shopee */
}
.category-child-item {
  font-size: 13.5px;
  padding: 6px 12px 6px 16px;
  border-left: 2px solid transparent;
  margin-bottom: 2px;
}
.category-child-item:hover {
  background-color: transparent;
  color: #ee4d2d !important;
}
.active-child {
  border-left: 2px solid #ee4d2d;
  background-color: #fffaf9;
}

.shopee-checkbox:checked, .shopee-radio:checked { background-color: #ee4d2d; border-color: #ee4d2d; }

/* SORT BAR */
.shopee-sort-bar { background-color: #ffffff; }
.min-w-150 { min-width: 170px; }

/* ==========================================================
   SHOPEE PRODUCT CARD - DÀI HƠN & ẢNH CHIẾM 60%
   ========================================================== */
.product-item {
  border: 1px solid transparent !important;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  transition: transform 0.1s ease, border 0.1s ease, box-shadow 0.1s ease;
  min-height: 330px; /* Tăng chiều cao tổng thể của Card */
}
.product-item:hover {
  border: 1px solid #ee4d2d !important;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,.15) !important;
  transform: translateY(-2px);
  z-index: 2;
}

/* ẢNH SẢN PHẨM: Ép tỉ lệ 1:1, tự động khớp với card (chiếm khoảng 60% card) */
.product-img-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1; 
  background-color: #fafafa;
}

/* Giảm Giá Badge (Góc phải trên cùng) */
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
.shopee-discount-badge .percent { color: #ee4d2d; font-size: 12px; font-weight: 700; line-height: 1; margin-top: 2px;}
.shopee-discount-badge .label { color: white; font-size: 10px; font-weight: 600; text-transform: uppercase; }

/* Custom Badge Tags (Bán Chạy, Siêu rẻ) */
.badge-custom {
  font-size: 0.65rem;
  padding: 2px 4px;
  border-radius: 2px;
  font-weight: 600;
  text-transform: uppercase;
}
.badge-hot {
  background-color: #ee4d2d;
  color: #fff;
}
.badge-cheap {
  border: 1px solid #ff7a00;
  color: #ff7a00;
  background-color: transparent;
}

/* Product Info */
/* Tìm và thay thế đoạn này trong <style scoped> */
.product-name {
  font-size: 17px;   /* từ 15px → 17px */
  line-height: 1.4;
  min-height: 48px;  /* tăng theo font */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}
.price-shopee {
  color: #c0392b;
  display: flex;
  align-items: baseline;
  justify-content: center;
  font-size: 18px;
}
/* NÚT GIỎ HÀNG ICON */
.shopee-cart-btn {
  color: #ee4d2d;
  background: white;
  border: 1px solid #ee4d2d;
  transition: all 0.2s ease;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shopee-cart-btn:hover {
  background: #ee4d2d;
  color: white;
  transform: scale(1.05);
}

/* SHOPEE PAGINATION */
.shopee-pagination .page-link {
  border: none; color: #999; font-size: 16px; font-weight: 500;
  width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
  border-radius: 2px !important; margin: 0 4px; background: transparent; transition: 0.2s;
}
.shopee-pagination .page-item.active .page-link {
  background-color: #ee4d2d; color: white;
}
.shopee-pagination .page-link:hover:not(.active) { color: #ee4d2d; }

/* BANNER */
.banner-img { height: 350px; object-fit: cover; width: 100%; border-radius: 2px; }
.wave-separator { width: 100%; height: 120px; background: #f8f9fa; position: relative; margin-bottom: -1px; }
.wave-svg { position: absolute; bottom: 0; width: 100%; height: 120px; display: block; }

/* Phủ một lớp gradient đen mờ từ trái sang phải để chữ trên banner luôn dễ đọc dù ảnh có sáng */
.animated-caption {
  background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%);
  pointer-events: none; /* Giúp click xuyên qua lớp mờ để trúng link ảnh */
}

/* Cho phép các nút bấm bên trong lớp mờ vẫn click được */
.animated-caption .btn {
  pointer-events: auto;
}

/* Đổ bóng cho chữ */
.text-shadow {
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
}

/* --- TRẠNG THÁI ẨN BAN ĐẦU DÀNH CHO ANIMATION --- */
.animate-title, .animate-desc, .animate-btn {
  opacity: 0; 
}

/* --- KÍCH HOẠT HIỆU ỨNG KHI CAROUSEL ITEM ACTIVE --- */
.carousel-item.active .animate-title {
  animation: slideInLeft 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

.carousel-item.active .animate-desc {
  animation: slideInUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) 0.3s forwards;
}

.carousel-item.active .animate-btn {
  animation: zoomIn 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) 0.6s forwards;
}

@keyframes slideInLeft {
  0% { transform: translateX(-80px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes slideInUp {
  0% { transform: translateY(40px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes zoomIn {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* ================= FOOTER & ANIMATION ================= */
.wave-separator {
  width: 100%;
  height: 120px;
  background: #f8f9fa; /* Màu nền khớp với màu bg-light của trang sản phẩm */
  position: relative;
  margin-bottom: -1px; 
}

.wave-svg {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 120px;
  display: block;
}

.text-vipep-green { color: #28a745 !important; }
.hover-white:hover { color: #fff !important; text-decoration: underline !important; }
.pointer { cursor: pointer; transition: transform 0.3s ease; }
.pointer:hover { transform: scale(1.1); }

/* ================= FLOATING CONTACT BUTTONS ================= */
.floating-contact {
  position: fixed;
  right: 20px;
  bottom: 80px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  flex-direction: row-reverse; /* Để nhãn hiện ra bên trái icon */
}

.icon-wrapper {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  z-index: 2;
  background: white;
}

/* Màu sắc từng loại */
.hotline .icon-wrapper { background: #dc3545; animation: pulse-red 2s infinite; }
.zalo .icon-wrapper { background: #0088ff; }
.messenger .icon-wrapper { background: #0078ff; }
.scroll-top { 
  background: #ee4d2d; /* Đổi màu nút lên đầu trang cho hợp tone Shopee của trang sản phẩm */
  color: white; 
  width: 45px; 
  height: 45px; 
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  cursor: pointer;
  transition: 0.3s;
}
.scroll-top:hover { background-color: #d73211; transform: translateY(-3px); }

/* Nhãn chữ (Label) hiện ra khi hover */
.contact-item .label {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 13px;
  white-space: nowrap;
  position: absolute;
  right: 55px; /* Để cách icon ra 1 tí */
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
  transform: translateX(10px);
}
.contact-item:hover .label {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

@keyframes pulse-red {
  0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
  100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
}
/* ── VARIANT MODAL ── */
.variant-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.5);
  z-index: 9999; display: flex; align-items: flex-end;
  justify-content: center;
}
.variant-modal {
  background: #fff; border-radius: 16px 16px 0 0;
  width: 100%; max-width: 480px;
  animation: slideUp .25s ease;
}
@keyframes slideUp {
  from { transform: translateY(100%); } to { transform: translateY(0); }
}
.variant-modal-header {
  display: flex; gap: 12px; padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}
.variant-modal-img {
  width: 80px; height: 80px; object-fit: cover; border-radius: 8px;
  border: 1px solid #eee;
}
.variant-modal-info { flex: 1; }
.variant-modal-name { font-weight: 600; font-size: 14px; margin-bottom: 4px; }
.variant-modal-body { padding: 16px; }
.variant-modal-footer {
  display: flex; gap: 8px; padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
}
.variant-modal-footer .flex-1 { flex: 1; }

.variant-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 4px; font-size: 13px;
  border: 1px solid #ddd; background: #fff; cursor: pointer;
  transition: all .15s;
}
.variant-btn:hover { border-color: #ee4d2d; color: #ee4d2d; }
.variant-btn.active { border-color: #ee4d2d; color: #ee4d2d; background: #fff5f3; font-weight: 600; }
.variant-btn.disabled { opacity: .4; cursor: not-allowed; }

.color-dot {
  width: 12px; height: 12px; border-radius: 50%;
  border: 1px solid rgba(0,0,0,.15); display: inline-block;
}

.qty-control { border: 1px solid #ddd; border-radius: 4px; width: fit-content; }
.qty-btn {
  width: 32px; height: 32px; border: none; background: #f5f5f5;
  font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.qty-btn:first-child { border-radius: 4px 0 0 4px; }
.qty-btn:last-child  { border-radius: 0 4px 4px 0; }
.qty-input {
  width: 48px; height: 32px; border: none; border-left: 1px solid #ddd;
  border-right: 1px solid #ddd; text-align: center; font-size: 14px;
  outline: none;
}
.variant-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.5);
  z-index: 9999; display: flex;
  align-items: center;        /* ← giữa màn hình luôn trên desktop */
  justify-content: center;
}

.variant-modal {
  background: #fff;
  border-radius: 12px;        /* ← bo 4 góc luôn */
  width: 100%; max-width: 480px;
  max-height: 90vh; overflow-y: auto;
  padding-bottom: env(safe-area-inset-bottom);
  animation: slideUp .25s ease;
}

/* Chỉ dùng bottom sheet trên mobile thật */
@media (max-width: 576px) {
  .variant-modal-overlay {
    align-items: flex-end;
  }
  .variant-modal {
    border-radius: 16px 16px 0 0;
  }
}

.product-category-label {
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 6px;
}

.product-name {
  font-size: 18px;
  line-height: 1.4;
  min-height: 50px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 500;
  color: #222;
  margin-bottom: 4px;
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
/* Khi accordion con đang mở nhưng không phải item được chọn — chỉ đậm chữ, không đỏ */
.child-open {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
}
.cat-chevron.rotated,
.child-chevron.rotated { transform: rotate(180deg); }

.chevron-toggle {
  color: #aaa; flex-shrink: 0;
  line-height: 1; border-radius: 4px;
}
.chevron-toggle:hover { background-color: #f5f5f5; color: #666; }
/* ===== MOBILE FILTER (CategoryDetail) ===== */
.mobile-filter-backdrop {
  position: fixed; inset: 0; z-index: 99999;
  background: rgba(0,0,0,.45);
  display: flex; align-items: flex-end;
}
.mobile-filter-panel {
  width: 100%; max-height: 85vh;
  background: #fff;
  border-radius: 20px 20px 0 0;
  display: flex; flex-direction: column;
  overflow: hidden;
}
.mfp-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid #f0f0f0; flex-shrink: 0;
}
.mfp-title { font-size: 16px; font-weight: 700; color: #222; }
.mfp-close {
  width: 32px; height: 32px; border-radius: 50%;
  border: none; background: #f5f5f5; color: #555;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; cursor: pointer; transition: all .2s;
}
.mfp-close:hover { background: #fde8e8; color: #ee4d2d; }
.mfp-body { flex: 1; overflow-y: auto; padding: 16px 20px; display: flex; flex-direction: column; gap: 20px; }
.mfp-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .8px; color: #999; margin-bottom: 10px; }
.mfp-section {}

/* Category list */
.mfp-cat-list { display: flex; flex-direction: column; gap: 4px; }
.mfp-cat-item {
  display: flex; align-items: center;
  padding: 11px 14px; border-radius: 10px;
  font-size: 14px; font-weight: 500; color: #333;
  text-decoration: none; transition: all .2s;
  border: 1.5px solid transparent;
}
.mfp-cat-item:hover { background: #fff5f3; color: #ee4d2d; }
.mfp-cat-item--active { background: #fff5f3; color: #ee4d2d; font-weight: 700; border-color: #ffccc2; }
.mfp-cat-item--parent { font-weight: 600; }
.mfp-cat-item--child { padding-left: 28px; font-size: 13px; color: #666; }
.mfp-cat-dot {
  display: inline-block; width: 5px; height: 5px; border-radius: 50%;
  background: #ccc; margin-right: 10px; flex-shrink: 0;
  transition: background .2s;
}
.mfp-cat-item--child.mfp-cat-item--active .mfp-cat-dot { background: #ee4d2d; }

/* Price */
.mfp-price-row { display: flex; align-items: center; gap: 8px; width: 100%; overflow: hidden; }
.mfp-price-input {
  flex: 1; min-width: 0; width: 0;
  border: 1.5px solid #e8eaed; border-radius: 10px;
  padding: 10px 8px; font-size: 14px; outline: none; transition: border-color .2s;
}
.mfp-price-input:focus { border-color: #ee4d2d; }

.mfp-price-sep { color: #999; font-size: 16px; flex-shrink: 0; }

.shopee-sort-bar .btn { height: 38px; white-space: nowrap; }
.shopee-sort-bar .dropdown > button { height: 38px; white-space: nowrap; }
.mfp-cat-item--grand { padding-left: 44px; font-size: 12.5px; color: #999; }
.mfp-cat-dot--grand { width: 4px; height: 4px; background: #ddd; }
.mfp-cat-item--grand.mfp-cat-item--active .mfp-cat-dot--grand { background: #ee4d2d; }

/* Rating */
.mfp-rating-list { display: flex; flex-direction: column; gap: 8px; }
.mfp-rating-item {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 14px; border-radius: 10px;
  border: 1.5px solid #e8eaed; cursor: pointer; transition: all .2s;
}
.mfp-rating-item:hover { border-color: #ffc107; background: #fffbf0; }
.mfp-rating-item--active { border-color: #ffc107; background: #fffbf0; }
.mfp-star { color: #ffc107; font-size: 15px; }
.mfp-star-label { font-size: 13px; color: #666; margin-left: 4px; }

/* Footer */
.mfp-footer {
  display: flex; gap: 12px; padding: 16px 20px;
  border-top: 1px solid #f0f0f0; flex-shrink: 0;
}
.mfp-btn-reset {
  flex: 1; padding: 12px; border-radius: 10px;
  border: 1.5px solid #e8eaed; background: #fff;
  color: #666; font-size: 14px; font-weight: 700; cursor: pointer; transition: all .2s;
}
.mfp-btn-reset:hover { border-color: #ee4d2d; color: #ee4d2d; }
.mfp-btn-apply {
  flex: 2; padding: 12px; border-radius: 10px;
  border: none; background: #ee4d2d;
  color: #fff; font-size: 14px; font-weight: 700; cursor: pointer; transition: all .2s;
}
.mfp-btn-apply:hover { background: #d73211; }

.filter-icon-dot {
  position: absolute; top: 4px; right: 4px; width: 7px; height: 7px;
  border-radius: 50%; background: #ee4d2d; border: 1.5px solid #fff;
}

/* Transition */
.filter-slide-enter-active, .filter-slide-leave-active { transition: opacity .25s ease; }
.filter-slide-enter-active .mobile-filter-panel,
.filter-slide-leave-active .mobile-filter-panel { transition: transform .3s cubic-bezier(.4,0,.2,1); }
.filter-slide-enter-from { opacity: 0; }
.filter-slide-enter-from .mobile-filter-panel { transform: translateY(100%); }
.filter-slide-leave-to { opacity: 0; }
.filter-slide-leave-to .mobile-filter-panel { transform: translateY(100%); }
/* Thêm vào cuối <style scoped> */
@media (max-width: 575px) {
  .shopee-sort-bar .d-flex {
    flex-wrap: wrap !important;
  }

  /* Thu nhỏ các nút sort trên mobile */
  .shopee-sort-bar .btn {
    font-size: 12px;
    padding: 4px 10px;
    height: 34px;
  }

  /* Đẩy 2 icon filter về cuối hàng, tách riêng */
  .shopee-sort-bar .d-lg-none {
    margin-left: auto;
  }
}

.muoi-himalaya-page-wrapper {
  overflow-x: hidden;
}

@media (max-width: 575px) {
  .container-fluid {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }
}
@media (max-width: 575px) {
  .product-name {
    font-size: 13px;
    min-height: 36px;
  }
  .product-category-label {
    font-size: 10px;
  }
  .price-shopee {
    font-size: 14px;
  }
  .btn-outline-cart {
    font-size: 11px;
    padding: 6px 0;
    letter-spacing: 0;
  }
  .card-body {
    padding: 8px !important;
  }
}
@media (max-width: 575px) {
  .banner-img {
    height: 180px;
  }
}
</style>
<template>
  <div class="font-general bg-light-shopee pb-5">

    <!-- LOADING -->
    <div v-if="isLoading" class="d-flex justify-content-center align-items-center" style="min-height: 70vh;">
      <div class="spinner-border text-shopee" role="status"></div>
    </div>

    <!-- NOT FOUND -->
    <div v-else-if="!product" class="text-center py-5">
      <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/a60759ad1dabe909c46a817ecbf71878.png" alt="Not Found" class="mb-3" style="width:150px;">
      <h5 class="text-muted mb-4">Không tìm thấy sản phẩm này!</h5>
      <router-link to="/products" class="btn btn-shopee px-4">Tiếp tục mua sắm</router-link>
    </div>

    <div v-else class="container py-4">
      <!-- BREADCRUMB -->
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb small mb-0">
          <li class="breadcrumb-item"><router-link to="/" class="text-decoration-none text-muted">Trang chủ</router-link></li>
          <li class="breadcrumb-item">
            <router-link :to="categoryLink" class="text-decoration-none text-muted">{{ categoryName }}</router-link>
          </li>
          <li class="breadcrumb-item active text-dark text-truncate" style="max-width:250px;" aria-current="page">{{ product.tenSanPham }}</li>
        </ol>
      </nav>

      <!-- BLOCK 1: ẢNH + THÔNG TIN + BIẾN THỂ -->
      <div class="bg-white p-4 rounded shadow-sm mb-4">
        <div class="row g-4">

          <!-- ẢNH -->
          <div class="col-md-5">
            <div class="border rounded-2 mb-3 d-flex align-items-center justify-content-center bg-light position-relative"
              style="aspect-ratio:1/1;overflow:hidden;">
              <img v-if="selectedImage" :src="selectedImage" class="w-100 h-100 object-fit-cover transition-all" alt="Product Main">
              <i v-else class="bi bi-image text-muted" style="font-size:5rem;"></i>
            </div>
            <!-- Thumbnails -->
            <div v-if="allImages.length > 1" class="d-flex gap-2 overflow-auto py-1 custom-scrollbar">
              <div v-for="(img, idx) in allImages" :key="idx"
                class="border rounded-1 overflow-hidden transition-all flex-shrink-0 cursor-pointer"
                style="width:80px;height:80px;"
                :class="selectedImage === img ? 'border-shopee border-2 opacity-100' : 'opacity-50'"
                @mouseenter="selectedImage = img">
                <img :src="img" class="w-100 h-100 object-fit-cover">
              </div>
            </div>
            <!-- Share + Like -->
            <div class="d-flex justify-content-center align-items-center mt-4 gap-4">
              <div class="d-flex align-items-center gap-2">
                <span class="text-dark small">Chia sẻ:</span>
                <i class="bi bi-messenger fs-4 text-primary cursor-pointer hover-scale"></i>
                <i class="bi bi-facebook fs-4 text-primary cursor-pointer hover-scale"></i>
                <i class="bi bi-twitter-x fs-4 text-dark cursor-pointer hover-scale"></i>
              </div>
              <div class="vr"></div>
              <div class="d-flex align-items-center gap-2 cursor-pointer hover-scale" @click="toggleLike">
                <i class="bi fs-4 text-danger" :class="isLiked ? 'bi-heart-fill' : 'bi-heart'"></i>
                <span class="text-dark small">Đã thích ({{ formatNumber(product.luotThich || 0) }})</span>
              </div>
            </div>
          </div>

         <!-- THÔNG TIN + BIẾN THỂ -->
<div class="col-md-7 ps-md-4 d-flex flex-column">

  <!-- Badges -->
  <div class="d-flex align-items-center flex-wrap gap-2 mb-3">
    <span class="tag-horeca">
      <i class="bi bi-shop me-1" style="font-size:0.7rem;"></i>HORECA VN
    </span>
    <span v-if="product.laCombo" class="tag-combo">
      <i class="bi bi-box2-heart me-1" style="font-size:0.7rem;"></i>Combo
    </span>
  </div>

  <!-- Tên -->
  <h4 class="fw-bold mb-2 lh-base" style="font-size:1.15rem;">{{ product.tenSanPham }}</h4>

  <!-- Mô tả ngắn -->
  <p v-if="product.moTaNgan" class="text-muted small mb-3 lh-base fst-italic border-start border-3 border-shopee ps-2">
    {{ product.moTaNgan }}
  </p>

  <!-- Đánh giá / Đã bán -->
  <div class="d-flex align-items-center small mb-4 gap-0">
    <div class="pe-3 border-end border-secondary-subtle d-flex align-items-center gap-1 cursor-pointer">
      <span class="text-shopee text-decoration-underline fw-semibold">{{ product.diemDanhGia || '0.0' }}</span>
      <div class="text-warning" style="font-size:0.78rem; letter-spacing:-1px;">
        <i v-for="n in 5" :key="n" :class="n <= Math.round(product.diemDanhGia || 0) ? 'bi bi-star-fill' : 'bi bi-star'"></i>
      </div>
    </div>
    <div class="px-3 border-end border-secondary-subtle cursor-pointer">
      <span class="text-decoration-underline fw-semibold">{{ product.reviews?.length || 0 }}</span>
      <span class="text-muted ms-1">Đánh Giá</span>
    </div>
    <div class="px-3">
      <span class="fw-semibold">{{ formatNumber(product.daBan || 0) }}</span>
      <span class="text-muted ms-1">Đã Bán</span>
    </div>
  </div>

  <!-- GIÁ hoặc LIÊN HỆ -->
  <div class="mb-4">
    <template v-if="product.lienHe">
      <button class="btn-lien-he" @click="openContact(product)">
        <span class="btn-lien-he__icon"><i class="bi bi-telephone-fill"></i></span>
        <span class="btn-lien-he__text">Liên hệ tư vấn</span>
        <i class="bi bi-arrow-right ms-2" style="font-size:0.8rem;opacity:0.7;"></i>
      </button>
    </template>
<!-- MỚI -->
<template v-else>
  <div class="price-section">
    <div class="d-flex align-items-baseline gap-3 flex-wrap">
      <!-- Giá gạch ngang: ưu tiên flash sale, fallback giaGoc -->
      <span v-if="currentFlash || product.giaGoc"
  class="text-muted text-decoration-line-through" style="font-size:1rem;">
  {{ formatPrice(currentFlash ? currentFlash.originalPrice : product.giaGoc) }}đ
</span>
<span class="text-shopee fw-bold" style="font-size:2rem; line-height:1;">
  {{ formatPrice(currentFlash ? currentFlash.salePrice : displayPrice) }}đ
</span>
<span v-if="currentFlash" class="badge bg-shopee text-white" style="font-size:0.75rem;">
  -{{ currentFlash.discount }}%
</span>
<span v-else-if="product.giaGoc" class="badge bg-shopee text-white" style="font-size:0.75rem;">
  -{{ Math.round((product.giaGoc - displayPrice) / product.giaGoc * 100) }}%
</span>
<div v-if="hasVariants && !selectedVariant && priceRange" class="text-muted small mt-1">{{ priceRange }}</div>
<div v-if="currentFlash" class="mt-2 d-flex align-items-center gap-1" style="font-size:0.75rem; color:#ee4d2d;">
  <i class="bi bi-lightning-charge-fill"></i>
  <span class="fw-bold">Flash Sale đang diễn ra!</span>
</div>
</div>
  </div>
</template>
  </div>

  <!-- CHỌN BIẾN THỂ -->
  <template v-if="hasVariants">
    <div v-if="availableColors.length > 0" class="variant-row mb-3">
      <div class="variant-label">Màu sắc</div>
      <div class="d-flex flex-wrap gap-2">
        <button v-for="color in availableColors" :key="color"
          @click="selectColor(color)"
          class="variant-btn"
          :class="selectedColor === color ? 'variant-btn--active' : ''">
          <span class="color-dot-sm" :style="{ background: colorHex(color) }"></span>
          {{ color }}
        </button>
      </div>
    </div>

    <div v-if="availableSizes.length > 0" class="variant-row mb-3">
      <div class="variant-label">Kích thước</div>
      <div class="d-flex flex-wrap gap-2">
        <button v-for="size in availableSizes" :key="size"
          @click="selectSize(size)"
          class="variant-btn"
          :class="[
            selectedSize === size ? 'variant-btn--active' : '',
            !isSizeAvailable(size) ? 'variant-btn--disabled' : ''
          ]"
          :disabled="!isSizeAvailable(size)">
          {{ size }}
        </button>
      </div>
    </div>

    <!-- Trọng lượng — chỉ show SAU KHI đã chọn variant -->
    <div v-if="selectedVariant?.trongLuong" class="variant-row mb-3">
      <div class="variant-label">Trọng lượng</div>
      <div class="variant-value">{{ selectedVariant.trongLuong }}</div>
    </div>

    <div v-if="!selectedVariant && (availableColors.length > 0 || availableSizes.length > 0)"
      class="alert-variant mb-3">
      <i class="bi bi-exclamation-circle me-1"></i>
      Vui lòng chọn
      <span v-if="availableColors.length > 0 && !selectedColor">màu sắc</span>
      <span v-if="availableColors.length > 0 && !selectedColor && availableSizes.length > 0 && !selectedSize"> và </span>
      <span v-if="availableSizes.length > 0 && !selectedSize">kích thước</span>
      để xem thông tin chi tiết.
    </div>
  </template>

  <!-- COMBO TẶNG KÈM -->
  <div v-if="product.laCombo && comboItems.length > 0" class="combo-gift-block mb-4">
    <div class="combo-gift-header">
      <i class="bi bi-box-seam me-2"></i>
      Bộ sản phẩm bao gồm
      <span class="combo-gift-count">{{ comboItems.length }} sản phẩm</span>
    </div>
    <div class="combo-gift-list">
      <div v-for="(ci, idx) in comboItems" :key="idx" class="combo-gift-item">
        <div class="combo-gift-thumb">
          <img v-if="ci.anhSanPham" :src="getImageUrl(ci.anhSanPham)" alt="">
          <i v-else class="bi bi-image text-muted small"></i>
        </div>
        <div class="combo-gift-info">
          <div class="combo-gift-name">{{ ci.tenSanPham || '---' }}</div>
          <div class="d-flex flex-wrap gap-1 mt-1">
            <span v-if="ci.mauSac" class="combo-gift-tag">{{ ci.mauSac }}</span>
            <span v-if="ci.kichThuoc" class="combo-gift-tag">{{ ci.kichThuoc }}</span>
          </div>
        </div>
        <div class="combo-gift-qty">x{{ ci.soLuong }}</div>
      </div>
    </div>
  </div>
  <!-- Nút mở chi tiết trên mobile -->
<button class="d-md-none mobile-spec-btn mb-3" @click="showMobileSpec = true">
  <i class="bi bi-list-ul me-2"></i>Xem chi tiết & biến thể
  <i class="bi bi-chevron-right ms-auto"></i>
</button>
  <!-- VẬN CHUYỂN -->
  <div class="shipping-block mb-4">
    <div class="shipping-label">Vận Chuyển</div>
    <div class="shipping-content">
      <div class="d-flex align-items-start gap-2 mb-2">
        <i class="bi bi-box-seam text-shopee mt-1" style="font-size:1rem; flex-shrink:0;"></i>
        <div>
          <div class="fw-semibold text-dark small">Xử lý bởi HORECA VN</div>
          <div class="text-muted" style="font-size:0.78rem;">Miễn phí trả hàng 15 ngày</div>
        </div>
      </div>
      <div class="d-flex align-items-start gap-2">
        <i class="bi bi-truck text-success mt-1" style="font-size:1rem; flex-shrink:0;"></i>
        <div>
          <div class="fw-semibold text-dark small">Nhận trong 4 Giờ</div>
          <div class="text-muted" style="font-size:0.78rem;">Phí vận chuyển: <span class="fw-bold text-dark">0₫</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- SỐ LƯỢNG + NÚT -->
  <div v-if="!product.lienHe" class="mt-auto">
    <div class="d-flex align-items-center gap-3 mb-4">
      <span class="text-muted small" style="width:80px; flex-shrink:0;">Số Lượng</span>
      <div class="input-group" style="width:110px;">
        <button class="btn border-secondary-subtle rounded-0 px-2 py-1 bg-white text-dark shadow-none"
          @click="decreaseQty" :disabled="currentStock <= 0"><i class="bi bi-dash"></i></button>
        <input type="text" class="form-control text-center rounded-0 border-secondary-subtle py-1 shadow-none"
          v-model="quantity" @change="validateQty" :disabled="currentStock <= 0">
        <button class="btn border-secondary-subtle rounded-0 px-2 py-1 bg-white text-dark shadow-none"
          @click="increaseQty" :disabled="currentStock <= 0"><i class="bi bi-plus"></i></button>
      </div>
      <span class="text-muted small">{{ currentStock }} có sẵn</span>
    </div>

    <div class="d-flex gap-3">
      <button class="btn btn-outline-shopee py-3 px-4 d-flex align-items-center justify-content-center gap-2 fw-bold rounded-1"
        style="flex:1;" @click="addToCart(null)" :disabled="currentStock <= 0">
        <i class="bi bi-cart-plus fs-5"></i> Thêm Vào Giỏ
      </button>
      <button class="btn btn-shopee bg-shopee text-white py-3 px-4 fw-bold rounded-1"
        style="flex:1;" @click="buyNow" :disabled="currentStock <= 0">
        Mua Ngay
      </button>
    </div>

    <div v-if="currentStock <= 0" class="text-danger mt-3 fw-bold small">
      <i class="bi bi-exclamation-triangle"></i> Sản phẩm hiện đang tạm hết hàng.
    </div>
  </div>

</div>
</div>
</div>

      <!-- BLOCK 2: CHI TIẾT SẢN PHẨM -->
      <div class="bg-white p-4 p-md-5 rounded shadow-sm mb-4">
        <div class="mb-5">
          <h5 class="bg-light p-3 fs-6 text-dark rounded-1 text-uppercase mb-4">Chi Tiết Sản Phẩm</h5>
         <div class="row px-3 small lh-lg detail-block">
            <!-- Danh mục -->
            <div class="col-md-2 text-muted">Danh Mục</div>
            <div class="col-md-10 mb-3 d-flex align-items-center gap-2">
              <router-link to="/" class="text-decoration-none text-shopee">Sản phẩm</router-link>
              <i class="bi bi-chevron-right text-muted" style="font-size:0.7rem;"></i>
              <router-link :to="categoryLink" class="text-decoration-none text-shopee">{{ categoryName }}</router-link>
            </div>

            <!-- Các trường chi tiết -->
            <template v-for="(row, idx) in detailRows" :key="idx">
              <template v-if="row.value">
                <div class="col-md-2 text-muted">{{ row.label }}</div>
                <div class="col-md-10 mb-3">{{ row.value }}</div>
              </template>
            </template>

            <!-- Tình trạng kho -->
<div class="col-md-2 text-muted">Tình trạng kho</div>
<div class="col-md-10 mb-3">
  <span v-if="currentStock > 10" class="detail-badge detail-badge--success">
    <i class="bi bi-check-circle-fill me-1"></i>Còn hàng
  </span>
  <span v-else-if="currentStock > 0" class="detail-badge detail-badge--warning">
    <i class="bi bi-exclamation-circle-fill me-1"></i>Sắp hết hàng
  </span>
  <span v-else class="detail-badge detail-badge--danger">
    <i class="bi bi-x-circle-fill me-1"></i>Hết hàng
  </span>
</div>

<!-- Loại sản phẩm (Combo) -->
<template v-if="product.laCombo">
  <div class="col-md-2 text-muted">Loại</div>
  <div class="col-md-10 mb-3">
    <span class="detail-badge detail-badge--combo">
      <i class="bi bi-box2-heart-fill me-1"></i>Sản phẩm Combo
    </span>
  </div>
</template>
          </div>
        </div>

        <!-- MÔ TẢ -->
        <div>
          <h5 class="bg-light p-3 fs-6 text-dark rounded-1 text-uppercase mb-4">Mô Tả Sản Phẩm</h5>
          <div v-if="product.moTaNgan" class="mb-3 mx-3 py-1 text-muted small">
            <i class="bi bi-info-circle me-2"></i>{{ product.moTaNgan }}
          </div>
          <div class="px-3 text-dark lh-base product-description small" style="white-space:pre-line;">
            {{ product.moTaChiTiet || 'Nhà bán hàng chưa cung cấp mô tả chi tiết.' }}
          </div>
        </div>
      </div>

      <!-- BLOCK 3: ĐÁNH GIÁ -->
      <div class="bg-white p-4 p-md-5 rounded shadow-sm mb-4">
        <h5 class="fs-6 text-dark text-uppercase mb-4">Đánh Giá Sản Phẩm</h5>
        <div class="border rounded-1 p-4 bg-light-shopee d-flex flex-column flex-md-row align-items-start gap-4 mb-4 border-shopee-light">
          <div class="text-center me-md-3 mx-auto mx-md-0">
            <div class="text-shopee fw-medium mb-1" style="font-size:1.8rem;">
              {{ product.diemDanhGia || '4.7' }} <span class="fs-5 text-dark">trên 5</span>
            </div>
            <div class="text-shopee fs-6">
              <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i>
            </div>
          </div>
          <div class="d-flex flex-wrap gap-2 flex-grow-1 justify-content-center justify-content-md-start">
            <button @click="selectedStarFilter = 'ALL'"
              :class="['btn btn-shopee-filter px-4 py-1 small rounded-0', selectedStarFilter === 'ALL' ? 'active' : '']">
              Tất Cả
            </button>
            <button v-for="star in [5,4,3,2,1]" :key="star"
              @click="selectedStarFilter = star.toString()"
              :class="['btn btn-shopee-filter', selectedStarFilter === star.toString() ? 'active' : '']">
              {{ star }} Sao
            </button>
          </div>
        </div>

        <div class="review-list mt-2">
          <div v-if="!filteredReviews.length" class="text-center py-5 text-muted">
            Chưa có đánh giá nào cho mức sao này.
          </div>
          <div v-for="rev in displayedReviews" :key="rev.id" class="review-item border-bottom py-3 d-flex gap-3">
            <div class="bg-secondary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-shopee fw-bold flex-shrink-0"
              style="width:40px;height:40px;">
              {{ rev.hoTen ? rev.hoTen.charAt(0).toUpperCase() : 'U' }}
            </div>
            <div class="flex-grow-1">
              <div class="small fw-medium mb-1">{{ rev.hoTen || 'Người dùng ẩn danh' }}</div>
              <div class="text-shopee mb-1" style="font-size:0.7rem;">
                <i v-for="n in 5" :key="n" :class="n <= rev.diemDanhGia ? 'bi bi-star-fill' : 'bi bi-star'"></i>
              </div>
              <div class="text-muted mb-2" style="font-size:0.75rem;">
                {{ formatDate(rev.ngayTao) }} | Phân loại hàng: Mặc định
              </div>
              <p class="small text-dark mb-3">{{ rev.noiDung || 'Khách hàng không để lại bình luận.' }}</p>
              <div v-if="rev.hinhAnh" class="d-flex flex-wrap gap-2 mb-3 mt-1">
                <div v-for="(media, idx) in parseReviewImages(rev.hinhAnh)" :key="idx"
                  @click="openReviewMedia(media)"
                  class="review-img-box border rounded-1 overflow-hidden cursor-pointer position-relative"
                  style="width:72px;height:72px;background-color:#000;">
                  <template v-if="isVideo(media)">
                    <video :src="getImageUrl(media)" class="w-100 h-100 object-fit-cover opacity-75" muted loop playsinline></video>
                    <div class="position-absolute top-50 start-50 translate-middle text-white" style="pointer-events:none;">
                      <i class="bi bi-play-circle-fill fs-4 opacity-75"></i>
                    </div>
                  </template>
                  <img v-else :src="getImageUrl(media)" class="w-100 h-100 object-fit-cover opacity-75" alt="">
                </div>
              </div>
            </div>
          </div>
          <div v-if="filteredReviews.length > 3" class="text-center mt-4 mb-2">
            <button @click="showAllReviews = !showAllReviews" class="btn btn-outline-secondary px-5 py-2 rounded-1 small">
              {{ showAllReviews ? 'Thu gọn đánh giá' : 'Xem thêm đánh giá' }}
              <i :class="showAllReviews ? 'bi bi-chevron-up ms-1' : 'bi bi-chevron-down ms-1'"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- BLOCK 4: SẢN PHẨM LIÊN QUAN -->
      <div v-if="relatedProducts.length > 0" class="bg-white p-4 p-md-5 rounded shadow-sm mb-4 related-products-section">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="fs-6 text-dark text-uppercase m-0">Sản phẩm cùng danh mục</h5>
          <router-link :to="categoryLink" class="text-shopee text-decoration-none small">
            Xem tất cả <i class="bi bi-chevron-right"></i>
          </router-link>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3 mt-2">
          <div class="col" v-for="item in relatedProducts.slice(0, 5)" :key="item.id">
            <div class="product-item card h-100 bg-white text-decoration-none border-radius-2 position-relative">
             <!-- MỚI -->
<div v-if="relatedFlashMap.get(item.id)?.discount || item.giamGia" class="shopee-discount-badge">
  <span class="percent">{{ relatedFlashMap.get(item.id)?.discount || item.giamGia }}%</span>
  <span class="label">GIẢM</span>
</div>
              <router-link :to="`/san-pham/chi-tiet/${item.id}`"
                class="product-img-wrapper position-relative overflow-hidden d-flex align-items-center justify-content-center bg-light">
                <img :src="getProductImage(item)" class="img-fluid w-100 h-100 object-fit-cover" :alt="item.tenSanPham">
              </router-link>
              <div class="card-body p-3 d-flex flex-column text-center">
                <router-link :to="`/san-pham/chi-tiet/${item.id}`" class="text-decoration-none">
                  <div class="product-category-label">{{ categoryName }}</div>
                  <div class="product-name mb-2" :title="item.tenSanPham">{{ item.tenSanPham }}</div>
                </router-link>
                <div class="d-flex gap-1 flex-wrap mt-1 mb-1" style="min-height:18px;">
                  <span v-if="item.daBan >= 100" class="badge-custom badge-hot">Bán chạy</span>
                  <span v-if="item.giamGia >= 30" class="badge-custom badge-cheap">Siêu rẻ</span>
                </div>
                <div class="mt-auto">
                  <template v-if="item.lienHe">
                    <div class="d-flex justify-content-center mb-2">
                      <button
                        class="btn btn-sm btn-success rounded-pill px-3 fw-bold d-flex align-items-center gap-1"
                        style="font-size:0.75rem;"
                        @click.stop="openContact(item)">
                        <i class="bi bi-telephone-fill"></i> Liên hệ
                      </button>
                    </div>
                    <div class="rating-stars text-warning mb-1" style="font-size:0.75rem;">
                      <i v-for="n in 5" :key="n" :class="n <= (item.diemDanhGia || 0) ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                    </div>
                    <span class="text-muted d-block mb-3" style="font-size:0.8rem;">Đã bán {{ formatSoldCount(item.daBan) }}</span>
                    <router-link :to="`/san-pham/chi-tiet/${item.id}`"
                      class="btn btn-outline-cart w-100 fw-bold text-uppercase text-decoration-none">
                      Xem chi tiết
                    </router-link>
                  </template>
                  <template v-else>
                    <!-- MỚI -->
<div class="price-shopee mb-2 d-flex flex-column align-items-center">
  <span class="amount fw-bold">
    {{ formatPrice(relatedFlashMap.get(item.id)?.salePrice || item.giaBan) }}đ
  </span>
  <span v-if="relatedFlashMap.get(item.id)"
    class="text-muted text-decoration-line-through"
    style="font-size:0.78rem;">
    {{ formatPrice(relatedFlashMap.get(item.id).originalPrice) }}đ
  </span>
</div>
                    <div class="rating-stars text-warning mb-1" style="font-size:0.75rem;">
                      <i v-for="n in 5" :key="n" :class="n <= (item.diemDanhGia || 0) ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                    </div>
                    <span class="text-muted d-block mb-3" style="font-size:0.8rem;">Đã bán {{ formatSoldCount(item.daBan) }}</span>
                    <button @click.prevent="addToCart(null, item)" class="btn btn-outline-cart w-100 fw-bold text-uppercase">
                      Thêm vào giỏ
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL ẢNH REVIEW -->
    <div v-if="isReviewMediaModalOpen" class="review-modal-overlay" @click.self="closeReviewMedia">
      <div class="review-modal-content position-relative shadow-lg">
        <button class="btn-close-modal" @click="closeReviewMedia"><i class="bi bi-x-lg"></i></button>
        <template v-if="isVideo(selectedReviewMedia)">
          <video :src="selectedReviewMedia" controls autoplay class="w-100 h-100 object-fit-contain bg-black rounded"></video>
        </template>
        <img v-else :src="selectedReviewMedia" class="w-100 h-100 object-fit-contain bg-black rounded" alt="">
      </div>
    </div>
    <!-- MOBILE FILTER POPUP -->
<teleport to="body">
  <transition name="filter-slide">
    <div v-if="showMobileSpec" class="mobile-filter-backdrop" @click.self="showMobileSpec = false">
      <div class="mobile-filter-panel">

        <div class="mfp-header">
          <span class="mfp-title"><i class="bi bi-list-ul me-2"></i>Chi tiết sản phẩm</span>
          <button class="mfp-close" @click="showMobileSpec = false"><i class="bi bi-x-lg"></i></button>
        </div>

        <div class="mfp-body">
          <!-- Biến thể -->
          <template v-if="hasVariants">
            <div class="mfp-section" v-if="availableColors.length > 0">
              <p class="mfp-label">Màu sắc</p>
              <div class="mfp-pills">
                <button v-for="color in availableColors" :key="color"
                  class="mfp-pill" :class="{ 'mfp-pill--active': selectedColor === color }"
                  @click="selectColor(color)">
                  <span class="color-dot-sm" :style="{ background: colorHex(color) }"></span>
                  {{ color }}
                </button>
              </div>
            </div>
            <div class="mfp-section" v-if="availableSizes.length > 0">
              <p class="mfp-label">Kích thước</p>
              <div class="mfp-pills">
                <button v-for="size in availableSizes" :key="size"
                  class="mfp-pill"
                  :class="{ 'mfp-pill--active': selectedSize === size, 'mfp-pill--disabled': !isSizeAvailable(size) }"
                  :disabled="!isSizeAvailable(size)"
                  @click="selectSize(size)">
                  {{ size }}
                </button>
              </div>
            </div>
          </template>

          <!-- Thông tin nhanh -->
          <div class="mfp-section">
            <p class="mfp-label">Thông tin sản phẩm</p>
            <div class="mfp-detail-list">
              <div v-for="(row, idx) in detailRows.filter(r => r.value)" :key="idx" class="mfp-detail-row">
                <span class="mfp-detail-label">{{ row.label }}</span>
                <span class="mfp-detail-value">{{ row.value }}</span>
              </div>
            </div>
          </div>

          <!-- Vận chuyển -->
          <div class="mfp-section">
            <p class="mfp-label">Vận chuyển</p>
            <div class="mfp-ship-row">
              <i class="bi bi-truck text-success"></i>
              <span>Nhận trong <strong>4 giờ</strong> · Phí vận chuyển: <strong>0đ</strong></span>
            </div>
            <div class="mfp-ship-row mt-2">
              <i class="bi bi-box-seam text-shopee"></i>
              <span>Miễn phí trả hàng <strong>15 ngày</strong></span>
            </div>
          </div>
        </div>

        <div class="mfp-footer">
          <button class="mfp-btn-apply" @click="showMobileSpec = false">Đóng</button>
        </div>

      </div>
    </div>
  </transition>
</teleport>
    <ContactPopup
      :show="contactPopup.show"
      :phone="contactPopup.phone"
      :zalo="contactPopup.zalo"
      @close="contactPopup.show = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { userProductService } from '@/services/productService';
import { cartState } from '@/services/cartStore';
import axios from 'axios';
import { API_BASE } from '@/config/api';
import ContactPopup from '@/components/ContactPopup.vue';
const showMobileSpec = ref(false)
const route  = useRoute();
const router = useRouter();
const contactPopup = ref({ show: false, phone: '', zalo: '' });
const openContact = (product) => {
  contactPopup.value = {
    show: true,
    phone: product.soDienThoai || '',
    zalo: product.zaloLink || '',
  };
};

const product         = ref(null);
// ── FLASH SALE ──
const flashSaleInfo   = ref(null); // { discount, salePrice, originalPrice }
const relatedFlashMap = ref(new Map());
const relatedProducts = ref([]);
const isLoading       = ref(true);
const selectedImage   = ref('');
const quantity        = ref(1);
const isLiked         = ref(false);

// ── Biến thể ──
const selectedColor = ref('');
const selectedSize  = ref('');

// ── Computed ──
const hasVariants = computed(() => product.value?.chiTietSanPhams?.length > 0);

// Combo items — lấy từ chiTietCombos (giống AdminProductDetail)
const comboItems = computed(() => product.value?.chiTietCombos || []);

const allImages = computed(() => {
  if (!product.value) return [];
  const list = product.value.danhSachAnh?.length
    ? product.value.danhSachAnh
    : product.value.anhChinh ? [product.value.anhChinh]
    : product.value.anhSanPham ? [product.value.anhSanPham] : [];
  return list.map(getImageUrl).filter(Boolean);
});

const availableColors = computed(() => {
  if (!hasVariants.value) return [];
  const colors = product.value.chiTietSanPhams.map(v => v.mauSac).filter(Boolean);
  return [...new Set(colors)];
});

const availableSizes = computed(() => {
  if (!hasVariants.value) return [];
  const sizes = product.value.chiTietSanPhams.map(v => v.kichThuoc).filter(Boolean);
  return [...new Set(sizes)];
});

const selectedVariant = computed(() => {
  if (!hasVariants.value) return null;
  return product.value.chiTietSanPhams.find(v => {
    const matchColor = !selectedColor.value || v.mauSac === selectedColor.value;
    const matchSize  = !selectedSize.value  || v.kichThuoc === selectedSize.value;
    return matchColor && matchSize;
  }) || null;
});

const currentStock = computed(() => {
  if (hasVariants.value) return selectedVariant.value?.tonKho ?? 0;
  return product.value?.tonKho ?? 0;
});

const displayPrice = computed(() => {
  if (hasVariants.value && selectedVariant.value) {
    const flash = chiTietFlashMapRef.value.get(selectedVariant.value.id);
    if (flash) return flash.salePrice;
    return selectedVariant.value.giaBan;
  }
  if (hasVariants.value) {
    return Math.min(...product.value.chiTietSanPhams.map(v => v.giaBan || 0));
  }
  return product.value?.giaBan || 0;
});
const priceRange = computed(() => {
  if (!hasVariants.value || selectedVariant.value) return null;
  const prices = product.value.chiTietSanPhams.map(v => v.giaBan || 0);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return null;
  return `${formatPrice(min)}đ – ${formatPrice(max)}đ`;
});

const detailRows = computed(() => {
  if (!product.value) return [];
  const p = product.value;
  const v = selectedVariant.value;
  return [
    { label: 'Thương hiệu',     value: p.thuongHieu },
    { label: 'Xuất xứ',         value: p.xuatXu },
    { label: 'Chất liệu',       value: p.chatLieu },
    { label: 'Chất lượng',      value: p.chatLuong },
    { label: 'Kiểu dáng',       value: p.kieuDang },
    { label: 'Màu sắc',         value: v?.mauSac || (availableColors.value.join(', ') || null) },
    { label: 'Kích thước',      value: v?.kichThuoc || (availableSizes.value.join(', ') || null) },
    { label: 'Trọng lượng',     value: v?.trongLuong || p.trongLuong },
    { label: 'Phù hợp cho',     value: p.phuHopCho },
    { label: 'Trọn bộ bao gồm', value: p.tronBo },
  ];
});

const categoryName = computed(() => {
  if (!product.value) return 'Sản phẩm';
  return product.value.tenDanhMuc || product.value.danhMuc?.tenDanhMuc || product.value.danhMuc || 'Sản phẩm';
});
const categoryLink = computed(() => {
  const name = categoryName.value;
  return name && name !== 'Sản phẩm' ? `/san-pham/${createSlug(name)}` : '/san-pham';
});

// ── Helpers ──
const colorMap = {
  'trắng': '#f0f0f0', 'đen': '#222', 'đỏ': '#e53935', 'xanh': '#1e88e5',
  'vàng': '#fdd835', 'nâu': '#795548', 'hồng': '#e91e96', 'cam': '#fb8c00',
  'xám': '#9e9e9e', 'tím': '#8e24aa', 'xanh lá': '#43a047', 'xanh lam': '#1e88e5',
  'xanh navy': '#1a237e', 'be': '#f5f0e8', 'kem': '#fffde7',
};

const colorHex = (name) => {
  if (!product.value?.chiTietSanPhams) return '#ddd';
  const variant = product.value.chiTietSanPhams.find(
    v => v.mauSac === name && v.mauSacHex && v.mauSacHex !== '#ffffff'
  );
  if (variant?.mauSacHex) return variant.mauSacHex;
  return colorMap[(name || '').toLowerCase().trim()] || '#ddd';
};

const getImageUrl = (url) => {
  if (!url) return 'https://placehold.co/400x400/e8f5e9/4caf50?text=No+Image';
  if (url.startsWith('http') || url.startsWith('blob:')) return url;
  if (url.startsWith('/uploads/')) return `${API_BASE}${url}`;
  return `${API_BASE}/uploads/${url}`;
};
const getProductImage = (item) => {
  if (!item) return getImageUrl(null);
  return getImageUrl(item.anhSanPham || item.anhChinh || item.danhSachAnh?.[0]);
};
const formatPrice     = (n) => Number(n || 0).toLocaleString('vi-VN');
const formatNumber    = (n) => !n ? 0 : n >= 1000 ? (n / 1000).toFixed(1) + 'k' : n;
const formatSoldCount = (n) => formatNumber(n || 0);

const createSlug = (str) => {
  if (!str) return '';
  return str.toString().toLowerCase()
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
};

// ── Chọn biến thể ──
const selectColor = (color) => {
  selectedColor.value = selectedColor.value === color ? '' : color;
  if (selectedSize.value && !isSizeAvailable(selectedSize.value)) {
    selectedSize.value = '';
  }
  syncVariantImage();
};

const selectSize = (size) => {
  selectedSize.value = selectedSize.value === size ? '' : size;
  syncVariantImage();
};

const syncVariantImage = () => {
  const candidate = product.value?.chiTietSanPhams?.find(v => {
    const matchColor = !selectedColor.value || v.mauSac === selectedColor.value;
    const matchSize  = !selectedSize.value  || v.kichThuoc === selectedSize.value;
    return matchColor && matchSize;
  });
  if (candidate?.anhSanPham) {
    selectedImage.value = getImageUrl(candidate.anhSanPham);
  } else if (allImages.value.length > 0) {
    selectedImage.value = allImages.value[0];
  }
};

const isSizeAvailable = (size) => {
  if (!hasVariants.value) return false;
  return product.value.chiTietSanPhams.some(v => {
    const matchColor = !selectedColor.value || v.mauSac === selectedColor.value;
    return matchColor && v.kichThuoc === size && (v.tonKho || 0) > 0;
  });
};

// ── Số lượng ──
const increaseQty = () => { if (quantity.value < currentStock.value) quantity.value++; };
const decreaseQty = () => { if (quantity.value > 1) quantity.value--; };
const validateQty = () => {
  let val = parseInt(quantity.value);
  let max = currentStock.value;
  if (isNaN(val) || val < 1) val = 1;
  if (val > max) val = max;
  quantity.value = val;
};


const fetchFlashSaleInfo = async (productId) => {
  try {
    const res = await axios.get(`${API_BASE}/api/khuyen-mai-flash`);
    const activeFlash = (res.data || [])
      .filter(f => f.trangThaiHienThi === 'Đang diễn ra');

    // Map: chiTietSanPhamId → flash info
    const chiTietFlashMap = new Map(); // ← thêm map theo chiTietId

    const relatedMap = new Map();

    await Promise.allSettled(
      activeFlash.map(async (flash) => {
        try {
          const pRes = await axios.get(`${API_BASE}/api/products/by-chi-tiet/${flash.chiTietSanPhamId}`);
          const p = pRes.data;
          const chiTiet = p.chiTietSanPhams?.find(ct => ct.id === Number(flash.chiTietSanPhamId));
          const giaBan = chiTiet?.giaBan || p.giaBan || 0;
          const salePrice = Math.round(giaBan * (1 - flash.phanTramGiamGia / 100));
          const info = {
            discount:      flash.phanTramGiamGia,
            salePrice,
            originalPrice: giaBan,
            chiTietId:     Number(flash.chiTietSanPhamId), // ← lưu chiTietId
          };

          if (p.id === Number(productId)) {
            flashSaleInfo.value = info;
          }
          relatedMap.set(p.id, info);
          chiTietFlashMap.set(Number(flash.chiTietSanPhamId), info); // ← lưu theo chiTietId
        } catch {}
      })
    );

    relatedFlashMap.value  = relatedMap;
    chiTietFlashMapRef.value = chiTietFlashMap; // ← lưu vào ref
  } catch {}
};

const chiTietFlashMapRef = ref(new Map()); // ← thêm dòng này cạnh flashSaleInfo
const currentFlash = computed(() => {
  if (selectedVariant.value) {
    return chiTietFlashMapRef.value.get(selectedVariant.value.id) || null;
  }
  return flashSaleInfo.value;
})
// ── Fetch ──
// MỚI — thêm reset ở đầu
const fetchProductDetails = async () => {
  const id = route.params.id;
  if (!id) return;
  try {
    isLoading.value = true;
    flashSaleInfo.value = null;   // ← reset khi load sản phẩm mới
    relatedFlashMap.value = new Map();
    const data = await userProductService.getProductById(id);
    data.reviews = data.reviews || [];
    product.value = data;
fetchFlashSaleInfo(id);
    selectedImage.value = allImages.value[0] || '';

    if (data.chiTietSanPhams?.length) {
      const first = data.chiTietSanPhams.find(v => v.tonKho > 0) || data.chiTietSanPhams[0];
      selectedColor.value = first.mauSac    || '';
      selectedSize.value  = first.kichThuoc || '';
      if (first.anhSanPham) {
        selectedImage.value = getImageUrl(first.anhSanPham);
      }
    }

    const catId = data.danhMuc?.id || data.danhMucId;
    if (catId) {
      try {
        const res = await axios.get(`${API_BASE}/api/products/${id}/related?categoryId=${catId}`);
        const list = res.data.content || res.data || [];
        relatedProducts.value = list.filter(p => p.id !== Number(id));
      } catch { relatedProducts.value = []; }
    }
  } catch (err) {
    console.error('Lỗi tải chi tiết:', err);
  } finally {
    isLoading.value = false;
  }
};

// ── Cart ──
const addToCart = async (item = null) => {
  const token  = localStorage.getItem('auth_token');
  const target = item || product.value;
  if (target?.lienHe) return;
  const variant = item ? null : selectedVariant.value;

  const chiTietId = variant?.id
    || target.chiTietId
    || target.chiTietSanPhams?.[0]?.id
    || target.id;

  const variantLabel = [variant?.mauSac, variant?.kichThuoc].filter(Boolean).join(', ');
  const tenHienThi   = variantLabel
    ? `${target.tenSanPham} (${variantLabel})`
    : target.tenSanPham;

  const payload = {
    nguoiDungId:      localStorage.getItem('user_id') || 2,
    chiTietSanPhamId: chiTietId,
    soLuong:          quantity.value,
    giaHienTai: (() => {
  if (variant) {
    const flash = chiTietFlashMapRef.value.get(variant.id);
    return flash ? flash.salePrice : variant.giaBan;
  }
  return currentFlash.value?.salePrice || target.giaBan || 0;
})(),
  };

  try {
    const res = await axios.post(`${API_BASE}/api/v1/cart/add`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data?.chiTietGioHangs) {
      cartState.items = res.data.chiTietGioHangs.map(i => {
        const sp = i.sanPham || i;
        const ct = product.value?.chiTietSanPhams?.find(
          v => v.id === (i.chiTietSanPhamId || i.id)
        );
        const label = [ct?.mauSac, ct?.kichThuoc].filter(Boolean).join(', ');
        return {
          id:          i.id,
          tenSanPham:  label
            ? `${sp.tenSanPham || target.tenSanPham} (${label})`
            : (sp.tenSanPham || target.tenSanPham),
          mauSac:      ct?.mauSac    || '',
          kichThuoc:   ct?.kichThuoc || '',
          maSku:       ct?.maSku     || sp.maSku || '',
          giaBan:      sp.giaBan     || target.giaBan,
          giaGoc:      sp.giaNhap    || sp.giaBan || 0,
          soLuong:     i.soLuong     || 1,
          tonKho:      sp.tonKho     || 99,
          trongLuong:  sp.trongLuong || ct?.trongLuong || 0,
          anhSanPham:  getImageUrl(ct?.anhSanPham || sp.anhChinh || sp.anhSanPham || target.anhChinh),
          duocChon: true,
        };
      });
    } else {
      const existing = cartState.items.find(i => i.id === chiTietId);
      if (existing) {
        existing.soLuong += quantity.value;
      } else {
        cartState.items.push({
          id:         chiTietId,
          tenSanPham: tenHienThi,
          mauSac:     variant?.mauSac    || '',
          kichThuoc:  variant?.kichThuoc || '',
          maSku:      variant?.maSku     || '',
          giaBan:     variant?.giaBan    || target.giaBan,
          giaGoc:     target.giaGoc      || target.giaBan,
          soLuong:    quantity.value,
          tonKho:     variant?.tonKho    || target.tonKho || 99,
          trongLuong: variant?.trongLuong || target.trongLuong || 0,
          anhSanPham: getImageUrl(variant?.anhSanPham || target.anhChinh || target.anhSanPham),
          duocChon: true,
        });
      }
    }

    window.dispatchEvent(new Event('cart-updated'));
    alert('Thêm vào giỏ hàng thành công!');
  } catch (err) {
    alert('Lỗi: ' + (err.response?.data?.message || 'Không thể thêm vào giỏ'));
  }
};

const buyNow = async () => {
  const token = localStorage.getItem('auth_token');
  if (!token) { alert('Vui lòng đăng nhập!'); router.push('/dang-nhap'); return; }

  const variant   = selectedVariant.value;
  const chiTietId = variant?.id
    || product.value.chiTietId
    || product.value.chiTietSanPhams?.[0]?.id
    || product.value.id;

  const flash  = variant
    ? chiTietFlashMapRef.value.get(variant.id)
    : flashSaleInfo.value;

  const gia    = flash?.salePrice || displayPrice.value;
  const giaGoc = flash?.originalPrice || variant?.giaBan || product.value.giaBan || gia;

  const anhHienThi = getImageUrl(
    variant?.anhSanPham
    || product.value.anhChinh
    || product.value.danhSachAnh?.[0]
    || product.value.anhSanPham
  );

  try {
    const res = await axios.post(`${API_BASE}/api/v1/cart/add`, {
      nguoiDungId:      localStorage.getItem('user_id') || 2,
      chiTietSanPhamId: chiTietId,
      soLuong:          quantity.value,
      giaHienTai:       gia,
    }, { headers: { Authorization: `Bearer ${token}` } });

    let cartItemId = Date.now();
    if (res.data?.chiTietGioHangs) {
      const found = res.data.chiTietGioHangs.find(
        i => i.chiTietSanPhamId === chiTietId || i.chiTietId === chiTietId
      );
      if (found) cartItemId = found.id;
    }

    localStorage.setItem('checkoutItems', JSON.stringify([{
      id:               cartItemId,
      chiTietSanPhamId: chiTietId,
      tenSanPham:       product.value.tenSanPham,
      mauSac:           variant?.mauSac     || '',
      kichThuoc:        variant?.kichThuoc  || '',
      trongLuong:       variant?.trongLuong || product.value.trongLuong || '',
      anhSanPham:       anhHienThi,
      giaBan:           gia,      // giá flash (hoặc giá gốc nếu không flash)
      giaHienTai:       gia,
      giaGoc:           giaGoc > gia ? giaGoc : 0,  // chỉ set khi có giảm giá
      soLuong:          quantity.value,
      thanhTien:        gia * quantity.value,
      duocChon:         true,
    }]));

    localStorage.setItem('checkoutTotal', gia * quantity.value);
    router.push('/thanh-toan');
  } catch (err) {
    alert('Lỗi mua ngay: ' + (err.response?.data?.message || 'Vui lòng thử lại'));
  }
};

// ── Review ──
const selectedStarFilter    = ref('ALL');
const showAllReviews        = ref(false);
const selectedReviewMedia   = ref(null);
const isReviewMediaModalOpen = ref(false);

const filteredReviews  = computed(() => {
  if (!product.value?.reviews) return [];
  if (selectedStarFilter.value === 'ALL') return product.value.reviews;
  return product.value.reviews.filter(r => Number(r.diemDanhGia) === Number(selectedStarFilter.value));
});
const displayedReviews = computed(() =>
  showAllReviews.value ? filteredReviews.value : filteredReviews.value.slice(0, 3)
);
watch(selectedStarFilter, () => { showAllReviews.value = false; });

const toggleLike       = () => { isLiked.value = !isLiked.value; };
const openReviewMedia  = (m) => { selectedReviewMedia.value = getImageUrl(m); isReviewMediaModalOpen.value = true; };
const closeReviewMedia = () => { isReviewMediaModalOpen.value = false; setTimeout(() => { selectedReviewMedia.value = null; }, 300); };
const isVideo          = (url) => url && ['.mp4','.mov','.webm','.ogg'].some(e => url.toLowerCase().includes(e));
const parseReviewImages = (s) => String(s).split(',').map(i => i.trim()).filter(Boolean);

const formatDate = (d) => {
  if (!d) return '';
  try {
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return d;
    return new Intl.DateTimeFormat('vi-VN', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' }).format(dt);
  } catch { return d; }
};

onMounted(() => fetchProductDetails());
watch(() => route.params.id, (id) => { if (id) { fetchProductDetails(); window.scrollTo(0, 0); } });
</script>

<style scoped>
.font-general { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
.bg-light-shopee { background-color: #f5f5f5; }
.text-shopee { color: #ee4d2d !important; }
.bg-shopee { background-color: #ee4d2d !important; border-color: #ee4d2d !important; }
.border-shopee { border-color: #ee4d2d !important; }
.btn-shopee { color: #fff; }
.btn-shopee:hover { background-color: #d73211 !important; color: white; }
.btn-outline-shopee { color: #ee4d2d; border: 1px solid #ee4d2d; background-color: rgba(255,87,34,0.05); }
.btn-outline-shopee:hover { background-color: rgba(255,87,34,0.15); color: #ee4d2d; }
.border-shopee-light { border: 1px solid #f9eceb; }
.btn-shopee-filter { background-color: #fff; border: 1px solid #e0e0e0; color: #000; }
.btn-shopee-filter.active { border-color: #ee4d2d; color: #ee4d2d; background-color: #fff; }

/* ── Biến thể ── */
.variant-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 12px; border: 1px solid #d9d9d9;
  background: #fff; border-radius: 2px; font-size: 0.82rem;
  cursor: pointer; transition: all 0.15s; color: #333;
  position: relative;
}
.variant-btn:hover { border-color: #ee4d2d; color: #ee4d2d; }
.variant-btn--active { border-color: #ee4d2d !important; color: #ee4d2d !important; background: #fff7f6; }
.variant-btn--active::after {
  content: '✓';
  position: absolute; bottom: -1px; right: -1px;
  background: #ee4d2d; color: white;
  font-size: 9px; width: 14px; height: 14px;
  display: flex; align-items: center; justify-content: center;
}
.variant-btn--disabled { opacity: 0.4; cursor: not-allowed; }
.color-dot-sm {
  width: 14px; height: 14px; border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.12); flex-shrink: 0;
  display: inline-block;
}

/* ── COMBO TẶNG KÈM ── */
.combo-gift-block {
  border: 1.5px dashed #f5a623;
  border-radius: 10px;
  overflow: hidden;
  background: #fffdf7;
}
.combo-gift-header {
  background: linear-gradient(90deg, #fff8e1, #fff3cd);
  padding: 10px 14px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #7a4f00;
  display: flex;
  align-items: center;
  gap: 4px;
  border-bottom: 1px dashed #f5a623;
}
.combo-gift-count {
  margin-left: auto;
  background: #f5a623;
  color: #fff;
  border-radius: 20px;
  padding: 1px 10px;
  font-size: 0.75rem;
  font-weight: 700;
}
.combo-gift-list {
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.combo-gift-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid #fdefc9;
}
.combo-gift-item:last-child { border-bottom: none; }
.combo-gift-thumb {
  width: 46px; height: 46px;
  border-radius: 6px;
  border: 1px solid #f5e0b0;
  background: #fff;
  overflow: hidden;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.combo-gift-thumb img { width: 100%; height: 100%; object-fit: cover; }
.combo-gift-info { flex: 1; min-width: 0; }
.combo-gift-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.combo-gift-tag {
  font-size: 0.7rem;
  background: #fff3cd;
  color: #856404;
  border-radius: 4px;
  padding: 1px 6px;
  font-weight: 600;
  border: 1px solid #ffe69c;
}
.combo-gift-qty {
  font-size: 0.82rem;
  font-weight: 700;
  color: #ee4d2d;
  flex-shrink: 0;
  background: #fff0ed;
  border-radius: 6px;
  padding: 2px 8px;
  border: 1px solid #ffd0c7;
}

.transition-all { transition: all 0.2s ease-in-out; }
.cursor-pointer { cursor: pointer; }
.hover-scale:hover { transform: scale(1.1); transition: 0.2s; }
.border-radius-2 { border-radius: 2px !important; }
.custom-scrollbar::-webkit-scrollbar { height: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }

/* Product cards */
.product-item { width: 100%; border: 1px solid transparent !important; border-radius: 2px; box-shadow: 0 1px 2px rgba(0,0,0,.05); transition: all 0.15s ease; }
.product-item:hover { border: 1px solid #ee4d2d !important; box-shadow: 0 2px 8px rgba(0,0,0,.15) !important; transform: translateY(-2px); }
.product-img-wrapper { width: 100%; aspect-ratio: 1/1; background-color: #fafafa; overflow: hidden; flex-shrink: 0; }
.product-img-wrapper img { width: 100%; height: 100%; object-fit: contain; padding: 8px; }

.related-products-section .product-category-label {
  font-size: 12px; letter-spacing: 1.5px;
  text-transform: uppercase; color: #999; margin-bottom: 6px;
}
.related-products-section .card-body { padding: 12px !important; text-align: center; }
.related-products-section .btn-outline-cart {
  border: 1.5px solid #c0392b; color: #c0392b; background: transparent;
  border-radius: 3px; font-size: 13px; letter-spacing: 1px;
  padding: 8px 0; transition: all 0.2s ease; width: 100%;
  font-weight: 700; text-transform: uppercase;
}
.related-products-section .btn-outline-cart:hover { background: #c0392b; color: white; }
.price-shopee { color: #ee4d2d; display: flex; align-items: baseline; }
.shopee-discount-badge { position: absolute; top: 0; right: 0; background-color: rgba(255,212,36,0.95); width: 36px; height: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 3; }
.shopee-discount-badge .percent { color: #ee4d2d; font-size: 12px; font-weight: 700; }
.shopee-discount-badge .label { color: white; font-size: 10px; font-weight: 600; text-transform: uppercase; }
.badge-custom { font-size: 0.65rem; padding: 2px 4px; border-radius: 2px; font-weight: 600; text-transform: uppercase; }
.badge-hot { background-color: #ee4d2d; color: #fff; }
.badge-cheap { border: 1px solid #ff7a00; color: #ff7a00; }
.amount { font-size: 18px; font-weight: 700; }

.related-products-section h5 { font-size: 16px; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; position: relative; padding-bottom: 8px; display: inline-block; }
.related-products-section h5::after { content: ''; position: absolute; left: 0; bottom: 0; width: 240px; height: 3px; background-color: #ee4d2d; border-radius: 2px; }

.product-description :deep(img) { max-width: 100% !important; height: auto !important; }
.review-img-box { border: 1px solid #e0e0e0; transition: border-color 0.2s ease; }
.review-img-box:hover { border-color: #ee4d2d !important; }
.review-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.85); z-index: 9999; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px); }
.review-modal-content { position: relative; max-width: 90vw; max-height: 90vh; }
.review-modal-content img, .review-modal-content video { max-height: 85vh; max-width: 100%; }
.btn-close-modal { position: absolute; top: -40px; right: 0; background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer; z-index: 10000; }
.btn-close-modal:hover { color: #ee4d2d; }

.related-products-section .price-shopee { color: #c0392b !important; justify-content: center; display: flex !important; align-items: baseline; }
.related-products-section .price-shopee .amount { color: #c0392b !important; font-size: 18px !important; font-weight: 700 !important; }
.related-products-section .product-name { color: #333 !important; font-weight: 500 !important; }
/* ── TAG HORECA VN ── */
.tag-horeca {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(135deg, #ee4d2d 0%, #c0392b 100%);
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(238,77,45,0.35);
  position: relative;
  overflow: hidden;
}
.tag-horeca::after {
  content: '';
  position: absolute;
  top: 0; left: -40%;
  width: 30%; height: 100%;
  background: rgba(255,255,255,0.18);
  transform: skewX(-20deg);
}

/* ── TAG COMBO ── */
.tag-combo {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #7a4f00;
  background: linear-gradient(135deg, #ffe566 0%, #ffa800 100%);
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(255,168,0,0.35);
}

/* ── NÚT LIÊN HỆ TƯ VẤN ── */
.btn-lien-he {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px 10px 10px;
  background: linear-gradient(135deg, #1a9e5c 0%, #15803d 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(21,128,61,0.35);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}
.btn-lien-he::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
  pointer-events: none;
}
.btn-lien-he:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(21,128,61,0.45);
  background: linear-gradient(135deg, #1db870 0%, #15803d 100%);
}
.btn-lien-he:active { transform: translateY(0); }
.btn-lien-he__icon {
  width: 32px; height: 32px;
  background: rgba(255,255,255,0.2);
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.95rem;
  flex-shrink: 0;
}
.btn-lien-he__text {
  letter-spacing: 0.3px;
}
/* ── LAYOUT BIẾN THỂ ── */
/* ── VARIANT ROW (fix layout) ── */
.variant-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.variant-label {
  color: #888;
  font-size: 0.82rem;
  flex-shrink: 0;
  width: 80px;
  padding-top: 7px;
  line-height: 1.4;
}
.variant-value {
  font-size: 0.85rem;
  color: #333;
  font-weight: 500;
  padding-top: 7px;
}

/* ── ALERT VARIANT (thay alert-warning) ── */
.alert-variant {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #fff8ec;
  border: 1px solid #ffe0a0;
  border-radius: 6px;
  font-size: 0.82rem;
  color: #7a5200;
}

/* ── DETAIL BADGES ── */
.detail-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.2px;
  line-height: 1.5;
}
.detail-badge--success {
  background: #e6f9f0;
  color: #0a6640;
  border: 1px solid #b7ebd4;
}
.detail-badge--warning {
  background: #fff8ec;
  color: #7a5200;
  border: 1px solid #ffe0a0;
}
.detail-badge--danger {
  background: #fff0f0;
  color: #c0392b;
  border: 1px solid #fcc;
}
.detail-badge--combo {
  background: #fff8e1;
  color: #7a4f00;
  border: 1px solid #ffd97a;
}


/* ── PRICE SECTION ── */
.price-section {
  background: #fafafa;
  border-radius: 8px;
  padding: 14px 16px;
  border: 1px solid #f0f0f0;
}

/* ── SHIPPING BLOCK ── */
.shipping-block {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 8px;
  align-items: start;
  font-size: 0.82rem;
}
.shipping-label {
  color: #888;
  font-size: 0.82rem;
  padding-top: 4px;
}
.shipping-content { display: flex; flex-direction: column; gap: 4px; }
/* ===== MOBILE SPEC BUTTON ===== */
.mobile-spec-btn {
  width: 100%; display: flex; align-items: center;
  padding: 10px 14px; border-radius: 8px;
  border: 1.5px solid #ee4d2d; background: #fff5f3;
  color: #ee4d2d; font-size: .85rem; font-weight: 600;
  cursor: pointer; transition: all .2s;
}
.mobile-spec-btn:hover { background: #fde8e4; }

/* ===== MOBILE FILTER PANEL (dùng lại style từ CategoryDetail) ===== */
.mobile-filter-backdrop {
  position: fixed; inset: 0; z-index: 99999;
  background: rgba(0,0,0,.45);
  display: flex; align-items: flex-end;
}
.mobile-filter-panel {
  width: 100%; max-height: 85vh; background: #fff;
  border-radius: 20px 20px 0 0;
  display: flex; flex-direction: column; overflow: hidden;
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
.mfp-body {
  flex: 1; overflow-y: auto; padding: 16px 20px;
  display: flex; flex-direction: column; gap: 20px;
}
.mfp-label {
  font-size: 12px; font-weight: 700; text-transform: uppercase;
  letter-spacing: .8px; color: #999; margin-bottom: 10px;
}
.mfp-pills { display: flex; flex-wrap: wrap; gap: 8px; }
.mfp-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 14px; border-radius: 30px; font-size: 13px; font-weight: 600;
  border: 1.5px solid #e8eaed; background: transparent; color: #555;
  cursor: pointer; transition: all .2s;
}
.mfp-pill:hover { border-color: #ee4d2d; color: #ee4d2d; background: #fff5f3; }
.mfp-pill--active { background: #ee4d2d !important; border-color: #ee4d2d !important; color: #fff !important; }
.mfp-pill--disabled { opacity: .4; cursor: not-allowed; }

.mfp-detail-list { display: flex; flex-direction: column; gap: 10px; }
.mfp-detail-row {
  display: flex; justify-content: space-between; align-items: flex-start;
  padding: 8px 0; border-bottom: 1px solid #f5f5f5; gap: 12px;
}
.mfp-detail-label { font-size: 13px; color: #999; flex-shrink: 0; min-width: 100px; }
.mfp-detail-value { font-size: 13px; color: #222; font-weight: 500; text-align: right; }

.mfp-ship-row {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; color: #444;
}
.mfp-footer {
  padding: 16px 20px; border-top: 1px solid #f0f0f0; flex-shrink: 0;
}
.mfp-btn-apply {
  width: 100%; padding: 13px; border-radius: 10px;
  border: none; background: #ee4d2d; color: #fff;
  font-size: 14px; font-weight: 700; cursor: pointer; transition: all .2s;
}
.mfp-btn-apply:hover { background: #d73211; }

.filter-slide-enter-active, .filter-slide-leave-active { transition: opacity .25s ease; }
.filter-slide-enter-active .mobile-filter-panel,
.filter-slide-leave-active .mobile-filter-panel { transition: transform .3s cubic-bezier(.4,0,.2,1); }
.filter-slide-enter-from { opacity: 0; }
.filter-slide-enter-from .mobile-filter-panel { transform: translateY(100%); }
.filter-slide-leave-to { opacity: 0; }
.filter-slide-leave-to .mobile-filter-panel { transform: translateY(100%); }

.text-shopee { color: #ee4d2d !important; }
/* ===== MOBILE RESPONSIVE ===== */
@media (max-width: 767px) {
  /* Ẩn variant row + shipping block trên mobile — dùng popup thay */
  .variant-row { display: none !important; }
  .alert-variant { display: none !important; }
  .shipping-block { display: none !important; }
 .detail-block { display: none !important; }
  /* Ẩn nút share/like trên mobile */
  .d-flex.justify-content-center.align-items-center.mt-4 { display: none !important; }

  /* Block 1 padding */
  .bg-white.p-4.rounded { padding: 12px !important; }

  /* Tên sản phẩm */
  h4.fw-bold { font-size: .95rem !important; margin-bottom: 6px !important; }

  /* Giá */
  .price-section { padding: 10px 12px; }
  .text-shopee[style*="font-size:2rem"] { font-size: 1.4rem !important; }

  /* Nút thêm giỏ / mua ngay */
  .d-flex.gap-3 { gap: 6px !important; }
  .btn-outline-shopee, .btn.btn-shopee { font-size: .8rem !important; padding: 10px 8px !important; }

  /* Rating bar */
  .d-flex.align-items-center.small.mb-4 { font-size: .7rem; }

  /* Block 3 đánh giá */
  .btn-shopee-filter { font-size: .7rem; padding: 4px 8px; }
  .review-item { gap: 8px; }

  /* Block 4 liên quan */
  .related-products-section .product-name { font-size: 12px; min-height: 32px; }
  .related-products-section .card-body { padding: 8px !important; }
  .related-products-section .btn-outline-cart { font-size: 11px; padding: 5px 0; }
}

@media (max-width: 575px) {
  .container { padding: 0 10px !important; }

  /* Thumbnails nhỏ lại */
  div[style*="width:80px"] { width: 56px !important; height: 56px !important; }

  /* Combo block */
  .combo-gift-thumb { width: 36px; height: 36px; }
  .combo-gift-name { font-size: .75rem; }

  /* Star filter scroll ngang */
  .d-flex.flex-wrap.gap-2.flex-grow-1 { flex-wrap: nowrap !important; overflow-x: auto; padding-bottom: 4px; }
}

/* Desktop — ẩn nút mở popup */
@media (min-width: 768px) {
  .mobile-spec-btn { display: none !important; }
}
</style>
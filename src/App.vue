<template>
  <div class="app-container">

    <!-- ============================
         HEADER
    ============================= -->
    <header class="header-wrapper sticky-top shadow-sm">

      <!-- TOP BAR -->
      <div class="top-bar py-2 bg-white border-bottom">
        <div class="container-fluid px-lg-5">
          <div class="row align-items-center">

            <!-- LOGO CHÍNH + LONG PHƯƠNG (cùng cột, giữ layout gốc col-lg-2) -->
            <div class="col-lg-2 col-auto">
  <div class="d-flex align-items-center gap-2">

    <!-- HAMBURGER CHỈ HIỆN MOBILE -->
    <button
      class="btn d-none p-0 me-1 mobile-hamburger"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#sidebarMenu"
    >
      <div class="hamburger-menu">
        <span></span><span></span><span></span>
      </div>
    </button>

    <!-- Logo Horeca -->
    <router-link to="/" class="d-inline-block flex-shrink-0">
                  <img
                    src="@/assets/images/logo.png"
                    alt="Logo"
                    class="header-logo"
                  />
                </router-link>

                <!-- Divider + Logo Long Phương (chỉ desktop) -->
                <div class="d-flex align-items-center gap-1 lp-brand-wrap">
                  <div class="lp-divider"></div>
                  <div class="lp-brand-box">
                    <div class="lp-brand-label">Đối tác chiến lược</div>
                    <img
                      src="@/assets/images/logo-long-phuong.png"
                      alt="Long Phương"
                      class="lp-brand-logo"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- SEARCH -->
            <div class="col-lg-6 d-none d-lg-block ps-0 ms-n3">
              <div class="search-wrapper position-relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control rounded-pill pe-5 py-2 custom-search-input"
                  placeholder="Tìm kiếm sản phẩm..."
                  @keyup.enter="handleSearch"
                  @input="handleSearchInput"
                  @focus="showSearchDrop = true"
                  @blur="onSearchBlur"
                />
                <button
                  class="btn position-absolute top-50 end-0 translate-middle-y me-1 rounded-circle search-btn-icon"
                  @click="handleSearch"
                >
                  <i class="bi bi-search"></i>
                </button>

                <transition name="search-drop">
                  <div v-if="showSearchDrop && searchQuery.trim().length >= 2" class="search-dropdown shadow-lg">
                    <div v-if="searchLoading" class="search-loading">
                      <div class="spinner-border spinner-border-sm text-danger me-2"></div>
                      Đang tìm kiếm...
                    </div>
                    <template v-else-if="searchResults.length > 0">
                      <router-link
                        v-for="item in searchResults.slice(0, 6)"
                        :key="item.id"
                        :to="`/san-pham/chi-tiet/${item.id}`"
                        class="search-result-item"
                        @mousedown.prevent="clearSearch"
                      >
                        <img
                          v-if="getImageUrl(item.anhChinh)"
                          :src="getImageUrl(item.anhChinh)"
                          :alt="item.tenSanPham"
                          class="search-result-img"
                          @error="(e) => e.target.style.display='none'"
                        />
                        <div v-else class="search-result-img-placeholder">
                          <i class="bi bi-image"></i>
                        </div>
                        <div class="search-result-info">
                          <div class="search-result-name">{{ item.tenSanPham }}</div>
                          <div class="search-result-price">
  <span v-if="item.giaGoc && item.giaGoc > item.giaBan"
        class="text-muted text-decoration-line-through me-1"
        style="font-size:0.75rem; font-weight:400;">
    {{ formatPrice(item.giaGoc) }}
  </span>
  <span :class="{ 'search-result-contact': !item.giaBan || item.giaBan === 0 }">
    {{ formatPrice(item.giaBan || 0) }}
  </span>
</div>
                        </div>
                      </router-link>
                      <div class="search-view-all" @mousedown.prevent="handleSearch">
                        <i class="bi bi-search me-2"></i>
                        Xem tất cả kết quả cho "<strong>{{ searchQuery }}</strong>"
                      </div>
                    </template>
                    <div v-else class="search-no-result">
                      <i class="bi bi-emoji-frown fs-5 text-muted mb-2 d-block text-center"></i>
                      <div class="text-muted small text-center">Không tìm thấy sản phẩm phù hợp</div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>

            <!-- ACTIONS -->
          <div class="col-lg-4 col d-flex align-items-center justify-content-end gap-3">

  <!-- NÚT SEARCH CHỈ HIỆN MOBILE -->
 <button
    class="btn d-lg-none mobile-search-toggle p-0"
    @click="toggleMobileSearch"
    type="button"
  >
    <div class="mobile-search-icon-wrap" :class="{ 'is-active': showMobileSearch }">
      <i class="bi bi-search icon-search"></i>
      <i class="bi bi-x-lg icon-close"></i>
    </div>
  </button>

<div class="d-none d-xl-flex align-items-center gap-2 pe-3 me-1 contact-divider">
  <i class="bi bi-telephone-fill text-danger fs-4 phone-ring-anim"></i>
  <div class="lh-sm text-start">
    <router-link to="/lien-he" class="text-decoration-none text-muted small hover-red">
      Liên hệ ngay
    </router-link>
    <a href="tel:0786667447" class="fw-bold text-dark text-decoration-none d-block hover-red" style="font-size:14px;">
      0786.667.447
    </a>
  </div>
</div>

              <!-- USER -->
              <div class="user-auth-zone">
                <router-link
                  v-if="!isLoggedIn"
                  to="/dang-nhap"
                  class="text-dark text-decoration-none d-flex align-items-center gap-2 hover-red"
                >
                  <i class="bi bi-person-circle fs-4 text-danger"></i>
                  <span class="d-none d-md-inline small fw-semibold">Đăng nhập</span>
                </router-link>

                <div v-else class="dropdown">
                  <div class="d-flex align-items-center gap-2 cursor-pointer" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="user-avatar-circle">
                      <img v-if="userAvatar" :src="userAvatar" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
                      <span v-else>{{ userName.charAt(0).toUpperCase() || '?' }}</span>
                    </div>
                    <div class="d-none d-md-block lh-sm text-start">
                      <div class="text-muted small">Xin chào,</div>
                      <div class="fw-bold text-dark user-name-text">
                        {{ userName || 'Khách' }} <i class="bi bi-chevron-down ms-1"></i>
                      </div>
                    </div>
                  </div>

                  <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2 animate-fade-in user-dropdown-menu">
                    <li>
                      <router-link class="dropdown-item py-2" to="/profile">
                        <i class="bi bi-person me-2 text-danger"></i>Tài khoản của tôi
                      </router-link>
                    </li>
                    <li>
                      <router-link class="dropdown-item py-2" to="/don-hang">
                        <i class="bi bi-bag-check me-2 text-danger"></i>Đơn hàng đã mua
                      </router-link>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a class="dropdown-item py-2 text-danger" href="#" @click.prevent="handleLogout">
                        <i class="bi bi-box-arrow-right me-2"></i>Đăng xuất
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- CART -->
              <div class="cart-zone ps-md-2">
                <router-link to="/gio-hang" class="position-relative text-dark text-decoration-none d-flex align-items-center hover-red">
                  <i class="bi bi-cart3 fs-3"></i>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark shadow-sm cart-badge">
                    {{ cartItemCount }}
                  </span>
                </router-link>
              </div>

            </div>
          </div>
        </div>
     </div><!-- end top-bar -->

      <!-- MOBILE SEARCH BAR (slide down) -->
      <div class="mobile-search-bar" :class="{ 'mobile-search-bar--open': showMobileSearch }">
        <div class="container-fluid px-3 py-2">
          <div class="search-wrapper position-relative">
            <input
              v-model="searchQuery"
              ref="mobileSearchInput"
              type="text"
              class="form-control rounded-pill pe-5 py-2 custom-search-input"
              placeholder="Tìm kiếm sản phẩm..."
              @keyup.enter="handleSearch(); showMobileSearch = false"
              @input="handleSearchInput"
              @focus="showSearchDrop = true"
              @blur="onSearchBlur"
            />
            <button
              class="btn position-absolute top-50 end-0 translate-middle-y me-1 rounded-circle search-btn-icon"
              @click="handleSearch(); showMobileSearch = false"
            >
              <i class="bi bi-search"></i>
            </button>
            <transition name="search-drop">
              <div v-if="showSearchDrop && searchQuery.trim().length >= 2" class="search-dropdown shadow-lg">
                <div v-if="searchLoading" class="search-loading">
                  <div class="spinner-border spinner-border-sm text-danger me-2"></div>
                  Đang tìm kiếm...
                </div>
                <template v-else-if="searchResults.length > 0">
                  <router-link
                    v-for="item in searchResults.slice(0, 5)"
                    :key="item.id"
                    :to="`/san-pham/chi-tiet/${item.id}`"
                    class="search-result-item"
                    @mousedown.prevent="clearSearch"
                  >
                    <img
                      v-if="getImageUrl(item.anhChinh)"
                      :src="getImageUrl(item.anhChinh)"
                      :alt="item.tenSanPham"
                      class="search-result-img"
                      @error="(e) => e.target.style.display='none'"
                    />
                    <div v-else class="search-result-img-placeholder"><i class="bi bi-image"></i></div>
                    <div class="search-result-info">
                      <div class="search-result-name">{{ item.tenSanPham }}</div>
                      <div class="search-result-price">
  <span v-if="item.giaGoc && item.giaGoc > item.giaBan"
        class="text-muted text-decoration-line-through me-1"
        style="font-size:0.75rem; font-weight:400;">
    {{ formatPrice(item.giaGoc) }}
  </span>
  <span>{{ formatPrice(item.giaBan || 0) }}</span>
</div>
                    </div>
                  </router-link>
                  <div class="search-view-all" @mousedown.prevent="handleSearch(); showMobileSearch = false">
                    <i class="bi bi-search me-2"></i>
                    Xem tất cả cho "<strong>{{ searchQuery }}</strong>"
                  </div>
                </template>
                <div v-else class="search-no-result">
                  <i class="bi bi-emoji-frown fs-5 text-muted mb-2 d-block text-center"></i>
                  <div class="text-muted small text-center">Không tìm thấy sản phẩm phù hợp</div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- MAIN NAV BAR -->
      <nav class="main-nav py-2">
        <div class="container-fluid px-lg-5">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">

              <!-- Hamburger -->
              <button
                class="btn category-trigger d-flex align-items-center gap-3 shadow-none text-white px-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#sidebarMenu"
              >
                <div class="hamburger-menu">
                  <span></span><span></span><span></span>
                </div>
              </button>

              <!-- Desktop Nav Links -->
              <div class="d-none d-lg-flex ms-5 gap-3 gap-xl-4 align-items-center modern-nav-wrapper">

                <router-link to="/" class="modern-nav-link" title="Trang chủ">
                  <i class="bi bi-house-door-fill fs-5 mb-1"></i>
                </router-link>

                <router-link to="/gioi-thieu" class="modern-nav-link">Giới Thiệu</router-link>

                <!-- Dropdown Sản Phẩm -->
                <div
                  class="modern-dropdown position-relative h-100 d-flex align-items-center"
                  @mouseenter="showSanPham = true"
                  @mouseleave="showSanPham = false"
                >
                  <span class="modern-nav-link cursor-pointer d-flex align-items-center gap-1">
                    Sản Phẩm <i class="bi bi-chevron-down ms-1" style="font-size:11px;"></i>
                  </span>
                  <div
  class="modern-dropdown-menu shadow-lg bg-white rounded-4"
  :class="{ 'dropdown-visible': showSanPham }"
>
  <div v-for="cat in categories" :key="cat.id"
    class="m-dropdown-item-wrap position-relative"
    @mouseenter="hoveredCat = cat.id"
    @mouseleave="hoveredCat = null">

    <router-link
      class="d-flex justify-content-between align-items-center px-4 py-3 text-dark fw-bold text-decoration-none m-link-level-1 border-bottom"
      :to="`/san-pham/${createSlug(cat.tenDanhMuc || cat.name)}`"
      @click="showSanPham = false"
    >
      <span class="d-flex align-items-center gap-2">
        <span class="m-bullet"></span>
        {{ cat.tenDanhMuc || cat.name }}
      </span>
      <i v-if="cat.children && cat.children.length > 0"
         class="bi bi-chevron-right text-muted fs-7"></i>
    </router-link>

    <!-- SUB LEVEL 2 -->
    <div
      v-if="cat.children && cat.children.length > 0"
      class="m-sub-dropdown shadow-lg bg-white rounded-4"
      :class="{ 'subdropdown-visible': hoveredCat === cat.id }"
    >
      <div
        v-for="child in cat.children" :key="child.id"
        class="m-sub-item-wrap position-relative"
        @mouseenter="hoveredChild = child.id"
        @mouseleave="hoveredChild = null"
      >
        <router-link
          class="d-flex justify-content-between align-items-center px-4 py-2 my-1 mx-2 rounded-3 text-secondary text-decoration-none m-link-level-2"
          :to="`/san-pham/${createSlug(child.tenDanhMuc || child.name)}`"
          @click="showSanPham = false; hoveredCat = null"
        >
          <span>{{ child.tenDanhMuc || child.name }}</span>
          <i v-if="child.children && child.children.length > 0"
             class="bi bi-chevron-right text-muted ms-2" style="font-size:11px;"></i>
        </router-link>

        <!-- SUB LEVEL 3 -->
        <div
          v-if="child.children && child.children.length > 0"
          class="m-sub-dropdown-lv3 shadow-lg bg-white rounded-4"
          :class="{ 'subdropdown-lv3-visible': hoveredChild === child.id }"
        >
          <router-link
            v-for="grandchild in child.children" :key="grandchild.id"
            class="d-block px-4 py-2 my-1 mx-2 rounded-3 text-secondary text-decoration-none m-link-level-3"
            :to="`/san-pham/${createSlug(grandchild.tenDanhMuc || grandchild.name)}`"
            @click="showSanPham = false; hoveredCat = null; hoveredChild = null"
          >
            {{ grandchild.tenDanhMuc || grandchild.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</div>  
</div> 

                <router-link to="/du-an" class="modern-nav-link">Dự Án</router-link>

                <!-- HOT DEAL với fire animation -->
                <router-link to="/hot-deal" class="modern-nav-link highlight-deal d-flex align-items-center gap-1">
                  <i class="bi bi-fire fs-5 fire-anim"></i> Hot Deal
                </router-link>

                <router-link to="/tin-tuc" class="modern-nav-link">Tin Tức</router-link>
                <router-link to="/lien-he" class="modern-nav-link">Liên Hệ</router-link>
              </div>

              <!-- Quick Tags -->
              <div class="quick-tags d-none d-xl-flex ms-4 gap-3 text-white-50 small">
                <span class="text-white">#SứLongPhương</span>
                <span class="text-white">#HorecaVietnam</span>
                <span class="text-white">#ThiếtBịFnB</span>
              </div>
            </div>

            <div class="d-none d-md-block text-white small italic">
              {{ greetingText }}{{ isLoggedIn ? ', ' + userName : '' }}, Chào mừng bạn đến với hệ thống!
            </div>
          </div>
        </div>
      </nav>
    </header>

    <!-- ============================
         SIDEBAR (OFFCANVAS)
    ============================= -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebarMenu">

  <!-- ── Sidebar Header ── -->
  <div class="sb-header">

    <div class="sb-identity">
      <div class="sb-avatar-wrap">
        <template v-if="isLoggedIn">
          <img v-if="userAvatar" :src="userAvatar" alt="Avatar" class="sb-avatar-img" />
          <span v-else class="sb-avatar-letter">{{ userName.charAt(0).toUpperCase() }}</span>
        </template>
        <i v-else class="bi bi-person-circle sb-avatar-guest"></i>
        <span class="sb-online-dot" v-if="isLoggedIn"></span>
      </div>
      <div class="sb-identity-text">
        <div class="sb-greeting-name">{{ isLoggedIn ? userName : 'Khách' }} 👋</div>
        <div class="sb-greeting-sub">{{ greetingText }} – hôm nay cần gì?</div>
      </div>
      <button type="button" class="sb-close-btn ms-auto" data-bs-dismiss="offcanvas" aria-label="Đóng">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <svg class="sb-wave" viewBox="0 0 300 18" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 C75,18 225,0 300,12 L300,18 L0,18 Z" fill="rgba(255,255,255,0.06)" />
      <path d="M0,6 C60,18 240,2 300,16 L300,18 L0,18 Z" fill="rgba(255,255,255,0.04)" />
    </svg>
  </div>

  <!-- ── Sidebar Body ── -->
  <div class="offcanvas-body">

    <!-- NAV LINKS — chỉ hiện mobile (< lg) -->
   <!-- NAV LINKS — chỉ hiện mobile (< lg) -->
<div class="sb-nav-links d-lg-none">
  <router-link to="/" class="sb-nav-item">
    <span class="sb-nav-icon"><i class="bi bi-house-door-fill"></i></span>
    <span>Trang Chủ</span>
  </router-link>
  <router-link to="/gioi-thieu" class="sb-nav-item">
    <span class="sb-nav-icon"><i class="bi bi-info-circle-fill"></i></span>
    <span>Giới Thiệu</span>
  </router-link>
  <router-link to="/du-an" class="sb-nav-item">
    <span class="sb-nav-icon"><i class="bi bi-building"></i></span>
    <span>Dự Án</span>
  </router-link>
  <router-link to="/hot-deal" class="sb-nav-item sb-nav-item--deal">
    <span class="sb-nav-icon"><i class="bi bi-fire"></i></span>
    <span>Hot Deal</span>
  </router-link>
  <router-link to="/tin-tuc" class="sb-nav-item">
    <span class="sb-nav-icon"><i class="bi bi-newspaper"></i></span>
    <span>Tin Tức</span>
  </router-link>
  <router-link to="/lien-he" class="sb-nav-item">
    <span class="sb-nav-icon"><i class="bi bi-telephone-fill"></i></span>
    <span>Liên Hệ</span>
  </router-link>

</div>

    <div class="sb-section-label">
      <span class="sb-section-line"></span>
      <span class="sb-section-text">Danh mục sản phẩm</span>
      <span class="sb-section-line"></span>
    </div>

    <ul class="sb-menu-list">
      <li v-for="(cat, idx) in categories" :key="cat.id"
        :style="`--item-delay: ${idx * 40}ms`" class="sb-menu-item-wrap">

        <router-link
          v-if="!cat.children || cat.children.length === 0"
          :to="`/san-pham/${createSlug(cat.tenDanhMuc || cat.name)}`"
          class="sb-item"
        >
          <span class="sb-item-icon"><i class="bi bi-tag-fill"></i></span>
          <span class="sb-item-label">{{ cat.tenDanhMuc || cat.name }}</span>
          <i class="bi bi-arrow-right-short sb-item-arrow"></i>
        </router-link>

        <template v-else>
          <div class="sb-item sb-item--toggle"
  :class="{ 'sb-item--open': expandedCats.has(cat.id) }"
>
  <span class="sb-item-icon"><i class="bi bi-grid-fill"></i></span>
  <router-link
    :to="`/san-pham/${createSlug(cat.tenDanhMuc || cat.name)}`"
    class="sb-item-label text-decoration-none"
    :class="expandedCats.has(cat.id) ? 'text-danger' : 'text-dark'"
  >
    {{ cat.tenDanhMuc || cat.name }}
  </router-link>
  <span class="sb-item-count">{{ cat.children.length }}</span>
  <i class="bi bi-chevron-down sb-item-chevron"
     :class="{ 'rotated': expandedCats.has(cat.id) }"
     @click.stop="toggleCat(cat.id)"
     style="padding: 6px; margin: -6px; cursor: pointer;"></i>
</div>

          <div class="sb-accordion" :class="{ 'sb-accordion--open': expandedCats.has(cat.id) }">
            <div class="sb-accordion-inner">

              <template v-for="child in cat.children" :key="child.id">

                <router-link
                  v-if="!child.children || child.children.length === 0"
                  :to="`/san-pham/${createSlug(child.tenDanhMuc || child.name)}`"
                  class="sb-child-item"
                >
                  <span class="sb-child-dot"></span>
                  <span>{{ child.tenDanhMuc || child.name }}</span>
                </router-link>

                <template v-else>
                  <button type="button" class="sb-child-item sb-child-toggle"
                    :class="{ 'sb-child-open': expandedChildren.has(child.id) }"
                    @click="toggleChild(child.id)"
                  >
                    <span class="sb-child-dot sb-child-dot--folder"></span>
                    <span class="flex-1">{{ child.tenDanhMuc || child.name }}</span>
                    <span class="sb-child-count">{{ child.children.length }}</span>
                    <i class="bi bi-chevron-down sb-child-chevron"
                       :class="{ 'rotated': expandedChildren.has(child.id) }"
                       style="font-size:10px;"></i>
                  </button>

                  <div class="sb-accordion sb-accordion-lv3"
                       :class="{ 'sb-accordion--open': expandedChildren.has(child.id) }">
                    <div class="sb-accordion-inner">
                      <router-link
                        v-for="grand in child.children" :key="grand.id"
                        :to="`/san-pham/${createSlug(grand.tenDanhMuc || grand.name)}`"
                        class="sb-grandchild-item"
                      >
                        <span class="sb-grand-dot"></span>
                        <span>{{ grand.tenDanhMuc || grand.name }}</span>
                      </router-link>
                    </div>
                  </div>
                </template>

              </template>
            </div>
          </div>
        </template>
      </li>
    </ul>

    <!-- ── Footer area ── -->
    <div class="sb-footer">
      <div class="sb-support-card">
        <div class="sb-support-header">
          <div class="sb-support-pulse"></div>
          <span class="sb-support-title">Hỗ trợ 24/7</span>
        </div>
        <a href="tel:0786667447" class="sb-support-btn sb-support-btn--phone">
          <i class="bi bi-telephone-fill"></i>
          <span>0786.667.447</span>
        </a>
        <a href="https://zalo.me/0786667447" target="_blank" rel="noopener" class="sb-support-btn sb-support-btn--zalo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
            alt="Zalo" width="20" height="20"
            style="object-fit:contain;"
          />
          <span>Chat Zalo</span>
        </a>
      </div>

      <div class="sb-socials">
       <a href="https://www.facebook.com/profile.php?id=61589383380349" target="_blank" rel="noopener" class="sb-social-btn sb-social-btn--fb" title="Facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="sb-social-btn sb-social-btn--yt" title="YouTube"><i class="bi bi-youtube"></i></a>
        <a href="#" class="sb-social-btn sb-social-btn--tt" title="TikTok"><i class="bi bi-tiktok"></i></a>
      </div>

     <a v-if="isLoggedIn" href="#" class="sb-auth-btn sb-auth-btn--logout" @click.prevent="handleLogout">
        <i class="bi bi-box-arrow-right"></i> Đăng xuất
      </a>
      <router-link v-else to="/dang-nhap" class="sb-auth-btn sb-auth-btn--login">
        <i class="bi bi-person-circle"></i> Đăng nhập
      </router-link>

      <!-- Logo công ty cuối sidebar -->
      <div class="sb-brand-footer">
        <router-link to="/" class="sb-brand-footer-link">
          <img src="@/assets/images/logo.png" alt="Horeca VN" class="sb-brand-footer-logo" />
        </router-link>
        <div class="sb-brand-footer-copy">© 2026 Horeca Việt Nam</div>
      </div>
    </div>
  </div>
</div>

    <!-- ============================
         MAIN CONTENT
    ============================= -->
    <main>
      <router-view />
    </main>

    <!-- PARTNER LOGOS -->
    <div class="partner-logos-section py-5 bg-light" v-if="$route.path === '/'">
      <div class="container text-center mb-4">
        <h2 class="serif-heading mb-3">Đối tác &amp; Khách hàng</h2>
        <p class="text-muted mx-auto partner-desc">
          One Horeca tự hào là đối tác chính thức cung cấp các sản phẩm, giải pháp F&amp;B và nguyên liệu pha chế
          cho hệ thống khách sạn, resort và nhà hàng từ 3–5 sao.
        </p>
      </div>
      <div class="marquee-outer" @mouseenter="pauseMarquee" @mouseleave="resumeMarquee">
        <div class="marquee-track" ref="marqueeTrack">
          <template v-for="n in 2" :key="n">
            <div class="partner-logo-item" v-for="partner in partners" :key="partner.name + n">
              <div class="partner-logo-card">
                <img :src="partner.logo" :alt="partner.name" class="partner-logo-img" />
                <span class="partner-logo-name">{{ partner.name }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- ============================
         FOOTER
    ============================= -->
    <div class="footer-wrapper">
      <footer class="footer-custom text-white">

        <!-- ── TOP BAND ── -->
        <div class="ft-top">
          <div class="container">
            <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 py-5">
              <div class="ft-brand text-center text-md-start">
                <div class="ft-brand-name serif-heading">HORECA VN</div>
                <p class="ft-brand-tagline">Đối tác F&amp;B tin cậy cho hệ thống khách sạn &amp; nhà hàng</p>
              </div>
              <div class="ft-socials d-flex gap-3">
                <a href="https://www.facebook.com/profile.php?id=61589383380349" target="_blank" rel="noopener" class="ft-social-btn" title="Facebook"><i class="bi bi-facebook"></i></a>
                <a href="#" class="ft-social-btn" title="YouTube"><i class="bi bi-youtube"></i></a>
                <a href="#" class="ft-social-btn" title="LinkedIn"><i class="bi bi-linkedin"></i></a>
                <a href="#" class="ft-social-btn" title="TikTok"><i class="bi bi-tiktok"></i></a>
              </div>
            </div>
          </div>
          <div class="ft-divider"></div>
        </div>

        <!-- ── MAIN GRID ── -->
        <div class="ft-main">
          <div class="container py-5">
            <div class="row g-5">

              <!-- COL 1 -->
              <div class="col-lg-4 col-md-12">
                <h5 class="ft-col-heading">Về Chúng Tôi</h5>
                <p class="ft-about-text">
                  Công ty CP SX &amp; TM Horeca VN — đơn vị chuyên cung cấp sản phẩm, nguyên liệu và thiết bị
                  F&amp;B chất lượng cao cho hệ thống khách sạn 3–5 sao, resort và nhà hàng toàn quốc.
                </p>
                <div class="ft-contact-list mt-4">
                  <div class="ft-contact-item">
                    <div class="ft-contact-icon"><i class="bi bi-geo-alt-fill"></i></div>
                    <div>
                      <div class="ft-contact-label">Trụ sở chính</div>
                      <div class="ft-contact-value">Số 15 Ngõ 495 Bạch Đằng, P. Hồng Hà, Hà Nội</div>
                    </div>
                  </div>
                  <div class="ft-contact-item">
                    <div class="ft-contact-icon"><i class="bi bi-telephone-fill"></i></div>
                    <div>
                      <div class="ft-contact-label">Hotline</div>
                      <a href="tel:0786667447" class="ft-contact-value ft-link">(+84) 786 667 447</a>
                    </div>
                  </div>
                  <div class="ft-contact-item">
                    <div class="ft-contact-icon"><i class="bi bi-envelope-fill"></i></div>
                    <div>
                      <div class="ft-contact-label">Email</div>
                     <a href="https://mail.google.com/mail/?view=cm&amp;to=kinhdoanh@horecavietnam.com" 
   target="_blank" rel="noopener" class="ft-contact-value ft-link">kinhdoanh@horecavietnam.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- COL 2 -->
              <div class="col-lg-2 col-sm-6">
                <h5 class="ft-col-heading">Sản Phẩm</h5>
                <ul class="ft-link-list">
                  <li><router-link to="/san-pham/su-long-phuong" class="ft-nav-link">Sứ Long Phương</router-link></li>
                  <li><router-link to="/san-pham/qua-tang" class="ft-nav-link">Quà Tặng</router-link></li>
                  <li><router-link to="/san-pham/ly-coc" class="ft-nav-link">Ly Cốc</router-link></li>
                  <li><router-link to="/san-pham/do-gia-dung" class="ft-nav-link">Đồ Gia Dụng</router-link></li>
                  <li><router-link to="/san-pham/thiet-bi" class="ft-nav-link">Thiết Bị</router-link></li>
                  <li><router-link to="/san-pham/thuc-pham" class="ft-nav-link">Thực Phẩm</router-link></li>
                  <li><router-link to="/san-pham/gia-vi" class="ft-nav-link">Gia Vị</router-link></li>
                  <li><router-link to="/san-pham/hoa-my-pham" class="ft-nav-link">Hóa Mỹ Phẩm</router-link></li>
                </ul>
              </div>

              <!-- COL 3 -->
              <div class="col-lg-2 col-sm-6">
                <h5 class="ft-col-heading">Công Ty</h5>
                <ul class="ft-link-list">
                  <li><router-link to="/ve-vipep" class="ft-nav-link">Giới Thiệu</router-link></li>
                  <li><router-link to="/du-an" class="ft-nav-link">Dự Án</router-link></li>
                  <li><router-link to="/tin-tuc" class="ft-nav-link">Tin Tức</router-link></li>
                  <li><router-link to="/lien-he" class="ft-nav-link">Liên Hệ</router-link></li>
                  <li><router-link to="/tuyen-dung" class="ft-nav-link">Tuyển Dụng</router-link></li>
                </ul>
                <h5 class="ft-col-heading mt-4">Hỗ Trợ</h5>
                <ul class="ft-link-list">
                  <li><a href="#" class="ft-nav-link">Hướng dẫn mua hàng</a></li>
                  <li><a href="#" class="ft-nav-link">Chính sách vận chuyển</a></li>
                  <li><a href="#" class="ft-nav-link">Đổi trả hàng</a></li>
                  <li><a href="#" class="ft-nav-link">Bảo mật thông tin</a></li>
                  <li><a href="#" class="ft-nav-link">Câu hỏi thường gặp</a></li>
                </ul>
              </div>

              <!-- COL 4 -->
              <div class="col-lg-4 col-md-12">
                <h5 class="ft-col-heading">Đăng Ký Nhận Ưu Đãi</h5>
                <p class="ft-newsletter-desc">
                  Nhận ngay thông tin khuyến mãi, sản phẩm mới và tin tức F&amp;B hàng tuần.
                </p>
                <div class="ft-newsletter-box">
                  <input type="email" class="ft-newsletter-input" placeholder="Địa chỉ email của bạn..." />
                  <button class="ft-newsletter-btn">
                    <i class="bi bi-send-fill me-1"></i> Đăng ký
                  </button>
                </div>
                <div class="ft-badges mt-4">
                  <div class="ft-badge"><i class="bi bi-shield-fill-check"></i><span>Thanh toán bảo mật</span></div>
                  <div class="ft-badge"><i class="bi bi-truck"></i><span>Giao hàng toàn quốc</span></div>
                  <div class="ft-badge"><i class="bi bi-headset"></i><span>Hỗ trợ 24/7</span></div>
                  <div class="ft-badge"><i class="bi bi-arrow-repeat"></i><span>Đổi trả dễ dàng</span></div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- ── BOTTOM BAR ── -->
        <div class="ft-bottom">
          <div class="container">
            <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 py-4">
              <p class="mb-0 ft-copyright">
                © 2026 <strong>HORECA VN</strong> — Công ty CP SX &amp; TM Horeca Việt Nam. All rights reserved.
              </p>
              <div class="d-flex align-items-center gap-3">
                <a href="#" class="ft-policy-link">Chính sách bảo mật</a>
                <span class="ft-policy-sep">|</span>
                <a href="#" class="ft-policy-link">Điều khoản sử dụng</a>
                <span class="ft-policy-sep">|</span>
                <a href="#" class="ft-policy-link">Sitemap</a>
              </div>
            </div>
          </div>
        </div>

      </footer>
    </div>

    <!-- FLOATING CONTACT -->
<div class="floating-contact">

  <!-- Hotline -->
  <a href="tel:0786667447" class="contact-item hotline" title="Gọi hotline">
    <div class="icon-wrapper"><i class="bi bi-telephone-fill"></i></div>
    <span class="label">0786.667.447</span>
  </a>

 <!-- Zalo -->
<!-- Zalo -->
<a href="https://zalo.me/0786667447" target="_blank" rel="noopener" class="contact-item zalo" title="Chat Zalo">
  <div class="icon-wrapper">
    <img src="@/assets/images/zalo-icon.png" alt="Zalo" width="50" height="50" style="object-fit:cover;" />
  </div>
  <span class="label">Chat Zalo</span>
</a>

<!-- Messenger -->
<a href="https://www.facebook.com/profile.php?id=61589383380349" target="_blank" rel="noopener" class="contact-item messenger" title="Chat Messenger">
  <div class="icon-wrapper">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
      alt="Messenger" width="50" height="50"
      style="object-fit:contain;"
    />
  </div>
  <span class="label">Messenger</span>
</a>

  <!-- Email -->
  <a href="https://mail.google.com/mail/?view=cm&to=kinhdoanh@horecavietnam.com" 
   target="_blank" rel="noopener" class="contact-item gmail" title="Gửi Email">
    <div class="icon-wrapper"><i class="bi bi-envelope-fill"></i></div>
    <span class="label">kinhdoanh@horecavietnam.com</span>
  </a>

</div>
</div>
</template>

<!-- ================================================================
     SCRIPT
================================================================ -->
<script setup>
import { ref, onMounted, watch, computed, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { cartState } from '@/services/cartStore';

const route  = useRoute();
const router = useRouter();

const greetingText   = ref('Xin chào');
const isLoggedIn     = ref(false);
const userName       = ref('');
const userAvatar     = ref('');
const categories     = ref([]);
const cartItemCount  = computed(() => cartState.totalQuantity);
const cartTotalPrice = ref(0);

const searchQuery    = ref('');
const searchResults  = ref([]);
const searchLoading  = ref(false);
const showSearchDrop = ref(false);
let   searchTimer    = null;

const showSanPham       = ref(false);
const hoveredCat        = ref(null);
const showMobileSearch  = ref(false);    // ← thêm
const mobileSearchInput = ref(null);     // ← thêm

const toggleMobileSearch = () => {       // ← thêm cả function này
  showMobileSearch.value = !showMobileSearch.value;
  if (showMobileSearch.value) {
    setTimeout(() => mobileSearchInput.value?.focus(), 300);
  } else {
    searchQuery.value    = '';
    searchResults.value  = [];
    showSearchDrop.value = false;
  }
};

const marqueeTrack = ref(null);
import logoMuongThanh from '@/assets/images/partners/muongthanh.png';
import logoVinpearl   from '@/assets/images/partners/vinpearl.png';
import logoMarriott   from '@/assets/images/partners/marriott.png';
import logoHilton     from '@/assets/images/partners/hilton.png';
import logoHyatt      from '@/assets/images/partners/hyatt.png';
import logoNovotel    from '@/assets/images/partners/Novotel.png';
import logoIHG        from '@/assets/images/partners/IHG.png';
import logoLotte      from '@/assets/images/partners/lotte.png';
import logoSheraton   from '@/assets/images/partners/Sheraton.png';
import logoMelia      from '@/assets/images/partners/Meliá_Hotels_International.png';
import { API_BASE } from '@/config/api';

const partners = ref([
  { name: 'Mường Thanh',      logo: logoMuongThanh },
  { name: 'Vinpearl',         logo: logoVinpearl },
  { name: 'Marriott',         logo: logoMarriott },
  { name: 'Hilton',           logo: logoHilton },
  { name: 'Hyatt',            logo: logoHyatt },
  { name: 'Novotel',          logo: logoNovotel },
  { name: 'InterContinental', logo: logoIHG },
  { name: 'Lotte Hotel',      logo: logoLotte },
  { name: 'Sheraton',         logo: logoSheraton },
  { name: 'Melia Hotels',     logo: logoMelia },
]);

const pauseMarquee  = () => { if (marqueeTrack.value) marqueeTrack.value.style.animationPlayState = 'paused'; };
const resumeMarquee = () => { if (marqueeTrack.value) marqueeTrack.value.style.animationPlayState = 'running'; };
const expandedChildren = ref(new Set());
const hoveredChild = ref(null);  // thêm cạnh hoveredCat
const toggleChild = (id) => {
  const next = new Set(expandedChildren.value);
  next.has(id) ? next.delete(id) : next.add(id);
  expandedChildren.value = next;
};
const expandedCats = ref(new Set());
const toggleCat = (id) => {
  const next = new Set(expandedCats.value);
  next.has(id) ? next.delete(id) : next.add(id);
  expandedCats.value = next;
};

const formattedCartTotal = computed(() =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cartTotalPrice.value || 0)
);

const formatPrice = (val) =>
  (!val || val === 0)
    ? 'Liên hệ'
    : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

const handleSearchInput = () => {
  clearTimeout(searchTimer);
  if (!searchQuery.value.trim() || searchQuery.value.trim().length < 2) {
    searchResults.value = [];
    searchLoading.value = false;
    return;
  }
  searchLoading.value = true;
  searchTimer = setTimeout(() => fetchSearchResults(), 350);
};

const fetchSearchResults = async () => {
  if (!searchQuery.value.trim()) return;
  searchLoading.value = true;
  try {
    const [searchRes, flashRes] = await Promise.allSettled([
      axios.get(`${API_BASE}/api/products/search`, {
        params: { keyword: searchQuery.value.trim(), size: 6 }
      }),
      axios.get(`${API_BASE}/api/khuyen-mai-flash`)
    ]);

    const flashMap = new Map();
    if (flashRes.status === 'fulfilled') {
      (flashRes.value.data || [])
        .filter(f => f.trangThaiHienThi === 'Đang diễn ra')
        .forEach(f => flashMap.set(Number(f.chiTietSanPhamId), f.phanTramGiamGia || 0));
    }

    if (searchRes.status !== 'fulfilled') {
      searchResults.value = [];
      return;
    }

    const data = searchRes.value.data;
    let items = [];
    if (Array.isArray(data)) items = data;
    else if (data.content && Array.isArray(data.content)) items = data.content;
    else if (data.data && Array.isArray(data.data)) items = data.data;

    searchResults.value = items.map(p => {
      const chiTietId = p.chiTietId ||
        (p.chiTietSanPhams?.length ? p.chiTietSanPhams[0].id : null);
      const flashPercent = chiTietId ? (flashMap.get(Number(chiTietId)) || 0) : 0;
      if (flashPercent > 0) {
        const giaGoc = p.giaBan || 0;
        return {
          ...p,
          giaBan:  Math.round(giaGoc * (1 - flashPercent / 100)),
          giaGoc,
        };
      }
      return p;
    });
  } catch (e) {
    console.error('Lỗi tìm kiếm:', e);
    searchResults.value = [];
  } finally {
    searchLoading.value = false;
  }
};

const handleSearch = () => {
  if (!searchQuery.value.trim()) return;
  showSearchDrop.value = false;
  router.push({ path: '/san-pham', query: { q: searchQuery.value.trim() } });
};

const clearSearch = () => {
  setTimeout(() => {
    showSearchDrop.value = false;
    searchResults.value  = [];
    searchQuery.value    = '';
  }, 150);
};

const onSearchBlur = () => {
  setTimeout(() => { showSearchDrop.value = false; }, 200);
};

const fetchCartSummary = async () => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    cartState.items = [];
    return;
  }
  const userId = localStorage.getItem('userId');
  if (!userId) return;
  try {
    const response = await axios.get(`${API_BASE}/api/v1/cart/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data?.chiTietGioHangs) {
      cartState.items = response.data.chiTietGioHangs.map(item => ({
        id:         item.id,
        chiTietId:  item.chiTietId,
        tenSanPham: item.tenSanPham  || '',
        giaBan:     item.giaBan      || 0,
        giaGoc:     item.giaGoc      || 0,
        soLuong:    item.soLuong     || 1,
        anhSanPham: item.anhSanPham  || '',
        duocChon:   item.duocChon !== false
      }));
    } else {
      cartState.items = [];
    }
  } catch (e) {
    console.error('Lỗi giỏ hàng Header:', e);
  }
};

const fetchCategories = async () => {
  try {
    const response      = await axios.get(`${API_BASE}/api/categories`);
    const allCategories = response.data.filter(cat => cat.status === true);
    const categoryMap   = {};
    const parentCategories = [];
    allCategories.forEach(cat => { categoryMap[cat.id] = { ...cat, children: [] }; });
    allCategories.forEach(cat => {
      const parentId = cat.danhMucChaId;
      if (parentId) {
        if (categoryMap[parentId]) categoryMap[parentId].children.push(categoryMap[cat.id]);
      } else {
        parentCategories.push(categoryMap[cat.id]);
      }
    });
    categories.value = parentCategories;
  } catch (e) { console.error('Lỗi tải danh mục:', e); }
};

const createSlug = (text) => {
  if (!text) return '';
  return text.toString().toLowerCase()
    .replace(/[áàảãạăắằẳẵặâấầẩẫậ]/g, 'a').replace(/[éèẻẽẹêếềểễệ]/g, 'e')
    .replace(/[iíìỉĩị]/g, 'i').replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, 'o')
    .replace(/[úùủũụưứừửữự]/g, 'u').replace(/[ýỳỷỹỵ]/g, 'y').replace(/đ/g, 'd')
    .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+|-+$/g, '');
};

// ✅ MỚI — đọc từ user_is_auth
const checkAuth = async () => {
  const isAuth    = localStorage.getItem('user_is_auth') === 'true';
  const token     = localStorage.getItem('auth_token');
  const savedName = localStorage.getItem('user_name');

  if (!isAuth || !token) {
    isLoggedIn.value = false;
    userName.value   = '';
    userAvatar.value = '';
    return;
  }

  isLoggedIn.value = true;
  userName.value   = savedName || '';
  try {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const res = await axios.get(
        `${API_BASE}/api/v1/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      userAvatar.value = res.data.anhDaiDien || '';
      userName.value   = res.data.hoTen || savedName;
      localStorage.setItem('user_avatar', userAvatar.value);
      localStorage.setItem('user_name',   userName.value);
    }
  } catch {
    userAvatar.value = localStorage.getItem('user_avatar') || '';
  }
};

// ✅ MỚI — chỉ xóa key của user
const handleLogout = () => {
  cartState.clearCart();
  window.dispatchEvent(new Event('cart-updated'));
  localStorage.removeItem('user_is_auth');
  localStorage.removeItem('user_role');
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_name');
  localStorage.removeItem('user_avatar');
  localStorage.removeItem('userId');
  localStorage.removeItem('is_google_user');
  localStorage.removeItem('has_password');
  isLoggedIn.value     = false;
  userName.value       = '';
  userAvatar.value     = '';
  cartTotalPrice.value = 0;
  router.replace('/');
};

const updateGreeting = () => {
  const h = new Date().getHours();
  greetingText.value = h < 12 ? 'Chào buổi sáng' : h < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';
};

onMounted(() => {
  fetchCategories();
  updateGreeting();
  fetchCartSummary();

  window.addEventListener('cart-updated', fetchCartSummary);
  window.addEventListener('avatar-updated', (e) => {
    userAvatar.value = e.detail || localStorage.getItem('user_avatar') || '';
  });
  window.addEventListener('user-logged-in', checkAuth);

 

  const urlParams = new URLSearchParams(window.location.search);
  const token     = urlParams.get('token');
  if (token) {
    if (window.location.pathname === '/direct-login') {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('is_auth', 'true');
      localStorage.setItem('role', urlParams.get('role'));
      localStorage.setItem('user_name', urlParams.get('user'));
      window.location.href = '/';
    } else {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('is_auth', 'true');
      try {
        const payload     = JSON.parse(decodeURIComponent(escape(window.atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))));
        const displayName = payload.name || payload.email?.split('@')[0] || 'User Google';
        localStorage.setItem('user_name', displayName);
        userName.value   = displayName;
        isLoggedIn.value = true;
      } catch (err) { console.error('Decode JWT lỗi:', err); }
      window.history.replaceState({}, document.title, '/');
      router.replace('/');
    }
  } else { checkAuth(); }
});

onUnmounted(() => {
  window.removeEventListener('cart-updated', fetchCartSummary);
  window.removeEventListener('avatar-updated', () => {});
  window.removeEventListener('user-logged-in', checkAuth);
});

watch(() => route.path, () => {
  checkAuth();
  showSanPham.value      = false;
  hoveredCat.value       = null;
  hoveredChild.value     = null;
  showMobileSearch.value = false;
  searchQuery.value      = '';

  // THAY BẰNG ĐOẠN NÀY
  const el = document.getElementById('sidebarMenu');
  if (el && el.classList.contains('show')) {
    import('bootstrap').then(({ Offcanvas }) => {
      const instance = Offcanvas.getInstance(el);
      if (instance) instance.hide();
    });
  }
});

const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http') || path.startsWith('blob:')) return path;
  if (path.startsWith('/uploads/')) return `${API_BASE}${path}`;
  if (path.startsWith('uploads/')) return `${API_BASE}/${path}`;
  if (path.startsWith('/')) return `${API_BASE}${path}`;
  return `${API_BASE}/uploads/${path}`;
};
</script>

<!-- ================================================================
     STYLE
================================================================ -->
<style scoped>

/* ═══════════════════════════════════════════════
   1. LOGO & TOP BAR
═══════════════════════════════════════════════ */
.header-logo {
  max-height: 58px; width: auto; object-fit: contain; display: block;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.header-logo:hover { transform: scale(1.06); }
.contact-divider { border-right: 1px solid #e9ecef; }
.hover-red { transition: color 0.2s ease; }
.hover-red:hover { color: #b31f24 !important; }
.phone-ring-anim {
  display: inline-block; animation: ring 2s infinite ease-in-out; transform-origin: center;
}
@keyframes ring {
  0%,50%,100% { transform: rotate(0); }
  10% { transform: rotate(15deg); } 20% { transform: rotate(-10deg); }
  30% { transform: rotate(15deg); } 40% { transform: rotate(-10deg); }
}

/* ── Logo Long Phương (inline sau logo Horeca) ── */
.lp-brand-wrap {
  animation: fadeIn .4s ease;
}
.lp-divider {
  width: 1px; height: 36px;
  background: linear-gradient(to bottom, transparent, #d4a847, transparent);
  flex-shrink: 0;
}
.lp-brand-box {
  display: flex; flex-direction: column; align-items: center; gap: 1px;
  cursor: default;
}
.lp-brand-label {
  font-size: 9px; font-weight: 700; text-transform: uppercase;
  letter-spacing: .8px; color: #a07c30; white-space: nowrap;
}
.lp-brand-logo {
   max-height: 65px; max-width: 150px; object-fit: contain;
  filter: drop-shadow(0 1px 2px rgba(120,80,10,.12));
  transition: transform .25s ease, filter .25s ease;
}
.lp-brand-box:hover .lp-brand-logo {
  transform: scale(1.06);
  filter: drop-shadow(0 2px 5px rgba(120,80,10,.25));
}

/* ── Search ── */
.search-wrapper { position: relative; background: #f1f5f9; border-radius: 50px; border: 1px solid #e2e8f0; transition: all .3s; }
.search-wrapper:focus-within { background: #fff; border-color: #b31f24; box-shadow: 0 0 0 4px rgba(179,31,36,.1); }
.custom-search-input {
  background-color: #f8f9fa !important; border: 1px solid #e0e0e0 !important;
  box-shadow: none !important; transition: all .3s ease;
}
.custom-search-input:focus { background-color: #fff !important; border-color: #b31f24 !important; }
.search-btn-icon { color: #666; width: 35px; height: 35px; padding: 0; border: none; background: transparent; transition: color .3s; }
.search-btn-icon:hover { color: #b31f24; }

/* ── User & Cart ── */
.cursor-pointer { cursor: pointer; }
.user-avatar-circle {
  width: 38px; height: 38px; background: #b31f24; color: #fff; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: bold; font-size: 16px; border: 2px solid #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,.1); transition: .3s; overflow: hidden;
}
.user-dropdown-menu { border-top: 3px solid #b31f24 !important; border-radius: 10px; padding: 10px 0; }
.dropdown-item { font-size: 14px; font-weight: 500; }
.dropdown-item:hover { background-color: #fdf1f1; color: #b31f24; }
.cart-badge { font-size: 10px; border: 2px solid #fff; }

/* ═══════════════════════════════════════════════
   2. MAIN NAV BAR
═══════════════════════════════════════════════ */
.main-nav { background: #b31f24; }
.hamburger-menu span { display: block; width: 22px; height: 2px; background: #fff; margin: 5px 0; border-radius: 2px; transition: .3s; }
.italic { font-style: italic; }
.modern-nav-wrapper { height: 100%; }
.modern-nav-link {
  color: rgba(255,255,255,.9); text-decoration: none; font-weight: 600; font-size: 15px;
  text-transform: uppercase; letter-spacing: .5px; padding: 8px 4px; position: relative;
  transition: all .3s ease; display: inline-flex; align-items: center;
}
.modern-nav-link::after {
  content: ''; position: absolute; width: 0; height: 2.5px; background: #fff;
  bottom: 0; left: 50%; transform: translateX(-50%);
  transition: width .3s cubic-bezier(.25,1,.5,1); border-radius: 2px;
}
.modern-nav-link:hover,
.modern-nav-link.router-link-active { color: #fff; }
.modern-nav-link:hover::after,
.modern-nav-link.router-link-active::after { width: 100%; }

/* ── Hot Deal with fire animation ── */
.highlight-deal { color: #ffda75 !important; position: relative; }
.highlight-deal::after { background: #ffda75; }
.highlight-deal::before {
  content: '';
  position: absolute;
  inset: -3px -8px;
  border-radius: 20px;
  background: rgba(255, 218, 117, 0.12);
  animation: deal-pulse 2s ease-in-out infinite;
  pointer-events: none;
}
@keyframes deal-pulse {
  0%, 100% { opacity: 0; transform: scale(0.95); }
  50%       { opacity: 1; transform: scale(1.02); }
}

/* Fire icon dancing animation */
.fire-anim {
  display: inline-block;
  animation: fire-dance 1.1s ease-in-out infinite;
  transform-origin: center bottom;
}
@keyframes fire-dance {
  0%   { transform: scale(1)    rotate(-6deg); color: #ffda75; filter: drop-shadow(0 0 2px #ff6b00); }
  20%  { transform: scale(1.18) rotate(5deg);  color: #ff5500; filter: drop-shadow(0 0 6px #ff4400); }
  40%  { transform: scale(0.94) rotate(-4deg); color: #ffda75; filter: drop-shadow(0 0 3px #ff8800); }
  60%  { transform: scale(1.14) rotate(6deg);  color: #ff3300; filter: drop-shadow(0 0 8px #ff2200); }
  80%  { transform: scale(1.05) rotate(-3deg); color: #ffbb33; filter: drop-shadow(0 0 4px #ff6600); }
  100% { transform: scale(1)    rotate(-6deg); color: #ffda75; filter: drop-shadow(0 0 2px #ff6b00); }
}

/* ── Dropdown ── */
.modern-dropdown-menu {
  position: absolute; top: 100%; left: 0; min-width: 260px;
  opacity: 0; visibility: hidden;
  transform: translateY(15px) scale(.98);
  transform-origin: top left;
  transition: opacity .25s ease, visibility .25s ease, transform .3s cubic-bezier(.175,.885,.32,1.275);
  z-index: 1050; border-top: 4px solid #b31f24; padding: 8px 0;
  background: #fff;
}
.modern-dropdown-menu.dropdown-visible {
  opacity: 1; visibility: visible; transform: translateY(0) scale(1);
}
.m-dropdown-item-wrap:last-child .m-link-level-1 { border-bottom: none !important; }
.m-link-level-1 { font-size: 14.5px; transition: all .2s ease; border-color: #f1f5f9 !important; }
.m-bullet { display: inline-block; width: 6px; height: 6px; background: transparent; border: 2px solid #ccc; border-radius: 50%; transition: .3s; }
.m-link-level-1:hover { background-color: #fdf1f1; color: #b31f24 !important; padding-left: 2rem !important; }
.m-link-level-1:hover .m-bullet { border-color: #b31f24; background-color: #b31f24; }
.m-sub-dropdown {
  position: absolute; top: -10px; left: 100%; min-width: 220px;
  opacity: 0; visibility: hidden; transform: translateX(-15px);
  transition: opacity .25s ease, visibility .25s ease, transform .3s cubic-bezier(.175,.885,.32,1.275);
  border-left: 4px solid #b31f24; padding: 8px 0; background: #fff;
}
.m-sub-dropdown.subdropdown-visible { opacity: 1; visibility: visible; transform: translateX(0); }
.m-link-level-2 { font-size: 14px; font-weight: 500; transition: all .2s ease; }
.m-link-level-2:hover { background-color: #fdf1f1; color: #b31f24 !important; transform: translateX(5px); }
.fs-7 { font-size: .85rem; }
.quick-tags span { font-size: 13px; opacity: .8; }

/* ═══════════════════════════════════════════════
   3. SIDEBAR
═══════════════════════════════════════════════ */
.offcanvas,
.offcanvas-start {
  width: 300px !important; z-index: 99999 !important; height: 100vh !important;
  max-height: 100vh !important; display: flex !important; flex-direction: column !important;
  border: none; box-shadow: 20px 0 60px rgba(0,0,0,.25); overflow: hidden;
  border-radius: 0 20px 20px 0;
}
.offcanvas-backdrop { z-index: 99998 !important; }
.sb-header {
  position: relative;
  background: linear-gradient(150deg, #c0272d 0%, #891619 60%, #6e1014 100%);
  padding: 0; flex-shrink: 0; overflow: hidden;
}
.sb-header::before {
  content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(circle at 80% 20%, rgba(255,255,255,.08) 0%, transparent 50%),
                    radial-gradient(circle at 10% 80%, rgba(255,255,255,.05) 0%, transparent 40%);
  pointer-events: none;
}
.sb-brand { display: flex; align-items: center; justify-content: space-between; padding: 16px 16px 12px; position: relative; z-index: 1; }
.sb-logo-box {
  display: flex; align-items: center; justify-content: flex-start;
  background: #fff; border-radius: 12px; padding: 6px 14px; height: 50px;
  max-width: 165px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,.18);
  transition: transform .3s ease, box-shadow .3s ease;
}
.sb-logo-box:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,.25); }
.sb-logo-img { width: 100%; height: 100%; object-fit: contain; display: block; }
.sb-close-btn {
  flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,.3) !important;
  background: rgba(255,255,255,.12) !important; color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: .9rem; cursor: pointer;
  transition: all .3s cubic-bezier(.175,.885,.32,1.275); line-height: 1;
}
.sb-close-btn:hover { background: rgba(255,255,255,.28) !important; border-color: rgba(255,255,255,.5) !important; transform: rotate(90deg) scale(1.1); }
/* THÀNH */
.sb-identity {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 16px 28px; /* tăng padding top+bottom */
  position: relative;
  z-index: 1;
}
.sb-avatar-wrap { position: relative; flex-shrink: 0; width: 46px; height: 46px; }
.sb-avatar-img,
.sb-avatar-letter,
.sb-avatar-guest { width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2.5px solid rgba(255,255,255,.5); overflow: hidden; }
.sb-avatar-img { object-fit: cover; }
.sb-avatar-letter { background: rgba(255,255,255,.2); color: #fff; font-size: 18px; font-weight: 700; }
.sb-avatar-guest { background: rgba(255,255,255,.15); color: rgba(255,255,255,.85); font-size: 26px; border: none; }
.sb-online-dot {
  position: absolute; bottom: 1px; right: 1px; width: 11px; height: 11px;
  border-radius: 50%; background: #4ade80; border: 2px solid #c0272d;
  box-shadow: 0 0 0 0 rgba(74,222,128,.5); animation: online-pulse 2.5s infinite;
}
@keyframes online-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(74,222,128,.6); }
  70%  { box-shadow: 0 0 0 7px rgba(74,222,128,0); }
  100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
}
.sb-identity-text { min-width: 0; }
.sb-greeting-name { font-size: 14px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.3; }
.sb-greeting-sub { font-size: 11.5px; color: rgba(255,255,255,.65); margin-top: 2px; }
.sb-wave { display: block; width: 100%; height: 18px; position: relative; z-index: 1; margin-bottom: -1px; }
.offcanvas-body {
  flex: 1 1 0 !important; overflow-y: auto !important; overflow-x: hidden !important;
  padding: 0 !important; display: flex; flex-direction: column; background: #fafafa;
}
.offcanvas-body::-webkit-scrollbar { width: 3px; }
.offcanvas-body::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.offcanvas-body::-webkit-scrollbar-thumb:hover { background: #b31f24; }
.sb-section-label { display: flex; align-items: center; gap: 10px; padding: 16px 16px 8px; }
.sb-section-line { flex: 1; height: 1px; background: #e8eaed; }
.sb-section-text { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.4px; color: #aab0ba; white-space: nowrap; }
.sb-menu-list { list-style: none; padding: 0 10px; margin: 0; }
.sb-menu-item-wrap { margin-bottom: 2px; }
.sb-item {
  display: flex; align-items: center; gap: 11px; padding: 11px 12px; width: 100%;
  border: none; background: transparent; color: #2d3748; text-decoration: none;
  font-size: 14px; font-weight: 600; border-radius: 10px; cursor: pointer;
  transition: background .18s ease, color .18s ease, transform .18s ease;
  text-align: left; position: relative;
}
.sb-item:hover { background: #fff; color: #b31f24; transform: translateX(3px); box-shadow: 0 2px 8px rgba(179,31,36,.08); }
.sb-item.router-link-active { background: #fdf1f1; color: #b31f24; box-shadow: inset 3px 0 0 #b31f24; border-radius: 0 10px 10px 0; }
.sb-item-icon {
  flex-shrink: 0; width: 32px; height: 32px; border-radius: 8px; background: #f0f2f5;
  display: flex; align-items: center; justify-content: center; font-size: 14px; color: #b31f24;
  transition: background .18s ease, transform .18s ease;
}
.sb-item:hover .sb-item-icon { background: #fde8e8; transform: scale(1.08); }
.sb-item.router-link-active .sb-item-icon { background: #fde8e8; }
.sb-item-label { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sb-item-arrow { font-size: 18px; color: #c0c8d2; transition: transform .2s ease, color .2s ease; flex-shrink: 0; }
.sb-item:hover .sb-item-arrow { color: #b31f24; transform: translateX(3px); }
.sb-item-count {
  font-size: 10px; font-weight: 700; background: #f0f2f5; color: #8892a0;
  padding: 2px 7px; border-radius: 20px; flex-shrink: 0; transition: background .18s, color .18s;
}
.sb-item--open .sb-item-count, .sb-item:hover .sb-item-count { background: #fde8e8; color: #b31f24; }
.sb-item-chevron { font-size: 12px; color: #c0c8d2; flex-shrink: 0; transition: transform .35s cubic-bezier(.4,0,.2,1), color .2s ease; }
.sb-item-chevron.rotated { transform: rotate(-180deg); color: #b31f24; }
.sb-item--open { background: #fff; color: #b31f24; box-shadow: inset 3px 0 0 #b31f24; border-radius: 0 10px 10px 0; }
.sb-item--open .sb-item-icon { background: #fde8e8; }
.sb-accordion { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .38s cubic-bezier(.4,0,.2,1); margin-left: 16px; border-left: 2px solid #f0dede; border-radius: 0 0 0 6px; overflow: hidden; }
.sb-accordion--open { grid-template-rows: 1fr; }
.sb-accordion-inner { overflow: hidden; min-height: 0; padding: 0; transition: padding .38s cubic-bezier(.4,0,.2,1); }
.sb-accordion--open .sb-accordion-inner { padding: 4px 0 6px; }
.sb-child-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px 9px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
  text-decoration: none;
  border-radius: 0 8px 8px 0;
  transition: color .2s ease, background .2s ease, padding-left .2s ease;
  cursor: pointer;
}
button.sb-child-item {
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;
}
.sb-child-item:hover { color: #b31f24; background: #fdf5f5; padding-left: 20px; }
.sb-child-item.router-link-active { color: #b31f24; font-weight: 700; }
.sb-child-dot { width: 6px; height: 6px; border-radius: 50%; background: #d0d7e0; flex-shrink: 0; transition: background .2s, transform .2s; }
.sb-child-item:hover .sb-child-dot { background: #b31f24; transform: scale(1.4); }
.sb-child-item.router-link-active .sb-child-dot { background: #b31f24; }
.sb-footer { margin-top: auto; padding: 14px 14px 22px; border-top: 1px solid #eef0f3; background: #fff; }
.sb-support-card { background: linear-gradient(135deg, #fff8f8 0%, #fdeaea 100%); border: 1px solid #f5d8d8; border-radius: 14px; padding: 13px 14px; margin-bottom: 12px; }
.sb-support-header { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.sb-support-pulse { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 0 rgba(34,197,94,.5); animation: online-pulse 2s infinite; }
.sb-support-title { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .8px; color: #b31f24; }
.sb-support-btn { display: flex; align-items: center; gap: 9px; padding: 10px 16px; border-radius: 30px; font-size: 13.5px; font-weight: 700; text-decoration: none; transition: all .25s cubic-bezier(.175,.885,.32,1.275); margin-bottom: 7px; }
.sb-support-btn:last-child { margin-bottom: 0; }
.sb-support-btn--phone { background: #b31f24; color: #fff; }
.sb-support-btn--phone:hover { background: #8a181c; color: #fff; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(179,31,36,.3); }
.sb-support-btn--zalo { background: #0068ff; color: #fff; }
.sb-support-btn--zalo:hover { background: #0056d6; color: #fff; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,104,255,.3); }
.sb-socials { display: flex; justify-content: center; gap: 10px; margin-bottom: 12px; }
.sb-social-btn { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #fff; text-decoration: none; transition: transform .25s cubic-bezier(.175,.885,.32,1.275), box-shadow .25s; }
.sb-social-btn:hover { transform: translateY(-3px) scale(1.12); box-shadow: 0 6px 16px rgba(0,0,0,.2); }
.sb-social-btn--fb  { background: #1877f2; }
.sb-social-btn--yt  { background: #ff0000; }
.sb-social-btn--tt  { background: #010101; }
.sb-auth-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 11px 16px; border-radius: 30px; font-size: 14px; font-weight: 700; text-decoration: none; transition: all .25s ease; }
.sb-auth-btn--logout { background: transparent; color: #b31f24; border: 2px solid #f0d0d0; }
.sb-auth-btn--logout:hover { background: #fdf1f1; border-color: #b31f24; transform: translateY(-1px); }
.sb-auth-btn--login { background: #b31f24; color: #fff; border: 2px solid #b31f24; }
.sb-auth-btn--login:hover { background: #8a181c; border-color: #8a181c; color: #fff; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(179,31,36,.3); }

/* ═══════════════════════════════════════════════
   4. FOOTER
═══════════════════════════════════════════════ */
.footer-wrapper { background: #9e1a1f; }
.footer-custom { background: transparent; }
.ft-top { background: linear-gradient(135deg, #b31f24 0%, #8a181c 100%); }
.ft-brand-name { font-size: clamp(1.7rem, 3vw, 2.5rem); font-weight: 900; letter-spacing: 3px; color: #fff; line-height: 1; }
.ft-brand-tagline { font-size: 13.5px; color: rgba(255,255,255,.62); margin-top: 10px; margin-bottom: 0; max-width: 440px; line-height: 1.55; }
.ft-divider { height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.18) 20%, rgba(255,255,255,.35) 50%, rgba(255,255,255,.18) 80%, transparent 100%); }
.ft-social-btn { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 17px; color: rgba(255,255,255,.8); border: 1.5px solid rgba(255,255,255,.25); background: rgba(255,255,255,.08); text-decoration: none; transition: all .28s cubic-bezier(.175,.885,.32,1.275); }
.ft-social-btn:hover { background: rgba(255,255,255,.22); border-color: rgba(255,255,255,.55); color: #fff; transform: translateY(-4px) scale(1.12); box-shadow: 0 8px 20px rgba(0,0,0,.25); }
.ft-main { background: linear-gradient(180deg, #9e1a1f 0%, #7c1419 100%); }
.ft-col-heading { font-family: "Playfair Display","Merriweather","Times New Roman", serif; font-size: 15px; font-weight: 700; color: #fff; letter-spacing: .6px; text-transform: uppercase; margin-bottom: 20px; padding-bottom: 10px; position: relative; }
.ft-col-heading::after { content: ''; position: absolute; left: 0; bottom: 0; width: 32px; height: 2.5px; background: rgba(255,255,255,.5); border-radius: 2px; }
.ft-about-text { font-size: 13.5px; color: rgba(255,255,255,.65); line-height: 1.78; margin-bottom: 0; }
.ft-contact-list { display: flex; flex-direction: column; gap: 14px; }
.ft-contact-item { display: flex; align-items: flex-start; gap: 12px; }
.ft-contact-icon { flex-shrink: 0; width: 34px; height: 34px; border-radius: 10px; background: rgba(255,255,255,.12); display: flex; align-items: center; justify-content: center; font-size: 14px; color: rgba(255,255,255,.85); border: 1px solid rgba(255,255,255,.15); transition: background .2s; }
.ft-contact-item:hover .ft-contact-icon { background: rgba(255,255,255,.22); }
.ft-contact-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .7px; color: rgba(255,255,255,.42); margin-bottom: 3px; }
.ft-contact-value { font-size: 13px; color: rgba(255,255,255,.8); line-height: 1.4; }
.ft-link { text-decoration: none; transition: color .2s; }
.ft-link:hover { color: #fff !important; text-decoration: underline; }
.ft-link-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 5px; }
.ft-nav-link { font-size: 13.5px; color: rgba(255,255,255,.62); text-decoration: none; display: inline-flex; align-items: center; gap: 8px; padding: 3px 0; transition: color .2s ease, padding-left .2s ease; }
.ft-nav-link::before { content: ''; display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,.3); flex-shrink: 0; transition: background .2s, transform .2s; }
.ft-nav-link:hover { color: #fff; padding-left: 6px; }
.ft-nav-link:hover::before { background: #fff; transform: scale(1.4); }
.ft-newsletter-desc { font-size: 13.5px; color: rgba(255,255,255,.6); margin-bottom: 16px; line-height: 1.62; }
.ft-newsletter-box { display: flex; border-radius: 50px; overflow: hidden; border: 1.5px solid rgba(255,255,255,.25); background: rgba(255,255,255,.08); transition: border-color .3s, box-shadow .3s; }
.ft-newsletter-box:focus-within { border-color: rgba(255,255,255,.5); box-shadow: 0 0 0 4px rgba(255,255,255,.08); }
.ft-newsletter-input { flex: 1; border: none; background: transparent; padding: 12px 18px; font-size: 13.5px; color: #fff; outline: none; }
.ft-newsletter-input::placeholder { color: rgba(255,255,255,.42); }
.ft-newsletter-btn { flex-shrink: 0; padding: 12px 22px; background: rgba(255,255,255,.18); border: none; border-left: 1.5px solid rgba(255,255,255,.2); color: #fff; font-size: 13px; font-weight: 700; cursor: pointer; transition: background .2s; white-space: nowrap; }
.ft-newsletter-btn:hover { background: rgba(255,255,255,.3); }
.ft-badges { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.ft-badge { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12); border-radius: 10px; padding: 9px 12px; font-size: 12px; color: rgba(255,255,255,.72); transition: background .2s, border-color .2s, color .2s; }
.ft-badge:hover { background: rgba(255,255,255,.14); border-color: rgba(255,255,255,.28); color: #fff; }
.ft-badge i { font-size: 15px; color: rgba(255,255,255,.65); flex-shrink: 0; }
.ft-bottom { background: rgba(0,0,0,.28); border-top: 1px solid rgba(255,255,255,.1); }
.ft-copyright { font-size: 13px; color: rgba(255,255,255,.48); }
.ft-copyright strong { color: rgba(255,255,255,.72); }
.ft-policy-sep { color: rgba(255,255,255,.22); font-size: 12px; }
.ft-policy-link { font-size: 12px; color: rgba(255,255,255,.42); text-decoration: none; transition: color .2s; }
.ft-policy-link:hover { color: rgba(255,255,255,.82); }

@media (max-width: 576px) {
  .ft-badges { grid-template-columns: 1fr; }
  .ft-newsletter-box { flex-direction: column; border-radius: 14px; }
  .ft-newsletter-btn { border-left: none; border-top: 1px solid rgba(255,255,255,.2); border-radius: 0 0 12px 12px; }
  .ft-bottom .d-flex { text-align: center; }
}

/* ═══════════════════════════════════════════════
   5. FLOATING CONTACT
═══════════════════════════════════════════════ */
.floating-contact {
  position: fixed; bottom: 30px; right: 30px;
  display: flex; flex-direction: column; gap: 15px; z-index: 999;
}
.contact-item {
  display: flex; align-items: center; justify-content: flex-end;
  text-decoration: none; border-radius: 50px;
  transition: all .3s cubic-bezier(.175,.885,.32,1.275);
  position: relative;
}
.contact-item .icon-wrapper {
  width: 50px; height: 50px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; color: #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,.2);
  position: relative; z-index: 2;
  transition: transform .3s ease;
  overflow: hidden;
}
.contact-item .label {
  background: #fff; color: #333; padding: 8px 15px 8px 20px;
  border-radius: 30px 0 0 30px; font-size: 13px; font-weight: 600;
  box-shadow: 0 4px 10px rgba(0,0,0,.1);
  position: absolute; right: 25px;
  opacity: 0; visibility: hidden; transform: translateX(20px);
  transition: all .3s ease; z-index: 1; white-space: nowrap;
}
.contact-item:hover .label {
  opacity: 1; visibility: visible; transform: translateX(-15px);
}
.contact-item:hover .icon-wrapper { transform: scale(1.1); }

/* Hotline */
.contact-item.hotline .icon-wrapper { background: #28a745; animation: pulse-green 2s infinite; }
.contact-item.hotline:hover .label { color: #28a745; }

/* Zalo */
.contact-item.zalo .icon-wrapper { background: #0068ff; animation: pulse-zalo 2s infinite; overflow: hidden; padding: 0; }
.contact-item.zalo:hover .label { color: #0068ff; }

/* Messenger */

/* Messenger */
.contact-item.messenger .icon-wrapper { background: #a335fe; animation: pulse-messenger 2s infinite; overflow: hidden; padding: 0; }
.contact-item.messenger:hover .label { color: #a335fe; }
/* Email */
.contact-item.gmail .icon-wrapper { background: #ea4335; animation: pulse-gmail 2s infinite; }
.contact-item.gmail:hover .label { color: #ea4335; }

@keyframes pulse-messenger {
  0%   { box-shadow: 0 0 0 0 rgba(163,53,254,.7); }
  70%  { box-shadow: 0 0 0 15px rgba(163,53,254,0); }
  100% { box-shadow: 0 0 0 0 rgba(163,53,254,0); }
}
@keyframes pulse-gmail {
  0%   { box-shadow: 0 0 0 0 rgba(234,67,53,.7); }
  70%  { box-shadow: 0 0 0 15px rgba(234,67,53,0); }
  100% { box-shadow: 0 0 0 0 rgba(234,67,53,0); }
}

@keyframes pulse-green {
  0%   { box-shadow: 0 0 0 0 rgba(40,167,69,.7); }
  70%  { box-shadow: 0 0 0 15px rgba(40,167,69,0); }
  100% { box-shadow: 0 0 0 0 rgba(40,167,69,0); }
}
@keyframes pulse-zalo {
  0%   { box-shadow: 0 0 0 0 rgba(0,104,255,.7); }
  70%  { box-shadow: 0 0 0 15px rgba(0,104,255,0); }
  100% { box-shadow: 0 0 0 0 rgba(0,104,255,0); }
}

@media (max-width: 768px) {
  .floating-contact { bottom: 20px; right: 20px; gap: 10px; }
  .contact-item .icon-wrapper { width: 45px; height: 45px; font-size: 20px; }
  .contact-item .label { display: none; }
}

/* ═══════════════════════════════════════════════
   6. SEARCH DROPDOWN
═══════════════════════════════════════════════ */
.search-dropdown { position: absolute; top: calc(100% + 8px); left: 0; right: 0; background: #fff; border-radius: 16px; border: 1px solid #f0f0f0; z-index: 9999; overflow: hidden; max-height: 420px; overflow-y: auto; }
.search-dropdown::-webkit-scrollbar { width: 4px; }
.search-dropdown::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
.search-drop-enter-active, .search-drop-leave-active { transition: opacity .2s ease, transform .2s cubic-bezier(.4,0,.2,1); }
.search-drop-enter-from, .search-drop-leave-to { opacity: 0; transform: translateY(-8px); }
.search-result-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; text-decoration: none; color: #2d3748; border-bottom: 1px solid #f7f7f7; transition: background .15s ease; }
.search-result-item:last-of-type { border-bottom: none; }
.search-result-item:hover { background: #fdf1f1; }
.search-result-img { width: 46px; height: 46px; object-fit: cover; border-radius: 10px; flex-shrink: 0; border: 1px solid #f0f0f0; }
.search-result-img-placeholder { width: 46px; height: 46px; border-radius: 10px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px; color: #ccc; border: 1px solid #f0f0f0; }
.search-result-info { flex: 1; min-width: 0; }
.search-result-name { font-size: 13.5px; font-weight: 600; color: #2d3748; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.search-result-price { font-size: 13px; font-weight: 700; color: #b31f24; margin-top: 2px; }
.search-view-all { display: flex; align-items: center; justify-content: center; padding: 11px 14px; font-size: 13px; font-weight: 600; color: #b31f24; background: #fdf1f1; cursor: pointer; transition: background .15s; border-top: 1px solid #f5e0e0; }
.search-view-all:hover { background: #f9e0e0; }
.search-view-all strong { margin: 0 3px; }
.search-no-result, .search-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 16px; font-size: 13.5px; color: #888; }
.search-loading { flex-direction: row; padding: 16px; }

/* ═══════════════════════════════════════════════
   7. PARTNER MARQUEE
═══════════════════════════════════════════════ */
.serif-heading { font-family: "Playfair Display","Merriweather","Times New Roman",serif; }
.partner-desc { max-width: 800px; font-size: 15px; line-height: 1.6; }
.marquee-outer { width: 100%; overflow: hidden; position: relative; padding: 8px 0; }
.marquee-outer::before,
.marquee-outer::after { content: ''; position: absolute; top: 0; bottom: 0; width: 100px; z-index: 2; pointer-events: none; }
.marquee-outer::before { left: 0; background: linear-gradient(to right, #f8f9fa 0%, transparent 100%); }
.marquee-outer::after  { right: 0; background: linear-gradient(to left, #f8f9fa 0%, transparent 100%); }
.marquee-track { display: flex; align-items: center; width: max-content; animation: marquee-scroll 32s linear infinite; }
@keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.partner-logo-item { padding: 8px 16px; }
.partner-logo-card { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 16px 28px; border-radius: 16px; border: 1px solid #e9ecef; background: #fff; min-width: 160px; transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 2px 10px rgba(0,0,0,0.04); }
.partner-logo-card:hover { transform: translateY(-5px); box-shadow: 0 10px 28px rgba(0,0,0,0.10); border-color: #b31f24; }
.partner-logo-img { height: 44px; width: auto; max-width: 130px; object-fit: contain; mix-blend-mode: multiply; filter: grayscale(100%) opacity(0.6); transition: filter 0.4s ease, transform 0.3s ease; }
.partner-logo-card:hover .partner-logo-img { filter: grayscale(0%) opacity(1); transform: scale(1.06); }
.partner-logo-name { font-size: 12px; font-weight: 600; color: #94a3b8; text-align: center; white-space: nowrap; transition: color 0.3s; }
.partner-logo-card:hover .partner-logo-name { color: #b31f24; }

/* ═══════════════════════════════════════════════
   8. UTILS & RESPONSIVE
═══════════════════════════════════════════════ */
.animate-fade-in { animation: fadeIn .5s ease backwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
main { flex: 1 0 auto; }

@media (max-width: 768px) {
  .floating-contact { bottom: 20px; right: 20px; gap: 10px; }
  .contact-item .icon-wrapper { width: 45px; height: 45px; font-size: 20px; }
  .offcanvas, .offcanvas-start { width: 285px !important; border-radius: 0 16px 16px 0; }
}
/* ═══ LEVEL 3 DESKTOP DROPDOWN ═══ */
.m-sub-item-wrap { position: relative; }

.m-sub-dropdown-lv3 {
  position: absolute;
  top: -8px;
  left: 100%;
  min-width: 210px;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-12px);
  transition: opacity .22s ease, visibility .22s ease,
              transform .28s cubic-bezier(.175,.885,.32,1.275);
  border-left: 4px solid #e8a0a3;
  border-radius: 0 12px 12px 0;   /* ← thêm */
  padding: 8px 0;
  background: #fff;
  z-index: 1060;
  box-shadow: 6px 6px 24px rgba(0,0,0,.10); /* ← thêm */
}
.m-sub-dropdown-lv3.subdropdown-lv3-visible {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.m-link-level-3 {
  font-size: 13.5px;
  font-weight: 400;
  color: #64748b;
  transition: all .2s ease;
}
.m-link-level-3:hover {
  background-color: #fdf1f1;
  color: #b31f24 !important;
  transform: translateX(5px);
}

/* ═══ LEVEL 3 SIDEBAR ═══ */
.sb-child-toggle {
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
}
.sb-child-open {
  color: #b31f24;
}
.sb-child-open .sb-child-dot--folder {
  background: #b31f24;
}
.sb-child-dot--folder {
  background: #a0aec0;
  border-radius: 3px; /* vuông nhẹ để phân biệt leaf node */
}
.sb-child-count {
  font-size: 10px;
  font-weight: 700;
  background: #f0f2f5;
  color: #8892a0;
  padding: 1px 6px;
  border-radius: 20px;
  margin-left: auto;
  margin-right: 4px;
  flex-shrink: 0;
}
.sb-child-chevron {
  color: #c0c8d2;
  transition: transform .3s cubic-bezier(.4,0,.2,1), color .2s;
  flex-shrink: 0;
}
.sb-child-chevron.rotated { transform: rotate(-180deg); color: #b31f24; }

.sb-accordion-lv3 {
  margin-left: 28px;
  border-left: 2px dashed #f0dede;
}
.sb-grandchild-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px 7px 14px;
  font-size: 12.5px;
  font-weight: 400;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 0 8px 8px 0;
  transition: color .2s ease, background .2s ease, padding-left .2s ease;
}
.sb-grandchild-item:hover {
  color: #b31f24;
  background: #fdf5f5;
  padding-left: 18px;
}
.sb-grandchild-item.router-link-active {
  color: #b31f24;
  font-weight: 600;
}
.sb-grand-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #d0d7e0;
  flex-shrink: 0;
  transition: background .2s, transform .2s;
}
.sb-grandchild-item:hover .sb-grand-dot {
  background: #b31f24;
  transform: scale(1.5);
}

/* ═══════════════════════════════════════════════
   MOBILE OPTIMIZATIONS
═══════════════════════════════════════════════ */

/* Hamburger mobile (màu đỏ thay vì trắng) */
.mobile-hamburger { background: transparent; border: none; padding: 4px; }
.mobile-hamburger .hamburger-menu span { background: #b31f24; }

/* Nút toggle search mobile */
.mobile-search-toggle {
  background: #f1f5f9; border-radius: 50%; width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid #e2e8f0; transition: all 0.25s ease; flex-shrink: 0;
}
.mobile-search-toggle:hover { background: #fde8e8; border-color: #b31f24; color: #b31f24 !important; }
.mobile-search-toggle .bi { transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

/* Search bar slide down */
.mobile-search-bar {
  background: #fff; border-bottom: 1px solid #e9ecef;
  max-height: 0; overflow: hidden; opacity: 0;
  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
}
.mobile-search-bar--open {
  max-height: 80vh;
  overflow: visible;
  opacity: 1;
  box-shadow: 0 4px 16px rgba(0,0,0,.08);
}
.mobile-search-bar--open .container-fluid {
  overflow: visible;
}
.mobile-search-bar--open .search-wrapper {
  overflow: visible;
}
/* Ẩn các thứ này trên desktop */
@media (min-width: 992px) {
  .mobile-search-bar    { display: none !important; }
  .mobile-search-toggle { display: none !important; }
  .mobile-hamburger     { display: none !important; }
}


.header-wrapper {
  display: flex;
  flex-direction: column;
}
@media (max-width: 991px) {
  .header-logo { max-height: 40px; }
  .top-bar { padding-top: 8px !important; padding-bottom: 8px !important; }
  .header-wrapper { margin-bottom: 0 !important; }
  .main-nav { margin-top: 0 !important; }
  .top-bar { margin-bottom: 0 !important; border-bottom: none !important; }
  .user-avatar-circle { width: 32px; height: 32px; font-size: 14px; }
  .cart-zone .bi-cart3 { font-size: 1.5rem !important; }
  .cart-badge { font-size: 9px; padding: 2px 5px; }

  /* THÊM 3 DÒNG NÀY */
  .lp-brand-logo { max-height: 28px; max-width: 70px; }
  .lp-brand-label { font-size: 7px; }
  .lp-divider { height: 22px; }
}

@media (max-width: 575px) {
  .offcanvas, .offcanvas-start { width: 280px !important; border-radius: 0 18px 18px 0; }
  .sb-item { padding: 10px; font-size: 13.5px; }
  .sb-item-icon { width: 30px; height: 30px; font-size: 13px; }
}
@media (max-width: 991px) {
  .main-nav {
    padding-top: 6px !important;
    padding-bottom: 6px !important;
  }

  /* Ẩn nav links + quick tags + greeting text trên mobile */

  .main-nav .quick-tags,
  .main-nav .d-none.d-md-block {
    display: none !important;
  }

  /* Hamburger trên thanh đỏ: đổi màu trắng */
  .main-nav .hamburger-menu span {
    background: #fff;
  }
}
/* ── Sidebar Nav Links Mobile ── */
.sb-nav-links {
  padding: 10px 10px 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.sb-nav-item {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 10px 12px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
  transition: background .18s ease, color .18s ease, transform .18s ease;
}
.sb-nav-item:hover,
.sb-nav-item.router-link-active {
  background: #fdf1f1;
  color: #b31f24;
  transform: translateX(3px);
}
.sb-nav-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #b31f24;
  transition: background .18s ease;
}
.sb-nav-item:hover .sb-nav-icon,
.sb-nav-item.router-link-active .sb-nav-icon {
  background: #fde8e8;
}
/* Hot Deal đặc biệt */
.sb-nav-item--deal { color: #b31f24; }
.sb-nav-item--deal .sb-nav-icon { background: #fde8e8; color: #ff5500; }

/* ══ FOOTER MOBILE ══ */
@media (max-width: 576px) {
  /* Top band */
  .ft-top .py-5 { padding-top: 2rem !important; padding-bottom: 2rem !important; }
  .ft-brand-name { font-size: 1.6rem !important; letter-spacing: 2px; }
  .ft-brand-tagline { font-size: 12px; }
  .ft-social-btn { width: 36px; height: 36px; font-size: 15px; }

  /* Main grid */
  .ft-main .py-5 { padding-top: 2rem !important; padding-bottom: 2rem !important; }
  .ft-main .row.g-5 { --bs-gutter-y: 1.5rem; }

  /* Col về chúng tôi */
  .ft-col-heading { font-size: 13px; margin-bottom: 14px; }
  .ft-about-text { font-size: 12.5px; }
  .ft-contact-icon { width: 30px; height: 30px; font-size: 12px; }
  .ft-contact-label { font-size: 9px; }
  .ft-contact-value { font-size: 12px; }
  .ft-contact-list { gap: 10px; }

  /* Link list */
  .ft-nav-link { font-size: 12.5px; }
  .ft-link-list { gap: 3px; }

  /* Newsletter */
  .ft-newsletter-desc { font-size: 12.5px; }
  .ft-newsletter-input { font-size: 12.5px; padding: 10px 14px; }
  .ft-newsletter-btn { padding: 10px 16px; font-size: 12px; }

  /* Badges */
  .ft-badge { padding: 7px 10px; font-size: 11px; }
  .ft-badge i { font-size: 13px; }

  /* Bottom bar */
  .ft-copyright { font-size: 11.5px; text-align: center; }
  .ft-bottom .d-flex { flex-direction: column; gap: 6px !important; text-align: center; }
  .ft-policy-link { font-size: 11px; }
}
/* ═══════════════════════════════════════════════
   MOBILE SEARCH ICON — Animated pill button
═══════════════════════════════════════════════ */
.mobile-search-toggle {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  width: auto !important;
  height: auto !important;
}
.mobile-search-icon-wrap {
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.25s ease;
  box-shadow: none;
}
.mobile-search-icon-wrap:hover,
.mobile-search-icon-wrap.is-active {
  background: transparent;
  border: none;
  box-shadow: none;
  transform: scale(1.1);
}
.mobile-search-icon-wrap:hover .icon-search,
.mobile-search-icon-wrap:hover .icon-close,
.mobile-search-icon-wrap.is-active .icon-search,
.mobile-search-icon-wrap.is-active .icon-close {
  color: #b31f24;
}

/* Trạng thái bình thường: search hiện, x ẩn */
/* Trạng thái bình thường: search hiện, x ẩn */
.mobile-search-icon-wrap .icon-search {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}
.mobile-search-icon-wrap .icon-close {
  opacity: 0;
  transform: scale(0.4) rotate(-90deg);
}
.mobile-search-icon-wrap .icon-search,
.mobile-search-icon-wrap .icon-close {
  position: absolute;
  font-size: 1rem;
  color: #374151;
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
/* Khi active: đổi icon */
.mobile-search-icon-wrap.is-active .icon-search {
  opacity: 0;
  transform: scale(0.4) rotate(90deg);
}
.mobile-search-icon-wrap.is-active .icon-close {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

/* ═══════════════════════════════════════════════
   SIDEBAR BRAND FOOTER LOGO
═══════════════════════════════════════════════ */
.sb-brand-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 0 4px;
  margin-top: 10px;
  border-top: 1px dashed #eef0f3;
}
.sb-brand-footer-link {
  display: inline-block;
  transition: transform 0.3s ease, filter 0.3s ease;
}
.sb-brand-footer-link:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 3px 8px rgba(179, 31, 36, 0.2));
}
.sb-brand-footer-logo {
  max-height: 38px;
  max-width: 140px;
  object-fit: contain;
  display: block;
  filter: grayscale(20%) opacity(0.85);
  transition: filter 0.3s ease;
}
.sb-brand-footer-link:hover .sb-brand-footer-logo {
  filter: grayscale(0%) opacity(1);
}
.sb-brand-footer-copy {
  font-size: 10px;
  color: #b0b8c4;
  font-weight: 500;
  letter-spacing: 0.4px;
}
.search-result-contact {
  color: #0f7a3f !important;
  font-style: italic;
}
</style>
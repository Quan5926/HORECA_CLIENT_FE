<template>
  <div class="profile-wrapper">
    <main class="main-content">
      <div class="container-fluid px-lg-5 py-4">
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="breadcrumb mb-0 small">
            <li class="breadcrumb-item">
              <router-link to="/" class="breadcrumb-link">
                <i class="bi bi-house-door-fill me-1"></i>Trang chủ
              </router-link>
            </li>
            <li class="breadcrumb-item active bread-active">Tài khoản của tôi</li>
          </ol>
        </nav>

        <div class="profile-layout">

          <!-- SIDEBAR -->
          <aside class="sidebar-panel">
            <div class="avatar-section">
              <div class="avatar-ring">
                <div class="avatar-frame">
                  <img v-if="user.avatar" :src="user.avatar" alt="Avatar" class="avatar-img">
                  <span v-else class="avatar-initials">{{ user.name ? user.name.charAt(0).toUpperCase() : 'U' }}</span>
                </div>
                <label for="avatar-upload" class="avatar-cam-btn" title="Đổi ảnh">
                  <i v-if="isUploadingAvatar" class="bi bi-arrow-clockwise spin-icon"></i>
                  <i v-else class="bi bi-camera-fill"></i>
                </label>
                <input type="file" id="avatar-upload" hidden @change="handleAvatarChange" accept="image/*">
              </div>
              <h5 class="user-name">{{ user.name || 'Khách hàng' }}</h5>
              <p class="user-email">{{ user.email || 'Chưa cập nhật email' }}</p>
              <div class="user-badge" v-if="user.name">
                <i class="bi bi-patch-check-fill me-1"></i>Thành viên
              </div>
            </div>

            <nav class="sidebar-nav">
              <button v-for="item in navItems" :key="item.tab"
                      class="nav-item"
                      :class="{ 'nav-item--active': activeTab === item.tab }"
                      @click="switchTab(item.tab)">
                <div class="nav-item__icon" :class="`icon--${item.color}`">
                  <i :class="item.icon"></i>
                </div>
                <div class="nav-item__content">
                  <span class="nav-item__label">{{ item.label }}</span>
                  <span class="nav-item__desc">{{ item.desc }}</span>
                </div>
                <i class="bi bi-chevron-right nav-item__arrow"></i>
              </button>

              <hr class="nav-divider">

              <button class="nav-item nav-item--danger" @click="logout">
                <div class="nav-item__icon icon--danger">
                  <i class="bi bi-box-arrow-right"></i>
                </div>
                <div class="nav-item__content">
                  <span class="nav-item__label">Đăng xuất</span>
                </div>
              </button>
            </nav>
          </aside>

          <!-- MAIN CONTENT PANEL -->
          <div class="content-panel">

            <div v-if="isProfileLoading" class="panel-card">
              <div class="inner-loading">
                <div class="loading-spinner"></div>
                <p>Đang tải thông tin...</p>
              </div>
            </div>

            <transition name="tab-fade" mode="out-in">

              <!-- ==================== TAB: THÔNG TIN ==================== -->
              <div v-if="activeTab === 'info' && !isProfileLoading" key="info" class="panel-card">
                <div class="panel-header">
                  <div>
                    <h2 class="panel-title">Hồ sơ cá nhân</h2>
                    <p class="panel-subtitle">Cập nhật thông tin để bảo mật tài khoản của bạn</p>
                  </div>
                  <div class="panel-header-icon">
                    <i class="bi bi-person-vcard-fill"></i>
                  </div>
                </div>

                <form @submit.prevent="updateProfile" class="profile-form">
                  <div class="form-grid">
                    <div class="form-field">
                      <label class="field-label">Họ và tên <span class="required">*</span></label>
                      <div class="field-input-wrap">
                        <i class="bi bi-person field-icon"></i>
                        <input type="text" class="field-input" v-model="user.name"
                               placeholder="Nguyễn Văn A" required>
                      </div>
                    </div>

                    <div class="form-field">
                      <label class="field-label">Số điện thoại</label>
                      <div class="field-input-wrap">
                        <i class="bi bi-telephone field-icon"></i>
                        <input type="tel" class="field-input" v-model="user.phone"
                               placeholder="0912 345 678">
                      </div>
                    </div>

                    <div class="form-field form-field--full">
                      <label class="field-label">
                        Địa chỉ Email
                        <span class="field-locked"><i class="bi bi-lock-fill"></i> Cố định</span>
                      </label>
                      <div class="field-input-wrap field-input-wrap--disabled">
                        <i class="bi bi-envelope field-icon"></i>
                        <input type="email" class="field-input" v-model="user.email" disabled>
                      </div>
                    </div>
                  </div>

                  <div class="form-actions">
                    <button type="button" class="btn-ghost-form" @click="resetForm">Đặt lại</button>
                    <button type="submit" class="btn-save" :disabled="isSaving">
                      <span v-if="isSaving" class="btn-spinner"></span>
                      <i v-else class="bi bi-check2-circle me-2"></i>
                      {{ isSaving ? 'Đang lưu...' : 'Lưu thay đổi' }}
                    </button>
                  </div>
                </form>

                <!-- ══════════ PASSWORD SECTION ══════════ -->
               <!-- ══════════ PASSWORD SECTION ══════════ -->
<div class="password-section">

  <!-- Google user chưa có mật khẩu -->
  <div v-if="isGoogleUser && !hasPassword">
    <div class="section-divider"><span>Tạo mật khẩu</span></div>
    <div class="google-pwd-notice">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/24px-Google_%22G%22_logo.svg.png"
           alt="Google" width="18" class="me-2">
      <div>
        <strong>Tài khoản đăng nhập bằng Google</strong>
        <p class="mb-0 mt-1" style="font-size:.82rem;color:#666;">
          Tạo mật khẩu để có thể đăng nhập bằng email &amp; mật khẩu trong tương lai.
        </p>
      </div>
    </div>

    <div class="form-grid mt-4">
      <div class="form-field">
        <label class="field-label">Mật khẩu mới</label>
        <div class="field-input-wrap" :class="{ 'field-input-wrap--error': passwords.new && !isPasswordValid(passwords.new) }">
          <i class="bi bi-key field-icon"></i>
          <input :type="showPwd.new ? 'text' : 'password'" class="field-input"
                 v-model="passwords.new" placeholder="Tối thiểu 8 ký tự">
          <button type="button" class="pwd-toggle" @click="showPwd.new = !showPwd.new">
            <i :class="showPwd.new ? 'bi-eye-slash' : 'bi-eye'" class="bi"></i>
          </button>
        </div>
        <div v-if="passwords.new" class="pwd-rules">
          <div class="pwd-rule" :class="passwords.new.length >= 8 ? 'rule--pass' : 'rule--fail'">
            <i :class="passwords.new.length >= 8 ? 'bi-check-circle-fill' : 'bi-x-circle-fill'" class="bi me-1"></i>Tối thiểu 8 ký tự
          </div>
          <div class="pwd-rule" :class="/[A-Z]/.test(passwords.new) ? 'rule--pass' : 'rule--fail'">
            <i :class="/[A-Z]/.test(passwords.new) ? 'bi-check-circle-fill' : 'bi-x-circle-fill'" class="bi me-1"></i>Có ít nhất 1 chữ hoa (A-Z)
          </div>
          <div class="pwd-rule" :class="/[0-9]/.test(passwords.new) ? 'rule--pass' : 'rule--fail'">
            <i :class="/[0-9]/.test(passwords.new) ? 'bi-check-circle-fill' : 'bi-x-circle-fill'" class="bi me-1"></i>Có ít nhất 1 chữ số (0-9)
          </div>
          <div class="pwd-rule" :class="/[^A-Za-z0-9]/.test(passwords.new) ? 'rule--pass' : 'rule--fail'">
            <i :class="/[^A-Za-z0-9]/.test(passwords.new) ? 'bi-check-circle-fill' : 'bi-x-circle-fill'" class="bi me-1"></i>Có ít nhất 1 ký tự đặc biệt (!@#$...)
          </div>
        </div>
      </div>

      <div class="form-field">
        <label class="field-label">Xác nhận mật khẩu</label>
        <div class="field-input-wrap"
             :class="{ 'field-input-wrap--error': passwords.confirm && passwords.new !== passwords.confirm }">
          <i class="bi bi-key-fill field-icon"></i>
          <input :type="showPwd.confirm ? 'text' : 'password'" class="field-input"
                 v-model="passwords.confirm" placeholder="Nhập lại mật khẩu">
          <button type="button" class="pwd-toggle" @click="showPwd.confirm = !showPwd.confirm">
            <i :class="showPwd.confirm ? 'bi-eye-slash' : 'bi-eye'" class="bi"></i>
          </button>
        </div>
        <p v-if="passwords.confirm && passwords.new !== passwords.confirm" class="field-error">
          <i class="bi bi-exclamation-circle me-1"></i>Mật khẩu không khớp
        </p>
        <p v-else-if="passwords.confirm && passwords.new === passwords.confirm" class="field-success">
          <i class="bi bi-check-circle me-1"></i>Mật khẩu khớp
        </p>
      </div>
    </div>

    <div class="form-actions">
      <button class="btn-save" @click="setPasswordForGoogleUser"
              :disabled="isSavingPassword || !isPasswordValid(passwords.new) || passwords.new !== passwords.confirm">
        <span v-if="isSavingPassword" class="btn-spinner"></span>
        <i v-else class="bi bi-shield-check me-2"></i>
        {{ isSavingPassword ? 'Đang lưu...' : 'Tạo mật khẩu' }}
      </button>
    </div>
  </div>

  <!-- User thường HOẶC Google user đã có mật khẩu -->
  <div v-else>
    <div class="section-divider"><span>Đổi mật khẩu</span></div>
    <div class="form-grid">
      <div class="form-field form-field--full">
        <label class="field-label">Mật khẩu hiện tại</label>
        <div class="field-input-wrap">
          <i class="bi bi-lock field-icon"></i>
          <input :type="showPwd.current ? 'text' : 'password'" class="field-input"
                 v-model="passwords.current" placeholder="••••••••">
          <button type="button" class="pwd-toggle" @click="showPwd.current = !showPwd.current">
            <i :class="showPwd.current ? 'bi-eye-slash' : 'bi-eye'" class="bi"></i>
          </button>
        </div>
      </div>

      <div class="form-field">
        <label class="field-label">Mật khẩu mới</label>
        <div class="field-input-wrap" :class="{ 'field-input-wrap--error': passwords.new && !isPasswordValid(passwords.new) }">
          <i class="bi bi-key field-icon"></i>
          <input :type="showPwd.new ? 'text' : 'password'" class="field-input"
                 v-model="passwords.new" placeholder="Tối thiểu 8 ký tự">
          <button type="button" class="pwd-toggle" @click="showPwd.new = !showPwd.new">
            <i :class="showPwd.new ? 'bi-eye-slash' : 'bi-eye'" class="bi"></i>
          </button>
        </div>
        <div v-if="passwords.new" class="pwd-rules">
          <div class="pwd-rule" :class="passwords.new.length >= 8 ? 'rule--pass' : 'rule--fail'">
            <i :class="passwords.new.length >= 8 ? 'bi-check-circle-fill' : 'bi-x-circle-fill'" class="bi me-1"></i>Tối thiểu 8 ký tự
          </div>
          <div class="pwd-rule" :class="/[A-Z]/.test(passwords.new) ? 'rule--pass' : 'rule--fail'">
            <i :class="/[A-Z]/.test(passwords.new) ? 'bi-check-circle-fill' : 'bi-x-circle-fill'" class="bi me-1"></i>Có ít nhất 1 chữ hoa (A-Z)
          </div>
          <div class="pwd-rule" :class="/[0-9]/.test(passwords.new) ? 'rule--pass' : 'rule--fail'">
            <i :class="/[0-9]/.test(passwords.new) ? 'bi-check-circle-fill' : 'bi-x-circle-fill'" class="bi me-1"></i>Có ít nhất 1 chữ số (0-9)
          </div>
          <div class="pwd-rule" :class="/[^A-Za-z0-9]/.test(passwords.new) ? 'rule--pass' : 'rule--fail'">
            <i :class="/[^A-Za-z0-9]/.test(passwords.new) ? 'bi-check-circle-fill' : 'bi-x-circle-fill'" class="bi me-1"></i>Có ít nhất 1 ký tự đặc biệt (!@#$...)
          </div>
        </div>
      </div>

      <div class="form-field">
        <label class="field-label">Xác nhận mật khẩu</label>
        <div class="field-input-wrap"
             :class="{ 'field-input-wrap--error': passwords.confirm && passwords.new !== passwords.confirm }">
          <i class="bi bi-key-fill field-icon"></i>
          <input :type="showPwd.confirm ? 'text' : 'password'" class="field-input"
                 v-model="passwords.confirm" placeholder="Nhập lại mật khẩu">
          <button type="button" class="pwd-toggle" @click="showPwd.confirm = !showPwd.confirm">
            <i :class="showPwd.confirm ? 'bi-eye-slash' : 'bi-eye'" class="bi"></i>
          </button>
        </div>
        <p v-if="passwords.confirm && passwords.new !== passwords.confirm" class="field-error">
          <i class="bi bi-exclamation-circle me-1"></i>Mật khẩu không khớp
        </p>
        <p v-else-if="passwords.confirm && passwords.new === passwords.confirm" class="field-success">
          <i class="bi bi-check-circle me-1"></i>Mật khẩu khớp
        </p>
      </div>
    </div>

    <div class="form-actions">
      <button class="btn-save" @click="changePassword"
              :disabled="isSavingPassword || !passwords.current || !isPasswordValid(passwords.new) || passwords.new !== passwords.confirm">
        <span v-if="isSavingPassword" class="btn-spinner"></span>
        <i v-else class="bi bi-shield-check me-2"></i>
        {{ isSavingPassword ? 'Đang lưu...' : 'Cập nhật mật khẩu' }}
      </button>
    </div>
  </div>

</div>
<!-- ══════════ END PASSWORD SECTION ══════════ -->
                <!-- ══════════ END PASSWORD SECTION ══════════ -->

              </div>

              <!-- ==================== TAB: ĐƠN HÀNG ==================== -->
              <div v-else-if="activeTab === 'orders'" key="orders" class="panel-card">
                <div class="panel-header">
                  <div>
                    <h2 class="panel-title">Lịch sử đơn hàng</h2>
                    <p class="panel-subtitle">{{ orders.length }} đơn hàng đã đặt</p>
                  </div>
                  <div class="panel-header-icon">
                    <i class="bi bi-bag-check-fill"></i>
                  </div>
                </div>

                <div v-if="isOrdersLoading" class="inner-loading">
                  <div class="loading-spinner"></div>
                  <p>Đang tải đơn hàng...</p>
                </div>

                <div v-else-if="orders.length === 0" class="inner-empty">
                  <i class="bi bi-bag-x inner-empty__icon"></i>
                  <p class="inner-empty__text">Bạn chưa có đơn hàng nào.</p>
                  <router-link to="/san-pham" class="btn-save text-decoration-none">
                    <i class="bi bi-bag-heart me-2"></i>Mua sắm ngay
                  </router-link>
                </div>

                <div v-else>
                  <div class="order-stats">
                    <div class="stat-pill stat-pill--total">
                      <span class="stat-num">{{ orders.length }}</span>
                      <span class="stat-label">Tổng đơn</span>
                    </div>
                    <div class="stat-pill stat-pill--done">
                      <span class="stat-num">{{ orders.filter(o => o.trangThai === 'HOAN_THANH').length }}</span>
                      <span class="stat-label">Hoàn thành</span>
                    </div>
                    <div class="stat-pill stat-pill--pending">
                      <span class="stat-num">{{ orders.filter(o => o.trangThai === 'CHO_XAC_NHAN').length }}</span>
                      <span class="stat-label">Chờ duyệt</span>
                    </div>
                    <div class="stat-pill stat-pill--cancelled">
                      <span class="stat-num">{{ orders.filter(o => o.trangThai === 'DA_HUY').length }}</span>
                      <span class="stat-label">Đã hủy</span>
                    </div>
                  </div>

                  <div class="orders-table-wrap">
                    <table class="orders-table">
                      <thead>
                        <tr>
                          <th>Mã đơn</th>
                          <th>Ngày đặt</th>
                          <th class="text-end">Tổng tiền</th>
                          <th class="text-center">Trạng thái</th>
                          <th class="text-center">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="order in orders" :key="order.id" class="order-row">
  <td class="order-code" data-label="Mã đơn">
    <i class="bi bi-receipt-cutoff me-2 text-red-muted"></i>
    {{ order.maDonHang || `DH00${order.id}` }}
  </td>
  <td class="order-date-cell" data-label="Ngày đặt">{{ formatDate(order.ngayTao) }}</td>
  <td class="order-total-cell text-end" data-label="Tổng tiền">{{ formatPrice(order.tongTienThanhToan) }}đ</td>
  <td class="text-center" data-label="Trạng thái">
    <span class="status-chip" :class="getStatusClass(order.trangThai)">
      {{ formatStatus(order.trangThai) }}
    </span>
  </td>
  <td class="text-center" data-label="Hành động">
    <button class="table-action-btn" @click="viewOrderDetail(order)">
      <i class="bi bi-eye"></i>
    </button>
  </td>
</tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- ==================== TAB: SỔ ĐỊA CHỈ ==================== -->
              <div v-else-if="activeTab === 'address'" key="address" class="panel-card">
                <div class="panel-header">
                  <div>
                    <h2 class="panel-title">Sổ địa chỉ</h2>
                    <p class="panel-subtitle">{{ addresses.length }} địa chỉ đã lưu</p>
                  </div>
                  <button @click="openAddAddressForm" class="btn-save">
                    <i class="bi bi-plus-lg me-2"></i>Thêm địa chỉ
                  </button>
                </div>

                <div v-if="addresses.length === 0" class="inner-empty">
                  <i class="bi bi-geo-alt inner-empty__icon"></i>
                  <p class="inner-empty__text">Chưa có địa chỉ nào được lưu.</p>
                  <button @click="openAddAddressForm" class="btn-save">
                    <i class="bi bi-plus-lg me-2"></i>Thêm địa chỉ mới
                  </button>
                </div>

                <div v-else class="address-list">
                  <div v-for="addr in addresses" :key="addr.id"
                       class="address-card"
                       :class="{ 'address-card--default': addr.laMacDinh }">
                    <div class="address-card__badge" v-if="addr.laMacDinh">
                      <i class="bi bi-check-circle-fill me-1"></i>Mặc định
                    </div>
                    <div class="address-card__body">
                      <div class="address-header">
                        <h6 class="address-name">{{ addr.hoTenNguoiNhan }}</h6>
                        <span class="address-phone"><i class="bi bi-telephone me-1"></i>{{ addr.soDienThoai }}</span>
                      </div>
                      <p class="address-detail">
                        <i class="bi bi-geo-alt me-2 text-green"></i>
                        {{ addr.diaChiDayDu || `${addr.diaChiChiTiet}, ${addr.phuongXa}, ${addr.quanHuyen}, ${addr.tinhThanh}` }}
                      </p>
                      <div class="address-actions">
                        <button @click="openEditAddressForm(addr)" class="addr-btn addr-btn--edit">
                          <i class="bi bi-pencil me-1"></i>Chỉnh sửa
                        </button>
                        <button v-if="!addr.laMacDinh" @click="deleteAddress(addr.id)" class="addr-btn addr-btn--delete">
                          <i class="bi bi-trash me-1"></i>Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </main>

    <!-- ADDRESS MODAL -->
    <transition name="modal-fade">
      <div v-if="isAddressFormOpen" class="modal-overlay" @click.self="isAddressFormOpen = false">
        <div class="modal-box modal-box--address">
          <div class="modal-header-custom">
            <div>
              <h5 class="modal-title-custom">{{ editingAddressId ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới' }}</h5>
              <p class="modal-sub">Điền thông tin nhận hàng chính xác</p>
            </div>
            <button @click="isAddressFormOpen = false" class="modal-close"><i class="bi bi-x-lg"></i></button>
          </div>

          <div class="modal-body-custom">
            <div class="form-grid">
              <div class="form-field">
                <label class="field-label">Họ tên người nhận <span class="required">*</span></label>
                <div class="field-input-wrap">
                  <i class="bi bi-person field-icon"></i>
                  <input type="text" class="field-input" v-model="addressForm.tenNguoiNhan" placeholder="Nguyễn Văn A">
                </div>
              </div>
              <div class="form-field">
                <label class="field-label">Số điện thoại <span class="required">*</span></label>
                <div class="field-input-wrap">
                  <i class="bi bi-telephone field-icon"></i>
                  <input type="tel" class="field-input" v-model="addressForm.sdt" placeholder="0912 345 678">
                </div>
              </div>
              <div class="form-field">
                <label class="field-label">Tỉnh / Thành phố <span class="required">*</span></label>
                <div class="field-select-wrap">
                  <i class="bi bi-map field-icon"></i>
                  <select class="field-input field-select" v-model="selectedProvinceCode" @change="onProvinceChange">
                    <option value="" disabled>Chọn Tỉnh/Thành</option>
                    <option v-for="p in provinces" :key="p.code" :value="p.code">{{ p.name }}</option>
                  </select>
                </div>
              </div>
              <div class="form-field">
                <label class="field-label">Phường/Xã - Quận/Huyện <span class="required">*</span></label>
                <div class="field-select-wrap">
                  <i class="bi bi-geo field-icon"></i>
                  <select class="field-input field-select" v-model="selectedWardCode" @change="onWardChange" :disabled="!selectedProvinceCode">
                    <option value="" disabled>{{ selectedProvinceCode ? 'Chọn Phường/Xã' : 'Chọn tỉnh trước' }}</option>
                    <option v-for="w in wards" :key="w.code" :value="w.code">{{ w.extendedName }}</option>
                  </select>
                </div>
              </div>
              <div class="form-field form-field--full">
                <label class="field-label">Địa chỉ chi tiết</label>
                <div class="field-input-wrap">
                  <i class="bi bi-house field-icon"></i>
                  <input type="text" class="field-input" v-model="addressForm.diaChiChiTiet" placeholder="Số nhà, tên đường, tòa nhà...">
                </div>
              </div>
              <div class="form-field form-field--full">
                <div class="default-toggle" @click="addressForm.laMacDinh = !addressForm.laMacDinh">
                  <div class="toggle-switch" :class="{ 'toggle-switch--on': addressForm.laMacDinh }">
                    <div class="toggle-knob"></div>
                  </div>
                  <div>
                    <p class="toggle-label">Đặt làm địa chỉ mặc định</p>
                    <p class="toggle-desc">Địa chỉ này sẽ được ưu tiên khi thanh toán</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer-custom">
            <button @click="isAddressFormOpen = false" class="btn-ghost-form">Hủy bỏ</button>
            <button @click="saveAddress" class="btn-save" :disabled="isSavingAddress">
              <span v-if="isSavingAddress" class="btn-spinner"></span>
              <i v-else class="bi bi-check2-circle me-2"></i>
              {{ isSavingAddress ? 'Đang lưu...' : (editingAddressId ? 'Cập nhật' : 'Lưu địa chỉ') }}
            </button>
          </div>
        </div>
      </div>
    </transition>
    <!-- CROP MODAL -->
<Teleport to="body">
  <Transition name="crop-fade">
    <div v-if="cropModalOpen" class="crop-overlay" @click.self="cropModalOpen = false">
      <div class="crop-modal">

        <!-- Header -->
        <div class="crop-header">
          <div>
            <p class="crop-title">Chỉnh ảnh đại diện</p>
            <p class="crop-sub">Kéo để căn chỉnh · Cuộn chuột để zoom</p>
          </div>
          <button class="crop-close-btn" @click="cropModalOpen = false">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <!-- Crop area -->
        <div class="crop-body">
          <div class="crop-canvas-wrap">
            <Cropper
              ref="cropperRef"
              class="crop-canvas"
              :src="rawImage"
              :stencil-component="CircleStencil"
              :stencil-props="{ aspectRatio: 1 }"
              :default-size="{ width: 200, height: 200 }"
              background-class="crop-bg"
            />
          </div>

          <!-- Zoom slider -->
          <div class="crop-zoom-row">
            <i class="bi bi-zoom-out crop-zoom-icon"></i>
            <input
              type="range" min="0" max="1" step="0.01"
              v-model="cropZoom"
              class="crop-zoom-slider"
              @input="onZoomInput"
            />
            <i class="bi bi-zoom-in crop-zoom-icon"></i>
          </div>

          <!-- Preview -->
          <div class="crop-preview-row">
            <div class="crop-preview-box">
              <div class="crop-preview-avatar">
                <img v-if="user.avatar" :src="user.avatar" alt="">
                <span v-else>{{ user.name?.charAt(0)?.toUpperCase() }}</span>
              </div>
              <div>
                <p class="crop-preview-label">Ảnh hiện tại</p>
                <p class="crop-preview-sub">Sẽ thay thế sau khi lưu</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="crop-footer">
          <button class="crop-btn-cancel" @click="cropModalOpen = false">Hủy</button>
          <button class="crop-btn-save" @click="confirmCrop" :disabled="isUploadingAvatar">
            <span v-if="isUploadingAvatar" class="spinner-border spinner-border-sm me-2"
                  style="width:13px;height:13px;border-width:2px;"></span>
            <i v-else class="bi bi-check2 me-2"></i>
            {{ isUploadingAvatar ? 'Đang lưu...' : 'Lưu ảnh' }}
          </button>
        </div>

      </div>
    </div>
  </Transition>
</Teleport>
    <!-- TOAST -->
    <transition name="toast-slide">
      <div v-if="toast.show" class="toast-notification" :class="`toast--${toast.type}`">
        <i :class="['bi me-2', toast.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill']"></i>
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { cartState } from '@/services/cartStore';
import { API_BASE } from '@/config/api'
import { Cropper, CircleStencil } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const cropModalOpen = ref(false);
const rawImage      = ref('');
const cropperRef    = ref(null);
const cropZoom    = ref(0);
const lastZoomVal = ref(0);
const router = useRouter();
const activeTab         = ref('info');
const isSaving          = ref(false);
const isSavingPassword  = ref(false);
const isSavingAddress   = ref(false);
const isOrdersLoading   = ref(false);
const isProfileLoading  = ref(false);
const isUploadingAvatar = ref(false);
const onZoomInput = () => {
  const newVal = parseFloat(cropZoom.value);
  const delta  = newVal - lastZoomVal.value;
  lastZoomVal.value = newVal;
  if (delta === 0 || !cropperRef.value) return;
  const factor = delta > 0
    ? 1 + delta * 4
    : 1 / (1 + Math.abs(delta) * 4);
  cropperRef.value.zoom(factor);
};
const user       = ref({ name: '', email: '', phone: '', avatar: '' });
const userBackup = ref({ ...user.value });

// ── Google user flags ──
const isGoogleUser = ref(localStorage.getItem('is_google_user') === 'true');
const hasPassword  = ref(localStorage.getItem('has_password')   === 'true');

// ── OTP refs ──




const passwords = ref({ current: '', new: '', confirm: '' });
const showPwd   = ref({ current: false, new: false, confirm: false });
const toast     = ref({ show: false, message: '', type: 'success' });

const navItems = [
  { tab: 'info',    label: 'Thông tin tài khoản', desc: 'Hồ sơ & mật khẩu',   icon: 'bi bi-person-vcard', color: 'red'   },
  { tab: 'orders',  label: 'Đơn hàng của tôi',    desc: 'Lịch sử & theo dõi', icon: 'bi bi-bag-check',    color: 'green' },
  { tab: 'address', label: 'Sổ địa chỉ',           desc: 'Địa chỉ giao hàng',  icon: 'bi bi-geo-alt',      color: 'blue'  }
];

const orders            = ref([]);
const addresses         = ref([]);
const isAddressFormOpen = ref(false);
const editingAddressId  = ref(null);
const addressForm = ref({
  tenNguoiNhan: '', sdt: '',
  tinhThanh: '', quanHuyen: '', phuongXa: '',
  diaChiChiTiet: '', laMacDinh: false
});
const provinces            = ref([]);
const wards                = ref([]);
const selectedProvinceCode = ref('');
const selectedWardCode     = ref('');

// ══════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════
const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
});

const isPasswordValid = (pwd) =>
  !!pwd && pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd);

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type };
  setTimeout(() => { toast.value.show = false; }, 3500);
};

const formatPrice  = (v) => v ? new Intl.NumberFormat('vi-VN').format(v) : '0';
const formatDate   = (s) => s ? new Date(s).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
const formatStatus = (s) => ({ CHO_XAC_NHAN: 'Chờ xác nhận', DANG_XU_LY: 'Đang chuẩn bị', DANG_DONG_GOI: 'Đang đóng gói', DANG_GIAO: 'Đang giao', DA_GIAO: 'Đã nhận', HOAN_THANH: 'Hoàn thành', DA_HUY: 'Đã hủy' }[s] || s);
const getStatusClass = (s) => ({ HOAN_THANH: 'chip--success', DA_GIAO: 'chip--success', CHO_XAC_NHAN: 'chip--pending', DANG_XU_LY: 'chip--info', DANG_DONG_GOI: 'chip--info', DANG_GIAO: 'chip--shipping', DA_HUY: 'chip--danger' }[s] || 'chip--default');

// ══════════════════════════════════════════════════════════════════
// FETCH PROFILE
// ══════════════════════════════════════════════════════════════════
const fetchProfile = async () => {
  isProfileLoading.value = true;
  try {
   const res = await axios.get(`${API_BASE}/api/v1/users/me`, getAuthHeaders());
    const d = res.data;
    console.log('API response:', d);
    console.log('isGoogleUser:', d.isGoogleUser, '| hasPassword:', d.hasPassword);

    user.value = {
      name:   d.hoTen       || '',
      email:  d.email       || '',
      phone:  d.soDienThoai || '',
      avatar: d.anhDaiDien  || ''
    };
    userBackup.value = { ...user.value };

    // Lưu userId để các API khác (orders, avatar...) dùng
    if (d.id) localStorage.setItem('userId', String(d.id));

    isGoogleUser.value = d.isGoogleUser ?? false;
    hasPassword.value  = d.hasPassword  ?? true;

    localStorage.setItem('user_name',      user.value.name);
    localStorage.setItem('user_email',     user.value.email);
    localStorage.setItem('user_phone',     user.value.phone);
    localStorage.setItem('user_avatar',    user.value.avatar);
    localStorage.setItem('is_google_user', String(isGoogleUser.value));
    localStorage.setItem('has_password',   String(hasPassword.value));

    window.dispatchEvent(new CustomEvent('avatar-updated', { detail: user.value.avatar }));
  } catch (e) {
    console.error('Không thể tải thông tin user', e);
    isGoogleUser.value = localStorage.getItem('is_google_user') === 'true';
    hasPassword.value  = localStorage.getItem('has_password')   === 'true';
  } finally {
    isProfileLoading.value = false;
  }
};
// ══════════════════════════════════════════════════════════════════
// UPDATE PROFILE
// ══════════════════════════════════════════════════════════════════
const resetForm = () => { user.value = { ...userBackup.value }; };

const updateProfile = async () => {
  isSaving.value = true;
  const userId = localStorage.getItem('userId');
  try {
    const res = await axios.put(
      `${API_BASE}/api/v1/users/${userId}`,
      { hoTen: user.value.name, soDienThoai: user.value.phone },
      getAuthHeaders()
    );
    user.value.name  = res.data.hoTen       || user.value.name;
    user.value.phone = res.data.soDienThoai || '';
    userBackup.value = { ...user.value };
    localStorage.setItem('user_name',  user.value.name);
    localStorage.setItem('user_phone', user.value.phone);
    showToast('Cập nhật thông tin thành công!');
  } catch (err) {
    showToast(err.response?.data?.message || 'Không thể cập nhật thông tin!', 'error');
  } finally {
    isSaving.value = false;
  }
};

// ══════════════════════════════════════════════════════════════════
// CHANGE PASSWORD (user thường hoặc Google user đã có password)
// ══════════════════════════════════════════════════════════════════
const changePassword = async () => {
  if (!isPasswordValid(passwords.value.new))
    return showToast('Mật khẩu chưa đủ điều kiện bảo mật!', 'error');
  if (passwords.value.new !== passwords.value.confirm)
    return showToast('Mật khẩu xác nhận không khớp!', 'error');

  isSavingPassword.value = true;
  const userId = localStorage.getItem('userId');
  try {
    await axios.put(
      `${API_BASE}/api/v1/users/${userId}/change-password`,
      { matKhauCu: passwords.value.current, matKhauMoi: passwords.value.new },
      getAuthHeaders()
    );
    passwords.value = { current: '', new: '', confirm: '' };
    showToast('Đổi mật khẩu thành công!');
  } catch (err) {
    showToast(err.response?.data?.message || 'Mật khẩu hiện tại không đúng!', 'error');
  } finally {
    isSavingPassword.value = false;
  }
};

// ══════════════════════════════════════════════════════════════════
// SET PASSWORD (Google user lần đầu tạo mật khẩu) — với OTP flow
// ══════════════════════════════════════════════════════════════════
const setPasswordForGoogleUser = async () => {
  if (!isPasswordValid(passwords.value.new))
    return showToast('Mật khẩu chưa đủ điều kiện bảo mật!', 'error');
  if (passwords.value.new !== passwords.value.confirm)
    return showToast('Mật khẩu xác nhận không khớp!', 'error');

  isSavingPassword.value = true;
  try {
   await axios.put(`${API_BASE}/api/v1/users/me/set-password`,
      { matKhauMoi: passwords.value.new },
      getAuthHeaders()
    );
    hasPassword.value = true;
    localStorage.setItem('has_password', 'true');
    passwords.value = { current: '', new: '', confirm: '' };
    showToast('Mật khẩu đã được tạo thành công!');
  } catch (err) {
    showToast(err.response?.data?.message || 'Không thể tạo mật khẩu!', 'error');
  } finally {
    isSavingPassword.value = false;
  }
};

// ══════════════════════════════════════════════════════════════════
// AVATAR
// ══════════════════════════════════════════════════════════════════
const handleAvatarChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    showToast('Ảnh không được vượt quá 5MB!', 'error');
    return;
  }
  rawImage.value      = URL.createObjectURL(file);
  cropZoom.value      = 0;
  lastZoomVal.value   = 0;  
  cropModalOpen.value = true;
  e.target.value      = '';
};

const confirmCrop = async () => {
  const { canvas } = cropperRef.value.getResult();
  const base64 = canvas.toDataURL('image/jpeg', 0.88);
  cropModalOpen.value     = false;
  user.value.avatar       = base64;
  isUploadingAvatar.value = true;
  const userId = localStorage.getItem('userId');
  try {
    await new Promise(res => setTimeout(res, 300));
    const res = await axios.put(
      `${API_BASE}/api/v1/users/${userId}/avatar`,
      { anhDaiDien: base64 },
      getAuthHeaders()
    );
    user.value.avatar       = res.data.anhDaiDien || base64;
    userBackup.value.avatar = user.value.avatar;
    localStorage.setItem('user_avatar', user.value.avatar);
    window.dispatchEvent(new CustomEvent('avatar-updated', { detail: user.value.avatar }));
    showToast('Cập nhật ảnh đại diện thành công!');
  } catch (err) {
    showToast(err.response?.data?.message || 'Không thể lưu ảnh đại diện!', 'error');
  } finally {
    isUploadingAvatar.value = false;
  }
};

// ══════════════════════════════════════════════════════════════════
// TAB / ORDERS / ADDRESSES
// ══════════════════════════════════════════════════════════════════
const switchTab = (tab) => {
  activeTab.value = tab;
  if (tab === 'orders')  fetchOrders();
  if (tab === 'address') fetchAddresses();
};

const fetchOrders = async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) return;
  isOrdersLoading.value = true;
  try {
    const res = await axios.get(`${API_BASE}/api/v1/order/user/${userId}`, getAuthHeaders());
    orders.value = res.data.sort((a, b) => new Date(b.ngayTao) - new Date(a.ngayTao));
  } catch { showToast('Không thể tải đơn hàng', 'error'); }
  finally  { isOrdersLoading.value = false; }
};

const viewOrderDetail = (order) => {
  router.push(`/don-hang/${order.id}`).catch(() =>
    showToast(`Đơn #${order.maDonHang || order.id}`, 'info'));
};

const fetchAddresses = async () => {
  const token = localStorage.getItem('auth_token');
  if (!token) return;
  try {
    const res = await axios.get(`${API_BASE}/api/v1/addresses`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    addresses.value = res.data
      .map(addr => ({ ...addr, laMacDinh: addr.laDiaChiMacDinh ?? addr.laMacDinh ?? false }))
      .sort((a, b) => (b.laMacDinh === true) - (a.laMacDinh === true));
  } catch (e) {
    console.error('fetchAddresses lỗi:', e.response?.data || e.message);
    showToast('Không thể tải địa chỉ!', 'error');
  }
};

const fetchProvinces = async () => {
  try { const res = await axios.get('https://provinces.open-api.vn/api/p/'); provinces.value = res.data; }
  catch (e) { console.error(e); }
};

const onProvinceChange = async () => {
  const prov = provinces.value.find(p => p.code === selectedProvinceCode.value);
  addressForm.value.tinhThanh = prov?.name || '';
  selectedWardCode.value = ''; wards.value = [];
  if (!selectedProvinceCode.value) return;
  try {
    const res = await axios.get(`https://provinces.open-api.vn/api/p/${selectedProvinceCode.value}?depth=3`);
    const all = [];
    res.data.districts.forEach(d =>
      d.wards.forEach(w => all.push({ code: w.code, name: w.name, districtName: d.name, extendedName: `${w.name} (${d.name})` }))
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
  addressForm.value = { tenNguoiNhan: user.value.name, sdt: user.value.phone, tinhThanh: '', quanHuyen: '', phuongXa: '', diaChiChiTiet: '', laMacDinh: addresses.value.length === 0 };
  selectedProvinceCode.value = ''; selectedWardCode.value = ''; wards.value = [];
  isAddressFormOpen.value = true;
};

const openEditAddressForm = async (addr) => {
  editingAddressId.value = addr.id;
  let detail = addr.diaChiChiTiet || '', tinh = addr.tinhThanh || '', huyen = addr.quanHuyen || '', xa = addr.phuongXa || '';
  if (addr.diaChiDayDu && (!tinh || !xa)) {
    const parts = addr.diaChiDayDu.split(',').map(s => s.trim());
    if (parts.length >= 4) { tinh = parts[parts.length-1]; huyen = parts[parts.length-2]; xa = parts[parts.length-3]; detail = parts.slice(0, parts.length-3).join(', '); }
  }
  selectedProvinceCode.value = ''; selectedWardCode.value = ''; wards.value = [];
  const fp = provinces.value.find(p => p.name === tinh);
  if (fp) { selectedProvinceCode.value = fp.code; await onProvinceChange(); const fw = wards.value.find(w => w.name === xa && w.districtName === huyen); if (fw) selectedWardCode.value = fw.code; }
  addressForm.value = { tenNguoiNhan: addr.hoTenNguoiNhan, sdt: addr.soDienThoai, tinhThanh: tinh, quanHuyen: huyen, phuongXa: xa, diaChiChiTiet: detail, laMacDinh: addr.laMacDinh || false };
  isAddressFormOpen.value = true;
};

const saveAddress = async () => {
  if (!addressForm.value.tenNguoiNhan || !addressForm.value.sdt || !selectedWardCode.value)
    return showToast('Vui lòng điền đầy đủ thông tin!', 'error');
  isSavingAddress.value = true;
  const payload = { tenNguoiNhan: addressForm.value.tenNguoiNhan, sdt: addressForm.value.sdt, tinhThanh: addressForm.value.tinhThanh, quanHuyen: addressForm.value.quanHuyen, phuongXa: addressForm.value.phuongXa, diaChiChiTiet: addressForm.value.diaChiChiTiet, laMacDinh: addressForm.value.laMacDinh };
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
  } catch (e) { showToast(e.response?.data?.message || 'Lỗi lưu địa chỉ!', 'error'); }
  finally { isSavingAddress.value = false; }
};

const deleteAddress = async (id) => {
  if (!confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) return;
  try {
    await axios.delete(`${API_BASE}/api/v1/addresses/${id}`, getAuthHeaders());
    showToast('Đã xóa địa chỉ!');
    await fetchAddresses();
  } catch (e) { showToast(e.response?.data?.message || 'Không thể xóa địa chỉ đang sử dụng!', 'error'); }
};

// ══════════════════════════════════════════════════════════════════
// LOGOUT
// ══════════════════════════════════════════════════════════════════
const logout = () => {
  if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
    cartState.clearCart?.();
    window.dispatchEvent(new Event('cart-updated'));
    localStorage.clear();
    router.push('/');
  }
};

// ══════════════════════════════════════════════════════════════════
// MOUNTED
// ══════════════════════════════════════════════════════════════════
onMounted(async () => {
  const token = localStorage.getItem('auth_token');
  if (!token) { router.push('/dang-nhap'); return; }
  await fetchProfile();
  fetchProvinces();
  fetchAddresses();
});
</script>

<style scoped>
.profile-wrapper {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: #ffffff;
  min-height: 100vh;
}
.breadcrumb-link { color: #999; text-decoration: none; transition: color .2s; }
.breadcrumb-link:hover { color: #E53935; }
.bread-active { color: #E53935 !important; font-weight: 600; }
.breadcrumb-item + .breadcrumb-item::before { color: #ccc; }
.profile-layout { display: grid; grid-template-columns: 300px 1fr; gap: 28px; align-items: start; }
@media (max-width: 992px) { .profile-layout { grid-template-columns: 1fr; } }
.sidebar-panel { background: #fff; border-radius: 16px; box-shadow: 0 2px 16px rgba(229,57,53,.07); border: 1.5px solid #ffebee; overflow: hidden; position: sticky; top: 20px; }
.avatar-section { background: linear-gradient(135deg, #E53935 0%, #B71C1C 100%); padding: 36px 24px 28px; text-align: center; position: relative; overflow: hidden; }
.avatar-section::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 80% 20%, rgba(201,152,58,.2), transparent 60%); }
.avatar-ring { position: relative; display: inline-block; margin-bottom: 16px; }
.avatar-frame { width: 100px; height: 100px; border-radius: 50%; background: #fff5f5; border: 4px solid rgba(255,255,255,.25); display: flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,.2); }
.avatar-img { width: 100%; height: 100%; object-fit: cover; }
.avatar-initials { font-size: 2.4rem; font-weight: 700; color: #E53935; }
.avatar-cam-btn { position: absolute; bottom: 2px; right: 2px; width: 30px; height: 30px; border-radius: 50%; background: #fff; color: #E53935; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: .85rem; border: 2px solid rgba(255,255,255,.5); transition: all .2s; }
.avatar-cam-btn:hover { background: #7eb33d; color: #fff; }
.spin-icon { animation: spin .7s linear infinite; }
.user-name  { color: #fff; font-size: 1.1rem; font-weight: 700; margin-bottom: 4px; position: relative; }
.user-email { color: rgba(255,255,255,.6); font-size: .78rem; margin-bottom: 12px; position: relative; }
.user-badge { display: inline-flex; align-items: center; background: rgba(126,179,61,.25); color: #a8d56b; padding: 4px 14px; border-radius: 50px; font-size: .72rem; font-weight: 600; border: 1px solid rgba(126,179,61,.3); position: relative; }
.sidebar-nav { padding: 16px 12px; }
.nav-item { width: 100%; display: flex; align-items: center; gap: 14px; padding: 12px 14px; border-radius: 12px; border: none; background: transparent; cursor: pointer; text-align: left; transition: all .2s; margin-bottom: 4px; font-family: 'Segoe UI', system-ui, sans-serif; }
.nav-item:hover { background: #fff5f5; }
.nav-item--active { background: #fff5f5; border-left: 3px solid #E53935; padding-left: 11px; }
.nav-item--danger:hover { background: #fef2f2; }
.nav-item__icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
.icon--red    { background: #fff5f5; color: #E53935; }
.icon--green  { background: #f0f7e6; color: #7eb33d; }
.icon--blue   { background: #eff6ff; color: #3b82f6; }
.icon--danger { background: #fef2f2; color: #dc2626; }
.nav-item--active .nav-item__icon { background: #E53935; color: #fff; }
.nav-item__content { flex: 1; }
.nav-item__label { display: block; font-weight: 600; color: #333; font-size: .875rem; }
.nav-item--active .nav-item__label { color: #E53935; }
.nav-item--danger .nav-item__label { color: #dc2626; }
.nav-item__desc  { display: block; font-size: .72rem; color: #999; margin-top: 1px; }
.nav-item__arrow { color: #ccc; font-size: .75rem; }
.nav-item--active .nav-item__arrow { color: #E53935; }
.nav-divider { border-color: #ffebee; margin: 8px 0; }
.panel-card { background: #fff; border-radius: 16px; box-shadow: 0 2px 16px rgba(229,57,53,.07); border: 1.5px solid #ffebee; padding: 32px; }
.panel-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; padding-bottom: 24px; margin-bottom: 28px; border-bottom: 1.5px solid #ffebee; }
.panel-title    { color: #E53935; font-size: 1.4rem; font-weight: 700; margin-bottom: 4px; }
.panel-subtitle { color: #999; font-size: .875rem; margin: 0; }
.panel-header-icon { width: 50px; height: 50px; border-radius: 14px; background: #fff5f5; color: #E53935; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
@media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }
.form-field { display: flex; flex-direction: column; }
.form-field--full { grid-column: 1 / -1; }
.field-label { font-size: .8rem; font-weight: 600; color: #555; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
.required { color: #dc2626; }
.field-locked { display: inline-flex; align-items: center; gap: 4px; color: #999; font-weight: 400; font-size: .75rem; }
.field-input-wrap { display: flex; align-items: center; gap: 10px; border: 1.5px solid #ffcdd2; border-radius: 12px; padding: 0 14px; background: #f8f8f8; transition: all .2s; }
.field-input-wrap:focus-within { border-color: #E53935; background: #fff; box-shadow: 0 0 0 3px rgba(229,57,53,.08); }
.field-input-wrap--disabled { opacity: .65; cursor: not-allowed; }
.field-input-wrap--error { border-color: #dc2626 !important; background: #fff !important; }
.field-select-wrap { position: relative; }
.field-select-wrap .field-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); z-index: 1; }
.field-select { padding-left: 38px !important; }
.field-icon { color: #aaa; font-size: .9rem; flex-shrink: 0; }
.field-input { flex: 1; border: none; background: transparent; outline: none; padding: 13px 0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: .9rem; color: #333; }
.field-select { width: 100%; border: 1.5px solid #ffcdd2; border-radius: 12px; padding: 13px 14px; background: #f8f8f8; font-family: 'Segoe UI', system-ui, sans-serif; font-size: .9rem; color: #333; outline: none; cursor: pointer; appearance: none; transition: all .2s; }
.field-select:focus { border-color: #E53935; background: #fff; box-shadow: 0 0 0 3px rgba(229,57,53,.08); }
.field-select:disabled { opacity: .6; cursor: not-allowed; }
.field-error   { font-size: .75rem; color: #dc2626; margin: 6px 0 0; display: flex; align-items: center; }
.field-success { font-size: .75rem; color: #059669; margin: 6px 0 0; display: flex; align-items: center; }
.pwd-toggle { background: none; border: none; color: #aaa; cursor: pointer; padding: 4px; transition: color .2s; flex-shrink: 0; }
.pwd-toggle:hover { color: #E53935; }
.pwd-rules { margin-top: 10px; padding: 12px 14px; background: #f8f8f8; border-radius: 10px; border: 1px solid #ffebee; display: flex; flex-direction: column; gap: 6px; }
.pwd-rule { font-size: .78rem; font-weight: 500; display: flex; align-items: center; transition: color .2s; }
.rule--pass { color: #059669; }
.rule--fail  { color: #dc2626; }
.form-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 28px; padding-top: 20px; border-top: 1px solid #ffebee; flex-wrap: wrap; }
.section-divider { display: flex; align-items: center; gap: 16px; margin: 32px 0 24px; color: #999; font-size: .8rem; font-weight: 600; }
.section-divider::before, .section-divider::after { content: ''; flex: 1; border-top: 1px dashed #ffcdd2; }
.password-section { margin-top: 8px; }
.mt-3 { margin-top: 1rem; }
.mt-4 { margin-top: 1.5rem; }
.mt-2 { margin-top: .5rem; }
.text-end { text-align: right; }

/* Google password notice box */
.google-pwd-notice {
  display: flex; align-items: flex-start; gap: 12px;
  background: #f0f4ff; border: 1.5px solid #c7d7fe;
  border-radius: 12px; padding: 16px 18px;
  font-size: .875rem; color: #1e3a8a;
}

.btn-save { display: inline-flex; align-items: center; padding: 11px 24px; border-radius: 50px; border: none; background: #E53935; color: #fff; font-family: 'Segoe UI', system-ui, sans-serif; font-size: .875rem; font-weight: 600; cursor: pointer; text-decoration: none; transition: all .25s; box-shadow: 0 4px 14px rgba(229,57,53,.25); }
.btn-save:hover:not(:disabled) { background: #B71C1C; transform: translateY(-1px); color: #fff; box-shadow: 0 6px 20px rgba(229,57,53,.3); }
.btn-save:disabled { opacity: .5; cursor: not-allowed; transform: none; pointer-events: none; }
.btn-ghost-form { display: inline-flex; align-items: center; padding: 11px 24px; border-radius: 50px; border: 1.5px solid #ffcdd2; background: #fff; color: #666; font-family: 'Segoe UI', system-ui, sans-serif; font-size: .875rem; font-weight: 500; cursor: pointer; transition: all .2s; }
.btn-ghost-form:hover { background: #f5f5f5; }
.btn-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,.4); border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite; margin-right: 8px; }
@keyframes spin { to { transform: rotate(360deg); } }
.order-stats { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 24px; }
.stat-pill { flex: 1; min-width: 80px; padding: 14px 16px; border-radius: 14px; text-align: center; }
.stat-num   { display: block; font-size: 1.6rem; font-weight: 700; }
.stat-label { display: block; font-size: .72rem; font-weight: 600; opacity: .7; margin-top: 2px; }
.stat-pill--total     { background: #fff5f5; color: #E53935; }
.stat-pill--done      { background: #ecfdf5; color: #059669; }
.stat-pill--pending   { background: #fffbeb; color: #d97706; }
.stat-pill--cancelled { background: #fef2f2; color: #dc2626; }
.orders-table-wrap { overflow-x: auto; border-radius: 12px; border: 1.5px solid #ffebee; }
.orders-table { width: 100%; border-collapse: collapse; }
.orders-table thead th { padding: 12px 16px; background: #f8f8f8; font-size: .75rem; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: .5px; border-bottom: 1px solid #ffebee; }
.orders-table thead th:first-child { border-radius: 12px 0 0 0; }
.orders-table thead th:last-child  { border-radius: 0 12px 0 0; }
.order-row { transition: background .15s; }
.order-row:hover { background: #f8f8f8; }
.orders-table td { padding: 14px 16px; border-bottom: 1px solid #f8f4f0; font-size: .875rem; }
.order-row:last-child td { border-bottom: none; }
.order-code      { font-weight: 700; color: #E53935; }
.text-red-muted  { color: #ff8a80; }
.order-date-cell { color: #999; font-size: .82rem; }
.order-total-cell{ font-weight: 700; color: #dc2626; }
.table-action-btn { width: 34px; height: 34px; border-radius: 8px; border: 1.5px solid #ffcdd2; background: #fff; color: #E53935; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all .2s; }
.table-action-btn:hover { background: #E53935; color: #fff; border-color: #E53935; }
.status-chip { display: inline-block; padding: 4px 12px; border-radius: 50px; font-size: .72rem; font-weight: 700; }
.chip--success  { background: #ecfdf5; color: #059669; }
.chip--pending  { background: #fffbeb; color: #d97706; }
.chip--info     { background: #eff6ff; color: #3b82f6; }
.chip--shipping { background: #e0f2fe; color: #0284c7; }
.chip--danger   { background: #fef2f2; color: #dc2626; }
.chip--default  { background: #f3f4f6; color: #6b7280; }
.address-list { display: flex; flex-direction: column; gap: 16px; }
.address-card { border: 1.5px solid #ffebee; border-radius: 14px; overflow: hidden; transition: all .25s; position: relative; background: #fff; }
.address-card:hover { box-shadow: 0 8px 32px rgba(229,57,53,.12); transform: translateY(-2px); }
.address-card--default { border-color: #7eb33d; }
.address-card__badge { background: #7eb33d; color: #fff; padding: 5px 14px; font-size: .72rem; font-weight: 700; display: inline-block; }
.address-card__body  { padding: 18px 20px; }
.address-header { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; margin-bottom: 10px; }
.address-name   { font-weight: 700; color: #333; font-size: 1rem; margin: 0; }
.address-phone  { font-size: .82rem; color: #999; }
.address-detail { font-size: .875rem; color: #555; margin-bottom: 14px; }
.text-green { color: #7eb33d; }
.address-actions { display: flex; gap: 10px; }
.addr-btn { padding: 7px 16px; border-radius: 50px; font-size: .78rem; font-weight: 600; cursor: pointer; transition: all .2s; font-family: 'Segoe UI', system-ui, sans-serif; }
.addr-btn--edit   { border: 1.5px solid #ffcdd2; background: #fff; color: #E53935; }
.addr-btn--edit:hover { background: #fff5f5; border-color: #E53935; }
.addr-btn--delete { border: 1.5px solid #fca5a5; background: #fef2f2; color: #dc2626; }
.addr-btn--delete:hover { background: #dc2626; color: #fff; }
.default-toggle { display: flex; align-items: center; gap: 16px; padding: 14px 18px; border-radius: 12px; background: #f8f8f8; border: 1.5px solid #ffebee; cursor: pointer; transition: all .2s; }
.default-toggle:hover { border-color: #E53935; }
.toggle-switch { width: 44px; height: 24px; border-radius: 50px; background: #d1d5db; position: relative; flex-shrink: 0; transition: background .2s; }
.toggle-switch--on { background: #7eb33d; }
.toggle-knob { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,.2); transition: transform .2s; }
.toggle-switch--on .toggle-knob { transform: translateX(20px); }
.toggle-label { font-weight: 600; color: #333; font-size: .875rem; margin: 0 0 2px; }
.toggle-desc  { font-size: .75rem; color: #999; margin: 0; }
.inner-loading { text-align: center; padding: 60px 20px; color: #999; }
.loading-spinner { width: 40px; height: 40px; border: 3px solid #fff5f5; border-top-color: #E53935; border-radius: 50%; animation: spin .8s linear infinite; margin: 0 auto 16px; }
.inner-empty { text-align: center; padding: 60px 20px; }
.inner-empty__icon { font-size: 3rem; color: #ffcdd2; display: block; margin-bottom: 12px; }
.inner-empty__text { color: #999; margin-bottom: 20px; }
.modal-overlay { position: fixed; inset: 0; z-index: 1050; background: rgba(0,0,0,.55); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-box { background: #fff; border-radius: 20px; box-shadow: 0 25px 80px rgba(0,0,0,.25); width: 100%; overflow: hidden; display: flex; flex-direction: column; max-height: 90vh; }
.modal-box--address { max-width: 640px; }
.modal-header-custom { display: flex; justify-content: space-between; align-items: flex-start; padding: 24px 28px 20px; border-bottom: 1px solid #ffebee; background: linear-gradient(to right, #f8f8f8, #fff); }
.modal-title-custom { color: #E53935; font-size: 1.2rem; font-weight: 700; margin-bottom: 4px; }
.modal-sub  { color: #999; font-size: .82rem; margin: 0; }
.modal-close { width: 36px; height: 36px; border-radius: 50%; border: 1px solid #ffcdd2; background: #fff; color: #666; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; flex-shrink: 0; }
.modal-close:hover { background: #E53935; color: #fff; border-color: #E53935; }
.modal-body-custom { padding: 24px 28px; overflow-y: auto; flex: 1; }
.modal-footer-custom { padding: 16px 28px; border-top: 1px solid #ffebee; display: flex; justify-content: flex-end; gap: 12px; background: #f8f8f8; }
.toast-notification { position: fixed; bottom: 30px; right: 30px; z-index: 2000; padding: 14px 22px; border-radius: 12px; font-size: .875rem; font-weight: 500; display: flex; align-items: center; box-shadow: 0 8px 30px rgba(0,0,0,.2); }
.toast--success { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
.toast--error   { background: #fef2f2; color: #dc2626; border: 1px solid #fca5a5; }
.tab-fade-enter-active, .tab-fade-leave-active { transition: all .25s ease; }
.tab-fade-enter-from, .tab-fade-leave-to { opacity: 0; transform: translateY(8px); }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .25s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-active .modal-box { transition: transform .25s ease; }
.modal-fade-enter-from .modal-box   { transform: scale(.96) translateY(10px); }
.toast-slide-enter-active, .toast-slide-leave-active { transition: all .3s ease; }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateX(20px); }
/* ═══ CROP MODAL ═══ */
.crop-overlay {
  position: fixed; inset: 0; z-index: 99999;
  background: rgba(0,0,0,.6);
  backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.crop-modal {
  background: #fff; border-radius: 20px;
  width: 440px; max-width: 95vw;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,.3);
}
.crop-header {
  display: flex; align-items: flex-start;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f0f0f0;
}
.crop-title { font-size: 15px; font-weight: 700; margin: 0; color: #1a1a1a; }
.crop-sub   { font-size: 12px; color: #aaa; margin: 4px 0 0; }
.crop-close-btn {
  width: 32px; height: 32px; border-radius: 50%;
  border: 1px solid #e5e5e5; background: #f8f8f8;
  cursor: pointer; display: flex; align-items: center;
  justify-content: center; font-size: 13px; color: #666;
  flex-shrink: 0; transition: all .2s;
}
.crop-close-btn:hover { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }

.crop-body { padding: 20px 24px 16px; }

.crop-canvas-wrap {
  border-radius: 14px; overflow: hidden;
  height: 280px; background: #111;
}
.crop-canvas { height: 280px; }

/* Override vue-advanced-cropper mặc định */
:deep(.vue-advanced-cropper__background)  { background: #111 !important; }
:deep(.vue-advanced-cropper__foreground)  { background: rgba(0,0,0,.5) !important; }
:deep(.vue-circle-stencil__preview)       { border: 2.5px solid #fff !important; }

.crop-zoom-row {
  display: flex; align-items: center; gap: 10px;
  margin-top: 16px;
}
.crop-zoom-icon { font-size: 16px; color: #aaa; flex-shrink: 0; }
.crop-zoom-slider {
  flex: 1; -webkit-appearance: none; height: 4px;
  border-radius: 2px; background: #e5e5e5; outline: none; cursor: pointer;
}
.crop-zoom-slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 16px; height: 16px;
  border-radius: 50%; background: #1a1a1a;
  border: 2px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,.2); cursor: pointer;
}

.crop-preview-row { margin-top: 14px; }
.crop-preview-box {
  display: flex; align-items: center; gap: 12px;
  background: #f8f8f8; border-radius: 12px;
  padding: 10px 14px; border: 1px solid #f0f0f0;
}
.crop-preview-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: #e0e0e0; overflow: hidden; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 16px; color: #888;
}
.crop-preview-avatar img { width: 100%; height: 100%; object-fit: cover; }
.crop-preview-label { font-size: 13px; font-weight: 600; color: #1a1a1a; margin: 0; }
.crop-preview-sub   { font-size: 11px; color: #aaa; margin: 2px 0 0; }

.crop-footer {
  display: flex; justify-content: flex-end; gap: 10px;
  padding: 14px 24px 20px;
  border-top: 1px solid #f0f0f0;
}
.crop-btn-cancel {
  padding: 9px 20px; border-radius: 50px;
  border: 1px solid #e5e5e5; background: #fff;
  font-size: 14px; color: #666; cursor: pointer;
  font-family: inherit; transition: background .2s;
}
.crop-btn-cancel:hover { background: #f5f5f5; }
.crop-btn-save {
  padding: 9px 22px; border-radius: 50px;
  border: none; background: #1a1a1a; color: #fff;
  font-size: 14px; font-weight: 600; cursor: pointer;
  font-family: inherit; display: flex; align-items: center;
  transition: opacity .2s;
}
.crop-btn-save:hover:not(:disabled) { opacity: .8; }
.crop-btn-save:disabled { opacity: .4; cursor: not-allowed; }

.crop-fade-enter-active, .crop-fade-leave-active { transition: all .25s ease; }
.crop-fade-enter-from, .crop-fade-leave-to { opacity: 0; }
.crop-fade-enter-active .crop-modal,
.crop-fade-leave-active .crop-modal { transition: transform .25s ease; }
.crop-fade-enter-from .crop-modal,
.crop-fade-leave-to .crop-modal { transform: scale(.95) translateY(10px); }
/* ═══════════════════════════════════
   MOBILE RESPONSIVE — PROFILE
═══════════════════════════════════ */

@media (max-width: 992px) {
  .profile-layout { grid-template-columns: 1fr; gap: 16px; }

  .sidebar-panel {
    position: static;
    overflow: hidden;
    border-radius: 16px;
  }

  .avatar-section {
    padding: 24px 20px 20px;
  }
  .avatar-frame { width: 80px; height: 80px; }
  .avatar-initials { font-size: 1.8rem; }
  .user-name  { font-size: .95rem; }
  .user-email { font-size: .72rem; }

  /* Nav giữ nguyên dạng dọc như desktop, chỉ thu nhỏ */
  .sidebar-nav { padding: 10px 10px; }
  .nav-item { padding: 10px 12px; gap: 10px; margin-bottom: 2px; }
  .nav-item--active { padding-left: 9px; }
  .nav-item__icon { width: 32px; height: 32px; font-size: .85rem; border-radius: 8px; }
  .nav-item__label { font-size: .8rem; }
  .nav-item__desc  { font-size: .68rem; }
  .nav-item__arrow { font-size: .65rem; }

  /* Panel card */
  .panel-card { padding: 20px; border-radius: 14px; }
  .panel-header { padding-bottom: 16px; margin-bottom: 20px; gap: 12px; }
  .panel-title  { font-size: 1.1rem; }
  .panel-subtitle { font-size: .78rem; }
  .panel-header-icon { width: 42px; height: 42px; font-size: 1.1rem; border-radius: 12px; }
}

@media (max-width: 768px) {
  .panel-card { padding: 16px; border-radius: 12px; }
  .panel-header { flex-direction: row; align-items: center; }
  .panel-title  { font-size: 1rem; }

  .form-grid { grid-template-columns: 1fr; gap: 14px; }
  .form-field--full { grid-column: 1; }
  .field-input { font-size: .85rem; padding: 11px 0; }
  .field-select { font-size: .85rem; padding: 11px 14px; }
  .field-label  { font-size: .76rem; }

  .form-actions { flex-direction: column; gap: 10px; }
  .form-actions > * { width: 100%; justify-content: center; }
  .btn-save, .btn-ghost-form { padding: 12px 20px; border-radius: 12px; font-size: .875rem; }

  .pwd-rules { padding: 10px 12px; gap: 5px; }
  .pwd-rule  { font-size: .73rem; }

  .order-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .stat-pill { padding: 12px; border-radius: 12px; }
  .stat-num  { font-size: 1.3rem; }
  .stat-label{ font-size: .68rem; }

  .orders-table-wrap { border: none; border-radius: 0; overflow: visible; }
  .orders-table thead { display: none; }
  .orders-table tbody { display: flex; flex-direction: column; gap: 10px; }
  .orders-table tr {
    display: flex; flex-direction: column;
    background: #fff; border-radius: 12px;
    border: 1.5px solid #ffebee;
    padding: 14px 16px; gap: 8px;
  }
  .orders-table td {
    display: flex; justify-content: space-between;
    align-items: center; padding: 0;
    border-bottom: none; font-size: .82rem;
  }
  .orders-table td::before {
    content: attr(data-label);
    font-size: .7rem; font-weight: 700;
    color: #bbb; text-transform: uppercase;
    letter-spacing: .04em; flex-shrink: 0;
    margin-right: 8px;
  }
  .order-code { font-size: .875rem; }
  .text-end   { text-align: left !important; justify-content: space-between; }
  .text-center{ text-align: left !important; justify-content: space-between; }
  .table-action-btn { width: 30px; height: 30px; border-radius: 8px; font-size: .78rem; }

  .address-list { gap: 12px; }
  .address-card__body { padding: 14px 16px; }
  .address-name { font-size: .9rem; }
  .address-detail { font-size: .82rem; }
  .address-actions { flex-wrap: wrap; gap: 8px; }
  .addr-btn { padding: 6px 14px; font-size: .75rem; }

  .modal-overlay { padding: 0; align-items: flex-end; }
  .modal-box { border-radius: 20px 20px 0 0; max-height: 92vh; max-width: 100%; }
  .modal-box--address { max-width: 100%; }
  .modal-header-custom { padding: 18px 20px 14px; }
  .modal-title-custom  { font-size: 1rem; }
  .modal-body-custom   { padding: 16px 20px; }
  .modal-footer-custom { flex-direction: column; gap: 8px; padding: 14px 20px; }
  .modal-footer-custom > * { width: 100%; justify-content: center; }

  .default-toggle { padding: 12px 14px; gap: 12px; }
  .toggle-label { font-size: .82rem; }
  .toggle-desc  { font-size: .7rem; }
  .section-divider { margin: 24px 0 18px; }

  .toast-notification { bottom: 16px; right: 12px; left: 12px; font-size: .8rem; padding: 12px 16px; }
  .toast-slide-enter-from, .toast-slide-leave-to { transform: translateY(10px); }
}

@media (max-width: 575px) {
  .container-fluid { padding-left: 12px !important; padding-right: 12px !important; }
  .py-4 { padding-top: 14px !important; padding-bottom: 14px !important; }
  .breadcrumb { font-size: .72rem; }

  .avatar-frame { width: 70px; height: 70px; }
  .nav-item { padding: 8px 10px; }
  .nav-item__icon { width: 28px; height: 28px; font-size: .78rem; border-radius: 7px; }
  .nav-item__label{ font-size: .75rem; }

  .panel-card { padding: 13px 12px; border-radius: 10px; }
  .panel-header { padding-bottom: 12px; margin-bottom: 14px; }
  .panel-title  { font-size: .92rem; }
  .panel-header-icon { display: none; }

  .order-stats { gap: 8px; }
  .stat-pill   { padding: 10px; border-radius: 10px; }
  .stat-num    { font-size: 1.1rem; }
  .orders-table tr { padding: 12px 14px; gap: 6px; }
  .orders-table td { font-size: .78rem; }

  .address-card__body { padding: 12px 14px; }
  .address-header { gap: 10px; }
  .address-name   { font-size: .85rem; }

  .crop-modal { width: 100%; border-radius: 20px 20px 0 0; }
  .crop-canvas-wrap { height: 220px; }
  .crop-canvas { height: 220px; }
  .crop-header { padding: 16px 18px 12px; }
  .crop-body   { padding: 14px 18px 12px; }
  .crop-footer { padding: 12px 18px 16px; }
  .crop-btn-save, .crop-btn-cancel { padding: 10px 18px; font-size: .85rem; }

  .google-pwd-notice { flex-direction: column; gap: 8px; padding: 14px; }
}
</style>
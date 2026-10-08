<template>
  <div class="hw-wrap">
    <div class="hw-card">
      <div class="hw-header">
      <div class="hw-logo-bar">
  <p class="hw-company-text">CÔNG TY CỔ PHẦN SẢN XUẤT & THƯƠNG MẠI</p>
  <p class="hw-brand-text">HORECA VN</p>
</div>
        <div class="hw-icon-ring">
          <i class="bi bi-check-lg hw-check"></i>
        </div>
        <h2 class="hw-title">Đặt hàng thành công!</h2>
        <p class="hw-subtitle">Cảm ơn bạn đã tin tưởng</p>
      </div>

      <div class="hw-body">
        <p class="hw-message">
          Đơn hàng của bạn tại <strong>HORECA VN</strong> đã được ghi nhận và đang chờ xác nhận.
          Chúng tôi sẽ xử lý và giao hàng trong thời gian sớm nhất!
        </p>

        <div class="hw-tip">
          <i class="bi bi-gift-fill hw-tip-icon"></i>
          <div>
            <p class="hw-tip-title">Mẹo nhỏ dành cho bạn</p>
            <p class="hw-tip-text">Đánh giá sản phẩm sau khi nhận hàng để nhận thêm nhiều ưu đãi hấp dẫn từ HORECA VN!</p>
          </div>
        </div>

        <div class="hw-actions">
          <router-link to="/don-hang" class="hw-btn-outline">
            <i class="bi bi-receipt"></i> Xem đơn hàng
          </router-link>
          <router-link to="/" class="hw-btn-primary">
            <i class="bi bi-cart3"></i> Tiếp tục mua sắm
          </router-link>
        </div>

        <div class="hw-divider"></div>
        <p class="hw-footer">HORECA VN &mdash; Chất lượng tận tâm, phục vụ chuyên nghiệp</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Be+Vietnam+Pro:wght@400;500;600&display=swap');

.hw-wrap {
  font-family: 'Be Vietnam Pro', sans-serif;
  background: linear-gradient(155deg, #c0392b 0%, #922b21 40%, #1a0a09 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
}

.hw-wrap::before {
  content: '';
  position: absolute;
  top: -60px; right: -60px;
  width: 260px; height: 260px;
  border-radius: 50%;
  border: 40px solid rgba(255,255,255,0.04);
  pointer-events: none;
}

.hw-wrap::after {
  content: '';
  position: absolute;
  bottom: -80px; left: -40px;
  width: 320px; height: 320px;
  border-radius: 50%;
  border: 50px solid rgba(255,255,255,0.03);
  pointer-events: none;
}

.hw-card {
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  animation: slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hw-header {
  background: linear-gradient(135deg, #c0392b, #922b21);
  padding: 2rem 2rem 1.5rem;
  text-align: center;
}

.hw-logo-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin-bottom: 1.5rem;
}

.hw-company-text {
  font-size: 10px;
  font-weight: 600;
  color: rgba(255,255,255,0.7);
  letter-spacing: 0.08em;
  margin: 0;
  text-transform: uppercase;
}

.hw-brand-text {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin: 0;
 letter-spacing: 0.05em;
}

.hw-icon-ring {
  width: 80px; height: 80px;
  border-radius: 50%;
  background: rgba(255,255,255,0.12);
  border: 2px solid rgba(255,255,255,0.25);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem;
  animation: popIn 0.6s 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

@keyframes popIn {
  from { transform: scale(0.4); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.hw-check {
  font-size: 2.4rem;
  color: #fff;
}

.hw-title {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  color: #fff;
  margin: 0;
  font-weight: 700;
}

.hw-subtitle {
  font-size: 12px;
  color: rgba(255,255,255,0.7);
  margin: 4px 0 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.hw-body {
  padding: 1.75rem 2rem 2rem;
}

.hw-message {
  font-size: 14px;
  color: #555;
  line-height: 1.7;
  text-align: center;
  margin-bottom: 1.5rem;
}

.hw-message strong {
  color: #c0392b;
}

.hw-tip {
  border-left: 3px solid #c0392b;
  background: #fdf2f1;
  border-radius: 0 10px 10px 0;
  padding: 0.85rem 1rem;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 1.75rem;
}

.hw-tip-icon {
  font-size: 18px;
  color: #c0392b;
  flex-shrink: 0;
  margin-top: 1px;
}

.hw-tip-title {
  font-size: 13px;
  font-weight: 600;
  color: #922b21;
  margin: 0 0 2px;
}

.hw-tip-text {
  font-size: 12px;
  color: #777;
  margin: 0;
  line-height: 1.5;
}

.hw-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hw-btn-outline {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 11px 20px;
  border-radius: 10px;
  border: 1.5px solid #c0392b;
  background: transparent;
  color: #c0392b;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Be Vietnam Pro', sans-serif;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.hw-btn-outline:hover {
  background: #fdf2f1;
  color: #922b21;
}

.hw-btn-primary {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 11px 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, #c0392b, #922b21);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Be Vietnam Pro', sans-serif;
  text-decoration: none;
  transition: opacity 0.2s;
}

.hw-btn-primary:hover {
  opacity: 0.88;
  color: #fff;
}

.hw-divider {
  height: 1px;
  background: #f0e8e8;
  margin: 1.5rem 0 1rem;
}

.hw-footer {
  text-align: center;
  font-size: 11px;
  color: #bbb;
  font-weight: 500;
  letter-spacing: 0.05em;
  margin: 0;
}
</style>
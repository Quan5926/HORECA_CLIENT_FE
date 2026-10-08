<template>
  <Teleport to="body">
    <div v-if="show" class="cp-overlay" @click.self="$emit('close')">
      <div class="cp-popup">
        <button class="cp-close" @click="$emit('close')">
          <i class="bi bi-x-lg"></i>
        </button>

        <div class="cp-header">
          <div class="cp-icon"><i class="bi bi-headset"></i></div>
          <div>
            <div class="fw-bold">Liên hệ tư vấn</div>
            <div class="cp-sub">Chọn hình thức liên hệ</div>
          </div>
        </div>

        <a :href="'tel:' + phone" class="cp-btn cp-btn--call" @click="$emit('close')">
          <i class="bi bi-telephone-fill"></i>
          <div>
            <div class="fw-semibold">Gọi điện ngay</div>
            <div class="cp-btn-sub">{{ phone }}</div>
          </div>
          <i class="bi bi-chevron-right ms-auto"></i>
        </a>

        <a :href="'https://zalo.me/' + (zalo || phone)"
           target="_blank"
           class="cp-btn cp-btn--zalo"
           @click="$emit('close')">
          <i class="bi bi-chat-dots-fill"></i>
          <div>
            <div class="fw-semibold">Chat qua Zalo</div>
            <div class="cp-btn-sub">Phản hồi trong vài phút</div>
          </div>
          <i class="bi bi-chevron-right ms-auto"></i>
        </a>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({ show: Boolean, phone: String, zalo: String });
defineEmits(['close']);
</script>

<style scoped>
.cp-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
  animation: fadeIn .15s ease;
}
.cp-popup {
  background: #fff;
  border-radius: 18px;
  padding: 1.5rem;
  width: 100%; max-width: 360px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  display: flex; flex-direction: column; gap: 10px;
  position: relative;
  animation: slideUp .2s ease;
}
.cp-close {
  position: absolute; top: 14px; right: 14px;
  border: none; background: #f0f0f0;
  border-radius: 50%; width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #555; font-size: 14px;
}
.cp-close:hover { background: #e0e0e0; }
.cp-header {
  display: flex; align-items: center; gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}
.cp-icon {
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(135deg, #f2faeb, #d4edda);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.3rem; color: #5b8e1d; flex-shrink: 0;
}
.cp-sub { font-size: 12px; color: #999; }
.cp-btn {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px; border-radius: 12px;
  text-decoration: none; color: #fff;
  transition: transform .15s, box-shadow .15s;
}
.cp-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.2); color: #fff; }
.cp-btn i:first-child { font-size: 1.2rem; flex-shrink: 0; }
.cp-btn-sub { font-size: 11px; opacity: .85; }
.cp-btn--call { background: linear-gradient(135deg, #28a745, #20c997); }
.cp-btn--zalo { background: linear-gradient(135deg, #0068ff, #00a8ff); }

@keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
</style>
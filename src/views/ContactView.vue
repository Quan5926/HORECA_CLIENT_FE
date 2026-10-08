<template>
  <div class="contact-wrapper">
    <main>

      <!-- ── HERO ── -->
      <section class="hero">
        <div class="hero__noise"></div>
        <div class="hero__glow"></div>
        <div class="container-fluid px-lg-5 position-relative z-1">
          <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb mb-0 small">
              <li class="breadcrumb-item">
                <router-link to="/" class="bc-link">
                  <i class="bi bi-house-door-fill me-1"></i>Trang chủ
                </router-link>
              </li>
              <li class="breadcrumb-item active bc-active">Liên hệ</li>
            </ol>
          </nav>

          <div class="hero__inner">
            <div class="hero__tag">
              <span class="tag-dot"></span>
              Hỗ trợ 24/7
            </div>
            <h1 class="hero__title">Chúng tôi luôn<br><em>lắng nghe bạn</em></h1>
            <p class="hero__sub">
              Đội ngũ <strong>{{ companyInfo.name || 'One Horeca' }}</strong> phản hồi trong vòng <strong>15 phút</strong>
            </p>

            <!-- Quick contact chips -->
            <div class="hero__chips">
              <a :href="'tel:' + companyInfo.phone" class="chip chip--call">
                <i class="bi bi-telephone-fill"></i>
                <span>{{ companyInfo.phone }}</span>
              </a>
             <a :href="'https://mail.google.com/mail/?view=cm&to=' + companyInfo.email" 
   class="chip chip--mail" target="_blank" rel="noopener">
                <i class="bi bi-envelope-fill"></i>
                <span>{{ companyInfo.email }}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- ── STATS STRIP ── -->
      <div class="stats-strip container-fluid px-lg-5">
        <div class="stats-inner">
          <div class="stat-item">
            <span class="stat-num">15'</span>
            <span class="stat-lbl">Thời gian phản hồi</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat-item">
            <span class="stat-num">24/7</span>
            <span class="stat-lbl">Hỗ trợ liên tục</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat-item">
            <span class="stat-num">500+</span>
            <span class="stat-lbl">Khách hàng tin tưởng</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat-item">
            <span class="stat-num">10+</span>
            <span class="stat-lbl">Năm kinh nghiệm</span>
          </div>
        </div>
      </div>

      <!-- ── MAIN BODY ── -->
      <div class="container-fluid px-lg-5 py-5">
        <div class="body-grid">

          <!-- LEFT: Info column -->
          <aside class="info-col">

            <!-- Address cards -->
            <div class="info-block">
              <p class="block-heading">Địa chỉ</p>

              <div class="addr-card">
                <div class="addr-icon">
                  <i class="bi bi-building-fill"></i>
                </div>
                <div>
                  <p class="addr-label">Văn phòng</p>
                  <p class="addr-name">{{ companyInfo.name }}</p>
                  <p class="addr-text">{{ companyInfo.office }}</p>
                </div>
              </div>

              <div class="addr-card" v-if="companyInfo.factory">
                <div class="addr-icon addr-icon--green">
                  <i class="bi bi-boxes"></i>
                </div>
                <div>
                  <p class="addr-label">Kho hàng</p>
                  <p class="addr-text">{{ companyInfo.factory }}</p>
                </div>
              </div>
            </div>

            <!-- Contact details -->
            <div class="info-block">
              <p class="block-heading">Liên hệ trực tiếp</p>

              <a :href="'tel:' + companyInfo.phone" class="contact-row contact-row--phone" 
   target="_blank" rel="noopener">
                <div class="contact-icon">
                  <i class="bi bi-telephone-fill"></i>
                </div>
                <div>
                  <p class="contact-label">Hotline 24/7</p>
                  <p class="contact-val">{{ companyInfo.phone }}</p>
                </div>
                <i class="bi bi-arrow-right contact-arrow"></i>
              </a>

             <a :href="'https://mail.google.com/mail/?view=cm&to=' + companyInfo.email" 
   class="contact-row contact-row--email"
   target="_blank" rel="noopener">
                <div class="contact-icon">
                  <i class="bi bi-envelope-fill"></i>
                </div>
                <div>
                  <p class="contact-label">Email hỗ trợ</p>
                  <p class="contact-val">{{ companyInfo.email }}</p>
                </div>
                <i class="bi bi-arrow-right contact-arrow"></i>
              </a>
            </div>

            <!-- Map embed -->
            <div class="map-wrap">
              <iframe
                v-if="safeMapUrl"
                :src="safeMapUrl"
                class="map-frame"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
              <div v-else class="map-placeholder">
                <i class="bi bi-map-fill"></i>
                <span>Đang tải bản đồ...</span>
              </div>
            </div>

          </aside>

          <!-- RIGHT: Form -->
          <div class="form-col">
            <div class="form-card">
              <div class="form-card__head">
                <div class="form-card__badge">Tư vấn miễn phí</div>
                <h2 class="form-card__title">Gửi yêu cầu<br>của bạn</h2>
                <p class="form-card__sub">Điền thông tin bên dưới, chúng tôi sẽ liên hệ ngay</p>
              </div>

              <form @submit.prevent="handleSubmit" class="form-body">

                <div class="field-row">
                  <div class="field">
                    <label class="field-lbl">
                      <i class="bi bi-person"></i> Họ và tên <span class="req">*</span>
                    </label>
                    <input type="text" class="field-inp" v-model="formData.hoTen"
                           placeholder="Nguyễn Văn A" required>
                  </div>
                  <div class="field">
                    <label class="field-lbl">
                      <i class="bi bi-telephone"></i> Số điện thoại <span class="req">*</span>
                    </label>
                    <input type="tel" class="field-inp" v-model="formData.soDienThoai"
                           placeholder="0912 345 678"
                           pattern="(84|0[35789])[0-9]{8}"
                           title="Vui lòng nhập đúng số điện thoại" required>
                  </div>
                </div>

                <div class="field">
                  <label class="field-lbl">
                    <i class="bi bi-envelope"></i> Địa chỉ Email <span class="req">*</span>
                  </label>
                  <input type="email" class="field-inp" v-model="formData.email"
                         placeholder="email@example.com" required>
                </div>

                <div class="field">
                  <label class="field-lbl">
                    <i class="bi bi-tag"></i> Tiêu đề <span class="req">*</span>
                  </label>
                  <input type="text" class="field-inp" v-model="formData.tieuDe"
                         placeholder="Bạn cần hỗ trợ về..." required>
                </div>

                <div class="field">
                  <label class="field-lbl">
                    <i class="bi bi-chat-text"></i> Nội dung <span class="req">*</span>
                  </label>
                  <textarea class="field-inp field-ta" v-model="formData.noiDung"
                            placeholder="Mô tả chi tiết yêu cầu của bạn..." rows="5" required></textarea>
                </div>

                <!-- Success/Error message -->
                <transition name="msg-fade">
                  <div v-if="submitStatus === 'success'" class="submit-msg submit-msg--ok">
                    <i class="bi bi-check-circle-fill me-2"></i>
                    Gửi thành công! Chúng tôi sẽ liên hệ sớm nhất.
                  </div>
                  <div v-else-if="submitStatus === 'error'" class="submit-msg submit-msg--err">
                    <i class="bi bi-exclamation-circle-fill me-2"></i>
                    Có lỗi xảy ra. Vui lòng thử lại sau!
                  </div>
                </transition>

                <button type="submit" class="submit-btn" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="btn-spinner"></span>
                  <template v-else>
                    <span>Gửi yêu cầu ngay</span>
                    <i class="bi bi-send-fill"></i>
                  </template>
                  <span v-if="isSubmitting">Đang gửi...</span>
                </button>

                <p class="form-note">
                  <i class="bi bi-shield-check me-1"></i>
                  Thông tin của bạn được bảo mật tuyệt đối
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import contactService from '@/services/contactService';

const companyInfo = ref({
  name: 'CÔNG TY ONE HORECA',
  phone: '0786667447',
  email: 'ctyhorecaone@gmail.com',
  office: '47 Hàng Chiếu, P. Hoàn Kiếm, Hà Nội',
  factory: '',
  mapUrl: ''
});

const formData = ref({ hoTen: '', email: '', soDienThoai: '', tieuDe: '', noiDung: '' });
const isSubmitting = ref(false);
const submitStatus = ref(''); // 'success' | 'error' | ''

const defaultMapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.835154699564!2d105.84752691533232!3d21.039265885992924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abbe60656093%3A0x6b803628e937d5cb!2zNDcgUC4gSMOgbmcgQ2hp4bq_dSwgSDoYW5nIEJ14buNbSwgSG_DoG4gS2nhur9tLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1690000000000!5m2!1svi!2s';

const safeMapUrl = computed(() => {
  const url = companyInfo.value.mapUrl?.trim() || '';
  if (!url) return defaultMapUrl;
  const match = url.match(/src\s*=\s*["']([^"']+)["']/i);
  return match ? match[1] : url;
});

const fetchCompanyInfo = async () => {
  try {
    const response = await contactService.getCompanyInfo();
    if (response.data) {
      companyInfo.value = {
        ...companyInfo.value,
        ...response.data,
        // Ép giá trị mới nếu API chưa cập nhật
        email: response.data.email || 'support@horecavietnam.com',
        office: response.data.office || '495 Bạch Đằng, Hà Nội',
      };
    }
  } catch (e) {
    console.error('Lỗi tải thông tin công ty:', e);
  }
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  submitStatus.value = '';
  try {
    const response = await contactService.sendContact(formData.value);
    if (response.status === 200 || response.status === 201) {
      submitStatus.value = 'success';
      formData.value = { hoTen: '', email: '', soDienThoai: '', tieuDe: '', noiDung: '' };
      setTimeout(() => { submitStatus.value = ''; }, 5000);
    }
  } catch {
    submitStatus.value = 'error';
    setTimeout(() => { submitStatus.value = ''; }, 5000);
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(fetchCompanyInfo);
</script>

<style scoped>
/* =====================================================
   CONTACT PAGE — hex trực tiếp, không var() scoped
   Font: Segoe UI / system-ui
   ===================================================== */

.contact-wrapper {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: #fff;
  min-height: 100vh;
  color: #1a1a1a;
}

/* ── BREADCRUMB ── */
.bc-link {
  color: rgba(255,255,255,.65);
  text-decoration: none;
  transition: color .2s;
}
.bc-link:hover { color: #fff; }
.bc-active { color: #fff !important; font-weight: 600; }
.breadcrumb-item + .breadcrumb-item::before { color: rgba(255,255,255,.4); }

/* ── HERO ── */
.hero {
  background: linear-gradient(135deg, #C0392B 0%, #7B1D1D 100%);
  padding: 64px 0 80px;
  position: relative;
  overflow: hidden;
}
.hero__noise {
  position: absolute; inset: 0;
  background-image:
    radial-gradient(circle at 85% 15%, rgba(255,255,255,.07) 0%, transparent 55%),
    radial-gradient(circle at 15% 85%, rgba(0,0,0,.12) 0%, transparent 50%);
  pointer-events: none;
}
.hero__glow {
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,.05) 0%, transparent 70%);
  top: -150px; right: -100px;
  pointer-events: none;
}
.hero__inner {
  max-width: 620px;
}
.hero__tag {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,.12);
  border: 1px solid rgba(255,255,255,.2);
  color: #fff;
  font-size: .75rem; font-weight: 700; letter-spacing: .08em;
  padding: 6px 16px; border-radius: 50px;
  margin-bottom: 20px;
  text-transform: uppercase;
}
.tag-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(255,255,255,.3);
  animation: pulse-dot 2s ease infinite;
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 3px rgba(255,255,255,.3); }
  50% { box-shadow: 0 0 0 6px rgba(255,255,255,.1); }
}
.hero__title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 16px;
  letter-spacing: -.5px;
}
.hero__title em {
  font-style: normal;
  position: relative;
  display: inline-block;
}
.hero__title em::after {
  content: '';
  position: absolute;
  left: 0; bottom: -3px; right: 0;
  height: 3px;
  background: rgba(255,255,255,.5);
  border-radius: 2px;
}
.hero__sub {
  color: rgba(255,255,255,.8);
  font-size: 1rem;
  margin-bottom: 28px;
}
.hero__sub strong { color: #fff; }

/* quick chips */
.hero__chips { display: flex; gap: 12px; flex-wrap: wrap; }
.chip {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 20px; border-radius: 50px;
  font-size: .875rem; font-weight: 600;
  text-decoration: none;
  transition: all .2s;
  border: 1.5px solid rgba(255,255,255,.3);
}
.chip--call {
  background: rgba(255,255,255,.15);
  color: #fff;
}
.chip--call:hover {
  background: #fff;
  color: #C0392B;
  border-color: #fff;
}
.chip--mail {
  background: transparent;
  color: rgba(255,255,255,.9);
}
.chip--mail:hover {
  background: rgba(255,255,255,.1);
  color: #fff;
}

/* ── STATS STRIP ── */
.stats-strip {
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.stats-inner {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 20px 0;
  overflow-x: auto;
}
.stats-inner::-webkit-scrollbar { height: 0; }
.stat-item {
  flex: 1;
  min-width: 120px;
  text-align: center;
  padding: 4px 20px;
}
.stat-num {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  color: #C0392B;
  line-height: 1.2;
}
.stat-lbl {
  display: block;
  font-size: .72rem;
  color: #999;
  font-weight: 500;
  margin-top: 3px;
  white-space: nowrap;
}
.stat-sep {
  width: 1px;
  height: 36px;
  background: #f0f0f0;
  flex-shrink: 0;
}

/* ── BODY GRID ── */
.body-grid {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 40px;
  align-items: start;
}
@media (max-width: 1100px) {
  .body-grid { grid-template-columns: 360px 1fr; gap: 28px; }
}
@media (max-width: 900px) {
  .body-grid { grid-template-columns: 1fr; }
}

/* ── INFO COLUMN ── */
.info-col { display: flex; flex-direction: column; gap: 20px; }

.info-block {
  background: #fff;
  border: 1.5px solid #f0efed;
  border-radius: 16px;
  padding: 22px 22px 18px;
}
.block-heading {
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #bbb;
  margin-bottom: 16px;
}

/* address cards inside block */
.addr-card {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px 0;
  border-bottom: 1px solid #f5f5f5;
}
.addr-card:last-child { border-bottom: none; padding-bottom: 0; }
.addr-icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: rgba(192,57,43,.08); color: #C0392B;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem; flex-shrink: 0;
}
.addr-icon--green { background: rgba(126,179,61,.1); color: #7eb33d; }
.addr-label { font-size: .72rem; color: #bbb; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; margin: 0 0 2px; }
.addr-name  { font-size: .85rem; font-weight: 700; color: #1a1a1a; margin: 0 0 2px; }
.addr-text  { font-size: .82rem; color: #666; margin: 0; line-height: 1.5; }

/* contact rows */
.contact-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 12px;
  border-radius: 12px;
  text-decoration: none;
  transition: all .2s;
  margin-bottom: 4px;
  border: 1.5px solid transparent;
  cursor: pointer;       /* thêm */
  position: relative;    /* thêm */
  z-index: 1;            /* thêm */
}
.contact-row:hover {
  background: #fff5f5;
  border-color: #ffcdd2;
}
.contact-row:last-child { margin-bottom: 0; }
.contact-icon {
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem; flex-shrink: 0;
}
.contact-row--phone .contact-icon { background: rgba(192,57,43,.08); color: #C0392B; }
.contact-row--email .contact-icon { background: rgba(59,130,246,.08); color: #3b82f6; }
.contact-label { font-size: .72rem; color: #bbb; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; margin: 0; }
.contact-val { font-size: .9rem; font-weight: 700; color: #1a1a1a; margin: 2px 0 0; }
.contact-row--phone .contact-val { color: #C0392B; }
.contact-arrow { margin-left: auto; color: #ddd; font-size: .8rem; transition: transform .2s; }
.contact-row:hover .contact-arrow { transform: translateX(3px); color: #C0392B; }

/* map */
.map-wrap {
  border-radius: 16px;
  overflow: hidden;
  border: 1.5px solid #f0efed;
  height: 260px;
}
.map-frame { width: 100%; height: 100%; border: 0; display: block; }
.map-placeholder {
  width: 100%; height: 100%;
  background: #f8f8f8;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 8px; color: #ccc; font-size: .875rem;
}
.map-placeholder i { font-size: 2.5rem; }

/* ── FORM CARD ── */
.form-card {
  background: #fff;
  border: 1.5px solid #f0efed;
  border-radius: 20px;
  overflow: hidden;
  position: sticky;
  top: 24px;
}
.form-card__head {
  background: linear-gradient(135deg, #C0392B, #7B1D1D);
  padding: 32px 36px 28px;
  position: relative;
  overflow: hidden;
}
.form-card__head::after {
  content: '';
  position: absolute;
  width: 300px; height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,.06) 0%, transparent 70%);
  top: -120px; right: -80px;
  pointer-events: none;
}
.form-card__badge {
  display: inline-block;
  background: rgba(255,255,255,.15);
  border: 1px solid rgba(255,255,255,.25);
  color: #fff;
  font-size: .7rem; font-weight: 700; letter-spacing: .1em;
  padding: 5px 14px; border-radius: 50px;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.form-card__title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 8px;
  letter-spacing: -.3px;
}
.form-card__sub {
  color: rgba(255,255,255,.7);
  font-size: .875rem;
  margin: 0;
}

.form-body { padding: 28px 36px 32px; }

/* field layout */
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 640px) { .field-row { grid-template-columns: 1fr; } }

.field { margin-bottom: 16px; }
.field-row .field { margin-bottom: 0; }

.field-lbl {
  display: flex; align-items: center; gap: 6px;
  font-size: .78rem; font-weight: 600; color: #555;
  margin-bottom: 7px;
}
.field-lbl i { color: #C0392B; font-size: .85rem; }
.req { color: #dc2626; }

.field-inp {
  width: 100%;
  border: 1.5px solid #e8e8e8;
  border-radius: 10px;
  padding: 11px 14px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  font-size: .9rem;
  color: #1a1a1a;
  background: #fafafa;
  outline: none;
  transition: border-color .2s, background .2s, box-shadow .2s;
  display: block;
}
.field-inp:focus {
  border-color: #C0392B;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(192,57,43,.08);
}
.field-inp::placeholder { color: #bbb; }
.field-ta { resize: vertical; min-height: 120px; }

/* submit button */
.submit-btn {
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  padding: 14px 24px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #C0392B, #E74C3C);
  color: #fff;
  font-family: 'Segoe UI', system-ui, sans-serif;
  font-size: .95rem; font-weight: 700;
  cursor: pointer;
  transition: all .25s;
  box-shadow: 0 4px 18px rgba(192,57,43,.3);
  margin-top: 20px;
}
.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #A93226, #C0392B);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(192,57,43,.4);
}
.submit-btn:disabled { opacity: .65; cursor: not-allowed; transform: none; }

.btn-spinner {
  display: inline-block; width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,.4); border-top-color: #fff;
  border-radius: 50%; animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.form-note {
  text-align: center;
  font-size: .75rem;
  color: #bbb;
  margin: 12px 0 0;
}
.form-note i { color: #7eb33d; }

/* submit messages */
.submit-msg {
  padding: 12px 16px;
  border-radius: 10px;
  font-size: .85rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin-top: 16px;
}
.submit-msg--ok  { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
.submit-msg--err { background: #fef2f2; color: #dc2626; border: 1px solid #fca5a5; }

.msg-fade-enter-active, .msg-fade-leave-active { transition: all .3s ease; }
.msg-fade-enter-from, .msg-fade-leave-to { opacity: 0; transform: translateY(-6px); }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .hero { padding: 44px 0 60px; }
  .form-card__head { padding: 24px 20px 20px; }
  .form-body { padding: 20px 20px 24px; }
  .form-card__title { font-size: 1.4rem; }
  .stats-inner { gap: 0; }
  .stat-item { min-width: 90px; padding: 4px 12px; }
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  /* Hero */
  .hero { padding: 36px 0 50px; }
  .hero__title { font-size: 1.75rem; }
  .hero__sub { font-size: .9rem; margin-bottom: 20px; }
  .hero__tag { font-size: .68rem; padding: 5px 13px; margin-bottom: 14px; }

  /* Chips */
  .chip { padding: 9px 16px; font-size: .82rem; }

  /* Stats */
  .stats-inner { padding: 14px 0; }
  .stat-item { min-width: 90px; padding: 4px 12px; }
  .stat-num { font-size: 1.25rem; }
  .stat-lbl { font-size: .65rem; }

  /* Body */
  .body-grid { gap: 20px; }

  /* Form card */
  .form-card__head { padding: 24px 20px 20px; }
  .form-card__title { font-size: 1.35rem; }
  .form-card__sub { font-size: .82rem; }
  .form-body { padding: 20px 20px 24px; }

  /* Map */
  .map-wrap { height: 220px; }
}

@media (max-width: 575px) {
  /* Hero */
  .hero { padding: 28px 0 40px; }
  .hero__title { font-size: 1.45rem; letter-spacing: -.3px; }
  .hero__sub { font-size: .85rem; margin-bottom: 16px; }
  .hero__tag { font-size: .62rem; padding: 5px 12px; margin-bottom: 12px; }

  /* Chips — stack dọc */
  .hero__chips { flex-direction: column; gap: 8px; }
  .chip { width: 100%; justify-content: center; padding: 11px 16px; }

  /* Stats strip — scroll ngang */
  /* Stats strip — grid 2x2 thay vì scroll ngang */
  .stats-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0;
    gap: 0;
  }
  .stat-sep { display: none; }
  .stat-item {
    min-width: unset;
    padding: 12px 8px;
    border-bottom: 1px solid #f0f0f0;
  }
  .stat-item:nth-child(odd) { border-right: 1px solid #f0f0f0; }
  .stat-num { font-size: 1.2rem; }
  .stat-lbl {
    font-size: .62rem;
    white-space: normal;
    line-height: 1.3;
  }

  /* Info blocks */
  .info-block { padding: 16px 16px 14px; border-radius: 12px; }
  .addr-card { gap: 10px; padding: 12px 0; }
  .addr-icon { width: 36px; height: 36px; border-radius: 8px; font-size: .9rem; }
  .addr-name { font-size: .82rem; }
  .addr-text { font-size: .78rem; }

  /* Contact rows */
  .contact-row { padding: 12px 10px; border-radius: 10px; gap: 12px; }
  .contact-icon { width: 36px; height: 36px; border-radius: 8px; font-size: .9rem; }
  .contact-val { font-size: .85rem; }

  /* Map */
  .map-wrap { height: 200px; border-radius: 12px; }

  /* Form card */
  .form-card { border-radius: 16px; }
  .form-card__head { padding: 20px 16px 18px; }
  .form-card__badge { font-size: .62rem; padding: 4px 12px; }
  .form-card__title { font-size: 1.2rem; }
  .form-card__sub { font-size: .78rem; }
  .form-body { padding: 16px 16px 20px; }

  /* Fields */
  .field { margin-bottom: 12px; }
  .field-lbl { font-size: .73rem; margin-bottom: 5px; }
  .field-inp { padding: 10px 12px; font-size: .85rem; border-radius: 8px; }
  .field-ta { min-height: 100px; }

  /* Submit */
  .submit-btn { padding: 13px 20px; font-size: .88rem; margin-top: 16px; border-radius: 10px; }
  .form-note { font-size: .7rem; }

  /* Breadcrumb */
  .breadcrumb { font-size: .75rem; }
  .hero nav.mb-4 { margin-bottom: 10px !important; }
}
</style>
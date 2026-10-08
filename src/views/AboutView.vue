<template>
  <div class="about-page-wrapper font-general bg-white">
    <main class="main-content">

      <!-- ====== BANNER ====== -->
      <section v-if="aboutBanner" class="about-banner-wrapper">
        <a :href="aboutBanner.lienKet || '#'">
          <img :src="aboutBanner.duongDanAnh" class="w-100 object-fit-cover d-block"
               style="height: 380px;" :alt="aboutBanner.tieuDe || 'Banner Giới thiệu One Horeca'">
        </a>
      </section>

      <!-- Hero khi không có banner -->
      <section v-else class="about-hero position-relative overflow-hidden">
        <div class="container py-5 position-relative z-1">
          <div class="row align-items-center py-5">
            <div class="col-lg-7">
              <div class="hero-eyebrow mb-4">
                <span class="hero-eyebrow-dot"></span>
                VỀ HORECA VIỆT NAM
              </div>
              <h1 class="hero-title mb-4">
                Kiến tạo<br>
                <span class="hero-title-stroke">Không Gian</span><br>
                Ẩm Thực Việt
              </h1>
              <p class="hero-sub mb-5">
                Giải pháp toàn diện cho ngành <strong>Hotel · Restaurant · Café</strong> —
                Đối tác tin cậy của hàng trăm cơ sở kinh doanh trên toàn quốc từ năm 2015.
              </p>
              <div class="d-flex flex-wrap gap-3">
                <router-link to="/lien-he" class="btn-hero-solid">
                  <i class="bi bi-telephone-fill me-2"></i>Liên hệ tư vấn
                </router-link>
                <router-link to="/" class="btn-hero-ghost">Xem sản phẩm</router-link>
              </div>
            </div>
            <div class="col-lg-5 d-none d-lg-flex justify-content-end">
              <div class="hero-stat-panel">
                <div class="hero-stat-item" v-for="(s, i) in heroStats" :key="i">
                  <span class="hs-val">{{ s.val }}</span>
                  <span class="hs-label">{{ s.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,80L1440,0L1440,80L0,80Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      <!-- Breadcrumb -->
      <div class="container-fluid px-lg-5">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 py-3 small bg-transparent">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-decoration-none text-muted">Trang chủ</router-link>
            </li>
            <li class="breadcrumb-item active fw-bold" style="color:#C0392B;" aria-current="page">Về Horeca Việt Nam</li>
          </ol>
        </nav>
      </div>

      <!-- ====== GIỚI THIỆU CÔNG TY ====== -->
      <section class="section-pad bg-white">
        <div class="container">
          <div class="row align-items-center gx-lg-5 mb-5">
            <div class="col-lg-6 mb-4 mb-lg-0">
              <div class="about-img-box rounded-4 overflow-hidden shadow">
                <img src="@/assets/images/bannergioithieu.jpg" alt="Horeca Việt Nam"
                     class="img-fluid w-100 hover-zoom" />
              </div>
            </div>
            <div class="col-lg-6">
              <span class="chip mb-3">GIỚI THIỆU</span>
              <h2 class="section-title mb-2">
                Công ty Cổ phần SX &amp; TM<br>
                <em class="text-red">Horeca Việt Nam</em>
              </h2>
              <div class="gold-bar mb-4"></div>
              <p class="text-secondary lh-lg mb-4">
                Thành lập với sứ mệnh nâng tầm ngành dịch vụ Việt Nam,
                <strong>Horeca Việt Nam</strong> là đối tác tin cậy chuyên cung cấp sản phẩm
                và dịch vụ trọn gói cho hệ thống <strong>Hotel – Restaurant – Cafe/Bar</strong> trên toàn quốc.
              </p>
              <div class="tagline-box p-3 rounded-3 mb-4">
                <i class="bi bi-quote text-red fs-4 me-2"></i>
                <span class="fst-italic text-secondary small">
                  Kiến tạo không gian — Nâng tầm trải nghiệm ẩm thực Việt Nam.
                </span>
              </div>
              <div class="intro-stats">
                <div class="intro-stat" v-for="(s, i) in heroStats" :key="i">
                  <span class="intro-stat-val">{{ s.val }}</span>
                  <span class="intro-stat-label">{{ s.label }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 5 lĩnh vực -->
          <div class="text-center mb-4">
            <span class="chip mb-2">LĨNH VỰC HOẠT ĐỘNG CHÍNH</span>
          </div>
          <div class="lv-grid">
            <div class="lv-card" v-for="(lv, i) in linhVucList" :key="i">
              <div class="lv-num">{{ i + 1 }}</div>
              <h6 class="lv-title">{{ lv.title }}</h6>
              <p class="lv-desc">{{ lv.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== TẠI SAO CHỌN – nền đỏ ====== -->
      <section class="section-pad section-red">
        <div class="container">
          <div class="text-center mb-5">
            <span class="chip-white mb-3">TẠI SAO CHỌN HORECA VIỆT NAM?</span>
            <h2 class="section-title text-white">
              Đối tác <span style="color:#f9d89c;">tin cậy</span> hàng đầu ngành F&amp;B
            </h2>
          </div>
          <div class="why-grid">
            <div class="why-card" v-for="(w, i) in whyChoose" :key="i">
              <div class="why-icon"><i :class="['bi', w.icon]"></i></div>
              <h6 class="why-title">{{ w.title }}</h6>
              <p class="why-desc">{{ w.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== HORECA LÀ GÌ – GIỮ NGUYÊN NHƯ GỐC ====== -->
      <section class="section-pad" style="background:#fdf5f5;">
        <div class="container">
          <div class="text-center mb-5">
            <span class="chip mb-3">HORECA LÀ GÌ?</span>
            <h2 class="section-title">
              Ngành <em class="text-red fst-italic">HORECA</em> – Trái tim<br>
              của ngành dịch vụ ẩm thực
            </h2>
            <p class="text-secondary mx-auto mt-3" style="max-width:640px; line-height:1.8;">
              <strong>HORECA</strong> là thuật ngữ quốc tế chỉ tổ hợp ngành dịch vụ ẩm thực &amp; lưu trú gồm
              <strong>Ho</strong>tel – <strong>Re</strong>staurant – <strong>Ca</strong>fé.
              Tại Việt Nam, đây là một trong những ngành tăng trưởng nhanh nhất,
              với hàng chục nghìn cơ sở kinh doanh mới mỗi năm —
              tạo ra nhu cầu khổng lồ về thiết bị bàn ăn chuyên nghiệp.
            </p>
          </div>
          <div class="horeca-grid">
            <div v-for="(item, i) in horecaItems" :key="i" class="horeca-card">
              <div class="horeca-letter">{{ item.letter }}</div>
              <div class="horeca-word">{{ item.word }}</div>
              <p class="horeca-desc text-secondary small">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== GIÁM ĐỐC CÔNG TY ====== -->
      <section class="section-pad bg-white">
        <div class="container">
          <div class="text-center mb-5">
            <span class="chip mb-3">BAN LÃNH ĐẠO</span>
            <h2 class="section-title">Người dẫn dắt <span class="text-red">Horeca Việt Nam</span></h2>
            <div class="gold-bar mx-auto mt-3"></div>
          </div>
          <div class="director-wrap mx-auto">
            <div class="director-img-col">
              <div class="director-img-frame">
                <img src="@/assets/images/giamdoc.jpg"
                     alt="Giám đốc Nguyễn Thành Trung" class="director-photo">
                <div class="director-badge">
                  <i class="bi bi-patch-check-fill"></i>
                </div>
                <div class="director-name-plate">
                  <span class="dnp-role">Giám đốc</span>
                  <span class="dnp-name">Nguyễn Thành Trung</span>
                </div>
              </div>
            </div>
            <div class="director-body">
              <span class="chip mb-3">GIÁM ĐỐC CÔNG TY</span>
              <h2 class="director-heading">Nguyễn Thành Trung</h2>
              <div class="gold-bar mb-4"></div>
              <p class="director-bio">
                Với hơn <strong>10 năm kinh nghiệm</strong> trong ngành F&amp;B và Hospitality,
                ông Nguyễn Thành Trung đã xây dựng Horeca Việt Nam từ một doanh nghiệp nhỏ
                trở thành đối tác tin cậy của hàng trăm nhà hàng, khách sạn trên toàn quốc.
              </p>
              <p class="director-bio mb-4">
                Với tầm nhìn chiến lược <em>"Một điểm đến – Mọi giải pháp Horeca"</em>,
                ông Trung không ngừng mở rộng hệ sinh thái sản phẩm, đưa chuẩn chất lượng
                quốc tế vào từng không gian ẩm thực Việt.
              </p>
              <div class="director-stats mb-4">
                <div class="director-stat" v-for="(s, i) in directorStats" :key="i">
                  <span class="ds-val">{{ s.val }}</span>
                  <span class="ds-label">{{ s.label }}</span>
                </div>
              </div>
              <blockquote class="director-quote">
                <i class="bi bi-quote text-red fs-3 me-1 align-top"></i>
                Chúng tôi không chỉ bán sản phẩm — chúng tôi kiến tạo trải nghiệm
                ẩm thực đáng nhớ cho mỗi thực khách Việt Nam.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== GIÁ TRỊ CỐT LÕI ====== -->
      <section class="section-pad" style="background:#fdf5f5;">
        <div class="container">
          <div class="text-center mb-5">
            <span class="chip mb-3">GIÁ TRỊ CỐT LÕI</span>
            <h2 class="section-title">Điều làm nên thương hiệu <span class="text-red">Horeca Việt Nam</span></h2>
          </div>
          <div class="row g-4">
            <div class="col-md-3" v-for="(v, i) in coreValues" :key="i">
              <div class="value-card text-center p-4 rounded-4 h-100 bg-white">
                <div class="value-icon mx-auto mb-3">
                  <i :class="['bi', v.icon, 'fs-2']" style="color:#C0392B;"></i>
                </div>
                <h5 class="fw-bold text-dark mb-2" style="font-size:15px;">{{ v.title }}</h5>
                <p class="text-secondary small mb-0">{{ v.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== SẢN PHẨM TIÊU BIỂU ====== -->
      <section class="section-pad bg-white">
        <div class="container">
          <div class="text-center mb-5">
            <span class="chip mb-3">SẢN PHẨM TIÊU BIỂU</span>
            <h2 class="section-title">Từ bàn ăn <span class="text-red">5 sao</span> đến chuỗi cà phê</h2>
          </div>
          <div class="row g-4 mb-4">
            <div class="col-md-4">
              <div class="product-card rounded-4 overflow-hidden shadow-sm">
                <img src="@/assets/images/duan1.jpg" class="w-100" style="height:240px;object-fit:cover;" alt="Bát sứ nhà hàng">
                <div class="p-4 bg-white">
                  <p class="product-cat mb-1">Nhà hàng · Fine Dining</p>
                  <h6 class="fw-bold text-dark mb-2">Bát Sứ Cao Cấp</h6>
                  <p class="small text-secondary mb-0">Dòng sứ trắng xương tinh khiết, viền vàng 24K hoặc decor theo yêu cầu. Chuẩn bàn ăn 5 sao, buffet cao cấp.</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="product-card rounded-4 overflow-hidden shadow-sm">
                <img src="@/assets/images/duan2.jpg" class="w-100" style="height:240px;object-fit:cover;" alt="Cốc cà phê">
                <div class="p-4 bg-white">
                  <p class="product-cat mb-1">Cà phê · Specialty</p>
                  <h6 class="fw-bold text-dark mb-2">Cốc Sứ Barista</h6>
                  <p class="small text-secondary mb-0">Espresso 60ml, Cappuccino 150ml, Latte 350ml – đủ kích cỡ cho chuỗi cà phê chuyên nghiệp. Hỗ trợ in logo.</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="product-card rounded-4 overflow-hidden shadow-sm">
                <img src="@/assets/images/vuonra1.jpg" class="w-100" style="height:240px;object-fit:cover;" alt="Bộ sưu tập khách sạn">
                <div class="p-4 bg-white">
                  <p class="product-cat mb-1">Khách sạn · OEM</p>
                  <h6 class="fw-bold text-dark mb-2">Bộ Sưu Tập Hotel</h6>
                  <p class="small text-secondary mb-0">Thiết kế đặc chế, in logo thương hiệu. Phù hợp tiêu chuẩn sao cho mọi khách sạn từ 3 đến 5 sao.</p>
                </div>
              </div>
            </div>
          </div>
          <p class="text-secondary fst-italic text-center px-lg-5">
            Horeca Việt Nam tự hào là đối tác cung cấp sản phẩm và giải pháp F&amp;B cho hàng trăm
            nhà hàng, khách sạn và chuỗi kinh doanh lớn trên toàn quốc.
          </p>
        </div>
      </section>

      <!-- ====== ĐỐI TÁC TIÊU BIỂU ====== -->
      <section class="section-pad" style="background:#0f0a09;">
        <div class="container">
          <div class="text-center mb-5">
            <span class="chip-white mb-3">ĐỐI TÁC TIÊU BIỂU</span>
            <h2 class="section-title text-white">
              Đối tác tin tưởng <span class="text-white fw-bold">chúng tôi</span>
            </h2>
            <p class="mt-2" style="color:rgba(255,255,255,.5);">
              Hơn 500 cơ sở kinh doanh F&amp;B trên toàn quốc đang sử dụng sản phẩm &amp; dịch vụ Horeca Việt Nam
            </p>
          </div>
          <div class="row g-4">
            <div class="col-md-4" v-for="(item, i) in clientSegments" :key="i">
              <div class="client-card p-4 rounded-4">
                <p class="client-tag mb-2">{{ item.tag }}</p>
                <h6 class="text-white fw-bold mb-2">{{ item.name }}</h6>
                <p class="small mb-0" style="color:rgba(255,255,255,.5);">{{ item.detail }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== CTA ====== -->
      <section class="cta-section position-relative overflow-hidden">
        <div class="cta-pattern"></div>
        <div class="container py-5 text-center position-relative z-1">
          <span class="chip-white mb-3">KẾT NỐI VỚI CHÚNG TÔI</span>
          <h2 class="display-6 fw-bold text-white mb-3">Bạn cần tư vấn sản phẩm?</h2>
          <p class="text-white mb-4 fs-5" style="opacity:.85;">
            Đội ngũ chuyên gia Horeca Việt Nam sẵn sàng hỗ trợ bạn chọn lựa giải pháp phù hợp nhất
          </p>
          <router-link to="/lien-he" class="btn btn-white-outline px-5 py-3 fw-bold rounded-pill me-2">
            <i class="bi bi-telephone-fill me-2"></i>Liên hệ ngay
          </router-link>
          <router-link to="/" class="btn btn-white-solid px-5 py-3 fw-bold rounded-pill">
            Xem sản phẩm <i class="bi bi-arrow-right ms-2"></i>
          </router-link>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const aboutBanner = ref(null);

const heroStats = [
  { val: '2015', label: 'Năm thành lập' },
  { val: '500+', label: 'Đối tác tin tưởng' },
  { val: '63',   label: 'Tỉnh thành' },
  { val: '5',    label: 'Lĩnh vực hoạt động' },
];

const linhVucList = [
  {
    title: 'Bát đĩa cao cấp cho Nhà hàng – Khách sạn',
    desc: 'Đối tác chính thức của Tập Đoàn Long Phương (NSX Sứ Gia Dụng hàng đầu Việt Nam). Phân phối sứ, thủy tinh, melamine đạt chuẩn 3–5 sao. Nhận đặt theo logo riêng.',
  },
  {
    title: 'Dụng cụ & Thiết bị Horeca',
    desc: 'Máy móc bếp công nghiệp, thiết bị bar/cafe, dụng cụ bếp, đồ dùng buồng phòng khách sạn. 100% hàng chính hãng, bảo hành toàn quốc.',
  },
  {
    title: 'Thực phẩm & Gia vị',
    desc: 'Thực phẩm tươi, đông lạnh, gia vị nhập khẩu và nội địa chất lượng cao. Đạt chuẩn VSATTP, giao hàng nhanh và ổn định.',
  },
  {
    title: 'Dịch vụ Setup & Vận hành',
    desc: 'Tư vấn concept, thiết kế không gian, setup bếp, lên menu, đào tạo nhân sự F&B. Đồng hành từ ý tưởng đến khai trương và vận hành.',
  },
  {
    title: 'Hóa Mỹ Phẩm chuyên dụng',
    desc: 'Sản xuất hóa mỹ phẩm chuyên dụng dành riêng cho Nhà hàng & Khách sạn, đảm bảo an toàn và hiệu quả cao trong môi trường chuyên nghiệp.',
  },
];

const whyChoose = [
  { icon: 'bi-award-fill',       title: 'Nhà sản xuất & đối tác hàng đầu', desc: 'Dịch vụ chuyên nghiệp bởi những NSX và NCC hàng đầu Việt Nam và Quốc tế.' },
  { icon: 'bi-bullseye',         title: 'Một điểm đến',                    desc: 'Cung cấp và vận hành chuyên nghiệp — mọi nhu cầu Horeca trong một mối.' },
  { icon: 'bi-person-workspace', title: 'Am hiểu ngành',                   desc: 'Đội ngũ 10+ năm kinh nghiệm thực chiến trong ngành F&B & Hospitality.' },
  { icon: 'bi-headset',          title: 'Hậu mãi tận tâm',                 desc: 'Bảo hành, bảo trì nhanh chóng, hỗ trợ khách hàng 24/7 mọi lúc mọi nơi.' },
  { icon: 'bi-shield-check',     title: 'Chất lượng đảm bảo',              desc: 'Kiểm định nghiêm ngặt từng lô hàng, cam kết đổi trả minh bạch, rõ ràng.' },
  { icon: 'bi-graph-up-arrow',   title: 'Tăng trưởng cùng bạn',           desc: 'Giải pháp linh hoạt theo quy mô từ startup F&B đến chuỗi 100+ chi nhánh.' },
];

const horecaItems = [
  {
    letter: 'H',
    word: 'Hotel · Khách sạn',
    desc: 'Từ resort 5 sao đến boutique hotel, mỗi bữa sáng buffet đều cần hàng nghìn chiếc bát cốc chuẩn chất lượng quốc tế. One Horeca cung cấp bộ sưu tập khách sạn in logo riêng, phù hợp tiêu chuẩn AAA/Forbes.',
  },
  {
    letter: 'R',
    word: 'Restaurant · Nhà hàng',
    desc: 'Fine dining, nhà hàng Việt Nam, nhà hàng fusion hay buffet – mỗi phong cách ẩm thực cần dòng sứ khác nhau. Chúng tôi tư vấn lựa chọn bộ sưu tập phù hợp với concept của từng nhà hàng.',
  },
  {
    letter: 'Ca',
    word: 'Café · Cà phê',
    desc: 'Từ cốc espresso 60ml đến ly latte 350ml, chuỗi cà phê cần số lượng lớn, giá tốt và chất lượng đồng nhất. One Horeca là đối tác OEM cho nhiều thương hiệu cà phê tên tuổi tại Việt Nam.',
  },
];

const coreValues = [
  { icon: 'bi-gem',          title: 'Chất lượng', desc: 'Sản phẩm đạt chuẩn quốc tế, kiểm định nghiêm ngặt, an toàn tuyệt đối cho thực phẩm và người dùng cuối.' },
  { icon: 'bi-palette-fill', title: 'Thẩm mỹ',    desc: 'Thiết kế tinh tế, đa dạng bộ sưu tập, nâng tầm trải nghiệm ẩm thực và không gian F&B.' },
  { icon: 'bi-truck',        title: 'Uy tín',      desc: 'Cam kết giao hàng đúng hẹn, bảo hành chính hãng và chính sách đổi trả minh bạch, rõ ràng.' },
  { icon: 'bi-people-fill',  title: 'Tận tâm',     desc: 'Tư vấn chuyên sâu miễn phí, đồng hành từ thiết kế đến vận hành cho mọi quy mô F&B & Hospitality.' },
];

const directorStats = [
  { val: '10+',  label: 'Năm kinh nghiệm' },
  { val: '500+', label: 'Đối tác đồng hành' },
  { val: '63',   label: 'Tỉnh thành phủ sóng' },
];

const clientSegments = [
  {
    tag: 'Khách sạn 3–5 sao',
    name: 'Chuỗi resort & khách sạn quốc tế',
    detail: 'Marriott, InterContinental, Mövenpick và các thương hiệu quốc tế có mặt tại Việt Nam tin chọn sản phẩm Horeca.',
  },
  {
    tag: 'Chuỗi F&B',
    name: 'Thương hiệu cà phê & nhà hàng',
    detail: 'Các chuỗi cà phê và nhà hàng có từ 10+ chi nhánh toàn quốc – số lượng lớn, giá ổn định, chất lượng đồng nhất.',
  },
  {
    tag: 'Fine Dining',
    name: 'Nhà hàng phong cách Âu – Á',
    detail: 'Được tin chọn bởi hàng trăm nhà hàng fine dining và fusion tại Hà Nội, TP.HCM và các đô thị lớn.',
  },
];
</script>

<style scoped>
/* ===== BRAND ===== */
.text-red { color: #C0392B !important; }

/* ===== LAYOUT ===== */
.section-pad { padding: 72px 0; }
.section-title {
  font-size: clamp(1.6rem, 3vw, 2rem);
  font-weight: 700; color: #1a1a1a; line-height: 1.25;
}

/* ===== CHIPS ===== */
.chip {
  display: inline-block;
  background: rgba(192,57,43,.10); color: #C0392B;
  font-size: 0.68rem; font-weight: 700; letter-spacing: .13em;
  padding: 5px 16px; border-radius: 20px;
}
.chip-white {
  display: inline-block;
  background: rgba(255,255,255,.15); color: #fff;
  font-size: 0.68rem; font-weight: 700; letter-spacing: .13em;
  padding: 5px 16px; border-radius: 20px;
  border: 1px solid rgba(255,255,255,.3);
}

/* ===== GOLD BAR ===== */
.gold-bar {
  width: 36px; height: 2px;
  background: #C49A3C; border-radius: 2px; opacity: .65;
}

/* ===== HERO ===== */
.about-hero {
  background: linear-gradient(140deg, #140604 0%, #2a0d09 45%, #8b2319 80%, #C0392B 100%);
  padding: 80px 0 110px;
}
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 0.67rem; letter-spacing: .22em; color: #C49A3C;
  font-weight: 700; text-transform: uppercase;
}
.hero-eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #C49A3C; flex-shrink: 0;
}
.hero-title {
  font-size: clamp(2.8rem, 6.5vw, 4.8rem);
  font-weight: 900; color: #fff; line-height: 1; letter-spacing: -.02em;
}
.hero-title-stroke {
  -webkit-text-stroke: 2px #C49A3C;
  color: transparent;
}
.hero-sub {
  color: rgba(255,255,255,.65);
  font-size: 1rem; line-height: 1.8; max-width: 500px;
}
.btn-hero-solid {
  display: inline-flex; align-items: center;
  background: #C0392B; color: #fff;
  font-weight: 700; font-size: .9rem;
  padding: 13px 30px; border-radius: 50px;
  text-decoration: none; border: 2px solid #C0392B;
  transition: all .25s;
}
.btn-hero-solid:hover { background: #a93225; color: #fff; }
.btn-hero-ghost {
  display: inline-flex; align-items: center;
  background: transparent; color: rgba(255,255,255,.8);
  font-weight: 600; font-size: .9rem;
  padding: 13px 28px; border-radius: 50px;
  text-decoration: none; border: 2px solid rgba(255,255,255,.25);
  transition: all .25s;
}
.btn-hero-ghost:hover { border-color: rgba(255,255,255,.6); color: #fff; }
.hero-stat-panel {
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 20px; padding: 32px 28px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
}
.hs-val {
  display: block; font-size: 2rem; font-weight: 800;
  color: #C49A3C; line-height: 1;
}
.hs-label {
  display: block; font-size: .68rem; margin-top: 4px;
  color: rgba(255,255,255,.4); text-transform: uppercase; letter-spacing: .1em;
}
.hero-wave { position: absolute; bottom: -1px; left: 0; width: 100%; line-height: 0; }
.hero-wave svg { display: block; }

/* Breadcrumb */
.breadcrumb-item + .breadcrumb-item::before { content: "›"; color: #ccc; }

/* ===== GIỚI THIỆU ===== */
.about-img-box { border: 4px solid rgba(192,57,43,.12); }
.hover-zoom { transition: transform .5s; }
.hover-zoom:hover { transform: scale(1.03); }
.tagline-box { background: rgba(192,57,43,.06); border-left: 3px solid #C0392B; }
.intro-stats {
  display: flex; gap: 24px; flex-wrap: wrap;
  padding-top: 20px; border-top: 1px solid rgba(0,0,0,.08);
}
.intro-stat-val {
  display: block; font-size: 1.8rem; font-weight: 800; color: #C0392B; line-height: 1;
}
.intro-stat-label {
  display: block; font-size: .67rem; color: #999;
  text-transform: uppercase; letter-spacing: .08em; margin-top: 3px;
}

/* Lĩnh vực grid */
.lv-grid {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;
}
.lv-card {
  background: #fff; border: 1px solid rgba(192,57,43,.12);
  border-top: 3px solid #C0392B;
  border-radius: 12px; padding: 22px 16px;
  transition: all .3s;
}
.lv-card:hover {
  box-shadow: 0 10px 32px rgba(192,57,43,.1);
  transform: translateY(-4px);
}
.lv-num {
  width: 28px; height: 28px; border-radius: 50%;
  background: #C0392B; color: #fff;
  font-size: .72rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 12px;
}
.lv-title { font-size: 13px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; }
.lv-desc  { font-size: 12px; color: #888; line-height: 1.6; margin: 0; }

/* ===== TẠI SAO CHỌN – đỏ ===== */
.section-red { background: #C0392B; }
.why-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
}
.why-card {
  background: rgba(255,255,255,.1);
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 14px; padding: 24px 20px;
  transition: all .25s;
}
.why-card:hover {
  background: rgba(255,255,255,.18);
  border-color: rgba(255,255,255,.35);
  transform: translateY(-4px);
}
.why-icon {
  width: 46px; height: 46px; border-radius: 12px;
  background: rgba(255,255,255,.15); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.3rem; margin-bottom: 14px;
}
.why-title { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.why-desc  { font-size: 12.5px; color: rgba(255,255,255,.72); line-height: 1.65; margin: 0; }

/* ===== HORECA – nguyên bản ===== */
.horeca-grid {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 1px; background: #e8e0de;
  border: 1px solid #e8e0de; border-radius: 12px; overflow: hidden;
}
.horeca-card { background: #fff; padding: 32px 28px; }
.horeca-letter {
  font-size: 3.5rem; font-weight: 800;
  color: #C0392B; line-height: 1; margin-bottom: 8px;
}
.horeca-word {
  font-size: .78rem; font-weight: 600; color: #1a1a1a;
  text-transform: uppercase; letter-spacing: .06em; margin-bottom: 12px;
}
.horeca-desc { line-height: 1.7; }

/* ===== GIÁM ĐỐC ===== */
.director-wrap {
  max-width: 900px;
  display: flex; gap: 52px; align-items: flex-start;
  background: #fff; border: 1px solid rgba(0,0,0,.08);
  border-radius: 20px; padding: 44px 48px;
  box-shadow: 0 16px 56px rgba(0,0,0,.06);
}
.director-img-col { flex-shrink: 0; }
.director-img-frame { position: relative; width: 210px; }
.director-photo {
  width: 210px; height: 270px; object-fit: cover;
  border-radius: 14px;
  border: 4px solid rgba(192,57,43,.12);
  display: block;
}
.director-badge {
  position: absolute; bottom: 44px; right: -12px;
  width: 40px; height: 40px; border-radius: 50%;
  background: #C0392B; color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; border: 3px solid #fff;
  box-shadow: 0 4px 12px rgba(192,57,43,.3);
}
.director-name-plate {
  background: #C0392B; color: #fff;
  border-radius: 0 0 10px 10px;
  padding: 10px 14px; text-align: center;
}
.dnp-role { display: block; font-size: .62rem; letter-spacing: .12em; text-transform: uppercase; opacity: .8; }
.dnp-name { display: block; font-size: .88rem; font-weight: 700; margin-top: 2px; }
.director-body { flex: 1; }
.director-heading {
  font-size: 1.8rem; font-weight: 800;
  color: #1a1a1a; line-height: 1.1; margin: 8px 0 14px;
}
.director-bio { font-size: .93rem; color: #555; line-height: 1.8; margin-bottom: 12px; }
.director-stats {
  display: flex; gap: 24px; flex-wrap: wrap;
  padding: 16px 0; border-top: 1px solid rgba(0,0,0,.08);
}
.ds-val   { display: block; font-size: 1.7rem; font-weight: 800; color: #C0392B; line-height: 1; }
.ds-label { display: block; font-size: .65rem; color: #999; text-transform: uppercase; letter-spacing: .09em; margin-top: 4px; }
.director-quote {
  background: rgba(192,57,43,.06); border-left: 3px solid #C0392B;
  border-radius: 0 10px 10px 0; padding: 14px 18px; margin: 0;
  font-style: italic; font-size: .88rem; color: #555; line-height: 1.75;
}

/* ===== GIÁ TRỊ CỐT LÕI ===== */
.value-card {
  border: 1px solid rgba(0,0,0,.07);
  transition: all .3s;
}
.value-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(192,57,43,.1) !important;
  border-color: rgba(192,57,43,.2);
}
.value-icon {
  width: 64px; height: 64px; background: rgba(192,57,43,.08);
  border-radius: 16px; display: flex; align-items: center; justify-content: center;
}

/* ===== PRODUCTS ===== */
.product-cat { font-size: .68rem; letter-spacing: .15em; text-transform: uppercase; color: #C0392B; font-weight: 600; }
.product-card { border: 1px solid rgba(0,0,0,.06); transition: all .3s; }
.product-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,.1) !important; }
.product-card img { transition: transform .5s; }
.product-card:hover img { transform: scale(1.05); }

/* ===== CLIENTS ===== */
.client-card {
  border: 1px solid rgba(255,255,255,.07);
  background: rgba(255,255,255,.03);
  transition: all .3s;
}
.client-card:hover { border-color: rgba(255,255,255,.2); background: rgba(255,255,255,.06); }
.client-tag { font-size: .67rem; letter-spacing: .17em; text-transform: uppercase; color: rgba(255,255,255,.55); font-weight: 600; }

/* ===== CTA ===== */
.cta-section { background: linear-gradient(135deg, #C0392B 0%, #922B21 100%); padding: 80px 0; }
.cta-pattern {
  position: absolute; inset: 0;
  background-image:
    radial-gradient(circle at 90% 10%, rgba(255,255,255,.08) 0%, transparent 50%),
    radial-gradient(circle at 10% 90%, rgba(255,255,255,.05) 0%, transparent 40%);
}
.btn-white-outline {
  background: transparent; border: 2px solid rgba(255,255,255,.7);
  color: #fff; transition: all .3s;
}
.btn-white-outline:hover { background: rgba(255,255,255,.15); border-color: #fff; color: #fff; }
.btn-white-solid {
  background: #fff; border: 2px solid #fff;
  color: #C0392B; transition: all .3s;
}
.btn-white-solid:hover { background: rgba(255,255,255,.9); color: #C0392B; transform: translateX(4px); }

/* ===== RESPONSIVE ===== */
@media (max-width: 1100px) {
  .lv-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 992px) {
  .why-grid { grid-template-columns: 1fr 1fr; }
  .director-wrap { flex-direction: column; padding: 32px 24px; gap: 32px; }
  .director-img-frame { width: 180px; }
  .director-photo { width: 180px; height: 230px; }
}
@media (max-width: 768px) {
  .about-hero { padding: 50px 0 90px; }
  .horeca-grid { grid-template-columns: 1fr; }
  .lv-grid { grid-template-columns: 1fr 1fr; }
  .why-grid { grid-template-columns: 1fr; }
  .section-pad { padding: 48px 0; }
  .hero-stat-panel { grid-template-columns: 1fr 1fr; }
  .director-stats { flex-wrap: wrap; gap: 16px; }
  .cta-section { padding: 50px 0; }
}
@media (max-width: 480px) {
  .lv-grid { grid-template-columns: 1fr; }
}

/* ===== MOBILE RESPONSIVE ===== */
@media (max-width: 575px) {

  /* Banner */
  .about-banner-wrapper img { height: 160px !important; }

  /* Hero */
  .about-hero { padding: 40px 0 80px; }
  .hero-title { font-size: 2rem; }
  .hero-sub { font-size: .85rem; }
  .btn-hero-solid,
  .btn-hero-ghost {
    padding: 10px 20px;
    font-size: .82rem;
    width: 100%;
    justify-content: center;
  }

  /* Section chung */
  .section-pad { padding: 36px 0; }
  .section-title { font-size: 1.3rem; }

  /* Intro stats */
  .intro-stats { gap: 12px; }
  .intro-stat-val { font-size: 1.4rem; }
  .intro-stat-label { font-size: .6rem; }

  /* Lĩnh vực */
  .lv-grid { grid-template-columns: 1fr; gap: 10px; }
  .lv-card { padding: 16px 14px; }
  .lv-title { font-size: 12.5px; }
  .lv-desc { font-size: 11.5px; }

  /* Tại sao chọn */
  .why-grid { grid-template-columns: 1fr; gap: 10px; }
  .why-card { padding: 16px 14px; }
  .why-title { font-size: 13px; }
  .why-desc { font-size: 12px; }

  /* Horeca */
  .horeca-grid { grid-template-columns: 1fr; }
  .horeca-card { padding: 22px 16px; }
  .horeca-letter { font-size: 2.8rem; }
  .horeca-desc { font-size: 12.5px; }

  /* Giám đốc */
  .director-wrap {
    flex-direction: column;
    padding: 20px 16px;
    gap: 20px;
    align-items: center;
  }
  .director-img-frame {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .director-photo {
    width: 150px;
    height: 190px;
  }
  .director-badge { right: calc(50% - 87px); }
  .director-heading { font-size: 1.3rem; }
  .director-bio { font-size: .85rem; }
  .director-stats { gap: 12px; }
  .ds-val { font-size: 1.3rem; }
  .director-quote { font-size: .82rem; padding: 12px 14px; }

  /* Giá trị cốt lõi */
  .value-card { padding: 20px 14px !important; }

  /* Products */
  .product-card img { height: 180px !important; }
  .product-card .p-4 { padding: 16px !important; }

  /* Đối tác */
  .client-card { padding: 16px !important; }

  /* CTA */
  .cta-section { padding: 40px 0; }
  .cta-section .d-flex,
  .cta-section .btn-white-outline,
  .cta-section .btn-white-solid {
    display: block !important;
    width: 100%;
    text-align: center;
    margin-bottom: 12px;
  }
  .cta-section .btn-white-outline { margin-right: 0 !important; }
}
</style>
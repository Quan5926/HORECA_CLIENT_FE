<template>
  <div class="du-an-page">

    <!-- ═══════════════════════════════
         HERO BANNER
    ════════════════════════════════ -->
    <section class="da-hero">
      <div class="da-hero-bg"></div>
      <div class="da-hero-overlay"></div>
      <div class="container position-relative z-2">
        <div class="da-hero-content">
          <div class="da-hero-badge">
            <i class="bi bi-award-fill me-2"></i>Dự án tiêu biểu
          </div>
          <h1 class="da-hero-title">
            Giải pháp F&amp;B cho<br />
            <span class="da-hero-highlight">Hệ thống Horeca</span>
          </h1>
          <p class="da-hero-desc">
            Hơn 500+ dự án đã tin tưởng One Horeca cung cấp thiết bị, nguyên liệu
            và giải pháp vận hành cho khách sạn, resort, nhà hàng trên toàn quốc.
          </p>
          <div class="da-hero-stats">
            <div class="da-stat">
              <span class="da-stat-num">500+</span>
              <span class="da-stat-label">Dự án</span>
            </div>
            <div class="da-stat-divider"></div>
            <div class="da-stat">
              <span class="da-stat-num">63</span>
              <span class="da-stat-label">Tỉnh thành</span>
            </div>
            <div class="da-stat-divider"></div>
            <div class="da-stat">
              <span class="da-stat-num">10+</span>
              <span class="da-stat-label">Năm kinh nghiệm</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Decorative shapes -->
      <div class="da-hero-shape da-hero-shape--1"></div>
      <div class="da-hero-shape da-hero-shape--2"></div>
    </section>

    <!-- ═══════════════════════════════
         FILTER BAR
    ════════════════════════════════ -->
    <section class="da-filter-section">
      <div class="container">
        <div class="da-filter-bar">

          <!-- Category pills -->
          <div class="da-filter-pills">
            <button
              v-for="cat in categories"
              :key="cat.value"
              class="da-pill"
              :class="{ 'da-pill--active': activeCategory === cat.value }"
              @click="setCategory(cat.value)"
            >
              <i :class="cat.icon + ' me-1'"></i>
              {{ cat.label }}
              <span class="da-pill-count">{{ countByCategory(cat.value) }}</span>
            </button>
          </div>

          <!-- Search -->
          <div class="da-filter-search">
            <i class="bi bi-search"></i>
            <input
              v-model="searchText"
              type="text"
              placeholder="Tìm kiếm dự án..."
              class="da-search-input"
            />
            <button v-if="searchText" class="da-search-clear" @click="searchText = ''">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════
         PROJECT GRID
    ════════════════════════════════ -->
    <section class="da-projects-section">
      <div class="container">

        <!-- Results count -->
        <div class="da-results-info" v-if="filteredProjects.length > 0">
          <span>Hiển thị <strong>{{ filteredProjects.length }}</strong> dự án</span>
          <button v-if="activeCategory !== 'all' || searchText" class="da-reset-btn" @click="resetFilters">
            <i class="bi bi-x-circle me-1"></i>Xóa bộ lọc
          </button>
        </div>

        <!-- Grid -->
        <transition-group name="project-list" tag="div" class="da-grid">
          <article
            v-for="project in filteredProjects"
            :key="project.id"
            class="da-card"
            @mouseenter="hoveredId = project.id"
            @mouseleave="hoveredId = null"
          >
            <!-- Image -->
            <div class="da-card-img-wrap">
              <img
                :src="project.image"
                :alt="project.name"
                class="da-card-img"
                loading="lazy"
                @error="(e) => e.target.src = fallbackImg"
              />
              <!-- Category badge -->
              <div class="da-card-cat-badge" :class="`da-cat--${project.category}`">
                <i :class="getCategoryIcon(project.category) + ' me-1'"></i>
                {{ getCategoryLabel(project.category) }}
              </div>
              <!-- Overlay on hover -->
              <div class="da-card-overlay" :class="{ 'is-visible': hoveredId === project.id }">
                <div class="da-card-overlay-content">
                  <p class="da-card-desc">{{ project.description }}</p>
                  <div class="da-card-tags">
                    <span v-for="tag in project.tags" :key="tag" class="da-tag">{{ tag }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Info -->
            <div class="da-card-body">
              <div class="da-card-meta">
                <span class="da-card-location">
                  <i class="bi bi-geo-alt-fill me-1"></i>{{ project.location }}
                </span>
                <span class="da-card-year">{{ project.year }}</span>
              </div>
              <h3 class="da-card-name">{{ project.name }}</h3>
              <div class="da-card-services">
                <span v-for="svc in project.services.slice(0, 2)" :key="svc" class="da-service-chip">
                  {{ svc }}
                </span>
                <span v-if="project.services.length > 2" class="da-service-more">
                  +{{ project.services.length - 2 }}
                </span>
              </div>
            </div>

          </article>
        </transition-group>

        <!-- Empty state -->
        <div v-if="filteredProjects.length === 0" class="da-empty">
          <div class="da-empty-icon">
            <i class="bi bi-search"></i>
          </div>
          <p class="da-empty-title">Không tìm thấy dự án phù hợp</p>
          <p class="da-empty-sub">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          <button class="da-empty-reset" @click="resetFilters">Xem tất cả dự án</button>
        </div>

      </div>
    </section>

    <!-- ═══════════════════════════════
         CTA SECTION
    ════════════════════════════════ -->
    <section class="da-cta-section">
      <div class="container">
        <div class="da-cta-card">
          <div class="da-cta-left">
            <div class="da-cta-icon"><i class="bi bi-chat-dots-fill"></i></div>
            <div>
              <h2 class="da-cta-title">Bạn đang lên kế hoạch cho dự án mới?</h2>
              <p class="da-cta-sub">Đội ngũ tư vấn của chúng tôi sẵn sàng hỗ trợ 24/7.</p>
            </div>
          </div>
          <div class="da-cta-actions">
            <a href="tel:0786667447" class="da-cta-btn da-cta-btn--primary">
              <i class="bi bi-telephone-fill me-2"></i>Gọi ngay
            </a>
            <router-link to="/lien-he" class="da-cta-btn da-cta-btn--outline">
              Gửi yêu cầu <i class="bi bi-arrow-right ms-2"></i>
            </router-link>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ── STATE ─────────────────────────────────────
const activeCategory = ref('all')
const searchText     = ref('')
const hoveredId      = ref(null)

const fallbackImg = 'https://placehold.co/600x400/f3f4f6/9ca3af?text=Dự+Án'

// ── CATEGORIES ────────────────────────────────
const categories = [
  { value: 'all',            label: 'Tất cả',            icon: 'bi bi-grid-fill' },
  { value: 'khach-san',      label: 'Khách sạn & Resort', icon: 'bi bi-building' },
  { value: 'nha-hang',       label: 'Nhà hàng & Cafe',   icon: 'bi bi-cup-straw' },
  { value: 'bep-cong-nghiep', label: 'Bếp công nghiệp',  icon: 'bi bi-fire' },
]

const getCategoryIcon = (val) => {
  const found = categories.find(c => c.value === val)
  return found ? found.icon : 'bi bi-tag'
}
const getCategoryLabel = (val) => {
  const found = categories.find(c => c.value === val)
  return found ? found.label : val
}

// ── SAMPLE DATA ───────────────────────────────
// Thay bằng API call thực tế nếu có
const projects = ref([
  {
    id: 1, category: 'khach-san', year: '2023',
    name: 'Marriott Hanoi Hotel',
    location: 'Hà Nội',
    description: 'Cung cấp đầy đủ thiết bị bếp công nghiệp và nguyên liệu F&B cho hệ thống 3 nhà hàng trong khách sạn 5 sao.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    services: ['Thiết bị bếp', 'Nguyên liệu', 'Tư vấn menu'],
    tags: ['5 sao', 'Hà Nội', '3 nhà hàng'],
  },
  {
    id: 2, category: 'nha-hang', year: '2023',
    name: 'Chuỗi The Coffee House',
    location: 'TP. Hồ Chí Minh',
    description: 'Cung cấp nguyên liệu pha chế, bao bì và dụng cụ đồng bộ cho 50+ chi nhánh trên toàn quốc.',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80',
    services: ['Nguyên liệu pha chế', 'Bao bì', 'Dụng cụ'],
    tags: ['50+ chi nhánh', 'Coffee chain'],
  },
  {
    id: 3, category: 'bep-cong-nghiep', year: '2024',
    name: 'Vinpearl Resort & Spa Phú Quốc',
    location: 'Phú Quốc, Kiên Giang',
    description: 'Thiết kế và cung cấp hệ thống bếp công nghiệp hoàn chỉnh cho resort nghỉ dưỡng 5 sao với capacity 1.200 khách/ngày.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80',
    services: ['Thiết bị bếp CN', 'Hệ thống làm lạnh', 'Lắp đặt & bảo trì'],
    tags: ['5 sao', '1.200 khách/ngày', 'Resort'],
  },
  {
    id: 4, category: 'khach-san', year: '2022',
    name: 'InterContinental Đà Nẵng',
    location: 'Đà Nẵng',
    description: 'Đối tác cung cấp gia vị nhà hàng và nguyên liệu pha chế cao cấp cho hệ thống F&B của resort biển.',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80',
    services: ['Gia vị nhà hàng', 'Nguyên liệu cao cấp'],
    tags: ['Luxury', 'Biển', 'Đà Nẵng'],
  },
  {
    id: 5, category: 'nha-hang', year: '2024',
    name: 'Chuỗi Lẩu Thái Sầm Uất',
    location: 'Hà Nội & HCM',
    description: 'Cung cấp trọn bộ nguyên liệu nước lẩu, gia vị và dụng cụ đồng bộ cho 20 chi nhánh nhà hàng lẩu Thái.',
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80',
    services: ['Nguyên liệu lẩu', 'Gia vị đặc chế', 'Dụng cụ'],
    tags: ['20 chi nhánh', 'Lẩu Thái', '2 thành phố'],
  },
  {
    id: 6, category: 'bep-cong-nghiep', year: '2023',
    name: 'Trường Cao đẳng Du lịch Hà Nội',
    location: 'Hà Nội',
    description: 'Cung cấp và lắp đặt toàn bộ thiết bị bếp thực hành cho 5 phòng bếp giảng dạy với tổng 200+ sinh viên.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    services: ['Thiết bị bếp thực hành', 'Lắp đặt', 'Bảo trì định kỳ'],
    tags: ['Giáo dục', '5 phòng bếp', '200+ sinh viên'],
  },
  {
    id: 7, category: 'khach-san', year: '2024',
    name: 'Melia Hà Nội Hotel',
    location: 'Hà Nội',
    description: 'Hợp tác cung cấp nguyên liệu và thiết bị bar cho lobby lounge và sky bar của khách sạn 5 sao trung tâm thành phố.',
    image: 'https://images.unsplash.com/photo-1519449556851-5720b33024e7?w=600&q=80',
    services: ['Nguyên liệu bar', 'Thiết bị pha chế', 'Đào tạo barista'],
    tags: ['5 sao', 'Sky bar', 'Hà Nội'],
  },
  {
    id: 8, category: 'nha-hang', year: '2022',
    name: 'Chuỗi Phở Thìn London',
    location: 'Hà Nội',
    description: 'Cung cấp nguyên liệu và gia vị truyền thống đặc chế phục vụ chuỗi nhà hàng phở nổi tiếng.',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&q=80',
    services: ['Gia vị đặc chế', 'Nguyên liệu truyền thống'],
    tags: ['Ẩm thực Việt', 'Phở', 'Thương hiệu lâu đời'],
  },
  {
    id: 9, category: 'bep-cong-nghiep', year: '2024',
    name: 'Suất ăn công nghiệp Hòa Phát',
    location: 'Hải Dương',
    description: 'Thiết kế hệ thống bếp công nghiệp phục vụ 5.000 suất ăn/ngày cho công nhân khu công nghiệp.',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600&q=80',
    services: ['Hệ thống bếp lớn', 'Thiết bị chuyên dụng', 'Tư vấn quy trình'],
    tags: ['5.000 suất/ngày', 'Công nghiệp', 'Khu CN'],
  },
])

// ── COMPUTED ──────────────────────────────────
const filteredProjects = computed(() => {
  return projects.value.filter(p => {
    const matchCat  = activeCategory.value === 'all' || p.category === activeCategory.value
    const matchText = !searchText.value.trim() ||
      p.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
      p.location.toLowerCase().includes(searchText.value.toLowerCase()) ||
      p.description.toLowerCase().includes(searchText.value.toLowerCase())
    return matchCat && matchText
  })
})

const countByCategory = (val) => {
  if (val === 'all') return projects.value.length
  return projects.value.filter(p => p.category === val).length
}

// ── ACTIONS ────────────────────────────────────
const setCategory = (val) => { activeCategory.value = val }
const resetFilters = () => { activeCategory.value = 'all'; searchText.value = '' }
</script>

<style scoped>

/* ═══════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════ */
.du-an-page { background: #f7f8fa; }

.da-hero {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 80px 0 60px;
}

.da-hero-bg {
  position: absolute; inset: 0;
  background:
    url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80')
    center/cover no-repeat;
}

.da-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(139,24,28,.92) 0%, rgba(45,10,12,.88) 60%, rgba(0,0,0,.75) 100%);
}

.z-2 { position: relative; z-index: 2; }

.da-hero-content { max-width: 680px; }

.da-hero-badge {
  display: inline-flex; align-items: center;
  background: rgba(255,255,255,.15);
  border: 1px solid rgba(255,255,255,.3);
  color: #fff;
  font-size: 13px; font-weight: 700;
  letter-spacing: .6px; text-transform: uppercase;
  padding: 6px 16px; border-radius: 30px;
  margin-bottom: 20px;
  backdrop-filter: blur(4px);
}

.da-hero-title {
  font-family: 'Playfair Display', 'Merriweather', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 18px;
}

.da-hero-highlight {
  position: relative;
  color: #ffd166;
}
.da-hero-highlight::after {
  content: '';
  position: absolute; bottom: -4px; left: 0; right: 0;
  height: 3px; background: #ffd166; border-radius: 2px; opacity: .6;
}

.da-hero-desc {
  color: rgba(255,255,255,.8);
  font-size: 16px; line-height: 1.7;
  margin-bottom: 32px; max-width: 560px;
}

.da-hero-stats {
  display: flex; align-items: center; gap: 0;
}
.da-stat { text-align: center; padding: 0 24px; }
.da-stat:first-child { padding-left: 0; }
.da-stat-num { display: block; font-size: 2rem; font-weight: 800; color: #ffd166; line-height: 1; }
.da-stat-label { font-size: 12px; color: rgba(255,255,255,.7); text-transform: uppercase; letter-spacing: .5px; margin-top: 4px; display: block; }
.da-stat-divider { width: 1px; height: 40px; background: rgba(255,255,255,.25); flex-shrink: 0; }

/* Decorative shapes */
.da-hero-shape {
  position: absolute; border-radius: 50%;
  background: rgba(255,255,255,.04);
  pointer-events: none;
}
.da-hero-shape--1 { width: 400px; height: 400px; top: -100px; right: -60px; }
.da-hero-shape--2 { width: 200px; height: 200px; bottom: -50px; right: 200px; background: rgba(255,209,102,.06); }

/* ═══════════════════════════════════════════════
   FILTER BAR
═══════════════════════════════════════════════ */
.da-filter-section {
  background: #fff;
  border-bottom: 1px solid #eef0f3;
  position: sticky; top: 0; z-index: 100;
  box-shadow: 0 2px 12px rgba(0,0,0,.06);
}

.da-filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  flex-wrap: wrap;
}

.da-filter-pills {
  display: flex; gap: 8px; flex-wrap: wrap;
}

.da-pill {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 13.5px; font-weight: 600;
  border: 1.5px solid #e8eaed;
  background: transparent; color: #5a6477;
  cursor: pointer;
  transition: all .22s cubic-bezier(.175,.885,.32,1.275);
  white-space: nowrap;
}
.da-pill:hover { border-color: #b31f24; color: #b31f24; background: #fdf1f1; }
.da-pill--active { background: #b31f24; border-color: #b31f24; color: #fff !important; }
.da-pill--active:hover { background: #8a181c; border-color: #8a181c; }

.da-pill-count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 20px; height: 20px; padding: 0 6px;
  border-radius: 10px;
  font-size: 11px; font-weight: 700;
  background: rgba(0,0,0,.08);
  margin-left: 4px;
  transition: background .2s;
}
.da-pill--active .da-pill-count { background: rgba(255,255,255,.25); }

.da-filter-search {
  display: flex; align-items: center; gap: 10px;
  background: #f5f7fa; border: 1.5px solid #e8eaed;
  border-radius: 30px; padding: 8px 16px;
  min-width: 220px; max-width: 280px;
  transition: border-color .2s, box-shadow .2s;
}
.da-filter-search:focus-within {
  border-color: #b31f24;
  box-shadow: 0 0 0 3px rgba(179,31,36,.1);
  background: #fff;
}
.da-filter-search > i { color: #9ca3af; font-size: 14px; flex-shrink: 0; }
.da-search-input {
  border: none; background: transparent; outline: none;
  font-size: 13.5px; color: #2d3748; flex: 1;
}
.da-search-input::placeholder { color: #9ca3af; }
.da-search-clear {
  border: none; background: transparent; cursor: pointer;
  color: #9ca3af; padding: 0; line-height: 1; font-size: 12px;
  transition: color .2s;
}
.da-search-clear:hover { color: #b31f24; }

/* ═══════════════════════════════════════════════
   PROJECTS SECTION
═══════════════════════════════════════════════ */
.da-projects-section { padding: 48px 0 64px; }

.da-results-info {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 24px; font-size: 14px; color: #6b7280;
}
.da-results-info strong { color: #2d3748; }
.da-reset-btn {
  border: none; background: transparent; cursor: pointer;
  font-size: 13px; color: #b31f24; font-weight: 600;
  padding: 4px 10px; border-radius: 20px;
  transition: background .2s;
}
.da-reset-btn:hover { background: #fdf1f1; }

/* Grid */
.da-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
@media (max-width: 1100px) { .da-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .da-grid { grid-template-columns: 1fr; } }

/* Card */
.da-card {
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #eef0f3;
  transition: transform .3s cubic-bezier(.175,.885,.32,1.275), box-shadow .3s ease;
  cursor: pointer;
}
.da-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(0,0,0,.12);
  border-color: transparent;
}

/* Image wrapper */
.da-card-img-wrap {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}
.da-card-img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform .5s cubic-bezier(.25,1,.5,1);
  display: block;
}
.da-card:hover .da-card-img { transform: scale(1.06); }

/* Category badge */
.da-card-cat-badge {
  position: absolute; top: 12px; left: 12px;
  display: inline-flex; align-items: center;
  padding: 5px 12px; border-radius: 20px;
  font-size: 11.5px; font-weight: 700;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,.3);
  z-index: 1;
}
.da-cat--khach-san      { background: rgba(26,79,180,.85); color: #fff; }
.da-cat--nha-hang       { background: rgba(16,110,79,.85); color: #fff; }
.da-cat--bep-cong-nghiep { background: rgba(175,74,12,.85); color: #fff; }

/* Hover overlay */
.da-card-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(20,8,10,.92) 0%, rgba(20,8,10,.6) 50%, transparent 100%);
  opacity: 0;
  transition: opacity .3s ease;
  display: flex; align-items: flex-end;
  padding: 20px;
  z-index: 2;
}
.da-card-overlay.is-visible { opacity: 1; }
.da-card-overlay-content { color: #fff; }
.da-card-desc { font-size: 13px; line-height: 1.6; margin-bottom: 10px; opacity: .9; }
.da-card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.da-tag {
  padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
  background: rgba(255,255,255,.2); border: 1px solid rgba(255,255,255,.3); color: #fff;
}

/* Card body */
.da-card-body { padding: 18px 20px 20px; }

.da-card-meta {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 8px;
}
.da-card-location { font-size: 12.5px; color: #9ca3af; }
.da-card-location i { color: #b31f24; }
.da-card-year {
  font-size: 11px; font-weight: 700; color: #b31f24;
  background: #fdf1f1; padding: 2px 8px; border-radius: 10px;
}

.da-card-name {
  font-size: 16px; font-weight: 700; color: #1a202c;
  margin: 0 0 12px; line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.da-card-services { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.da-service-chip {
  font-size: 11.5px; font-weight: 600; color: #64748b;
  background: #f1f5f9; border: 1px solid #e2e8f0;
  padding: 3px 10px; border-radius: 20px;
  transition: all .2s;
}
.da-card:hover .da-service-chip { background: #fdf1f1; border-color: #f5d0d0; color: #b31f24; }
.da-service-more {
  font-size: 11.5px; font-weight: 700; color: #9ca3af;
  background: #f1f5f9; padding: 3px 10px; border-radius: 20px;
}

/* Transition group */
.project-list-enter-active { transition: all .4s cubic-bezier(.175,.885,.32,1.275); }
.project-list-leave-active { transition: all .25s ease; }
.project-list-enter-from  { opacity: 0; transform: translateY(20px) scale(.96); }
.project-list-leave-to    { opacity: 0; transform: scale(.95); }

/* Empty state */
.da-empty {
  text-align: center; padding: 80px 20px;
  background: #fff; border-radius: 20px; border: 1px dashed #e2e8f0;
}
.da-empty-icon {
  width: 64px; height: 64px; border-radius: 50%;
  background: #f3f4f6; margin: 0 auto 16px;
  display: flex; align-items: center; justify-content: center;
  font-size: 26px; color: #9ca3af;
}
.da-empty-title { font-size: 18px; font-weight: 700; color: #374151; margin-bottom: 8px; }
.da-empty-sub   { font-size: 14px; color: #9ca3af; margin-bottom: 24px; }
.da-empty-reset {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 24px; border-radius: 30px; border: none;
  background: #b31f24; color: #fff; font-size: 14px; font-weight: 700;
  cursor: pointer; transition: background .2s, transform .2s;
}
.da-empty-reset:hover { background: #8a181c; transform: translateY(-2px); }

/* ═══════════════════════════════════════════════
   CTA SECTION
═══════════════════════════════════════════════ */
.da-cta-section { padding: 0 0 64px; }
.da-cta-card {
  background: linear-gradient(135deg, #b31f24 0%, #7a1318 100%);
  border-radius: 24px;
  padding: 40px 48px;
  display: flex; align-items: center; justify-content: space-between;
  gap: 32px; flex-wrap: wrap;
  box-shadow: 0 20px 60px rgba(179,31,36,.3);
}
.da-cta-left { display: flex; align-items: center; gap: 20px; }
.da-cta-icon {
  width: 56px; height: 56px; border-radius: 50%;
  background: rgba(255,255,255,.15); border: 1.5px solid rgba(255,255,255,.3);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; color: #fff; flex-shrink: 0;
}
.da-cta-title { font-size: 20px; font-weight: 700; color: #fff; margin: 0 0 4px; }
.da-cta-sub   { font-size: 14px; color: rgba(255,255,255,.75); margin: 0; }
.da-cta-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.da-cta-btn {
  display: inline-flex; align-items: center;
  padding: 12px 28px; border-radius: 30px;
  font-size: 14.5px; font-weight: 700; text-decoration: none;
  transition: all .25s cubic-bezier(.175,.885,.32,1.275);
  white-space: nowrap;
}
.da-cta-btn--primary {
  background: #fff; color: #b31f24;
  box-shadow: 0 4px 16px rgba(0,0,0,.15);
}
.da-cta-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.2); }
.da-cta-btn--outline {
  background: transparent; color: #fff;
  border: 2px solid rgba(255,255,255,.5);
}
.da-cta-btn--outline:hover { background: rgba(255,255,255,.15); border-color: #fff; }

/* ═══════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════ */
@media (max-width: 768px) {
  .da-hero { padding: 60px 0 40px; min-height: auto; }
  .da-hero-stats { gap: 0; }
  .da-stat { padding: 0 14px; }
  .da-stat-num { font-size: 1.5rem; }
  .da-filter-bar { flex-direction: column; align-items: stretch; }
  .da-filter-search { max-width: 100%; }
  .da-cta-card { padding: 28px 24px; flex-direction: column; }
  .da-cta-left { flex-direction: column; text-align: center; }
  .da-cta-actions { justify-content: center; }
}

@media (max-width: 575px) {

  /* Hero */
  .da-hero { padding: 40px 0 32px; }
  .da-hero-title { font-size: 1.6rem; margin-bottom: 12px; }
  .da-hero-desc { font-size: 14px; margin-bottom: 20px; }
  .da-hero-badge { font-size: 11px; padding: 5px 12px; margin-bottom: 14px; }

  .da-hero-stats { gap: 0; }
  .da-stat { padding: 0 12px; }
  .da-stat:first-child { padding-left: 0; }
  .da-stat-num { font-size: 1.4rem; }
  .da-stat-label { font-size: 10px; }
  .da-stat-divider { height: 30px; }

  /* Filter */
  .da-filter-section { position: relative; top: unset; }
  .da-filter-bar { padding: 10px 0; gap: 10px; }
  .da-filter-pills { gap: 6px; }
  .da-pill { padding: 6px 12px; font-size: 12.5px; }
  .da-pill-count { min-width: 18px; height: 18px; font-size: 10px; }
  .da-filter-search { min-width: unset; padding: 7px 12px; }
  .da-search-input { font-size: 13px; }

  /* Projects */
  .da-projects-section { padding: 28px 0 40px; }
  .da-results-info { font-size: 13px; margin-bottom: 16px; }
  .da-grid { gap: 16px; }

  /* Card */
  .da-card { border-radius: 14px; }
  .da-card-body { padding: 14px 16px 16px; }
  .da-card-name { font-size: 14.5px; margin-bottom: 8px; }
  .da-card-location { font-size: 12px; }
  .da-service-chip { font-size: 11px; padding: 2px 8px; }

  /* Overlay — disable trên mobile vì không có hover */
  .da-card-overlay { display: none; }

  /* Empty */
  .da-empty { padding: 48px 16px; }
  .da-empty-title { font-size: 16px; }

  /* CTA */
  .da-cta-section { padding: 0 0 40px; }
  .da-cta-card {
    padding: 24px 18px;
    border-radius: 18px;
    gap: 20px;
  }
  .da-cta-left { gap: 14px; }
  .da-cta-icon { width: 46px; height: 46px; font-size: 18px; }
  .da-cta-title { font-size: 16px; }
  .da-cta-sub { font-size: 13px; }
  .da-cta-actions { width: 100%; flex-direction: column; gap: 10px; }
  .da-cta-btn {
    width: 100%;
    justify-content: center;
    padding: 12px 20px;
    font-size: 14px;
  }
}
</style>
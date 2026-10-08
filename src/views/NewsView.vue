<template>
  <div class="news-page font-general">
    <main class="pb-5">

      <!-- Hero Banner -->
      <section class="news-hero position-relative overflow-hidden">
        <div class="hero-bg-pattern"></div>
        <div class="hero-glow-left"></div>
        <div class="hero-glow-right"></div>
        <div class="container-fluid px-lg-5 py-5 py-sm-4 py-xs-2 position-relative z-1">
          <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb mb-0 small">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-decoration-none text-white-50 hover-white">
                  <i class="bi bi-house-door-fill me-1"></i>Trang chủ
                </router-link>
              </li>
              <li class="breadcrumb-item active text-white fw-semibold" aria-current="page">Tin tức & Sự kiện</li>
            </ol>
          </nav>
          <div class="row align-items-center g-5">
            <div class="col-lg-6">
              <div class="hero-tag mb-4">
                <i class="bi bi-newspaper me-2"></i>TIN TỨC & SỰ KIỆN
              </div>
              <h1 class="hero-title fw-bold text-white lh-sm mb-4">
                Khám phá thế giới<br>
                <span class="text-gradient-gold">ẩm thực & gốm sứ</span>
              </h1>
              <p class="text-white-75 mb-0" style="max-width: 480px; font-size: 1.05rem; line-height: 1.7">
                Cập nhật xu hướng F&B, kỹ thuật trình bày món ăn, và bí quyết chọn dụng cụ nhà bàn đẳng cấp từ One Horeca.
              </p>
            </div>
            <div class="col-lg-6 d-none d-lg-flex justify-content-end">
              <div class="hero-stats-card">
                <div class="hero-stat-item">
                  <span class="hero-stat-num">500+</span>
                  <span class="hero-stat-label">Bài viết</span>
                </div>
                <div class="hero-stat-divider"></div>
                <div class="hero-stat-item">
                  <span class="hero-stat-num">50K+</span>
                  <span class="hero-stat-label">Lượt đọc</span>
                </div>
                <div class="hero-stat-divider"></div>
                <div class="hero-stat-item">
                  <span class="hero-stat-num">12</span>
                  <span class="hero-stat-label">Chủ đề</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,50 L1440,80 L0,80 Z" fill="#f8f5f0"/>
          </svg>
        </div>
      </section>

      <div class="bg-warm-light pb-5">
        <div class="container-fluid px-lg-5">

          <!-- Featured Post -->
          <div class="pt-4 mb-5" v-if="featuredPost">
            <div class="section-label mb-4">
              <span class="section-badge">
                <i class="bi bi-star-fill me-2"></i>BÀI VIẾT NỔI BẬT
              </span>
            </div>
            <div class="featured-card rounded-4 overflow-hidden">
              <div class="row g-0">
                <div class="col-lg-7 featured-img-col position-relative overflow-hidden">
                  <router-link :to="{ name: 'news-detail', params: { id: featuredPost.id } }">
                    <img :src="getMainImage(featuredPost.anhDaiDien)"
                         class="featured-img w-100 h-100 object-fit-cover"
                         :alt="featuredPost.tieuDe" style="min-height: 460px;">
                    <div class="featured-img-overlay"></div>
                  </router-link>
                  <div class="position-absolute top-0 start-0 p-4 z-1">
                    <span class="featured-cat-badge">{{ featuredPost.danhMuc || 'Nổi bật' }}</span>
                  </div>
                  <div class="featured-bottom-info position-absolute bottom-0 start-0 p-4 z-1">
                    <span class="text-white-75 small">
                      <i class="bi bi-calendar3 me-1"></i>{{ formatDateTime(featuredPost.ngayTao) }}
                      &nbsp;·&nbsp;
                      <i class="bi bi-eye me-1"></i>{{ featuredPost.luotXem || 0 }} lượt xem
                    </span>
                  </div>
                </div>
                <div class="col-lg-5 featured-content-col">
                  <div class="p-5 d-flex flex-column justify-content-center h-100">
                    <div class="featured-eyebrow mb-3">BÀI NỔI BẬT</div>
                    <router-link :to="{ name: 'news-detail', params: { id: featuredPost.id } }" class="text-decoration-none">
                      <h2 class="featured-title fw-bold mb-4 hover-brown">
                        {{ featuredPost.tieuDe }}
                      </h2>
                    </router-link>
                    <p class="text-secondary lh-lg mb-5 line-clamp-4" style="font-size: 0.95rem;">{{ featuredPost.moTaNgan }}</p>
                    <div>
                      <router-link :to="{ name: 'news-detail', params: { id: featuredPost.id } }"
                                   class="btn-read-featured">
                        Đọc bài viết <i class="bi bi-arrow-right ms-2"></i>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Main + Sidebar Layout -->
          <div class="row g-5">

            <!-- News Grid -->
            <div class="col-lg-9">
              <!-- Toolbar -->
              <div class="news-toolbar d-flex justify-content-between align-items-center mb-4">
                <div class="toolbar-title">
                  <h3 class="fw-bold text-dark m-0">
                    {{ selectedCategory ? selectedCategory : 'Tin mới nhất' }}
                  </h3>
                
                </div>
                <div class="dropdown">
                  <button class="btn sort-btn dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <i class="bi bi-sliders me-2"></i>{{ currentSortLabel }}
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 mt-2 p-2">
                    <li><a class="dropdown-item rounded-2 py-2 cursor-pointer" :class="{ 'active-sort': currentSort === 'newest' }" @click.prevent="setSort('newest')"><i class="bi bi-clock me-2"></i>Mới nhất</a></li>
                    <li><a class="dropdown-item rounded-2 py-2 cursor-pointer" :class="{ 'active-sort': currentSort === 'oldest' }" @click.prevent="setSort('oldest')"><i class="bi bi-clock-history me-2"></i>Cũ nhất</a></li>
                    <li><a class="dropdown-item rounded-2 py-2 cursor-pointer" :class="{ 'active-sort': currentSort === 'most_viewed' }" @click.prevent="setSort('most_viewed')"><i class="bi bi-fire me-2"></i>Phổ biến nhất</a></li>
                  </ul>
                </div>
              </div>

              <!-- Empty State -->
              <div v-if="paginatedNews.length === 0" class="empty-state text-center py-5">
                <div class="empty-icon-wrap mb-4">
                  <i class="bi bi-search"></i>
                </div>
                <h5 class="text-secondary fw-normal mb-2">Không tìm thấy bài viết phù hợp</h5>
                <p class="text-muted small mb-4">Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc</p>
                <button class="btn btn-outline-brown rounded-pill px-4" @click="resetFilters">
                  <i class="bi bi-x-circle me-2"></i>Xóa bộ lọc
                </button>
              </div>

              <!-- News Cards -->
              <div class="row row-cols-2 row-cols-md-2 row-cols-xl-3 g-3" v-else>
                <div class="col" v-for="news in paginatedNews" :key="news.id">
                  <article class="news-card h-100 bg-white rounded-4 overflow-hidden">
                    <div class="news-card-img position-relative overflow-hidden">
                      <router-link :to="{ name: 'news-detail', params: { id: news.id } }">
                        <img :src="getMainImage(news.anhDaiDien)"
                             class="w-100 h-100 object-fit-cover news-img-zoom"
                             :alt="news.tieuDe">
                      </router-link>
                      <span class="news-cat-badge">{{ news.danhMuc || 'Tin tức' }}</span>
                    </div>
                    <div class="p-4 d-flex flex-column" style="flex: 1">
                      <div class="news-meta d-flex gap-3 mb-3">
                        <span class="text-muted small"><i class="bi bi-calendar-event me-1 text-brand-brown"></i>{{ formatDateTime(news.ngayTao) }}</span>
                        <span class="text-muted small"><i class="bi bi-eye me-1 text-brand-brown"></i>{{ news.luotXem || 0 }}</span>
                      </div>
                      <router-link :to="{ name: 'news-detail', params: { id: news.id } }" class="text-decoration-none flex-grow-1">
                        <h5 class="fw-bold text-dark lh-sm line-clamp-2 mb-3 hover-brown cursor-pointer news-title">{{ news.tieuDe }}</h5>
                      </router-link>
                      <p class="text-secondary small line-clamp-3 mb-4">{{ news.moTaNgan }}</p>
                      <div class="mt-auto">
                        <router-link :to="{ name: 'news-detail', params: { id: news.id } }"
                                     class="read-more-link text-decoration-none">
                          Đọc thêm <i class="bi bi-arrow-right ms-1"></i>
                        </router-link>
                      </div>
                    </div>
                  </article>
                </div>
              </div>

              <!-- Pagination -->
              <nav class="mt-5 pt-2" v-if="totalPages > 1">
                <ul class="pagination justify-content-center gap-2 mb-0">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-btn cursor-pointer" @click.prevent="goToPage(currentPage - 1)">
                      <i class="bi bi-chevron-left"></i>
                    </a>
                  </li>
                  <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                    <a class="page-btn cursor-pointer fw-semibold" @click.prevent="goToPage(page)">{{ page }}</a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-btn cursor-pointer" @click.prevent="goToPage(currentPage + 1)">
                      <i class="bi bi-chevron-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <!-- Sidebar -->
            <aside class="col-lg-3">

              <!-- Search -->
              <div class="sidebar-widget mb-4">
                <h6 class="sidebar-title"><i class="bi bi-search me-2"></i>Tìm kiếm</h6>
                <div class="search-box d-flex rounded-3 overflow-hidden">
                  <input type="text" class="form-control border-0 ps-3 py-2 bg-white shadow-none"
                         placeholder="Nhập từ khóa..." v-model="searchQuery" @input="currentPage = 1">
                  <button class="btn btn-brand-brown px-3 border-0 rounded-0">
                    <i class="bi bi-search text-white"></i>
                  </button>
                </div>
              </div>

              <!-- Categories -->
              <div class="sidebar-widget mb-4">
                <h6 class="sidebar-title"><i class="bi bi-grid me-2"></i>Danh mục</h6>
                <div class="d-flex flex-column gap-2">
                  <a href="#" @click.prevent="setCategory('')"
                     class="cat-item d-flex justify-content-between align-items-center"
                     :class="{ 'cat-active': selectedCategory === '' }">
                    <span class="small fw-medium">Tất cả bài viết</span>
                    <span class="cat-count">{{ allNewsData.length }}</span>
                  </a>
                  <a href="#" v-for="cat in uniqueCategories" :key="cat"
                     @click.prevent="setCategory(cat)"
                     class="cat-item d-flex justify-content-between align-items-center"
                     :class="{ 'cat-active': selectedCategory === cat }">
                    <span class="small fw-medium">{{ cat }}</span>
                    <span class="cat-count">{{ allNewsData.filter(n => n.danhMuc === cat).length }}</span>
                  </a>
                </div>
              </div>

              <!-- Popular Posts -->
              <div class="sidebar-widget mb-4">
                <h6 class="sidebar-title"><i class="bi bi-fire me-2"></i>Xem nhiều nhất</h6>
                <div class="d-flex flex-column gap-3">
                  <div class="pop-post-item d-flex gap-3" v-for="(post, idx) in popularPosts" :key="post.id">
                    <div class="pop-rank flex-shrink-0">{{ idx + 1 }}</div>
                    <div class="pop-thumb rounded-3 flex-shrink-0 overflow-hidden">
                      <img :src="getMainImage(post.anhDaiDien)"
                           class="w-100 h-100 object-fit-cover news-img-zoom" :alt="post.tieuDe">
                    </div>
                    <div class="flex-grow-1">
                      <router-link :to="{ name: 'news-detail', params: { id: post.id } }" class="text-decoration-none">
                        <h6 class="small fw-semibold mb-1 hover-brown text-dark line-clamp-2 lh-sm cursor-pointer">{{ post.tieuDe }}</h6>
                      </router-link>
                      <span class="text-muted" style="font-size: 11px">
                        <i class="bi bi-eye me-1 text-brand-brown"></i>{{ post.luotXem || 0 }} lượt xem
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tags -->
              <div class="sidebar-widget">
                <h6 class="sidebar-title"><i class="bi bi-tags me-2"></i>Tags nổi bật</h6>
                <div class="d-flex flex-wrap gap-2">
                  <a href="#" class="tag-pill text-decoration-none" v-for="tag in allTags" :key="tag">#{{ tag }}</a>
                </div>
              </div>

            </aside>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import newsService from '@/services/newsService';

export default {
  name: 'NewsView',
  data() {
    return {
      allNewsData: [],
      featuredPost: null,
      searchQuery: '',
      selectedCategory: '',
      currentSort: 'newest',
      currentPage: 1,
      itemsPerPage: 6,
      allTags: ['Gốm sứ', 'F&B', 'Nhà hàng', 'Khách sạn', 'Espresso', 'Fine Dining', 'Xu hướng', 'Khuyến mãi'],
    };
  },
  computed: {
    filteredAndSortedNews() {
      let result = this.allNewsData;
      if (this.selectedCategory) result = result.filter(n => n.danhMuc === this.selectedCategory);
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        result = result.filter(n => (n.tieuDe && n.tieuDe.toLowerCase().includes(q)) || (n.moTaNgan && n.moTaNgan.toLowerCase().includes(q)));
      }
      return [...result].sort((a, b) => {
        if (this.currentSort === 'newest') return new Date(b.ngayTao || 0) - new Date(a.ngayTao || 0);
        if (this.currentSort === 'oldest') return new Date(a.ngayTao || 0) - new Date(b.ngayTao || 0);
        if (this.currentSort === 'most_viewed') return (b.luotXem || 0) - (a.luotXem || 0);
        return 0;
      });
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredAndSortedNews.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredAndSortedNews.length / this.itemsPerPage) || 1;
    },
    popularPosts() {
      return [...this.allNewsData].sort((a, b) => (b.luotXem || 0) - (a.luotXem || 0)).slice(0, 5);
    },
    uniqueCategories() {
      return [...new Set(this.allNewsData.map(n => n.danhMuc).filter(Boolean))];
    },
    currentSortLabel() {
      return { newest: 'Mới nhất', oldest: 'Cũ nhất', most_viewed: 'Phổ biến nhất' }[this.currentSort] || 'Sắp xếp';
    }
  },
  methods: {
    formatDateTime(d) { return d ? d.substring(0, 10) : 'N/A'; },
    getMainImage(s) { return s ? s.split('|||')[0] : 'https://placehold.co/800x450?text=No+Image'; },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) { this.currentPage = page; window.scrollTo({ top: 400, behavior: 'smooth' }); }
    },
    setCategory(cat) { this.selectedCategory = cat; this.currentPage = 1; },
    setSort(sort) { this.currentSort = sort; this.currentPage = 1; },
    resetFilters() { this.searchQuery = ''; this.selectedCategory = ''; this.currentSort = 'newest'; this.currentPage = 1; },
    async fetchPublicNews() {
      try {
        const response = await newsService.getPublicNews();
        console.log('RAW:', response.data);
        let all = response.data?.content || response.data?.data || response.data || [];
        if (all.length > 0) {
          const featured = all.find(n => n.noiBat === true);
          if (featured) { this.featuredPost = featured; this.allNewsData = all.filter(n => n.id !== featured.id); }
          else { this.featuredPost = null; this.allNewsData = all; }
        }
      } catch (e) { console.warn('Lỗi API:', e.message); }
    }
  },
  mounted() { this.fetchPublicNews(); }
}
</script>

<style scoped>
/* === BASE === */
.text-brand-brown { color: #5c3d11 !important; }
.bg-brand-brown { background-color: #5c3d11 !important; }
.bg-warm-light { background-color: #f8f5f0; }
.hover-brown:hover { color: #5c3d11 !important; }
.hover-white:hover { color: #fff !important; }
.cursor-pointer { cursor: pointer; }
.object-fit-cover { object-fit: cover; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-4 { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
.text-white-75 { color: rgba(255,255,255,0.75); }
.text-gold { color: #f0c040; }

/* === HERO === */
.news-hero {
  background: linear-gradient(135deg, #2d1800 0%, #5c3d11 50%, #7a5520 100%);
  padding: 80px 0 120px;
  position: relative;
}
.hero-bg-pattern {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle at 15% 50%, rgba(240,192,64,0.12) 0%, transparent 45%),
    radial-gradient(circle at 85% 20%, rgba(255,255,255,0.05) 0%, transparent 35%),
    repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(255,255,255,0.015) 60px, rgba(255,255,255,0.015) 61px);
}
.hero-glow-left {
  position: absolute; top: -100px; left: -100px;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(240,192,64,0.15) 0%, transparent 70%);
  pointer-events: none;
}
.hero-glow-right {
  position: absolute; bottom: 0; right: 0;
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%);
  pointer-events: none;
}
.hero-wave { position: absolute; bottom: 0; left: 0; width: 100%; line-height: 0; }
.hero-wave svg { display: block; }

.hero-tag {
  display: inline-flex; align-items: center;
  background: rgba(240,192,64,0.15);
  color: #f0c040;
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em;
  padding: 7px 18px; border-radius: 30px;
  border: 1px solid rgba(240,192,64,0.3);
  backdrop-filter: blur(4px);
}
.hero-title { font-size: clamp(2rem, 4vw, 3rem); }
.text-gradient-gold {
  background: linear-gradient(90deg, #f0c040, #ffda7a, #f0c040);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-stats-card {
  display: flex; align-items: center; gap: 24px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  padding: 28px 36px;
}
.hero-stat-item { text-align: center; }
.hero-stat-num { display: block; font-size: 2rem; font-weight: 800; color: #f0c040; line-height: 1; }
.hero-stat-label { display: block; font-size: 0.72rem; color: rgba(255,255,255,0.6); margin-top: 6px; font-weight: 500; letter-spacing: 0.05em; }
.hero-stat-divider { width: 1px; height: 44px; background: rgba(255,255,255,0.15); }

/* === SECTION BADGE === */
.section-badge {
  display: inline-flex; align-items: center;
  background: #fff;
  color: #5c3d11;
  font-size: 0.7rem; font-weight: 800; letter-spacing: 0.12em;
  padding: 8px 20px; border-radius: 30px;
  border: 1.5px solid rgba(92,61,17,0.15);
  box-shadow: 0 2px 12px rgba(92,61,17,0.08);
}
.section-badge i { color: #f0c040; }

/* === FEATURED CARD === */
.featured-card {
  background: #fff;
  box-shadow: 0 8px 40px rgba(92,61,17,0.12);
  border: 1px solid rgba(92,61,17,0.08);
  transition: box-shadow 0.3s;
}
.featured-card:hover { box-shadow: 0 16px 60px rgba(92,61,17,0.18); }
.featured-img { transition: transform 0.7s ease; }
.featured-card:hover .featured-img { transform: scale(1.04); }
.featured-img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%),
              linear-gradient(to right, rgba(0,0,0,0.2), transparent 60%);
}
.featured-cat-badge {
  display: inline-block;
  background: #5c3d11; color: #f0c040;
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em;
  padding: 6px 16px; border-radius: 30px;
  text-transform: uppercase;
}
.featured-content-col {
  background: linear-gradient(135deg, #fdfaf6 0%, #f5ece0 100%);
  border-left: 1px solid rgba(92,61,17,0.08);
}
.featured-eyebrow {
  font-size: 0.68rem; font-weight: 800; letter-spacing: 0.18em;
  color: #a87840; text-transform: uppercase;
}
.featured-title {
  font-size: clamp(1.3rem, 2vw, 1.7rem);
  color: #2d1800; line-height: 1.35;
  transition: color 0.2s;
}
.btn-read-featured {
  display: inline-flex; align-items: center;
  background: linear-gradient(135deg, #5c3d11, #8a6020);
  color: #fff; padding: 13px 30px; border-radius: 50px;
  text-decoration: none; font-weight: 700; font-size: 0.9rem;
  transition: all 0.3s; box-shadow: 0 6px 20px rgba(92,61,17,0.3);
}
.btn-read-featured:hover {
  background: linear-gradient(135deg, #7a5520, #a87840);
  transform: translateY(-2px); color: #fff;
  box-shadow: 0 10px 28px rgba(92,61,17,0.35);
}
.btn-read-featured i { transition: transform 0.3s; }
.btn-read-featured:hover i { transform: translateX(6px); }

/* === TOOLBAR === */
.news-toolbar { padding-bottom: 16px; border-bottom: 2px solid #ede3d5; }
.toolbar-title { position: relative; }
.toolbar-title h3 { font-size: 1.4rem; }

/* === NEWS CARDS === */
.news-card {
  border: 1px solid rgba(92,61,17,0.07);
  transition: all 0.3s ease;
  display: flex; flex-direction: column;
}
.news-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(92,61,17,0.13) !important;
  border-color: rgba(92,61,17,0.15);
}
.news-card-img {
  height: 210px;
  overflow: hidden;
}
.news-img-zoom { transition: transform 0.6s ease; }
.news-card:hover .news-img-zoom { transform: scale(1.07); }
.news-cat-badge {
  position: absolute; top: 12px; right: 12px;
  background: rgba(92,61,17,0.85);
  backdrop-filter: blur(6px);
  color: #f0c040;
  font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em;
  padding: 5px 12px; border-radius: 20px;
  text-transform: uppercase;
}
.news-title { font-size: 1rem; transition: color 0.2s; }
.news-meta { border-bottom: 1px solid #f0e8d8; padding-bottom: 10px; }
.read-more-link {
  color: #5c3d11; font-weight: 700; font-size: 0.85rem;
  display: inline-flex; align-items: center;
  transition: color 0.2s;
}
.read-more-link i { transition: transform 0.3s; }
.read-more-link:hover { color: #a87840 !important; }
.read-more-link:hover i { transform: translateX(5px); }

/* === EMPTY STATE === */
.empty-state { background: #fff; border-radius: 20px; padding: 60px 40px !important; }
.empty-icon-wrap {
  width: 80px; height: 80px; margin: 0 auto;
  background: #f5ece0; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.empty-icon-wrap i { font-size: 2rem; color: #a87840; }
.btn-outline-brown {
  border: 1.5px solid #5c3d11; color: #5c3d11;
  font-size: 0.85rem; font-weight: 600;
  transition: all 0.2s;
}
.btn-outline-brown:hover { background: #5c3d11; color: #fff; }

/* === SORT BUTTON === */
.sort-btn {
  border: 1.5px solid rgba(92,61,17,0.2);
  background: #fff; color: #5c3d11;
  font-size: 0.85rem; font-weight: 600;
  padding: 8px 18px; border-radius: 30px;
  transition: all 0.2s;
}
.sort-btn:hover { border-color: #5c3d11; background: #faf7f2; }
.dropdown-item { font-size: 0.85rem; color: #444; }
.dropdown-item:hover { background: #faf7f2 !important; color: #5c3d11; }
.active-sort { background: #faf7f2 !important; color: #5c3d11; font-weight: 700; }

/* === PAGINATION === */
.page-btn {
  display: flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; border-radius: 50%;
  border: 1.5px solid rgba(92,61,17,0.2);
  background: #fff; color: #5c3d11;
  cursor: pointer; transition: all 0.2s;
  font-size: 0.9rem; text-decoration: none;
}
.page-item.active .page-btn { background: #5c3d11; color: #fff; border-color: #5c3d11; }
.page-item:not(.active):not(.disabled) .page-btn:hover { background: #faf7f2; border-color: #5c3d11; }
.page-item.disabled .page-btn { opacity: 0.35; cursor: not-allowed; }

/* === SIDEBAR === */
.sidebar-widget {
  background: #fff; border-radius: 16px; padding: 22px;
  border: 1px solid rgba(92,61,17,0.08);
  box-shadow: 0 2px 16px rgba(92,61,17,0.05);
}
.sidebar-title {
  font-size: 0.75rem; font-weight: 800; letter-spacing: 0.12em;
  text-transform: uppercase; color: #5c3d11;
  margin-bottom: 16px; padding-bottom: 12px;
  border-bottom: 2px solid #f0e8d8;
  display: flex; align-items: center;
}
.search-box {
  border: 1.5px solid rgba(92,61,17,0.18) !important;
  border-radius: 10px !important; overflow: hidden;
}
.btn-brand-brown { background: #5c3d11; }
.btn-brand-brown:hover { background: #7a5520; }

.cat-item {
  padding: 10px 14px; border-radius: 10px;
  border: 1px solid transparent; color: #555;
  text-decoration: none; transition: all 0.2s;
}
.cat-item:hover { background: #faf7f2; border-color: rgba(92,61,17,0.12); color: #5c3d11; transform: translateX(4px); }
.cat-active { background: #5c3d11 !important; color: #fff !important; border-color: #5c3d11 !important; }
.cat-active:hover { transform: none; }
.cat-count {
  width: 24px; height: 24px;
  background: rgba(92,61,17,0.1); color: #5c3d11;
  border-radius: 50%; font-size: 0.68rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.cat-active .cat-count { background: rgba(255,255,255,0.2); color: #fff; }

.pop-post-item { align-items: flex-start; }
.pop-thumb { width: 68px; height: 68px; overflow: hidden; }
.pop-rank {
  width: 24px; height: 24px;
  background: linear-gradient(135deg, #5c3d11, #8a6020);
  color: #f0c040; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.7rem; font-weight: 800; flex-shrink: 0; margin-top: 2px;
}

.tag-pill {
  padding: 6px 14px; border-radius: 20px;
  background: #f5ece0; color: #5c3d11;
  font-size: 0.72rem; font-weight: 600;
  border: 1px solid rgba(92,61,17,0.12);
  transition: all 0.2s;
}
.tag-pill:hover { background: #5c3d11; color: #fff; border-color: #5c3d11; }

/* ===== MOBILE RESPONSIVE ===== */
@media (max-width: 991px) {
  /* Featured card: stack vertical */
  .featured-card .row { flex-direction: column; }
  .featured-img-col img { min-height: 240px !important; }
  .featured-content-col {
    border-left: none !important;
    border-top: 1px solid rgba(92,61,17,0.08);
  }
}

@media (max-width: 768px) {
  /* Hero */
  .news-hero { padding: 40px 0 90px; }
  .hero-title { font-size: 1.6rem; }
  .hero-tag { font-size: 0.62rem; padding: 5px 14px; }

  /* Featured */
  .featured-img-col img { min-height: 200px !important; }
  .featured-content-col { padding: 24px 20px !important; }
  .featured-title { font-size: 1.15rem; }
  .btn-read-featured { padding: 10px 22px; font-size: 0.85rem; }
  .featured-eyebrow { font-size: 0.62rem; }

  /* Section badge */
  .section-badge { font-size: 0.62rem; padding: 6px 14px; }

  /* Toolbar */
  .news-toolbar { flex-direction: column; align-items: flex-start !important; gap: 12px; }
  .toolbar-title h3 { font-size: 1.15rem; }
  .toolbar-line { bottom: -14px; }
  .sort-btn { font-size: 0.78rem; padding: 6px 14px; }

  /* News cards — 2 cột */
  .news-card-img { height: 140px; }
  .news-title { font-size: 0.82rem; }
  .news-card .p-4 { padding: 12px !important; }
  .news-meta { font-size: 0.7rem; gap: 8px !important; }
  .news-meta span { display: flex; align-items: center; }
  .read-more-link { font-size: 0.75rem; }
  .news-cat-badge { font-size: 0.6rem; padding: 3px 8px; top: 8px; right: 8px; }

  /* Sidebar */
  .sidebar-widget { padding: 16px; border-radius: 12px; }
  .sidebar-title { font-size: 0.68rem; margin-bottom: 12px; padding-bottom: 10px; }
  .cat-item { padding: 8px 12px; }
  .pop-thumb { width: 56px; height: 56px; }
  .tag-pill { font-size: 0.68rem; padding: 5px 11px; }

  /* Pagination */
  .page-btn { width: 34px; height: 34px; font-size: 0.8rem; }

  /* Empty state */
  .empty-state { padding: 40px 20px !important; }
  .empty-icon-wrap { width: 64px; height: 64px; }
  .empty-icon-wrap i { font-size: 1.5rem; }
}

@media (max-width: 575px) {
  /* Hero */
  .news-hero { padding: 24px 0 60px !important; }
  .hero-title { font-size: 1.25rem; line-height: 1.3; }
  .hero-tag { font-size: 0.6rem; padding: 5px 12px; margin-bottom: 12px !important; }
  .news-hero > .container-fluid { padding-top: 16px !important; padding-bottom: 16px !important; }
  .news-hero .py-5 { padding-top: 8px !important; padding-bottom: 8px !important; }
  .news-hero p[style] { display: none; }
  .news-hero nav { margin-bottom: 12px !important; }
  .news-hero nav.mb-4 { margin-bottom: 10px !important; }
  .news-hero .row { --bs-gutter-y: 12px; }
  .news-hero .col-lg-6 { margin-bottom: 0 !important; }
  .breadcrumb { font-size: 0.75rem; }

  /* News cards — 2 cột màn nhỏ */
  .news-card-img { height: 120px; }
  .news-title { font-size: 0.78rem; line-height: 1.35; }
  .news-card .p-4 { padding: 10px !important; }
  .news-card .text-secondary.small.line-clamp-3 { display: none; }
  .news-meta span:last-child { display: none; }
  .news-meta { margin-bottom: 8px !important; }
  .read-more-link { font-size: 0.72rem; }
  .row.g-3 { --bs-gutter-x: 8px; --bs-gutter-y: 8px; }
}
</style>
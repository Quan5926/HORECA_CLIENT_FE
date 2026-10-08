<template>
  <div class="news-detail-wrapper font-general d-flex flex-column min-vh-100 bg-white">
    <div class="container-fluid px-lg-5 flex-grow-1 pb-5">
      <nav aria-label="breadcrumb" class="py-3 mb-4">
        <ol class="breadcrumb mb-0 small text-dark">
          <li class="breadcrumb-item">
            <router-link to="/" class="text-decoration-none text-muted hover-text-brown">
              <i class="bi bi-house-door-fill me-1"></i> Trang chủ
            </router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/tin-tuc" class="text-decoration-none text-muted hover-text-brown">
              Tin tức & Sự kiện
            </router-link>
          </li>
          <li class="breadcrumb-item active text-main-brown fw-bold text-truncate" style="max-width: 300px;">
            {{ article.tieuDe || article.title || 'Chi tiết bài viết' }}
          </li>
        </ol>
      </nav>

      <div class="row g-5">
        <div class="col-lg-8">
          <div v-if="loading" class="text-center py-5 bg-light-brown-subtle rounded-4 border-0">
            <div class="spinner-border text-vipep-green" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3 text-main-brown fw-medium">Đang tải nội dung bài viết...</p>
          </div>

          <template v-else-if="article && article.id">
            <article class="article-content bg-white mb-5">
              <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="badge bg-vipep-green px-3 py-2 rounded-pill shadow-sm">
                    {{ article.danhMuc || 'Tin tức' }}
                  </span>
                  <button @click="toggleSave" class="btn btn-sm rounded-pill px-3 transition-all fw-medium border"
                          :class="isSaved ? 'bg-main-brown text-white border-main-brown' : 'btn-light text-main-brown hover-bg-brown'">
                    <i class="bi" :class="isSaved ? 'bi-bookmark-check-fill' : 'bi-bookmark'"></i>
                    {{ isSaved ? 'Đã lưu' : 'Lưu bài' }}
                  </button>
                </div>

                <h1 class="display-6 fw-bold text-main-brown mb-4 lh-sm">
                  {{ article.tieuDe || article.title }}
                </h1>

                <div class="d-flex flex-wrap align-items-center text-muted small pb-3 border-bottom gap-4 fw-medium">
                  <div class="d-flex align-items-center text-dark">
                    <div class="bg-main-brown text-white rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 35px; height: 35px;">
                      <i class="bi bi-person"></i>
                    </div>
                    <span>Bởi <strong class="text-main-brown">OneHoreca Team</strong></span>
                  </div>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-calendar-event me-2 text-vipep-green"></i>{{ formatDateTime(article.ngayTao) }}
                  </div>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-eye me-2 text-vipep-green"></i>{{ article.luotXem || 0 }} lượt xem
                  </div>
                </div>
              </div>

              <div v-if="article.anhDaiDien || article.image" class="mb-5 overflow-hidden rounded-4 shadow-sm">
                <img :src="getImageUrl(article.anhDaiDien ? article.anhDaiDien.split('|||')[0] : article.image)"
                     @error="handleImageError"
                     :alt="article.tieuDe || article.title"
                     class="img-fluid w-100 object-fit-cover"
                     style="max-height: 500px;">
              </div>

              <div class="content-body text-dark" v-html="article.noiDung || article.content"></div>

              <div v-if="galleryImages.length > 0" class="article-gallery mt-5">
                <h4 class="fw-bold text-main-brown mb-4 position-relative title-with-line">Hình ảnh chi tiết</h4>
                <div class="row g-3">
                  <div class="col-6 col-md-4 col-lg-3" v-for="(img, index) in galleryImages" :key="index">
                    <div class="overflow-hidden rounded-3 shadow-sm h-100 cursor-pointer hover-up">
                      <img :src="getImageUrl(img)" 
                           @error="handleImageError"
                           class="img-fluid w-100 h-100 object-fit-cover transition-zoom" 
                           style="min-height: 150px; max-height: 150px;" 
                           :alt="`Ảnh chi tiết ${index + 1}`">
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mt-5 pt-4 border-top gap-3">
                <div class="d-flex flex-wrap gap-2">
                  <span class="badge bg-light text-dark border border-secondary-subtle fw-medium py-2 px-3 rounded-pill hover-bg-brown cursor-pointer transition-all">#OneHoreca</span>
                  <span class="badge bg-light text-dark border border-secondary-subtle fw-medium py-2 px-3 rounded-pill hover-bg-brown cursor-pointer transition-all">#GiaViHuuCo</span>
                  <span class="badge bg-light text-dark border border-secondary-subtle fw-medium py-2 px-3 rounded-pill hover-bg-brown cursor-pointer transition-all">#Vipep</span>
                </div>

                <div class="share-actions d-flex align-items-center gap-2">
                  <span class="fw-bold text-main-brown small me-2">Chia sẻ:</span>
                  <button @click="shareTo('facebook')" class="btn btn-light rounded-circle btn-share border text-primary"><i class="bi bi-facebook"></i></button>
                  <button @click="shareTo('twitter')" class="btn btn-light rounded-circle btn-share border text-info"><i class="bi bi-twitter"></i></button>
                  <button @click="copyLink" class="btn btn-light rounded-circle btn-share border text-success">
                    <i class="bi" :class="copied ? 'bi-check2-all' : 'bi-link-45deg'"></i>
                  </button>
                </div>
              </div>
            </article>

            <div class="reviews-section mt-5 pt-4 border-top">
              <h3 class="fw-bold text-main-brown mb-4 position-relative title-with-line">Bình luận & Đánh giá</h3>

              <div class="review-form bg-light-brown-subtle p-4 rounded-4 mb-5 shadow-sm border-0">
                <h5 class="fw-bold mb-3 fs-6 text-main-brown">Để lại bình luận của bạn</h5>

                <div class="row g-3 mb-3">
                  <div class="col-md-6">
                    <input type="text" v-model="newReview.name" class="form-control shadow-none border-0 py-2 rounded-3" placeholder="Họ và tên *" required>
                  </div>
                  <div class="col-md-6">
                    <input type="email" v-model="newReview.email" class="form-control shadow-none border-0 py-2 rounded-3" placeholder="Email (Không bắt buộc)">
                  </div>
                </div>
                <div class="mb-3">
                  <textarea v-model="newReview.content" class="form-control shadow-none border-0 py-2 rounded-3" rows="4" placeholder="Nhập nội dung bình luận của bạn *" required></textarea>
                </div>
                <div class="text-end">
                  <button @click="submitReview" :disabled="isSubmittingReview" class="btn btn-main-brown px-4 py-2 rounded-pill fw-medium transition-all">
                    <span v-if="isSubmittingReview" class="spinner-border spinner-border-sm me-2"></span>
                    <i v-else class="bi bi-send me-1"></i> Gửi bình luận
                  </button>
                </div>
              </div>

             <div class="reviews-list">
                <h5 class="fw-bold mb-4 fs-6">{{ reviews.length }} Bình luận</h5>
                
                <div v-if="reviews.length === 0" class="text-center bg-light py-5 rounded-4 border-0 mb-4">
                  <i class="bi bi-chat-square-dots display-4 text-muted opacity-25 mb-3 d-block"></i>
                  <span class="text-muted">Chưa có bình luận nào. Hãy là người đầu tiên đánh giá bài viết này!</span>
                </div>
                
                <div v-else class="d-flex flex-column gap-4">
                  <div v-for="review in displayedReviews" :key="review.id" class="review-item d-flex gap-3 animate-fade-in">
                    <div class="avatar bg-main-brown text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 fw-bold fs-5 shadow-sm" style="width: 50px; height: 50px;">
                      {{ review.hoTen ? review.hoTen.charAt(0).toUpperCase() : 'U' }}
                    </div>
  
                    <div class="review-content bg-light p-3 p-md-4 rounded-4 flex-grow-1 border-0 shadow-sm position-relative">
                      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2">
                        <h6 class="fw-bold mb-1 mb-md-0 text-main-brown">{{ review.hoTen }}</h6>
                        <small class="text-muted"><i class="bi bi-clock me-1"></i>{{ formatDateTime(review.ngayTao) }}</small>
                      </div>
                      <p class="mb-0 text-dark" style="line-height: 1.6;">{{ review.noiDung }}</p>
                    </div>
                  </div>

                  <div v-if="reviews.length > 3" class="text-center mt-2">
                    <button @click="showAllReviews = !showAllReviews" class="btn btn-outline-main-brown rounded-pill px-4 py-2 fw-medium transition-all">
                      {{ showAllReviews ? 'Thu gọn bình luận' : `Xem tất cả ${reviews.length} bình luận` }}
                      <i class="bi ms-1" :class="showAllReviews ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="related-news mt-5 pt-4 border-top" v-if="relatedArticles.length > 0">
              <div class="d-flex justify-content-between align-items-center mb-4 pb-3">
                <h3 class="fw-bold text-main-brown m-0 text-uppercase position-relative title-with-line">Bài viết liên quan</h3>
                <router-link to="/tin-tuc" class="btn btn-sm btn-outline-main-brown rounded-pill px-3">
                  Xem tất cả <i class="bi bi-arrow-right ms-1"></i>
                </router-link>
              </div>

              <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col" v-for="item in relatedArticles" :key="item.id">
                  <div @click="goToArticle(item.id)" class="card h-100 border-0 shadow-sm rounded-4 hover-up transition-all news-card-custom cursor-pointer">
                    <div class="overflow-hidden rounded-top-4" style="height: 160px;">
                      <img :src="getImageUrl(item.anhDaiDien ? item.anhDaiDien.split('|||')[0] : item.image)" @error="handleImageError"
                           class="w-100 h-100 object-fit-cover transition-zoom" :alt="item.tieuDe">
                    </div>
                    <div class="card-body p-3">
                      <small class="text-muted mb-2 d-block">
                        <i class="bi bi-clock me-1 text-main-brown"></i>{{ formatDateTime(item.ngayTao) }}
                      </small>
                      <h6 class="fw-bold text-dark lh-base line-clamp-2 mb-0 hover-text-green">
                        {{ item.tieuDe || item.title }}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <div v-else class="text-center py-5 bg-light rounded-4 shadow-sm border-0">
            <div class="mb-4">
              <i class="bi bi-file-earmark-x display-1 text-muted opacity-50"></i>
            </div>
            <h3 class="text-main-brown fw-bold mb-3">Bài viết không tồn tại</h3>
            <p class="text-muted mb-4">Rất tiếc, bài viết mà bạn đang tìm kiếm không có hoặc đã bị gỡ bỏ.</p>
            <router-link to="/tin-tuc" class="btn btn-main-brown rounded-pill px-4 py-2 fw-bold">
              <i class="bi bi-arrow-left me-2"></i> Quay lại danh sách
            </router-link>
          </div>
        </div>

        <aside class="col-lg-4">
          <div class="sticky-top" style="top: 100px; z-index: 10;">
            <div class="sidebar-block mb-5">
              <h5 class="fw-bold text-main-brown mb-3 text-uppercase fs-6">Tìm kiếm</h5>
              <div class="input-group shadow-sm rounded-pill overflow-hidden border">
                <input type="text" v-model="searchQuery" @keyup.enter="handleSearch"
                       class="form-control border-0 ps-4 py-2 bg-light" placeholder="Nhập từ khóa...">
                <button @click="handleSearch" class="btn btn-main-brown px-4 border-0 text-white">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>

            <div class="promo-banner text-white p-4 rounded-4 shadow-sm mb-5 position-relative overflow-hidden bg-main-brown">
              <div class="position-relative z-1">
                <span class="badge bg-vipep-green text-white mb-3 rounded-pill px-3 py-2 fw-medium">Khuyến Mãi</span>
                <h5 class="fw-bold mb-3 lh-base">Gia vị One Horeca<br>Chuẩn vị tinh hoa</h5>
                <p class="small text-white-50 mb-4">Nâng tầm món ăn của bạn với bộ sưu tập gia vị hữu cơ thượng hạng.</p>
                <router-link to="/hot-deal" class="btn btn-outline-light btn-sm rounded-pill px-4 py-2 fw-bold">
                  Xem sản phẩm <i class="bi bi-chevron-right ms-1"></i>
                </router-link>
              </div>
              <i class="bi bi-star-fill position-absolute text-white opacity-10 promo-icon" style="font-size: 10rem; right: -20px; bottom: -20px;"></i>
            </div>

            <div class="sidebar-block mb-5" v-if="popularArticles.length > 0">
              <h5 class="fw-bold text-main-brown mb-3 text-uppercase fs-6">Xem nhiều nhất</h5>
              <div class="d-flex flex-column gap-3">
                <div v-for="item in popularArticles" :key="'pop-' + item.id" @click="goToArticle(item.id)"
                     class="d-flex gap-3 align-items-center recent-post-item p-2 rounded-3 transition-all cursor-pointer">
                  <div class="overflow-hidden rounded-3 flex-shrink-0" style="width: 80px; height: 80px;">
                    <img :src="getImageUrl(item.anhDaiDien ? item.anhDaiDien.split('|||')[0] : item.image)" @error="handleImageError"
                         class="w-100 h-100 object-fit-cover transition-zoom" :alt="item.tieuDe">
                  </div>
                  <div>
                    <h6 class="small fw-bold mb-1 hover-text-green line-clamp-2 text-dark lh-sm">
                      {{ item.tieuDe || item.title }}
                    </h6>
                    <small class="text-muted" style="font-size: 11px;">
                      <i class="bi bi-clock me-1"></i>{{ formatDateTime(item.ngayTao) }}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>

   
  </div>
</template>

<script>
import newsService from '@/services/newsService';
import reviewService from '@/services/reviewService'; 
import { useToast } from 'vue-toastification';
import { API_BASE } from '@/config/api'
export default {
  name: 'NewsDetailView',
  data() {
    return {
      article: {},
      loading: true,
      relatedArticles: [],
      popularArticles: [],
      searchQuery: '',
      isSaved: false,
      copied: false,
      
      reviews: [],
      newReview: {
        name: '',
        email: '',
        rating: 5,
        content: ''
      },
      isSubmittingReview: false,
      showAllReviews: false 
    };
  },
  
  computed: {
    displayedReviews() {
      if (this.showAllReviews || this.reviews.length <= 3) {
        return this.reviews;
      }
      return this.reviews.slice(0, 3);
    },
    
    // Thuộc tính này sẽ tách mảng ảnh từ chuỗi
    galleryImages() {
      if (this.article && this.article.anhDaiDien && this.article.anhDaiDien.includes('|||')) {
        const images = this.article.anhDaiDien.split('|||');
        return images.slice(1);
      }
      return [];
    }
  },
  
  methods: {
    formatDateTime(d) {
      if (!d) return 'Hôm nay';
      const date = new Date(d);
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    },

    getImageUrl(fileName) {
      if (!fileName) return 'https://placehold.co/1600x900?text=OneHoreca+Featured';
      if (fileName.startsWith('http') || fileName.startsWith('data:image')) return fileName;
      const cleanFileName = fileName.replace(/^\/+/, '');
      return `${API_BASE}/uploads/news/${cleanFileName}`;
    },

    handleImageError(e) {
      e.target.src = 'https://placehold.co/1600x900?text=No+Image+Found';
    },

    async fetchDetail() {
      this.loading = true;
      try {
        const id = this.$route.params.id;
        const res = await newsService.getNewsDetail(id);
        this.article = res.data?.data || res.data || {};
        this.checkIfSaved();
        
        await this.fetchReviews(id); 
        await this.fetchSidebarAndRelatedData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {
        console.error('Lỗi fetch chi tiết:', e);
      } finally {
        this.loading = false;
      }
    },

    setRating(stars) {
      this.newReview.rating = stars;
    },

    async fetchReviews(articleId) {
      try {
        const res = await reviewService.getReviewsByNewsId(articleId);
        this.reviews = res.data || []; 
      } catch (error) {
        console.error('Lỗi khi tải bình luận:', error);
      }
    },

    async submitReview() {
      const toast = useToast();
      const token = localStorage.getItem('auth_token');

      if (!token) {
        toast.error('Bạn cần đăng nhập để có thể gửi bình luận!');
        return;
      }

      if (!this.newReview.content.trim()) {
        toast.warning('Vui lòng nhập nội dung bình luận!');
        return;
      }
      
      this.isSubmittingReview = true;
      try {
        const payload = {
          newsId: this.article.id,
          rating: this.newReview.rating,
          content: this.newReview.content
        };

        await reviewService.submitReview(payload);
        
        this.newReview = { name: '', email: '', rating: 5, content: '' };
        
        toast.success('Gửi bình luận thành công! Vui lòng chờ quản trị viên phê duyệt.', {
          timeout: 5000
        });
        
      } catch (error) {
        console.error('Lỗi gửi bình luận:', error);
        if (error.response && error.response.status === 401) {
          toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
          localStorage.removeItem('auth_token');
        } else {
          toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
        }
      } finally {
        this.isSubmittingReview = false;
      }
    },

    async fetchSidebarAndRelatedData() {
      try {
        const res = await newsService.getPublicNews();
        const allNews = res.data?.data || res.data?.content || res.data || [];

        if (allNews.length > 0) {
          this.relatedArticles = allNews
            .filter(n => n.danhMuc === this.article.danhMuc && n.id !== this.article.id)
            .slice(0, 3);

          this.popularArticles = [...allNews]
            .sort((a, b) => (b.luotXem || 0) - (a.luotXem || 0))
            .slice(0, 5);
        }
      } catch (e) {
        console.error('Lỗi fetch sidebar/related:', e);
      }
    },

    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ path: '/tin-tuc', query: { q: this.searchQuery.trim() } });
      }
    },

    shareTo(platform) {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(this.article.tieuDe || this.article.title);
      if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
      } else if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
      }
    },

    copyLink() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.copied = true;
        setTimeout(() => (this.copied = false), 2000);
      });
    },

    toggleSave() {
      this.isSaved = !this.isSaved;
      let saved = JSON.parse(localStorage.getItem('saved_news') || '[]');
      if (this.isSaved) {
        if (!saved.includes(this.article.id)) saved.push(this.article.id);
      } else {
        saved = saved.filter(id => id !== this.article.id);
      }
      localStorage.setItem('saved_news', JSON.stringify(saved));
    },

    checkIfSaved() {
      const saved = JSON.parse(localStorage.getItem('saved_news') || '[]');
      this.isSaved = saved.includes(this.article.id);
    },

    goToArticle(id) {
      this.$router.push(`/tin-tuc/${id}`);
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  mounted() {
    this.fetchDetail();
  },

  watch: {
    '$route.params.id'() {
      this.fetchDetail();
    }
  }
};
</script>

<style scoped>
:root {
  --main-brown: #4d3105;
  --vipep-green: #7eb33d;
  --vipep-red: #ee2624;
}

.text-main-brown { color: #4d3105 !important; }
.bg-main-brown { background-color: #4d3105 !important; }
.border-main-brown { border-color: #4d3105 !important; }
.text-vipep-green { color: #7eb33d !important; }
.bg-vipep-green { background-color: #7eb33d !important; color: white !important; }
.bg-light-brown-subtle { background-color: #fdf8f0 !important; }

.animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.news-detail-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.flex-grow-1 { flex-grow: 1; }
.mt-auto { margin-top: auto !important; }

.wave-separator {
  width: 100%;
  height: 120px;
  background: #fff;
  position: relative;
  margin-bottom: -1px;
}
.wave-svg {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 120px;
}

.footer-custom { background-color: #212529 !important; margin-top: -1px; }

.btn-main-brown { background-color: #4d3105 !important; color: white !important; transition: 0.3s ease; }
.btn-main-brown:hover { background-color: #7eb33d !important; }
.hover-text-green:hover { color: #7eb33d !important; transition: 0.2s; }
.hover-up:hover { transform: translateY(-8px); box-shadow: 0 1rem 3rem rgba(0,0,0,.1)!important; }
.transition-zoom { transition: transform 0.6s ease; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.title-with-line::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -17px;
  width: 60px;
  height: 3px;
  background-color: #7eb33d;
  border-radius: 2px;
}

.content-body { line-height: 1.8; font-size: 1.1rem; }
.content-body :deep(img) { max-width: 100%; height: auto; border-radius: 12px; margin: 2rem auto; display: block; }
.content-body :deep(h2), .content-body :deep(h3) { color: #4d3105; font-weight: 700; margin: 2.5rem 0 1.25rem; }

.btn-share { width: 38px; height: 38px; transition: all 0.3s; }
.btn-share:hover { transform: translateY(-3px); box-shadow: 0 4px 10px rgba(0,0,0,0.1); }

.floating-contact {
  position: fixed;
  right: 20px;
  bottom: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.contact-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  flex-direction: row-reverse;
}
.icon-wrapper {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  background: white;
  z-index: 2;
}
.hotline .icon-wrapper { background: #ee2624; animation: pulse-red 2s infinite; }
.zalo .icon-wrapper { background: #0088ff; }
.messenger .icon-wrapper { background: #0078ff; }
.scroll-top { background: #4d3105; color: white; border: none; width: 45px; height: 45px; border-radius: 50%; }

.contact-item .label {
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 13px;
  margin-right: 10px;
  opacity: 0;
  visibility: hidden;
  transform: translateX(20px);
  transition: all 0.3s ease;
  white-space: nowrap;
}
.contact-item:hover .label { opacity: 1; visibility: visible; transform: translateX(0); }

@keyframes pulse-red {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(238,38,36,0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(238,38,36,0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(238,38,36,0); }
}

@media (max-width: 768px) {
  .contact-item .label { display: none; }
  .floating-contact { right: 15px; bottom: 20px; }
}
.btn-outline-main-brown {
  color: #4d3105;
  border-color: #4d3105;
  background-color: transparent;
}
.btn-outline-main-brown:hover {
  color: white !important;
  background-color: #4d3105 !important;
}
</style>
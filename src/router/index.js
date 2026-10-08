import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CategoryDetail from '@/views/CategoryDetail.vue'
import OrderSuccess from '@/views/OrderSuccess.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/gioi-thieu',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/san-pham',
    name: 'ProductList',
    component: CategoryDetail,
  },
  {
    path: '/san-pham/chi-tiet/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue'),
    props: true
  },
  {
    path: '/san-pham/gia-vi',
    name: 'gia-vi',
    component: () => import('../views/GiaViView.vue'),
  },
  {
    path: '/san-pham/muoi-himalaya',
    name: 'muoi-himalaya',
    component: () => import('../views/MuoiHimalayaView.vue'),
  },
  {
    path: '/san-pham/nguyen-lieu',
    name: 'nguyen-lieu',
    component: () => import('../views/NguyenLieuView.vue'),
  },
  {
    path: '/san-pham/combo',
    name: 'combo',
    component: () => import('../views/ComboView.vue'),
  },
  {
    path: '/san-pham/:slug',
    name: 'CategoryDetail',
    component: CategoryDetail,
    props: true
  },
  {
    path: '/danh-muc/:id',
    name: 'CategoryById',
    component: CategoryDetail,
    props: true
  },
  {
    path: '/du-an',
    name: 'du-an',
    component: () => import('../views/DuAnView.vue'),
  },
  {
    path: '/du-an/khach-san',
    name: 'du-an-khach-san',
    component: () => import('../views/DuAnView.vue'),
  },
  {
    path: '/du-an/nha-hang',
    name: 'du-an-nha-hang',
    component: () => import('../views/DuAnView.vue'),
  },
  {
    path: '/du-an/bep-cong-nghiep',
    name: 'du-an-bep',
    component: () => import('../views/DuAnView.vue'),
  },
  {
    path: '/tin-tuc',
    name: 'news',
    component: () => import('../views/NewsView.vue'),
  },
  {
    path: '/tin-tuc/:id',
    name: 'news-detail',
    component: () => import('../views/NewsDetailView.vue'),
  },
  {
    path: '/hot-deal',
    name: 'hot-deal',
    component: () => import('../views/HotDealView.vue'),
  },
  {
    path: '/lien-he',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
  },
  {
    path: '/dang-nhap',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/gio-hang',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/he-thong-cua-hang',
    name: 'store-system',
    component: () => import('../views/StoreSystemView.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/don-hang',
    name: 'orders',
    component: () => import('@/views/OrdersView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/test',
    name: 'test-connection',
    component: () => import('@/views/TestConnection.vue')
  },
  {
    path: '/dat-hang-thanh-cong',
    name: 'OrderSuccess',
    component: OrderSuccess
  },
  {
    path: '/thanh-toan',
    name: 'checkout',
    component: () => import('../views/CheckoutPage.vue'),
  },
 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // ✅ Dùng key riêng 'user_' để không đụng với localStorage của admin
  const isAuth = localStorage.getItem('user_is_auth') === 'true'
  const role   = localStorage.getItem('user_role')

  // Các trang yêu cầu đăng nhập user
  if (to.meta.requiresAuth) {
    if (!isAuth) {
      return next({ path: '/dang-nhap', query: { redirect: to.fullPath } })
    }
  }

  // Chống admin vào trang user (nếu vẫn muốn giữ logic này)
  // Nhưng KHÔNG redirect sang localhost:5174 cứng — dùng alert thôi
  if (isAuth && role === 'QUAN_TRI') {
    const userOnlyPages = ['profile', 'cart', 'orders', 'checkout']
    if (userOnlyPages.includes(to.name)) {
      alert('Tài khoản Admin vui lòng sử dụng trang quản trị!')
      return next(false) // Chặn lại, không chuyển trang
    }
  }

  // Nếu đã login user rồi, không cho vào /dang-nhap nữa
  if (to.path === '/dang-nhap' && isAuth && role !== 'QUAN_TRI') {
    return next({ path: '/' })
  }

  next()
})

export default router
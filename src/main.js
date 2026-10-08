import { createApp } from 'vue'
 // XÓA DÒNG NÀY ĐI: import './style.css'
import App from './App.vue'
import router from './router'
// 1. Import Toast và CSS của nó
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
// Thêm Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// Thêm Bootstrap CSS và JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const app = createApp(App)
// 2. Cấu hình Toast với các tuỳ chọn mặc định (bạn có thể tuỳ chỉnh thời gian, vị trí...)
app.use(Toast, {
  position: "top-right",   // Vị trí hiển thị (góc trên phải)
  timeout: 3000,           // Tự động tắt sau 3 giây
  closeOnClick: true,      // Bấm vào để tắt
  pauseOnFocusLoss: true,
  pauseOnHover: true,      // Rê chuột vào sẽ tạm dừng đếm ngược thời gian tắt
  draggable: true,         // Cho phép kéo thả để tắt
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
});
app.use(router)
app.mount('#app')
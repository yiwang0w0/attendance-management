import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
// 你后续可以继续引入更多页面

const routes = [
  { path: '/login', component: Login },
  // { path: '/dashboard', component: Dashboard }, // 例子
  { path: '/', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Attendance from '../views/Attendance.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/',
    component: Dashboard,
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', component: { template: '<div>首页</div>' } },
      { path: 'attendance', component: Attendance }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

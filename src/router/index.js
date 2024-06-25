import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/WeatherWidget.vue'
import Page1 from '../components/Tugas1.vue'
import Page2 from '../components/Tugas2.vue'
import Page3 from '../components/Tugas3.vue'
import Page4 from '../components/Tugas4.vue'
import Page5 from '../components/Tugas5.vue'
import Page6 from '../components/Tugas6.vue'



const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/Tugas1', name: 'Tugas1', component: Tugas1 },
  { path: '/Tugas2', name: 'Tugas2', component: Tugas2 },
  { path: '/Tugas3', name: 'Tugas3', component: Tugas3 },
  { path: '/Tugas4', name: 'Tugas4', component: Tugas4 },
  { path: '/Tugas5', name: 'Tugas5', component: Tugas5 },
  { path: '/Tugas6', name: 'Tugas6', component: Tugas6 },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

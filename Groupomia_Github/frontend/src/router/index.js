import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/LoginView.vue'



const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/profil',
    name: 'profil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profil" */ '../views/ProfilView.vue')
  },
  {
    path: '/filactualite',
    name: 'filactualite',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profil" */ '../views/FilActualiteView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
